import React from 'react';
import { DollarSign, XCircle, RefreshCw, CheckCircle, ChevronRight } from 'lucide-react';
import { ScorecardData, UserData } from '../types';

interface ScorecardDisplayProps {
  scorecardData: ScorecardData;
  userData: UserData;
  onBackToHome: () => void;
  onNavigate?: (page: 'services' | 'contact') => void;
}

export const ScorecardDisplay: React.FC<ScorecardDisplayProps> = ({
  scorecardData,
  userData,
  onBackToHome,
  onNavigate
}) => {
  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A':
      case 'A-':
      case 'B+':
        return 'text-green-600 bg-green-50';
      case 'B':
      case 'B-':
      case 'C+':
        return 'text-yellow-600 bg-yellow-50';
      case 'C':
      case 'C-':
      case 'D+':
        return 'text-orange-600 bg-orange-50';
      case 'D':
      case 'D-':
      case 'F':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-brand-dark-blue mb-4">
              Your affiliate report card
            </h1>
            <p className="text-gray-600 font-light">
              Website: <span className="font-semibold text-brand-blue">{userData.url}</span>
            </p>
          </div>

          {/* Score Display */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-6xl font-bold ${getScoreColor(scorecardData.score)}`}>
                {scorecardData.score}
              </div>
              <h2 className="text-2xl font-light text-brand-dark-blue mt-4">Overall Score</h2>
            </div>

            {/* Key Findings */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-brand-dark-blue mb-6">
                Key findings
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <DollarSign className="h-8 w-8 text-brand-blue mb-2" />
                  <div className="text-2xl font-bold text-brand-blue">{scorecardData.unmonetized_links}</div>
                  <div className="text-sm text-blue-800 font-medium">Unmonetized Links</div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                  <XCircle className="h-8 w-8 text-red-600 mb-2" />
                  <div className="text-2xl font-bold text-red-600">{scorecardData.broken_links}</div>
                  <div className="text-sm text-red-800 font-medium">Broken Links</div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <RefreshCw className="h-8 w-8 text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-green-600">{scorecardData.better_program_links}</div>
                  <div className="text-sm text-green-800 font-medium">Better Opportunities</div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <DollarSign className="h-8 w-8 text-purple-600 mb-2" />
                  <div className="text-2xl font-bold text-purple-600">${scorecardData.estimated_monthly_uplift}</div>
                  <div className="text-sm text-purple-800 font-medium">Monthly Uplift</div>
                </div>
              </div>
            </div>

            {/* What These Findings Mean */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-brand-dark-blue mb-4">What this means</h3>
              <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Your website has significant untapped revenue potential. The unmonetized links represent 
                  opportunities where you're currently sending traffic to merchants without earning any commission.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Broken links are hurting both your user experience and SEO rankings, while better commission 
                  opportunities could increase your earnings from existing affiliate relationships.
                </p>
              </div>
            </div>

            {/* How AvidAffiliate Helps */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-brand-dark-blue mb-4">How we can help</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <div className="font-medium text-brand-dark-blue">Pinpoint every opportunity</div>
                    <div className="text-sm text-gray-600">Complete link-by-link analysis</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <div className="font-medium text-brand-dark-blue">Secure higher rates</div>
                    <div className="text-sm text-gray-600">Access to premium affiliate programs</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <div className="font-medium text-brand-dark-blue">Step-by-step plan</div>
                    <div className="text-sm text-gray-600">Prioritized implementation roadmap</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <div className="font-medium text-brand-dark-blue">Quantify your upside</div>
                    <div className="text-sm text-gray-600">Precise revenue projections</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="inline-flex items-center px-8 py-4 bg-brand-blue text-white text-base font-bold rounded-lg hover:bg-brand-dark-blue hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Contact us
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <div className="mt-4">
                <button
                  onClick={onBackToHome}
                  className="text-brand-dark-blue hover:text-brand-blue text-sm transition-colors"
                >
                  Back to home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};