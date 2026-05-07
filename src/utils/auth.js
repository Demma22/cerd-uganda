export function checkAuth(cookies) {
  const session = cookies.get('admin_session');
  return session && session.value === 'authenticated';
}