/* empty css                                    */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_krYXjv10.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dz598ZJp.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Contact Us | CERD-UG", "data-astro-cid-uw5kdbxl": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="contact-page" data-astro-cid-uw5kdbxl> <!-- Hero Section --> <div class="contact-hero" data-astro-cid-uw5kdbxl> <div class="container-site" data-astro-cid-uw5kdbxl> <h1 data-astro-cid-uw5kdbxl>Get in Touch</h1> <p data-astro-cid-uw5kdbxl>Have questions about our work or want to partner with us? We'd love to hear from you.</p> </div> </div> <!-- Contact Content --> <div class="contact-content container-site" data-astro-cid-uw5kdbxl> <!-- Left Column: Contact Info --> <div class="contact-info" data-astro-cid-uw5kdbxl> <h2 data-astro-cid-uw5kdbxl>Contact Information</h2> <p data-astro-cid-uw5kdbxl>Reach out to us through any of these channels. Our team typically responds within 48 hours.</p> <div class="contact-details" data-astro-cid-uw5kdbxl> <div class="contact-item" data-astro-cid-uw5kdbxl> <div class="contact-icon" data-astro-cid-uw5kdbxl> <div class="icon-placeholder phone-icon" data-astro-cid-uw5kdbxl></div> </div> <div data-astro-cid-uw5kdbxl> <h3 data-astro-cid-uw5kdbxl>Phone (Primary)</h3> <a href="tel:+256702616988" data-astro-cid-uw5kdbxl>+256 702 616988</a> </div> </div> <div class="contact-item" data-astro-cid-uw5kdbxl> <div class="contact-icon" data-astro-cid-uw5kdbxl> <div class="icon-placeholder phone-icon" data-astro-cid-uw5kdbxl></div> </div> <div data-astro-cid-uw5kdbxl> <h3 data-astro-cid-uw5kdbxl>Phone (Secondary)</h3> <a href="tel:+256782634937" data-astro-cid-uw5kdbxl>+256 782 634937</a> </div> </div> <div class="contact-item" data-astro-cid-uw5kdbxl> <div class="contact-icon" data-astro-cid-uw5kdbxl> <div class="icon-placeholder email-icon" data-astro-cid-uw5kdbxl></div> </div> <div data-astro-cid-uw5kdbxl> <h3 data-astro-cid-uw5kdbxl>Email</h3> <a href="mailto:info@cerd-uganda.org" data-astro-cid-uw5kdbxl>info@cerd-uganda.org</a> </div> </div> <div class="contact-item" data-astro-cid-uw5kdbxl> <div class="contact-icon" data-astro-cid-uw5kdbxl> <div class="icon-placeholder location-icon" data-astro-cid-uw5kdbxl></div> </div> <div data-astro-cid-uw5kdbxl> <h3 data-astro-cid-uw5kdbxl>Location</h3> <p data-astro-cid-uw5kdbxl>Mpala, Entebbe Road, Kampala, Uganda</p> </div> </div> </div> </div> <!-- Right Column: Contact Form --> <div class="contact-form-wrapper" data-astro-cid-uw5kdbxl> <h2 data-astro-cid-uw5kdbxl>Send us a Message</h2> <div id="formMessage" class="form-message" data-astro-cid-uw5kdbxl></div> <form id="contactForm" data-astro-cid-uw5kdbxl> <div class="form-group" data-astro-cid-uw5kdbxl> <label for="name" data-astro-cid-uw5kdbxl>Full Name</label> <input type="text" id="name" name="name" required placeholder="Your full name" data-astro-cid-uw5kdbxl> </div> <div class="form-group" data-astro-cid-uw5kdbxl> <label for="email" data-astro-cid-uw5kdbxl>Email Address</label> <input type="email" id="email" name="email" required placeholder="your@email.com" data-astro-cid-uw5kdbxl> </div> <div class="form-group" data-astro-cid-uw5kdbxl> <label for="phone" data-astro-cid-uw5kdbxl>Phone Number</label> <input type="tel" id="phone" name="phone" placeholder="Optional" data-astro-cid-uw5kdbxl> </div> <div class="form-group" data-astro-cid-uw5kdbxl> <label for="message" data-astro-cid-uw5kdbxl>Message</label> <textarea id="message" name="message" required placeholder="How can we help you?" data-astro-cid-uw5kdbxl></textarea> </div> <button type="submit" class="submit-btn" data-astro-cid-uw5kdbxl>Send Message</button> </form> </div> </div> </div>   ` })}`;
}, "/Users/demma/cerd-uganda/src/pages/contact.astro", void 0);

const $$file = "/Users/demma/cerd-uganda/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
