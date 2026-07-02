export const prerender = false;

import { supabaseAdmin } from '../../lib/supabase-admin.js';

export async function POST({ request }) {
  const { page_path, referrer } = await request.json().catch(() => ({}));

  // Only accept plausible internal paths; skip admin pages
  if (
    typeof page_path !== 'string' ||
    !page_path.startsWith('/') ||
    page_path.length > 300 ||
    page_path.startsWith('/admin')
  ) {
    return new Response(null, { status: 204 });
  }

  const cleanReferrer =
    typeof referrer === 'string' && referrer.length > 0 ? referrer.slice(0, 500) : null;

  const { error } = await supabaseAdmin.from('page_views').insert({
    page_path,
    referrer: cleanReferrer,
  });

  if (error) console.error('[track] insert failed:', error.message);

  return new Response(null, { status: 204 });
}
