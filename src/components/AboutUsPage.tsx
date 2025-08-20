import React from 'react';
import { ArrowLeft, Target, Users, Lightbulb, TrendingUp } from 'lucide-react';
import { Footer } from './Footer';

interface AboutUsPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'about' | 'team' | 'contact' | 'privacy' | 'terms' | 'affiliate_partners' | 'sitemap' | 'cookies') => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-900" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header Navigation */}
      <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-sm bg-slate-900/95">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={onBack} className="focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded">
                <img 
                  src="/LOGO.png" 
                  alt="AvidAffiliate Logo" 
                  className="h-24 w-auto"
                />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</button>
              <button onClick={() => onNavigate && onNavigate('about')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About</button>
              <button onClick={() => onNavigate && onNavigate('team')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Team</button>
              <button onClick={() => onNavigate && onNavigate('contact')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Contact</button>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-white px-6 py-2 rounded-md transition-colors text-sm font-medium bg-[#FF6B35] hover:bg-[#E55A2B] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Get Free Scorecard
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
                className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </button>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Us
            </h1>
          </div>

          {/* Main Content */}
          <div id="about-us-page" className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8 border border-slate-700">
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                At AvidAffiliate, we're passionate about empowering content creators and publishers to unlock their website's true revenue potential. Our mission is to bridge the gap between great content and optimized monetization through intelligent, data-driven affiliate marketing solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We envision a world where every content creator can maximize their affiliate revenue without the complexity of manual optimization. Through our advanced analysis tools and expert guidance, we're making sophisticated affiliate marketing accessible to creators of all sizes.
              </p>
            </div>

            {/* Company Values */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Core Values</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 border border-blue-800">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Transparency</h3>
                    <p className="text-gray-300">
                      We believe in complete transparency in our processes, pricing, and results. Our clients always know exactly what we're doing and why.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-900/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 border border-green-800">
                    <Lightbulb className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
                    <p className="text-gray-300">
                      We continuously evolve our technology and methodologies to stay ahead of industry trends and deliver cutting-edge solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 border border-purple-800">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Partnership</h3>
                    <p className="text-gray-300">
                      We view our clients as partners in success. Your growth is our growth, and we're committed to long-term relationships built on mutual success.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-900/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 border border-orange-800">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Results-Driven</h3>
                    <p className="text-gray-300">
                      Every strategy we implement is focused on delivering measurable results. We're not satisfied unless you're seeing real revenue growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Journey and Future */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-8 border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Journey</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Founded by a team of experienced affiliate marketers and technology experts in the golf space, AvidAffiliate was born from the frustration of seeing talented content creators struggle with monetization optimization. We recognized that while the affiliate marketing industry was growing rapidly, the tools and expertise needed to succeed were often out of reach for individual creators and small publishers.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                At the core of our systematic approach is our proprietary analysis tool. Designed to delve deep, it helps to unlock additional and often hidden revenue opportunities. From its inception, this tool has consistently shown the capability to deliver results that exceed expectations.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Looking ahead, we're deeply committed to democratizing affiliate marketing success. We will continue to develop our tools and expand our capabilities, always with the goal of helping our partners grow. We firmly believe that everyone should have access to high-level affiliate optimization, regardless of their size or technical expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      <Footer onNavigate={onNavigate} onNext={onBack} />
    </div>
  );
};