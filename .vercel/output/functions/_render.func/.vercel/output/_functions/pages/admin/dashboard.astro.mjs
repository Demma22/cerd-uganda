/* empty css                                       */
import { c as createComponent, r as renderComponent, d as renderTemplate, f as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_krYXjv10.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_Dz598ZJp.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const session = Astro2.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Admin Dashboard" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<div style="display: flex; min-height: 100vh; background: #ffffff; padding-top: 80px;"> <!-- Sidebar --> <div style="width: 260px; background: #1a2e0a; color: white; padding: 2rem 1rem; position: fixed; height: 100vh; overflow-y: auto; top: 0;"> <h2 style="font-size: 1.1rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.2);">CERD-UG Admin</h2> <nav style="display: flex; flex-direction: column; gap: 0.5rem;"> <button class="nav-btn" data-section="messages" style="background: #dc2626; color: white; padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem; display: flex; justify-content: space-between; align-items: center;">
Messages
<span id="unreadBadge" style="background: white; color: #dc2626; padding: 0.2rem 0.5rem; border-radius: 1rem; font-size: 0.7rem; font-weight: bold;">0</span> </button> <button class="nav-btn" data-section="publications" style="background: transparent; color: rgba(255,255,255,0.8); padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem;">Publications</button> <button class="nav-btn" data-section="blogs" style="background: transparent; color: rgba(255,255,255,0.8); padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem;">Blog Posts</button> <button class="nav-btn" data-section="team" style="background: transparent; color: rgba(255,255,255,0.8); padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem;">Team Members</button> <button class="nav-btn" data-section="gallery" style="background: transparent; color: rgba(255,255,255,0.8); padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem;">Gallery Images</button> <button class="nav-btn" data-section="content" style="background: transparent; color: rgba(255,255,255,0.8); padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem;">Page Content</button> <a href="/api/logout" style="display: block; color: rgba(255,255,255,0.6); text-decoration: none; padding: 0.75rem 1rem; margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.2);">Logout</a> </nav> </div> <!-- Main Content --> <div style="flex: 1; margin-left: 260px; padding: 2rem;"> <!-- MESSAGES SECTION --> <div id="messages-section" class="admin-section" style="display: none;"> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;"> <h2 style="font-size: 1.5rem; color: #1a2e0a;">Contact Messages</h2> <button onclick="markAllAsRead()" style="background: #6b8f47; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; cursor: pointer;">Mark All as Read</button> </div> <div style="margin-bottom: 1.5rem;"> <input type="text" id="messageSearchInput" placeholder="Search messages..." style="width: 100%; max-width: 400px; padding: 0.6rem 1rem; border: 1px solid #ddd; border-radius: 0.5rem;" onkeyup="filterMessages()"> </div> <div style="background: white; border-radius: 0.75rem; overflow: hidden; border: 1px solid #e5e7eb;"> <table style="width: 100%; border-collapse: collapse;"> <thead style="background: #2d5016;"> <tr><th style="padding: 1rem; text-align: left; color: white;">Status</th><th style="padding: 1rem; text-align: left; color: white;">Name / Email</th><th style="padding: 1rem; text-align: left; color: white;">Message</th><th style="padding: 1rem; text-align: left; color: white;">Date</th><th style="padding: 1rem; text-align: left; color: white;">Actions</th></tr> </thead> <tbody id="messagesList"><tr><td colspan="5" style="padding: 2rem; text-align: center; color: #999;">Loading messages...</td></tr></tbody> </table> </div> </div> <!-- PUBLICATIONS SECTION --> <div id="publications-section" class="admin-section" style="display: none;"> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;"> <h2 style="font-size: 1.5rem; color: #1a2e0a;">Manage Publications</h2> <button onclick="toggleUploadForm()" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">+ Upload PDF</button> </div> <div style="margin-bottom: 1.5rem;"> <input type="text" id="pubSearchInput" placeholder="Search publications..." style="width: 100%; max-width: 400px; padding: 0.6rem 1rem; border: 1px solid #ddd; border-radius: 0.5rem;" onkeyup="filterPublications()"> </div> <div id="uploadForm" style="display: none; background: white; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; border: 1px solid #ddd;"> <h3>Upload New Publication (PDF only)</h3> <form id="publicationForm" enctype="multipart/form-data"> <div style="margin-bottom: 1rem;"><label>Select PDF File *</label><input type="file" name="file" accept=".pdf" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="display: flex; gap: 1rem;"><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Upload</button><button type="button" onclick="toggleUploadForm()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button></div> </form> <div id="uploadStatus" style="margin-top: 1rem;"></div> </div> <div style="background: white; border-radius: 0.75rem; overflow: hidden; border: 1px solid #e5e7eb;"> <table style="width: 100%; border-collapse: collapse;"> <thead style="background: #2d5016;"><tr><th style="padding: 1rem; text-align: left; color: white;">Title</th><th style="padding: 1rem; text-align: left; color: white;">Date</th><th style="padding: 1rem; text-align: left; color: white;">Actions</th></tr></thead> <tbody id="publicationsList"><tr><td colspan="3" style="padding: 2rem; text-align: center; color: #999;">Loading publications...</td></tr></tbody> </table> </div> </div> <!-- BLOG POSTS SECTION --> <div id="blogs-section" class="admin-section" style="display: none;"> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;"> <h2 style="font-size: 1.5rem; color: #1a2e0a;">Manage Blog Posts</h2> <button onclick="toggleBlogForm()" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">+ Add Blog Post</button> </div> <div style="margin-bottom: 1.5rem;"> <input type="text" id="blogSearchInput" placeholder="Search blog posts..." style="width: 100%; max-width: 400px; padding: 0.6rem 1rem; border: 1px solid #ddd; border-radius: 0.5rem;" onkeyup="filterBlogs()"> </div> <div id="blogForm" style="display: none; background: white; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; border: 1px solid #ddd;"> <h3>Add New Blog Post</h3> <div style="background: #f0fdf4; padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem;"><strong>Tip:</strong> You can paste from Word or use HTML tags: &lt;b&gt;bold&lt;/b&gt;, &lt;i&gt;italic&lt;/i&gt;</div> <form id="blogFormSubmit" enctype="multipart/form-data"> <div style="margin-bottom: 1rem;"><label>Title *</label><input type="text" name="title" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Featured Image</label><input type="file" name="image" accept="image/*" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Abstract / Summary</label><textarea name="abstract" rows="2" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></textarea></div> <div style="margin-bottom: 1rem;"> <div style="margin-bottom: 0.5rem; display: flex; gap: 0.25rem; flex-wrap: wrap;"> <button type="button" onclick="insertFormatting('b')" style="background: #f0f0f0; border: 1px solid #ddd; padding: 0.3rem 0.6rem; border-radius: 0.25rem;">Bold</button> <button type="button" onclick="insertFormatting('i')" style="background: #f0f0f0; border: 1px solid #ddd; padding: 0.3rem 0.6rem; border-radius: 0.25rem;">Italic</button> <button type="button" onclick="insertFormatting('ul')" style="background: #f0f0f0; border: 1px solid #ddd; padding: 0.3rem 0.6rem; border-radius: 0.25rem;">Bullet List</button> </div> <textarea id="blogContent" name="content" rows="12" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem; font-family: monospace;"></textarea> </div> <div style="display: flex; gap: 1rem;"><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Publish</button><button type="button" onclick="toggleBlogForm()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button></div> </form> <div id="blogStatus"></div> </div> <div style="background: white; border-radius: 0.75rem; overflow: hidden; border: 1px solid #e5e7eb;"> <table style="width: 100%; border-collapse: collapse;"> <thead style="background: #2d5016;"><tr><th style="padding: 1rem; text-align: left; color: white;">Title</th><th style="padding: 1rem; text-align: left; color: white;">Date</th><th style="padding: 1rem; text-align: left; color: white;">Image</th><th style="padding: 1rem; text-align: left; color: white;">Actions</th></tr></thead> <tbody id="blogsList"><tr><td colspan="4" style="padding: 2rem; text-align: center; color: #999;">Loading blog posts...</td></tr></tbody> </table> </div> </div> <!-- TEAM MEMBERS SECTION --> <div id="team-section" class="admin-section" style="display: none;"> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;"> <h2 style="font-size: 1.5rem; color: #1a2e0a;">Manage Team Members</h2> <button onclick="toggleTeamForm()" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">+ Add Team Member</button> </div> <div id="teamForm" style="display: none; background: white; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; border: 1px solid #ddd;"> <h3>Add New Team Member</h3> <form id="teamFormSubmit" enctype="multipart/form-data"> <div style="margin-bottom: 1rem;"><label>Name *</label><input type="text" name="name" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Role *</label><input type="text" name="role" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Bio</label><textarea name="bio" rows="3" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></textarea></div> <div style="margin-bottom: 1rem;"><label>Profile Image</label><input type="file" name="image" accept="image/*" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="display: flex; gap: 1rem;"><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Add Member</button><button type="button" onclick="toggleTeamForm()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button></div> </form> <div id="teamStatus"></div> </div> <div style="background: white; border-radius: 0.75rem; overflow-x: auto; border: 1px solid #e5e7eb;"> <table style="width: 100%; border-collapse: collapse;"> <thead style="background: #2d5016;"><tr><th style="padding: 1rem; text-align: left; color: white;">Image</th><th style="padding: 1rem; text-align: left; color: white;">Name</th><th style="padding: 1rem; text-align: left; color: white;">Role</th><th style="padding: 1rem; text-align: left; color: white;">Actions</th></tr></thead> <tbody id="teamList"><tr><td colspan="4" style="padding: 2rem; text-align: center; color: #999;">Loading team members...</td></tr></tbody> </table> </div> </div> <!-- GALLERY SECTION --> <div id="gallery-section" class="admin-section" style="display: none;"> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;"> <h2 style="font-size: 1.5rem; color: #1a2e0a;">Manage Gallery Images</h2> <button onclick="toggleGalleryForm()" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">+ Add Image</button> </div> <div id="galleryForm" style="display: none; background: white; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; border: 1px solid #ddd;"> <h3>Add New Gallery Image</h3> <form id="galleryFormSubmit" enctype="multipart/form-data"> <div style="margin-bottom: 1rem;"><label>Image File *</label><input type="file" name="image" accept="image/*" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Alt Text</label><input type="text" name="alt" placeholder="Describe the image" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="display: flex; gap: 1rem;"><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Add Image</button><button type="button" onclick="toggleGalleryForm()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button></div> </form> <div id="galleryStatus"></div> </div> <div id="galleryGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;"><div style="padding: 2rem; text-align: center; color: #999;">Loading gallery images...</div></div> </div> <!-- PAGE CONTENT SECTION --> <div id="content-section" class="admin-section" style="display: none;"> <h2 style="font-size: 1.5rem; color: #1a2e0a; margin-bottom: 1.5rem;">Edit Page Content</h2> <div id="pageContentEditor"></div> </div> </div> </div>  <div id="editTeamModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;"> <div style="background: white; border-radius: 0.75rem; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 2rem;"> <h3>Edit Team Member</h3> <form id="editTeamForm" enctype="multipart/form-data"> <input type="hidden" name="id" id="edit_team_id"> <div style="margin-bottom: 1rem;"><label>Name *</label><input type="text" name="name" id="edit_team_name" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Role *</label><input type="text" name="role" id="edit_team_role" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Bio</label><textarea name="bio" id="edit_team_bio" rows="3" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></textarea></div> <div style="margin-bottom: 1rem;"> <div id="edit_team_current_image" style="margin-bottom: 0.5rem;"></div> <label>Upload New Image</label><input type="file" name="image" accept="image/*" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"> <input type="hidden" name="existingImage" id="edit_team_existing_image"> </div> <div style="display: flex; gap: 1rem; justify-content: flex-end;"><button type="button" onclick="closeEditTeamModal()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Save Changes</button></div> </form> </div> </div>  <div id="editBlogModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;"> <div style="background: white; border-radius: 0.75rem; max-width: 700px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 2rem;"> <h3>Edit Blog Post</h3> <form id="editBlogForm" enctype="multipart/form-data"> <input type="hidden" name="id" id="edit_blog_id"> <div style="margin-bottom: 1rem;"><label>Title *</label><input type="text" name="title" id="edit_blog_title" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Abstract</label><textarea name="abstract" id="edit_blog_abstract" rows="2" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></textarea></div> <div style="margin-bottom: 1rem;"><label>Content</label><textarea name="content" id="edit_blog_content" rows="12" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem; font-family: monospace;"></textarea></div> <div style="margin-bottom: 1rem;"> <div id="edit_blog_current_image" style="margin-bottom: 0.5rem;"></div> <label>Upload New Image</label><input type="file" name="image" accept="image/*" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"> <input type="hidden" name="existingImage" id="edit_blog_existing_image"> </div> <div style="display: flex; gap: 1rem; justify-content: flex-end;"><button type="button" onclick="closeEditModal()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Save Changes</button></div> </form> </div> </div>  <script>
    let allPublications = [];
    let allBlogs = [];
    let allMessages = [];
    let allTeam = [];
    let allGallery = [];

    function escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/[&<>"']/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        if (m === '"') return '&quot;';
        if (m === "'") return '&#39;';
        return m;
      });
    }

    // Rich text formatting
    function insertFormatting(type) {
      const textarea = document.getElementById('blogContent');
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = textarea.value.substring(start, end);
      let insert = '';
      if (type === 'b') insert = '<b>' + (selected || 'bold text') + '<\\/b>';
      else if (type === 'i') insert = '<i>' + (selected || 'italic text') + '<\\/i>';
      else if (type === 'ul') insert = '\\n<ul>\\n  <li>' + (selected || 'list item') + '<\\/li>\\n<\\/ul>\\n';
      else return;
      textarea.value = textarea.value.substring(0, start) + insert + textarea.value.substring(end);
      textarea.focus();
    }

    // Navigation between sections
    function activateSection(section) {
      document.querySelectorAll('.nav-btn').forEach(function(b) {
        b.style.background = 'transparent';
        b.style.color = 'rgba(255,255,255,0.8)';
      });
      var activeBtn = document.querySelector('.nav-btn[data-section="' + section + '"]');
      if (activeBtn) {
        activeBtn.style.background = '#6b8f47';
        activeBtn.style.color = 'white';
      }
      document.querySelectorAll('.admin-section').forEach(function(s) { s.style.display = 'none'; });
      var target = document.getElementById(section + '-section');
      if (target) target.style.display = 'block';
      if (section === 'messages') loadMessages();
      if (section === 'team') loadTeam();
      if (section === 'gallery') loadGallery();
      if (section === 'content') loadPageContentEditor();
      location.hash = section;
    }

    document.querySelectorAll('.nav-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        activateSection(btn.dataset.section);
      });
    });

    // ========== MESSAGES ==========
    async function loadMessages() {
      const res = await fetch('/api/contact');
      allMessages = await res.json();
      const unreadCount = allMessages.filter(function(m) { return !m.read; }).length;
      const badge = document.getElementById('unreadBadge');
      if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
      }
      const tbody = document.getElementById('messagesList');
      if (allMessages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="padding: 2rem; text-align: center; color: #999;">No messages.<\\/td><\\/tr>';
        return;
      }
      let html = '';
      for (const m of allMessages) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;' + (!m.read ? 'background: #f0fdf4;' : '') + '">';
        html += '<td style="padding: 1rem;">' + (!m.read ? '<span style="background: #dc2626; color: white; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-size: 0.7rem;">New<\\/span>' : '<span style="color: #999;">Read<\\/span>') + '<\\/td>';
        html += '<td style="padding: 1rem;"><strong>' + escapeHtml(m.name) + '<\\/strong><br><span style="font-size: 0.8rem; color: #666;">' + escapeHtml(m.email) + '<\\/span><\\/td>';
        html += '<td style="padding: 1rem;">' + escapeHtml(m.message.substring(0, 150)) + (m.message.length > 150 ? '...' : '') + '<\\/td>';
        html += '<td style="padding: 1rem; color: #6b7280;">' + m.date + '<\\/td>';
        html += '<td style="padding: 1rem;"><button onclick="markAsRead(' + m.id + ')" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; font-size: 0.75rem; margin-right: 0.5rem;">Mark Read<\\/button><button onclick="deleteMessage(' + m.id + ')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; font-size: 0.75rem;">Delete<\\/button><\\/td>';
        html += '<\\/tr>';
      }
      tbody.innerHTML = html;
    }

    window.markAsRead = async function(id) {
      await fetch('/api/contact', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) });
      loadMessages();
    }

    window.markAllAsRead = async function() {
      for (const m of allMessages.filter(function(m) { return !m.read; })) {
        await fetch('/api/contact', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: m.id }) });
      }
      loadMessages();
    }

    window.deleteMessage = async function(id) {
      if (confirm('Delete this message?')) {
        await fetch('/api/contact?id=' + id, { method: 'DELETE' });
        loadMessages();
      }
    }

    window.filterMessages = function() {
      const term = document.getElementById('messageSearchInput').value.toLowerCase();
      const filtered = allMessages.filter(function(m) { return m.name.toLowerCase().includes(term) || m.email.toLowerCase().includes(term) || m.message.toLowerCase().includes(term); });
      const tbody = document.getElementById('messagesList');
      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="padding: 2rem; text-align: center; color: #999;">No messages found.<\\/td><\\/tr>';
        return;
      }
      let html = '';
      for (const m of filtered) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;' + (!m.read ? 'background: #f0fdf4;' : '') + '">';
        html += '<td style="padding: 1rem;">' + (!m.read ? '<span style="background: #dc2626; color: white; padding: 0.2rem 0.5rem; border-radius: 0.25rem;">New<\\/span>' : 'Read') + '<\\/td>';
        html += '<td style="padding: 1rem;"><strong>' + escapeHtml(m.name) + '<\\/strong><br>' + escapeHtml(m.email) + '<\\/td>';
        html += '<td style="padding: 1rem;">' + escapeHtml(m.message.substring(0, 150)) + '<\\/td>';
        html += '<td style="padding: 1rem;">' + m.date + '<\\/td>';
        html += '<td style="padding: 1rem;"><button onclick="markAsRead(' + m.id + ')" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem;">Mark Read<\\/button><button onclick="deleteMessage(' + m.id + ')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-left: 0.5rem;">Delete<\\/button><\\/td>';
        html += '<\\/tr>';
      }
      tbody.innerHTML = html;
    }

    // ========== PUBLICATIONS ==========
    async function loadPublications() {
      const res = await fetch('/api/publications');
      allPublications = await res.json();
      const tbody = document.getElementById('publicationsList');
      if (allPublications.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="padding: 2rem; text-align: center; color: #999;">No publications.<\\/td><\\/tr>';
        return;
      }
      let html = '';
      for (const p of allPublications) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;">';
        html += '<td style="padding: 1rem;">' + escapeHtml(p.title) + '<\\/td>';
        html += '<td style="padding: 1rem;">' + p.date + '<\\/td>';
        html += '<td style="padding: 1rem;"><a href="' + p.file + '" target="_blank" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; text-decoration: none; border-radius: 0.375rem; margin-right: 0.5rem;">View<\\/a><button onclick="deletePublication(\\'' + escapeHtml(p.fileName) + '\\')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem;">Delete<\\/button><\\/td>';
        html += '<\\/tr>';
      }
      tbody.innerHTML = html;
    }

    window.deletePublication = async function(fileName) {
      if (confirm('Delete this publication?')) {
        await fetch('/api/publications?fileName=' + encodeURIComponent(fileName), { method: 'DELETE' });
        loadPublications();
      }
    }

    window.filterPublications = function() {
      const term = document.getElementById('pubSearchInput').value.toLowerCase();
      const filtered = allPublications.filter(function(p) { return p.title.toLowerCase().includes(term); });
      const tbody = document.getElementById('publicationsList');
      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="padding: 2rem; text-align: center; color: #999;">No publications found.<\\/td><\\/tr>';
        return;
      }
      let html = '';
      for (const p of filtered) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 1rem;">' + escapeHtml(p.title) + '<\\/td><td style="padding: 1rem;">' + p.date + '<\\/td><td style="padding: 1rem;"><a href="' + p.file + '" target="_blank" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; text-decoration: none; border-radius: 0.375rem;">View<\\/a><button onclick="deletePublication(\\'' + escapeHtml(p.fileName) + '\\')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-left: 0.5rem;">Delete<\\/button><\\/td><\\/tr>';
      }
      tbody.innerHTML = html;
    }

    // ========== BLOGS ==========
    async function loadBlogs() {
      const res = await fetch('/api/blogs');
      allBlogs = await res.json();
      const tbody = document.getElementById('blogsList');
      if (allBlogs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="padding: 2rem; text-align: center; color: #999;">No blog posts.<\\/td><\\/tr>';
        return;
      }
      let html = '';
      for (const b of allBlogs) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;">';
        html += '<td style="padding: 1rem;">' + escapeHtml(b.title) + '<div style="font-size: 0.75rem; color: #666;">' + escapeHtml((b.abstract || '').substring(0, 80)) + '...<\\/div><\\/td>';
        html += '<td style="padding: 1rem;">' + b.date + '<\\/td>';
        html += '<td style="padding: 1rem;">' + (b.image ? '<img src="' + b.image + '" style="width: 50px; height: 50px; object-fit: cover; border-radius: 0.25rem;" \\/>' : 'No image') + '<\\/td>';
        html += '<td style="padding: 1rem;"><a href="/blog/' + b.slug + '" target="_blank" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; text-decoration: none; border-radius: 0.375rem; margin-right: 0.5rem;">View<\\/a><button onclick="editBlog(' + b.id + ')" style="background: #f59e0b; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-right: 0.5rem;">Edit<\\/button><button onclick="deleteBlog(' + b.id + ')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem;">Delete<\\/button><\\/td>';
        html += '<\\/tr>';
      }
      tbody.innerHTML = html;
    }

    window.deleteBlog = async function(id) {
      if (confirm('Delete this blog post?')) {
        await fetch('/api/blogs?id=' + id, { method: 'DELETE' });
        loadBlogs();
      }
    }

    window.filterBlogs = function() {
      const term = document.getElementById('blogSearchInput').value.toLowerCase();
      const filtered = allBlogs.filter(function(b) { return b.title.toLowerCase().includes(term); });
      const tbody = document.getElementById('blogsList');
      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="padding: 2rem; text-align: center; color: #999;">No blog posts found.<\\/td><\\/tr>';
        return;
      }
      let html = '';
      for (const b of filtered) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 1rem;">' + escapeHtml(b.title) + '<div style="font-size: 0.75rem; color: #666;">' + escapeHtml((b.abstract || '').substring(0, 80)) + '...<\\/div><\\/td><td style="padding: 1rem;">' + b.date + '<\\/td><td style="padding: 1rem;">' + (b.image ? '<img src="' + b.image + '" style="width: 50px; height: 50px; object-fit: cover; border-radius: 0.25rem;" \\/>' : 'No image') + '<\\/td><td style="padding: 1rem;"><a href="/blog/' + b.slug + '" target="_blank" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; text-decoration: none; border-radius: 0.375rem;">View<\\/a><button onclick="editBlog(' + b.id + ')" style="background: #f59e0b; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-left: 0.5rem;">Edit<\\/button><button onclick="deleteBlog(' + b.id + ')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-left: 0.5rem;">Delete<\\/button><\\/td><\\/tr>';
      }
      tbody.innerHTML = html;
    }

    window.editBlog = function(id) {
      const blog = allBlogs.find(function(b) { return b.id === id; });
      if (!blog) return;
      document.getElementById('edit_blog_id').value = blog.id;
      document.getElementById('edit_blog_title').value = blog.title;
      document.getElementById('edit_blog_abstract').value = blog.abstract || '';
      document.getElementById('edit_blog_content').value = blog.content;
      document.getElementById('edit_blog_existing_image').value = blog.image || '';
      const imgDiv = document.getElementById('edit_blog_current_image');
      if (imgDiv) imgDiv.innerHTML = blog.image ? '<img src="' + blog.image + '" style="max-width: 100px; border-radius: 0.375rem;" \\/>' : 'No image';
      document.getElementById('editBlogModal').style.display = 'flex';
    };

    window.closeEditModal = function() {
      document.getElementById('editBlogModal').style.display = 'none';
    };

    // ========== TEAM ==========
    async function loadTeam() {
      const res = await fetch('/api/team');
      allTeam = await res.json();
      const tbody = document.getElementById('teamList');
      if (allTeam.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="padding: 2rem; text-align: center; color: #999;">No team members.<\\/td><\\/tr>';
        return;
      }
      let html = '';
      for (const m of allTeam) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;">';
        html += '<td style="padding: 1rem;">' + (m.image ? '<img src="' + m.image + '" style="width: 50px; height: 50px; object-fit: cover; border-radius: 0.25rem;" \\/>' : 'No image') + '<\\/td>';
        html += '<td style="padding: 1rem;"><strong>' + escapeHtml(m.name) + '<\\/strong><\\/td>';
        html += '<td style="padding: 1rem;">' + escapeHtml(m.role) + '<\\/td>';
        html += '<td style="padding: 1rem;"><button onclick="editTeam(' + m.id + ')" style="background: #f59e0b; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-right: 0.5rem;">Edit<\\/button><button onclick="deleteTeam(' + m.id + ')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem;">Delete<\\/button><\\/td>';
        html += '<\\/tr>';
      }
      tbody.innerHTML = html;
    }

    window.deleteTeam = async function(id) {
      if (confirm('Delete this team member?')) {
        await fetch('/api/team?id=' + id, { method: 'DELETE' });
        loadTeam();
      }
    }

    window.editTeam = function(id) {
      const member = allTeam.find(function(m) { return m.id === id; });
      if (!member) return;
      document.getElementById('edit_team_id').value = member.id;
      document.getElementById('edit_team_name').value = member.name;
      document.getElementById('edit_team_role').value = member.role;
      document.getElementById('edit_team_bio').value = member.bio || '';
      document.getElementById('edit_team_existing_image').value = member.image || '';
      const imgDiv = document.getElementById('edit_team_current_image');
      imgDiv.innerHTML = member.image ? '<img src="' + member.image + '" style="max-width: 100px; border-radius: 0.375rem;" \\/>' : 'No image';
      document.getElementById('editTeamModal').style.display = 'flex';
    }

    window.closeEditTeamModal = function() {
      document.getElementById('editTeamModal').style.display = 'none';
    }

    // ========== GALLERY ==========
    async function loadGallery() {
      const res = await fetch('/api/gallery');
      allGallery = await res.json();
      const container = document.getElementById('galleryGrid');
      if (allGallery.length === 0) {
        container.innerHTML = '<div style="padding: 2rem; text-align: center; color: #999;">No gallery images.<\\/div>';
        return;
      }
      let html = '';
      for (const img of allGallery) {
        html += '<div style="background: white; border-radius: 0.5rem; overflow: hidden; border: 1px solid #e5e7eb;">';
        html += '<img src="' + img.image + '" style="width: 100%; aspect-ratio: 1; object-fit: cover;" \\/>';
        html += '<div style="padding: 0.5rem;">';
        html += '<p style="font-size: 0.75rem; color: #666; margin-bottom: 0.5rem;">' + escapeHtml(img.alt) + '<\\/p>';
        html += '<button onclick="deleteGalleryImage(' + img.id + ')" style="background: #dc2626; color: white; padding: 0.25rem 0.5rem; border: none; border-radius: 0.25rem; width: 100%; cursor: pointer;">Delete<\\/button>';
        html += '<\\/div><\\/div>';
      }
      container.innerHTML = html;
    }

    window.deleteGalleryImage = async function(id) {
      if (confirm('Delete this image?')) {
        await fetch('/api/gallery?id=' + id, { method: 'DELETE' });
        loadGallery();
      }
    }

    // ========== FORM SUBMISSIONS ==========
    const pubForm = document.getElementById('publicationForm');
    if (pubForm) {
      pubForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/publications', { method: 'POST', body: fd });
        if (res.ok) {
          alert('Publication added successfully!');
          e.target.reset();
          document.getElementById('uploadForm').style.display = 'none';
          loadPublications();
        }
      });
    }

    const blogSubmit = document.getElementById('blogFormSubmit');
    if (blogSubmit) {
      blogSubmit.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/blogs', { method: 'POST', body: fd });
        if (res.ok) {
          alert('Blog post published successfully!');
          e.target.reset();
          document.getElementById('blogForm').style.display = 'none';
          loadBlogs();
        }
      });
    }

    const teamSubmit = document.getElementById('teamFormSubmit');
    if (teamSubmit) {
      teamSubmit.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/team', { method: 'POST', body: fd });
        if (res.ok) {
          alert('Team member added successfully!');
          e.target.reset();
          document.getElementById('teamForm').style.display = 'none';
          loadTeam();
        }
      });
    }

    const editTeamForm = document.getElementById('editTeamForm');
    if (editTeamForm) {
      editTeamForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/team', { method: 'PUT', body: fd });
        if (res.ok) {
          alert('Team member updated successfully!');
          closeEditTeamModal();
          loadTeam();
        }
      });
    }

    const gallerySubmit = document.getElementById('galleryFormSubmit');
    if (gallerySubmit) {
      gallerySubmit.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/gallery', { method: 'POST', body: fd });
        if (res.ok) {
          alert('Image added successfully!');
          e.target.reset();
          document.getElementById('galleryForm').style.display = 'none';
          loadGallery();
        }
      });
    }

    const editBlogForm = document.getElementById('editBlogForm');
    if (editBlogForm) {
      editBlogForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/blogs', { method: 'PUT', body: fd });
        if (res.ok) {
          alert('Blog updated!');
          closeEditModal();
          loadBlogs();
        }
      });
    }

    // ========== TOGGLE FUNCTIONS ==========
    function toggleUploadForm() {
      const f = document.getElementById('uploadForm');
      if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    }
    function toggleBlogForm() {
      const f = document.getElementById('blogForm');
      if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    }
    function toggleTeamForm() {
      const f = document.getElementById('teamForm');
      if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    }
    function toggleGalleryForm() {
      const f = document.getElementById('galleryForm');
      if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    }

    window.toggleUploadForm = toggleUploadForm;
    window.toggleBlogForm = toggleBlogForm;
    window.toggleTeamForm = toggleTeamForm;
    window.toggleGalleryForm = toggleGalleryForm;
    window.insertFormatting = insertFormatting;

    // ========== PAGE CONTENT EDITOR ==========
    let contentEditorLoaded = false;

    async function loadPageContentEditor() {
      // Only build the editor once
      if (contentEditorLoaded) return;
      contentEditorLoaded = true;

      const container = document.getElementById('pageContentEditor');
      if (!container) return;

      container.innerHTML = '<p style="color: #666; padding: 1rem;">Loading content...</p>';

      const response = await fetch('/api/content');
      const c = await response.json();

      const hp = c.homepage || {};
      const ab = c.about || {};
      const ss = c.siteSettings || {};

      function field(label, id, page, section, fieldName, value, type) {
        if (type === 'textarea') {
          return '<div class="field-group"><label>' + label + '<\\/label><textarea id="' + id + '" class="content-field" data-page="' + page + '" data-section="' + section + '" data-field="' + fieldName + '" rows="3">' + escapeHtml(value) + '<\\/textarea><\\/div>';
        }
        return '<div class="field-group"><label>' + label + '<\\/label><input type="text" id="' + id + '" class="content-field" data-page="' + page + '" data-section="' + section + '" data-field="' + fieldName + '" value="' + escapeHtml(value) + '"><\\/div>';
      }

      function section(title, fields) {
        return '<div style="background: #f9fafb; padding: 1.25rem; margin-bottom: 1.5rem; border-radius: 0.5rem;"><h3 style="color: #2d5016; margin-bottom: 1rem;">' + title + '<\\/h3>' + fields + '<\\/div>';
      }

      let html = '<div style="background: white; border-radius: 0.75rem; padding: 1.5rem;">';

      // Tab buttons
      html += '<div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid #ddd; padding-bottom: 1rem; flex-wrap: wrap;">';
      html += '<button class="tab-btn" data-tab="homepage" style="background: #f0fdf4; color: #2d5016;">Homepage<\\/button>';
      html += '<button class="tab-btn" data-tab="about" style="background: #e5e7eb; color: #666;">About Us<\\/button>';
      html += '<button class="tab-btn" data-tab="settings" style="background: #e5e7eb; color: #666;">Site Settings<\\/button>';
      html += '<\\/div>';

      // ---- HOMEPAGE TAB ----
      html += '<div id="tab-homepage" class="tab-pane">';

      html += section('Hero Section',
        field('Badge', 'hero_badge', 'homepage', 'hero', 'badge', (hp.hero || {}).badge || '') +
        field('Title', 'hero_title', 'homepage', 'hero', 'title', (hp.hero || {}).title || '') +
        field('Subtitle', 'hero_subtitle', 'homepage', 'hero', 'subtitle', (hp.hero || {}).subtitle || '', 'textarea') +
        field('Button Text', 'hero_buttonText', 'homepage', 'hero', 'buttonText', (hp.hero || {}).buttonText || '') +
        field('Hero Image URL', 'hero_image', 'homepage', 'hero', 'image', (hp.hero || {}).image || '')
      );

      html += section('Mission & Goal Section',
        field('Title', 'mission_title', 'homepage', 'mission', 'title', (hp.mission || {}).title || '') +
        field('Description', 'mission_description', 'homepage', 'mission', 'description', (hp.mission || {}).description || '', 'textarea') +
        field('Goal', 'mission_goal', 'homepage', 'mission', 'goal', (hp.mission || {}).goal || '', 'textarea')
      );

      html += section('Vision Section',
        field('Vision Quote', 'vision_quote', 'homepage', 'vision', 'quote', (hp.vision || {}).quote || '', 'textarea')
      );

      html += section('Impact Section',
        field('Title', 'impact_title', 'homepage', 'impact', 'title', (hp.impact || {}).title || '') +
        field('Description', 'impact_description', 'homepage', 'impact', 'description', (hp.impact || {}).description || '', 'textarea') +
        field('Vision Statement', 'impact_vision', 'homepage', 'impact', 'vision', (hp.impact || {}).vision || '', 'textarea')
      );

      html += section('Producers Section',
        field('Title', 'producers_title', 'homepage', 'producers', 'title', (hp.producers || {}).title || '') +
        field('Description', 'producers_description', 'homepage', 'producers', 'description', (hp.producers || {}).description || '', 'textarea') +
        field('Background Image URL', 'producers_image', 'homepage', 'producers', 'image', (hp.producers || {}).image || '')
      );

      html += section('Recent Works Section',
        field('Title', 'recentWorks_title', 'homepage', 'recentWorks', 'title', (hp.recentWorks || {}).title || '') +
        field('Subtitle', 'recentWorks_subtitle', 'homepage', 'recentWorks', 'subtitle', (hp.recentWorks || {}).subtitle || '', 'textarea')
      );

      html += section('Bottom Call to Action',
        field('Text', 'bottomCta_text', 'homepage', 'bottomCta', 'text', (hp.bottomCta || {}).text || '', 'textarea') +
        field('Button Text', 'bottomCta_buttonText', 'homepage', 'bottomCta', 'buttonText', (hp.bottomCta || {}).buttonText || '') +
        field('Button Link', 'bottomCta_buttonLink', 'homepage', 'bottomCta', 'buttonLink', (hp.bottomCta || {}).buttonLink || '')
      );

      html += '<\\/div>';

      // ---- ABOUT TAB ----
      html += '<div id="tab-about" class="tab-pane" style="display: none;">';

      html += section('Hero Section',
        field('Title', 'about_hero_title', 'about', 'hero', 'title', (ab.hero || {}).title || '') +
        field('Description', 'about_hero_description', 'about', 'hero', 'description', (ab.hero || {}).description || '', 'textarea')
      );

      html += section('Current Focus Section',
        field('Title', 'about_focus_title', 'about', 'focus', 'title', (ab.focus || {}).title || '') +
        field('Description', 'about_focus_description', 'about', 'focus', 'description', (ab.focus || {}).description || '', 'textarea') +
        field('Highlight', 'about_focus_highlight', 'about', 'focus', 'highlight', (ab.focus || {}).highlight || '')
      );

      html += section('Mission Quote Section',
        field('Quote', 'about_mission_quote', 'about', 'mission', 'quote', (ab.mission || {}).quote || '', 'textarea') +
        field('Goal Statement', 'about_mission_goal', 'about', 'mission', 'goal', (ab.mission || {}).goal || '', 'textarea')
      );

      html += section('Bottom Call to Action',
        field('Text', 'about_bottomCta_text', 'about', 'bottomCta', 'text', (ab.bottomCta || {}).text || '', 'textarea') +
        field('Button Text', 'about_bottomCta_buttonText', 'about', 'bottomCta', 'buttonText', (ab.bottomCta || {}).buttonText || '') +
        field('Button Link', 'about_bottomCta_buttonLink', 'about', 'bottomCta', 'buttonLink', (ab.bottomCta || {}).buttonLink || '')
      );

      html += '<\\/div>';

      // ---- SETTINGS TAB ----
      html += '<div id="tab-settings" class="tab-pane" style="display: none;">';
      html += '<div style="background: #f9fafb; padding: 1.25rem; border-radius: 0.5rem;">';
      html += field('Site Name', 'siteName', 'siteSettings', 'full', 'siteName', ss.siteName || '');
      html += field('Footer Text', 'footerText', 'siteSettings', 'full', 'footerText', ss.footerText || '');
      html += '<\\/div><\\/div>';

      // Save button
      html += '<div style="margin-top: 1.5rem; text-align: right;">';
      html += '<button id="saveContentBtn" style="background: #2d5016; color: white; padding: 0.6rem 1.5rem; border: none; border-radius: 0.375rem; cursor: pointer; font-size: 1rem;">Save All Changes<\\/button>';
      html += '<div id="contentStatus" style="margin-top: 1rem;"><\\/div>';
      html += '<\\/div><\\/div>';

      container.innerHTML = html;

      // Tab switching
      container.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          const tab = btn.dataset.tab;
          container.querySelectorAll('.tab-btn').forEach(function(b) {
            b.style.background = '#e5e7eb';
            b.style.color = '#666';
          });
          btn.style.background = '#f0fdf4';
          btn.style.color = '#2d5016';
          container.querySelectorAll('.tab-pane').forEach(function(pane) {
            pane.style.display = 'none';
          });
          const activePane = document.getElementById('tab-' + tab);
          if (activePane) activePane.style.display = 'block';
        });
      });

      // Save button
      document.getElementById('saveContentBtn').addEventListener('click', async function() {
        const btn = document.getElementById('saveContentBtn');
        btn.textContent = 'Saving...';
        btn.disabled = true;
        const fields = container.querySelectorAll('.content-field');
        for (const f of fields) {
          await fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              page: f.dataset.page,
              section: f.dataset.section,
              field: f.dataset.field,
              value: f.value
            })
          });
        }
        btn.textContent = 'Save All Changes';
        btn.disabled = false;
        const statusDiv = document.getElementById('contentStatus');
        statusDiv.innerHTML = '<span style="color: green; font-weight: 600;">All content saved successfully!<\\/span>';
        setTimeout(function() { statusDiv.innerHTML = ''; }, 3000);
      });
    }

    // Initialize on page load - wrapped in DOMContentLoaded to guarantee DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
      loadPublications();
      loadBlogs();
      loadTeam();
      loadGallery();
      loadMessages();

      // Restore the active tab from the URL hash
      var validSections = ['messages', 'publications', 'blogs', 'team', 'gallery', 'content'];
      var hash = location.hash.replace('#', '');
      var initialSection = validSections.includes(hash) ? hash : 'messages';
      activateSection(initialSection);
    });
  <\/script> `], [" ", `<div style="display: flex; min-height: 100vh; background: #ffffff; padding-top: 80px;"> <!-- Sidebar --> <div style="width: 260px; background: #1a2e0a; color: white; padding: 2rem 1rem; position: fixed; height: 100vh; overflow-y: auto; top: 0;"> <h2 style="font-size: 1.1rem; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.2);">CERD-UG Admin</h2> <nav style="display: flex; flex-direction: column; gap: 0.5rem;"> <button class="nav-btn" data-section="messages" style="background: #dc2626; color: white; padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem; display: flex; justify-content: space-between; align-items: center;">
