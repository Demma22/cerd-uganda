import { c as createComponent, m as maybeRenderHead, e as addAttribute, d as renderTemplate, f as createAstro, g as renderHead, r as renderComponent, h as renderSlot } from './astro/server_krYXjv10.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                            */

const $$Astro$1 = createAstro();
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Navbar;
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/publications", label: "Publications" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" }
  ];
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="navbar" id="navbar" data-astro-cid-5blmo7yk> <div class="container-site navbar-inner" data-astro-cid-5blmo7yk> <!-- Logo --> <a href="/" class="navbar-logo" data-astro-cid-5blmo7yk> <div class="logo-text" data-astro-cid-5blmo7yk> <span class="logo-name" data-astro-cid-5blmo7yk>CERD-UG</span> <span class="logo-sub" data-astro-cid-5blmo7yk>Center for Ecosystems Research</span> </div> </a> <!-- Desktop Nav --> <nav class="navbar-links" data-astro-cid-5blmo7yk> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(`nav-link ${currentPath === link.href || link.href !== "/" && currentPath.startsWith(link.href) ? "active" : ""}`, "class")} data-astro-cid-5blmo7yk> ${link.label} </a>`)} <a href="/contact" class="btn-primary nav-cta" data-astro-cid-5blmo7yk>Book a Call</a> </nav> <!-- Mobile Menu Button --> <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu" data-astro-cid-5blmo7yk> <span data-astro-cid-5blmo7yk></span> <span data-astro-cid-5blmo7yk></span> <span data-astro-cid-5blmo7yk></span> </button> </div> <!-- Mobile Nav --> <nav class="mobile-nav" id="mobileNav" data-astro-cid-5blmo7yk> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="mobile-nav-link" data-astro-cid-5blmo7yk>${link.label}</a>`)} <a href="/contact" class="btn-primary mobile-cta" data-astro-cid-5blmo7yk>Book a Call</a> </nav> </header>  `;
}, "/Users/demma/cerd-uganda/src/components/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="footer-top" data-astro-cid-sz7xmlte> <div class="container-site footer-grid" data-astro-cid-sz7xmlte> <!-- Brand --> <div class="footer-brand" data-astro-cid-sz7xmlte> <a href="/" class="footer-logo" data-astro-cid-sz7xmlte> <span class="footer-logo-name" data-astro-cid-sz7xmlte>CERD-UG</span> </a> <p class="footer-tagline" data-astro-cid-sz7xmlte>
Center for Ecosystems Research and Development — promoting sustainable agroecology in Uganda and the African region.
</p> <p class="footer-address" data-astro-cid-sz7xmlte>
P.O BOX 701229<br data-astro-cid-sz7xmlte>
Mpala, Entebbe Road<br data-astro-cid-sz7xmlte>
Entebbe, Uganda
</p> </div> <!-- Pages --> <div class="footer-col" data-astro-cid-sz7xmlte> <h4 class="footer-col-title" data-astro-cid-sz7xmlte>Pages</h4> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/" data-astro-cid-sz7xmlte>Home</a></li> <li data-astro-cid-sz7xmlte><a href="/about-us" data-astro-cid-sz7xmlte>About Us</a></li> <li data-astro-cid-sz7xmlte><a href="/publications" data-astro-cid-sz7xmlte>Publications</a></li> <li data-astro-cid-sz7xmlte><a href="/contact" data-astro-cid-sz7xmlte>Contact</a></li> </ul> </div> <!-- Other Pages --> <div class="footer-col" data-astro-cid-sz7xmlte> <h4 class="footer-col-title" data-astro-cid-sz7xmlte>Other Pages</h4> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/publications" data-astro-cid-sz7xmlte>Blog</a></li> </ul> </div> <!-- Contact --> <div class="footer-col" data-astro-cid-sz7xmlte> <h4 class="footer-col-title" data-astro-cid-sz7xmlte>Get In Touch</h4> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="tel:+256702616988" data-astro-cid-sz7xmlte>+256 702 616988</a></li> <li data-astro-cid-sz7xmlte><a href="tel:+256782634937" data-astro-cid-sz7xmlte>+256 782 634937</a></li> </ul> <p class="footer-hours" data-astro-cid-sz7xmlte>Mon – Fri, 9am – 5pm</p> </div> </div> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <div class="container-site footer-bottom-inner" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} CERD-UG. All rights reserved.</p> <p data-astro-cid-sz7xmlte>Center for Ecosystems Research and Development</p> </div> </div> </footer> `;
}, "/Users/demma/cerd-uganda/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description = "CERD-UG is a Non Profit Organization which aims to promote an ecosystems and systems thinking approach in research, education and community engagement in Uganda.",
    image = "/og-image.jpg"
  } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(image, "content")}><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><link rel="canonical"${addAttribute(canonicalURL, "href")}><link rel="icon" type="image/png" href="/logo/cerd.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet"><title>${title} | CERD-UG</title>${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, { "logo": "/logo/cerd.png" })} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "logo": "/logo/cerd.png" })} </body></html>`;
}, "/Users/demma/cerd-uganda/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
