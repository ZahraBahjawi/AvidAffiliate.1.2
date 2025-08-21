import { ServerClient } from "postmark";

export const handler = async (event) => {
  const { form_name, payload } = JSON.parse(event.body);
  const { name, email, subject, message, url, trafficTier, earningsTier } = payload.data;

  // Replace with your Postmark server token
  const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

  let emailHtml = "";
  let emailSubject = "";

  // Determine which email template to use
  if (form_name === 'audit-request') {
    emailSubject = "New Audit Request Received";
    // A simplified HTML body for the email
    emailHtml = `
      <h1>New Audit Request</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Website:</strong> ${url}</p>
      <p><strong>Traffic Tier:</strong> ${trafficTier}</p>
      <p><strong>Earnings Tier:</strong> ${earningsTier}</p>
    `;
  } else if (form_name === 'contact-form') {
    emailSubject = "New Contact Form Submission";
    emailHtml = `
      <h1>New Contact Message</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;
  } else {
    // Default case or for other forms
    emailSubject = "New Form Submission";
    emailHtml = `<p>A new form submission has been received.</p><p><strong>Form:</strong> ${form_name}</p><p><strong>Data:</strong></p><pre>${JSON.stringify(payload.data, null, 2)}</pre>`;
  }

  try {
    await client.sendEmail({
      "From": "hello@avidaffiliate.com", // Must be a registered sender signature in Postmark
      "To": "your-email@example.com", // The email address where you want to receive notifications
      "Subject": emailSubject,
      "HtmlBody": emailHtml,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email." }),
    };
  }
};