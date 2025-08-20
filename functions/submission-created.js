const postmark = require("postmark");

// IMPORTANT: Replace this with your own Postmark server API token
const serverToken = "YOUR_POSTMARK_SERVER_TOKEN"; 
const client = new postmark.ServerClient(serverToken);

exports.handler = async (event) => {
  try {
    const submission = JSON.parse(event.body).payload.data;
    const userEmail = submission.email;
    const userName = submission.name;

    if (!userEmail) {
      console.log("No email found in submission data.");
      return { statusCode: 400, body: "Submission has no email address." };
    }

    await client.sendEmailWithTemplate({
      From: "hello@avidaffiliate.com", // This must be a verified sender signature in Postmark
      To: userEmail,
      TemplateAlias: "confirmation", // The alias of your template in Postmark
      TemplateModel: {
        name: userName,
        ...submission, // This makes all form fields available in the template
      },
    });

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