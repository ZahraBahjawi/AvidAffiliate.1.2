import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Users,
  DollarSign,
  Zap,
  FileText,
  Link2Off,
  ArrowRight,
  Download,
  Target,
  ShieldCheck,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Footer } from './Footer';

interface HomePageProps {
  onNext?: (heroData?: { url?: string; email?: string }) => void;
  onNavigate?: (page: string) => void;
  onBack?: () => void;
  scrollTarget?: string | null;
  onScrollComplete?: () => void;
}

// UTM persistence
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

const ProofStats: React.FC = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-lg text-white font-light">On average, our full audits find:</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-green-400 mb-1">~300</p>
            <p className="text-white text-sm">unmonetized mentions across ~50 different brands.</p>
          </div>
          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-orange-400 mb-1">~250</p>
            <p className="text-white text-sm">broken links.</p>
          </div>
          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-blue-400 mb-1">Est. 20% uplift.</p>
            <p className="text-white text-sm">in affiliate revenue*</p>
          </div>
        </div>
      </div>
      
      {/* Caption */}
      <div className="text-center mt-6 px-6">
        <div className="text-sm text-white space-y-1">
          <p>Estimates based on last 10 audits; results vary by traffic and content mix.</p>
          <p>*Uplift calculated using proportion of unmonetized / broken affiliate links to existing monetized links</p>
        </div>
      </div>
    </section>
  );
};

