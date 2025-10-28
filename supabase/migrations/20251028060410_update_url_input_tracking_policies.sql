/*
  # Update URL Input Tracking RLS Policies

  1. Changes
    - Drop existing restrictive policies that only allow service_role
    - Add new policy to allow anonymous users to insert their own tracking data
    - This enables client-side tracking while maintaining security
    
  2. Security
    - Anonymous users can only insert (not read or update)
    - All users can insert tracking data (required for form tracking)
    - No users can read the tracking data (admin access only via service role)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Service role can insert tracking data" ON url_input_tracking;
DROP POLICY IF EXISTS "Service role can read tracking data" ON url_input_tracking;

-- Allow anyone to insert tracking data (for client-side tracking)
CREATE POLICY "Anyone can insert tracking data"
  ON url_input_tracking
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only service role can read tracking data (for analytics/reporting)
CREATE POLICY "Service role can read tracking data"
  ON url_input_tracking
  FOR SELECT
  TO service_role
  USING (true);