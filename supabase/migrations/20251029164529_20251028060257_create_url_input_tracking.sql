/*
  # Create URL Input Tracking Table

  1. New Tables
    - `url_input_tracking`
      - `id` (uuid, primary key) - Unique identifier for each tracking event
      - `url` (text) - The URL that was entered by the user
      - `session_id` (text) - Session identifier to track unique users
      - `utm_source` (text, nullable) - UTM source parameter
      - `utm_medium` (text, nullable) - UTM medium parameter
      - `utm_campaign` (text, nullable) - UTM campaign parameter
      - `utm_term` (text, nullable) - UTM term parameter
      - `utm_content` (text, nullable) - UTM content parameter
      - `referrer` (text, nullable) - HTTP referrer
      - `user_agent` (text, nullable) - User's browser user agent
      - `ip_address` (text, nullable) - User's IP address (anonymized)
      - `created_at` (timestamptz) - Timestamp when the URL was entered
      
  2. Security
    - Enable RLS on `url_input_tracking` table
    - Add policy for service role to insert tracking data
    - Public users cannot read or write directly (tracking happens server-side)
    
  3. Indexes
    - Add index on session_id for efficient lookups
    - Add index on created_at for time-based queries
*/

-- Create the url_input_tracking table
CREATE TABLE IF NOT EXISTS url_input_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  session_id text NOT NULL,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  user_agent text,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE url_input_tracking ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can insert (for server-side tracking)
CREATE POLICY "Service role can insert tracking data"
  ON url_input_tracking
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Only service role can read tracking data
CREATE POLICY "Service role can read tracking data"
  ON url_input_tracking
  FOR SELECT
  TO service_role
  USING (true);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_url_input_tracking_session_id 
  ON url_input_tracking(session_id);

CREATE INDEX IF NOT EXISTS idx_url_input_tracking_created_at 
  ON url_input_tracking(created_at DESC);