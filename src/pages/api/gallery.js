export const prerender = false;

import fs from 'fs';
import path from 'path';

const GALLERY_FILE = path.join(process.cwd(), 'src', 'data', 'gallery.json');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'gallery');
const dataDir = path.join(process.cwd(), 'src', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

if (!fs.existsSync(GALLERY_FILE)) {
  fs.writeFileSync(GALLERY_FILE, JSON.stringify([]));
}

function getGallery() {
  const data = fs.readFileSync(GALLERY_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveGallery(gallery) {
  fs.writeFileSync(GALLERY_FILE, JSON.stringify(gallery, null, 2));
}

async function saveImage(file) {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
  const fileName = `${timestamp}-${safeName}`;
  const filePath = path.join(IMAGES_DIR, fileName);
  
  const buffer = await file.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(buffer));
  
  return `/images/gallery/${fileName}`;
}

export async function GET() {
  const gallery = getGallery();
  return new Response(JSON.stringify(gallery), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const formData = await request.formData();
  const alt = formData.get('alt');
  const imageFile = formData.get('image');
  
  if (!imageFile || imageFile.size === 0) {
    return new Response(JSON.stringify({ error: 'Image required' }), { status: 400 });
  }
  
  const imageUrl = await saveImage(imageFile);
  const gallery = getGallery();
  const newImage = {
    id: Date.now(),
    image: imageUrl,
    alt: alt || 'Gallery image',
    order: gallery.length + 1
  };
  
  gallery.push(newImage);
  saveGallery(gallery);
  
  return new Response(JSON.stringify({ success: true, image: newImage }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT({ request }) {
  const formData = await request.formData();
  const id = parseInt(formData.get('id'));
  const alt = formData.get('alt');
  const order = parseInt(formData.get('order'));
  
  let gallery = getGallery();
  const imageIndex = gallery.findIndex(i => i.id === id);
  
  if (imageIndex === -1) {
    return new Response(JSON.stringify({ error: 'Image not found' }), { status: 404 });
  }
  
  gallery[imageIndex] = {
    ...gallery[imageIndex],
    alt,
    order
  };
  
  saveGallery(gallery);
  
  return new Response(JSON.stringify({ success: true, image: gallery[imageIndex] }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE({ url }) {
  const id = parseInt(url.searchParams.get('id'));
  let gallery = getGallery();
  const deletedImage = gallery.find(i => i.id === id);
  
  if (deletedImage && deletedImage.image) {
    const imagePath = path.join(process.cwd(), 'public', deletedImage.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }
  
  gallery = gallery.filter(i => i.id !== id);
  gallery = gallery.map((img, index) => ({ ...img, order: index + 1 }));
  saveGallery(gallery);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}