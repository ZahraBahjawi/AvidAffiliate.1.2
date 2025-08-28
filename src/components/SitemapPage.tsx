import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Footer } from './Footer';

interface SitemapPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'about' | 'team' | 'contact' | 'privacy' | 'terms' | 'affiliate_partners' | 'sitemap' | 'cookies') => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header Navigation */}
      <header className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: '#081F5D' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
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
              <a href="#features" className="text-white hover:text-brand-yellow transition-colors text-sm font-medium" aria-label="View features section">Features</a>
              <a href="#how-it-works" className="text-white hover:text-brand-yellow transition-colors text-sm font-medium" aria-label="Learn how it works">How it works</a>
              <button onClick={() => onNavigate && onNavigate('contact')} className="text-white hover:text-brand-yellow transition-colors text-sm font-medium">Contact</button>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const heroForm = document.querySelector('#hero-form');
                  if (heroForm) {
                    heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  } else {
                    onBack && onBack();
                  }
                }}
                className="text-white px-6 py-2 rounded-md transition-all duration-300 text-sm font-medium bg-brand-blue hover:bg-brand-dark-blue hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              >
                Get my free Report Card
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
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
              <h1 className="text-4xl font-bold text-brand-dark-blue mb-4">
                Sitemap
              </h1>
              <p className="text-lg text-gray-600">
                Navigate through all available pages on AvidAffiliate
              </p>
            </div>

            {/* Sitemap Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Main Pages */}
                <div>
                  <h2 className="text-xl font-bold text-brand-dark-blue mb-4">Main Pages</h2>
                  <ul className="space-y-3">
                    <li>
                      <button
                        onClick={onBack}
                        className="flex items-center text-brand-blue hover:text-brand-dark-blue transition-colors"
                      >
                        <span>Home</span>
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        Main landing page with free affiliate audit tool and hero form
                      </p>
                    </li>
                    <li>
                      <button onClick={onBack} className="text-brand-blue hover:text-brand-dark-blue transition-colors">Get Free Report Card</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        Submit your website for a comprehensive affiliate revenue audit
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Get Started */}
                <div>
                  <h2 className="text-xl font-bold text-brand-dark-blue mb-4">Get Started</h2>
                  <ul className="space-y-3">
                    <li>
                      <button onClick={onBack} className="text-brand-blue hover:text-brand-dark-blue transition-colors">Get Free Report Card</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        Start with your free affiliate audit and revenue optimization report
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Features & Information */}
                <div>
                  <h2 className="text-xl font-bold text-brand-dark-blue mb-4">Features & Information</h2>
                  <ul className="space-y-3">
                    <li>
                      <button onClick={onBack} className="text-brand-blue hover:text-brand-dark-blue transition-colors">How It Works</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        Learn about our 3-step audit and optimization process
                      </p>
                    </li>
                    <li>
                      <button onClick={onBack} className="text-brand-blue hover:text-brand-dark-blue transition-colors">Features & Benefits</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        Smart link analysis, proprietary database, and done-for-you implementation
                      </p>
                    </li>
                    <li>
                      <button onClick={onBack} className="text-brand-blue hover:text-brand-dark-blue transition-colors">Supported Networks</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        Amazon, ShareASale, CJ Affiliate, Impact, and 35,000+ programs
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Company Pages */}
                <div>
                  <h2 className="text-xl font-bold text-brand-dark-blue mb-4">Company Pages</h2>
                  <ul className="space-y-3">
                    <li>
                      <button onClick={() => onNavigate && onNavigate('about')} className="text-brand-blue hover:text-brand-dark-blue transition-colors">About Us</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        Learn about our company, mission, and values
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('team')} className="text-brand-blue hover:text-brand-dark-blue transition-colors">Our Team</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        Meet the experts behind AvidAffiliate
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('contact')} className="text-brand-blue hover:text-brand-dark-blue transition-colors">Contact Us</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        Get in touch with our team
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Resources & Legal */}
                <div>
                  <h2 className="text-xl font-bold text-brand-dark-blue mb-4">Resources & Legal</h2>
                  <ul className="space-y-3">
                    <li>
                      <button onClick={() => onNavigate && onNavigate('affiliate_partners')} className="text-brand-blue hover:text-brand-dark-blue transition-colors">Affiliate Network Guide</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        Guide to top affiliate networks with referral links and recommendations
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('privacy')} className="text-brand-blue hover:text-brand-dark-blue transition-colors">Privacy Policy</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        How we handle your data
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('terms')} className="text-brand-blue hover:text-brand-dark-blue transition-colors">Terms of Service</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        Terms and conditions of use
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('cookies')} className="text-brand-blue hover:text-brand-dark-blue transition-colors">Cookie Policy</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        How we use cookies and manage your preferences
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('sitemap')} className="text-brand-blue hover:text-brand-dark-blue transition-colors">Sitemap</button>
                      <p className="text-sm text-gray-500 ml-0 mt-1">
                        This page - complete site navigation
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-brand-dark-blue mb-4">Contact</h2>
                <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> hello@avidaffiliate.com
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Response Time:</strong> Within 24 hours
                  </p>
                  <p className="text-gray-600">
                    For questions about audits, services, partnership opportunities, or technical support.
                  </p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer onNavigate={onNavigate} onNext={onBack} />
    </div>
  );
};