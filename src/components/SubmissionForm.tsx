import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Globe, User, Mail, TrendingUp, DollarSign, Users, ShieldCheck, CheckCircle, X } from 'lucide-react';

interface SubmissionFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  onNavigate?: (page: string) => void;
  prefilledData?: { url?: string; email?: string };
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({
  onSubmit,
  onBack,
  onNavigate,
  prefilledData = {}
}) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    url: prefilledData.url || '',
    name: '',
    email: '',
  });

  const [honeypot, setHoneypot] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    // Let the form submit naturally, then show popup
    setShowThankYou(true);
  };

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
                Thank You!
              </h2>
              
              <p className="text-gray-600 mb-6">
                We've received your request for a free affiliate report card. You'll receive your results within 48 hours at the email address you provided.
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
        </div>
      )}

      {/* Simplified Header */}
      <header className="bg-black/95 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="/LOGO.png" 
                alt="AvidAffiliate Logo" 
                className="h-24 w-auto"
              />
            </div>
            <div className="flex items-center">
              <button onClick={onBack} className="text-white hover:text-orange-300 transition-colors text-sm font-medium flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Header with Progress Indicator */}
            <div className="text-center mb-12">
              <p className="text-blue-400 font-semibold mb-2">Step 2 of 2</p>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
                Almost there! Just a few details...
              </h1>
              <p className="text-xl text-gray-300 font-light">
                Your free report card will be sent to your email in 48 hours or less.
              </p>
            </div>

            {/* Form */}
            <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-700">
              <form
                name="audit-request"
                method="POST"
                onSubmit={handleFormSubmit}
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="space-y-8"
              >
                <input type="hidden" name="form-name" value="audit-request" />
                <input
                  type="text"
                  name="bot-field"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                <div>
                  <label className="flex items-center text-lg font-medium text-white mb-3">
                    <Globe className="h-5 w-5 mr-2 text-blue-600" />
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="website-url"
                    value={formData.url}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className={`w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                      'border-slate-600 bg-slate-700 text-white hover:border-blue-400 focus:border-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="flex items-center text-lg font-medium text-white mb-3">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    className={`w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                      'border-slate-600 bg-slate-700 text-white hover:border-blue-400 focus:border-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="flex items-center text-lg font-medium text-white mb-3">
                    <Mail className="h-5 w-5 mr-2 text-blue-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                      'border-slate-600 bg-slate-700 text-white hover:border-blue-400 focus:border-blue-500'
                    }`}
                  />
                  <p className="text-xs text-gray-400 mt-2">Your free report card will be sent here. We never spam.</p>
                </div>

                <div className="pt-6">
                  <div className="text-center mb-6">
                      <p className="text-base font-medium text-green-400 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 mr-2" />
                          Join 100+ creators who have already increased their revenue with our insights.
                      </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={onBack}
                      className="flex items-center justify-center px-6 py-4 bg-transparent border-2 border-white text-white font-medium rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-300"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Back
                    </button>
                    
                    <button
                      type="submit"
                      className="flex-1 group inline-flex items-center justify-center px-8 py-4 text-white text-lg font-bold rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 hover:shadow-xl hover:shadow-orange-500/50 transform hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Get My Free Report Card
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 text-center pt-4">
                    By clicking "Get My Free Report Card", you agree to our{' '}
                    <button type="button" onClick={() => onNavigate?.('terms')} className="underline hover:text-orange-300">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button type="button" onClick={() => onNavigate?.('privacy')} className="underline hover:text-orange-300">
                      Privacy Policy
                    </button>.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};