const SecurityPrivacyBlock: React.FC<{ compact?: boolean }> = ({ compact }) => {
  return (
    <div className={`mx-auto ${compact ? 'mt-4' : 'mt-10'} max-w-3xl`}>
      <div className="grid justify-items-center sm:justify-items-start sm:grid-cols-3 gap-4 text-sm text-deep-blue-200">
        <div className="flex items-center">
          <ShieldCheck className="h-4 w-4 mr-2 text-ocean-teal-400" />
          Read‑only crawler
        </div>
        <div className="flex items-center">
          <Shield className="h-4 w-4 mr-2 text-ocean-teal-400" />
          Data encrypted in transit
        </div>
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-2 text-ocean-teal-400" />
          We do not sell your data
        </div>
      </div>
      <div className="text-center text-xs text-deep-blue-300 mt-2">
        <a href="/privacy" className="underline">Privacy</a> • <a href="/terms" className="underline">Terms</a> • <a href="/cookies" className="underline">Cookies</a>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = React.useState<number | null>(null);

  const faqItems = [
    {
      q: 'Is the report card really free?',
      a: 'Yes. The report card is free and takes less than 48 hours. No credit card or login required.',
    },
    {
      q: 'What\'s included in the report card?',
      a: 'We provide a rating A-F of your current link profile and opportunity. We provide a count of the unmonetized mentions, broken/redirecting links, estimated impact and outline next steps.',
    },
    {
      q: 'What access do you need?',
      a: 'Only your public website URL. Our crawler is read‑only and does not require credentials or code access.',
    },
    {
      q: 'How do you estimate impact?',
      a: 'We estimate uplift based on existing monetized links and traffic (if provided), combined with industry benchmarks and commission rate analysis across our database of 35,000+ programs.',
    },
    {
      q: 'Is this safe for Amazon Associates?',
      a: 'Yes. We follow Amazon Associates policies and suggest compliant alternatives when they pay more.',
    },
    {
      q: 'What happens after I get the report card?',
      a: 'Once we share your report card, we will find time with you to discuss your goals, share more details and develop an action plan. If you would like to proceed, the next step is to conduct a full audit on your site',
    },
    {
      q: 'Will this affect my site performance?',
      a: 'No. Our crawler is read-only and designed to have zero impact on your site\'s performance or user experience.',
    },
    {
      q: 'Do you guarantee results?',
      a: 'While we can\'t guarantee specific revenue increases, our audits consistently identify actionable opportunities. Most clients see measurable improvements within 30 days of implementation.',
    },
  ];

  const handleToggle = (index: number) => {
    const newOpenItem = openItem === index ? null : index;
    setOpenItem(newOpenItem);
    track('faq_open', { question: faqItems[index].q, opened: newOpenItem === index });
  };

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => (
        <div key={index} className="bg-gradient-to-r from-coral-600/30 to-coral-500/30 rounded-xl border border-coral-400/50 shadow-lg">
          <button
            onClick={() => handleToggle(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-coral-600/20 transition-all duration-200 rounded-xl group focus:outline-none focus:ring-2 focus:ring-coral-400 focus:ring-offset-2 focus:ring-offset-slate-700"
            aria-expanded={openItem === index}
            aria-controls={`faq-answer-${index}`}
            id={`faq-question-${index}`}
          >
            <span className="text-lg font-medium text-white group-hover:text-coral-300 transition-colors">{item.q}</span>
            <div className={`transform transition-all duration-200 ${openItem === index ? 'rotate-180 text-coral-400' : 'text-white group-hover:text-coral-300'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {openItem === index && (
            <div 
              className="px-6 pb-4 border-t border-coral-400/30"
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              <p className="text-white leading-relaxed pt-3">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const StickyMobileCTA: React.FC<{ onClick: () => void; show: boolean }> = ({ onClick, show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-deep-blue-900/90 backdrop-blur border-t border-deep-blue-700 p-3 sm:hidden">
      <button
        onClick={onClick}
        className="w-full inline-flex items-center justify-center px-6 py-3 bg-coral-500 text-white font-medium rounded-lg hover:bg-coral-600 transition-colors"
      >
        Get my free Report Card
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};

const DesktopRightRailCTA: React.FC<{ onClick: () => void; show: boolean }> = ({ onClick, show }) => {
  if (!show) return null;
  
  return (
    <div className={`fixed bottom-6 right-6 z-40 hidden lg:block transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-6 py-3 bg-coral-500 text-white font-medium rounded-full shadow-lg hover:bg-coral-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2"
      >
        <Zap className="h-5 w-5" />
        <span>Get my free Report Card</span>
      </button>
    </div>
  );
};

const ReportcardPreview: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const slides = [
    {
      title: "Unmonetized Mentions",
      description: "50+ brand mentions found without affiliate links",
      image: "/LOGO.png"
    },
    {
      title: "Broken Links Analysis", 
      description: "12 broken affiliate links costing you commissions",
      image: "/LOGO.png"
    },
    {
      title: "Higher-Paying Programs",
      description: "3 alternative programs with 2-5x better rates",
      image: "/LOGO.png"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    track('sample_report_card_view', { slide: currentSlide + 1, action: 'next' });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    track('sample_report_card_view', { slide: currentSlide + 1, action: 'prev' });
  };

  React.useEffect(() => {
    track('sample_report_card_view', { slide: 1, action: 'view' });
  }, []);

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <p className="text-center text-deep-blue-200 text-sm mb-4">Preview a sample report card</p>
      
      <div className="bg-deep-blue-800 rounded-lg border border-deep-blue-600 p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-deep-blue-700 hover:bg-deep-blue-600 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          
          <div className="text-center flex-1">
            <img 
              src={slides[currentSlide].image} 
              alt="Report card preview" 
              className="h-16 w-auto mx-auto mb-2"
              decoding="async"
            />
            <h3 className="text-lg font-medium text-white mb-1">
              {slides[currentSlide].title}
            </h3>
            <p className="text-deep-blue-200 text-sm">
              {slides[currentSlide].description}
            </p>
          </div>
          
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-deep-blue-700 hover:bg-deep-blue-600 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
        </div>
        
        <div className="flex justify-center space-x-2 mb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                track('sample_report_card_view', { slide: index + 1, action: 'dot_click' });
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-coral-400' : 'bg-deep-blue-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={() => {
              track('sample_report_card_view', { action: 'download_sample' });
              window.open('/sample-report-card.pdf', '_blank');
            }}
            className="inline-flex items-center px-4 py-2 bg-coral-600 text-white text-sm font-medium rounded-lg hover:bg-coral-700 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            View Full Sample
          </button>
        </div>
      </div>
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ 
  onNext = () => {}, 
  onNavigate = () => {}, 
  onBack = () => {},
  scrollTarget,
  onScrollComplete 
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState('');
  const [showRightRail, setShowRightRail] = React.useState(false);
  const [showMobileSticky, setShowMobileSticky] = React.useState(false);
  const [formStarted, setFormStarted] = React.useState(false);
  const [scrollDepthTracked, setScrollDepthTracked] = React.useState<Set<number>>(new Set());

  // Store UTMs on first visit
  React.useEffect(() => {
    storeUTMs();
  }, []);

  // Scroll-based background darkening effect
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
      const overlay = document.querySelector('.scroll-overlay') as HTMLElement;
      if (overlay) {
        overlay.style.opacity = (scrollPercent * 0.8).toString();
      }
      
      // Right rail and mobile sticky CTAs
      setShowRightRail(scrollPercent > 0.3);
      setShowMobileSticky(scrollPercent > 0.35);
      
      // Scroll depth tracking
      const depths = [25, 50, 75, 100];
      depths.forEach(depth => {
        if (scrollPercent * 100 >= depth && !scrollDepthTracked.has(depth)) {
          track('scroll_depth', { depth });
          setScrollDepthTracked(prev => new Set([...prev, depth]));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDepthTracked]);

  // Handle scroll target
  React.useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          onScrollComplete?.();
        }, 1000);
      }
    }
  }, [scrollTarget, onScrollComplete]);

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
      url = url.replace(/^https?:\/\//, '');
      url = url.replace(/^www\./, '');
      url = url.replace(/\/$/, '');
      url = 'https://' + url;
    }
    
    const utms = getStoredUTMs();
    track('form_submit_attempt', { url, source: 'hero' });
    
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
      track('form_start', { location: 'hero' });
    }
  };

  return (
    <div className="min-h-screen bg-primary-900 background-container" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Scroll overlay for darkening effect */}
      <div className="scroll-overlay"></div>
      
      {/* Skip to content link for accessibility */}
      {/* Header Navigation */}
      <header className="bg-black/95 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"> 
              <img
                src="/LOGO.png" 
                alt="AvidAffiliate Logo" 
                className="h-24 w-auto"
              />
              </button>
            </div>

            {/* Navigation Links */}
