const postmark = require("postmark");

// CHECK VERSION Initialize the Postmark client using the secret key from Netlify's environment variables
const serverToken = process.env.POSTMARK_SERVER_TOKEN;
const client = new postmark.ServerClient(serverToken);

exports.handler = async (event) => {
  // Exit early if the server token is not configured
  if (!serverToken) {
    console.error("Postmark server token is not configured.");
    return {
      statusCode: 500,
      body: "Email service is not configured.",
    };
  }

  try {
    const { payload } = JSON.parse(event.body);
    const submissionData = payload.data;
    const formName = payload.form_name; // Get the name of the form that was submitted

    const { email, name } = submissionData;

    // Ensure there's an email address to send to
    if (!email) {
      console.log("No 'email' field found in submission data.");
      return { statusCode: 400, body: "Submission has no email address." };
    }

    // Create a dynamic subject line based on the form name
    let subject = "We've received your submission!";
    if (formName === 'audit-request') {
      subject = "Your AvidAffiliate audit request has been received!";
    } else if (formName === 'contact-form') {
      subject = "Thanks for contacting us at AvidAffiliate!";
    } else if (formName === 'services-inquiry') {
      subject = "Your AvidAffiliate services inquiry has been received!";
    }

    // Send the email using your Postmark template
    await client.sendEmailWithTemplate({
      From: "hello@avidaffiliate.com", // This must be a verified sender signature in Postmark
      To: email,
      TemplateAlias: "confirmation",
      TemplateModel: {
        ...submissionData, // Pass all form data to the template
        name: name || "there", // Fallback for the user's name
        form_name: formName, // Pass the form name to the template
      },
      // Use the dynamic subject line in the headers to override the template's default
      Headers: [
        {
          Name: "X-PM-Subject",
          Value: subject,
        },
      ],
    });

    console.log(`Confirmation email sent successfully to ${email} for ${formName} submission.`);
    return {
      statusCode: 200,
      body: "Confirmation email sent.",
    };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};