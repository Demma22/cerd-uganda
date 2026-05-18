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

// Image upload for page content fields
// Stores in the 'content-images' bucket under 'page-content/' folder
// Replaces the old image in storage if one already exists for this field
export async function PATCH({ request }) {
  const formData = await request.formData();
  const file = formData.get('file');
  const page = formData.get('page');
  const section = formData.get('section');
  const field = formData.get('field');

  if (!file || !file.size || !page || !section || !field) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Build a stable filename so re-uploading the same field replaces the old file
  const ext = file.name.split('.').pop();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
  const timestamp = Date.now();
  const fileName = `page-content/${page}-${section}-${field}-${timestamp}-${safeName}`;

  // Delete previous image for this field if one exists
  const { data: existingRows } = await supabase
    .from('page_content')
    .select('value')
    .eq('page', page)
    .eq('section', section)
    .eq('field', field)
    .single();

  if (existingRows?.value) {
    // Extract the storage path from the public URL
    const oldUrl = existingRows.value;
    const marker = '/object/public/content-images/';
    const markerIdx = oldUrl.indexOf(marker);
    if (markerIdx !== -1) {
      const oldPath = oldUrl.slice(markerIdx + marker.length);
      await supabase.storage.from('content-images').remove([oldPath]);
    }
  }

  // Upload new image
  const { error: uploadError } = await supabase.storage
    .from('content-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) {
    console.error('Image upload error:', uploadError);
    return new Response(JSON.stringify({ error: uploadError.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { data: urlData } = supabase.storage
    .from('content-images')
    .getPublicUrl(fileName);

  const publicUrl = urlData.publicUrl;

  try {
    await saveContentField(page, section, field, publicUrl);
    return new Response(JSON.stringify({ success: true, url: publicUrl }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}