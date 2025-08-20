import React from 'react';
import {
  Loader2,
  Clock,
  Mail,
  CheckCircle,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';

export interface LoadingScreenProps {
  email?: string;
  siteUrl?: string;
  requestId?: string;
  queuePosition?: number; // e.g., 3
  queueSize?: number;     // e.g., 15
  etaHoursMin?: number;   // e.g., 24
  etaHoursMax?: number;   // e.g., 48
  onViewSample?: () => void;
  onGoHome?: () => void;
  onBookCall?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  email = '',
  siteUrl = '',
  requestId = '',
  queuePosition,
  queueSize,
  etaHoursMin = 24,
  etaHoursMax = 48,
  onViewSample,
  onGoHome,
  onBookCall,
}) => {
  // Compute a simple stage index (0..3): 0=Received, 1=Queued, 2=Auditing, 3=Preparing
  // Since audits are not immediate, default to "Queued"
  const stageIndex = 1;

  const stages = [
    { label: 'Request received', done: stageIndex >= 0 },
    { label: 'Queued', done: stageIndex >= 1 },
    { label: 'Audit running', done: stageIndex >= 2 },
    { label: 'Preparing scorecard', done: stageIndex >= 3 },
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

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-3xl text-center">
        {/* Header state: received + queued */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-600 text-emerald-300 text-sm">
            <CheckCircle className="h-4 w-4" />
            Audit request received
          </div>
        </div>

        {/* Title and subcopy */}
        <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
          You're in the queue
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-light mb-8">
          We've passed your request to our audit system. It will start soon and you'll receive email updates along the way.
          Typical turnaround is {etaHoursMin}–{etaHoursMax} hours.
        </p>

        {/* Progress indicator */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8 text-left">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-gray-200">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-sm">Report card timeline</span>
            </div>
            <span className="text-sm text-gray-400">{progressPct}%</span>
          </div>

          <div className="w-full bg-gray-900 rounded-full h-2 mb-5">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
              aria-hidden="true"
            />
          </div>

          <ol className="grid md:grid-cols-4 gap-4">
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
                  {i === 1 && (queuePosition !== undefined && queueSize !== undefined) && (
                    <div className="text-xs text-gray-400 mt-0.5">
                      Position {queuePosition} of {queueSize}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* System messages */}
        <div
          role="status"
          aria-live="polite"
          className="grid md:grid-cols-2 gap-4 text-left mb-8"
        >
          <div className="p-5 bg-blue-900/20 rounded-lg border border-blue-800">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              <span className="text-sm font-medium text-blue-300">
                Report card notifications active
              </span>
            </div>
            <p className="text-sm text-blue-200">
              {email ? (
                <>We'll email your report card to <span className="font-medium">{email}</span>.</>
              ) : (
                <>We'll email you when your report card is ready.</>
              )}
            </p>
          </div>

          <div className="p-5 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center mb-2">
              <Mail className="h-4 w-4 text-gray-300 mr-2" />
              <span className="text-sm font-medium text-gray-200">You can close this tab</span>
            </div>
            <p className="text-sm text-gray-300">
              We'll keep working in the background. Expect your report card within {etaHoursMax} hours.
            </p>
          </div>
        </div>

        {/* Request metadata */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm text-gray-400 mb-10">
          {siteUrl && (
            <div className="px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg">
              Site: <span className="text-gray-200">{siteUrl}</span>
            </div>
          )}
          {requestId && (
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg">
              <span>Request ID:</span>
              <code className="text-gray-200">{requestId}</code>
              <button
                onClick={copyId}
                className="ml-1 inline-flex items-center gap-1 text-xs text-blue-300 hover:text-blue-200"
                aria-label="Copy request ID"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          )}
        </div>

        {/* Actions while you wait */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={onViewSample}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
          >
            View sample report card
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <button
            onClick={onBookCall}
            className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Book a 20‑minute Strategize call
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <button
            onClick={onGoHome}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300"
          >
            Back to home
          </button>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-500">
          Need help? Contact support@yourdomain.com
        </p>

        {/* Subtle spinner to indicate background activity */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Working in the background</span>
        </div>
      </div>
    </div>
  );
};