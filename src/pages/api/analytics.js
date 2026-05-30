export const prerender = false;

import { supabaseAdmin } from '../../lib/supabase-admin.js';
import { checkAuth } from '../../utils/auth.js';

const UNAUTHORIZED = new Response(JSON.stringify({ error: 'Unauthorized' }), {
  status: 401,
  headers: { 'Content-Type': 'application/json' },
});

export async function GET({ cookies, url }) {
  if (!checkAuth(cookies)) return UNAUTHORIZED;

  // Support either ?days=N  or  ?from=YYYY-MM-DD&to=YYYY-MM-DD
  const fromParam = url.searchParams.get('from');
  const toParam   = url.searchParams.get('to');
  const days      = parseInt(url.searchParams.get('days') || '7');

  let since, until, dayMap;

  if (fromParam && toParam) {
    since = new Date(fromParam + 'T00:00:00.000Z').toISOString();
    until = new Date(toParam   + 'T23:59:59.999Z').toISOString();
    // Build day map for the explicit range
    dayMap = {};
    const cursor = new Date(fromParam + 'T00:00:00.000Z');
    const end    = new Date(toParam   + 'T00:00:00.000Z');
    while (cursor <= end) {
      dayMap[cursor.toISOString().slice(0, 10)] = 0;
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
  } else {
    since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    until = null;
    dayMap = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      dayMap[d.toISOString().slice(0, 10)] = 0;
    }
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  let byDayQuery  = supabaseAdmin.from('page_views').select('created_at').gte('created_at', since).order('created_at', { ascending: true });
  let byPageQuery = supabaseAdmin.from('page_views').select('page_path').gte('created_at', since);
  let totalQuery  = supabaseAdmin.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', since);

  if (until) {
    byDayQuery  = byDayQuery.lte('created_at', until);
    byPageQuery = byPageQuery.lte('created_at', until);
    totalQuery  = totalQuery.lte('created_at', until);
  }

  const [totalRes, todayRes, byDayRes, byPageRes] = await Promise.all([
    totalQuery,
    supabaseAdmin.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', todayStart.toISOString()),
    byDayQuery,
    byPageQuery,
  ]);

  // Aggregate by day
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
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  const total = totalRes.count ?? 0;
  const peakDay = byDay.reduce((a, b) => (b.count > a.count ? b : a), { date: '', count: 0 });

  return new Response(
    JSON.stringify({
      total,
      today: todayRes.count ?? 0,
      byDay,
      topPages,
      dailyAvg: byDay.length ? Math.round(total / byDay.length) : 0,
      peakDay,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
