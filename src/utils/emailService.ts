// src/utils/emailService.ts
interface FormData {
  name: string;
  email: string;
  [key: string]: any;
}

/**
 * Sends a confirmation email via Supabase Edge Function
 * @param formType - The name of the form being submitted (e.g., 'contact', 'audit request').
 * @param formData - The data collected from the form.
 * @returns A promise that resolves when the email is sent.
 */
export const sendConfirmationEmail = async (formType: string, formData: FormData): Promise<void> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase environment variables not configured');
      return;
    }

    const apiUrl = `${supabaseUrl}/functions/v1/send-confirmation-email`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        formType: formType,
        formData: formData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send confirmation email:', errorData);
      return;
    }

    const result = await response.json();
    console.log('✅ Confirmation email sent successfully:', result);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};