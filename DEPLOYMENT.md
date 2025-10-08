# Deployment Instructions

## Critical Environment Variables

The following environment variables **MUST** be configured in your Netlify deployment settings for the Facebook Conversions API to work:

### Required Variables

Go to Netlify Dashboard → Site Settings → Environment Variables and add:

1. **VITE_SUPABASE_URL**
   - Value: `https://qkiqcrohrgruzgyxhbnp.supabase.co`
   - Scope: All scopes (Production, Deploy Previews, Branch deploys)

2. **VITE_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFraXFjcm9ocmdydXpneXhoYm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NjE0NTUsImV4cCI6MjA3NTIzNzQ1NX0.q66FbakcPoBzgHOpGr4rtanPJ19hjZXG41BuorJVzp4`
   - Scope: All scopes (Production, Deploy Previews, Branch deploys)

### How to Add Environment Variables in Netlify

1. Log in to [Netlify](https://app.netlify.com)
2. Select your site
3. Go to **Site configuration** → **Environment variables**
4. Click **Add a variable** → **Add a single variable**
5. Enter the key and value for each variable
6. Select scopes (recommend selecting all: Production, Deploy Previews, Branch deploys)
7. Click **Create variable**

### After Adding Variables

After adding the environment variables, you need to trigger a new build:

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**

This ensures the new environment variables are picked up during the build process.

## Verification

After deployment, open the browser console on your production site. You should see:

- Facebook conversion tracking logs
- No errors about undefined SUPABASE_URL

If you see the error `VITE_SUPABASE_URL environment variable is not set`, the environment variables were not properly configured in Netlify.

## Alternative: Vercel Deployment

If deploying to Vercel instead:

1. Go to Project Settings → Environment Variables
2. Add the same `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables
3. Redeploy the site

## Local Development

For local development, these variables are already configured in the `.env` file and will work automatically.
