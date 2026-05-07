/* empty css                                       */
import { c as createComponent, r as renderComponent, d as renderTemplate, f as createAstro, m as maybeRenderHead, e as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_krYXjv10.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dz598ZJp.mjs';
import fs from 'fs';
import path from 'path';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const BLOG_FILE = path.join(process.cwd(), "src", "data", "blogs.json");
  let blog = null;
  if (fs.existsSync(BLOG_FILE)) {
    const data = fs.readFileSync(BLOG_FILE, "utf-8");
    const blogs = JSON.parse(data);
    blog = blogs.find((b) => b.slug === slug);
  }
  if (!blog) {
    return Astro2.redirect("/blog");
  }
  function formatContent(content) {
    if (!content) return "";
    let formatted = content;
    const paragraphs = formatted.split(/\n\s*\n/);
    return paragraphs.map((paragraph) => {
      let p = paragraph.trim();
      if (p.length === 0) return "";
      p = p.replace(/\n/g, "<br />");
      return `<p>${p}</p>`;
    }).filter((p) => p.length > 0).join("");
  }
  function formatAbstract(abstract) {
    if (!abstract) return "";
    return abstract.replace(/\n/g, " ");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": blog.title, "description": blog.abstract, "data-astro-cid-4sn4zg3r": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="blog-post" data-astro-cid-4sn4zg3r> <div class="container-site" data-astro-cid-4sn4zg3r> <div class="blog-header" data-astro-cid-4sn4zg3r> <span class="section-label" data-astro-cid-4sn4zg3r>Blog Post</span> <h1 class="blog-title" data-astro-cid-4sn4zg3r>${blog.title}</h1> <time class="blog-date" data-astro-cid-4sn4zg3r>${blog.date}</time> </div> ${blog.image && renderTemplate`<div class="blog-featured-image" data-astro-cid-4sn4zg3r> <img${addAttribute(blog.image, "src")}${addAttribute(blog.title, "alt")} data-astro-cid-4sn4zg3r> </div>`} <div class="blog-content" data-astro-cid-4sn4zg3r> <div class="blog-abstract" data-astro-cid-4sn4zg3r> <p data-astro-cid-4sn4zg3r>${formatAbstract(blog.abstract)}</p> </div> <div class="blog-body" data-astro-cid-4sn4zg3r>${unescapeHTML(formatContent(blog.content))}</div> </div> <div class="blog-back" data-astro-cid-4sn4zg3r> <a href="/blog" class="btn-outline" data-astro-cid-4sn4zg3r>← Back to Blog</a> </div> </div> </article>  ` })}`;
}, "/Users/demma/cerd-uganda/src/pages/blog/[slug].astro", void 0);

const $$file = "/Users/demma/cerd-uganda/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
