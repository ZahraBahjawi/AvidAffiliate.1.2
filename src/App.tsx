import React, { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { UserData, ScorecardData, AppStage } from './types';
import { generateMockScorecard } from './utils/mockData';
import { sendAuditStartedNotification, sendAuditCompletedNotification, generateAuditSummary } from './utils/emailService';
import { logFormSubmission } from './utils/submissionLogger';
import { ErrorBanner } from './components/ErrorBanner';
import { HomePage } from './components/HomePage';
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
import { SubmissionLogger } from './components/SubmissionLogger';
import { TestingPanel } from './components/TestingPanel';
import { ThankYouPage } from './components/ThankYouPage';

function App() {
  const [stage, setStage] = useState<AppStage>('home');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null); // Add this line
  const [userData, setUserData] = useState<UserData | null>(null);
  const [scorecardData, setScorecardData] = useState<ScorecardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [prefilledData, setPrefilledData] = useState<{ url?: string; email?: string }>({});

  const handleFormSubmit = async (data: UserData) => {
    setUserData(data);
    
    // Log the form submission
    const submissionId = logFormSubmission('audit', data);

    try {
      // Generate unique audit ID
      const auditId = submissionId || `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Go directly to thank you page
      setStage('thankyou');

      // Background tasks (run independently)
      setTimeout(() => {
        // Send audit started notification
        sendAuditStartedNotification({
          userEmail: data.email,
          userName: data.name,
          websiteUrl: data.url,
          auditId: auditId
        }).catch(error => console.warn('Email notification error:', error));
      }, 500);

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

  const renderCurrentStage = () => {
    switch (stage) {
      case 'home':
        return <HomePage 
          
          onNext={(data) => {
            if (data?.url) {
              setPrefilledData(data);
            }
            setStage('form');
          }} 
          onNavigate={(page) => {
            if (page.includes('#')) {
              const [targetStage, targetId] = page.split('#');
              setStage(targetStage as AppStage);
              setScrollTarget(targetId);
            } else {
              setStage(page as AppStage);
            }
          }}
          onBack={resetToHome}
          scrollTarget={scrollTarget}
          onScrollComplete={() => setScrollTarget(null)}
        />;
      
      case 'form':
        return (
          <SubmissionForm
            onSubmit={handleFormSubmit}
            onBack={() => setStage('home')}
            onNavigate={(page) => setStage(page)}
            prefilledData={prefilledData}
          />
        );
      
      case 'thankyou':
        return userData ? (
          <ThankYouPage
            userData={userData}
            onBackToHome={resetToHome}
            onNavigate={(page) => setStage(page)}
          />
        ) : null;
      
      case 'scorecard':
        return userData && scorecardData ? (
          <ScorecardDisplay
            scorecardData={scorecardData}
            userData={userData}
            onBackToHome={resetToHome}
            onNavigate={(page) => setStage(page)}
          />
        ) : null;
      
      case 'sitemap':
        return <SitemapPage onBack={resetToHome} onNavigate={(page) => setStage(page)} />;
      
     
      case 'team':
        return <OurTeamPage onBack={resetToHome} onNavigate={(page) => setStage(page)} />;
      
      case 'contact': // Add this case
        return <ContactPage onBack={resetToHome} onNavigate={(page) => setStage(page)} />;
      
      
      case 'privacy':
        return <PrivacyPolicyPage onBack={resetToHome} onNavigate={(page) => setStage(page)} />;
      
      case 'terms':
        return <TermsOfServicePage onBack={resetToHome} onNavigate={(page) => setStage(page)} />;
      
      case 'cookies':
        return <CookiesPage onBack={resetToHome} onNavigate={(page) => setStage(page)} />;
      
      case 'affiliate_partners':
        return <AffiliatePartnersPage onBack={resetToHome} onNavigate={(page) => setStage(page)} />;
      
      case 'admin':
        return <SubmissionLogger />;
      
      default:
        return <HomePage 
          onNext={() => setStage('form')} 
          onNavigate={(page) => setStage(page)}
        />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900">
        {error && <ErrorBanner error={error} onDismiss={dismissError} />}
        {renderCurrentStage()}
        <TestingPanel />
      </div>
    </ErrorBoundary>
  );
}

export default App;