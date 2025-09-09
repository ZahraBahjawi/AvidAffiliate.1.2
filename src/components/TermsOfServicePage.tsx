import React from 'react';
import { ArrowLeft, Shield, FileText, Users, AlertTriangle, Mail, Calendar } from 'lucide-react';
import { Footer } from './Footer';

interface TermsOfServicePageProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ 
  onBack = () => {}, 
  onNavigate = () => {} 
}) => {
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

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="inline-flex items-center text-brand-dark-blue hover:text-brand-blue mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-brand-blue" />
              </div>
              <h1 className="text-4xl font-bold text-brand-dark-blue mb-4">Terms of Service</h1>
              <p className="text-xl text-gray-600">
                Last updated: January 2025
              </p>
            </div>

            {/* Terms Content */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 space-y-8">
              
              {/* Agreement to Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-4 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-brand-blue" />
                  Agreement to Terms
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    By accessing and using AvidAffiliate's website and services, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                  <p>
                    These Terms of Service ("Terms") govern your use of our website located at [your-domain.com] (the "Service") operated by AvidAffiliate ("us", "we", or "our").
                  </p>
                </div>
              </section>

              {/* Use License */}
              <section>
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-4 flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-green-600" />
                  Use License
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    Permission is granted to temporarily access and use our services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                    <li>attempt to decompile or reverse engineer any software contained on our website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </section>

              {/* Service Description */}
              <section>
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-4 flex items-center">
                  <Users className="h-6 w-6 mr-3 text-purple-600" />
                  Service Description
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    AvidAffiliate provides affiliate marketing optimization services including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Optimize:</strong> Free website audits to identify affiliate marketing opportunities</li>
                    <li><strong>Implement:</strong> Technical implementation of affiliate links and tracking</li>
                    <li><strong>Discover:</strong> Partner network recommendations and program comparisons</li>
                    <li><strong>Strategize & Manage:</strong> Ongoing optimization and account management</li>
                  </ul>
                </div>
              </section>

              {/* User Responsibilities */}
              <section>
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-4 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-3 text-yellow-500" />
                  User Responsibilities
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    When using our services, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate and complete information about your website and business</li>
                    <li>Comply with all applicable laws and regulations regarding affiliate marketing</li>
                    <li>Maintain proper FTC disclosures and affiliate link disclosures on your website</li>
                    <li>Not use our services for any illegal or unauthorized purpose</li>
                    <li>Respect the intellectual property rights of others</li>
                  </ul>
                </div>
              </section>

              {/* Payment Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-4 flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-indigo-600" />
                  Payment Terms
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    For paid services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Payment is due upon completion of services unless otherwise agreed</li>
                    <li>All fees are non-refundable unless otherwise stated</li>
                    <li>We reserve the right to change our pricing with 30 days notice</li>
                    <li>Late payments may result in service suspension</li>
                  </ul>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-4">
                  Limitation of Liability
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    In no event shall AvidAffiliate or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our services, even if AvidAffiliate or an authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </div>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-4">
                  Termination
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                  </p>
                  <p>
                    Upon termination, your right to use the service will cease immediately.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-4">
                  Changes to Terms
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-brand-dark-blue mb-4 flex items-center">
                  <Mail className="h-6 w-6 mr-3 text-red-600" />
                  Contact Information
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                    <p><strong>Email:</strong> hello@avidaffiliate.com</p>
                    <p><strong>Phone:</strong> </p>
                  </div>
                </div>
              </section>

            </div>

            {/* Footer Navigation */}
            <div className="mt-12 text-center">
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <button
                  onClick={() => onNavigate('privacy')}
                  className="text-brand-blue hover:text-brand-dark-blue transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => onNavigate('cookies')}
                  className="text-brand-blue hover:text-brand-dark-blue transition-colors"
                >
                  Cookie Policy
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-brand-blue hover:text-brand-dark-blue transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default TermsOfServicePage;