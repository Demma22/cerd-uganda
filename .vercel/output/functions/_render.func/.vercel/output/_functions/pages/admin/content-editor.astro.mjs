/* empty css                                       */
import { c as createComponent, r as renderComponent, d as renderTemplate, f as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_krYXjv10.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dz598ZJp.mjs';
/* empty css                                             */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$ContentEditor = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContentEditor;
  const session = Astro2.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Content Editor", "data-astro-cid-cajmp5xk": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="editor-container" data-astro-cid-cajmp5xk> <aside class="editor-sidebar" data-astro-cid-cajmp5xk> <h2 data-astro-cid-cajmp5xk>Content Editor</h2> <nav data-astro-cid-cajmp5xk> <button class="page-btn active" data-page="homepage" data-astro-cid-cajmp5xk>Homepage</button> <button class="page-btn" data-page="about" data-astro-cid-cajmp5xk>About Us</button> <button class="page-btn" data-page="contact" data-astro-cid-cajmp5xk>Contact</button> <button class="page-btn" data-page="siteSettings" data-astro-cid-cajmp5xk>Site Settings</button> </nav> <a href="/admin/dashboard" class="back-link" data-astro-cid-cajmp5xk>← Back to Dashboard</a> </aside> <main class="editor-main" data-astro-cid-cajmp5xk> <div id="editorContent" data-astro-cid-cajmp5xk> <p data-astro-cid-cajmp5xk>Loading content...</p> </div> </main> </div>   ` })}`;
}, "/Users/demma/cerd-uganda/src/pages/admin/content-editor.astro", void 0);

const $$file = "/Users/demma/cerd-uganda/src/pages/admin/content-editor.astro";
const $$url = "/admin/content-editor";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ContentEditor,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
