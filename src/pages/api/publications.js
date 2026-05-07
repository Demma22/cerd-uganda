export const prerender = false;

import fs from 'fs';
import path from 'path';

const DOCUMENTS_DIR = path.join(process.cwd(), 'public', 'documents');
const TITLES_FILE = path.join(process.cwd(), 'src', 'data', 'publication-titles.json');

// Ensure documents directory exists
if (!fs.existsSync(DOCUMENTS_DIR)) {
  fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
}

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load custom titles (fileName -> displayTitle)
function getTitles() {
  if (!fs.existsSync(TITLES_FILE)) return {};
  return JSON.parse(fs.readFileSync(TITLES_FILE, 'utf-8'));
}

function saveTitles(titles) {
  fs.writeFileSync(TITLES_FILE, JSON.stringify(titles, null, 2));
}

// Helper function to clean filename into a readable title
function cleanFileName(name) {
  let cleaned = name.replace(/^\d+-/, '');
  return cleaned.replace('.pdf', '').replace(/-/g, ' ');
}

// Get all publications from documents folder
function getPublications() {
  const files = fs.readdirSync(DOCUMENTS_DIR);
  const pdfFiles = files.filter(file => file.endsWith('.pdf'));
  const titles = getTitles();

  return pdfFiles.map((file, index) => {
    const stats = fs.statSync(path.join(DOCUMENTS_DIR, file));
    // Use custom title if set, otherwise derive from filename
    const displayTitle = titles[file] || cleanFileName(file);

    return {
      id: index,
      title: displayTitle,
      fileName: file,
      file: `/documents/${file}`,
      date: stats.mtime.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
  });
}

export async function GET() {
  const pubs = getPublications();
  return new Response(JSON.stringify(pubs), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || file.size === 0) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!file.name.endsWith('.pdf')) {
    return new Response(JSON.stringify({ error: 'Only PDF files are allowed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const cleanOriginal = file.name.replace('.pdf', '').replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
  const fileName = `${cleanOriginal}.pdf`;
  const filePath = path.join(DOCUMENTS_DIR, fileName);

  const buffer = await file.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(buffer));

  return new Response(JSON.stringify({ success: true, fileName: fileName }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PATCH({ request }) {
  const { fileName, title } = await request.json();

  if (!fileName || !title) {
    return new Response(JSON.stringify({ error: 'fileName and title are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const titles = getTitles();
  titles[fileName] = title.trim();
  saveTitles(titles);

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE({ url }) {
  const fileName = url.searchParams.get('fileName');

  if (!fileName) {
    return new Response(JSON.stringify({ error: 'No file name provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const filePath = path.join(DOCUMENTS_DIR, fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // Also remove custom title if it exists
  const titles = getTitles();
  if (titles[fileName]) {
    delete titles[fileName];
    saveTitles(titles);
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}