declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

const STAGE_TO_PATH: Record<string, string> = {
  home: '/',
  landing: '/landing',
  form: '/form',
  thankyou: '/thank-you',
  'optional-details': '/optional-details',
  scorecard: '/scorecard',
  sitemap: '/sitemap',
  team: '/team',
  contact: '/contact',
  privacy: '/privacy-policy',
  terms: '/terms-of-service',
  cookies: '/cookies',
  affiliate_partners: '/affiliate-partners',
  admin: '/admin',
  services: '/services'
};

export const trackPageView = (stage: string, title?: string) => {
  const path = STAGE_TO_PATH[stage] || `/${stage}`;
  const pageTitle = title || `AvidAffiliate - ${stage.charAt(0).toUpperCase() + stage.slice(1)}`;

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: pageTitle,
      page_location: `${window.location.origin}${path}`
    });

    console.log('📊 GA Page View:', path);
  }
};

export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
    console.log('📊 GA Event:', eventName, eventData);
  }
};
