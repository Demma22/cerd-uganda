import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required. Set it in your .env file.');
}

// Server-only admin client — bypasses RLS. Never import this in client-side code.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
