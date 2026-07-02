// src/utils/auth.js
import crypto from 'node:crypto';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// HMAC key for signing session tokens. Uses SESSION_SECRET if set,
// otherwise derives one from ADMIN_PASSWORD so no extra config is needed.
function getSecret() {
  const secret = import.meta.env.SESSION_SECRET || import.meta.env.ADMIN_PASSWORD;
  if (!secret) throw new Error('SESSION_SECRET or ADMIN_PASSWORD must be set');
  return crypto.createHash('sha256').update('cerd-session:' + secret).digest();
}

function sign(payload) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
}

// Constant-time string comparison
export function safeCompare(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Token format: <issued-at-ms>.<hmac-sha256-hex>
export function createSessionToken() {
  const ts = Date.now().toString();
  return ts + '.' + sign(ts);
}

export function checkAuth(cookies) {
  const session = cookies.get('admin_session');
  if (!session || !session.value) return false;

  const dotIndex = session.value.indexOf('.');
  if (dotIndex === -1) return false;

  const ts = session.value.slice(0, dotIndex);
  const sig = session.value.slice(dotIndex + 1);
  if (!safeCompare(sig, sign(ts))) return false;

  const age = Date.now() - parseInt(ts, 10);
  if (isNaN(age) || age < 0 || age > SEVEN_DAYS_MS) return false;

  return true;
}

// Simple redirect function - no extra magic
export function requireAuth(cookies, redirect) {
  if (!checkAuth(cookies)) {
    cookies.delete('admin_session', { path: '/' });
    cookies.delete('admin_login_time', { path: '/' });
    return redirect('/admin/login');
  }
  return null;
}
