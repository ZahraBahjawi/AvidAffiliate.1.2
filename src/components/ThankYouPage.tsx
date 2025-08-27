import React from 'react';
import { CheckCircle, ArrowRight, Mail, Globe, Users, TrendingUp } from 'lucide-react';
import { UserData } from '../types';
import { Footer } from './Footer';

interface ThankYouPageProps {
  userData: UserData;
  onBackToHome: () => void;
  onNavigate?: (page: string) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  userData,
  onBackToHome,
  onNavigate
}) => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header Navigation */}
      <header className="bg-brand-yellow/95 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={onBackToHome} aria-label="Go to homepage">
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
                onClick={onBackToHome}
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
            {/* Success Message */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue mb-4">
                Thank You!
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Your free affiliate report card request has been submitted successfully. We'll analyze your website and send your results within 48 hours.
              </p>
            </div>

            {/* Submission Details */}
            <div className="bg-gray-50 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-brand-dark-blue mb-6">Submission Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-brand-blue mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-brand-dark-blue">Website</div>
                    <div className="text-gray-600 break-all">{userData.url}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-brand-dark-blue">Email</div>
                    <div className="text-gray-600">{userData.email}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-purple-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-brand-dark-blue">Monthly Traffic</div>
                    <div className="text-gray-600">{userData.trafficTier}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-brand-dark-blue">Current Earnings</div>
                    <div className="text-gray-600">{userData.earningsTier}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-gray-50 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-brand-dark-blue mb-6">What Happens Next</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-blue-200">
                    <span className="text-brand-blue font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark-blue mb-1">Analysis Begins</h3>
                    <p className="text-gray-600">Our system will crawl your website to identify affiliate opportunities and broken links.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-green-200">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark-blue mb-1">Report Generation</h3>
                    <p className="text-gray-600">We'll compile your personalized report card with actionable insights and revenue estimates.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-purple-200">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark-blue mb-1">Delivery</h3>
                    <p className="text-gray-600">Your complete report card will be emailed to {userData.email} within 48 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={onBackToHome}
                  className="inline-flex items-center px-8 py-4 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark-blue hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Back to Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                
                <button
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-brand-dark-blue text-brand-dark-blue font-semibold rounded-lg hover:bg-brand-dark-blue hover:text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-500">
                Questions? Email us at hello@avidaffiliate.com
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer onNavigate={onNavigate} onNext={onBackToHome} />
    </div>
  );
};