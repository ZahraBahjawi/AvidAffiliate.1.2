interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

interface CustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  contents?: Array<{ id: string; quantity: number }>;
  [key: string]: any;
}

interface ConversionEvent {
  event_name: string;
  event_time?: number;
  event_source_url: string;
  user_data?: UserData;
  custom_data?: CustomData;
  fbp?: string;
  fbc?: string;
  event_id?: string;
}

class FacebookPixel {
  private static instance: FacebookPixel;
  private pixelInitialized = false;
  private fbp: string | null = null;
  private fbc: string | null = null;
  private apiEndpoint: string;

  private constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

    if (!supabaseUrl) {
      console.error('VITE_SUPABASE_URL environment variable is not set. Facebook Conversions API will not work.');
      this.apiEndpoint = '';
    } else {
      this.apiEndpoint = `${supabaseUrl}/functions/v1/facebook-conversions`;
    }

    this.initializePixelData();
  }

  public static getInstance(): FacebookPixel {
    if (!FacebookPixel.instance) {
      FacebookPixel.instance = new FacebookPixel();
    }
    return FacebookPixel.instance;
  }

  private initializePixelData(): void {
    if (this.pixelInitialized) return;

    this.fbp = this.getCookie('_fbp') || this.generateFbp();
    this.fbc = this.getClickId();

    if (!this.getCookie('_fbp')) {
      this.setCookie('_fbp', this.fbp, 90);
    }

    this.pixelInitialized = true;
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  private setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  }

  private generateFbp(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `fb.1.${timestamp}.${random}`;
  }

  private getClickId(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');

    if (fbclid) {
      const fbc = `fb.1.${Date.now()}.${fbclid}`;
      this.setCookie('_fbc', fbc, 90);
      return fbc;
    }

    return this.getCookie('_fbc');
  }

  private generateEventId(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  private normalizeUserData(userData?: UserData): any {
    if (!userData) return undefined;

    const normalized: any = {};

    if (userData.email) normalized.em = userData.email;
    if (userData.phone) normalized.ph = userData.phone;
    if (userData.firstName) normalized.fn = userData.firstName;
    if (userData.lastName) normalized.ln = userData.lastName;
    if (userData.city) normalized.ct = userData.city;
    if (userData.state) normalized.st = userData.state;
    if (userData.zip) normalized.zp = userData.zip;
    if (userData.country) normalized.country = userData.country;

    return Object.keys(normalized).length > 0 ? normalized : undefined;
  }

  public async trackEvent(
    eventName: string,
    userData?: UserData,
    customData?: CustomData
  ): Promise<boolean> {
    if (!this.apiEndpoint) {
      console.warn('Facebook Conversions API endpoint not configured. Skipping event:', eventName);
      return false;
    }

    try {
      const event: ConversionEvent = {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        user_data: this.normalizeUserData(userData),
        custom_data: customData,
        fbp: this.fbp || undefined,
        fbc: this.fbc || undefined,
        event_id: this.generateEventId(),
      };

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          data: [event],
        }),
      });

      if (!response.ok) {
        console.error('Facebook pixel tracking failed:', await response.text());
        return false;
      }

      const result = await response.json();
      console.log('Facebook conversion tracked:', result);
      return true;
    } catch (error) {
      console.error('Error tracking Facebook conversion:', error);
      return false;
    }
  }

  public trackPageView(userData?: UserData): Promise<boolean> {
    return this.trackEvent('PageView', userData);
  }

  public trackViewContent(
    contentName: string,
    contentCategory?: string,
    value?: number,
    currency: string = 'USD',
    userData?: UserData
  ): Promise<boolean> {
    return this.trackEvent('ViewContent', userData, {
      content_name: contentName,
      content_category: contentCategory,
      value,
      currency,
    });
  }

  public trackLead(
    userData?: UserData,
    customData?: CustomData
  ): Promise<boolean> {
    return this.trackEvent('Lead', userData, customData);
  }

  public trackCompleteRegistration(
    userData?: UserData,
    customData?: CustomData
  ): Promise<boolean> {
    return this.trackEvent('CompleteRegistration', userData, customData);
  }

  public trackContact(
    userData?: UserData,
    customData?: CustomData
  ): Promise<boolean> {
    return this.trackEvent('Contact', userData, customData);
  }

  public trackPurchase(
    value: number,
    currency: string = 'USD',
    contentIds?: string[],
    userData?: UserData,
    customData?: CustomData
  ): Promise<boolean> {
    return this.trackEvent('Purchase', userData, {
      value,
      currency,
      content_ids: contentIds,
      ...customData,
    });
  }

  public trackAddToCart(
    contentName: string,
    value?: number,
    currency: string = 'USD',
    userData?: UserData
  ): Promise<boolean> {
    return this.trackEvent('AddToCart', userData, {
      content_name: contentName,
      value,
      currency,
    });
  }

  public trackInitiateCheckout(
    value?: number,
    currency: string = 'USD',
    contentIds?: string[],
    userData?: UserData
  ): Promise<boolean> {
    return this.trackEvent('InitiateCheckout', userData, {
      value,
      currency,
      content_ids: contentIds,
    });
  }

  public trackSearch(
    searchString: string,
    userData?: UserData
  ): Promise<boolean> {
    return this.trackEvent('Search', userData, {
      search_string: searchString,
    });
  }

  public trackCustomEvent(
    eventName: string,
    userData?: UserData,
    customData?: CustomData
  ): Promise<boolean> {
    return this.trackEvent(eventName, userData, customData);
  }
}

export const facebookPixel = FacebookPixel.getInstance();

export type { UserData, CustomData, ConversionEvent };
