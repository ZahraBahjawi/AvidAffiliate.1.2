# Landing Page Setup for Facebook Ads

## Overview
A dedicated, conversion-focused landing page has been created at `/landing` to improve conversion rates from Facebook ads.

## Key Differences from Homepage

### Landing Page Features:
- **Simplified design** - Removes distracting navigation and multiple CTAs
- **Single focus** - One goal: get users to enter their website URL
- **Above-the-fold form** - No scrolling needed to convert
- **Prominent value proposition** - Clear headline about revenue leaks
- **Social proof** - Single testimonial for credibility
- **Reduced friction** - Only asks for website URL (not email)
- **Trust indicators** - Security badges and clear benefits
- **Mobile optimized** - Clean, fast-loading design

### Homepage:
- Multiple sections and navigation
- "View Scorecard" CTA that diverts attention
- Longer scroll experience
- More information and distractions

## How to Use

### For Facebook Ads:
Point your Facebook ad traffic to: `https://yourdomain.com/?landing=true`

The app will automatically detect the `landing=true` parameter and show the landing page.

### Route Setup Options:

#### Option 1: Query Parameter (Recommended)
Update your Facebook ads to use: `https://yourdomain.com/?landing=true`

Add this code to `App.tsx` in the `useEffect` that checks for hash:

```typescript
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
```

#### Option 2: Direct Route
If you prefer a clean URL like `https://yourdomain.com/landing`, you'll need to:
1. Configure your hosting (Netlify) to route `/landing` to your app
2. Update the useEffect to check `window.location.pathname === '/landing'`

## Testing
To test the landing page locally:
1. Run your dev server
2. Navigate to `http://localhost:5173/?landing=true`
3. OR manually set `setStage('landing')` in App.tsx for testing

## Conversion Optimization Tips
1. Use UTM parameters in your Facebook ads to track performance
2. A/B test different headlines
3. Monitor form submission rates
4. Consider adding scarcity ("Limited spots available") if appropriate
5. Test with and without the testimonial section

## Analytics Tracking
The landing page tracks the following events:
- `landing_page_view` - Page load
- `form_start` - User focuses on input
- `form_submit_attempt` - Form submission
- All events include UTM parameters for attribution
