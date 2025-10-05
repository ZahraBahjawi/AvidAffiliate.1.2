/*
  # Create Madgicx Conversions Tracking Table

  1. New Tables
    - `madgicx_conversions`
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
      - `madgicx_response` (jsonb) - Response from Madgicx API
      - `status` (text) - Status of the conversion (pending, sent, failed)
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `madgicx_conversions` table
    - Add policy for service role to insert conversion events
    - Add policy for authenticated users to view their own conversions

  3. Indexes
    - Index on event_time for time-based queries
    - Index on event_name for filtering by event type
    - Index on status for monitoring pending/failed events
*/

CREATE TABLE IF NOT EXISTS madgicx_conversions (
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
  madgicx_response jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_madgicx_conversions_event_time ON madgicx_conversions(event_time);
CREATE INDEX IF NOT EXISTS idx_madgicx_conversions_event_name ON madgicx_conversions(event_name);
CREATE INDEX IF NOT EXISTS idx_madgicx_conversions_status ON madgicx_conversions(status);
CREATE INDEX IF NOT EXISTS idx_madgicx_conversions_created_at ON madgicx_conversions(created_at);

-- Enable Row Level Security
ALTER TABLE madgicx_conversions ENABLE ROW LEVEL SECURITY;

-- Policy for service role to insert conversion events
CREATE POLICY "Service role can insert conversions"
  ON madgicx_conversions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy for service role to update conversion status
CREATE POLICY "Service role can update conversions"
  ON madgicx_conversions
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy for service role to select all conversions
CREATE POLICY "Service role can select all conversions"
  ON madgicx_conversions
  FOR SELECT
  TO service_role
  USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_madgicx_conversions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on row updates
CREATE TRIGGER update_madgicx_conversions_timestamp
  BEFORE UPDATE ON madgicx_conversions
  FOR EACH ROW
  EXECUTE FUNCTION update_madgicx_conversions_updated_at();