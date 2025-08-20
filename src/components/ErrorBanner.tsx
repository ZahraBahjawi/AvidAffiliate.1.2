import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorBannerProps {
  error: string;
  onDismiss: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ error, onDismiss }) => {
  return (
    <div className="fixed top-4 left-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-800">{error}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={onDismiss}
            className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};