import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface UrlInputTrackingData {
  url: string;
  session_id: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  user_agent?: string;
}

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('avidaffiliate_session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('avidaffiliate_session_id', sessionId);
  }

  return sessionId;
};

const getUTMParams = (): Record<string, string> => {
  try {
    const stored = localStorage.getItem('avidaffiliate_utms');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const trackUrlInput = async (url: string): Promise<boolean> => {
  try {
    const sessionId = getSessionId();
    const utms = getUTMParams();

    const trackingData: UrlInputTrackingData = {
      url: url.trim(),
      session_id: sessionId,
      utm_source: utms.utm_source,
      utm_medium: utms.utm_medium,
      utm_campaign: utms.utm_campaign,
      utm_term: utms.utm_term,
      utm_content: utms.utm_content,
      referrer: document.referrer || undefined,
      user_agent: navigator.userAgent,
    };

    const { error } = await supabase
      .from('url_input_tracking')
      .insert([trackingData]);

    if (error) {
      console.error('Error tracking URL input:', error);
      return false;
    }

    console.log('URL input tracked successfully');
    return true;
  } catch (error) {
    console.error('Error tracking URL input:', error);
    return false;
  }
};
