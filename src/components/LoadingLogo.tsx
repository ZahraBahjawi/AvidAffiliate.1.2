import React from 'react';

interface LoadingLogoProps {
  onComplete?: () => void;
}

export const LoadingLogo: React.FC<LoadingLogoProps> = ({ onComplete }) => {
  React.useEffect(() => {
    // Auto-complete after 2.5 seconds
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-pulse"></div>
      
      {/* Logo container with animations */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Main logo with multiple animations */}
        <div className="relative mb-8">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse scale-150"></div>
          
          {/* Logo with bounce and fade in */}
          <img 
            src="/LOGO.png" 
            alt="AvidAffiliate Logo" 
            className="h-32 w-auto relative z-10 animate-bounce-slow opacity-0 animate-fade-in"
            style={{
              animation: 'fadeInBounce 1s ease-out forwards, float 3s ease-in-out infinite 1s'
            }}
          />
          
          {/* Rotating ring around logo */}
          <div className="absolute inset-0 border-2 border-gradient-to-r from-orange-500 to-red-500 rounded-full animate-spin-slow opacity-30"></div>
        </div>
        
        {/* Company name with typewriter effect */}
        <h1 className="text-4xl font-bold text-white mb-4 opacity-0 animate-fade-in-delayed">
          AvidAffiliate
        </h1>
        
        {/* Tagline with slide up effect */}
        <p className="text-lg text-gray-300 opacity-0 animate-slide-up-delayed text-center max-w-md">
          Unlocking your website's hidden revenue potential
        </p>
        
        {/* Loading dots */}
        <div className="flex space-x-2 mt-8">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-1 bg-slate-700 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-progress"></div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};