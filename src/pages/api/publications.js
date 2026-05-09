export const prerender = false;

import { supabase } from '../../lib/supabase.js';

// Get all publications from Supabase
async function getPublications() {
  const { data: publications, error } = await supabase
    .from('publications')
    .select('*')
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error('Error fetching publications:', error);
    return [];
  }

  return publications.map(pub => ({
    id: pub.id,
    title: pub.title,
    fileName: pub.file_name,
    file: pub.file_url,
    date: new Date(pub.uploaded_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }));
}

export async function GET() {
  const pubs = await getPublications();
  return new Response(JSON.stringify(pubs), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const formData = await request.formData();
  const file = formData.get('file');
  const title = formData.get('title');
  const type = formData.get('type') || 'Publication';

  if (!file || file.size === 0) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!file.name.endsWith('.pdf')) {
    return new Response(JSON.stringify({ error: 'Only PDF files are allowed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Clean filename for storage
  const cleanOriginal = file.name.replace('.pdf', '').replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
  const fileName = `${Date.now()}-${cleanOriginal}.pdf`;

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('publications')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return new Response(JSON.stringify({ error: uploadError.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('publications')
    .getPublicUrl(fileName);

  // Save metadata to database
  const displayTitle = title || cleanOriginal.replace(/-/g, ' ');
  
  const { data: pubData, error: dbError } = await supabase
    .from('publications')
    .insert({
      file_name: fileName,
      title: displayTitle,
      original_name: file.name,
      file_url: urlData.publicUrl,
      type: type
    })
    .select();

  if (dbError) {
    console.error('Database error:', dbError);
    return new Response(JSON.stringify({ error: dbError.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ 
    success: true, 
    fileName: fileName,
    publication: pubData[0]
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Update publication title
export async function PATCH({ request }) {
  const { id, title } = await request.json();

  if (!id || !title) {
    return new Response(JSON.stringify({ error: 'id and title are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { error } = await supabase
    .from('publications')
    .update({ title: title.trim() })
    .eq('id', id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Delete publication
export async function DELETE({ url }) {
  const id = url.searchParams.get('id');
  const fileName = url.searchParams.get('fileName');

  if (!id || !fileName) {
    return new Response(JSON.stringify({ error: 'id and fileName are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('publications')
    .remove([fileName]);

  if (storageError) {
    console.error('Storage delete error:', storageError);
  }

  // Delete from database
  const { error: dbError } = await supabase
    .from('publications')
    .delete()
    .eq('id', id);

  if (dbError) {
    return new Response(JSON.stringify({ error: dbError.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}