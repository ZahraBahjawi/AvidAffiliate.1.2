import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Send, CheckCircle } from 'lucide-react';
import { logFormSubmission } from '../utils/submissionLogger';
import { Footer } from './Footer';

interface ContactPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'about' | 'team' | 'contact' | 'privacy' | 'terms' | 'affiliate_partners' | 'sitemap' | 'cookies') => void;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack, onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const netlifyFormData = new FormData();
      netlifyFormData.append('form-name', 'contact-form');
      Object.keys(formData).forEach(key => {
        netlifyFormData.append(key, formData[key as keyof ContactFormData]);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(netlifyFormData as any).toString()
      });

      if (response.ok) {
        logFormSubmission('contact', formData);
        setSubmitSuccess(true);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert('There was an error sending your message. Please try again or email us directly at hello@avidaffiliate.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Header remains consistent */}
        <header className="bg-slate-900/80 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button onClick={onBack} aria-label="Go to homepage">
                  <img src="/LOGO.png" alt="AvidAffiliate Logo" className="h-24 w-auto"/>
                </button>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</button>
                <a href="/#about-us" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About</a>
                <button onClick={() => onNavigate && onNavigate('team')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Team</button>
              </nav>
              <div className="flex items-center space-x-4">
                <button onClick={onBack} className="text-white px-6 py-2 rounded-md transition-colors text-sm font-medium bg-[#FF6B35] hover:bg-[#E55A2B]">
                  Free Report Card
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-800 rounded-2xl shadow-xl p-8 text-center border border-slate-700">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Message Sent Successfully!
                </h2>
                <p className="text-gray-300 mb-6">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button onClick={onBack} className="inline-flex items-center px-6 py-3 bg-[#FF6B35] text-white font-medium rounded-lg hover:bg-[#E55A2B] transition-colors">
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer onNavigate={onNavigate} onNext={onBack} onBack={onBack} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-900/80 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={onBack} aria-label="Go to homepage">
                <img src="/LOGO.png" alt="AvidAffiliate Logo" className="h-24 w-auto" />
              </button>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
                <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</button>
                <a href="/#about-us" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About</a>
                <button onClick={() => onNavigate && onNavigate('team')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Team</button>
            </nav>
            <div className="flex items-center space-x-4">
                <button onClick={onBack} className="text-white px-6 py-2 rounded-md transition-colors text-sm font-medium bg-[#FF6B35] hover:bg-[#E55A2B]">
                    Free Report Card
                </button>
            </div>
          </div>
        </div>
      </header>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              {onBack && (
                <button onClick={onBack} className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </button>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <div id="contact-page" className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-8">
              <form 
                name="contact-form"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact-form" />
                <div style={{ display: 'none' }}>
                  <label>
                    Don’t fill this out if you’re human: <input name="bot-field" />
                  </label>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-slate-600'}`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-slate-600'}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${errors.subject ? 'border-red-500' : 'border-slate-600'}`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none ${errors.message ? 'border-red-500' : 'border-slate-600'}`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-4 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#E55A2B] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
                >
                  {isSubmitting ? 'Sending...' : <><Send className="h-5 w-5 mr-2" /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} onNext={onBack} onBack={onBack}/>
    </div>
  );
};

export default ContactPage;