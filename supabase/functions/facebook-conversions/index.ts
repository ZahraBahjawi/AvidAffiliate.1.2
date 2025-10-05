import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ConversionEvent {
  event_name: string;
  event_time?: number;
  event_source_url: string;
  user_data?: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
    ct?: string;
    st?: string;
    zp?: string;
    country?: string;
  };
  custom_data?: Record<string, any>;
  fbp?: string;
  fbc?: string;
  event_id?: string;
}

interface ConversionPayload {
  data: ConversionEvent[];
}

async function hashData(data: string): Promise<string> {
  if (!data) return "";
  
  const normalized = data.toLowerCase().trim();
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function hashUserData(userData: any): Promise<any> {
  if (!userData) return {};
  
  const hashed: any = {};
  
  if (userData.em) hashed.em = await hashData(userData.em);
  if (userData.ph) hashed.ph = await hashData(userData.ph.replace(/[^0-9]/g, ""));
  if (userData.fn) hashed.fn = await hashData(userData.fn);
  if (userData.ln) hashed.ln = await hashData(userData.ln);
  if (userData.ct) hashed.ct = await hashData(userData.ct);
  if (userData.st) hashed.st = await hashData(userData.st);
  if (userData.zp) hashed.zp = await hashData(userData.zp);
  if (userData.country) hashed.country = await hashData(userData.country);
  
  return hashed;
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const fbPixelId = Deno.env.get("FB_PIXEL_ID");
    const fbAccessToken = Deno.env.get("FB_ACCESS_TOKEN");

    if (!fbPixelId || !fbAccessToken) {
      return new Response(
        JSON.stringify({ 
          error: "Facebook credentials not configured",
          message: "Please set FB_PIXEL_ID and FB_ACCESS_TOKEN environment variables"
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { data: events }: ConversionPayload = await req.json();

    if (!events || !Array.isArray(events) || events.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid payload: data array required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const clientUserAgent = req.headers.get("user-agent") || "";

    const processedEvents = await Promise.all(
      events.map(async (event) => {
        const eventTime = event.event_time || Math.floor(Date.now() / 1000);
        const eventId = event.event_id || crypto.randomUUID();
        
        const hashedUserData = await hashUserData(event.user_data);
        
        const userData = {
          ...hashedUserData,
          client_ip_address: clientIp,
          client_user_agent: clientUserAgent,
          fbp: event.fbp,
          fbc: event.fbc,
        };

        return {
          event_name: event.event_name,
          event_time: eventTime,
          event_source_url: event.event_source_url,
          user_data: userData,
          custom_data: event.custom_data || {},
          action_source: "website",
          event_id: eventId,
        };
      })
    );

    const fbApiUrl = `https://graph.facebook.com/v18.0/${fbPixelId}/events`;
    
    const fbResponse = await fetch(fbApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: processedEvents,
        access_token: fbAccessToken,
      }),
    });

    const fbResult = await fbResponse.json();
    const status = fbResponse.ok ? "sent" : "failed";

    const dbRecords = processedEvents.map((event) => ({
      event_name: event.event_name,
      event_time: event.event_time,
      event_source_url: event.event_source_url,
      user_data: event.user_data,
      custom_data: event.custom_data,
      fbp: event.user_data.fbp,
      fbc: event.user_data.fbc,
      client_ip_address: clientIp,
      client_user_agent: clientUserAgent,
      event_id: event.event_id,
      facebook_response: fbResult,
      status: status,
    }));

    const { error: dbError } = await supabase
      .from("facebook_conversions")
      .insert(dbRecords);

    if (dbError) {
      console.error("Database error:", dbError);
    }

    return new Response(
      JSON.stringify({
        success: fbResponse.ok,
        events_received: events.length,
        events_processed: processedEvents.length,
        facebook_response: fbResult,
        status: status,
      }),
      {
        status: fbResponse.ok ? 200 : 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing conversion:", error);
    
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});