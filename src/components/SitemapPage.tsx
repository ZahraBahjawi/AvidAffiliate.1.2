import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Footer } from './Footer';

interface SitemapPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'about' | 'team' | 'contact' | 'privacy' | 'terms' | 'affiliate_partners' | 'sitemap' | 'cookies') => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-900" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header Navigation */}
      <header className="bg-black/95 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
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
                  className="flex items-center text-white hover:text-orange-300 mb-6 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </button>
              )}
              <h1 className="text-4xl font-bold text-white mb-4">
                Sitemap
              </h1>
              <p className="text-lg text-gray-300">
                Navigate through all available pages on AvidAffiliate
              </p>
            </div>

            {/* Sitemap Content */}
            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Main Pages */}
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Main Pages</h2>
                  <ul className="space-y-3">
                    <li>
                      <button
                        onClick={onBack}
                        className="flex items-center text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        <span>Home</span>
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        Main landing page with free affiliate audit tool and hero form
                      </p>
                    </li>
                    <li>
                      <button onClick={onBack} className="text-orange-400 hover:text-orange-300 transition-colors">Get Free Report Card</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        Submit your website for a comprehensive affiliate revenue audit
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Get Started */}
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Get Started</h2>
                  <ul className="space-y-3">
                    <li>
                      <button onClick={onBack} className="text-orange-400 hover:text-orange-300 transition-colors">Get Free Report Card</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        Start with your free affiliate audit and revenue optimization report
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Features & Information */}
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Features & Information</h2>
                  <ul className="space-y-3">
                    <li>
                      <button onClick={onBack} className="text-orange-400 hover:text-orange-300 transition-colors">How It Works</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        Learn about our 3-step audit and optimization process
                      </p>
                    </li>
                    <li>
                      <button onClick={onBack} className="text-orange-400 hover:text-orange-300 transition-colors">Features & Benefits</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        Smart link analysis, proprietary database, and done-for-you implementation
                      </p>
                    </li>
                    <li>
                      <button onClick={onBack} className="text-orange-400 hover:text-orange-300 transition-colors">Supported Networks</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        Amazon, ShareASale, CJ Affiliate, Impact, and 35,000+ programs
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Resources & Legal */}
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Company Pages</h2>
                  <ul className="space-y-3">
                    <li>
                      <button onClick={() => onNavigate && onNavigate('about')} className="text-orange-400 hover:text-orange-300 transition-colors">About Us</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        Learn about our company, mission, and values
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('team')} className="text-orange-400 hover:text-orange-300 transition-colors">Our Team</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        Meet the experts behind AvidAffiliate
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('contact')} className="text-orange-400 hover:text-orange-300 transition-colors">Contact Us</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        Get in touch with our team
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Resources & Legal */}
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Resources & Legal</h2>
                  <ul className="space-y-3">
                    <li>
                      <button onClick={() => onNavigate && onNavigate('affiliate_partners')} className="text-orange-400 hover:text-orange-300 transition-colors">Affiliate Network Guide</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        Guide to top affiliate networks with referral links and recommendations
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('privacy')} className="text-orange-400 hover:text-orange-300 transition-colors">Privacy Policy</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        How we handle your data
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('terms')} className="text-orange-400 hover:text-orange-300 transition-colors">Terms of Service</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        Terms and conditions of use
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('cookies')} className="text-orange-400 hover:text-orange-300 transition-colors">Cookie Policy</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        How we use cookies and manage your preferences
                      </p>
                    </li>
                    <li>
                      <button onClick={() => onNavigate && onNavigate('sitemap')} className="text-orange-400 hover:text-orange-300 transition-colors">Sitemap</button>
                      <p className="text-sm text-gray-400 ml-0 mt-1">
                        This page - complete site navigation
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-white mb-4">Contact</h2>
                <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                  <p className="text-gray-300 mb-2">
                    <strong>Email:</strong> hello@avidaffiliate.com
                  </p>
                  <p className="text-gray-300 mb-2">
                    <strong>Response Time:</strong> Within 24 hours
                  </p>
                  <p className="text-gray-400">
                    For questions about audits, services, partnership opportunities, or technical support.
                  </p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-400">
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