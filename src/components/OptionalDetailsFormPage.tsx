import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Settings } from 'lucide-react';
import { Footer } from './Footer';

interface OptionalDetailsFormPageProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

export const OptionalDetailsFormPage: React.FC<OptionalDetailsFormPageProps> = ({ onBack, onNavigate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [optionalData, setOptionalData] = useState({
    trafficTier: '',
    primaryNiche: '',
    affiliateNetworks: '',
    biggestChallenge: ''
  });

  const handleOptionalInputChange = (field: string, value: string) => {
    setOptionalData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        'form-name': 'optional-details',
        'website-url': new URLSearchParams(window.location.search).get('url') || 'N/A',
        'email': new URLSearchParams(window.location.search).get('email') || 'N/A',
        'traffic-tier': optionalData.trafficTier,
        'primary-niche': optionalData.primaryNiche,
        'affiliate-networks': optionalData.affiliateNetworks,
        'biggest-challenge': optionalData.biggestChallenge,
      };
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload as any).toString(),
      });
      setSubmitSuccess(true);
    } catch (err) {
      alert("There was an error submitting your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-brand-dark-blue mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8">Your additional details have been submitted successfully.</p>
        <button
          onClick={() => onBack && onBack()}
          className="inline-flex items-center px-6 py-3 bg-brand-blue text-white font-medium rounded-lg hover:bg-brand-dark-blue transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-brand-dark-blue border-b border-gray-200 p-4 text-center">
            <img src="/LOGO.png" alt="AvidAffiliate Logo" className="h-20 w-auto mx-auto"/>
        </header>
        <div className="py-12 px-6">
        <div className="max-w-2xl mx-auto bg-brand-dark-blue rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-brand-dark-blue/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Settings className="h-8 w-8 text-brand-dark-blue" />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-dark-blue mb-2">Boost Your Report's Accuracy</h2>
                    <p className="text-gray-600">Providing these optional details helps us tailor your report card.</p>
                </div>  
          <form name="optional-details" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleOptionalSubmit} className="space-y-6">
            <input type="hidden" name="form-name" value="optional-details" />
            <div className="hidden">
              <label>
                Don’t fill this out if you are human: <input name="bot-field" />
              </label>
            </div>
            <div>
              <label htmlFor="traffic-tier" className="block text-sm font-medium text-brand-dark-blue mb-2">Monthly Traffic</label>
              <select
                id="traffic-tier"
                name="traffic-tier"
                value={optionalData.trafficTier}
                onChange={(e) => handleOptionalInputChange('trafficTier', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white"
              >
                <option value="">Select traffic...</option>
                <option value="0-10k">0 - 10,000 visitors</option>
                <option value="10k-50k">10,000 - 50,000 visitors</option>
                <option value="50k-100k">50,000 - 100,000 visitors</option>
                <option value="100k-500k">100,000 - 500,000 visitors</option>
                <option value="500k+">500,000+ visitors</option>
              </select>
            </div>
            <div>
              <label htmlFor="primary-niche" className="block text-sm font-medium text-brand-dark-blue mb-2">Primary Niche</label>
              <input
                type="text"
                id="primary-niche"
                name="primary-niche"
                value={optionalData.primaryNiche}
                onChange={(e) => handleOptionalInputChange('primaryNiche', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white"
                placeholder="e.g., Tech, Travel, Finance"
              />
            </div>
            <div>
              <label htmlFor="affiliate-networks" className="block text-sm font-medium text-brand-dark-blue mb-2">Current Affiliate Networks</label>
              <input
                type="text"
                id="affiliate-networks"
                name="affiliate-networks"
                value={optionalData.affiliateNetworks}
                onChange={(e) => handleOptionalInputChange('affiliateNetworks', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white"
                placeholder="e.g., Amazon, ShareASale, Impact"
              />
            </div>
            <div>
              <label htmlFor="biggest-challenge" className="block text-sm font-medium text-brand-dark-blue mb-2">Biggest Challenge</label>
              <textarea
                id="biggest-challenge"
                name="biggest-challenge"
                rows={3}
                value={optionalData.biggestChallenge}
                onChange={(e) => handleOptionalInputChange('biggestChallenge', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white"
                placeholder="e.g., Finding good programs, fixing broken links"
              />
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => onBack && onBack()} className="w-full px-4 py-2 border rounded-lg">Back to Home</button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-4 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark-blue disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Details'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer onNavigate={onNavigate} onNext={onBack} />
    </div>
  );
};