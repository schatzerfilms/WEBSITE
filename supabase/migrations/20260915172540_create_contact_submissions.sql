/*
# Create contact_submissions table

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `first_name` (text, not null)
  - `last_name` (text, not null)
  - `email` (text, not null)
  - `country_code` (text, nullable)
  - `phone` (text, nullable)
  - `message` (text, not null)
  - `created_at` (timestamptz, default now)

2. Security
- Enable RLS on `contact_submissions`.
- This is a no-auth public contact form, so anon can INSERT new submissions.
- No SELECT/UPDATE/DELETE policies — submissions cannot be read or modified from the frontend.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    country_code text,
    phone text,
    message text NOT NULL,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);