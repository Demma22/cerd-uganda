export const prerender = false;

export function GET({ cookies, redirect }) {
  // Clear all admin-related cookies
  cookies.delete('admin_session', { path: '/' });
  cookies.delete('admin_login_time', { path: '/' });
  
  // Create response with redirect
  const response = redirect('/admin/login');
  
  // Force no caching
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  return response;
}