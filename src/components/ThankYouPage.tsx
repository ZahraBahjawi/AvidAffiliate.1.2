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
      className="min-h-screen bg-slate-900 flex flex-col"
      style={{
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="flex-grow">
        {/* Header Navigation */}
        <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-sm bg-slate-900/95">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <img src="/LOGO.png" alt="AvidAffiliate Logo" className="h-24 w-auto" />
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-8">
                <button
                  onClick={onBackToHome}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  Home
                </button>
                <button onClick={() => onNavigate && onNavigate('about')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About</button>
                <button onClick={() => onNavigate && onNavigate('team')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Team</button>
                <button
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  Contact
                </button>
              </nav>

              {/* CTA Button */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBackToHome}
                  className="text-white px-6 py-2 rounded-md transition-colors text-sm font-medium bg-[#FF6B35] hover:bg-[#E55A2B] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
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
                <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-800">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Thank you for submitting!
                </h1>
                <p className="text-xl text-gray-300 mb-2">
                  We've received your Report Card request for{' '}
                  <span className="font-semibold text-blue-400">{userData.url}</span>
                </p>
                <p className="text-lg text-gray-300">
                  Your results will be delivered within {etaHoursMax} hours to{' '}
                  <span className="font-semibold text-blue-400">{userData.email}</span>
                </p>
              </div>

              {/* Status + Timeline */}
              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 shadow-xl mb-10">
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-600 text-emerald-300 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Report Card request received
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Estimated progress</span>
                    <span className="text-sm text-gray-400">{progressPct}%</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
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
                            ? 'bg-blue-500 border-blue-400 text-white'
                            : 'bg-gray-900 border-gray-700 text-gray-500',
                        ].join(' ')}
                        aria-hidden="true"
                      >
                        {i <= stageIndex ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <span className="h-1.5 w-1.5 bg-gray-600 rounded-full" />
                        )}
                      </div>
                      <div className="text-sm">
                        <div className={i <= stageIndex ? 'text-white' : 'text-gray-400'}>
                          {s.label}
                        </div>
                        {i === 1 &&
                          queuePosition !== undefined &&
                          queueSize !== undefined && (
                            <div className="text-xs text-gray-400 mt-0.5">
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
                <div className="bg-blue-900/20 rounded-2xl shadow-xl p-8 mb-8 border border-blue-800">
                  {!showOptionalForm ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-800">
                        <Settings className="h-8 w-8 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-4">Boost the quality of your Report Card (Optional)</h2>
                      <p className="text-blue-300 mb-4">30 seconds to get more targeted recommendations—no commitments.</p>
                      <button
                        onClick={() => { setShowOptionalForm(true); track('optional_details_open'); }}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Add Optional Details
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleOptionalSubmit} className="space-y-6">
                      {/* Form fields... */}
                    </form>
                  )}
                </div>
              )}

              {/* Success message for optional form */}
              {submitSuccess && (
                <div className="bg-green-900/20 rounded-lg p-6 mb-8 border border-green-800">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-400">Additional details received!</h3>
                      <p className="text-green-300">We'll use this to provide more targeted recommendations in your Report Card.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Journey Section */}
              <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-8 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-2 text-center">
                  Your Journey with AvidAffiliate
                </h2>
                <p className="text-center text-gray-300 text-sm mb-8">
                  The path from insights to compounding revenue.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Stage 1: Report Card */}
                  <div className="text-center bg-slate-700/50 p-6 rounded-lg border border-slate-600 flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-800">
                        <Clock className="h-8 w-8 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">1. Free Report Card</h3>
                      <p className="text-gray-300 text-sm">
                        Your quick snapshot of missed payouts, broken links, and higher‑paying alternatives.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        track('report_card_sample_view', { source: 'thank_you_journey' });
                        window.open('/sample-report-card.html', '_blank');
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 bg-slate-600 text-white font-medium text-sm rounded-lg hover:bg-slate-500 transition-colors mt-4"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      View Sample Report Card
                    </button>
                  </div>

                  {/* Stage 2: Full Audit - HIGHLIGHTED */}
                  <div className="text-center bg-green-900/20 p-6 rounded-lg border-2 border-green-500 flex flex-col justify-between shadow-2xl shadow-green-500/10 relative">
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-300 bg-green-900 ring-1 ring-inset ring-green-600/20 rounded-full">
                          Recommended Next Step
                        </span>
                      </div>
                    <div>
                      <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-800">
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">2. Full Audit (Paid)</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        A prioritized 90‑day plan to fix links, swap programs, and optimize tracking.
                      </p>
                      <p className="text-xs text-gray-400 mb-4">One-time investment for a complete roadmap.</p>
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
                  <div className="text-center bg-slate-700/50 p-6 rounded-lg border border-slate-600 flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-800">
                        <Settings className="h-8 w-8 text-purple-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">3. Implementation</h3>
                      <p className="text-gray-300 text-sm">
                        We fix everything for you, then manage and optimize monthly for compounding gains.
                      </p>
                    </div>
                    <button
                        onClick={handleContactUs}
                        className="inline-flex items-center justify-center px-4 py-2 bg-slate-600 text-white font-medium text-sm rounded-lg hover:bg-slate-500 transition-colors mt-4"
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
