export const prerender = false;

import { supabaseAdmin } from '../../lib/supabase-admin.js';
import { checkAuth } from '../../utils/auth.js';

const UNAUTHORIZED = new Response(JSON.stringify({ error: 'Unauthorized' }), {
  status: 401,
  headers: { 'Content-Type': 'application/json' },
});

export async function GET({ cookies, url }) {
  if (!checkAuth(cookies)) return UNAUTHORIZED;

  const days = parseInt(url.searchParams.get('days') || '7');
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [totalRes, todayRes, byDayRes, byPageRes] = await Promise.all([
    // Total views in period
    supabaseAdmin
      .from('page_views')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', since),

    // Today's views
    supabaseAdmin
      .from('page_views')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', todayStart.toISOString()),

    // Views grouped by day
    supabaseAdmin
      .from('page_views')
      .select('created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: true }),

    // Top pages
    supabaseAdmin
      .from('page_views')
      .select('page_path')
      .gte('created_at', since),
  ]);

  // Aggregate views by day
  const dayMap = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    dayMap[key] = 0;
  }
  for (const row of byDayRes.data || []) {
    const key = row.created_at.slice(0, 10);
    if (key in dayMap) dayMap[key]++;
  }
  const byDay = Object.entries(dayMap).map(([date, count]) => ({ date, count }));

  // Aggregate top pages
  const pageMap = {};
  for (const row of byPageRes.data || []) {
    pageMap[row.page_path] = (pageMap[row.page_path] || 0) + 1;
  }
  const topPages = Object.entries(pageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, count]) => ({ path, count }));

  return new Response(
    JSON.stringify({
      total: totalRes.count ?? 0,
      today: todayRes.count ?? 0,
      byDay,
      topPages,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