<nav className="hidden md:flex items-center space-x-8">
  <a href="#features" className="text-white hover:font-bold transition text-sm" aria-label="View features section">Features</a>
  <a href="#how-it-works" className="text-white hover:font-bold transition text-sm" aria-label="Learn how it works">How it works</a>
  <button onClick={() => onNavigate('contact')} className="text-white hover:font-bold transition text-sm">Contact</button>
</nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  track('cta_click', { location: 'header' });
                  const heroForm = document.querySelector('#hero-form');
                  if (heroForm) {
                    heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="text-white px-6 py-2 rounded-md transition-all duration-300 text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-primary-900"
              >
                Get my free Report Card
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="main-content" className="pt-16 pb-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-7 leading-tight tracking-tight" role="banner">
              Your website is leaking revenue
            </h1>
            <p className="text-lg text-white mb-8 max-w-3xl mx-auto leading-relaxed font-light" role="doc-subtitle">
              Get a free affiliate marketing audit within 48 hours that pinpoints unmonetized mentions, broken links, and higher‑paying programs - so you earn more without redoing content. 
            </p>

            {/* Hero Audit Form */}
            <form id="hero-form" onSubmit={submitHero} className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4 max-w-2xl mx-auto">
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              <input
                name="siteUrl"
                type="text"
                required
                onFocus={handleFormFocus}
                placeholder="Enter your website URL"
                className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-300"
                aria-label="Website URL"
                aria-describedby="url-help url-description"
                disabled={isSubmitting}
                autoComplete="url"
              />
              <div id="url-help" className="sr-only">Enter your website URL to get a free affiliate report card</div>
              <div id="url-description" className="sr-only">We will analyze your website for affiliate revenue opportunities and send you a detailed report within 48 hours</div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-400 hover:to-red-400 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Get my free Report Card
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Reassurance text */}
            <p className="text-center text-white text-sm mt-2 mb-4" role="note">
              Takes ~15 seconds. We'll email your report card—no spam.
            </p>

            {/* Sample PDF Thumbnail */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => {
                  track('sample_pdf_click', { location: 'hero_thumbnail' });
                  window.open('/sample-report-card.pdf', '_blank');
                }}
                className="flex flex-col text-center sm:flex-row items-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-12 h-16 bg-white rounded border border-gray-300 flex items-center justify-center flex-shrink-0">
                  <div className="text-xs text-gray-700 font-medium">PDF</div>
                </div>
                <div className="sm:text-left">
                  <div className="text-white text-sm font-medium group-hover:text-orange-300 transition-colors">
                    View sample report card
                  </div>
                  <div className="text-white text-xs">
                    See what you'll receive
                  </div>
                </div>
              </button>
            </div>

            {/* Security badges - mobile friendly */}
            <div className="text-center text-white text-sm">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-4 w-4 mr-2 text-green-400 flex-shrink-0" />
                <span>No credit card • Read‑only scan • Results in 48 hours</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1 text-xs">
                <button onClick={() => onNavigate && onNavigate('privacy')} className="text-white hover:text-orange-300 transition-colors underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900">Privacy</button>
                <span className="text-white">•</span>
                <button onClick={() => onNavigate && onNavigate('terms')} className="text-white hover:text-orange-300 transition-colors underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900">Terms</button>
                <span className="text-white">•</span>
                <button onClick={() => onNavigate && onNavigate('cookies')} className="text-white hover:text-orange-300 transition-colors underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900">Cookies</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Stats Strip */}
      <ProofStats />

      {/* Problem Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-normal text-white mb-6" id="free-affiliate-audit" role="heading" aria-level="2">
                The hidden revenue leak
              </h2>
              <p className="text-xl text-white font-light">You could be missing out on thousands in affiliate revenue</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-slate-800 rounded-xl p-8 text-center shadow-sm border border-slate-600 transition-all duration-300 hover:p-12 hover:bg-slate-700 group">
                <div className="mx-auto mb-6 cursor-pointer">
                  <DollarSign className="h-8 w-8 text-green-500 mx-auto transition-all duration-300 group-hover:h-10 group-hover:w-10" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Missing payouts</h3>
                <div className="text-3xl font-normal text-green-400 mb-4">50-80%</div>
                <p className="text-white text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="group-hover:hidden">of product mentions go unmonetized.</span>
                  <span className="hidden group-hover:block">We find those mentions and turn them into tracked, revenue‑generating links.</span>
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 text-center shadow-sm border border-slate-600 transition-all duration-300 hover:p-12 hover:bg-slate-700 group">
                <div className="mx-auto mb-6 cursor-pointer">
                  <Link2Off className="h-8 w-8 text-red-500 mx-auto transition-all duration-300 group-hover:h-10 group-hover:w-10" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Broken links</h3>
                <div className="text-3xl font-normal text-red-400 mb-4">Silent losses</div>
                <p className="text-white text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="group-hover:hidden">from 404s, redirects, and geo‑mismatches</span>
                  <span className="hidden group-hover:block">We repair pathways from click to commission so your traffic converts.</span>
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 text-center shadow-sm border border-slate-600 transition-all duration-300 hover:p-12 hover:bg-slate-700 group">
                <div className="mx-auto mb-6 cursor-pointer">
                  <TrendingUp className="h-8 w-8 text-blue-500 mx-auto transition-all duration-300 group-hover:h-10 group-hover:w-10" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">Low commission rates</h3>
                <div className="text-3xl font-normal text-blue-400 mb-4">2–5x</div>
                <p className="text-white text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="group-hover:hidden">better payouts exist for many programs.</span>
                  <span className="hidden group-hover:block">We benchmark against 35,000+ programs and recommend higher‑paying alternatives.</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-coral-600 to-coral-500 rounded-2xl p-12 text-white text-center">
              <h3 className="text-2xl font-normal mb-8 text-white">The result? You're leaving money on the table.</h3>
              
              <button
                onClick={() => {
                  track('cta_click', { location: 'problem_section' });
                  const heroForm = document.querySelector('#hero-form');
                  if (heroForm) {
                    heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-300 hover:to-orange-400 hover:shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 mb-8"
              >
                Find my hidden revenue
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              
              {/* Reportcard Preview */}
              <ReportcardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-normal text-white mb-6" id="how-report-card-works" role="heading" aria-level="2">How the free affiliate audit works</h2>
              <p className="text-xl text-white font-light">Get your comprehensive audit report in three simple steps</p>
            </div>
      
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-4">Submit your website</h3>
                <p className="text-white leading-relaxed">Enter your website URL. No sign‑up or credit card required.</p>
              </div>
      
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-4">We analyze your site</h3>
                <p className="text-white leading-relaxed">We scan your pages, identify unmonetized mentions and broken links, and benchmark programs.</p>
              </div>
      
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-4">Get your report card</h3>
                <p className="text-white leading-relaxed">We email a clear, prioritized summary of your current link profile and opportunity.</p>
              </div>
            </div>
      
            {/* FAQ Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-white mb-4" id="frequently-asked-questions" role="heading" aria-level="2">Frequently Asked Questions</h2>
                <p className="text-lg text-white font-light">Everything you need to know about our free affiliate marketing audit</p>
              </div>

              <FAQ />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-normal text-white mb-6" id="why-creators-choose" role="heading" aria-level="2">Why 300+ creators choose AvidAffiliate</h2>
              <p className="text-xl text-white font-light">Make more money from your existing content—effortlessly</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-600">
                <Zap className="h-8 w-8 text-yellow-400 mb-6" />
                <h3 className="text-lg font-medium text-white mb-3">Smart link analysis</h3>
                <p className="text-white text-sm leading-relaxed">
                  Automatically find every missed commission opportunity—then see exactly how to monetize it.
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-600">
                <FileText className="h-8 w-8 text-blue-400 mb-6" />
                <h3 className="text-lg font-medium text-white mb-3">Proprietary affiliate database</h3>
                <p className="text-white text-sm leading-relaxed">
                  Discover higher‑paying alternatives matched to your content—benchmarked against 35,000+ programs.
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-600">
                <Users className="h-8 w-8 text-green-400 mb-6" />
                <h3 className="text-lg font-medium text-white mb-3">Done‑for‑you implementation</h3>
                <p className="text-white text-sm leading-relaxed">
                  We fix issues for you—fast—so you can focus on creating content.
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-600">
                <Clock className="h-8 w-8 text-purple-400 mb-6" />
                <h3 className="text-lg font-medium text-white mb-3">Rapid results</h3>
                <p className="text-white text-sm leading-relaxed">
                  See measurable gains in weeks, not months—starting with the highest‑impact fixes.
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-600">
                <Shield className="h-8 w-8 text-indigo-400 mb-6" />
                <h3 className="text-lg font-medium text-white mb-3">Long‑term partner</h3>
                <p className="text-white text-sm leading-relaxed">
                  From audit to ongoing optimization—we help you unlock the full value of your content.
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-600">
                <CheckCircle className="h-8 w-8 text-teal-400 mb-6" />
                <h3 className="text-lg font-medium text-white mb-3">Proven methodology</h3>
                <p className="text-white text-sm leading-relaxed">
                  A repeatable process used by creators to drive consistent, compounding revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Values */}
