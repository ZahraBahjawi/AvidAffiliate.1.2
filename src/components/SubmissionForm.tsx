import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Globe, User, Mail, TrendingUp, DollarSign, Users, ShieldCheck } from 'lucide-react';

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
  const [formData, setFormData] = useState({
    url: prefilledData.url || '',
    name: '',
    email: '',
  });

  const [honeypot, setHoneypot] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-900" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Simplified Header */}
      <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
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
              <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center">
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
                action="/thank-you/"
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
                      className="flex items-center justify-center px-6 py-4 border-2 border-slate-600 text-gray-300 font-medium rounded-xl hover:border-slate-500 hover:bg-slate-700 transition-all duration-300"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Back
                    </button>
                    
                    <button
                      type="submit"
                      className="flex-1 group inline-flex items-center justify-center px-8 py-4 text-white text-lg font-medium rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      style={{ backgroundColor: '#FF6B35' }}
                    >
                      Get My Free Report Card
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 text-center pt-4">
                    By clicking "Get My Free Report Card", you agree to our{' '}
                    <button type="button" onClick={() => onNavigate?.('terms')} className="underline hover:text-white">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button type="button" onClick={() => onNavigate?.('privacy')} className="underline hover:text-white">
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
