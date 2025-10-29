/*
  # Create Facebook Conversions API Tracking Table

  1. New Tables
    - `facebook_conversions`
      - `id` (uuid, primary key) - Unique identifier for each conversion event
      - `event_name` (text) - Name of the conversion event (e.g., PageView, Lead, Purchase)
      - `event_time` (bigint) - Unix timestamp of when the event occurred
      - `event_source_url` (text) - URL where the event occurred
      - `user_data` (jsonb) - Hashed user data (email, phone, etc.)
      - `custom_data` (jsonb) - Custom event parameters
      - `fbp` (text) - Facebook browser pixel cookie
      - `fbc` (text) - Facebook click ID
      - `client_ip_address` (text) - Client IP address
      - `client_user_agent` (text) - Client user agent string
      - `event_id` (text) - Unique event ID for deduplication
      - `facebook_response` (jsonb) - Response from Facebook Conversions API
      - `status` (text) - Status of the conversion (pending, sent, failed)
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `facebook_conversions` table
    - Add policy for service role to insert conversion events
    - Add policy for service role to update and select conversions

  3. Indexes
    - Index on event_time for time-based queries
    - Index on event_name for filtering by event type
    - Index on status for monitoring pending/failed events
    - Index on created_at for reporting
*/

CREATE TABLE IF NOT EXISTS facebook_conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  event_time bigint NOT NULL,
  event_source_url text,
  user_data jsonb DEFAULT '{}'::jsonb,
  custom_data jsonb DEFAULT '{}'::jsonb,
  fbp text,
  fbc text,
  client_ip_address text,
  client_user_agent text,
  event_id text UNIQUE NOT NULL,
  facebook_response jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_facebook_conversions_event_time ON facebook_conversions(event_time);
CREATE INDEX IF NOT EXISTS idx_facebook_conversions_event_name ON facebook_conversions(event_name);
CREATE INDEX IF NOT EXISTS idx_facebook_conversions_status ON facebook_conversions(status);
CREATE INDEX IF NOT EXISTS idx_facebook_conversions_created_at ON facebook_conversions(created_at);

ALTER TABLE facebook_conversions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert conversions"
  ON facebook_conversions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update conversions"
  ON facebook_conversions
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can select all conversions"
  ON facebook_conversions
  FOR SELECT
  TO service_role
  USING (true);

CREATE OR REPLACE FUNCTION update_facebook_conversions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_facebook_conversions_timestamp
  BEFORE UPDATE ON facebook_conversions
  FOR EACH ROW
  EXECUTE FUNCTION update_facebook_conversions_updated_at();