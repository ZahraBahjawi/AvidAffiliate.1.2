# Deployment Instructions

## Critical Environment Variables

For the Facebook Conversions API to work, you need to configure environment variables in **TWO** places:

### Part 1: Netlify Environment Variables (Frontend)

Go to Netlify Dashboard → Site Settings → Environment Variables and add:

1. **VITE_SUPABASE_URL**
   - Value: `https://qkiqcrohrgruzgyxhbnp.supabase.co`
   - Scope: All scopes (Production, Deploy Previews, Branch deploys)

2. **VITE_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFraXFjcm9ocmdydXpneXhoYm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NjE0NTUsImV4cCI6MjA3NTIzNzQ1NX0.q66FbakcPoBzgHOpGr4rtanPJ19hjZXG41BuorJVzp4`
   - Scope: All scopes (Production, Deploy Previews, Branch deploys)

#### How to Add in Netlify

1. Log in to [Netlify](https://app.netlify.com)
2. Select your site
3. Go to **Site configuration** → **Environment variables**
4. Click **Add a variable** → **Add a single variable**
5. Enter the key and value for each variable
6. Select scopes (recommend selecting all: Production, Deploy Previews, Branch deploys)
7. Click **Create variable**
8. After adding all variables, go to **Deploys** tab → **Trigger deploy** → **Clear cache and deploy site**

---

### Part 2: Supabase Secrets (Backend/Edge Function)

**CRITICAL:** The edge function needs Facebook credentials. Go to your Supabase dashboard and add these secrets:

1. **FB_PIXEL_ID**
   - Your Facebook Pixel ID (e.g., `1234567890123456`)
   - Find it at: Facebook Events Manager → Data Sources → Pixels → Settings

2. **FB_ACCESS_TOKEN**
   - Your Facebook Conversions API Access Token
   - Generate at: Facebook Events Manager → Data Sources → Pixels → Settings → Conversions API → Generate Access Token

#### How to Add Supabase Secrets

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `qkiqcrohrgruzgyxhbnp`
3. Go to **Project Settings** → **Edge Functions** → **Manage Secrets**
4. Add both `FB_PIXEL_ID` and `FB_ACCESS_TOKEN`
5. Click **Save**

**Important:** After adding secrets, the edge function will automatically pick them up on the next invocation (no redeployment needed).

## Verification & Troubleshooting

After configuring all environment variables:

### Success Indicators
- Browser console shows: `Facebook conversion tracked: {success: true, ...}`
- No 404 or 500 errors when calling the edge function
- Events appear in Facebook Events Manager

### Common Errors

**Error: `POST .../facebook-conversions 404 (Not Found)`**
- **Cause:** Frontend environment variables not set in Netlify
- **Fix:** Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Netlify, then redeploy

**Error: `POST .../facebook-conversions 500 (Internal Server Error)` with "Object with ID 'XXXXX' does not exist"**
- **Cause:** Facebook credentials not configured in Supabase OR incorrect Pixel ID/Access Token
- **Fix:**
  1. Verify your Facebook Pixel ID is correct in Facebook Events Manager
  2. Generate a new Access Token with proper permissions
  3. Add both `FB_PIXEL_ID` and `FB_ACCESS_TOKEN` as Supabase secrets
  4. Ensure the Access Token has permission to access the specified Pixel ID

**Error: `VITE_SUPABASE_URL environment variable is not set`**
- **Cause:** Frontend environment variables missing
- **Fix:** Add variables to Netlify and trigger new deployment

## Alternative: Vercel Deployment

If deploying to Vercel instead:

1. Go to Project Settings → Environment Variables
2. Add the same `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables
3. Redeploy the site

## Local Development

For local development, these variables are already configured in the `.env` file and will work automatically.
