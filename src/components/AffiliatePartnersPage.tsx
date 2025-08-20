import React from 'react';
import { ArrowLeft, ExternalLink, AlertTriangle, Shield, Users, TrendingUp } from 'lucide-react';
import { Footer } from './Footer';

interface AffiliatePartnersPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'about' | 'team' | 'contact' | 'privacy' | 'terms' | 'affiliate_partners' | 'sitemap' | 'cookies') => void;
}

interface AffiliatePartner {
  name: string;
  type: 'Referral' | 'Not Referral';
  description: string;
  url: string;
  category: string;
}

export const AffiliatePartnersPage: React.FC<AffiliatePartnersPageProps> = ({ onBack, onNavigate }) => {
  const affiliatePartners: AffiliatePartner[] = [
    {
      name: "Impact",
      type: "Referral",
      description: "A leading performance marketing platform that connects brands with publishers through advanced tracking and analytics. Known for enterprise-level solutions and premium brand partnerships.",
      url: "https://goto.impact.com/9LqYYW",
      category: "Enterprise Platform"
    },
    {
      name: "FlexOffers",
      type: "Referral", 
      description: "A comprehensive affiliate network offering thousands of programs across diverse verticals. Features competitive commissions and user-friendly tools for both advertisers and publishers.",
      url: "https://www.flexoffers.com/referral/1216277",
      category: "Multi-Vertical Network"
    },
    {
      name: "Mavely",
      type: "Referral",
      description: "A social commerce platform designed for content creators and influencers. Specializes in lifestyle, fashion, and consumer product affiliate opportunities with mobile-first approach.",
      url: "https://mavely.app.link/1ag3nOuKuGb",
      category: "Creator-Focused Platform"
    },
    {
      name: "Awin",
      type: "Referral",
      description: "One of the world's largest affiliate networks with global reach and premium brand partnerships. Offers advanced reporting tools and access to exclusive merchant programs.",
      url: "https://www.awin1.com/awclick.php?gid=171448&mid=4032&awinaffid=897423&linkid=362688&clickref",
      category: "Global Network"
    },
    {
      name: "Partnerize",
      type: "Not Referral",
      description: "An enterprise-grade partnership management platform that helps brands manage all types of partnerships. Features advanced attribution and cross-device tracking capabilities.",
      url: "https://signup.partnerize.com/",
      category: "Enterprise Platform"
    },
    {
      name: "AvantLink",
      type: "Not Referral",
      description: "A specialized affiliate network focusing on outdoor, sports, and lifestyle brands. Known for high-quality merchants and competitive commission structures in niche markets.",
      url: "https://dashboard.avantlink.com/",
      category: "Niche Network"
    },
    {
      name: "CJ (Commission Junction)",
      type: "Not Referral",
      description: "One of the oldest and most established affiliate networks with extensive advertiser base. Offers robust tracking technology and access to major brand partnerships.",
      url: "https://cj.com/join",
      category: "Established Network"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Enterprise Platform':
        return <Shield className="h-5 w-5 text-blue-600" />;
      case 'Global Network':
        return <Users className="h-5 w-5 text-green-600" />;
      case 'Creator-Focused Platform':
        return <TrendingUp className="h-5 w-5 text-purple-600" />;
      default:
        return <Users className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Referral' 
      ? 'bg-orange-100 text-orange-800 border-orange-200' 
      : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-slate-900" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header Navigation */}
      <header className="bg-black/95 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
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
              <button onClick={onBack} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Home</button>
              <button onClick={() => onNavigate && onNavigate('about')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">About</button>
              <button onClick={() => onNavigate && onNavigate('team')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Team</button>
              <button onClick={() => onNavigate && onNavigate('contact')} className="text-white hover:text-orange-300 transition-colors text-sm font-medium">Contact</button>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-white px-6 py-2 rounded-md transition-all duration-300 text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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
                  className="flex items-center text-white hover:text-orange-300 mb-6 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </button>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Affiliate Network Guide
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Your comprehensive guide to the leading affiliate networks and platforms for maximizing your revenue potential.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-orange-900/20 border-l-4 border-orange-400 p-6 mb-8 rounded-r-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-orange-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-2">Affiliate Link Disclosure</h3>
                  <p className="text-orange-300 leading-relaxed">
                    <strong>Important:</strong> Some links on this page are affiliate referral links, clearly marked as "Referral" below. 
                    This means we may earn a commission if you sign up or make a purchase through these links, at no extra cost to you. 
                    We only recommend platforms we genuinely believe can benefit your affiliate marketing efforts. Links marked as "Not Referral" 
                    are provided purely for your convenience and we receive no compensation from them.
                  </p>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">How We Help You Choose</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our audit service analyzes your website to identify which affiliate networks and programs offer the optimal fit 
                for your monetization opportunities. We've researched and evaluated these networks based on their commission 
                structures, merchant quality, and overall value to content creators.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Rather than guessing which networks might work, our audit identifies the specific programs that will deliver 
                the best results based on factual analysis of available opportunities.
              </p>
            </div>

            {/* Partners List */}
            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Recommended Affiliate Networks & Platforms</h2>
              
              <div className="space-y-6">
                {affiliatePartners.map((partner, index) => (
                  <div key={index} className="border border-slate-600 rounded-lg p-6 hover:shadow-md transition-shadow bg-slate-700">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                      <div className="flex items-center">
                        {getCategoryIcon(partner.category)}
                        <h3 className="text-xl font-bold text-white ml-3">{partner.name}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getTypeColor(partner.type)}`}>
                          {partner.type}
                        </span>
                        <span className="text-sm text-gray-400 bg-slate-600 px-2 py-1 rounded whitespace-nowrap">
                          {partner.category}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {partner.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="text-sm text-gray-400">
                        <span className="font-medium">Platform Type:</span> {partner.category}
                      </div>
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                      >
                        Visit {partner.name}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Service Information */}
            <div className="mt-8 bg-blue-900/20 rounded-xl p-6 border border-blue-800">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Optimal Network Recommendations</h3>
              <p className="text-blue-300 leading-relaxed">
                Our audit service identifies which networks offer the best opportunities for your website based on factual 
                analysis of commission rates, program availability, and optimization potential.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer onNavigate={onNavigate} onNext={onBack} />
    </div>
  );
};