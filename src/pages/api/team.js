export const prerender = false;

import fs from 'fs';
import path from 'path';

const TEAM_FILE = path.join(process.cwd(), 'src', 'data', 'team.json');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'team');
const dataDir = path.join(process.cwd(), 'src', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

if (!fs.existsSync(TEAM_FILE)) {
  fs.writeFileSync(TEAM_FILE, JSON.stringify([]));
}

function getTeam() {
  const data = fs.readFileSync(TEAM_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveTeam(team) {
  fs.writeFileSync(TEAM_FILE, JSON.stringify(team, null, 2));
}

async function saveImage(file) {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
  const fileName = `${timestamp}-${safeName}`;
  const filePath = path.join(IMAGES_DIR, fileName);
  
  const buffer = await file.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(buffer));
  
  return `/images/team/${fileName}`;
}

export async function GET() {
  const team = getTeam();
  return new Response(JSON.stringify(team), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const formData = await request.formData();
  const name = formData.get('name');
  const role = formData.get('role');
  const bio = formData.get('bio');
  const imageFile = formData.get('image');
  
  let imageUrl = null;
  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveImage(imageFile);
  }
  
  const team = getTeam();
  const newMember = {
    id: Date.now(),
    name,
    role,
    bio,
    image: imageUrl,
    order: team.length + 1
  };
  
  team.push(newMember);
  saveTeam(team);
  
  return new Response(JSON.stringify({ success: true, member: newMember }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT({ request }) {
  const formData = await request.formData();
  const id = parseInt(formData.get('id'));
  const name = formData.get('name');
  const role = formData.get('role');
  const bio = formData.get('bio');
  const imageFile = formData.get('image');
  const existingImage = formData.get('existingImage');
  
  let team = getTeam();
  const memberIndex = team.findIndex(m => m.id === id);
  
  if (memberIndex === -1) {
    return new Response(JSON.stringify({ error: 'Member not found' }), { status: 404 });
  }
  
  let imageUrl = existingImage;
  
  if (imageFile && imageFile.size > 0) {
    if (team[memberIndex].image) {
      const oldImagePath = path.join(process.cwd(), 'public', team[memberIndex].image);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }
    imageUrl = await saveImage(imageFile);
  }
  
  team[memberIndex] = {
    ...team[memberIndex],
    name,
    role,
    bio,
    image: imageUrl
  };
  
  saveTeam(team);
  
  return new Response(JSON.stringify({ success: true, member: team[memberIndex] }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE({ url }) {
  const id = parseInt(url.searchParams.get('id'));
  let team = getTeam();
  const deletedMember = team.find(m => m.id === id);
  
  if (deletedMember && deletedMember.image) {
    const imagePath = path.join(process.cwd(), 'public', deletedMember.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }
  
  team = team.filter(m => m.id !== id);
  // Reorder remaining members
  team = team.map((member, index) => ({ ...member, order: index + 1 }));
  saveTeam(team);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}