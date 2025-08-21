import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Send, CheckCircle, Users, TrendingUp, Zap, X } from 'lucide-react';
import { Footer } from './Footer';

interface ServicesPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'about' | 'team' | 'contact' | 'privacy' | 'terms' | 'affiliate_partners' | 'sitemap' | 'cookies' | 'services') => void;
}

interface ServiceFormData {
  name: string;
  email: string;
  website: string;
  trafficTier: string;
  revenueTier: string;
  goals: string;
  message: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBack, onNavigate }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    email: '',
    website: '',
    trafficTier: '',
    revenueTier: '',
    goals: '',
    message: ''
  });

  const [showThankYou, setShowThankYou] = useState(false);
  const [submitSuccess] = useState(false);

  const handleInputChange = (field: keyof ServiceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    // Let the form submit naturally, then show popup
    setShowThankYou(true);
  };

  // Show success message
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex items-center">
                  <img 
                    src="/LOGO.png" 
                    alt="AvidAffiliate Logo" 
                    className="h-8 w-8 mr-3"
                  />
                  <img 
                    src="/LOGO.png" 
                    alt="AvidAffiliate Logo" 
                    className="h-8 w-8 mr-3"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Revenue Optimization</h1>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-8">
                <button onClick={onBack} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</button>
                <button onClick={() => onNavigate && onNavigate('about')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">About</button>
                <button onClick={() => onNavigate && onNavigate('team')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Team</button>
                <button onClick={() => onNavigate && onNavigate('contact')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</button>
              </nav>

              {/* CTA Button */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBack}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
                >
                  Free Scorecard
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Request Submitted Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in our services. You should receive a confirmation email shortly at <strong>{formData.email}</strong>.
                </p>
                <p className="text-gray-600 mb-6">
                  We'll be in touch within 24 hours to discuss how we can help maximize your affiliate revenue.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mr-4"
                >
                  Submit Another Request
                </button>
                <button
                  onClick={onBack}
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
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
                Request Submitted!
              </h2>
              
              <p className="text-gray-600 mb-6">
                Thank you for your interest in our services. We'll be in touch within 24 hours to discuss how we can help maximize your affiliate revenue.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowThankYou(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <header className="bg-black/95 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {
/* Logo */
}
<div className="flex items-center">
  <button onClick={onBack} aria-label="Go to homepage">
    <img
      src="/LOGO.png"
      alt="AvidAffiliate Logo"
      className="h-24 w-auto"
    />
  </button>
</div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={onBack} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Home</button>
              <button onClick={() => onNavigate && onNavigate('about')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">About</button>
              <button onClick={() => onNavigate && onNavigate('team')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Team</button>
              <button onClick={() => onNavigate && onNavigate('contact')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Contact</button>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-white px-6 py-2 rounded-md transition-all duration-300 text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Get Free Scorecard
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </button>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Beyond the Free Audit
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Ready to maximize your affiliate revenue? Let's discuss how we can help you implement and optimize your monetization strategy.
              </p>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - What We Offer */}
              <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">How We Can Help</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 border border-blue-800">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Complete Site Analysis</h3>
                      <p className="text-gray-300">
                        Go beyond the 1,000-link free audit with comprehensive analysis of your entire website, including deep-dive competitor research and market opportunity assessment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-900/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 border border-green-800">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Expert Implementation</h3>
                      <p className="text-gray-300">
                        Whether you prefer hands-on guidance or a completely done-for-you approach, we'll work with you to implement the optimizations that will drive the biggest revenue impact.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 border border-purple-800">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Ongoing Optimization</h3>
                      <p className="text-gray-300">
                        Affiliate marketing is dynamic. We can provide ongoing monitoring, optimization, and strategic guidance to ensure your revenue continues to grow.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-800">
                  <h3 className="text-lg font-semibold text-white mb-2">Our Approach</h3>
                  <p className="text-gray-300">
                    Every website is unique. We'll discuss your specific situation, goals, and preferences to create a tailored strategy that fits your needs and timeline.
                  </p>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">Let's Discuss Your Goals</h2>
                
                <form 
                  name="services-inquiry"
                  method="POST"
                 onSubmit={handleFormSubmit}
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  className="space-y-6"
                >
                  {/* Netlify form detection */}
                  <input type="hidden" name="form-name" value="services-inquiry" />
                  
                  {/* Honeypot field for spam protection */}
                  <div style={{ display: 'none' }}>
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white ${
                        'border-slate-600'
                      }`}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white ${
                        'border-slate-600'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-white mb-2">
                      Website URL *
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white ${
                        'border-slate-600'
                      }`}
                      placeholder="https://www.yourwebsite.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="traffic" className="block text-sm font-medium text-white mb-2">
                      Monthly Traffic *
                    </label>
                    <select
                      id="traffic"
                      name="traffic-tier"
                      value={formData.trafficTier}
                      onChange={(e) => handleInputChange('trafficTier', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white ${
                        'border-slate-600'
                      }`}
                    >
                      <option value="">Select traffic level</option>
                      <option value="<10k">Less than 10,000 visitors</option>
                      <option value="10k-50k">10,000 - 50,000 visitors</option>
                      <option value="50k-250k">50,000 - 250,000 visitors</option>
                      <option value="250k+">More than 250,000 visitors</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="revenue" className="block text-sm font-medium text-white mb-2">
                      Current Monthly Affiliate Revenue *
                    </label>
                    <select
                      id="revenue"
                      name="revenue-tier"
                      value={formData.revenueTier}
                      onChange={(e) => handleInputChange('revenueTier', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white ${
                        'border-slate-600'
                      }`}
                    >
                      <option value="">Select revenue level</option>
                      <option value="<100">Less than $100</option>
                      <option value="100-1000">$100 - $1,000</option>
                      <option value="1000-5000">$1,000 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000+">More than $10,000</option>
                      <option value="prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="goals" className="block text-sm font-medium text-white mb-2">
                      What are your main goals? *
                    </label>
                    <textarea
                      id="goals"
                      name="goals"
                      rows={3}
                      value={formData.goals}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-slate-700 text-white ${
                        'border-slate-600'
                      }`}
                      placeholder="e.g., Increase affiliate revenue, optimize existing links, implement new programs..."
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Additional Information
                    </label>
                    <textarea
                      id="message"
                      name="additional-info"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-slate-700 text-white"
                      placeholder="Any specific questions or additional context you'd like to share..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-400 hover:to-red-400 hover:shadow-xl hover:shadow-orange-500/50 transform hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </form>

                <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-800">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-400">What happens next?</span>
                  </div>
                  <ul className="text-sm text-green-300 space-y-1">
                    <li>• We'll review your information and goals</li>
                    <li>• Schedule a strategy discussion within 48 hours</li>
                    <li>• Create a tailored proposal for your situation</li>
                    <li>• No pressure - we're here to help you succeed</li>
                  </ul>
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