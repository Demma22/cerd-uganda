import { touchSession } from './utils/auth.js';

// On every request that carries an admin session cookie, slide the 2-hour
// inactivity window forward if the session is still valid, or clear the cookie
// if it has expired. This makes the session lapse after 2 hours of no requests,
// even within the 7-day absolute window — no matter how the admin returns
// (fresh tab, pasted link, reopened browser).
export function onRequest({ cookies }, next) {
  if (cookies.get('admin_session')) {
    const isProd = import.meta.env.PROD;
    if (!touchSession(cookies, isProd)) {
      cookies.delete('admin_session', { path: '/' });
      cookies.delete('admin_login_time', { path: '/' });
    }
  }
  return next();
}
