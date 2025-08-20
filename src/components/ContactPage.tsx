import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Send, Phone, CheckCircle, User, FileText, Briefcase, Handshake, X } from 'lucide-react';
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

export const ContactPage: React.FC<ContactPageProps> = ({ onBack, onNavigate }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showThankYou, setShowThankYou] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
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
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    // Let the form submit naturally, then show popup
    setShowThankYou(true);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div className="flex-grow">
            <header className="bg-black/95 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <img src="/LOGO.png" alt="AvidAffiliate Logo" className="h-24 w-auto" />
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    <button onClick={onBack} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Home</button>
                    <button onClick={() => onNavigate && onNavigate('about')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">About</button>
                    <button onClick={() => onNavigate && onNavigate('team')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Team</button>
                    <button onClick={() => onNavigate && onNavigate('contact')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Contact</button>
                </nav>
                <div className="flex items-center space-x-4">
                    <button
                    onClick={onBack}
                    className="text-white px-6 py-2 rounded-md transition-all duration-300 text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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
                <div className="bg-slate-800 rounded-2xl shadow-xl p-8 text-center border border-slate-700">
                    <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-800">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                    Message Sent Successfully!
                    </h2>
                    <p className="text-gray-300 mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <div className="text-gray-400 text-sm mb-6">
                        While you wait, feel free to learn more about{' '}
                        <button onClick={() => onNavigate?.('about')} className="underline text-blue-400 hover:text-blue-300">our mission</button> or{' '}
                        <button onClick={() => onNavigate?.('team')} className="underline text-blue-400 hover:text-blue-300">meet the team</button>.
                    </div>
                    <button
                    onClick={onBack}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
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
    <div className="min-h-screen bg-slate-900 flex flex-col" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="flex-grow">
        {/* Thank You Popup */}
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
                  Message Sent!
                </h2>
                
                <p className="text-gray-600 mb-6">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowThankYou(false)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                  >
                    Continue Browsing
                  </button>
                  <button
                    onClick={onBack}
                    className="flex-1 px-4 py-2 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button onClick={onBack} aria-label="Go to homepage">
                <img 
                  src="/LOGO.png" 
                  alt="AvidAffiliate Logo" 
                  className="h-24 w-auto"
                />
              </button>
            </div>
                </button>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={onBack} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Home</button>
              <button onClick={() => onNavigate && onNavigate('about')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">About</button>
              <button onClick={() => onNavigate && onNavigate('team')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Team</button>
              <button onClick={() => onNavigate && onNavigate('contact')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Contact</button>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-white px-6 py-2 rounded-md transition-all duration-300 text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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
                    className="flex items-center text-white hover:text-orange-300 mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </button>
                )}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Contact Us
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Have questions about our services? Need support with your account? Looking to explore partnership opportunities? We'd love to hear from you.
                </p>
            </div>

            <div id="contact-page" className="grid lg:grid-cols-2 gap-12">
                <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                
                <form
                    name="contact-form"
                    method="POST"
                 onSubmit={handleFormSubmit}
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    className="space-y-6"
                >
                    <input type="hidden" name="form-name" value="contact-form" />
                    
                    {/* 2. Honeypot Field for spam prevention */}
                    <div className="absolute" style={{left: '-5000px'}} aria-hidden="true">
                        <label htmlFor="bot-field">Don't fill this out if you're human:</label>
                        <input type="text" name="bot-field" id="bot-field" tabIndex={-1} autoComplete="off" />
                    </div>
                    
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white"
                        placeholder="Your full name"
                    />
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white"
                        placeholder="your@email.com"
                    />
                    </div>

                    <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">Reason for Contact *</label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white"
                    >
                        <option value="" disabled>Please select a reason...</option>
                        <option value="Question about my Report Card">Question about my Report Card</option>
                        <option value="Full Audit & Services Inquiry">Full Audit & Services Inquiry</option>
                        <option value="Partnership Opportunities">Partnership Opportunities</option>
                        <option value="Media Inquiry">Media Inquiry</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>

                    <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Message *</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-slate-700 text-white"
                        placeholder="Tell us more about your inquiry..."
                    />
                    </div>

                    <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-400 hover:to-red-400 hover:shadow-xl hover:shadow-orange-500/50 transform hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    <Send className="h-5 w-5 mr-2" />Send Message
                    </button>
                </form>
                </div>

                <div className="space-y-8">
                  <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex items-center gap-6">
                      <img src="/david_headshot.jpg" alt="Founder of AvidAffiliate" className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"/>
                      <div>
                          <h3 className="text-xl font-bold text-white mb-2">A Note from Our Founder</h3>
                          <p className="text-gray-300 leading-relaxed">
                              Every message is read by our team. We're excited to hear from you and are committed to helping you unlock your site's true potential - David
                          </p>
                      </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-800">
                      <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                      For direct inquiries or if you prefer to use your own email client.
                      </p>
                      <div className="space-y-2 text-gray-300">
                      <p><strong>Email:</strong> hello@avidaffiliate.com</p>
                      </div>
                      <p className="text-sm text-gray-400 mt-4">
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