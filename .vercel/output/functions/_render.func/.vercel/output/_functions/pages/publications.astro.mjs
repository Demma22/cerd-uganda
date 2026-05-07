/* empty css                                    */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_krYXjv10.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dz598ZJp.mjs';
import fs from 'fs';
import path from 'path';
/* empty css                                        */
export { renderers } from '../renderers.mjs';

const $$Publications = createComponent(($$result, $$props, $$slots) => {
  const documentsDir = path.join(process.cwd(), "public", "documents");
  let publications = [];
  try {
    if (fs.existsSync(documentsDir)) {
      const files = fs.readdirSync(documentsDir);
      publications = files.filter((file) => file.endsWith(".pdf")).map((file, index) => {
        const stats = fs.statSync(path.join(documentsDir, file));
        const title = file.replace(".pdf", "").replace(/-/g, " ");
        return {
          id: index,
          title,
          fileName: file,
          file: `/documents/${encodeURIComponent(file)}`,
          date: stats.mtime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          }),
          type: "Publication"
        };
      });
    }
  } catch (error) {
    console.error("Error loading publications:", error);
  }
  publications.sort((a, b) => new Date(b.date) - new Date(a.date));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Publications", "description": "Research papers, reports, and publications from CERD-UG", "data-astro-cid-f3fmnth3": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="publications-hero" data-astro-cid-f3fmnth3> <div class="container-site" data-astro-cid-f3fmnth3> <span class="section-label" data-astro-cid-f3fmnth3>Knowledge Hub</span> <h1 class="page-title" data-astro-cid-f3fmnth3>Publications & Research</h1> <p class="page-subtitle" data-astro-cid-f3fmnth3>Access our latest research papers, policy briefs, and technical reports on agroecology and sustainable agriculture.</p> </div> </section> <section class="publications-list" data-astro-cid-f3fmnth3> <div class="container-site" data-astro-cid-f3fmnth3> <!-- Search Bar --> <div class="search-container" data-astro-cid-f3fmnth3> <input type="text" id="searchInput" class="search-input" placeholder="Search publications by title..." data-astro-cid-f3fmnth3> </div> <div class="publications-grid" id="publicationsGrid" data-astro-cid-f3fmnth3> ${publications.map((pub) => renderTemplate`<div class="publication-card"${addAttribute(pub.title, "data-title")} data-astro-cid-f3fmnth3> <div class="pub-type" data-astro-cid-f3fmnth3>${pub.type}</div> <h3 class="pub-title" data-astro-cid-f3fmnth3>${pub.title}</h3> <div class="pub-footer" data-astro-cid-f3fmnth3> <time class="pub-date" data-astro-cid-f3fmnth3>${pub.date}</time> <a${addAttribute(pub.file, "href")} class="view-btn" target="_blank" rel="noopener noreferrer" data-astro-cid-f3fmnth3>View PDF</a> </div> </div>`)} ${publications.length === 0 && renderTemplate`<div class="empty-state" data-astro-cid-f3fmnth3> <p data-astro-cid-f3fmnth3>No publications uploaded yet.</p> <p class="empty-hint" data-astro-cid-f3fmnth3>Add PDF files to the <code data-astro-cid-f3fmnth3>public/documents/</code> folder.</p> </div>`} </div> </div> </section>   ` })}`;
}, "/Users/demma/cerd-uganda/src/pages/publications.astro", void 0);

const $$file = "/Users/demma/cerd-uganda/src/pages/publications.astro";
const $$url = "/publications";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Publications,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
