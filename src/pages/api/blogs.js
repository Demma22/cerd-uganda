export const prerender = false;

import fs from 'fs';
import path from 'path';

const BLOG_FILE = path.join(process.cwd(), 'src', 'data', 'blogs.json');

// Ensure directory exists
const dataDir = path.join(process.cwd(), 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize blog file if it doesn't exist
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
  
  const blogs = getBlogs();
  const newBlog = {
    id: Date.now(),
    title,
    content,
    abstract: abstract || content.substring(0, 150) + '...',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    category: 'blog'
  };
  
  blogs.push(newBlog);
  saveBlogs(blogs);
  
  return new Response(JSON.stringify({ success: true, blog: newBlog }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE({ url }) {
  const id = parseInt(url.searchParams.get('id'));
  let blogs = getBlogs();
  blogs = blogs.filter(b => b.id !== id);
  saveBlogs(blogs);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}