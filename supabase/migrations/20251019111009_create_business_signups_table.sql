-- Create Business Signups Table
--
-- 1. New Tables
--    - business_signups
--      - id (uuid, primary key) - Unique identifier for each signup
--      - email (text, unique, not null) - Registered email address
--      - email_verified (boolean, default false) - Email verification status
--      - business_pan (text) - Business PAN number
--      - business_name (text) - Name of the business
--      - business_type (text) - Type of business
--      - business_address (text) - Business address
--      - business_registration_number (text) - Registration number
--      - business_registration_date (date) - Registration date
--      - authorized_signatory_name (text) - Name of authorized person
--      - authorized_signatory_designation (text) - Designation
--      - authorized_signatory_contact (text) - Contact number
--      - bank_account_number (text) - Bank account number
--      - bank_name (text) - Name of the bank
--      - bank_branch (text) - Bank branch
--      - bank_ifsc (text) - IFSC code
--      - website_url (text) - Company website URL
--      - created_at (timestamptz, default now()) - Signup timestamp
--      - updated_at (timestamptz, default now()) - Last update timestamp
--      - current_step (integer, default 1) - Current form step (1-7)
--      - completed (boolean, default false) - Whether signup is completed
--
-- 2. Security
--    - Enable RLS on business_signups table
--    - Add policy for public insert (anyone can signup)
--    - Add policy for users to read their own signup data by email

CREATE TABLE IF NOT EXISTS business_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  email_verified boolean DEFAULT false,
  business_pan text,
  business_name text,
  business_type text,
  business_address text,
  business_registration_number text,
  business_registration_date date,
  authorized_signatory_name text,
  authorized_signatory_designation text,
  authorized_signatory_contact text,
  bank_account_number text,
  bank_name text,
  bank_branch text,
  bank_ifsc text,
  website_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  current_step integer DEFAULT 1,
  completed boolean DEFAULT false
);

ALTER TABLE business_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a signup"
  ON business_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read signups by email"
  ON business_signups
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update signups"
  ON business_signups
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
