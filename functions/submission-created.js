import { ServerClient } from "postmark";

export const handler = async (event) => {
  // Ensure the request body is parsed correctly
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No body in request" }),
    };
  }

  const { payload } = JSON.parse(event.body);
  const { form_name, data } = payload;
  const { name, email, subject, message, url, trafficTier, earningsTier } = data;

  // Make sure you have set this in your Netlify environment variables
  if (!process.env.POSTMARK_SERVER_TOKEN) {
    console.error("POSTMARK_SERVER_TOKEN is not set.");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email server is not configured." }),
    };
  }

  const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

  let emailHtml = "";
  let emailSubject = "";

  if (form_name === 'audit-request') {
    emailSubject = "Report Card Request Received!";
    emailHtml = `
      <h1>Hi ${name},</h1>
      <p>Thank you for submitting your website for a free affiliate report card! We've received your request and our analysis system is now working to uncover hidden revenue opportunities.</p>
      <h3>Your Submission Details:</h3>
      <ul>
        <li><strong>Website:</strong> ${url}</li>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Traffic Tier:</strong> ${trafficTier}</li>
        <li><strong>Earnings Tier:</strong> ${earningsTier}</li>
      </ul>
      <p>Your complete report card will be emailed to you within 48 hours.</p>
      <p>Best regards,<br>The AvidAffiliate Team</p>
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
    // If the form name doesn't match, we shouldn't send an email
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Unknown form name: ${form_name}` }),
    };
  }

  try {
    await client.sendEmail({
      "From": "hello@avidaffiliate.com", // This MUST be a verified Sender Signature in Postmark
      "To": email, // The user's email address
      "Bcc": "first@example.com, second@example.com", // Add your 2 internal emails here
      "Subject": emailSubject,
      "HtmlBody": emailHtml,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Postmark Error:", error);
    // Provide a more detailed error response for debugging
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to send email: ${error.message}` }),
    };
  }
};