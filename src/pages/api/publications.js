export const prerender = false;

// Simple file-based storage
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'publications.json');

function getPublications() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    return [];
  }
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function savePublications(pubs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(pubs, null, 2));
}

export async function GET() {
  const pubs = getPublications();
  return new Response(JSON.stringify(pubs), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const formData = await request.formData();
  const title = formData.get('title');
  const abstract = formData.get('abstract');
  const type = formData.get('type');
  const date = formData.get('date');
  const file = formData.get('file');
  
  // Save PDF file
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public', 'documents', fileName);
  const buffer = await file.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(buffer));
  
  const pubs = getPublications();
  const newPub = {
    id: Date.now(),
    title,
    abstract,
    type,
    date,
    file: `/documents/${fileName}`
  };
  
  pubs.push(newPub);
  savePublications(pubs);
  
  return new Response(JSON.stringify({ success: true, pub: newPub }), {
    headers: { 'Content-Type': 'application/json' }
  });
}