export const prerender = false;

import { supabaseAdmin as supabase } from '../../lib/supabase-admin.js';
import { checkAuth } from '../../utils/auth.js';
import { Resend } from 'resend';

const NOTIFY_EMAILS = ['namanjistella@gmail.com', 'denisssendagire22@gmail.com'];

// Escape user input before interpolating into email HTML
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendNotification({ name, email, phone, message }) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const date = new Date().toLocaleString('en-UG', { timeZone: 'Africa/Kampala' });

  await resend.emails.send({
    from: 'CERD-UG Contact <onboarding@resend.dev>',
    to: NOTIFY_EMAILS,
    reply_to: email,
    subject: `New message from ${name.replace(/[\r\n]/g, ' ')} — CERD-UG Website`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
        <div style="background:#0C3C01;padding:1.5rem 2rem;">
          <h1 style="color:#fff;font-size:1.1rem;margin:0;">New Contact Message</h1>
          <p style="color:rgba(255,255,255,0.6);font-size:0.8rem;margin:0.25rem 0 0;">CERD-UG Website · ${date}</p>
        </div>
        <div style="padding:2rem;border:1px solid #e5e7eb;border-top:none;">
          <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
            <tr><td style="padding:0.5rem 0;color:#6b7280;width:100px;">Name</td><td style="padding:0.5rem 0;font-weight:600;">${esc(name)}</td></tr>
            <tr><td style="padding:0.5rem 0;color:#6b7280;">Email</td><td style="padding:0.5rem 0;"><a href="mailto:${esc(email)}" style="color:#0C3C01;">${esc(email)}</a></td></tr>
            ${phone ? `<tr><td style="padding:0.5rem 0;color:#6b7280;">Phone</td><td style="padding:0.5rem 0;">${esc(phone)}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:1.25rem 0;" />
          <p style="font-size:0.8rem;color:#6b7280;margin:0 0 0.5rem;">Message</p>
          <p style="white-space:pre-line;line-height:1.7;margin:0;">${esc(message)}</p>
        </div>
        <div style="padding:1rem 2rem;background:#f9fafb;border:1px solid #e5e7eb;border-top:none;font-size:0.75rem;color:#9ca3af;">
          You can view and manage all messages in the <a href="https://cerd-uganda.org/admin/dashboard" style="color:#0C3C01;">admin dashboard</a>.
        </div>
      </div>
    `,
  });
}

const UNAUTHORIZED = new Response(JSON.stringify({ error: 'Unauthorized' }), {
  status: 401,
  headers: { 'Content-Type': 'application/json' }
});

export async function GET({ cookies }) {
  if (!checkAuth(cookies)) return UNAUTHORIZED;
  const { data: messages, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(messages), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (name.length > 200 || email.length > 320 || phone.length > 50 || message.length > 5000) {
    return new Response(JSON.stringify({ error: 'One or more fields exceed the allowed length' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'Please provide a valid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const newMessage = {
    name,
    email,
    phone: phone || '',
    message,
    is_read: false,
    created_at: new Date()
  };

  const { data, error } = await supabase
    .from('contact_messages')
    .insert(newMessage)
    .select();

  if (error) {
    console.error('Message insert error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Send email notification — fire and forget, never block the response
  sendNotification({ name, email, phone, message }).catch(err =>
    console.error('Email notification failed:', err)
  );

  return new Response(JSON.stringify({
    success: true,
    message: 'Message sent successfully',
    data: data[0]
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Mark message as read
export async function PATCH({ request, cookies }) {
  if (!checkAuth(cookies)) return UNAUTHORIZED;
  const { id, is_read } = await request.json();

  if (!id) {
    return new Response(JSON.stringify({ error: 'id is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .update({ is_read: is_read !== undefined ? is_read : true })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Message update error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, data: data[0] }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE({ url, cookies }) {
  if (!checkAuth(cookies)) return UNAUTHORIZED;
  const id = parseInt(url.searchParams.get('id'));

  if (!id) {
    return new Response(JSON.stringify({ error: 'id is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Message delete error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}