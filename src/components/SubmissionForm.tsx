import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Globe, User, Mail, ShieldCheck, CheckCircle, X } from 'lucide-react';

interface SubmissionFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  onNavigate?: (page: string) => void;
  prefilledData?: { url?: string; email?: string };
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({
  onSubmit,
  onBack,
  onNavigate,
  prefilledData = {}
}) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    'website-url': prefilledData.url || '',
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState({ name: '', email: '' });
  const [honeypot, setHoneypot] = useState('');

  const validateForm = () => {
    const newErrors = { name: '', email: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        const submissionData = Object.fromEntries(formData);

        facebookPixel.trackLead({
          email: submissionData.email as string,
          firstName: (submissionData.name as string)?.split(' ')[0],
          lastName: (submissionData.name as string)?.split(' ').slice(1).join(' '),
        }, {
          content_name: 'Audit Request',
          content_category: 'Lead Generation'
        });

        onSubmit(submissionData);

        // @ts-ignore
        if (typeof gtag === 'function') {
        // @ts-ignore
          gtag('event', 'generate_lead', {
            'event_category': 'form_submission',
            'event_label': 'audit-request'
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

 return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowThankYou(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Thank You!
              </h2>
              <p className="text-gray-600 mb-6">
                We've received your request for a free affiliate report card. You'll receive your results within 48 hours at the email address you provided.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowThankYou(false)}
                  className="flex-1 px-4 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark-blue hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 px-4 py-2 bg-gray-100 border-2 border-gray-200 text-brand-dark-blue rounded-lg hover:bg-gray-200 transition-all duration-300"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: '#081F5D' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="/LOGO.png" 
                alt="AvidAffiliate Logo" 
                className="h-24 w-auto"
              />
            </div>
            <div className="flex items-center">
              <button onClick={onBack} className="text-white hover:text-brand-yellow transition-colors text-sm font-medium flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-brand-blue font-semibold mb-2">Step 2 of 2</p>
              <h1 className="text-4xl md:text-5xl font-light text-brand-dark-blue mb-6 tracking-tight">
                Almost there! Just a few details...
              </h1>
              <p className="text-xl text-gray-600 font-light">
                Your free report card will be sent to your email in 48 hours or less.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
              <form
                name="audit-request"
                method="POST"
                action="/thank-you"
                onSubmit={handleFormSubmit}
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="space-y-8"
              >
                <input type="hidden" name="form-name" value="audit-request" />
                <input
                  type="text"
                  name="bot-field"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                <div>
                  <label className="flex items-center text-lg font-medium text-brand-dark-blue mb-3">
                    <Globe className="h-5 w-5 mr-2 text-brand-blue" />
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="website-url"
                    value={formData['website-url']}
                    onChange={(e) => handleInputChange('website-url', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className={`w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-blue/20 ${
                      'border-gray-300 bg-white text-brand-dark-blue hover:border-brand-blue/50 focus:border-brand-blue'
                    }`}
                  />
                </div>

                <div>
                  <label className="flex items-center text-lg font-medium text-brand-dark-blue mb-3">
                    <User className="h-5 w-5 mr-2 text-brand-blue" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    className={`w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-blue/20 ${
                      errors.name ? 'border-red-500' : 'border-gray-300 bg-white text-brand-dark-blue hover:border-brand-blue/50 focus:border-brand-blue'
                    }`}
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="flex items-center text-lg font-medium text-brand-dark-blue mb-3">
                    <Mail className="h-5 w-5 mr-2 text-brand-blue" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-blue/20 ${
                      errors.email ? 'border-red-500' : 'border-gray-300 bg-white text-brand-dark-blue hover:border-brand-blue/50 focus:border-brand-blue'
                    }`}
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  <p className="text-xs text-gray-500 mt-2">Your free report card will be sent here. We never spam.</p>
                </div>

                <div className="pt-6">
                  <div className="text-center mb-6">
                      <p className="text-base font-medium text-green-600 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 mr-2" />
                          Join creators who have already increased their revenue with our insights.
                      </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={onBack}
                      className="flex items-center justify-center px-6 py-4 bg-transparent border-2 border-gray-300 text-brand-dark-blue font-medium rounded-xl hover:bg-gray-100 transition-all duration-300"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Back
                    </button>
                    
                    <button
                      type="submit"
                      className="flex-1 group inline-flex items-center justify-center px-8 py-4 text-white text-lg font-bold rounded-xl bg-brand-blue hover:bg-brand-dark-blue hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Get My Free Report Card
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center pt-4">
                    By clicking "Get My Free Report Card", you agree to our{' '}
                    <button type="button" onClick={() => onNavigate?.('terms')} className="underline hover:text-brand-blue">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button type="button" onClick={() => onNavigate?.('privacy')} className="underline hover:text-brand-blue">
                      Privacy Policy
                    </button>.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};