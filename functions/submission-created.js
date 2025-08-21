import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Globe, User, Mail, ShieldCheck, TrendingUp, DollarSign } from 'lucide-react';
import { UserData } from '../types';

interface SubmissionFormProps {
  onSubmit: (data: UserData) => void;
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
  const [formData, setFormData] = useState<UserData>({
    url: prefilledData.url || '',
    name: '',
    email: prefilledData.email || '',
    trafficTier: '',
    earningsTier: '',
    acceptedTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (field: keyof UserData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptedTerms) {
      setFormError('You must accept the terms and privacy policy to continue.');
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    const payload = {
      'form-name': 'audit-request',
      'website-url': formData.url,
      'name': formData.name,
      'email': formData.email,
      'traffic-tier': formData.trafficTier,
      'earnings-tier': formData.earningsTier,
      'accepted-terms': String(formData.acceptedTerms),
    };

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      });

      if (response.ok) {
        onSubmit(formData); // This triggers the stage change in App.tsx
      } else {
        throw new Error('Form submission failed. Please try again.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setFormError(errorMessage);
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
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
            <div className="text-center mb-12">
              <p className="text-blue-400 font-semibold mb-2">Step 2 of 2</p>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
                Almost there! Just a few details...
              </h1>
              <p className="text-xl text-gray-300 font-light">
                Your free report card will be sent to your email in 48 hours or less.
              </p>
            </div>

            <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-700">
              <form
                name="audit-request"
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Form fields for URL, Name, and Email remain the same */}
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
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 border-slate-600 bg-slate-700 text-white hover:border-blue-400 focus:border-blue-500"
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
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 border-slate-600 bg-slate-700 text-white hover:border-blue-400 focus:border-blue-500"
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
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 border-slate-600 bg-slate-700 text-white hover:border-blue-400 focus:border-blue-500"
                  />
                </div>

                {/* ADDED FIELDS START HERE */}
                <div>
                  <label className="flex items-center text-lg font-medium text-white mb-3">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                    Monthly Visitors
                  </label>
                  <select name="traffic-tier" required value={formData.trafficTier} onChange={(e) => handleInputChange('trafficTier', e.target.value)} className="w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 border-slate-600 bg-slate-700 text-white hover:border-blue-400 focus:border-blue-500">
                    <option value="" disabled>Select your monthly traffic...</option>
                    <option value="<10k">Less than 10,000</option>
                    <option value="10k-50k">10,000 - 50,000</option>
                    <option value="50k-250k">50,000 - 250,000</option>
                    <option value="250k+">More than 250,000</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-lg font-medium text-white mb-3">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    Monthly Affiliate Earnings
                  </label>
                  <select name="earnings-tier" required value={formData.earningsTier} onChange={(e) => handleInputChange('earningsTier', e.target.value)} className="w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 border-slate-600 bg-slate-700 text-white hover:border-blue-400 focus:border-blue-500">
                    <option value="" disabled>Select your monthly earnings...</option>
                    <option value="<100">Less than $100</option>
                    <option value="100-1000">$100 - $1,000</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000-25000">$10,000 - $25,000</option>
                    <option value="25000+">More than $25,000</option>
                    <option value="prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="accepted-terms" className="flex items-center text-gray-300">
                    <input
                      id="accepted-terms"
                      name="accepted-terms"
                      type="checkbox"
                      checked={formData.acceptedTerms}
                      onChange={(e) => handleInputChange('acceptedTerms', e.target.checked)}
                      className="h-5 w-5 rounded border-gray-400 text-blue-600 focus:ring-blue-500 bg-slate-700"
                    />
                    <span className="ml-3 text-sm">
                      I accept the{' '}
                      <button type="button" onClick={() => onNavigate?.('terms')} className="underline hover:text-orange-300">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" onClick={() => onNavigate?.('privacy')} className="underline hover:text-orange-300">
                        Privacy Policy
                      </button>.
                    </span>
                  </label>
                </div>
                {/* ADDED FIELDS END HERE */}

                {formError && <p className="text-red-400 text-sm text-center">{formError}</p>}

                <div className="pt-6">
                  <div className="text-center mb-6">
                      <p className="text-base font-medium text-green-400 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 mr-2" />
                          Join 100+ creators who have already increased their revenue.
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
                      disabled={isSubmitting}
                      className="flex-1 group inline-flex items-center justify-center px-8 py-4 text-white text-lg font-bold rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 hover:shadow-xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Get My Free Report Card'}
                      {!isSubmitting && <ChevronRight className="ml-2 h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};