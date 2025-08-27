import React from 'react';
import { ArrowLeft, Cookie, Shield, Eye, Settings } from 'lucide-react';
import { Footer } from './Footer';

interface CookiesPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'about' | 'team' | 'contact' | 'privacy' | 'terms' | 'affiliate_partners' | 'sitemap' | 'cookies') => void;
}

export const CookiesPage: React.FC<CookiesPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Scroll overlay for darkening effect */}
      <div className="scroll-overlay"></div>
      {/* Header Navigation */}
      <header className="bg-white/95 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
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
              <a href="#features" className="text-brand-dark-blue hover:text-brand-blue transition-colors text-sm font-medium" aria-label="View features section">Features</a>
              <a href="#how-it-works" className="text-brand-dark-blue hover:text-brand-blue transition-colors text-sm font-medium" aria-label="Learn how it works">How it works</a>
              <button onClick={() => onNavigate && onNavigate('contact')} className="text-brand-dark-blue hover:text-brand-blue transition-colors text-sm font-medium">Contact</button>
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
              <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue mb-4">
                Cookie Policy
              </h1>
              <p className="text-gray-600">
                Last Updated: August 5th, 2025
              </p>
            </div>

            {/* Main Content */}
            <div id="cookies-page" className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-gray-200">
              
              {/* Introduction */}
              <section>
                <div className="flex items-center mb-4">
                  <Cookie className="h-6 w-6 text-brand-blue mr-3" />
                  <h2 className="text-2xl font-bold text-brand-dark-blue">What Are Cookies?</h2>
                </div>
                <div className="text-gray-600 space-y-3">
                  <p>
                    Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and to provide information to website owners about how users interact with their sites.
                  </p>
                  <p>
                    At AvidAffiliate, we use cookies to enhance your browsing experience, analyze website traffic, and improve our services. This Cookie Policy explains what cookies we use, why we use them, and how you can manage your cookie preferences.
                  </p>
                </div>
              </section>

              {/* Types of Cookies */}
              <section>
                <div className="flex items-center mb-4">
                  <Settings className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-brand-dark-blue">Types of Cookies We Use</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Essential Cookies</h3>
                    <p className="text-blue-700 mb-3">
                      These cookies are necessary for the website to function properly and cannot be disabled. They enable core functionality such as:
                    </p>
                    <ul className="list-disc list-inside text-blue-700 space-y-1">
                      <li>Security and authentication</li>
                      <li>Form submission and data processing</li>
                      <li>Session management</li>
                      <li>Load balancing and website performance</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">Analytics Cookies</h3>
                    <p className="text-green-700 mb-3">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously:
                    </p>
                    <ul className="list-disc list-inside text-green-700 space-y-1">
                      <li>Number of visitors and page views</li>
                      <li>How long visitors spend on our site</li>
                      <li>Which pages are most popular</li>
                      <li>Traffic sources and user behavior patterns</li>
                    </ul>
                    <p className="text-green-800 text-sm mt-3">
                      <strong>Third-party services:</strong> We may use Google Analytics or similar services to collect this information.
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3">Functional Cookies</h3>
                    <p className="text-purple-700 mb-3">
                      These cookies enable enhanced functionality and personalization:
                    </p>
                    <ul className="list-disc list-inside text-purple-700 space-y-1">
                      <li>Remembering your preferences and settings</li>
                      <li>Providing personalized content and recommendations</li>
                      <li>Enabling social media features</li>
                      <li>Improving user experience based on previous visits</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">Marketing Cookies</h3>
                    <p className="text-yellow-700 mb-3">
                      These cookies are used to deliver relevant advertisements and track advertising effectiveness:
                    </p>
                    <ul className="list-disc list-inside text-yellow-700 space-y-1">
                      <li>Tracking visits across websites</li>
                      <li>Building a profile of your interests</li>
                      <li>Showing relevant advertisements</li>
                      <li>Measuring advertising campaign performance</li>
                    </ul>
                    <p className="text-yellow-800 text-sm mt-3">
                      <strong>Note:</strong> We may work with advertising partners who use these cookies to show you relevant ads on other websites.
                    </p>
                  </div>
                </div>
              </section>

              {/* Third-Party Cookies */}
              <section>
                <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Third-Party Cookies</h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    Some cookies on our website are set by third-party services that appear on our pages. We do not control these cookies, and they are subject to the respective third parties' privacy policies.
                  </p>
                  <p>
                    <strong>Common third-party services we may use include:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                    <li><strong>Social Media Platforms:</strong> For social sharing buttons and embedded content</li>
                    <li><strong>Payment Processors:</strong> For secure payment processing</li>
                    <li><strong>Customer Support Tools:</strong> For live chat and support features</li>
                  </ul>
                </div>
              </section>

              {/* Managing Cookies */}
              <section>
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-brand-dark-blue">Managing Your Cookie Preferences</h2>
                </div>
                <div className="text-gray-600 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Browser Settings</h3>
                    <p className="mb-3">
                      Most web browsers allow you to control cookies through their settings. You can:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>View what cookies are stored on your device</li>
                      <li>Delete existing cookies</li>
                      <li>Block cookies from specific websites</li>
                      <li>Block all cookies (though this may affect website functionality)</li>
                      <li>Set your browser to notify you when cookies are being set</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Browser-Specific Instructions</h3>
                    <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                      <ul className="space-y-2 text-sm">
                        <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                        <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                        <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                        <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Opt-Out Tools</h3>
                    <p>
                      For analytics and advertising cookies, you can also use these opt-out tools:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>Google Analytics:</strong> Use the Google Analytics Opt-out Browser Add-on</li>
                      <li><strong>Advertising:</strong> Visit the Digital Advertising Alliance's opt-out page</li>
                      <li><strong>Network Advertising Initiative:</strong> Use their consumer opt-out tool</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Impact of Disabling Cookies */}
              <section>
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-yellow-600 mr-3" />
                  <h2 className="text-2xl font-bold text-brand-dark-blue">Impact of Disabling Cookies</h2>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-yellow-700 mb-3">
                    <strong>Please note:</strong> Disabling certain cookies may affect your experience on our website:
                  </p>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1">
                    <li>Some features may not work properly or at all</li>
                    <li>You may need to re-enter information more frequently</li>
                    <li>Personalized content and recommendations may not be available</li>
                    <li>We may not be able to remember your preferences</li>
                    <li>Website performance and functionality may be reduced</li>
                  </ul>
                </div>
              </section>

              {/* Updates to Cookie Policy */}
              <section>
                <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Updates to This Cookie Policy</h2>
                <div className="text-gray-600 space-y-3">
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the "Last Updated" date at the top of this policy.
                  </p>
                  <p>
                    We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies and related technologies.
                  </p>
                  <p>
                    If we make material changes to this policy, we may provide additional notice through our website or other communication methods.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Questions About Cookies?</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> hello@avidaffiliate.com</p>
                    <p><strong>Subject Line:</strong> Cookie Policy Inquiry</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    We will respond to your inquiry within 48 hours during normal business days.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
      
      <Footer onNavigate={onNavigate} onNext={onBack} />
    </div>
  );
};