/*
  # Disable RLS on url_input_tracking table

  1. Changes
    - Disable Row Level Security on `url_input_tracking` table
    
  2. Rationale
    - The table stores non-sensitive tracking data (URL inputs, UTM parameters, session IDs)
    - No personal identifiable information (PII) is stored
    - Anonymous users need to be able to insert tracking data from the frontend
    - The data is only used for analytics and doesn't require access restrictions
    
  3. Security Considerations
    - Read access can still be restricted at the application level
    - Consider implementing rate limiting at the application layer
    - IP addresses are anonymized if collected
*/

-- Disable RLS to allow anonymous users to track URL inputs
ALTER TABLE url_input_tracking DISABLE ROW LEVEL SECURITY;