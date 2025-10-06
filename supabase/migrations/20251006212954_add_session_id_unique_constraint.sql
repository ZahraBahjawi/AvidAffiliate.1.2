/*
  # Add unique constraint to form_drafts session_id

  1. Changes
    - Add unique constraint to `session_id` column in `form_drafts` table
    - This allows upsert operations to work correctly when saving form drafts

  2. Notes
    - Uses IF NOT EXISTS to prevent errors if constraint already exists
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'form_drafts_session_id_key'
    AND conrelid = 'form_drafts'::regclass
  ) THEN
    ALTER TABLE form_drafts ADD CONSTRAINT form_drafts_session_id_key UNIQUE (session_id);
  END IF;
END $$;
