export const prerender = false;

import fs from 'fs';
import path from 'path';

const BLOG_FILE = path.join(process.cwd(), 'src', 'data', 'blogs.json');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'blog');
const dataDir = path.join(process.cwd(), 'src', 'data');

// Ensure directories exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

if (!fs.existsSync(BLOG_FILE)) {
  fs.writeFileSync(BLOG_FILE, JSON.stringify([]));
}

function getBlogs() {
  const data = fs.readFileSync(BLOG_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveBlogs(blogs) {
  fs.writeFileSync(BLOG_FILE, JSON.stringify(blogs, null, 2));
}

async function saveImage(file) {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
  const fileName = `${timestamp}-${safeName}`;
  const filePath = path.join(IMAGES_DIR, fileName);
  
  const buffer = await file.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(buffer));
  
  return `/images/blog/${fileName}`;
}

export async function GET() {
  const blogs = getBlogs();
  return new Response(JSON.stringify(blogs), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');
  const abstract = formData.get('abstract');
  const imageFile = formData.get('image');
  
  const blogs = getBlogs();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  let imageUrl = null;
  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveImage(imageFile);
  }
  
  // Preserve HTML formatting from rich text editor
  const newBlog = {
    id: Date.now(),
    title,
    content: content,
    abstract: abstract || content.replace(/<[^>]*>/g, '').substring(0, 150),
    image: imageUrl,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    slug: slug,
    category: 'blog'
  };
  
  blogs.unshift(newBlog);
  saveBlogs(blogs);
  
  return new Response(JSON.stringify({ success: true, blog: newBlog }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT({ request }) {
  const formData = await request.formData();
  const id = parseInt(formData.get('id'));
  const title = formData.get('title');
  const content = formData.get('content');
  const abstract = formData.get('abstract');
  const imageFile = formData.get('image');
  const existingImage = formData.get('existingImage');
  
  let blogs = getBlogs();
  const blogIndex = blogs.findIndex(b => b.id === id);
  
  if (blogIndex === -1) {
    return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
  }
  
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  let imageUrl = existingImage;
  
  if (imageFile && imageFile.size > 0) {
    if (blogs[blogIndex].image) {
      const oldImagePath = path.join(process.cwd(), 'public', blogs[blogIndex].image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }
    imageUrl = await saveImage(imageFile);
  }
  
  blogs[blogIndex] = {
    ...blogs[blogIndex],
    title,
    content: content,
    abstract: abstract || content.replace(/<[^>]*>/g, '').substring(0, 150),
    image: imageUrl,
    slug
  };
  
  saveBlogs(blogs);
  
  return new Response(JSON.stringify({ success: true, blog: blogs[blogIndex] }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE({ url }) {
  const id = parseInt(url.searchParams.get('id'));
  let blogs = getBlogs();
  const deletedBlog = blogs.find(b => b.id === id);
  
  if (deletedBlog && deletedBlog.image) {
    const imagePath = path.join(process.cwd(), 'public', deletedBlog.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }
  
  blogs = blogs.filter(b => b.id !== id);
  saveBlogs(blogs);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}