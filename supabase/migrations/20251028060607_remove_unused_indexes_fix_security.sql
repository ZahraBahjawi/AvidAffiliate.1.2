/*
  # Remove Unused Indexes and Fix Security Issues

  1. Index Cleanup
    - Drop unused indexes from madgicx_conversions table
    - Drop unused indexes from form_drafts table
    - Drop unused indexes from url_input_tracking table
    
  2. Security Fixes
    - Fix search_path mutability for update trigger functions
    - Set functions to SECURITY DEFINER with explicit search_path
    
  3. Notes
    - Unused indexes consume storage and slow down writes
    - Indexes can be recreated later if query patterns change
    - Function search_path mutability is a security risk that allows privilege escalation
*/

-- ============================================================================
-- Part 1: Remove Unused Indexes
-- ============================================================================

-- Drop unused indexes from madgicx_conversions
DROP INDEX IF EXISTS idx_madgicx_conversions_event_time;
DROP INDEX IF EXISTS idx_madgicx_conversions_event_name;
DROP INDEX IF EXISTS idx_madgicx_conversions_status;
DROP INDEX IF EXISTS idx_madgicx_conversions_created_at;

-- Drop unused indexes from form_drafts
DROP INDEX IF EXISTS idx_form_drafts_created_at;
DROP INDEX IF EXISTS idx_form_drafts_submitted_at;
DROP INDEX IF EXISTS idx_form_drafts_updated_at;

-- Drop unused indexes from url_input_tracking
DROP INDEX IF EXISTS idx_url_input_tracking_session_id;
DROP INDEX IF EXISTS idx_url_input_tracking_created_at;

-- ============================================================================
-- Part 2: Fix Function Security Issues
-- ============================================================================

-- Fix update_madgicx_conversions_updated_at function
-- Drop with CASCADE to remove dependent triggers
DROP FUNCTION IF EXISTS update_madgicx_conversions_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION update_madgicx_conversions_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER update_madgicx_conversions_timestamp
  BEFORE UPDATE ON madgicx_conversions
  FOR EACH ROW
  EXECUTE FUNCTION update_madgicx_conversions_updated_at();

