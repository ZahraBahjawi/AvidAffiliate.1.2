import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Footer } from './Footer';

interface GenericThankYouPageProps {
  onBackToHome: () => void;
  onNavigate?: (page: string) => void;
}

export const GenericThankYouPage: React.FC<GenericThankYouPageProps> = ({ onBackToHome, onNavigate }) => {
  return (
    <div className="min-h-screen bg-primary-900 background-container" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="scroll-overlay"></div>
      <header className="bg-black/95 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={onBackToHome} aria-label="Go to homepage">
                <img 
                  src="/LOGO.png" 
                  alt="AvidAffiliate Logo" 
                  className="h-24 w-auto"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-800">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Thank You!
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Your submission has been received. We'll be in touch shortly.
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={onBackToHome}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Back to Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer onNavigate={onNavigate} onNext={onBackToHome} />
    </div>
  );
};