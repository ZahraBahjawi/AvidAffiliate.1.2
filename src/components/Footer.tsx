import React from 'react';
import { CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: 'about' | 'team' | 'contact' | 'privacy' | 'terms' | 'affiliate_partners' | 'sitemap' | 'cookies') => void;
  onNext?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onNext }) => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/LOGO.png" 
                  alt="AvidAffiliate Logo" 
                  className="h-14 w-auto mr-2"
                />
                <h3 className="text-lg font-medium text-white">AvidAffiliate</h3>
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                Unlock your website's hidden affiliate revenue with our comprehensive link audit and monetization platform.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-base font-medium text-white mb-4">Get Started</h4>
              <ul className="space-y-2">
                <li><a href="#" onClick={() => { onNext && onNext(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-300 hover:text-white transition-colors text-sm">Free Report Card</a></li>
                <li><button onClick={() => onNavigate && onNavigate('home#about-us')} className="text-gray-300 hover:text-white transition-colors text-sm">About Us</button></li>
                <li><a href="#" onClick={() => onNavigate && onNavigate('affiliate_partners')} className="text-gray-300 hover:text-white transition-colors text-sm">Affiliate Network Guide</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-base font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" onClick={() => onNavigate && onNavigate('about')} className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" onClick={() => onNavigate && onNavigate('team')} className="text-gray-300 hover:text-white transition-colors text-sm">Our Team</a></li>
                <li><a href="#" onClick={() => onNavigate && onNavigate('contact')} className="text-gray-300 hover:text-white transition-colors text-sm">Contact Us</a></li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="text-base font-medium text-white mb-4">Legal & Support</h4>
              <ul className="space-y-2">
                <li><a href="#" onClick={() => onNavigate && onNavigate('privacy')} className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" onClick={() => onNavigate && onNavigate('terms')} className="text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" onClick={() => onNavigate && onNavigate('cookies')} className="text-gray-300 hover:text-white transition-colors text-sm">Cookie Policy</a></li>
                <li><a href="#" onClick={() => onNavigate && onNavigate('sitemap')} className="text-gray-300 hover:text-white transition-colors text-sm">Sitemap</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0 space-y-1">
              <div>© 2025 AvidAffiliate. All rights reserved.</div>
              <div>hello@avidaffiliate.com • Mon-Fri, 9AM-5PM PST</div>
            </div>
            <div className="text-gray-400 text-sm text-center md:text-right space-y-1">
              <div>505 26th Avenue, San Francisco, CA 94121</div>
              <div>Response time: Within 24 hours</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};