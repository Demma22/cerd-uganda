export const prerender = false;

export function GET({ redirect }) {
  return redirect('/admin/login');
}

export function POST({ redirect }) {
  return redirect('/admin/login');
}
