export const prerender = false;

import { supabaseAdmin as supabase } from '../../lib/supabase-admin.js';
import { checkAuth } from '../../utils/auth.js';

const UNAUTHORIZED = new Response(JSON.stringify({ error: 'Unauthorized' }), {
  status: 401,
  headers: { 'Content-Type': 'application/json' }
});

// Helper function to generate slug
function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

// Helper function to clean abstract (remove HTML tags)
function cleanAbstract(content, abstract) {
  if (abstract) return abstract;
  return content.replace(/<[^>]*>/g, '').substring(0, 150);
}

export async function GET() {
  const { data: blogs, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(blogs), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request, cookies }) {
  if (!checkAuth(cookies)) return UNAUTHORIZED;
  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');
  const abstract = formData.get('abstract');
  const imageFile = formData.get('image');
  
  const slug = generateSlug(title);
  let imageUrl = null;
  
  // Upload image to Supabase Storage if provided
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
      .from('blog-images')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      console.error('Image upload error:', uploadError);
    } else {
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }
  }
  
  const newBlog = {
    title,
    slug,
    content: content,
    abstract: cleanAbstract(content, abstract),
    image_url: imageUrl,
    created_at: new Date(),
    updated_at: new Date()
  };
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(newBlog)
    .select();
  
  if (error) {
    console.error('Blog insert error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ success: true, blog: data[0] }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT({ request, cookies }) {
  if (!checkAuth(cookies)) return UNAUTHORIZED;
  const formData = await request.formData();
  const id = parseInt(formData.get('id'));
  const title = formData.get('title');
  const content = formData.get('content');
  const abstract = formData.get('abstract');
  const imageFile = formData.get('image');
  const existingImage = formData.get('existingImage');
  
  const slug = generateSlug(title);
  let imageUrl = existingImage;
  
  // Upload new image if provided
  if (imageFile && imageFile.size > 0) {
    if (!imageFile.type || !imageFile.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'Only image files are allowed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    // Delete old image if it exists in Supabase
    if (existingImage) {
      const oldFileName = existingImage.split('/').pop();
      await supabase.storage.from('blog-images').remove([oldFileName]);
    }
    
    const timestamp = Date.now();
    const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '-');
    const fileName = `${timestamp}-${safeName}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, imageFile);
    
    if (!uploadError) {
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }
  }
  
  const updateData = {
    title,
    slug,
    content: content,
    abstract: cleanAbstract(content, abstract),
    image_url: imageUrl,
    updated_at: new Date()
  };
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Blog update error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ success: true, blog: data[0] }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE({ url, cookies }) {
  if (!checkAuth(cookies)) return UNAUTHORIZED;
  const id = parseInt(url.searchParams.get('id'));
  
  // First get the blog to check if it has an image
  const { data: blog, error: fetchError } = await supabase
    .from('blog_posts')
    .select('image_url')
    .eq('id', id)
    .single();
  
  if (!fetchError && blog?.image_url) {
    // Delete image from storage
    const fileName = blog.image_url.split('/').pop();
    await supabase.storage.from('blog-images').remove([fileName]);
  }
  
  // Delete the blog post
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Blog delete error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}