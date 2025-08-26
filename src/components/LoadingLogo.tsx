import React from 'react';

interface LoadingLogoProps {
  onComplete?: () => void;
}

export const LoadingLogo: React.FC<LoadingLogoProps> = ({ onComplete }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete?.(), 200); // Small delay after completion
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-brand-dark-blue flex items-center justify-center z-50">
      {/* Logo container */}
      <div className="relative">
        {/* Background logo (empty/outline) */}
        <div className="relative w-32 h-32 opacity-30">
          <img 
            src="/LOGO.png" 
            alt="AvidAffiliate Logo" 
            className="w-full h-full object-contain filter grayscale"
          />
        </div>
        
        {/* Filling logo with clip-path */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(${100 - progress}% 0 0 0)`
          }}
        >
          <img 
            src="/LOGO.png" 
            alt="AvidAffiliate Logo" 
            className="w-32 h-32 object-contain"
          />
        </div>
        
        {/* Optional glow effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-yellow/20 rounded-full blur-2xl transition-opacity duration-300"
          style={{ opacity: progress / 100 }}
        />
      </div>
    </div>
  );
};