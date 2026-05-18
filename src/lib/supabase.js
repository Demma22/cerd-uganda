import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

// Public client — used in the browser, subject to RLS
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only client — bypasses RLS, never expose to the browser
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);