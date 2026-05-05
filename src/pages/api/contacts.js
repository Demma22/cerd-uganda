export const prerender = false;

import fs from 'fs';
import path from 'path';

const CONTENT_FILE = path.join(process.cwd(), 'src', 'data', 'content.json');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize content file if it doesn't exist
if (!fs.existsSync(CONTENT_FILE)) {
  const defaultContent = {
    homepage: {
      hero: {
        badge: "5+ years of impact",
        title: "Center for Ecosystems Research & Development",
        subtitle: "CERD-UG is a Non Profit Organization which aims to promote an ecosystems and systems thinking approach in research, education and community engagement."
      },
      mission: {
        title: "Our Mission & Goal",
        description: "The mission of CERD-UG is to provide all stakeholders with comprehensive and relevant knowledge and skills that contribute to the sustainability of the ecosystem, health, prosperity, food and nutritional security.",
        goal: "Our goal is to share our extensive experience in working with the agro-ecosystem to bring about development policy change, improve people's livelihoods, and contribute to achieving food and nutrition security, hence transforming the food system."
      }
    },
    about: {
      journey: "CERD-UG was legally registered in 2018 after the Agro-ecology project in collaboration with the Swedish University of Agricultural Sciences funded by Sida.",
      focus: "From 2020 to 2024, CERD-UG operated nationally in Uganda, focusing on environmental and natural resource management with the primary goal of ecosystem conservation.",
      mission: "CERD-UG aims to co-create an ecosystems and systems thinking approach in research, education and community engagement.",
      goal: "Our goal is to apply our extensive experience in working with the agro-ecosystem to bring about development policy change, improve people's livelihoods, and contribute to achieving food and nutrition security."
    },
    siteSettings: {
      siteName: "CERD-UG",
      footerText: "Center for Ecosystems Research and Development Uganda"
    }
  };
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2));
}

function getContent() {
  const data = fs.readFileSync(CONTENT_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveContent(content) {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
}

export async function GET() {
  const content = getContent();
  return new Response(JSON.stringify(content), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const { page, section, field, value } = await request.json();
  
  const content = getContent();
  
  if (!content[page]) content[page] = {};
  if (!content[page][section]) content[page][section] = {};
  
  content[page][section][field] = value;
  saveContent(content);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT({ request }) {
  const { page, section, data } = await request.json();
  
  const content = getContent();
  
  if (!content[page]) content[page] = {};
  content[page][section] = data;
  saveContent(content);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}