// Production form submission handler
export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Handle form submissions in production
export const submitForm = async (
  formName: string, 
  formData: Record<string, any>
): Promise<FormSubmissionResponse> => {
  try {
    // Create FormData object for Netlify
    const netlifyFormData = new FormData();
    netlifyFormData.append('form-name', formName);
    
    // Add all form fields
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      if (value !== null && value !== undefined) {
        netlifyFormData.append(key, String(value));
      }
    });

    // Submit to Netlify
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(netlifyFormData as any).toString()
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Form submitted successfully! We\'ll be in touch soon.'
      };
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'There was an error submitting your form. Please try again or contact us directly.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Enhanced form submission with fallback options
export const submitFormWithFallback = async (
  formName: string,
  formData: Record<string, any>,
  fallbackEmail?: string
): Promise<FormSubmissionResponse> => {
  // Try primary submission method
  const result = await submitForm(formName, formData);
  
  if (result.success) {
    return result;
  }

  // If primary fails and fallback email is provided, suggest email contact
  if (fallbackEmail) {
    const emailSubject = encodeURIComponent(`${formName} - Form Submission`);
    const emailBody = encodeURIComponent(
      `Form submission details:\n\n${Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')}`
    );
    
    return {
      success: false,
      message: `Form submission failed. Please email us directly at ${fallbackEmail}`,
      error: `Fallback: mailto:${fallbackEmail}?subject=${emailSubject}&body=${emailBody}`
    };
  }

  return result;
};

// Validate form data before submission
export const validateFormData = (formData: Record<string, any>, requiredFields: string[]): string[] => {
  const errors: string[] = [];
  
  requiredFields.forEach(field => {
    if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
      errors.push(`${field} is required`);
    }
  });
  
  // Email validation
  if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  // URL validation
  if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
    errors.push('Please enter a valid website URL');
  }
  
  return errors;
};