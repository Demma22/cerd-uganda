/* empty css                                       */
import { c as createComponent, r as renderComponent, d as renderTemplate, f as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_krYXjv10.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dz598ZJp.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Admin Login", "data-astro-cid-rf56lckb": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="login-section" data-astro-cid-rf56lckb> <div class="container-site" data-astro-cid-rf56lckb> <div class="login-card" data-astro-cid-rf56lckb> <h1 data-astro-cid-rf56lckb>Admin Login</h1> <form method="POST" action="/api/login" data-astro-cid-rf56lckb> <div class="form-group" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Password</label> <input type="password" id="password" name="password" required data-astro-cid-rf56lckb> </div> <button type="submit" class="btn-primary" data-astro-cid-rf56lckb>Login</button> </form> ${Astro2.url.searchParams.has("error") && renderTemplate`<div class="error" data-astro-cid-rf56lckb>Invalid password</div>`} </div> </div> </section>  ` })}`;
}, "/Users/demma/cerd-uganda/src/pages/admin/login.astro", void 0);

const $$file = "/Users/demma/cerd-uganda/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