<section id="about-us" className="py-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-normal text-white mb-6">About AvidAffiliate</h2>
        <p className="text-xl text-white font-light">Empowering creators to unlock their site's true revenue potential</p>
      </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <p className="text-lg text-white leading-relaxed mb-6">
                  We bridge the gap between great content and optimized monetization with intelligent, data‑driven affiliate marketing solutions.
                </p>
                <p className="text-lg text-white leading-relaxed">
                  Audit with Optimize, fix with Implement, upgrade partners with Discover, plan with Strategize, and scale with Manage.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-600">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Transparency</h3>
                  <p className="text-white text-sm">Clear process and results</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-600">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Fast results</h3>
                  <p className="text-white text-sm">Quick, impactful changes</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-600">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Expert team</h3>
                  <p className="text-white text-sm">Experienced specialists</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-600">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Data‑driven</h3>
                  <p className="text-white text-sm">Every strategy backed by data</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  track('learn_more_about');
                  onNavigate('about');
                }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Learn more about us
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-normal text-white mb-6">We support top affiliate networks</h2>
              <p className="text-xl text-white font-light">Access premium partnerships and exclusive programs through our vetted network support.</p>
            </div>

            {/* Logo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { name: 'Amazon', src: '/amazon.png' },
                { name: 'ShareASale', src: '/shareasale.png' },
                { name: 'CJ Affiliate', src: '/CJ.png' },
                { name: 'Impact', src: '/impact.png' },
                { name: 'Awin', src: '/awin.png' },
                { name: 'FlexOffers', src: '/flexoffers.png' },
                { name: 'ClickBank', src: '/clickbank.png' },
                { name: 'Rakuten', src: '/rakuten.png' },
              ].map((p, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer"
                  onClick={() => track('partner_logo_click', { name: p.name })}
                >
                  <img 
                    src={p.src} 
                    alt={`${p.name} affiliate network logo`} 
                    className="max-h-full max-w-full w-auto h-auto object-contain" 
                    style={{ maxHeight: '90%', maxWidth: '90%' }}
                    width="120"
                    height="60"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => onNavigate('affiliate_partners')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-700"
              >
                View all networks
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <p className="text-center text-xs text-white mt-4">
              Logos are for identification only; no endorsement implied. All trademarks belong to their respective owners.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-normal mb-6">Ready to unlock hidden affiliate revenue?</h2>
            <p className="text-xl text-white mb-12 font-light">
              Start with your free report card. Then choose Audit (deep analysis), then Implementation (we fix it).
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => {
                  track('cta_click', { location: 'final_cta_primary' });
                  onNext();
                }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-base font-bold rounded-lg hover:from-yellow-300 hover:to-orange-400 hover:shadow-xl hover:shadow-yellow-500/50 transform hover:scale-110 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-orange-600"
              >
                Get my free Report Card
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  track('cta_click', { location: 'final_cta_secondary' });
                  onNavigate('contact');
                }}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white text-base font-semibold rounded-lg hover:bg-white hover:text-orange-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600"
              >
                Contact us
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-white mb-6 opacity-75">
              Limited Implement and Manage openings monthly
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white text-sm">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                <span>100% free analysis</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                <span>No sign‑up required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                <span>Results in 48 hours</span>
              </div>
            </div>

            <SecurityPrivacyBlock />
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} onNext={onNext} />

      {/* Desktop Right Rail CTA */}
      <DesktopRightRailCTA
        show={showRightRail}
        onClick={() => {
          track('cta_click', { location: 'right_rail' });
          const heroForm = document.querySelector('#hero-form');
          if (heroForm) {
            heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
      />

      {/* Sticky mobile CTA */}
      <StickyMobileCTA
        show={showMobileSticky}
        onClick={() => {
          track('cta_click', { location: 'sticky_mobile' });
          const heroForm = document.querySelector('#hero-form');
          if (heroForm) {
            heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
      />
    </div>
  );
};