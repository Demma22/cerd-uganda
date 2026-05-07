export const prerender = false;

import fs from 'fs';
import path from 'path';

const DOCUMENTS_DIR = path.join(process.cwd(), 'public', 'documents');
const METADATA_FILE = path.join(DOCUMENTS_DIR, 'publications-metadata.json');

// Ensure documents directory exists
if (!fs.existsSync(DOCUMENTS_DIR)) {
  fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
}

// Initialize metadata file if it doesn't exist
if (!fs.existsSync(METADATA_FILE)) {
  fs.writeFileSync(METADATA_FILE, JSON.stringify({}));
}

// Helper function to clean filename for display (fallback)
function cleanFileName(name) {
  let cleaned = name.replace(/^\d+-/, '');
  return cleaned.replace('.pdf', '').replace(/-/g, ' ');
}

// Get metadata
function getMetadata() {
  const data = fs.readFileSync(METADATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// Save metadata
function saveMetadata(metadata) {
  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
}

// Get all publications from documents folder with metadata
function getPublications() {
  const files = fs.readdirSync(DOCUMENTS_DIR);
  const pdfFiles = files.filter(file => file.endsWith('.pdf'));
  const metadata = getMetadata();
  
  return pdfFiles.map((file, index) => {
    const stats = fs.statSync(path.join(DOCUMENTS_DIR, file));
    const baseName = file.replace('.pdf', '');
    const meta = metadata[baseName] || {};
    
    return {
      id: index,
      title: meta.title || cleanFileName(file),
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
  
  // Check if file is PDF
  if (!file.name.endsWith('.pdf')) {
    return new Response(JSON.stringify({ error: 'Only PDF files are allowed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Clean the original filename (remove special chars, spaces become dashes)
  const cleanOriginal = file.name.replace('.pdf', '').replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
  const fileName = `${cleanOriginal}.pdf`;
  const filePath = path.join(DOCUMENTS_DIR, fileName);
  
  // Save PDF file
  const buffer = await file.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(buffer));
  
  return new Response(JSON.stringify({ success: true, fileName: fileName }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// UPDATE publication title (and other metadata)
export async function PUT({ request }) {
  const formData = await request.formData();
  const fileName = formData.get('fileName');
  const title = formData.get('title');
  
  if (!fileName) {
    return new Response(JSON.stringify({ error: 'No file name provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const metadata = getMetadata();
  const baseName = fileName.replace('.pdf', '');
  
  if (!metadata[baseName]) {
    metadata[baseName] = {};
  }
  
  if (title) {
    metadata[baseName].title = title;
  }
  
  saveMetadata(metadata);
  
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
  
  // Delete metadata entry
  const metadata = getMetadata();
  const baseName = fileName.replace('.pdf', '');
  delete metadata[baseName];
  saveMetadata(metadata);
  
  // Delete the PDF file
  const filePath = path.join(DOCUMENTS_DIR, fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}