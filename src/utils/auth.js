// src/utils/auth.js
import crypto from 'node:crypto';

// A session is valid only if BOTH hold:
//  - it was last used within INACTIVITY_MS  (sliding "logged out after idle" window)
//  - it was first issued within ABSOLUTE_MAX_MS (hard ceiling, even for active users)
const INACTIVITY_MS   = 2 * 60 * 60 * 1000;      // 2 hours of inactivity
const ABSOLUTE_MAX_MS = 7 * 24 * 60 * 60 * 1000; // 7 days total lifetime

const COOKIE_OPTS = {
  path: '/',
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 7, // browser retention; server still enforces the windows above
};

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

// Token format: <issued-at-ms>.<last-activity-ms>.<hmac-sha256-hex>
function buildToken(issuedAt, lastActivity) {
  const payload = issuedAt + '.' + lastActivity;
  return payload + '.' + sign(payload);
}

export function createSessionToken() {
  const now = Date.now();
  return buildToken(now, now);
}

// Parse and fully validate a cookie value. Returns { issuedAt, lastActivity }
// when the token is genuine and within both windows, otherwise null.
function parseValid(value) {
  if (!value) return null;
  const parts = value.split('.');
  if (parts.length !== 3) return null; // rejects the old 2-part format

  const [issuedStr, lastStr, sig] = parts;
  if (!safeCompare(sig, sign(issuedStr + '.' + lastStr))) return null;

  const issuedAt = parseInt(issuedStr, 10);
  const lastActivity = parseInt(lastStr, 10);
  if (isNaN(issuedAt) || isNaN(lastActivity)) return null;

  const now = Date.now();
  const age = now - issuedAt;
  const idle = now - lastActivity;
  if (age < 0 || age > ABSOLUTE_MAX_MS) return null;   // absolute lifetime exceeded
  if (idle < 0 || idle > INACTIVITY_MS) return null;   // idle too long

  return { issuedAt, lastActivity };
}

export function checkAuth(cookies) {
  return parseValid(cookies.get('admin_session')?.value) !== null;
}

// Slide the inactivity window forward: if the session is still valid, re-issue
// the cookie with last-activity = now (keeping the original issued-at). Returns
// true if refreshed, false if the session was invalid/expired.
export function touchSession(cookies, isProd) {
  const parsed = parseValid(cookies.get('admin_session')?.value);
  if (!parsed) return false;
  cookies.set('admin_session', buildToken(parsed.issuedAt, Date.now()), {
    ...COOKIE_OPTS,
    secure: isProd,
  });
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
