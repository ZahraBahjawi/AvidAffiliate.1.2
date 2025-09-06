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
   const { name, email, subject, message, websiteUrl, trafficTier, earningsTier } = data;


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
    emailSubject = "Your AvidAffiliate Report Card is in the Queue!";
    
    // 1. Read your beautiful HTML template
    const templatePath = path.join(process.cwd(), 'emails', 'AvidAffiliate Confirmation Email.html');
    let htmlTemplate = await fs.readFile(templatePath, 'utf-8');

    // 2. Replace placeholders with actual data
    htmlTemplate = htmlTemplate.replace(/\[User's Name\]/g, name);
    htmlTemplate = htmlTemplate.replace(/\[User's Website URL\]/g, websiteUrl);

    emailHtml = htmlTemplate;

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
      "Bcc": "david@dealmagicians.com, toby@dealmagicians.com, zahra.bahjawi@outlook.com", // Add your 2 internal emails here
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