/* empty css                                    */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, F as Fragment, e as addAttribute } from '../chunks/astro/server_krYXjv10.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Dz598ZJp.mjs';
import fs from 'fs';
import path from 'path';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$AboutUs = createComponent(($$result, $$props, $$slots) => {
  const CONTENT_FILE = path.join(process.cwd(), "src", "data", "content.json");
  let content = { about: {} };
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const data = fs.readFileSync(CONTENT_FILE, "utf-8");
      content = JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading content:", error);
  }
  const TEAM_FILE = path.join(process.cwd(), "src", "data", "team.json");
  let teamMembers = [];
  try {
    if (fs.existsSync(TEAM_FILE)) {
      const data = fs.readFileSync(TEAM_FILE, "utf-8");
      teamMembers = JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading team:", error);
  }
  const about = content.about || {};
  const journey = about.journey || {};
  const focusData = about.focus || {};
  const missionQuote = about.mission || {};
  const programs = about.programs || [];
  const bottomCta = about.bottomCta || {};
  const stats = about.stats || [];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "About Us", "description": "CERD-UG legally registered in 2018, focusing on ecosystem conservation, agroecology, and community engagement in Uganda.", "data-astro-cid-gkq7oefr": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="about-hero" data-astro-cid-gkq7oefr> <div class="container-site" data-astro-cid-gkq7oefr> <span class="section-label" data-astro-cid-gkq7oefr>Our story</span> <h1 class="about-title" data-astro-cid-gkq7oefr>${journey.title || "How our Journey Began"}</h1> <p class="about-intro" data-astro-cid-gkq7oefr> ${journey.description || "CERD-UG was legally registered in 2018 after the Agro-ecology project in collaboration with the Swedish University of Agricultural Sciences funded by Sida."} </p> </div> </section>  <section class="focus" data-astro-cid-gkq7oefr> <div class="container-site" data-astro-cid-gkq7oefr> <div class="focus-text" data-astro-cid-gkq7oefr> <span class="section-label" data-astro-cid-gkq7oefr>Our Current Focus</span> <h2 data-astro-cid-gkq7oefr>${focusData.title || "From 2020 to 2024, CERD-UG operated nationally in Uganda"}</h2> <p data-astro-cid-gkq7oefr> ${focusData.description || "Focusing on environmental and natural resource management with the primary goal of ecosystem conservation. The organization carried out several activities promoting sustainable practices and community involvement, aiming to align environmental health with community well-being."} </p> <p class="focus-highlight" data-astro-cid-gkq7oefr> ${focusData.highlight || "These efforts led to notable achievements in conservation and local development."} </p> </div> </div> </section>  <section class="stats-banner" data-astro-cid-gkq7oefr> <div class="container-site stats-container" data-astro-cid-gkq7oefr> ${stats.length > 0 ? stats.map((stat) => renderTemplate`<div class="stat-item" data-astro-cid-gkq7oefr> <span class="stat-number-large" data-astro-cid-gkq7oefr>${stat.number}</span> <span class="stat-label-large" data-astro-cid-gkq7oefr>${stat.label}</span> </div>`).join("") : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-gkq7oefr": true }, { "default": ($$result3) => renderTemplate` <div class="stat-item" data-astro-cid-gkq7oefr> <span class="stat-number-large" data-astro-cid-gkq7oefr>6</span> <span class="stat-label-large" data-astro-cid-gkq7oefr>Years in Business</span> </div> <div class="stat-divider" data-astro-cid-gkq7oefr></div> <div class="stat-item" data-astro-cid-gkq7oefr> <span class="stat-number-large" data-astro-cid-gkq7oefr>6 yrs</span> <span class="stat-label-large" data-astro-cid-gkq7oefr>of Impact & Influence</span> </div> ` })}`} </div> </section>  <section class="vision-banner" data-astro-cid-gkq7oefr> <div class="vision-overlay" data-astro-cid-gkq7oefr></div> <div class="container-site vision-card" data-astro-cid-gkq7oefr> <p class="vision-quote" data-astro-cid-gkq7oefr> ${missionQuote.quote || "CERD-UG aims to co-create an ecosystems and systems thinking approach in research, education and community engagement."} </p> <p class="vision-goal" data-astro-cid-gkq7oefr> ${missionQuote.goal || "Our goal is to apply our extensive experience in working with the agro-ecosystem to bring about development policy change, improve people's livelihoods, and contribute to achieving food and nutrition security."} </p> </div> </section>  <section class="team" data-astro-cid-gkq7oefr> <div class="container-site" data-astro-cid-gkq7oefr> <div class="team-header" data-astro-cid-gkq7oefr> <span class="section-label" data-astro-cid-gkq7oefr>Meet the team</span> <h2 data-astro-cid-gkq7oefr>Leadership & Expertise</h2> <p data-astro-cid-gkq7oefr>
Graduates and students of Agro-ecology can find a practical home at CERD-UG.
          Our team brings decades of experience in ecosystem research, policy, and community development.
</p> </div> <div class="team-grid" data-astro-cid-gkq7oefr> ${teamMembers.length > 0 ? teamMembers.map((member) => renderTemplate`<div class="team-card" data-astro-cid-gkq7oefr> <img${addAttribute(member.image || "/images/about/placeholder.avif", "src")}${addAttribute(member.name, "alt")} data-astro-cid-gkq7oefr> <div class="team-info" data-astro-cid-gkq7oefr> <h3 data-astro-cid-gkq7oefr>${member.name}</h3> <p class="team-role" data-astro-cid-gkq7oefr>${member.role}</p> <p class="team-bio" data-astro-cid-gkq7oefr>${member.bio}</p> </div> </div>`) : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-gkq7oefr": true }, { "default": ($$result3) => renderTemplate` <div class="team-card" data-astro-cid-gkq7oefr> <img src="/images/about/profCharles.jpeg" alt="Prof. Charles Ssekyewa" data-astro-cid-gkq7oefr> <div class="team-info" data-astro-cid-gkq7oefr> <h3 data-astro-cid-gkq7oefr>Prof. Charles Ssekyewa</h3> <p class="team-role" data-astro-cid-gkq7oefr>Research Director</p> <p class="team-bio" data-astro-cid-gkq7oefr>Specialist in sustainable agriculture and farmer-led research methodologies.</p> </div> </div> <div class="team-card" data-astro-cid-gkq7oefr> <img src="/images/about/DrStella.jpeg" alt="Dr. Stella" data-astro-cid-gkq7oefr> <div class="team-info" data-astro-cid-gkq7oefr> <h3 data-astro-cid-gkq7oefr>Dr. Stella</h3> <p class="team-role" data-astro-cid-gkq7oefr>Programs Director</p> <p class="team-bio" data-astro-cid-gkq7oefr>Leading community engagement and farmer training initiatives.</p> </div> </div> <div class="team-card" data-astro-cid-gkq7oefr> <img src="/images/about/MsConnie.avif" alt="Ms. Connie" data-astro-cid-gkq7oefr> <div class="team-info" data-astro-cid-gkq7oefr> <h3 data-astro-cid-gkq7oefr>Ms. Connie</h3> <p class="team-role" data-astro-cid-gkq7oefr>Communications Lead</p> <p class="team-bio" data-astro-cid-gkq7oefr>Manages outreach, publications, and stakeholder engagement.</p> </div> </div> <div class="team-card" data-astro-cid-gkq7oefr> <img src="/images/about/DrFred.avif" alt="Dr. Fred" data-astro-cid-gkq7oefr> <div class="team-info" data-astro-cid-gkq7oefr> <h3 data-astro-cid-gkq7oefr>Dr. Fred</h3> <p class="team-role" data-astro-cid-gkq7oefr>Senior Researcher</p> <p class="team-bio" data-astro-cid-gkq7oefr>Expert in ecosystem conservation and environmental policy.</p> </div> </div> ` })}`} </div> </div> </section>  <section class="programs" data-astro-cid-gkq7oefr> <div class="container-site" data-astro-cid-gkq7oefr> <div class="programs-grid" data-astro-cid-gkq7oefr> ${programs.length > 0 ? programs.map((program) => renderTemplate`<div class="program-card" data-astro-cid-gkq7oefr> <div class="program-img" data-astro-cid-gkq7oefr> <img${addAttribute(program.image, "src")}${addAttribute(program.title, "alt")} data-astro-cid-gkq7oefr> </div> <div class="program-content" data-astro-cid-gkq7oefr> <h3 data-astro-cid-gkq7oefr>${program.title}</h3> <p data-astro-cid-gkq7oefr>${program.description}</p> </div> </div>`) : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-gkq7oefr": true }, { "default": ($$result3) => renderTemplate` <div class="program-card school" data-astro-cid-gkq7oefr> <div class="program-img" data-astro-cid-gkq7oefr> <img src="/images/about/InvolveChildren.jpg" alt="School children in agroecological farming" data-astro-cid-gkq7oefr> </div> <div class="program-content" data-astro-cid-gkq7oefr> <h3 data-astro-cid-gkq7oefr>School Children & Youth</h3> <p data-astro-cid-gkq7oefr>
We involve school children in Agroecological farming and understanding their environment.
                  Young school children are taught to appreciate and respect nature, knowing that every component
                  of the ecosystem affects and benefits the other for overall sustainability.
</p> </div> </div> <div class="program-card policy" data-astro-cid-gkq7oefr> <div class="program-img" data-astro-cid-gkq7oefr> <img src="/images/about/conference1.avif" alt="Policy and systems thinking" data-astro-cid-gkq7oefr> </div> <div class="program-content" data-astro-cid-gkq7oefr> <h3 data-astro-cid-gkq7oefr>Policy & Systems Thinking</h3> <p data-astro-cid-gkq7oefr>
CERD-UG influences policymakers to engage in participatory and systems thinking approaches
                  in development planning and management. We offer sustainable development values to communities
                  in Uganda and the African Region, especially women and youth.
</p> </div> </div> ` })}`} </div> </div> </section>  <section class="gallery" data-astro-cid-gkq7oefr> <div class="container-site" data-astro-cid-gkq7oefr> <span class="section-label" data-astro-cid-gkq7oefr>Our Activities</span> <h2 data-astro-cid-gkq7oefr>Conferences & Community Engagement</h2> <div class="gallery-grid" data-astro-cid-gkq7oefr> <div class="gallery-item gallery-item-1" data-astro-cid-gkq7oefr> <img src="/images/about/conf2.avif" alt="Conference presentation" data-astro-cid-gkq7oefr> </div> <div class="gallery-item gallery-item-2" data-astro-cid-gkq7oefr> <img src="/images/about/conf3.avif" alt="Community gathering" data-astro-cid-gkq7oefr> </div> <div class="gallery-item gallery-item-3" data-astro-cid-gkq7oefr> <img src="/images/about/children1.avif" alt="Children learning" data-astro-cid-gkq7oefr> </div> <div class="gallery-item gallery-item-4" data-astro-cid-gkq7oefr> <img src="/images/about/speech.avif" alt="Keynote speech" data-astro-cid-gkq7oefr> </div> <div class="gallery-item gallery-item-5" data-astro-cid-gkq7oefr> <img src="/images/about/Children2.jpeg" alt="School children activity" data-astro-cid-gkq7oefr> </div> <div class="gallery-item gallery-item-6" data-astro-cid-gkq7oefr> <img src="/images/about/conference1.avif" alt="International conference" data-astro-cid-gkq7oefr> </div> </div> </div> </section>  <section class="bottom-cta" data-astro-cid-gkq7oefr> <div class="container-site" data-astro-cid-gkq7oefr> <div class="cta-card" data-astro-cid-gkq7oefr> <p class="cta-text" data-astro-cid-gkq7oefr> ${bottomCta.text || "Our goal is to apply our extensive experience in working with the agro-ecosystem to bring about development policy change, improve people's livelihoods, and contribute to achieving food and nutrition security."} </p> <a${addAttribute(bottomCta.buttonLink || "/contact", "href")} class="btn-outline" data-astro-cid-gkq7oefr>${bottomCta.buttonText || "Work With Us"}</a> </div> </div> </section>  ` })}`;
}, "/Users/demma/cerd-uganda/src/pages/about-us.astro", void 0);

const $$file = "/Users/demma/cerd-uganda/src/pages/about-us.astro";
const $$url = "/about-us";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AboutUs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
