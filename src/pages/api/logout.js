export function GET({ cookies, redirect }) {
  cookies.delete('admin_session', { path: '/' });
  return redirect('/admin/login');
}