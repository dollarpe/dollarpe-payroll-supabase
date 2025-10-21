# DollarPe

## Supabase Table for Data Collection

Use the following SQL to create the `business_signups` table in Supabase. It matches the fields used by the app’s `SignupModal` and `BusinessSignup` interface (`src/lib/supabase.ts`).

```sql
-- Enable UUID generation
create extension if not exists pgcrypto;

-- Main table
create table if not exists public.business_signups (
  id uuid primary key default gen_random_uuid(),

  -- Step 1: Email verification
  email text,
  email_verified boolean default false,

  -- Step 2-4: Business details
  business_pan text,
  business_name text,
  business_type text,
  business_address text,
  business_registration_number text,
  business_registration_date text, -- stored as YYYY-MM-DD string

  -- Step 5: Authorised signatory
  authorized_signatory_name text,
  authorized_signatory_designation text,
  authorized_signatory_contact text,

  -- Step 6: Bank details
  bank_account_number text,
  bank_name text,
  bank_branch text,
  bank_ifsc text,

  -- Step 7: Website details
  website_url text,

  -- Progress tracking
  current_step integer default 1,
  completed boolean default false,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Helpful indexes
create index if not exists business_signups_email_idx on public.business_signups (email);
create index if not exists business_signups_current_step_idx on public.business_signups (current_step);
create index if not exists business_signups_completed_idx on public.business_signups (completed);
```

### How to Apply
- In Supabase Dashboard, open `SQL` and run the block above.
- Or save it as a migration file under `supabase/migrations/` and run via the CLI.

### Environment Setup (local dev)
Set the following in a `.env` file so the app can talk to Supabase:

```
VITE_SUPABASE_URL="https://<your-project-ref>.supabase.co"
VITE_SUPABASE_ANON_KEY="<your-anon-key>"
```

### Notes
- Columns are defined as `text` to allow saving partial progress without type errors (e.g. empty strings during early steps). If you prefer strict types, switch selected fields to `date`/`boolean` and add validation.
- Row Level Security (RLS) is off by default. If you enable RLS, add policies that allow authenticated users to insert/update their own rows.