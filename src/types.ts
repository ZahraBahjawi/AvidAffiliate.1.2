export interface UserData {
  url: string;
  name: string;
  email: string;
  trafficTier: string;
  earningsTier: string;
  acceptedTerms: boolean;
}

export interface ScorecardData {
  score: string;
  unmonetized_links: number;
  broken_links: number;
  better_program_links: number;
  estimated_monthly_uplift: number;
  broken_monetized: number;
  total_links_analyzed?: number;
  suspected_affiliate_links?: number;
  known_merchant_links?: number;
}

export type AppStage = 'home' | 'landing' | 'form' | 'loading' | 'thankyou' | 'scorecard' | 'sitemap' | 'about' | 'team' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'affiliate_partners' | 'admin' | 'optional-details';