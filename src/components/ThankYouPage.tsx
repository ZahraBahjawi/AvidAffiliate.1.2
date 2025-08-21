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
    <div className="min-h-screen bg-primary-900 background-container" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Scroll overlay for darkening effect */}
      <div className="scroll-overlay"></div>
      
      {/* Header Navigation */}
      <header className="bg-black/95 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
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
              <a href="#features" className="text-neutral-200 hover:text-white transition-colors text-sm font-medium" aria-label="View features section">Features</a>
              <a href="#how-it-works" className="text-neutral-200 hover:text-white transition-colors text-sm font-medium" aria-label="Learn how it works">How it works</a>
              <button onClick={() => onNavigate && onNavigate('contact')} className="text-neutral-200 hover:text-white transition-colors text-sm font-medium">Contact</button>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="text-white px-6 py-2 rounded-md transition-all duration-300 text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-primary-900"
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
              <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-800">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Thank You!
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Your free affiliate report card request has been submitted successfully. We'll analyze your website and send your results within 48 hours.
              </p>
            </div>

            {/* Submission Details */}
            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Submission Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-blue-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-white">Website</div>
                    <div className="text-gray-300 break-all">{userData.url}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-white">Email</div>
                    <div className="text-gray-300">{userData.email}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-white">Monthly Traffic</div>
                    <div className="text-gray-300">{userData.trafficTier}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-orange-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-white">Current Earnings</div>
                    <div className="text-gray-300">{userData.earningsTier}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">What Happens Next</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-900/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-blue-800">
                    <span className="text-blue-400 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Analysis Begins</h3>
                    <p className="text-gray-300">Our system will crawl your website to identify affiliate opportunities and broken links.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-900/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-green-800">
                    <span className="text-green-400 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Report Generation</h3>
                    <p className="text-gray-300">We'll compile your personalized report card with actionable insights and revenue estimates.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-900/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-purple-800">
                    <span className="text-purple-400 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Delivery</h3>
                    <p className="text-gray-300">Your complete report card will be emailed to {userData.email} within 48 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={onBackToHome}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  Back to Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                
                <button
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-400">
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