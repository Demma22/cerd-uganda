import fs from 'fs';
import path from 'path';
export { renderers } from '../../renderers.mjs';

const prerender = false;

const CONTACTS_FILE = path.join(process.cwd(), 'src', 'data', 'contacts.json');
const dataDir = path.join(process.cwd(), 'src', 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize contacts file if it doesn't exist
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify([]));
}

function getContacts() {
  const data = fs.readFileSync(CONTACTS_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveContacts(contacts) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
}

// Mark message as read
async function PATCH({ request }) {
  const { id } = await request.json();
  const contacts = getContacts();
  const contactIndex = contacts.findIndex(c => c.id === id);
  
  if (contactIndex !== -1) {
    contacts[contactIndex].read = true;
    saveContacts(contacts);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ error: 'Message not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Get all messages
async function GET() {
  const contacts = getContacts();
  return new Response(JSON.stringify(contacts), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Submit new message
async function POST({ request }) {
  const { name, email, phone, message } = await request.json();
  
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const contacts = getContacts();
  const newMessage = {
    id: Date.now(),
    name,
    email,
    phone: phone || '',
    message,
    read: false,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    timestamp: Date.now()
  };
  
  contacts.unshift(newMessage);
  saveContacts(contacts);
  
  return new Response(JSON.stringify({ 
    success: true, 
    message: 'Message sent successfully' 
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Delete message
async function DELETE({ url }) {
  const id = parseInt(url.searchParams.get('id'));
  let contacts = getContacts();
  contacts = contacts.filter(c => c.id !== id);
  saveContacts(contacts);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
