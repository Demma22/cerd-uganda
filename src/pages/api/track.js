export const prerender = false;

import { supabaseAdmin } from '../../lib/supabase-admin.js';

export async function POST({ request }) {
  // Skip tracking for admin pages
  const { page_path, referrer } = await request.json().catch(() => ({}));
  if (!page_path || page_path.startsWith('/admin')) {
    return new Response(null, { status: 204 });
  }

  const { error } = await supabaseAdmin.from('page_views').insert({
    page_path,
    referrer: referrer || null,
  });

  if (error) console.error('[track] insert failed:', error.message);

  return new Response(null, { status: 204 });
}
