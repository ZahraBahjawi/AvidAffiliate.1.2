import React from 'react';
import { ArrowLeft, Linkedin, Mail } from 'lucide-react';
import { Footer } from './Footer';

interface OurTeamPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'about' | 'team' | 'contact' | 'privacy' | 'terms' | 'affiliate_partners' | 'sitemap' | 'cookies') => void;
}

export const OurTeamPage: React.FC<OurTeamPageProps> = ({ onBack, onNavigate }) => {
  const teamMembers = [
    {
      name: "David Paxton",
      role: "Founder & CEO",
      bio: "An experienced business consultant and entrepreneur with a proven track record of building successful ventures. David's strategic vision and leadership expertise drive our mission to democratize affiliate marketing optimization, ensuring every content creator can unlock their revenue potential.",
      image: "/david_headshot.jpg",
      linkedin: "https://www.linkedin.com/in/paxtondavid/",
      email: "David@avidaffiliate.com"
    },
    {
      name: "Toby Warden",
      role: "Head of Growth & Partnerships",
      bio: "A seasoned affiliate marketing expert and business operations specialist, Toby drives our growth initiatives and partnership strategies. His deep industry knowledge and operational excellence ensure our clients achieve maximum results while building sustainable, long-term success.",
      image: "/toby_headshot.jpg",
      linkedin: "https://www.linkedin.com/in/tobywarden12/",
      email: "Toby@avidaffiliate.com"
    },
    {
      name: "Zahra Bahjawi",
      role: "Lead Technology & Data Analyst",
      bio: "A Computer Science student and technology expert who brings cutting-edge technical innovation to our platform. Zahra's expertise in data analysis and robust solution development ensures our audit technology delivers accurate, actionable insights that drive real revenue growth.",
      image: "/zahra_headshot.jpg",
      linkedin: "https://www.linkedin.com/in/zahra-bahjawi/",
      email: "Zahra.bahjawi@outlook.com"
    }
  ];

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
        <div className="max-w-6xl mx-auto">
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
              Meet Our Team
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Our diverse team of affiliate marketing experts, data scientists, and technology specialists are united by a shared passion for helping content creators maximize their revenue potential.
            </p>
          </div>

          {/* Main Content */}
          <div id="our-team-page" className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
            {/* Team Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center group">
                  {/* Profile Image Placeholder */}
                  {member.image.startsWith('/') ? (
                    <div className="w-32 h-32 mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                      <img 
                        src={member.image} 
                        alt={`${member.name} headshot`}
                        className="w-32 h-32 rounded-full object-cover border-2 border-blue-800"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow border border-blue-800">
                      <span className="text-2xl font-bold text-blue-600">{member.image}</span>
                    </div>
                  )}
                  
                  {/* Member Info */}
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-300 leading-relaxed mb-6">{member.bio}</p>
                  
                  {/* Social Links Placeholder */}
                  <div className="flex justify-center space-x-4">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-900/20 transition-colors border border-slate-600"
                      >
                        <Linkedin className="h-5 w-5 text-gray-300" />
                      </a>
                    )}
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-900/20 transition-colors border border-slate-600"
                      >
                        <Mail className="h-5 w-5 text-gray-300" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Team Culture Section */}
            <div className="mt-16 pt-12 border-t border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Our Culture</h2>
                <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  We're a remote-first team that values collaboration, continuous learning, and making a real impact in the lives of content creators worldwide. Our diverse backgrounds and shared commitment to excellence drive everything we do.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-800">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Innovation First</h3>
                  <p className="text-gray-300 text-sm">We're always exploring new technologies and methodologies to stay ahead of industry trends.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-800">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Client-Centric</h3>
                  <p className="text-gray-300 text-sm">Every decision we make is guided by what's best for our clients and their success.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-800">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Results Driven</h3>
                  <p className="text-gray-300 text-sm">We measure our success by the tangible results we deliver for our clients.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      <Footer onNavigate={onNavigate} onNext={onBack} />
    </div>
  );
};