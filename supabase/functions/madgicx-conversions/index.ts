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

interface MadgicxConversionPayload {
  data: ConversionEvent[];
}

// Hash function for user data (SHA-256)
async function hashData(data: string): Promise<string> {
  if (!data) return "";
  
  const normalized = data.toLowerCase().trim();
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Hash user data fields
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
    // Handle CORS preflight
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

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get Madgicx credentials from environment
    const madgicxPixelId = Deno.env.get("MADGICX_PIXEL_ID");
    const madgicxAccessToken = Deno.env.get("MADGICX_ACCESS_TOKEN");

    if (!madgicxPixelId || !madgicxAccessToken) {
      return new Response(
        JSON.stringify({ 
          error: "Madgicx credentials not configured",
          message: "Please set MADGICX_PIXEL_ID and MADGICX_ACCESS_TOKEN environment variables"
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

    // Parse request body
    const { data: events }: MadgicxConversionPayload = await req.json();

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

    // Get client info from headers
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const clientUserAgent = req.headers.get("user-agent") || "";

    // Process each event
    const processedEvents = await Promise.all(
      events.map(async (event) => {
        const eventTime = event.event_time || Math.floor(Date.now() / 1000);
        const eventId = event.event_id || crypto.randomUUID();
        
        // Hash user data
        const hashedUserData = await hashUserData(event.user_data);
        
        // Add client info to user data
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

    // Send to Madgicx Conversions API
    const madgicxApiUrl = `https://graph.facebook.com/v18.0/${madgicxPixelId}/events`;
    
    const madgicxResponse = await fetch(madgicxApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: processedEvents,
        access_token: madgicxAccessToken,
      }),
    });

    const madgicxResult = await madgicxResponse.json();
    const status = madgicxResponse.ok ? "sent" : "failed";

    // Store conversion events in database
    const dbRecords = processedEvents.map((event, index) => ({
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
      madgicx_response: madgicxResult,
      status: status,
    }));

    const { error: dbError } = await supabase
      .from("madgicx_conversions")
      .insert(dbRecords);

    if (dbError) {
      console.error("Database error:", dbError);
    }

    return new Response(
      JSON.stringify({
        success: madgicxResponse.ok,
        events_received: events.length,
        events_processed: processedEvents.length,
        madgicx_response: madgicxResult,
        status: status,
      }),
      {
        status: madgicxResponse.ok ? 200 : 500,
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