export const prerender = false;

import fs from 'fs';
import path from 'path';

const CONTENT_FILE = path.join(process.cwd(), 'src', 'data', 'content.json');
const dataDir = path.join(process.cwd(), 'src', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(CONTENT_FILE)) {
  const defaultContent = {
    homepage: {
      hero: { badge: "5+ years of impact", title: "Center for Ecosystems Research & Development", subtitle: "CERD-UG is a Non Profit Organization which aims to promote an ecosystems and systems thinking approach..." },
      mission: { title: "Building a Sustainable Agro-Ecosystem", description: "", goal: "" },
      vision: { quote: "A sustainable agro-ecosystem in which every aspect of development is in harmony and complements each other." },
      impact: { title: "Changing lives together through sustainable farming", description: "", vision: "" },
      principles: { title: "What We Stand For", items: [] },
      producers: { title: "We Are Producers For Local Markets", description: "", image: "" },
      recentWorks: { title: "Our Recent Works", subtitle: "" },
      bottomCta: { text: "", buttonText: "Contact Us", buttonLink: "/contact" }
    },
    about: {
      hero: { title: "How our Journey Began", description: "" },
      focus: { title: "", description: "", highlight: "" },
      stats: [],
      mission: { quote: "", goal: "" },
      programs: [],
      gallery: { title: "Conferences & Community Engagement", images: [] },
      bottomCta: { text: "", buttonText: "Work With Us", buttonLink: "/contact" }
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
  const { page, section, field, value, index } = await request.json();
  
  const content = getContent();
  
  if (index !== undefined && content[page] && content[page][section] && Array.isArray(content[page][section])) {
    content[page][section][index][field] = value;
  } else {
    if (!content[page]) content[page] = {};
    if (!content[page][section]) content[page][section] = {};
    content[page][section][field] = value;
  }
  
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