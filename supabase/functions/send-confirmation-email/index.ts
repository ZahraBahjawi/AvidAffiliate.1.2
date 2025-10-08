import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  name: string;
  email: string;
  formType: string;
  formData: Record<string, any>;
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

    const postmarkToken = Deno.env.get("POSTMARK_SERVER_TOKEN");

    if (!postmarkToken) {
      console.error("POSTMARK_SERVER_TOKEN not configured");
      return new Response(
        JSON.stringify({
          error: "Email service not configured",
          message: "Please set POSTMARK_SERVER_TOKEN environment variable"
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

    const { name, email, formType, formData }: EmailRequest = await req.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Build HTML email content
    const formFieldsHtml = Object.entries(formData)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join('\n');

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submission Confirmation</title>
    <style>
        body {
            font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            font-size: 28px;
            font-weight: bold;
            color: #081F5D;
            margin-bottom: 20px;
        }
        .content {
            margin: 20px 0;
        }
        .data-section {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .data-section p {
            margin: 10px 0;
        }
        .data-section strong {
            color: #081F5D;
            display: inline-block;
            min-width: 150px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            font-size: 14px;
            color: #777;
        }
        .logo {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Thanks for your submission!</div>
        <div class="content">
            <p>Hi ${name},</p>
            <p>We've successfully received your ${formType} submission and will get back to you as soon as possible. Here's a copy of the information you submitted:</p>

            <div class="data-section">
                ${formFieldsHtml}
            </div>

            <p>We typically respond within 24-48 hours. If you have any urgent questions, feel free to reach out directly.</p>

            <p>Best regards,<br><strong>The AvidAffiliate Team</strong></p>
        </div>

        <div class="footer">
            <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
        </div>
    </div>
</body>
</html>`;

    const textBody = `
Hi ${name},

We've successfully received your ${formType} submission and will get back to you as soon as possible.

Here's a copy of the information you submitted:

${Object.entries(formData).map(([key, value]) => `${key}: ${value}`).join('\n')}

We typically respond within 24-48 hours.

Best regards,
The AvidAffiliate Team

---
This is an automated confirmation email.`;

    // Send email via Postmark
    const postmarkResponse = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": postmarkToken,
      },
      body: JSON.stringify({
        From: "noreply@avidaffiliate.com",
        To: email,
        Subject: `Confirmation: Your ${formType} submission`,
        HtmlBody: htmlBody,
        TextBody: textBody,
        MessageStream: "outbound",
      }),
    });

    const postmarkResult = await postmarkResponse.json();

    if (!postmarkResponse.ok) {
      console.error("Postmark error:", postmarkResult);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to send email",
          details: postmarkResult,
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

    return new Response(
      JSON.stringify({
        success: true,
        message: "Confirmation email sent successfully",
        messageId: postmarkResult.MessageID,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending confirmation email:", error);

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