import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Globe, 
  User, 
  Mail, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  CheckCircle, 
  BarChart3, 
  Zap, 
  Target, 
  ArrowRight, 
  Star, 
  Award, 
  Clock, 
  FileText,
  ExternalLink,
  Download
} from 'lucide-react';
import { Footer } from './Footer';

interface HomePageProps {
  onNext: (data?: { url?: string; email?: string }) => void;
  onNavigate?: (page: string) => void;
  onBack?: () => void;
  scrollTarget?: string | null;
  onScrollComplete?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNext, 
  onNavigate, 
  onBack, 
  scrollTarget, 
  onScrollComplete 
}) => {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);

  // Handle scroll target
  useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Call completion callback after scroll animation
        setTimeout(() => {
          onScrollComplete?.();
        }, 1000);
      }
    }
  }, [scrollTarget, onScrollComplete]);

  const validateUrl = (inputUrl: string) => {
    try {
      const urlObj = new URL(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`);
      return urlObj.hostname.includes('.');
    } catch {
      return false;
    }
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setIsValidUrl(validateUrl(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidUrl) {
      const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
      onNext({ url: normalizedUrl, email });
    }
  };

  const handleViewSample = () => {
    window.open('/sample-report-card.html', '_blank');
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header Navigation */}
      <header className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: '#081F5D' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/LOGO.png" 
                alt="AvidAffiliate Logo" 
                className="h-24 w-auto"
              />
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-dark-blue mb-6 tracking-tight">
              Unlock your website's hidden affiliate revenue
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
              Get a free Report Card in 48 hours. Find unmonetized links, fix broken affiliate links, discover higher-paying programs.
            </p>
            
            {/* Hero Form */}
            <div id="hero-form" className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center text-lg font-medium text-brand-dark-blue mb-3">
                    <Globe className="h-5 w-5 mr-2 text-brand-blue" />
                    Website URL
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="yourwebsite.com"
                    className={`w-full px-4 py-4 rounded-xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-blue/20 ${
                      url && !isValidUrl 
                        ? 'border-red-400 bg-red-50 text-red-700 focus:border-red-500' 
                        : isValidUrl 
                        ? 'border-green-400 bg-green-50 text-green-700 focus:border-green-500'
                        : 'border-gray-300 bg-white text-brand-dark-blue hover:border-brand-blue/50 focus:border-brand-blue'
                    }`}
                  />
                  {url && !isValidUrl && (
                    <p className="text-red-500 text-sm mt-2">Please enter a valid website URL</p>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-base font-medium text-green-600 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    Join 100+ creators who have already increased their revenue with our insights.
                  </p>
                  <button
                    type="submit"
                    disabled={!isValidUrl}
                    className="group inline-flex items-center justify-center px-8 py-4 text-white text-lg font-bold rounded-xl bg-brand-blue hover:bg-brand-dark-blue hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Get My Free Report Card
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-xs text-gray-500 mt-4">
                    No credit card required • Results in 48 hours • 100% free
                  </p>
                </div>
              </form>
            </div>

            {/* Sample Report Card CTA */}
            <div className="mt-8">
              <button
                onClick={handleViewSample}
                className="inline-flex items-center text-brand-blue hover:text-brand-dark-blue transition-colors text-lg font-medium"
              >
                <img 
                  src="/S1.png" 
                  alt="Sample Report" 
                  className="h-6 w-6 mr-2 object-contain"
                />
                View sample report card
                <ExternalLink className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark-blue mb-4">
              Trusted by 300+ content creators
            </h2>
            <p className="text-xl text-gray-600">
              Average revenue increase of 20%+ without changing content
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark-blue mb-2">$2.3M+</h3>
              <p className="text-gray-600">Additional revenue unlocked</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200">
                <Users className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark-blue mb-2">300+</h3>
              <p className="text-gray-600">Websites optimized</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-200">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark-blue mb-2">20%+</h3>
              <p className="text-gray-600">Average revenue increase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark-blue mb-4">
              Why creators choose AvidAffiliate
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive audit reveals exactly where you're leaving money on the table and provides a clear roadmap to fix it.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 border border-blue-200">
                <BarChart3 className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark-blue mb-4">Smart Link Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI scans your entire website to identify unmonetized product mentions, broken affiliate links, and optimization opportunities you're missing.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 border border-green-200">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark-blue mb-4">Proprietary Database</h3>
              <p className="text-gray-600 leading-relaxed">
                Access to 35,000+ affiliate programs with real commission rates, helping you find the highest-paying opportunities for your niche.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6 border border-purple-200">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark-blue mb-4">Done-For-You Implementation</h3>
              <p className="text-gray-600 leading-relaxed">
                We don't just tell you what to fix—we can implement the changes for you, ensuring maximum revenue impact with minimal effort on your part.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark-blue mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your personalized affiliate optimization report in three simple steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold border-4 border-blue-200">
                1
              </div>
              <h3 className="text-xl font-bold text-brand-dark-blue mb-4">Submit Your Website</h3>
              <p className="text-gray-600 leading-relaxed">
                Enter your website URL and basic details. Our system immediately begins analyzing your content for affiliate opportunities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold border-4 border-blue-200">
                2
              </div>
              <h3 className="text-xl font-bold text-brand-dark-blue mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Our proprietary technology scans your site, identifies unmonetized links, checks for broken affiliates, and finds better commission opportunities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold border-4 border-blue-200">
                3
              </div>
              <h3 className="text-xl font-bold text-brand-dark-blue mb-4">Get Your Report Card</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive a detailed report with your affiliate grade, specific opportunities, revenue estimates, and a prioritized action plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Networks Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark-blue mb-4">
              Supported affiliate networks
            </h2>
            <p className="text-xl text-gray-600">
              We analyze opportunities across all major affiliate platforms
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            <img src="/amazon.png" alt="Amazon Associates" className="h-8 object-contain" />
            <img src="/shareasale.png" alt="ShareASale" className="h-8 object-contain" />
            <img src="/CJ.png" alt="CJ Affiliate" className="h-8 object-contain" />
            <img src="/impact.png" alt="Impact" className="h-8 object-contain" />
            <img src="/clickbank.png" alt="ClickBank" className="h-8 object-contain" />
            <img src="/rakuten.png" alt="Rakuten Advertising" className="h-8 object-contain" />
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
              + 35,000 affiliate programs across all industries
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-dark-blue mb-6">
                About AvidAffiliate
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We're a team of affiliate marketing experts, data scientists, and former content creators who understand the challenges of monetizing online content effectively.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-brand-dark-blue mb-6">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Every day, content creators leave thousands of dollars on the table through missed affiliate opportunities, broken links, and suboptimal program choices. We built AvidAffiliate to solve this problem systematically.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our proprietary technology analyzes websites at scale, identifying revenue opportunities that would take humans weeks to find manually. We've helped over 300 creators unlock more than $2.3M in additional affiliate revenue.
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onNavigate && onNavigate('team')}
                    className="inline-flex items-center text-brand-blue hover:text-brand-dark-blue transition-colors font-medium"
                  >
                    Meet our team
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h4 className="text-xl font-bold text-brand-dark-blue mb-4">Why we're different</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Data-driven approach with proprietary affiliate program database</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Focus on implementation, not just recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Transparent pricing with measurable ROI</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Built by creators, for creators</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-brand-dark-blue mb-4">
                Frequently asked questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our affiliate optimization service
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-brand-dark-blue mb-4">
                  Is the affiliate marketing audit really free?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes. The affiliate marketing audit and report card is completely free and takes less than 48 hours. No credit card or login required.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-brand-dark-blue mb-4">
                  What's included in the free affiliate audit?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We provide a rating A-F of your current affiliate link profile and opportunity. We provide a count of the unmonetized mentions, broken/redirecting links, estimated revenue impact and outline next steps.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-brand-dark-blue mb-4">
                  How do you estimate revenue impact?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We estimate revenue uplift based on existing monetized links and traffic (if provided), combined with industry benchmarks and commission rate analysis across our database of 35,000+ affiliate programs.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-brand-dark-blue mb-4">
                  Do you work with all website types and niches?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we work with all content types including blogs, review sites, YouTube channels, newsletters, and social media accounts. Our database covers affiliate programs across every major industry and niche.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-brand-dark-blue mb-4">
                  What happens after I get my free report card?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  You'll receive actionable insights you can implement yourself, or we can discuss our paid services for comprehensive optimization, implementation, and ongoing management of your affiliate strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-brand-dark-blue text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to unlock your hidden revenue?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join 300+ creators who have already increased their affiliate revenue by 20%+ with our insights. Get your free report card in 48 hours.
          </p>
          
          <button
            onClick={() => {
              const heroForm = document.querySelector('#hero-form');
              if (heroForm) {
                heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className="inline-flex items-center justify-center px-8 py-4 text-brand-dark-blue bg-white text-lg font-bold rounded-xl hover:bg-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get My Free Report Card
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm opacity-75">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Results in 48 hours
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-4 w-4 mr-2" />
              100% free
            </div>
          </div>
          
          <div className="text-center text-xs text-white-500 mt-2">
            <a href="/privacy" className="underline">Privacy</a> • <a href="/terms" className=\"underline">Terms</a> • <a href="/cookies" className=\"underline">Cookies</a>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} onNext={onNext} />
    </div>
  );
};