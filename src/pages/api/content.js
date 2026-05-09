export const prerender = false;

import { supabase } from '../../lib/supabase.js';

// Helper to get content as nested object
async function getContentObject() {
  const { data: rows, error } = await supabase
    .from('page_content')
    .select('*');

  if (error) {
    console.error('Error fetching page content:', error);
    return {};
  }

  // Convert flat rows to nested object
  const content = {};

  for (const row of rows) {
    const { page, section, field, value } = row;
    
    if (!content[page]) content[page] = {};
    if (!content[page][section]) content[page][section] = {};
    
    // Try to parse JSON values
    try {
      content[page][section][field] = JSON.parse(value);
    } catch {
      content[page][section][field] = value;
    }
  }

  return content;
}

// Helper to save content (upsert)
async function saveContentField(page, section, field, value) {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  
  const { error } = await supabase
    .from('page_content')
    .upsert({
      page,
      section,
      field,
      value: stringValue
    }, {
      onConflict: 'page,section,field'
    });

  if (error) {
    console.error('Error saving content field:', error);
    throw error;
  }
}

export async function GET() {
  const content = await getContentObject();
  return new Response(JSON.stringify(content), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const { page, section, field, value } = await request.json();

  try {
    await saveContentField(page, section, field, value);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT({ request }) {
  const { page, section, data } = await request.json();

  try {
    // For PUT requests, we're saving an entire section
    // data is an object with multiple fields
    for (const [field, value] of Object.entries(data)) {
      await saveContentField(page, section, field, value);
    }
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}