export { renderers } from '../../renderers.mjs';

function GET({ cookies, redirect }) {
  cookies.delete('admin_session', { path: '/' });
  return redirect('/admin/login');
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
