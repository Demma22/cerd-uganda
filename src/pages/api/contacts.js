export const prerender = false;

import fs from 'fs';
import path from 'path';

const CONTACTS_FILE = path.join(process.cwd(), 'contacts.json');

function getContacts() {
  if (!fs.existsSync(CONTACTS_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8'));
}

export async function GET() {
  return new Response(JSON.stringify(getContacts()), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  const contacts = getContacts();
  const newContact = {
    id: Date.now(),
    name,
    email,
    message,
    date: new Date().toLocaleDateString()
  };
  
  contacts.push(newContact);
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
  
  return new Response(JSON.stringify({ success: true }));
}