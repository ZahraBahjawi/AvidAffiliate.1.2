import React from 'react';
import {
  CheckCircle,
  ArrowRight,
  Mail,
  Clock,
  Users,
  TrendingUp,
  Copy,
  Check,
  Globe,
  DollarSign,
  Send,
  Download,
  Phone,
  Settings,
} from 'lucide-react';
import { UserData } from '../types';
import { Footer } from './Footer';

// Simple tracking helper
const track = (eventName: string, data?: Record<string, any>) => {
  try {
    const w = window as any;
    if (w.gtag) w.gtag('event', eventName, data || {});
  } catch {}
};

type ExtraStatusProps = {
  requestId?: string;
  queuePosition?: number;
  queueSize?: number;
  etaHoursMin?: number; // default 24
  etaHoursMax?: number; // default 48
};

interface ThankYouPageProps extends ExtraStatusProps {
  userData: UserData;
  onBackToHome: () => void;
  onNavigate?: (page: string) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  userData,
  onBackToHome,
  onNavigate,
  requestId,
  queuePosition,
  queueSize,
  etaHoursMin = 24,
  etaHoursMax = 48,
}) => {
  const [showOptionalForm, setShowOptionalForm] = React.useState(false);
  const [priorityListJoined, setPriorityListJoined] = React.useState(false);
  const [isJoiningPriorityList, setIsJoiningPriorityList] = React.useState(false);
  const [optionalData, setOptionalData] = React.useState({
    trafficTier: '',
    primaryNiche: '',
    affiliateNetworks: '',
    biggestChallenge: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const stageIndex = 1; // 0=Received, 1=Queued, 2=Auditing, 3=Preparing
  const stages = [
    { label: 'Request received', done: stageIndex >= 0 },
    { label: 'Queued', done: stageIndex >= 1 },
    { label: 'Analysis running', done: stageIndex >= 2 },
    { label: 'Preparing Report Card', done: stageIndex >= 3 },
  ];
  const progressPct = Math.round(((stageIndex + 1) / stages.length) * 100);

  const [copied, setCopied] = React.useState(false);
  const copyId = async () => {
    if (!requestId) return;
    try {
      await navigator.clipboard.writeText(requestId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  };

  const handleOptionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        'form-name': 'optional-details',
        'website-url': userData.url,
        email: userData.email,
        'traffic-tier': optionalData.trafficTier,
        'primary-niche': optionalData.primaryNiche,
        'affiliate-networks': optionalData.affiliateNetworks,
        'biggest-challenge': optionalData.biggestChallenge,
      };
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload as any).toString(),
      });
      if (!response.ok) throw new Error('Form submission failed');
      track('optional_details_submit_success');
      setSubmitSuccess(true);
      setShowOptionalForm(false);
    } catch (err) {
      console.error('Optional form submission error:', err);
      track('optional_details_submit_error');
      alert("There was an error submitting your additional details. Don't worry—your Report Card is still processing!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionalInputChange = (field: string, value: string) => {
    setOptionalData(prev => ({ ...prev, [field]: value }));
  };

  const handleJoinPriorityList = async () => {
    setIsJoiningPriorityList(true);
    try {
      const payload = {
        'form-name': 'priority-list',
        'name': userData.name,
        'email': userData.email,
        'website': userData.url,
        'interest': 'Full Audit Priority List',
        'source': 'thank_you_page'
      };
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload as any).toString(),
      });
      
      if (!response.ok) throw new Error('Priority list submission failed');
      
      track('priority_list_joined', { source: 'thank_you_page' });
      setPriorityListJoined(true);
    } catch (err) {
      console.error('Priority list submission error:', err);
      track('priority_list_error');
      alert("There was an error joining the priority list. Please try again or contact us directly.");
    } finally {
      setIsJoiningPriorityList(false);
    }
  };

  const handleContactUs = () => {
    // Pre-populate contact form data
    const contactData = {
      name: userData.name,
      email: userData.email,
      subject: 'Question about my Report Card',
      message: `Hi,

I just submitted my website (${userData.url}) for a free Report Card and I have some questions.

Could you help me with my inquiry?

Thanks!
${userData.name}`
    };
    
    track('contact_us_click', { source: 'thank_you_page', prefilled: true });
    
    // Store the pre-filled data and navigate to contact page
    localStorage.setItem('contact_prefill', JSON.stringify(contactData));
    onNavigate?.('contact');
  };

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{
        fontFamily:
          'Google Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="flex-grow">
        {/* Header Navigation */}
        <header className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: '#081F5D' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                 <button onClick={onBackToHome} aria-label="Go to homepage">
                    <img src="/LOGO.png" alt="AvidAffiliate Logo" className="h-24 w-auto" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => onNavigate && onNavigate('home#features')}
                  className="text-white hover:text-brand-yellow transition-colors text-sm font-medium"
                >
                  Features
                </button>
                <button onClick={() => onNavigate && onNavigate('home#how-it-works')} className="text-white hover:text-brand-yellow transition-colors text-sm font-medium">How it works</button>
                <button
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="text-white hover:text-brand-yellow transition-colors text-sm font-medium"
                >
                  Contact
                </button>
              </nav>

              {/* CTA Button */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBackToHome}
                  className="text-white px-6 py-2 rounded-md transition-colors text-sm font-medium bg-brand-blue hover:bg-brand-dark-blue focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                >
                  Back to Homepage
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Success Acknowledgement */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue mb-6">
                  Thank you for submitting!
                </h1>
                <p className="text-xl text-gray-600 mb-2">
                  We've received your Report Card request for{' '}
                  <span className="font-semibold text-brand-blue">{userData.url}</span>
                </p>
                <p className="text-lg text-gray-600">
                  Your results will be delivered within {etaHoursMax} hours to{' '}
                  <span className="font-semibold text-brand-blue">{userData.email}</span>
                </p>
              </div>

              {/* Status + Timeline */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-xl mb-10">
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Report Card request received
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Estimated progress</span>
                    <span className="text-sm text-gray-500">{progressPct}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-brand-blue h-2 rounded-full transition-all"
                      style={{ width: `${progressPct}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <ol className="grid md:grid-cols-4 gap-4 mb-6">
                  {stages.map((s, i) => (
                    <li key={s.label} className="flex items-start gap-3">
                      <div
                        className={[
                          'mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border',
                          i <= stageIndex
                            ? 'bg-brand-blue border-blue-400 text-white'
                            : 'bg-white border-gray-300 text-gray-400',
                        ].join(' ')}
                        aria-hidden="true"
                      >
                        {i <= stageIndex ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <span className="h-1.5 w-1.5 bg-gray-300 rounded-full" />
                        )}
                      </div>
                      <div className="text-sm">
                        <div className={i <= stageIndex ? 'text-brand-dark-blue' : 'text-gray-600'}>
                          {s.label}
                        </div>
                        {i === 1 &&
                          queuePosition !== undefined &&
                          queueSize !== undefined && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              Position {queuePosition} of {queueSize}
                            </div>
                          )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Optional Details Section */}
              {!submitSuccess && (
                <div className="bg-blue-50 rounded-2xl shadow-xl p-8 mb-8 border border-blue-200">
                  {!showOptionalForm ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200">
                        <Settings className="h-8 w-8 text-brand-blue" />
                      </div>
                      <h2 className="text-2xl font-bold text-brand-dark-blue mb-4">Boost the quality of your Report Card (Optional)</h2>
                      <p className="text-blue-800 mb-4">30 seconds to get more targeted recommendations—no commitments.</p>
                      <button
                        onClick={() => { setShowOptionalForm(true); track('optional_details_open'); }}
                        className="inline-flex items-center px-6 py-3 bg-brand-blue text-white font-medium rounded-lg hover:bg-brand-dark-blue transition-colors"
                      >
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Add Optional Details
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleOptionalSubmit} className="space-y-6">
                      <h3 className="text-xl font-semibold text-brand-dark-blue mb-4">Tell us a bit more:</h3>
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
                        <button type="button" onClick={() => setShowOptionalForm(false)} className="w-full px-4 py-2 border rounded-lg">Cancel</button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center px-4 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark-blue disabled:opacity-50"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Details'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Success message for optional form */}
              {submitSuccess && (
                <div className="bg-green-50 rounded-lg p-6 mb-8 border border-green-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Additional details received!</h3>
                      <p className="text-green-700">We'll use this to provide more targeted recommendations in your Report Card.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Journey Section */}
              <div className="bg-gray-50 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-brand-dark-blue mb-2 text-center">
                  Your Journey with AvidAffiliate
                </h2>
                <p className="text-center text-gray-600 text-sm mb-8">
                  The path from insights to compounding revenue.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Stage 1: Report Card */}
                  <div className="text-center bg-white p-6 rounded-lg border border-gray-200 flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200">
                        <Clock className="h-8 w-8 text-brand-blue" />
                      </div>
                      <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">1. Free Report Card</h3>
                      <p className="text-gray-600 text-sm">
                        Your quick snapshot of missed payouts, broken links, and higher‑paying alternatives.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        track('report_card_sample_view', { source: 'thank_you_journey' });
                        window.open('/sample-report-card.html', '_blank');
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-brand-dark-blue font-medium text-sm rounded-lg hover:bg-gray-300 transition-colors mt-4"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      View Sample Report Card
                    </button>
                  </div>

                  {/* Stage 2: Full Audit - HIGHLIGHTED */}
                  <div className="text-center bg-green-50 p-6 rounded-lg border-2 border-green-500 flex flex-col justify-between shadow-2xl shadow-green-500/10 relative">
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-800 bg-green-100 ring-1 ring-inset ring-green-200/20 rounded-full">
                          Recommended Next Step
                        </span>
                      </div>
                    <div>
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">2. Full Audit (Paid)</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        A prioritized 90‑day plan to fix links, swap programs, and optimize tracking.
                      </p>
                      <p className="text-xs text-gray-500 mb-4">One-time investment for a complete roadmap.</p>
                    </div>
                    {!priorityListJoined ? (
                      <button
                        onClick={handleJoinPriorityList}
                        disabled={isJoiningPriorityList}
                        className="inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white font-medium text-sm rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isJoiningPriorityList ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Joining...
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4" />
                            Join the Priority List
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium text-sm rounded-lg">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Added to Priority List
                      </div>
                    )}
                  </div>

                  {/* Stage 3: Implementation */}
                  <div className="text-center bg-white p-6 rounded-lg border border-gray-200 flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-200">
                        <Settings className="h-8 w-8 text-purple-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-brand-dark-blue mb-2">3. Implementation</h3>
                      <p className="text-gray-600 text-sm">
                        We fix everything for you, then manage and optimize monthly for compounding gains.
                      </p>
                    </div>
                    <button
                        onClick={handleContactUs}
                        className="inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-brand-dark-blue font-medium text-sm rounded-lg hover:bg-gray-300 transition-colors mt-4"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Contact Us
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} onNext={onBackToHome} />
    </div>
  );
};