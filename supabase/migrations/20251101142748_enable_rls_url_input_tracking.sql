/*
  # Enable RLS on url_input_tracking table

  1. Security Changes
    - Enable Row Level Security on `url_input_tracking` table
    - This ensures the existing policies are enforced
  
  2. Important Notes
    - The table already has a policy named `allow_all_insert`
    - Enabling RLS will activate that policy
*/

ALTER TABLE public.url_input_tracking ENABLE ROW LEVEL SECURITY;
