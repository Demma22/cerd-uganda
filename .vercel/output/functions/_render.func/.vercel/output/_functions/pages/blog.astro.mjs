/* empty css                                    */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_krYXjv10.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dz598ZJp.mjs';
import fs from 'fs';
import path from 'path';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  const BLOG_FILE = path.join(process.cwd(), "src", "data", "blogs.json");
  let blogs = [];
  if (fs.existsSync(BLOG_FILE)) {
    const data = fs.readFileSync(BLOG_FILE, "utf-8");
    blogs = JSON.parse(data);
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog", "description": "Latest news, updates, and stories from CERD-UG", "data-astro-cid-ijnerlr2": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="blog-hero" data-astro-cid-ijnerlr2> <div class="container-site" data-astro-cid-ijnerlr2> <span class="section-label" data-astro-cid-ijnerlr2>Latest Updates</span> <h1 class="page-title" data-astro-cid-ijnerlr2>Blog</h1> <p class="page-subtitle" data-astro-cid-ijnerlr2>News, stories, and updates from our work in agroecology and community development.</p> </div> </section> <section class="blog-list" data-astro-cid-ijnerlr2> <div class="container-site" data-astro-cid-ijnerlr2> <div class="blog-grid" data-astro-cid-ijnerlr2> ${blogs.map((blog) => renderTemplate`<a${addAttribute(`/blog/${blog.slug}`, "href")} class="blog-card" data-astro-cid-ijnerlr2> <div class="blog-image" data-astro-cid-ijnerlr2> <img${addAttribute(blog.image || "/images/home/veg.avif", "src")}${addAttribute(blog.title, "alt")} data-astro-cid-ijnerlr2> </div> <div class="blog-content" data-astro-cid-ijnerlr2> <time class="blog-date" data-astro-cid-ijnerlr2>${blog.date}</time> <h3 class="blog-title" data-astro-cid-ijnerlr2>${blog.title}</h3> <p class="blog-abstract" data-astro-cid-ijnerlr2>${blog.abstract}</p> <span class="read-more" data-astro-cid-ijnerlr2>Read Article →</span> </div> </a>`)} ${blogs.length === 0 && renderTemplate`<div class="empty-state" data-astro-cid-ijnerlr2> <p data-astro-cid-ijnerlr2>No blog posts yet. Check back soon for updates!</p> </div>`} </div> </div> </section>  ` })}`;
}, "/Users/demma/cerd-uganda/src/pages/blog.astro", void 0);

const $$file = "/Users/demma/cerd-uganda/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
