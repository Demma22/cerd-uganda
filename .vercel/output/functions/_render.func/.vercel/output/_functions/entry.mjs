import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_C4zWRduM.mjs';
import { manifest } from './manifest_Bv4-I0uZ.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about-us.astro.mjs');
const _page2 = () => import('./pages/admin/content-editor.astro.mjs');
const _page3 = () => import('./pages/admin/dashboard.astro.mjs');
const _page4 = () => import('./pages/admin/login.astro.mjs');
const _page5 = () => import('./pages/admin/pagecontenteditor.astro.mjs');
const _page6 = () => import('./pages/api/blogs.astro.mjs');
const _page7 = () => import('./pages/api/contact.astro.mjs');
const _page8 = () => import('./pages/api/contacts.astro.mjs');
const _page9 = () => import('./pages/api/content.astro.mjs');
const _page10 = () => import('./pages/api/gallery.astro.mjs');
const _page11 = () => import('./pages/api/login.astro.mjs');
const _page12 = () => import('./pages/api/logout.astro.mjs');
const _page13 = () => import('./pages/api/publications.astro.mjs');
const _page14 = () => import('./pages/api/team.astro.mjs');
const _page15 = () => import('./pages/blog/_slug_.astro.mjs');
const _page16 = () => import('./pages/blog.astro.mjs');
const _page17 = () => import('./pages/contact.astro.mjs');
const _page18 = () => import('./pages/publications.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about-us.astro", _page1],
    ["src/pages/admin/content-editor.astro", _page2],
    ["src/pages/admin/dashboard.astro", _page3],
    ["src/pages/admin/login.astro", _page4],
    ["src/pages/admin/PageContentEditor.astro", _page5],
    ["src/pages/api/blogs.js", _page6],
    ["src/pages/api/contact.js", _page7],
    ["src/pages/api/contacts.js", _page8],
    ["src/pages/api/content.js", _page9],
    ["src/pages/api/gallery.js", _page10],
    ["src/pages/api/login.js", _page11],
    ["src/pages/api/logout.js", _page12],
    ["src/pages/api/publications.js", _page13],
    ["src/pages/api/team.js", _page14],
    ["src/pages/blog/[slug].astro", _page15],
    ["src/pages/blog.astro", _page16],
    ["src/pages/contact.astro", _page17],
    ["src/pages/publications.astro", _page18],
    ["src/pages/index.astro", _page19]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "eaf9280e-ba5f-4135-b633-99f924f5c767",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
