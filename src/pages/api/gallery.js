export const prerender = false;

import { supabase } from '../../lib/supabase.js';

export async function GET() {
  const { data: gallery, error } = await supabase
    .from('gallery')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching gallery:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(gallery), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const formData = await request.formData();
  const alt = formData.get('alt');
  const imageFile = formData.get('image');

  if (!imageFile || imageFile.size === 0) {
    return new Response(JSON.stringify({ error: 'Image required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Upload image to Supabase Storage
  const timestamp = Date.now();
  const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '-');
  const fileName = `${timestamp}-${safeName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(fileName, imageFile, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('Image upload error:', uploadError);
    return new Response(JSON.stringify({ error: uploadError.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { data: urlData } = supabase.storage
    .from('gallery')
    .getPublicUrl(fileName);

  // Get current max order
  const { data: currentGallery, error: orderError } = await supabase
    .from('gallery')
    .select('order')
    .order('order', { ascending: false })
    .limit(1);

  const nextOrder = currentGallery && currentGallery.length > 0 ? currentGallery[0].order + 1 : 1;

  const newImage = {
    image_url: urlData.publicUrl,
    alt: alt || 'Gallery image',
    order: nextOrder,
    created_at: new Date()
  };

  const { data, error } = await supabase
    .from('gallery')
    .insert(newImage)
    .select();

  if (error) {
    console.error('Gallery insert error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, image: data[0] }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT({ request }) {
  const formData = await request.formData();
  const id = parseInt(formData.get('id'));
  const alt = formData.get('alt');
  const order = parseInt(formData.get('order'));

  if (!id) {
    return new Response(JSON.stringify({ error: 'id is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const updateData = {};
  if (alt !== undefined) updateData.alt = alt;
  if (order !== undefined) updateData.order = order;

  const { data, error } = await supabase
    .from('gallery')
    .update(updateData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Gallery update error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, image: data[0] }), {
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

  // First get the image to delete from storage
  const { data: image, error: fetchError } = await supabase
    .from('gallery')
    .select('image_url')
    .eq('id', id)
    .single();

  if (!fetchError && image?.image_url) {
    const fileName = image.image_url.split('/').pop();
    await supabase.storage.from('gallery').remove([fileName]);
  }

  // Delete from database
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Gallery delete error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Reorder remaining images
  const { data: remainingGallery } = await supabase
    .from('gallery')
    .select('id')
    .order('order', { ascending: true });

  if (remainingGallery && remainingGallery.length > 0) {
    for (let i = 0; i < remainingGallery.length; i++) {
      await supabase
        .from('gallery')
        .update({ order: i + 1 })
        .eq('id', remainingGallery[i].id);
    }
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}