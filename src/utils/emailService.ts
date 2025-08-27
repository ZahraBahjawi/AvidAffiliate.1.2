// src/utils/emailService.ts
/**
 * In this application, actual email sending is handled by the Netlify Function
 * located at `/functions/submission-created.js`. This client-side function
 * serves to resolve the import and can be used for logging or future client-side
 * notifications. It simulates the email sending process by logging to the console.
 */

interface FormData {
  name: string;
  email: string;
  [key: string]: any;
}

/**
 * Simulates sending a confirmation email.
 * @param formType - The name of the form being submitted (e.g., 'contact').
 * @param formData - The data collected from the form.
 * @returns A promise that resolves when the simulation is complete.
 */
export const sendConfirmationEmail = async (formType: string, formData: FormData): Promise<void> => {
  console.log(`Confirmation email simulation for form "${formType}" to ${formData.email}.`);
  // The actual email is sent via the `submission-created` Netlify function.
  return Promise.resolve();
};