import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Users } from 'lucide-react';
import { Footer } from './Footer';

interface PrivacyPolicyPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'about' | 'team' | 'contact' | 'privacy' | 'terms' | 'affiliate_partners' | 'sitemap' | 'cookies') => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header Navigation */}
      <header className="bg-brand-yellow/95 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
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
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last Updated: January 15, 2025
            </p>
          </div>

          {/* Main Content */}
          <div id="privacy-policy-page" className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            {/* Introduction */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-brand-blue mr-3" />
                <h2 className="text-2xl font-bold text-brand-dark-blue">Introduction</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                At AvidAffiliate, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully to understand our practices regarding your personal data.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-brand-dark-blue">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Personal Identification Information</h3>
                  <p className="leading-relaxed">
                    We may collect personal identification information from users in various ways, including when users visit our site, register for services, fill out forms, or interact with other activities, services, features, or resources we make available. This may include your name, email address, website URL, and other contact information.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Usage Data and Analytics</h3>
                  <p className="leading-relaxed">
                    We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of visits. We use this information to analyze trends, administer the site, and gather demographic information.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Website Analysis Data</h3>
                  <p className="leading-relaxed">
                    When you use our audit services, we may analyze publicly available information from your website, including link structures, content, and affiliate relationships, to provide our optimization recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-brand-dark-blue">How We Use Your Information</h2>
              </div>
              <div className="space-y-3 text-gray-700">
                <p><strong>Service Provision:</strong> To provide, operate, and maintain our affiliate optimization services and deliver the results you request.</p>
                <p><strong>Communication:</strong> To send you information about our services, respond to your inquiries, and provide customer support.</p>
                <p><strong>Improvement:</strong> To understand how our services are used and to improve our website, services, and user experience.</p>
                <p><strong>Analysis:</strong> To analyze website performance, conduct research, and develop new features and services.</p>
                <p><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</p>
              </div>
            </div>

            {/* Sharing Your Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Sharing Your Information</h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <p><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, provided they agree to keep this information confidential.</p>
                <p><strong>Legal Requirements:</strong> We may disclose your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.</p>
                <p><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-brand-dark-blue">Data Security</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our site. We use industry-standard encryption and security protocols to safeguard your data.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Your Rights</h2>
              <div className="space-y-3 text-gray-600">
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <p><strong>Access:</strong> The right to request copies of your personal information.</p>
                <p><strong>Rectification:</strong> The right to request correction of inaccurate or incomplete information.</p>
                <p><strong>Erasure:</strong> The right to request deletion of your personal information under certain circumstances.</p>
                <p><strong>Portability:</strong> The right to request transfer of your information to another service provider.</p>
                <p><strong>Objection:</strong> The right to object to our processing of your personal information under certain circumstances.</p>
              </div>
            </div>

            {/* Changes to This Policy */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
              </p>
            </div>

            {/* Contact Us */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Contact Us About Privacy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, our data practices, or would like to exercise your rights regarding your personal information, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> hello@avidaffiliate.com</p>
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