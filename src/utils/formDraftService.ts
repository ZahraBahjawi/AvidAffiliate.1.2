import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

let sessionId: string | null = null;

const getSessionId = (): string => {
  if (sessionId) return sessionId;

  sessionId = localStorage.getItem('form_session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('form_session_id', sessionId);
  }

  return sessionId;
};

const getBrowserInfo = () => {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};

interface FormDraftData {
  websiteUrl?: string;
  name?: string;
  email?: string;
  step?: string;
  lastActiveField?: string;
}

let saveTimeout: NodeJS.Timeout | null = null;

export const saveDraft = async (data: FormDraftData): Promise<void> => {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  saveTimeout = setTimeout(async () => {
    try {
      const session = getSessionId();
      const browserInfo = getBrowserInfo();

      const { error } = await supabase
        .from('form_drafts')
        .upsert({
          session_id: session,
          website_url: data.websiteUrl || '',
          name: data.name || '',
          email: data.email || '',
          step: data.step || 'step2',
          last_active_field: data.lastActiveField || null,
          browser_info: browserInfo,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'session_id',
        });

      if (error) {
        console.error('Error saving draft:', error);
      }
    } catch (err) {
      console.error('Failed to save draft:', err);
    }
  }, 1000);
};

export const markSubmitted = async (): Promise<void> => {
  try {
    const session = getSessionId();

    await supabase
      .from('form_drafts')
      .update({
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('session_id', session);

    localStorage.removeItem('form_session_id');
  } catch (err) {
    console.error('Failed to mark as submitted:', err);
  }
};

export const getDraft = async (): Promise<FormDraftData | null> => {
  try {
    const session = getSessionId();

    const { data, error } = await supabase
      .from('form_drafts')
      .select('*')
      .eq('session_id', session)
      .is('submitted_at', null)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return {
      websiteUrl: data.website_url,
      name: data.name,
      email: data.email,
      step: data.step,
    };
  } catch (err) {
    console.error('Failed to get draft:', err);
    return null;
  }
};
