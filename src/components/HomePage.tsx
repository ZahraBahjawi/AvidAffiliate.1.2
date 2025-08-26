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

// ... (rest of the component logic remains the same)

export const HomePage: React.FC<HomePageProps> = ({ 
  onNext = () => {}, 
  onNavigate = () => {}, 
  onBack = () => {},
  scrollTarget,
  onScrollComplete 
}) => {
  // ... (state and effects remain the same)

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="scroll-overlay"></div>
      
      {/* Header Navigation */}
      <header className="bg-brand-dark-blue border-b border-brand-blue sticky top-0 z-50">
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
              <a href="#features" className="text-white hover:text-brand-gray transition text-sm font-medium" aria-label="View features section">Features</a>
              <a href="#how-it-works" className="text-white hover:text-brand-gray transition text-sm font-medium" aria-label="Learn how it works">How it works</a>
              <button onClick={() => onNavigate('contact')} className="text-white hover:text-brand-gray transition text-sm font-medium">Contact</button>
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
                className="text-white px-6 py-2 rounded-md transition-all duration-300 text-sm font-medium bg-brand-blue hover:bg-opacity-80 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              >
                Get my free Report Card
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="main-content" className="pt-16 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-7xl font-bold text-brand-dark-blue mb-7 leading-tight tracking-tight" role="banner">
              Your website is leaking revenue
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-light" role="doc-subtitle">
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
                className="w-full px-4 py-3 rounded-lg bg-white text-brand-dark-blue border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue placeholder-gray-500"
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
                className="inline-flex items-center px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark-blue hover:shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
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
            <p className="text-center text-gray-600 text-sm mt-2 mb-4" role="note">
              Takes ~15 seconds. We'll email your report card—no spam.
            </p>

            {/* Sample PDF Thumbnail */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => {
                  track('sample_pdf_click', { location: 'hero_thumbnail' });
                  window.open('/sample-report-card.pdf', '_blank');
                }}
                className="flex flex-col text-center sm:flex-row items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-12 h-16 bg-white rounded border border-gray-300 flex items-center justify-center flex-shrink-0">
                  <div className="text-xs text-gray-700 font-medium">PDF</div>
                </div>
                <div className="sm:text-left">
                  <div className="text-brand-dark-blue text-sm font-medium group-hover:text-brand-blue transition-colors">
                    View sample report card
                  </div>
                  <div className="text-gray-600 text-xs">
                    See what you'll receive
                  </div>
                </div>
              </button>
            </div>

            {/* Security badges - mobile friendly */}
            <div className="text-center text-gray-600 text-sm">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                <span>No credit card • Read‑only scan • Results in 48 hours</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1 text-xs">
                <button onClick={() => onNavigate && onNavigate('privacy')} className="text-gray-600 hover:text-brand-blue transition-colors underline focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2">Privacy</button>
                <span className="text-gray-500">•</span>
                <button onClick={() => onNavigate && onNavigate('terms')} className="text-gray-600 hover:text-brand-blue transition-colors underline focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2">Terms</button>
                <span className="text-gray-500">•</span>
                <button onClick={() => onNavigate && onNavigate('cookies')} className="text-gray-600 hover:text-brand-blue transition-colors underline focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2">Cookies</button>
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
              <h2 className="text-3xl md:text-4xl font-normal text-brand-dark-blue mb-6" id="free-affiliate-audit" role="heading" aria-level="2">
                The hidden revenue leak
              </h2>
              <p className="text-xl text-gray-600 font-light">You could be missing out on thousands in affiliate revenue</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-brand-blue group">
                <div className="mx-auto mb-6">
                  <DollarSign className="h-8 w-8 text-green-500 mx-auto transition-all duration-300" />
                </div>
                <h3 className="text-xl font-medium text-brand-dark-blue mb-3">Missing payouts</h3>
                <div className="text-3xl font-normal text-green-600 mb-4">50-80%</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  of product mentions go unmonetized. We find those mentions and turn them into tracked, revenue‑generating links.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-brand-blue group">
                <div className="mx-auto mb-6">
                  <Link2Off className="h-8 w-8 text-red-500 mx-auto transition-all duration-300" />
                </div>
                <h3 className="text-xl font-medium text-brand-dark-blue mb-3">Broken links</h3>
                <div className="text-3xl font-normal text-red-600 mb-4">Silent losses</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  from 404s, redirects, and geo‑mismatches. We repair pathways from click to commission so your traffic converts.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-brand-blue group">
                <div className="mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-blue-500 mx-auto transition-all duration-300" />
                </div>
                <h3 className="text-xl font-medium text-brand-dark-blue mb-3">Low commission rates</h3>
                <div className="text-3xl font-normal text-blue-600 mb-4">2–5x</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  better payouts exist for many programs. We benchmark against 35,000+ programs and recommend higher‑paying alternatives.
                </p>
              </div>
            </div>

            <div className="bg-brand-dark-blue rounded-2xl p-12 text-white text-center">
              <h3 className="text-2xl font-normal mb-8">The result? You're leaving money on the table.</h3>
              
              <button
                onClick={() => {
                  track('cta_click', { location: 'problem_section' });
                  const heroForm = document.querySelector('#hero-form');
                  if (heroForm) {
                    heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="inline-flex items-center px-6 py-3 bg-brand-yellow text-brand-dark-blue font-semibold rounded-lg hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 mb-8"
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
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-normal text-brand-dark-blue mb-6" id="how-report-card-works" role="heading" aria-level="2">How the free affiliate audit works</h2>
              <p className="text-xl text-gray-600 font-light">Get your comprehensive audit report in three simple steps</p>
            </div>
      
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-medium text-brand-dark-blue mb-4">Submit your website</h3>
                <p className="text-gray-600 leading-relaxed">Enter your website URL. No sign‑up or credit card required.</p>
              </div>
      
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-medium text-brand-dark-blue mb-4">We analyze your site</h3>
                <p className="text-gray-600 leading-relaxed">We scan your pages, identify unmonetized mentions and broken links, and benchmark programs.</p>
              </div>
      
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-medium text-brand-dark-blue mb-4">Get your report card</h3>
                <p className="text-gray-600 leading-relaxed">We email a clear, prioritized summary of your current link profile and opportunity.</p>
              </div>
            </div>
      
            {/* FAQ Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-normal text-brand-dark-blue mb-4" id="frequently-asked-questions" role="heading" aria-level="2">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600 font-light">Everything you need to know about our free affiliate marketing audit</p>
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
              <h2 className="text-3xl md:text-4xl font-normal text-brand-dark-blue mb-6" id="why-creators-choose" role="heading" aria-level="2">Why 300+ creators choose AvidAffiliate</h2>
              <p className="text-xl text-gray-600 font-light">Make more money from your existing content—effortlessly</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <Zap className="h-8 w-8 text-brand-yellow mb-6" />
                <h3 className="text-lg font-medium text-brand-dark-blue mb-3">Smart link analysis</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Automatically find every missed commission opportunity—then see exactly how to monetize it.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <FileText className="h-8 w-8 text-brand-blue mb-6" />
                <h3 className="text-lg font-medium text-brand-dark-blue mb-3">Proprietary affiliate database</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Discover higher‑paying alternatives matched to your content—benchmarked against 35,000+ programs.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <Users className="h-8 w-8 text-green-600 mb-6" />
                <h3 className="text-lg font-medium text-brand-dark-blue mb-3">Done‑for‑you implementation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We fix issues for you—fast—so you can focus on creating content.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <Clock className="h-8 w-8 text-purple-600 mb-6" />
                <h3 className="text-lg font-medium text-brand-dark-blue mb-3">Rapid results</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  See measurable gains in weeks, not months—starting with the highest‑impact fixes.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <Shield className="h-8 w-8 text-indigo-600 mb-6" />
                <h3 className="text-lg font-medium text-brand-dark-blue mb-3">Long‑term partner</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  From audit to ongoing optimization—we help you unlock the full value of your content.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <CheckCircle className="h-8 w-8 text-teal-600 mb-6" />
                <h3 className="text-lg font-medium text-brand-dark-blue mb-3">Proven methodology</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A repeatable process used by creators to drive consistent, compounding revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Values */}
<section id="about-us" className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-normal text-brand-dark-blue mb-6">About AvidAffiliate</h2>
        <p className="text-xl text-gray-600 font-light">Empowering creators to unlock their site's true revenue potential</p>
      </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We bridge the gap between great content and optimized monetization with intelligent, data‑driven affiliate marketing solutions.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Audit with Optimize, fix with Implement, upgrade partners with Discover, plan with Strategize, and scale with Manage.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Transparency</h3>
                  <p className="text-gray-600 text-sm">Clear process and results</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Fast results</h3>
                  <p className="text-gray-600 text-sm">Quick, impactful changes</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Expert team</h3>
                  <p className="text-gray-600 text-sm">Experienced specialists</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">Data‑driven</h3>
                  <p className="text-gray-600 text-sm">Every strategy backed by data</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  track('learn_more_about');
                  onNavigate('about');
                }}
                className="inline-flex items-center px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark-blue hover:shadow-lg transform hover:scale-105 transition-all duration-300"
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
              <h2 className="text-3xl md:text-4xl font-normal text-brand-dark-blue mb-6">We support top affiliate networks</h2>
              <p className="text-xl text-gray-600 font-light">Access premium partnerships and exclusive programs through our vetted network support.</p>
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
                className="inline-flex items-center px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark-blue hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              >
                View all networks
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              Logos are for identification only; no endorsement implied. All trademarks belong to their respective owners.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-dark-blue">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-normal mb-6">Ready to unlock hidden affiliate revenue?</h2>
            <p className="text-xl mb-12 font-light opacity-80">
              Start with your free report card. Then choose Audit (deep analysis), then Implementation (we fix it).
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => {
                  track('cta_click', { location: 'final_cta_primary' });
                  onNext();
                }}
                className="inline-flex items-center px-8 py-4 bg-brand-yellow text-brand-dark-blue text-base font-bold rounded-lg hover:bg-yellow-400 hover:shadow-xl hover:shadow-yellow-500/50 transform hover:scale-110 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-brand-dark-blue"
              >
                Get my free Report Card
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  track('cta_click', { location: 'final_cta_secondary' });
                  onNavigate('contact');
                }}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white text-base font-semibold rounded-lg hover:bg-white hover:text-brand-dark-blue hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-dark-blue"
              >
                Contact us
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <p className="text-xs mb-6 opacity-75">
              Limited Implement and Manage openings monthly
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                <span>100% free analysis</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                <span>No sign‑up required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
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