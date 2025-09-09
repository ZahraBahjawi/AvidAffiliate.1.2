
import { ServerClient } from "postmark";

export const handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No body in request" }),
    };
  }

  const { payload } = JSON.parse(event.body);
const { form_name, data } = payload;
// Deconstruct other variables as before
const { name, email, subject, message, trafficTier, earningsTier } = data;
// Explicitly pull the website URL using its correct name from the form
const websiteUrl = data['website-url'];

  if (!process.env.POSTMARK_SERVER_TOKEN) {
    console.error("POSTMARK_SERVER_TOKEN is not set.");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email server is not configured." }),
    };SubmissionForm
  }

  const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);
const bccEmails = process.env.POSTMARK_BCC_EMAILS || "";
  let emailHtml = "";
  let emailSubject = "";

  if (form_name === 'audit-request') {
    emailSubject = "Your AvidAffiliate Report Card is in the Queue!";
    
    emailHtml = `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your AvidAffiliate Report Card is being generated</title>
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');
              :root {
                  color-scheme: light;
                  supported-color-schemes: light;
              }
              body {
                  margin: 0;
                  padding: 0;
                  width: 100% !important;
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                  font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              }
              table, td {
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
              }
              img {
                  -ms-interpolation-mode: bicubic;
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
              }
              #outlook a {
                  padding: 0;
              }
              .mso-font-fix { font-family: Arial, sans-serif !important; }
          </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4;">

          <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
              Your request is confirmed! We're analyzing your site for hidden revenue opportunities. Whitelist this email to ensure you get it!
          </div>

          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="background-color: #f4f4f4;">
              <tr>
                  <td align="center" style="padding: 20px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                          
                          <tr>
                              <td class="header" style="background-color: #081F5D; color: #ffffff; padding: 32px; text-align: center;">
                                  <img src="https://avidaffiliate.com/LOGO.png" alt="AvidAffiliate – Affiliate Revenue Optimization" width="120" style="max-width: 120px; margin: 0 auto 8px; display: block; border: 0;">
                                  <h1 style="font-family: 'Google Sans', Arial, sans-serif; margin: 0; font-size: 28px; font-weight: 800;">We're on it!</h1>
                                  </td>
                          </tr>

                          <tr>
                              <td class="content" style="padding: 32px; color: #333333; line-height: 1.6; font-size: 16px;">
                                  <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0 0 16px;">Hi ${name},</p>
                                  <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0 0 16px;">Smart move—you’re on your way to uncovering hidden revenue opportunities on <strong>${websiteUrl}</strong>.</p>
                                  <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0 0 16px;">Our system is now analyzing your site, looking for:</p>
                                  
                                   <ul style="margin: 0 0 24px; padding-left: 20px; list-style-type: '✓';">
                                      <li class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin-bottom: 10px; padding-left: 10px;"><strong>Revenue Leaks:</strong> High-value broken affiliate links.</li>
                                      <li class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin-bottom: 10px; padding-left: 10px;"><strong>Missed Payouts:</strong> Brands you mention but don't monetize.</li>
                                  </ul>

                                  <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0 0 24px;">Your personalized report will be in your inbox shortly, usually within 24 hours (and always within 48). Please consider whitelisting <strong>hello@avidaffiliate.com</strong> to ensure you receive it.</p>
                                  
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="margin-bottom: 32px;">
                                      <tr>
                                          <td>
                                              <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0 0 8px; font-size: 14px; color: #555555;"><strong>Status:</strong> Queued for Analysis</p>
                                              <div style="width: 100%; background-color: #e0e0e0; border-radius: 5px; height: 8px;">
                                                  <div style="width: 25%; height: 8px; background-color: #1350C5; border-radius: 5px;"></div>
                                              </div>
                                              <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="font-size: 10px; color: #777777; margin-top: 5px;">
                                                  <tr>
                                                      <td class="mso-font-fix" align="left" style="font-family: 'Google Sans', Arial, sans-serif;">Received</td>
                                                      <td class="mso-font-fix" align="center" style="font-family: 'Google Sans', Arial, sans-serif; font-weight: bold; color: #1350C5;">Queued</td>
                                                      <td class="mso-font-fix" align="right" style="font-family: 'Google Sans', Arial, sans-serif;">Analyzing</td>
                                                      <td class="mso-font-fix" align="right" style="font-family: 'Google Sans', Arial, sans-serif; padding-right:15px;">Done</td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                                  
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="background-color: #f0f5ff; border: 1px solid #dbeafe; border-radius: 8px; text-align: center; margin-bottom: 24px;">
                                      <tr>
                                          <td class="info-box" style="padding: 20px;">
                                              <h3 class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0 0 16px; font-size: 18px; color: #081F5D;">Boost Your Report's Accuracy (Recommended)</h3>
                                              <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0 0 20px; font-size: 14px;">Want more targeted recommendations? Take 30 seconds to provide a few extra details about your site:</p>
<a href="https://avidaffiliate.com/optional-details-form?email=${encodeURIComponent(email)}&url=${encodeURIComponent(websiteUrl)}" class="button" target="_blank" role="button" aria-label="Improve My Report" style="display: inline-block; background-color: #1350C5; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; line-height: 1.2; cursor: pointer;">Improve My Report</a>

                                          </td>
                                      </tr>
                                  </table>

                                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="background-color: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center;">
                                      <tr>
                                          <td class="info-box" style="padding: 20px;">
                                              <h3 class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0 0 16px; font-size: 18px; color: #081F5D;">While You Wait...</h3>
                                              <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0 0 20px; font-size: 14px;">Want a preview of what’s coming? Here’s the level of insight you’ll soon have on your own site.</p>
                                              <a href="https://avidaffiliate.com/sample-report-card.html" class="button button-secondary" target="_blank" role="button" aria-label="Preview a Sample Report" style="display: inline-block; background-color: #e5e7eb; color: #111827 !important; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; line-height: 1.2; cursor: pointer;">Preview a Sample Report</a>
                                          </td>
                                      </tr>
                                  </table>

                                  <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 32px 0 8px;">Keep an eye on your inbox — your Report Card is the first step to unlocking more affiliate revenue.</p>
                                  <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; font-size: 14px; color: #555555; margin: 0 0 16px;">If you don’t see your report within 48 hours, please check your spam folder or reply directly to this email.</p>
                                  <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 16px 0;">To your success,</p>
                                  <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0; font-weight: bold;">David & The AvidAffiliate Team</p>
                              </td>
                          </tr>

                          <tr>
                              <td style="text-align: center; padding: 20px; font-size: 12px; color: #777777; background-color: #f4f4f4;">
                                  <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0 0 8px;">AvidAffiliate | hello@avidaffiliate.com</p>
                                  <p class="mso-font-fix" style="font-family: 'Google Sans', Arial, sans-serif; margin: 0;">No longer want updates? <a href="https://avidaffiliate.com/unsubscribe/[request-id]" target="_blank" style="color: #777777; text-decoration: underline;">Unsubscribe here</a>.</p>
                              </td>
                          </tr>
                      </table>
                      </td>
              </tr>
          </table>

      </body>
      </html>
    `;
  } else if (form_name === 'contact-form') {
    emailSubject = "Message Received - AvidAffiliate";
    emailHtml = `
      <h1>Hi ${name},</h1>
      <p>Thank you for contacting AvidAffiliate! We've received your message and will respond within 24 hours.</p>
      <h3>Your Message Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Subject:</strong> ${subject}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
      <p>Best regards,<br>The AvidAffiliate Team</p>
    `;
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Unknown form name: ${form_name}` }),
    };
  }

  try {
    await client.sendEmail({
      "From": "hello@avidaffiliate.com",
      "To": email,
      "Bcc": bccEmails,
      "Subject": emailSubject,
      "HtmlBody": emailHtml,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Postmark Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to send email: ${error.message}` }),
    };
  }
};