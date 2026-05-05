export const prerender = false;

import fs from 'fs';
import path from 'path';

const DOCUMENTS_DIR = path.join(process.cwd(), 'public', 'documents');

// Ensure documents directory exists
if (!fs.existsSync(DOCUMENTS_DIR)) {
  fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
}

// Helper function to clean filename
function cleanFileName(name) {
  // Remove timestamp prefix (numbers followed by dash)
  let cleaned = name.replace(/^\d+-/, '');
  // Remove .pdf extension for display
  return cleaned.replace('.pdf', '').replace(/-/g, ' ');
}

// Get all publications from documents folder
function getPublications() {
  const files = fs.readdirSync(DOCUMENTS_DIR);
  const pdfFiles = files.filter(file => file.endsWith('.pdf'));
  
  return pdfFiles.map((file, index) => {
    const stats = fs.statSync(path.join(DOCUMENTS_DIR, file));
    const displayTitle = cleanFileName(file);
    
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
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}