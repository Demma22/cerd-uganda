export const prerender = false;

import { supabase } from '../../lib/supabase.js';

export async function GET() {
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
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), {
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

  return new Response(JSON.stringify({ 
    success: true, 
    message: 'Message sent successfully',
    data: data[0]
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Mark message as read
export async function PATCH({ request }) {
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

export async function DELETE({ url }) {
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