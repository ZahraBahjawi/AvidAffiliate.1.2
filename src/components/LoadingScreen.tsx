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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl text-center">
        {/* Header state: received + queued */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-800 text-sm">
            <CheckCircle className="h-4 w-4" />
            Audit request received
          </div>
        </div>

        {/* Title and subcopy */}
        <h2 className="text-3xl md:text-4xl font-light text-brand-dark-blue mb-3">
          You're in the queue
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-light mb-8">
          We've passed your request to our audit system. It will start soon and you'll receive email updates along the way.
          Typical turnaround is {etaHoursMin}–{etaHoursMax} hours.
        </p>

        {/* Progress indicator */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 text-left">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="h-4 w-4 text-brand-blue" />
              <span className="text-sm">Report card timeline</span>
            </div>
            <span className="text-sm text-gray-500">{progressPct}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
            <div
              className="bg-brand-blue h-2 rounded-full transition-all"
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
                      ? 'bg-brand-blue border-brand-blue text-white'
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
                  {i === 1 && (queuePosition !== undefined && queueSize !== undefined) && (
                    <div className="text-xs text-gray-500 mt-0.5">
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
          <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              <span className="text-sm font-medium text-blue-800">
                Report card notifications active
              </span>
            </div>
            <p className="text-sm text-blue-700">
              {email ? (
                <>We'll email your report card to <span className="font-medium">{email}</span>.</>
              ) : (
                <>We'll email you when your report card is ready.</>
              )}
            </p>
          </div>

          <div className="p-5 bg-gray-100 rounded-lg border border-gray-200">
            <div className="flex items-center mb-2">
              <Mail className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-800">You can close this tab</span>
            </div>
            <p className="text-sm text-gray-600">
              We'll keep working in the background. Expect your report card within {etaHoursMax} hours.
            </p>
          </div>
        </div>

        {/* Request metadata */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm text-gray-500 mb-10">
          {siteUrl && (
            <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg">
              Site: <span className="text-gray-800">{siteUrl}</span>
            </div>
          )}
          {requestId && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg">
              <span>Request ID:</span>
              <code className="text-gray-800">{requestId}</code>
              <button
                onClick={copyId}
                className="ml-1 inline-flex items-center gap-1 text-xs text-brand-blue hover:text-brand-dark-blue"
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
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark-blue hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            View sample report card
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <button
            onClick={onBookCall}
            className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-300 text-brand-dark-blue font-semibold rounded-lg hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Book a 20‑minute Strategize call
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <button
            onClick={onGoHome}
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-dark-blue text-white font-semibold rounded-lg hover:bg-gray-800 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Back to home
          </button>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-500">
          Need help? Contact support@avidaffiliate.com
        </p>

        {/* Subtle spinner to indicate background activity */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Working in the background</span>
        </div>
      </div>
    </div>
  );
};