Messages
<span id="unreadBadge" style="background: white; color: #dc2626; padding: 0.2rem 0.5rem; border-radius: 1rem; font-size: 0.7rem; font-weight: bold;">0</span> </button> <button class="nav-btn" data-section="publications" style="background: transparent; color: rgba(255,255,255,0.8); padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem;">Publications</button> <button class="nav-btn" data-section="blogs" style="background: transparent; color: rgba(255,255,255,0.8); padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem;">Blog Posts</button> <button class="nav-btn" data-section="team" style="background: transparent; color: rgba(255,255,255,0.8); padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem;">Team Members</button> <button class="nav-btn" data-section="gallery" style="background: transparent; color: rgba(255,255,255,0.8); padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem;">Gallery Images</button> <button class="nav-btn" data-section="content" style="background: transparent; color: rgba(255,255,255,0.8); padding: 0.75rem 1rem; text-align: left; cursor: pointer; border: none; border-radius: 0.5rem; font-size: 0.9rem;">Page Content</button> <a href="/api/logout" style="display: block; color: rgba(255,255,255,0.6); text-decoration: none; padding: 0.75rem 1rem; margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.2);">Logout</a> </nav> </div> <!-- Main Content --> <div style="flex: 1; margin-left: 260px; padding: 2rem;"> <!-- MESSAGES SECTION --> <div id="messages-section" class="admin-section" style="display: none;"> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;"> <h2 style="font-size: 1.5rem; color: #1a2e0a;">Contact Messages</h2> <button onclick="markAllAsRead()" style="background: #6b8f47; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; cursor: pointer;">Mark All as Read</button> </div> <div style="margin-bottom: 1.5rem;"> <input type="text" id="messageSearchInput" placeholder="Search messages..." style="width: 100%; max-width: 400px; padding: 0.6rem 1rem; border: 1px solid #ddd; border-radius: 0.5rem;" onkeyup="filterMessages()"> </div> <div style="background: white; border-radius: 0.75rem; overflow: hidden; border: 1px solid #e5e7eb;"> <table style="width: 100%; border-collapse: collapse;"> <thead style="background: #2d5016;"> <tr><th style="padding: 1rem; text-align: left; color: white;">Status</th><th style="padding: 1rem; text-align: left; color: white;">Name / Email</th><th style="padding: 1rem; text-align: left; color: white;">Message</th><th style="padding: 1rem; text-align: left; color: white;">Date</th><th style="padding: 1rem; text-align: left; color: white;">Actions</th></tr> </thead> <tbody id="messagesList"><tr><td colspan="5" style="padding: 2rem; text-align: center; color: #999;">Loading messages...</td></tr></tbody> </table> </div> </div> <!-- PUBLICATIONS SECTION --> <div id="publications-section" class="admin-section" style="display: none;"> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;"> <h2 style="font-size: 1.5rem; color: #1a2e0a;">Manage Publications</h2> <button onclick="toggleUploadForm()" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">+ Upload PDF</button> </div> <div style="margin-bottom: 1.5rem;"> <input type="text" id="pubSearchInput" placeholder="Search publications..." style="width: 100%; max-width: 400px; padding: 0.6rem 1rem; border: 1px solid #ddd; border-radius: 0.5rem;" onkeyup="filterPublications()"> </div> <div id="uploadForm" style="display: none; background: white; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; border: 1px solid #ddd;"> <h3>Upload New Publication (PDF only)</h3> <form id="publicationForm" enctype="multipart/form-data"> <div style="margin-bottom: 1rem;"><label>Select PDF File *</label><input type="file" name="file" accept=".pdf" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="display: flex; gap: 1rem;"><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Upload</button><button type="button" onclick="toggleUploadForm()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button></div> </form> <div id="uploadStatus" style="margin-top: 1rem;"></div> </div> <div style="background: white; border-radius: 0.75rem; overflow: hidden; border: 1px solid #e5e7eb;"> <table style="width: 100%; border-collapse: collapse;"> <thead style="background: #2d5016;"><tr><th style="padding: 1rem; text-align: left; color: white;">Title</th><th style="padding: 1rem; text-align: left; color: white;">Date</th><th style="padding: 1rem; text-align: left; color: white;">Actions</th></tr></thead> <tbody id="publicationsList"><tr><td colspan="3" style="padding: 2rem; text-align: center; color: #999;">Loading publications...</td></tr></tbody> </table> </div> </div> <!-- BLOG POSTS SECTION --> <div id="blogs-section" class="admin-section" style="display: none;"> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;"> <h2 style="font-size: 1.5rem; color: #1a2e0a;">Manage Blog Posts</h2> <button onclick="toggleBlogForm()" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">+ Add Blog Post</button> </div> <div style="margin-bottom: 1.5rem;"> <input type="text" id="blogSearchInput" placeholder="Search blog posts..." style="width: 100%; max-width: 400px; padding: 0.6rem 1rem; border: 1px solid #ddd; border-radius: 0.5rem;" onkeyup="filterBlogs()"> </div> <div id="blogForm" style="display: none; background: white; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; border: 1px solid #ddd;"> <h3>Add New Blog Post</h3> <div style="background: #f0fdf4; padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem;"><strong>Tip:</strong> You can paste from Word or use HTML tags: &lt;b&gt;bold&lt;/b&gt;, &lt;i&gt;italic&lt;/i&gt;</div> <form id="blogFormSubmit" enctype="multipart/form-data"> <div style="margin-bottom: 1rem;"><label>Title *</label><input type="text" name="title" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Featured Image</label><input type="file" name="image" accept="image/*" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Abstract / Summary</label><textarea name="abstract" rows="2" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></textarea></div> <div style="margin-bottom: 1rem;"> <div style="margin-bottom: 0.5rem; display: flex; gap: 0.25rem; flex-wrap: wrap;"> <button type="button" onclick="insertFormatting('b')" style="background: #f0f0f0; border: 1px solid #ddd; padding: 0.3rem 0.6rem; border-radius: 0.25rem;">Bold</button> <button type="button" onclick="insertFormatting('i')" style="background: #f0f0f0; border: 1px solid #ddd; padding: 0.3rem 0.6rem; border-radius: 0.25rem;">Italic</button> <button type="button" onclick="insertFormatting('ul')" style="background: #f0f0f0; border: 1px solid #ddd; padding: 0.3rem 0.6rem; border-radius: 0.25rem;">Bullet List</button> </div> <textarea id="blogContent" name="content" rows="12" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem; font-family: monospace;"></textarea> </div> <div style="display: flex; gap: 1rem;"><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Publish</button><button type="button" onclick="toggleBlogForm()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button></div> </form> <div id="blogStatus"></div> </div> <div style="background: white; border-radius: 0.75rem; overflow: hidden; border: 1px solid #e5e7eb;"> <table style="width: 100%; border-collapse: collapse;"> <thead style="background: #2d5016;"><tr><th style="padding: 1rem; text-align: left; color: white;">Title</th><th style="padding: 1rem; text-align: left; color: white;">Date</th><th style="padding: 1rem; text-align: left; color: white;">Image</th><th style="padding: 1rem; text-align: left; color: white;">Actions</th></tr></thead> <tbody id="blogsList"><tr><td colspan="4" style="padding: 2rem; text-align: center; color: #999;">Loading blog posts...</td></tr></tbody> </table> </div> </div> <!-- TEAM MEMBERS SECTION --> <div id="team-section" class="admin-section" style="display: none;"> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;"> <h2 style="font-size: 1.5rem; color: #1a2e0a;">Manage Team Members</h2> <button onclick="toggleTeamForm()" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">+ Add Team Member</button> </div> <div id="teamForm" style="display: none; background: white; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; border: 1px solid #ddd;"> <h3>Add New Team Member</h3> <form id="teamFormSubmit" enctype="multipart/form-data"> <div style="margin-bottom: 1rem;"><label>Name *</label><input type="text" name="name" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Role *</label><input type="text" name="role" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Bio</label><textarea name="bio" rows="3" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></textarea></div> <div style="margin-bottom: 1rem;"><label>Profile Image</label><input type="file" name="image" accept="image/*" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="display: flex; gap: 1rem;"><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Add Member</button><button type="button" onclick="toggleTeamForm()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button></div> </form> <div id="teamStatus"></div> </div> <div style="background: white; border-radius: 0.75rem; overflow-x: auto; border: 1px solid #e5e7eb;"> <table style="width: 100%; border-collapse: collapse;"> <thead style="background: #2d5016;"><tr><th style="padding: 1rem; text-align: left; color: white;">Image</th><th style="padding: 1rem; text-align: left; color: white;">Name</th><th style="padding: 1rem; text-align: left; color: white;">Role</th><th style="padding: 1rem; text-align: left; color: white;">Actions</th></tr></thead> <tbody id="teamList"><tr><td colspan="4" style="padding: 2rem; text-align: center; color: #999;">Loading team members...</td></tr></tbody> </table> </div> </div> <!-- GALLERY SECTION --> <div id="gallery-section" class="admin-section" style="display: none;"> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;"> <h2 style="font-size: 1.5rem; color: #1a2e0a;">Manage Gallery Images</h2> <button onclick="toggleGalleryForm()" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">+ Add Image</button> </div> <div id="galleryForm" style="display: none; background: white; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; border: 1px solid #ddd;"> <h3>Add New Gallery Image</h3> <form id="galleryFormSubmit" enctype="multipart/form-data"> <div style="margin-bottom: 1rem;"><label>Image File *</label><input type="file" name="image" accept="image/*" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Alt Text</label><input type="text" name="alt" placeholder="Describe the image" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="display: flex; gap: 1rem;"><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Add Image</button><button type="button" onclick="toggleGalleryForm()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button></div> </form> <div id="galleryStatus"></div> </div> <div id="galleryGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;"><div style="padding: 2rem; text-align: center; color: #999;">Loading gallery images...</div></div> </div> <!-- PAGE CONTENT SECTION --> <div id="content-section" class="admin-section" style="display: none;"> <h2 style="font-size: 1.5rem; color: #1a2e0a; margin-bottom: 1.5rem;">Edit Page Content</h2> <div id="pageContentEditor"></div> </div> </div> </div>  <div id="editTeamModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;"> <div style="background: white; border-radius: 0.75rem; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 2rem;"> <h3>Edit Team Member</h3> <form id="editTeamForm" enctype="multipart/form-data"> <input type="hidden" name="id" id="edit_team_id"> <div style="margin-bottom: 1rem;"><label>Name *</label><input type="text" name="name" id="edit_team_name" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Role *</label><input type="text" name="role" id="edit_team_role" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Bio</label><textarea name="bio" id="edit_team_bio" rows="3" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></textarea></div> <div style="margin-bottom: 1rem;"> <div id="edit_team_current_image" style="margin-bottom: 0.5rem;"></div> <label>Upload New Image</label><input type="file" name="image" accept="image/*" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"> <input type="hidden" name="existingImage" id="edit_team_existing_image"> </div> <div style="display: flex; gap: 1rem; justify-content: flex-end;"><button type="button" onclick="closeEditTeamModal()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Save Changes</button></div> </form> </div> </div>  <div id="editBlogModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;"> <div style="background: white; border-radius: 0.75rem; max-width: 700px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 2rem;"> <h3>Edit Blog Post</h3> <form id="editBlogForm" enctype="multipart/form-data"> <input type="hidden" name="id" id="edit_blog_id"> <div style="margin-bottom: 1rem;"><label>Title *</label><input type="text" name="title" id="edit_blog_title" required style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></div> <div style="margin-bottom: 1rem;"><label>Abstract</label><textarea name="abstract" id="edit_blog_abstract" rows="2" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"></textarea></div> <div style="margin-bottom: 1rem;"><label>Content</label><textarea name="content" id="edit_blog_content" rows="12" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem; font-family: monospace;"></textarea></div> <div style="margin-bottom: 1rem;"> <div id="edit_blog_current_image" style="margin-bottom: 0.5rem;"></div> <label>Upload New Image</label><input type="file" name="image" accept="image/*" style="width: 100%; padding: 0.6rem; border: 1px solid #ddd; border-radius: 0.375rem;"> <input type="hidden" name="existingImage" id="edit_blog_existing_image"> </div> <div style="display: flex; gap: 1rem; justify-content: flex-end;"><button type="button" onclick="closeEditModal()" style="background: #999; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Cancel</button><button type="submit" style="background: #2d5016; color: white; padding: 0.6rem 1.2rem; border: none; border-radius: 0.375rem; cursor: pointer;">Save Changes</button></div> </form> </div> </div>  <script>
    let allPublications = [];
    let allBlogs = [];
    let allMessages = [];
    let allTeam = [];
    let allGallery = [];

    function escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/[&<>"']/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        if (m === '"') return '&quot;';
        if (m === "'") return '&#39;';
        return m;
      });
    }

    // Rich text formatting
    function insertFormatting(type) {
      const textarea = document.getElementById('blogContent');
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = textarea.value.substring(start, end);
      let insert = '';
      if (type === 'b') insert = '<b>' + (selected || 'bold text') + '<\\\\/b>';
      else if (type === 'i') insert = '<i>' + (selected || 'italic text') + '<\\\\/i>';
      else if (type === 'ul') insert = '\\\\n<ul>\\\\n  <li>' + (selected || 'list item') + '<\\\\/li>\\\\n<\\\\/ul>\\\\n';
      else return;
      textarea.value = textarea.value.substring(0, start) + insert + textarea.value.substring(end);
      textarea.focus();
    }

    // Navigation between sections
    function activateSection(section) {
      document.querySelectorAll('.nav-btn').forEach(function(b) {
        b.style.background = 'transparent';
        b.style.color = 'rgba(255,255,255,0.8)';
      });
      var activeBtn = document.querySelector('.nav-btn[data-section="' + section + '"]');
      if (activeBtn) {
        activeBtn.style.background = '#6b8f47';
        activeBtn.style.color = 'white';
      }
      document.querySelectorAll('.admin-section').forEach(function(s) { s.style.display = 'none'; });
      var target = document.getElementById(section + '-section');
      if (target) target.style.display = 'block';
      if (section === 'messages') loadMessages();
      if (section === 'team') loadTeam();
      if (section === 'gallery') loadGallery();
      if (section === 'content') loadPageContentEditor();
      location.hash = section;
    }

    document.querySelectorAll('.nav-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        activateSection(btn.dataset.section);
      });
    });

    // ========== MESSAGES ==========
    async function loadMessages() {
      const res = await fetch('/api/contact');
      allMessages = await res.json();
      const unreadCount = allMessages.filter(function(m) { return !m.read; }).length;
      const badge = document.getElementById('unreadBadge');
      if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
      }
      const tbody = document.getElementById('messagesList');
      if (allMessages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="padding: 2rem; text-align: center; color: #999;">No messages.<\\\\/td><\\\\/tr>';
        return;
      }
      let html = '';
      for (const m of allMessages) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;' + (!m.read ? 'background: #f0fdf4;' : '') + '">';
        html += '<td style="padding: 1rem;">' + (!m.read ? '<span style="background: #dc2626; color: white; padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-size: 0.7rem;">New<\\\\/span>' : '<span style="color: #999;">Read<\\\\/span>') + '<\\\\/td>';
        html += '<td style="padding: 1rem;"><strong>' + escapeHtml(m.name) + '<\\\\/strong><br><span style="font-size: 0.8rem; color: #666;">' + escapeHtml(m.email) + '<\\\\/span><\\\\/td>';
        html += '<td style="padding: 1rem;">' + escapeHtml(m.message.substring(0, 150)) + (m.message.length > 150 ? '...' : '') + '<\\\\/td>';
        html += '<td style="padding: 1rem; color: #6b7280;">' + m.date + '<\\\\/td>';
        html += '<td style="padding: 1rem;"><button onclick="markAsRead(' + m.id + ')" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; font-size: 0.75rem; margin-right: 0.5rem;">Mark Read<\\\\/button><button onclick="deleteMessage(' + m.id + ')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; font-size: 0.75rem;">Delete<\\\\/button><\\\\/td>';
        html += '<\\\\/tr>';
      }
      tbody.innerHTML = html;
    }

    window.markAsRead = async function(id) {
      await fetch('/api/contact', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) });
      loadMessages();
    }

    window.markAllAsRead = async function() {
      for (const m of allMessages.filter(function(m) { return !m.read; })) {
        await fetch('/api/contact', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: m.id }) });
      }
      loadMessages();
    }

    window.deleteMessage = async function(id) {
      if (confirm('Delete this message?')) {
        await fetch('/api/contact?id=' + id, { method: 'DELETE' });
        loadMessages();
      }
    }

    window.filterMessages = function() {
      const term = document.getElementById('messageSearchInput').value.toLowerCase();
      const filtered = allMessages.filter(function(m) { return m.name.toLowerCase().includes(term) || m.email.toLowerCase().includes(term) || m.message.toLowerCase().includes(term); });
      const tbody = document.getElementById('messagesList');
      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="padding: 2rem; text-align: center; color: #999;">No messages found.<\\\\/td><\\\\/tr>';
        return;
      }
      let html = '';
      for (const m of filtered) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;' + (!m.read ? 'background: #f0fdf4;' : '') + '">';
        html += '<td style="padding: 1rem;">' + (!m.read ? '<span style="background: #dc2626; color: white; padding: 0.2rem 0.5rem; border-radius: 0.25rem;">New<\\\\/span>' : 'Read') + '<\\\\/td>';
        html += '<td style="padding: 1rem;"><strong>' + escapeHtml(m.name) + '<\\\\/strong><br>' + escapeHtml(m.email) + '<\\\\/td>';
        html += '<td style="padding: 1rem;">' + escapeHtml(m.message.substring(0, 150)) + '<\\\\/td>';
        html += '<td style="padding: 1rem;">' + m.date + '<\\\\/td>';
        html += '<td style="padding: 1rem;"><button onclick="markAsRead(' + m.id + ')" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem;">Mark Read<\\\\/button><button onclick="deleteMessage(' + m.id + ')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-left: 0.5rem;">Delete<\\\\/button><\\\\/td>';
        html += '<\\\\/tr>';
      }
      tbody.innerHTML = html;
    }

    // ========== PUBLICATIONS ==========
    async function loadPublications() {
      const res = await fetch('/api/publications');
      allPublications = await res.json();
      const tbody = document.getElementById('publicationsList');
      if (allPublications.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="padding: 2rem; text-align: center; color: #999;">No publications.<\\\\/td><\\\\/tr>';
        return;
      }
      let html = '';
      for (const p of allPublications) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;">';
        html += '<td style="padding: 1rem;">' + escapeHtml(p.title) + '<\\\\/td>';
        html += '<td style="padding: 1rem;">' + p.date + '<\\\\/td>';
        html += '<td style="padding: 1rem;"><a href="' + p.file + '" target="_blank" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; text-decoration: none; border-radius: 0.375rem; margin-right: 0.5rem;">View<\\\\/a><button onclick="deletePublication(\\\\'' + escapeHtml(p.fileName) + '\\\\')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem;">Delete<\\\\/button><\\\\/td>';
        html += '<\\\\/tr>';
      }
      tbody.innerHTML = html;
    }

    window.deletePublication = async function(fileName) {
      if (confirm('Delete this publication?')) {
        await fetch('/api/publications?fileName=' + encodeURIComponent(fileName), { method: 'DELETE' });
        loadPublications();
      }
    }

    window.filterPublications = function() {
      const term = document.getElementById('pubSearchInput').value.toLowerCase();
      const filtered = allPublications.filter(function(p) { return p.title.toLowerCase().includes(term); });
      const tbody = document.getElementById('publicationsList');
      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="padding: 2rem; text-align: center; color: #999;">No publications found.<\\\\/td><\\\\/tr>';
        return;
      }
      let html = '';
      for (const p of filtered) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 1rem;">' + escapeHtml(p.title) + '<\\\\/td><td style="padding: 1rem;">' + p.date + '<\\\\/td><td style="padding: 1rem;"><a href="' + p.file + '" target="_blank" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; text-decoration: none; border-radius: 0.375rem;">View<\\\\/a><button onclick="deletePublication(\\\\'' + escapeHtml(p.fileName) + '\\\\')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-left: 0.5rem;">Delete<\\\\/button><\\\\/td><\\\\/tr>';
      }
      tbody.innerHTML = html;
    }

    // ========== BLOGS ==========
    async function loadBlogs() {
      const res = await fetch('/api/blogs');
      allBlogs = await res.json();
      const tbody = document.getElementById('blogsList');
      if (allBlogs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="padding: 2rem; text-align: center; color: #999;">No blog posts.<\\\\/td><\\\\/tr>';
        return;
      }
      let html = '';
      for (const b of allBlogs) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;">';
        html += '<td style="padding: 1rem;">' + escapeHtml(b.title) + '<div style="font-size: 0.75rem; color: #666;">' + escapeHtml((b.abstract || '').substring(0, 80)) + '...<\\\\/div><\\\\/td>';
        html += '<td style="padding: 1rem;">' + b.date + '<\\\\/td>';
        html += '<td style="padding: 1rem;">' + (b.image ? '<img src="' + b.image + '" style="width: 50px; height: 50px; object-fit: cover; border-radius: 0.25rem;" \\\\/>' : 'No image') + '<\\\\/td>';
        html += '<td style="padding: 1rem;"><a href="/blog/' + b.slug + '" target="_blank" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; text-decoration: none; border-radius: 0.375rem; margin-right: 0.5rem;">View<\\\\/a><button onclick="editBlog(' + b.id + ')" style="background: #f59e0b; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-right: 0.5rem;">Edit<\\\\/button><button onclick="deleteBlog(' + b.id + ')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem;">Delete<\\\\/button><\\\\/td>';
        html += '<\\\\/tr>';
      }
      tbody.innerHTML = html;
    }

    window.deleteBlog = async function(id) {
      if (confirm('Delete this blog post?')) {
        await fetch('/api/blogs?id=' + id, { method: 'DELETE' });
        loadBlogs();
      }
    }

    window.filterBlogs = function() {
      const term = document.getElementById('blogSearchInput').value.toLowerCase();
      const filtered = allBlogs.filter(function(b) { return b.title.toLowerCase().includes(term); });
      const tbody = document.getElementById('blogsList');
      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="padding: 2rem; text-align: center; color: #999;">No blog posts found.<\\\\/td><\\\\/tr>';
        return;
      }
      let html = '';
      for (const b of filtered) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 1rem;">' + escapeHtml(b.title) + '<div style="font-size: 0.75rem; color: #666;">' + escapeHtml((b.abstract || '').substring(0, 80)) + '...<\\\\/div><\\\\/td><td style="padding: 1rem;">' + b.date + '<\\\\/td><td style="padding: 1rem;">' + (b.image ? '<img src="' + b.image + '" style="width: 50px; height: 50px; object-fit: cover; border-radius: 0.25rem;" \\\\/>' : 'No image') + '<\\\\/td><td style="padding: 1rem;"><a href="/blog/' + b.slug + '" target="_blank" style="background: #6b8f47; color: white; padding: 0.375rem 0.75rem; text-decoration: none; border-radius: 0.375rem;">View<\\\\/a><button onclick="editBlog(' + b.id + ')" style="background: #f59e0b; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-left: 0.5rem;">Edit<\\\\/button><button onclick="deleteBlog(' + b.id + ')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-left: 0.5rem;">Delete<\\\\/button><\\\\/td><\\\\/tr>';
      }
      tbody.innerHTML = html;
    }

    window.editBlog = function(id) {
      const blog = allBlogs.find(function(b) { return b.id === id; });
      if (!blog) return;
      document.getElementById('edit_blog_id').value = blog.id;
      document.getElementById('edit_blog_title').value = blog.title;
      document.getElementById('edit_blog_abstract').value = blog.abstract || '';
      document.getElementById('edit_blog_content').value = blog.content;
      document.getElementById('edit_blog_existing_image').value = blog.image || '';
      const imgDiv = document.getElementById('edit_blog_current_image');
      if (imgDiv) imgDiv.innerHTML = blog.image ? '<img src="' + blog.image + '" style="max-width: 100px; border-radius: 0.375rem;" \\\\/>' : 'No image';
      document.getElementById('editBlogModal').style.display = 'flex';
    };

    window.closeEditModal = function() {
      document.getElementById('editBlogModal').style.display = 'none';
    };

    // ========== TEAM ==========
    async function loadTeam() {
      const res = await fetch('/api/team');
      allTeam = await res.json();
      const tbody = document.getElementById('teamList');
      if (allTeam.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="padding: 2rem; text-align: center; color: #999;">No team members.<\\\\/td><\\\\/tr>';
        return;
      }
      let html = '';
      for (const m of allTeam) {
        html += '<tr style="border-bottom: 1px solid #e5e7eb;">';
        html += '<td style="padding: 1rem;">' + (m.image ? '<img src="' + m.image + '" style="width: 50px; height: 50px; object-fit: cover; border-radius: 0.25rem;" \\\\/>' : 'No image') + '<\\\\/td>';
        html += '<td style="padding: 1rem;"><strong>' + escapeHtml(m.name) + '<\\\\/strong><\\\\/td>';
        html += '<td style="padding: 1rem;">' + escapeHtml(m.role) + '<\\\\/td>';
        html += '<td style="padding: 1rem;"><button onclick="editTeam(' + m.id + ')" style="background: #f59e0b; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem; margin-right: 0.5rem;">Edit<\\\\/button><button onclick="deleteTeam(' + m.id + ')" style="background: #dc2626; color: white; padding: 0.375rem 0.75rem; border: none; border-radius: 0.375rem;">Delete<\\\\/button><\\\\/td>';
        html += '<\\\\/tr>';
      }
      tbody.innerHTML = html;
    }

    window.deleteTeam = async function(id) {
      if (confirm('Delete this team member?')) {
        await fetch('/api/team?id=' + id, { method: 'DELETE' });
        loadTeam();
      }
    }

    window.editTeam = function(id) {
      const member = allTeam.find(function(m) { return m.id === id; });
      if (!member) return;
      document.getElementById('edit_team_id').value = member.id;
      document.getElementById('edit_team_name').value = member.name;
      document.getElementById('edit_team_role').value = member.role;
      document.getElementById('edit_team_bio').value = member.bio || '';
      document.getElementById('edit_team_existing_image').value = member.image || '';
      const imgDiv = document.getElementById('edit_team_current_image');
      imgDiv.innerHTML = member.image ? '<img src="' + member.image + '" style="max-width: 100px; border-radius: 0.375rem;" \\\\/>' : 'No image';
      document.getElementById('editTeamModal').style.display = 'flex';
    }

    window.closeEditTeamModal = function() {
      document.getElementById('editTeamModal').style.display = 'none';
    }

    // ========== GALLERY ==========
    async function loadGallery() {
      const res = await fetch('/api/gallery');
      allGallery = await res.json();
      const container = document.getElementById('galleryGrid');
      if (allGallery.length === 0) {
        container.innerHTML = '<div style="padding: 2rem; text-align: center; color: #999;">No gallery images.<\\\\/div>';
        return;
      }
      let html = '';
      for (const img of allGallery) {
        html += '<div style="background: white; border-radius: 0.5rem; overflow: hidden; border: 1px solid #e5e7eb;">';
        html += '<img src="' + img.image + '" style="width: 100%; aspect-ratio: 1; object-fit: cover;" \\\\/>';
        html += '<div style="padding: 0.5rem;">';
        html += '<p style="font-size: 0.75rem; color: #666; margin-bottom: 0.5rem;">' + escapeHtml(img.alt) + '<\\\\/p>';
        html += '<button onclick="deleteGalleryImage(' + img.id + ')" style="background: #dc2626; color: white; padding: 0.25rem 0.5rem; border: none; border-radius: 0.25rem; width: 100%; cursor: pointer;">Delete<\\\\/button>';
        html += '<\\\\/div><\\\\/div>';
      }
      container.innerHTML = html;
    }

    window.deleteGalleryImage = async function(id) {
      if (confirm('Delete this image?')) {
        await fetch('/api/gallery?id=' + id, { method: 'DELETE' });
        loadGallery();
      }
    }

    // ========== FORM SUBMISSIONS ==========
    const pubForm = document.getElementById('publicationForm');
    if (pubForm) {
      pubForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/publications', { method: 'POST', body: fd });
        if (res.ok) {
          alert('Publication added successfully!');
          e.target.reset();
          document.getElementById('uploadForm').style.display = 'none';
          loadPublications();
        }
      });
    }

    const blogSubmit = document.getElementById('blogFormSubmit');
    if (blogSubmit) {
      blogSubmit.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/blogs', { method: 'POST', body: fd });
        if (res.ok) {
          alert('Blog post published successfully!');
          e.target.reset();
          document.getElementById('blogForm').style.display = 'none';
          loadBlogs();
        }
      });
    }

    const teamSubmit = document.getElementById('teamFormSubmit');
    if (teamSubmit) {
      teamSubmit.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/team', { method: 'POST', body: fd });
        if (res.ok) {
          alert('Team member added successfully!');
          e.target.reset();
          document.getElementById('teamForm').style.display = 'none';
          loadTeam();
        }
      });
    }

    const editTeamForm = document.getElementById('editTeamForm');
    if (editTeamForm) {
      editTeamForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/team', { method: 'PUT', body: fd });
        if (res.ok) {
          alert('Team member updated successfully!');
          closeEditTeamModal();
          loadTeam();
        }
      });
    }

    const gallerySubmit = document.getElementById('galleryFormSubmit');
    if (gallerySubmit) {
      gallerySubmit.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/gallery', { method: 'POST', body: fd });
        if (res.ok) {
          alert('Image added successfully!');
          e.target.reset();
          document.getElementById('galleryForm').style.display = 'none';
          loadGallery();
        }
      });
    }

    const editBlogForm = document.getElementById('editBlogForm');
    if (editBlogForm) {
      editBlogForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const res = await fetch('/api/blogs', { method: 'PUT', body: fd });
        if (res.ok) {
          alert('Blog updated!');
          closeEditModal();
          loadBlogs();
        }
      });
    }

    // ========== TOGGLE FUNCTIONS ==========
    function toggleUploadForm() {
      const f = document.getElementById('uploadForm');
      if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    }
    function toggleBlogForm() {
      const f = document.getElementById('blogForm');
      if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    }
    function toggleTeamForm() {
      const f = document.getElementById('teamForm');
      if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    }
    function toggleGalleryForm() {
      const f = document.getElementById('galleryForm');
      if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
    }

    window.toggleUploadForm = toggleUploadForm;
    window.toggleBlogForm = toggleBlogForm;
    window.toggleTeamForm = toggleTeamForm;
    window.toggleGalleryForm = toggleGalleryForm;
    window.insertFormatting = insertFormatting;

    // ========== PAGE CONTENT EDITOR ==========
    let contentEditorLoaded = false;

    async function loadPageContentEditor() {
      // Only build the editor once
      if (contentEditorLoaded) return;
      contentEditorLoaded = true;

      const container = document.getElementById('pageContentEditor');
      if (!container) return;

      container.innerHTML = '<p style="color: #666; padding: 1rem;">Loading content...</p>';

      const response = await fetch('/api/content');
      const c = await response.json();

      const hp = c.homepage || {};
      const ab = c.about || {};
      const ss = c.siteSettings || {};

      function field(label, id, page, section, fieldName, value, type) {
        if (type === 'textarea') {
          return '<div class="field-group"><label>' + label + '<\\\\/label><textarea id="' + id + '" class="content-field" data-page="' + page + '" data-section="' + section + '" data-field="' + fieldName + '" rows="3">' + escapeHtml(value) + '<\\\\/textarea><\\\\/div>';
        }
        return '<div class="field-group"><label>' + label + '<\\\\/label><input type="text" id="' + id + '" class="content-field" data-page="' + page + '" data-section="' + section + '" data-field="' + fieldName + '" value="' + escapeHtml(value) + '"><\\\\/div>';
      }

      function section(title, fields) {
        return '<div style="background: #f9fafb; padding: 1.25rem; margin-bottom: 1.5rem; border-radius: 0.5rem;"><h3 style="color: #2d5016; margin-bottom: 1rem;">' + title + '<\\\\/h3>' + fields + '<\\\\/div>';
      }

      let html = '<div style="background: white; border-radius: 0.75rem; padding: 1.5rem;">';

      // Tab buttons
      html += '<div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid #ddd; padding-bottom: 1rem; flex-wrap: wrap;">';
      html += '<button class="tab-btn" data-tab="homepage" style="background: #f0fdf4; color: #2d5016;">Homepage<\\\\/button>';
      html += '<button class="tab-btn" data-tab="about" style="background: #e5e7eb; color: #666;">About Us<\\\\/button>';
      html += '<button class="tab-btn" data-tab="settings" style="background: #e5e7eb; color: #666;">Site Settings<\\\\/button>';
      html += '<\\\\/div>';

      // ---- HOMEPAGE TAB ----
      html += '<div id="tab-homepage" class="tab-pane">';

      html += section('Hero Section',
        field('Badge', 'hero_badge', 'homepage', 'hero', 'badge', (hp.hero || {}).badge || '') +
        field('Title', 'hero_title', 'homepage', 'hero', 'title', (hp.hero || {}).title || '') +
        field('Subtitle', 'hero_subtitle', 'homepage', 'hero', 'subtitle', (hp.hero || {}).subtitle || '', 'textarea') +
        field('Button Text', 'hero_buttonText', 'homepage', 'hero', 'buttonText', (hp.hero || {}).buttonText || '') +
        field('Hero Image URL', 'hero_image', 'homepage', 'hero', 'image', (hp.hero || {}).image || '')
      );

      html += section('Mission & Goal Section',
        field('Title', 'mission_title', 'homepage', 'mission', 'title', (hp.mission || {}).title || '') +
        field('Description', 'mission_description', 'homepage', 'mission', 'description', (hp.mission || {}).description || '', 'textarea') +
        field('Goal', 'mission_goal', 'homepage', 'mission', 'goal', (hp.mission || {}).goal || '', 'textarea')
      );

      html += section('Vision Section',
        field('Vision Quote', 'vision_quote', 'homepage', 'vision', 'quote', (hp.vision || {}).quote || '', 'textarea')
      );

      html += section('Impact Section',
        field('Title', 'impact_title', 'homepage', 'impact', 'title', (hp.impact || {}).title || '') +
        field('Description', 'impact_description', 'homepage', 'impact', 'description', (hp.impact || {}).description || '', 'textarea') +
        field('Vision Statement', 'impact_vision', 'homepage', 'impact', 'vision', (hp.impact || {}).vision || '', 'textarea')
      );

      html += section('Producers Section',
        field('Title', 'producers_title', 'homepage', 'producers', 'title', (hp.producers || {}).title || '') +
        field('Description', 'producers_description', 'homepage', 'producers', 'description', (hp.producers || {}).description || '', 'textarea') +
        field('Background Image URL', 'producers_image', 'homepage', 'producers', 'image', (hp.producers || {}).image || '')
      );

      html += section('Recent Works Section',
        field('Title', 'recentWorks_title', 'homepage', 'recentWorks', 'title', (hp.recentWorks || {}).title || '') +
        field('Subtitle', 'recentWorks_subtitle', 'homepage', 'recentWorks', 'subtitle', (hp.recentWorks || {}).subtitle || '', 'textarea')
      );

      html += section('Bottom Call to Action',
        field('Text', 'bottomCta_text', 'homepage', 'bottomCta', 'text', (hp.bottomCta || {}).text || '', 'textarea') +
        field('Button Text', 'bottomCta_buttonText', 'homepage', 'bottomCta', 'buttonText', (hp.bottomCta || {}).buttonText || '') +
        field('Button Link', 'bottomCta_buttonLink', 'homepage', 'bottomCta', 'buttonLink', (hp.bottomCta || {}).buttonLink || '')
      );

      html += '<\\\\/div>';

      // ---- ABOUT TAB ----
      html += '<div id="tab-about" class="tab-pane" style="display: none;">';

      html += section('Hero Section',
        field('Title', 'about_hero_title', 'about', 'hero', 'title', (ab.hero || {}).title || '') +
        field('Description', 'about_hero_description', 'about', 'hero', 'description', (ab.hero || {}).description || '', 'textarea')
      );

      html += section('Current Focus Section',
        field('Title', 'about_focus_title', 'about', 'focus', 'title', (ab.focus || {}).title || '') +
        field('Description', 'about_focus_description', 'about', 'focus', 'description', (ab.focus || {}).description || '', 'textarea') +
        field('Highlight', 'about_focus_highlight', 'about', 'focus', 'highlight', (ab.focus || {}).highlight || '')
      );

      html += section('Mission Quote Section',
        field('Quote', 'about_mission_quote', 'about', 'mission', 'quote', (ab.mission || {}).quote || '', 'textarea') +
        field('Goal Statement', 'about_mission_goal', 'about', 'mission', 'goal', (ab.mission || {}).goal || '', 'textarea')
      );

      html += section('Bottom Call to Action',
        field('Text', 'about_bottomCta_text', 'about', 'bottomCta', 'text', (ab.bottomCta || {}).text || '', 'textarea') +
        field('Button Text', 'about_bottomCta_buttonText', 'about', 'bottomCta', 'buttonText', (ab.bottomCta || {}).buttonText || '') +
        field('Button Link', 'about_bottomCta_buttonLink', 'about', 'bottomCta', 'buttonLink', (ab.bottomCta || {}).buttonLink || '')
      );

      html += '<\\\\/div>';

      // ---- SETTINGS TAB ----
      html += '<div id="tab-settings" class="tab-pane" style="display: none;">';
      html += '<div style="background: #f9fafb; padding: 1.25rem; border-radius: 0.5rem;">';
      html += field('Site Name', 'siteName', 'siteSettings', 'full', 'siteName', ss.siteName || '');
      html += field('Footer Text', 'footerText', 'siteSettings', 'full', 'footerText', ss.footerText || '');
      html += '<\\\\/div><\\\\/div>';

      // Save button
      html += '<div style="margin-top: 1.5rem; text-align: right;">';
      html += '<button id="saveContentBtn" style="background: #2d5016; color: white; padding: 0.6rem 1.5rem; border: none; border-radius: 0.375rem; cursor: pointer; font-size: 1rem;">Save All Changes<\\\\/button>';
      html += '<div id="contentStatus" style="margin-top: 1rem;"><\\\\/div>';
      html += '<\\\\/div><\\\\/div>';

      container.innerHTML = html;

      // Tab switching
      container.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          const tab = btn.dataset.tab;
          container.querySelectorAll('.tab-btn').forEach(function(b) {
            b.style.background = '#e5e7eb';
            b.style.color = '#666';
          });
          btn.style.background = '#f0fdf4';
          btn.style.color = '#2d5016';
          container.querySelectorAll('.tab-pane').forEach(function(pane) {
            pane.style.display = 'none';
          });
          const activePane = document.getElementById('tab-' + tab);
          if (activePane) activePane.style.display = 'block';
        });
      });

      // Save button
      document.getElementById('saveContentBtn').addEventListener('click', async function() {
        const btn = document.getElementById('saveContentBtn');
        btn.textContent = 'Saving...';
        btn.disabled = true;
        const fields = container.querySelectorAll('.content-field');
        for (const f of fields) {
          await fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              page: f.dataset.page,
              section: f.dataset.section,
              field: f.dataset.field,
              value: f.value
            })
          });
        }
        btn.textContent = 'Save All Changes';
        btn.disabled = false;
        const statusDiv = document.getElementById('contentStatus');
        statusDiv.innerHTML = '<span style="color: green; font-weight: 600;">All content saved successfully!<\\\\/span>';
        setTimeout(function() { statusDiv.innerHTML = ''; }, 3000);
      });
    }

    // Initialize on page load - wrapped in DOMContentLoaded to guarantee DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
      loadPublications();
      loadBlogs();
      loadTeam();
      loadGallery();
      loadMessages();

      // Restore the active tab from the URL hash
      var validSections = ['messages', 'publications', 'blogs', 'team', 'gallery', 'content'];
      var hash = location.hash.replace('#', '');
      var initialSection = validSections.includes(hash) ? hash : 'messages';
      activateSection(initialSection);
    });
  <\/script> `])), maybeRenderHead()) })}`;
}, "/Users/demma/cerd-uganda/src/pages/admin/dashboard.astro", void 0);

const $$file = "/Users/demma/cerd-uganda/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
