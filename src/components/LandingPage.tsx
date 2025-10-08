import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Shield, Clock } from 'lucide-react';

interface LandingPageProps {
  onNext?: (data?: { url?: string; email?: string }) => void;
  onNavigate?: (page: string) => void;
}

const getStoredUTMs = () => {
  try {
    const stored = localStorage.getItem('avidaffiliate_utms');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const storeUTMs = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) utms[param] = value;
    });

    if (Object.keys(utms).length > 0) {
      localStorage.setItem('avidaffiliate_utms', JSON.stringify(utms));
    }
  } catch {
    // no-op
  }
};

const track = (eventName: string, data?: Record<string, any>) => {
  try {
    const utms = getStoredUTMs();
    const eventData = { ...data, ...utms };

    const w = window as any;
    if (w.gtag) {
      w.gtag('event', eventName, eventData);
    }
  } catch {
    // no-op
  }
};

export const LandingPage: React.FC<LandingPageProps> = ({
  onNext = () => {},
  onNavigate = () => {}
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState('');
  const [formStarted, setFormStarted] = React.useState(false);
  const [scrollDepthTracked, setScrollDepthTracked] = React.useState<Set<number>>(new Set());

  React.useEffect(() => {
    storeUTMs();
    track('landing_page_view');
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);

      const depths = [25, 50, 75, 100];
      depths.forEach(depth => {
        if (scrollPercent * 100 >= depth && !scrollDepthTracked.has(depth)) {
          track('scroll_depth', { depth, page: 'landing' });
          setScrollDepthTracked(prev => new Set([...prev, depth]));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDepthTracked]);

  const submitHero = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (honeypot) {
      console.log('Bot detected via honeypot');
      track('form_submit_fail', { reason: 'honeypot', url: '' });
      return;
    }
    setIsSubmitting(true);
    const form = e.currentTarget;
    let url = (form.elements.namedItem('siteUrl') as HTMLInputElement)?.value || '';
    if (!url.trim()) {
      track('validation_error', { field: 'url', message: 'URL is required' });
      setIsSubmitting(false);
      return;
    }
    if (url) {
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      url = url.replace(/\/$/, '');
    }
    const utms = getStoredUTMs();
    track('form_submit_attempt', { url, source: 'landing_page' });
    setTimeout(() => {
      if (url) {
        onNext({ url, ...utms });
      }
      setIsSubmitting(false);
    }, 500);
  };

  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      track('form_start', { location: 'landing_page' });
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <header className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-brand-dark-blue">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-16">
            <img
              src="/LOGO.png"
              alt="AvidAffiliate Logo"
              className="h-24 w-auto"
            />
          </div>
        </div>
      </header>

      <section className="pt-12 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-dark-blue mb-6 leading-tight">
              Your website is <span className="relative inline-block">
                <span className="text-brand-dark-blue">leaking</span>
                <svg className="absolute -bottom-2 left-0 w-full h-4 overflow-visible" viewBox="0 0 100 16" preserveAspectRatio="none">
                  <path
                    d="M15 8 Q20 12 25 8 T35 8 Q40 12 45 8 T55 8 Q60 12 65 8 T75 8 Q80 12 85 8"
                    stroke="#97d8c4"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span> revenue
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed font-light max-w-3xl mx-auto">
              Get a free Report Card that reveals unmonetized links and broken affiliate opportunities.
            </p>

            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Find out exactly how much revenue you're missing—delivered in 48 hours.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-brand-blue rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-xl">
              <h2 className="text-2xl font-bold text-brand-dark-blue mb-6">
                Get Your Free Report Card
              </h2>

              <form onSubmit={submitHero} className="space-y-4 mb-6">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <input
                    name="siteUrl"
                    type="text"
                    required
                    onFocus={handleFormFocus}
                    placeholder="Enter your website URL"
                    className="w-full px-6 py-4 text-lg rounded-lg bg-white text-brand-dark-blue border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue placeholder-gray-400"
                    disabled={isSubmitting}
                    autoComplete="url"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white text-lg font-bold rounded-lg hover:bg-brand-dark-blue hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Get My Free Report Card
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                  <span>100% Free • No Credit Card Required</span>
                </div>
                <div className="flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Results delivered in 48 hours</span>
                </div>
                <div className="flex items-center justify-center">
                  <Shield className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                  <span>Read-only scan • Your data stays private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-brand-dark-blue mb-12">
            What our audits typically find:
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200">
              <div className="text-5xl font-bold text-green-600 mb-2">~300</div>
              <p className="text-brand-dark-blue font-semibold mb-2">Unmonetized mentions</p>
              <p className="text-gray-600 text-sm">Product references with no affiliate links</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200">
              <div className="text-5xl font-bold text-red-600 mb-2">~250</div>
              <p className="text-brand-dark-blue font-semibold mb-2">Broken links</p>
              <p className="text-gray-600 text-sm">Lost commissions from 404s and redirects</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200">
              <div className="text-5xl font-bold text-blue-600 mb-2">~20%</div>
              <p className="text-brand-dark-blue font-semibold mb-2">Revenue uplift</p>
              <p className="text-gray-600 text-sm">Potential increase through optimization</p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Based on last 10 audits; results vary by traffic and content mix
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10">
            <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
              <img
                className="w-28 h-28 rounded-full object-cover border-2 border-brand-blue flex-shrink-0"
                src="https://www.thegolftravelguru.com/wp-content/uploads/2019/07/IMG_0407-copy-768x757.jpg"
                alt="Ed Schmidt testimonial"
              />
              <div>
                <p className="text-gray-700 italic mb-4 text-lg leading-relaxed">
                  "They highlighted the staggering number of broken and old links on my site and offered superb ideas on new partners. The changes have enhanced my site and put me in a better position to attain more clicks and sales."
                </p>
                <div className="font-bold text-brand-dark-blue text-lg">Ed Schmidt</div>
                <div className="text-base text-gray-600">The Golf Travel Guru</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-dark-blue text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to stop leaving money on the table?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Get your free Report Card now. No credit card. No catch.
          </p>
          <button
            onClick={() => {
              track('cta_click', { location: 'bottom_cta' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center px-10 py-4 bg-brand-yellow text-brand-dark-blue text-lg font-bold rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Get My Free Report Card
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>

          <div className="mt-8 text-sm opacity-75">
            <a href="/privacy" className="underline hover:opacity-100">Privacy</a>
            {' • '}
            <a href="/terms" className="underline hover:opacity-100">Terms</a>
          </div>
        </div>
      </section>
    </div>
  );
};
