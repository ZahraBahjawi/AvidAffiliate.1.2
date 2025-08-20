import postmark from "postmark";

// Access the environment variable using its KEY
const serverToken = process.env.POSTMARK_SERVER_TOKEN; 
const client = new postmark.ServerClient(serverToken);

export const handler = async (event) => {
  try {
    const submission = JSON.parse(event.body).payload.data;
    const userEmail = submission.email;
    const userName = submission.name;

    if (!userEmail) {
      console.log("No email found in submission data.");
      return { statusCode: 400, body: "Submission has no email address." };
    }

    await client.sendEmailWithTemplate({
      From: "hello@avidaffiliate.com",
      To: userEmail,
      TemplateAlias: "confirmation",
      TemplateModel: {
        name: userName,
        ...submission,
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