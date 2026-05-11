export const prerender = false;

import { checkAuth } from '../../utils/auth.js';

export function GET({ cookies }) {
  const authenticated = checkAuth(cookies);
  return new Response(JSON.stringify({ authenticated }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    }
  });
}