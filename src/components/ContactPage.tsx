import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Send, CheckCircle } from 'lucide-react';
import { logFormSubmission } from '../utils/submissionLogger';
import { Footer } from './Footer';
import { sendConfirmationEmail } from '../utils/emailService';

// Helper function to encode form data for Netlify
const encode = (data: { [key: string]: any }) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

interface ContactPageProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack, onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [formLoadTime, setFormLoadTime] = useState(0);

  useEffect(() => {
    // Record the time the form loads for spam prevention
    setFormLoadTime(Date.now());

    const prefillData = localStorage.getItem('contact_prefill');
    if (prefillData) {
      try {
        const parsedData = JSON.parse(prefillData);
        setFormData({
          name: parsedData.name || '',
          email: parsedData.email || '',
          subject: parsedData.subject || '',
          message: parsedData.message || ''
        });
        localStorage.removeItem('contact_prefill');
      } catch (error) {
        console.error('Error parsing prefill data:', error);
      }
    }
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
    
    if (!formData.subject.trim()) newErrors.subject = 'Please select a reason for your inquiry';
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Timestamp check for spam prevention
    if (Date.now() - formLoadTime < 2000) {
      console.warn("Spam prevention: Form submitted too quickly.");
      // Silently fail to prevent alerting bots
      setSubmitSuccess(true);
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const formDataWithFormName = {
      'form-name': 'contact-form',
      ...formData
    };

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(formDataWithFormName)
    })
    .then(() => {
      logFormSubmission('contact', formData);
      
      // Send confirmation email
      sendConfirmationEmail('contact', formData)
        .then(() => console.log('✅ Confirmation email sent to user'))
        .catch(() => console.warn('⚠️ Confirmation email failed'));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch(error => {
      console.error('Contact form submission error:', error);
      alert('There was an error sending your message. Please try again or email us directly at hello@avidaffiliate.com');
    })
    .finally(() => setIsSubmitting(false));
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div className="flex-grow">
            <header className="bg-brand-yellow/95 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <button onClick={onBack} aria-label="Go to homepage">
                      <img src="/LOGO.png" alt="AvidAffiliate Logo" className="h-24 w-auto" />
                    </button>
                  </div>
                  <nav className="hidden md:flex items-center space-x-8">
                      <button onClick={() => onNavigate && onNavigate('home#features')} className="text-brand-dark-blue hover:text-brand-blue transition-colors text-sm font-medium">Features</button>
                      <button onClick={() => onNavigate && onNavigate('home#how-it-works')} className="text-brand-dark-blue hover:text-brand-blue transition-colors text-sm font-medium">How it works</button>
                      <button onClick={() => onNavigate && onNavigate('contact')} className="text-brand-dark-blue hover:text-brand-blue transition-colors text-sm font-medium">Contact</button>
                  </nav>
                  <div className="flex items-center space-x-4">
                      <button
                      onClick={() => onNavigate && onNavigate('home#hero-form')}
                      className="text-white px-6 py-2 rounded-md transition-colors text-sm font-medium bg-brand-blue hover:bg-brand-dark-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                      >
                      Get my free Report Card
                      </button>
                  </div>
                </div>
            </div>
            </header>

            <div className="py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">
                    Message Sent Successfully!
                    </h2>
                    <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <div className="text-gray-500 text-sm mb-6">
                        While you wait, feel free to learn more about{' '}
                        <button onClick={() => onNavigate?.('home#about-us')} className="underline text-brand-blue hover:text-brand-dark-blue">our mission</button> or{' '}
                        <button onClick={() => onNavigate?.('team')} className="underline text-brand-blue hover:text-brand-dark-blue">meet the team</button>.
                    </div>
                    <button
                    onClick={onBack}
                    className="inline-flex items-center px-6 py-3 bg-brand-blue text-white font-medium rounded-lg hover:bg-brand-dark-blue transition-colors"
                    >
                    Back to Home
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        <Footer onNavigate={onNavigate} onNext={onBack} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="flex-grow">
        <header className="bg-brand-yellow/95 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button onClick={onBack} aria-label="Go to homepage">
                  <img src="/LOGO.png" alt="AvidAffiliate Logo" className="h-24 w-auto" />
                </button>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                  <button onClick={() => onNavigate && onNavigate('home#features')} className="text-brand-dark-blue hover:text-brand-blue transition-colors text-sm font-medium">Features</button>
                  <button onClick={() => onNavigate && onNavigate('home#how-it-works')} className="text-brand-dark-blue hover:text-brand-blue transition-colors text-sm font-medium">How it works</button>
                  <button onClick={() => onNavigate && onNavigate('contact')} className="text-brand-dark-blue hover:text-brand-blue transition-colors text-sm font-medium">Contact</button>
              </nav>
              <div className="flex items-center space-x-4">
                  <button
                  onClick={() => onNavigate && onNavigate('home#hero-form')}
                  className="text-white px-6 py-2 rounded-md transition-colors text-sm font-medium bg-brand-blue hover:bg-brand-dark-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                  >
                  Get my free Report Card
                  </button>
              </div>
            </div>
        </div>
        </header>

        <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                {onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center text-brand-dark-blue hover:text-brand-blue mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </button>
                )}
                <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue mb-4">
                Contact Us
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions about our services? Need support with your account? Looking to explore partnership opportunities? We'd love to hear from you.
                </p>
            </div>

            <div id="contact-page" className="grid lg:grid-cols-2 gap-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-brand-dark-blue mb-6">Get in Touch</h2>
                
                <form
                    name="contact-form"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <input type="hidden" name="form-name" value="contact-form" />
                    
                    {/* 2. Honeypot Field for spam prevention */}
                    <div className="absolute" style={{left: '-5000px'}} aria-hidden="true">
                        <label htmlFor="bot-field">Don't fill this out if you're human:</label>
                        <input type="text" name="bot-field" id="bot-field" tabIndex={-1} autoComplete="off" />
                    </div>
                    
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-dark-blue mb-2">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 text-brand-dark-blue ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                        placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-dark-blue mb-2">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 text-brand-dark-blue ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                        placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-brand-dark-blue mb-2">Reason for Contact *</label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent bg-gray-50 text-brand-dark-blue ${errors.subject ? 'border-red-400' : 'border-gray-300'}`}
                    >
                        <option value="" disabled>Please select a reason...</option>
                        <option value="Question about my Report Card">Question about my Report Card</option>
                        <option value="Full Audit & Services Inquiry">Full Audit & Services Inquiry</option>
                        <option value="Partnership Opportunities">Partnership Opportunities</option>
                        <option value="Media Inquiry">Media Inquiry</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-dark-blue mb-2">Message *</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent resize-none bg-gray-50 text-brand-dark-blue ${errors.message ? 'border-red-400' : 'border-gray-300'}`}
                        placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-6 py-4 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark-blue disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
                    >
                    {isSubmitting ? (
                        <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Sending...</>
                    ) : (
                        <><Send className="h-5 w-5 mr-2" />Send Message</>
                    )}
                    </button>
                </form>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 flex items-center gap-6">
                      <img src="/david_headshot.jpg" alt="Founder of AvidAffiliate" className="w-24 h-24 rounded-full object-cover border-2 border-brand-blue"/>
                      <div>
                          <h3 className="text-xl font-bold text-brand-dark-blue mb-2">A Note from Our Founder</h3>
                          <p className="text-gray-600 leading-relaxed">
                              Every message is read by our team. We're excited to hear from you and are committed to helping you unlock your site's true potential - David
                          </p>
                      </div>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                      <h3 className="text-xl font-bold text-brand-dark-blue mb-4">Contact Information</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                      For direct inquiries or if you prefer to use your own email client.
                      </p>
                      <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> hello@avidaffiliate.com</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-4">
                      We typically respond within 24 hours.
                      </p>
                  </div>
                </div>
            </div>
            </div>
        </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} onNext={onBack} />
    </div>
  );
};