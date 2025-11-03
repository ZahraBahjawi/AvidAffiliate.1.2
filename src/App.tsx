import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingLogo } from './components/LoadingLogo';
import { UserData, ScorecardData, AppStage } from './types';
import { generateMockScorecard } from './utils/mockData';
import { logFormSubmission } from './utils/submissionLogger';
import { ErrorBanner } from './components/ErrorBanner';
import { HomePage } from './components/HomePage';
import { LandingPage } from './components/LandingPage';
import { SubmissionForm } from './components/SubmissionForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ScorecardDisplay } from './components/ScorecardDisplay';
import { SitemapPage } from './components/SitemapPage';
import { OurTeamPage } from './components/OurTeamPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { AffiliatePartnersPage } from './components/AffiliatePartnersPage';
import { CookiesPage } from './components/CookiesPage';
import { TestingPanel } from './components/TestingPanel';
import { ThankYouPage } from './components/ThankYouPage';
import { OptionalDetailsFormPage } from './components/OptionalDetailsFormPage';
import { trackPageView } from './utils/analytics';

function App() {
  // State hooks must be at the top level
  const [isLoading, setIsLoading] = useState(true);
  const [stage, setStage] = useState<AppStage>('home');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [scorecardData, setScorecardData] = useState<ScorecardData | null>(null);
  const [error, setError] = useState<string>('');
  const [prefilledData, setPrefilledData] = useState<{ url?: string; email?: string }>({});

  // Scroll-based background darkening effect
  React.useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-section');
      if (hero) {
        const scrollY = window.scrollY;
        const opacity = Math.min(scrollY / (hero.offsetHeight * 0.5), 0.7);
        hero.style.setProperty('--overlay-opacity', opacity.toString());
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get('url');
    const email = urlParams.get('email');
    if (url) {
      setPrefilledData({ url, email: email || undefined });
      setStage('form');
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    trackPageView(stage);
  };

  const handleNavigation = (newStage: AppStage, scrollId?: string) => {
    setStage(newStage);
    trackPageView(newStage);
    if (scrollId) {
      setScrollTarget(scrollId);
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setScrollTarget(null);
    }
  }, [stage, scrollTarget]);

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    setStage('loading');
    logFormSubmission('audit', data);

    // Simulate API call for scorecard
    setTimeout(() => {
      try {
        const mockData = generateMockScorecard(data.url);
        setScorecardData(mockData);
        setStage('scorecard');
        window.scrollTo(0, 0);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
        setStage('error');
      }
    }, 2500);
  };

  const handleOptionalDetailsSubmit = (data: any) => {
    // This is the data from the optional details form
    console.log('Optional details submitted:', data);
    setStage('thank-you');
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setStage('home');
    setUserData(null);
    setScorecardData(null);
    setError('');
    window.scrollTo(0, 0);
  };

  const renderStage = () => {
    switch (stage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'landing':
        return <LandingPage onNavigate={handleNavigation} />;
      case 'form':
        return <SubmissionForm onSubmit={handleFormSubmit} prefilledData={prefilledData} />;
      case 'loading':
        return <LoadingScreen url={userData?.url || ''} />;
      case 'scorecard':
        return scorecardData ? (
          <ScorecardDisplay 
            data={scorecardData} 
            onNavigate={handleNavigation} 
          />
        ) : (
          <ErrorBanner message="Failed to load scorecard data." onReset={handleReset} />
        );
      case 'optional-details':
        return <OptionalDetailsFormPage onSubmit={handleOptionalDetailsSubmit} />;
      case 'thank-you':
        return <ThankYouPage onNavigate={handleNavigation} />;
      case 'sitemap':
        return <SitemapPage onNavigate={handleNavigation} />;
      case 'team':
        return <OurTeamPage onNavigate={handleNavigation} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigation} />;
      case 'privacy':
        return <PrivacyPolicyPage onNavigate={handleNavigation} />;
      case 'terms':
        return <TermsOfServicePage onNavigate={handleNavigation} />;
      case 'partners':
        return <AffiliatePartnersPage onNavigate={handleNavigation} />;
      case 'cookies':
        return <CookiesPage onNavigate={handleNavigation} />;
      case 'error':
        return <ErrorBanner message={error} onReset={handleReset} />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <ErrorBoundary>
      {isLoading && <LoadingLogo onLoaded={handleLoadingComplete} />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <main id="main-content">
          {renderStage()}
        </main>
        <TestingPanel onNavigate={handleNavigation} setStage={setStage} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
