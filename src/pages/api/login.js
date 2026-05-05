export const prerender = false;

export async function POST({ request, cookies, redirect }) {
  const formData = await request.formData();
  const password = formData.get('password');
  
  // Change this to your desired password
  const ADMIN_PASSWORD = 'CERDadmin2025';
  
  if (password === ADMIN_PASSWORD) {
    cookies.set('admin_session', 'authenticated', {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 // 24 hours
    });
    return redirect('/admin/dashboard');
  }
  
  return redirect('/admin/login?error=1');
}