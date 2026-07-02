export const prerender = false;

import { supabaseAdmin as supabase } from '../../lib/supabase-admin.js';
import { checkAuth } from '../../utils/auth.js';

const UNAUTHORIZED = new Response(JSON.stringify({ error: 'Unauthorized' }), {
  status: 401,
  headers: { 'Content-Type': 'application/json' }
});

export async function GET() {
  const { data: team, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(team), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request, cookies }) {
  if (!checkAuth(cookies)) return UNAUTHORIZED;
  const formData = await request.formData();
  const name = formData.get('name');
  const role = formData.get('role');
  const bio = formData.get('bio');
  const imageFile = formData.get('image');
  
  let imageUrl = null;

  if (imageFile && imageFile.size > 0) {
    if (!imageFile.type || !imageFile.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'Only image files are allowed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const timestamp = Date.now();
    const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '-');
    const fileName = `${timestamp}-${safeName}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery')
      .upload('team/' + fileName, imageFile, {
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
      .getPublicUrl('team/' + fileName);
    
    imageUrl = urlData.publicUrl;
  }
  
  const { data: currentTeam, error: orderError } = await supabase
    .from('team_members')
    .select('order')
    .order('order', { ascending: false })
    .limit(1);
  
  const nextOrder = currentTeam && currentTeam.length > 0 ? currentTeam[0].order + 1 : 1;
  
  const newMember = {
    name,
    role,
    bio: bio || '',
    image_url: imageUrl,
    order: nextOrder,
    created_at: new Date().toISOString()
  };
  
  const { data, error } = await supabase
    .from('team_members')
    .insert(newMember)
    .select();
  
  if (error) {
    console.error('Team insert error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ success: true, member: data[0] }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT({ request, cookies }) {
  if (!checkAuth(cookies)) return UNAUTHORIZED;
  const formData = await request.formData();
  const id = parseInt(formData.get('id'));
  const name = formData.get('name');
  const role = formData.get('role');
  const bio = formData.get('bio');
  const imageFile = formData.get('image');
  const existingImage = formData.get('existingImage');
  
  let imageUrl = existingImage;

  if (imageFile && imageFile.size > 0) {
    if (!imageFile.type || !imageFile.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'Only image files are allowed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    if (existingImage) {
      // Extract just the team/filename part from the full URL
      const urlParts = existingImage.split('/team/');
      if (urlParts.length > 1) {
        await supabase.storage.from('gallery').remove(['team/' + urlParts[1]]);
      }
    }
    
    const timestamp = Date.now();
    const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '-');
    const fileName = `${timestamp}-${safeName}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery')
      .upload('team/' + fileName, imageFile, { cacheControl: '3600', upsert: false });
    
    if (uploadError) {
      console.error('Image upload error:', uploadError);
      return new Response(JSON.stringify({ error: uploadError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const { data: urlData } = supabase.storage
      .from('gallery')
      .getPublicUrl('team/' + fileName);
    imageUrl = urlData.publicUrl;
  }
  
  const updateData = {
    name,
    role,
    bio: bio || '',
    image_url: imageUrl
  };
  
  const { data, error } = await supabase
    .from('team_members')
    .update(updateData)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Team update error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ success: true, member: data[0] }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE({ url, cookies }) {
  if (!checkAuth(cookies)) return UNAUTHORIZED;
  const id = parseInt(url.searchParams.get('id'));
  
  const { data: member, error: fetchError } = await supabase
    .from('team_members')
    .select('image_url, order')
    .eq('id', id)
    .single();
  
  if (!fetchError && member?.image_url) {
    const urlParts = member.image_url.split('/team/');
    if (urlParts.length > 1) {
      await supabase.storage.from('gallery').remove(['team/' + urlParts[1]]);
    }
  }
  
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Team delete error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const { data: remainingTeam } = await supabase
    .from('team_members')
    .select('id')
    .order('order', { ascending: true });
  
  if (remainingTeam && remainingTeam.length > 0) {
    for (let i = 0; i < remainingTeam.length; i++) {
      await supabase
        .from('team_members')
        .update({ order: i + 1 })
        .eq('id', remainingTeam[i].id);
    }
  }
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}