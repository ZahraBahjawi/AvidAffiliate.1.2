import { ServerClient } from "postmark";
import fs from "fs";
import path from "path";

export const handler = async (event) => {
  const { form_name, payload } = JSON.parse(event.body);
  const { name, email, subject, message, url, trafficTier, earningsTier } = payload.data;

  const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

  let emailHtml = "";
  let emailSubject = "";
  let templatePath = "";
  let templateData = {};

  if (form_name === 'audit-request') {
    emailSubject = "Report Card Request Received!";
    templatePath = path.resolve(process.cwd(), 'emails/audit-request.html');
    templateData = {
      name: name,
      "website-url": url,
      email: email,
      "traffic-tier": trafficTier,
      "earnings-tier": earningsTier,
    };

  } else if (form_name === 'contact-form') {
    emailSubject = "Message Received - AvidAffiliate";
    templatePath = path.resolve(process.cwd(), 'emails/contact-form.html');
    templateData = {
      name: name,
      email: email,
      subject: subject,
      message: message
    };
  }

  if (templatePath) {
    let htmlContent = fs.readFileSync(templatePath, 'utf8');
    for (const key in templateData) {
      htmlContent = htmlContent.replace(new RegExp(`{{ ${key} }}`, 'g'), templateData[key]);
    }
    emailHtml = htmlContent;
  }


  try {
    await client.sendEmail({
      "From": "hello@avidaffiliate.com",
      "To": email, // Change this to the user's email
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