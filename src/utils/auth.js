// src/utils/auth.js

export function checkAuth(cookies) {
  const session = cookies.get('admin_session');
  const loginTime = cookies.get('admin_login_time');
  
  if (!session || session.value !== 'authenticated') {
    return false;
  }
  
  // Check if session is older than 7 days
  if (loginTime) {
    const loginTimestamp = parseInt(loginTime.value);
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - loginTimestamp > sevenDaysInMs) {
      return false;
    }
  }
  
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