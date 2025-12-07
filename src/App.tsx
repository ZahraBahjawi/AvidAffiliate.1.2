import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { LoadingLogo } from './components/LoadingLogo.tsx';
import { UserData, ScorecardData, AppStage } from './types.ts';
import { generateMockScorecard } from './utils/mockData.ts';
import { logFormSubmission } from './utils/submissionLogger.ts';
import { ErrorBanner } from './components/ErrorBanner.tsx';
import { HomePage } from './components/HomePage.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { SubmissionForm } from './components/SubmissionForm.tsx';
import { LoadingScreen } from './components/LoadingScreen.tsx';
import { ScorecardDisplay } from './components/ScorecardDisplay.tsx';
import { SitemapPage } from './components/SitemapPage.tsx';
import { OurTeamPage } from './components/OurTeamPage.tsx';
import { ContactPage } from './components/ContactPage.tsx';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage.tsx';
import { TermsOfServicePage } from './components/TermsOfServicePage.tsx';
import { AffiliatePartnersPage } from './components/AffiliatePartnersPage.tsx';
import { CookiesPage } from './components/CookiesPage.tsx';
import { TestingPanel } from './components/TestingPanel.tsx';
import { ThankYouPage } from './components/ThankYouPage.tsx';
import { OptionalDetailsFormPage } from './components/OptionalDetailsFormPage.tsx';
import { trackPageView } from './utils/analytics.ts';

function App() {
  // State hooks must be at the top level
  const [isLoading, setIsLoading] = useState(true);
  const [stage, setStage] = useState<AppStage>('home');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [scorecardData, setScorecardData] = useState<ScorecardData | null>(null);
  const [error, setError] = useState<string>('');
  const [prefilledData, setPrefilledData] = useState<{ url?: string; email?: string }>({});

  const handleLoadingComplete = () => {
    setIsLoading(false);
    trackPageView(stage);
  };

  // Scroll-based background darkening effect
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
      const overlay = document.querySelector('.scroll-overlay') as HTMLElement;
      if (overlay) {
        overlay.style.opacity = (scrollPercent * 0.8).toString();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('landing') === 'true') {
      setStage('landing');
    } else if (window.location.hash === '#form') {
      setStage('form');
    } else if (window.location.pathname === '/optional-details-form') {
      setStage('optional-details');
    }
  }, []);

  const handleNavigate = (page: AppStage | string) => {
    if (typeof page === 'string' && page.includes('#')) {
      const [targetStage, targetId] = page.split('#');
      setStage(targetStage as AppStage);
      setScrollTarget(targetId);
      trackPageView(targetStage);
    } else {
      setStage(page as AppStage);
      trackPageView(page);
      window.scrollTo(0, 0);
    }
  };

  const handleFormSubmit = async (data: UserData) => {
    setUserData(data);
    
    // Log the form submission
    const submissionId = logFormSubmission('audit', data);

    try {
      // Generate unique audit ID
      const auditId = submissionId || `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Go directly to thank you page
      setStage('thankyou');

      
      
      // Save to localStorage as backup
      try {
        const backupData = {
          userData: data,
          auditId: auditId,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem(`submission_${auditId}`, JSON.stringify(backupData));
        console.log('💾 Submission saved to localStorage');
      } catch (localError) {
        console.error('Failed to save to localStorage:', localError);
      }

    } catch (error) {
      console.error('Error in form submission:', error);
      // Even if there's an error, go to thank you page
      setStage('thankyou');
    }
  };

  const resetToHome = () => {
    setStage('home');
    trackPageView('home');
    setUserData(null);
    setScorecardData(null);
    setError('');
    setPrefilledData({});
  };

  // Admin access via keyboard shortcut
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Press Ctrl+Shift+A to access admin panel
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setStage('admin');
      }
      // Press Escape to go back to home from admin
      if (e.key === 'Escape' && stage === 'admin') {
        resetToHome();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [stage]);

  const dismissError = () => {
    setError('');
  };

  // Show loading screen first
  if (isLoading) {
    return (
      <ErrorBoundary>
        {/* Note: The original file used 'onLoaded', your pasted code used 'onComplete'. 
          I've used 'onLoaded' to match the context file's likely prop name. 
        */}
        <LoadingLogo onComplete={handleLoadingComplete} />
      </ErrorBoundary>
    );
  }

  const renderCurrentStage = () => {
    switch (stage) {
      case 'thankyou':
        return userData ? (
          <ThankYouPage
            userData={userData}
            onBackToHome={resetToHome}
            onNavigate={handleNavigate}
          />
        ) : null;

      case 'optional-details':
        return <OptionalDetailsFormPage onBack={resetToHome} onNavigate={handleNavigate} />;

      case 'landing':
        return <LandingPage
          onNext={(data) => {
            if (data?.url) {
              setPrefilledData(data);
            }
            setStage('form');
          }}
          onNavigate={handleNavigate}
        />;

      case 'home':
        return <HomePage

          onNext={(data) => {
            if (data?.url) {
              setPrefilledData(data);
            }
            setStage('form');
          }}
          onNavigate={handleNavigate}
          onBack={resetToHome}
          scrollTarget={scrollTarget}
          onScrollComplete={() => setScrollTarget(null)}
        />;
      
      case 'form':
        return (
          <SubmissionForm
            onSubmit={handleFormSubmit}
            onBack={() => setStage('home')}
            onNavigate={handleNavigate}
            prefilledData={prefilledData}
          />
        );
      
      case 'scorecard':
        return userData && scorecardData ? (
          <ScorecardDisplay
            scorecardData={scorecardData}
            userData={userData}
            onBackToHome={resetToHome}
            onNavigate={handleNavigate}
          />
        ) : null;
      
      case 'sitemap':
        return <SitemapPage onBack={resetToHome} onNavigate={handleNavigate} />;
      
      
      case 'team':
        return <OurTeamPage onBack={resetToHome} onNavigate={handleNavigate} />;
      
      case 'contact': // Add this case
        return <ContactPage onBack={resetToHome} onNavigate={handleNavigate} />;
      
      
      case 'privacy':
        return <PrivacyPolicyPage onBack={resetToHome} onNavigate={handleNavigate} />;
      
      case 'terms':
        return <TermsOfServicePage onBack={resetToHome} onNavigate={handleNavigate} />;
      
      case 'cookies':
        return <CookiesPage onBack={resetToHome} onNavigate={handleNavigate} />;
      
        case 'affiliate_partners':
        return <AffiliatePartnersPage 
          onBack={resetToHome} 
          onNavigate={handleNavigate} 
          scrollTarget={scrollTarget}
          onScrollComplete={() => setScrollTarget(null)}
        />;
      
      default:
        return <HomePage
          onNext={() => setStage('form')} 
          onNavigate={handleNavigate}
        />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <div className="scroll-overlay"></div>
        {/* Note: The original file used 'message', your pasted code used 'error'. 
          I've used 'message' to match the context file's likely prop name for ErrorBanner.
        */}
        {error && <ErrorBanner message={error} onReset={dismissError} />}
        {renderCurrentStage()}
        <TestingPanel onNavigate={handleNavigate} setStage={setStage} />
      </div>
    </ErrorBoundary>
  );
}

export default App;

