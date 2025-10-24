import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Create real client if env vars are present; otherwise use a minimal mock to avoid runtime errors in development
export const supabase =
  isSupabaseConfigured
    ? createClient(supabaseUrl as string, supabaseAnonKey as string)
    : {
        from() {
          return {
            insert() {
              return {
                select() {
                  return {
                    single: async () => ({ data: { id: 'mock-id' }, error: null }),
                  };
                },
              };
            },
            update() {
              return {
                eq: async () => ({ data: null, error: null }),
              };
            },
          };
        },
      } as any;

export interface BusinessSignup {
  id?: string;
  email: string;
  email_verified?: boolean;
  business_pan?: string;
  business_name?: string;
  business_type?: string;
  business_address?: string;
  business_registration_number?: string;
  business_registration_date?: string;
  authorized_signatory_name?: string;
  authorized_signatory_designation?: string;
  authorized_signatory_contact?: string;
  bank_account_number?: string;
  bank_name?: string;
  bank_branch?: string;
  bank_ifsc?: string;
  website_url?: string;
  current_step?: number;
  completed?: boolean;
  created_at?: string;
  updated_at?: string;
}
