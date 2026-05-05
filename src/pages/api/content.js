export const prerender = false;

import fs from 'fs';
import path from 'path';

const CONTENT_FILE = path.join(process.cwd(), 'src/data/content.json');

// Read content from file
function getContent() {
  try {
    const data = fs.readFileSync(CONTENT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading content file:', error);
    return {};
  }
}

// Save content to file
function saveContent(content) {
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving content:', error);
    return false;
  }
}

// GET: Fetch all content
export async function GET() {
  const content = getContent();
  return new Response(JSON.stringify(content), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// POST: Update specific content
export async function POST({ request }) {
  const { page, section, field, value } = await request.json();
  
  const content = getContent();
  
  // Navigate to the correct field
  if (!content[page]) content[page] = {};
  if (!content[page][section]) content[page][section] = {};
  
  content[page][section][field] = value;
  
  const saved = saveContent(content);
  
  if (saved) {
    return new Response(JSON.stringify({ success: true, content: content[page][section] }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ success: false, error: 'Failed to save' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// PUT: Update entire section
export async function PUT({ request }) {
  const { page, section, data } = await request.json();
  
  const content = getContent();
  
  if (!content[page]) content[page] = {};
  content[page][section] = data;
  
  const saved = saveContent(content);
  
  if (saved) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}