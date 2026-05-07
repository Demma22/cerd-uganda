import"./hoisted.F0qhrZ3G.js";let a="homepage",n={};async function o(i){a=i,n=await(await fetch("/api/content")).json(),d()}function d(){const i=document.getElementById("editorContent"),e=n[a]||{};a==="homepage"?(i.innerHTML=`
          <div class="editor-card">
            <h3>Hero Section</h3>
            <p>Edit the main hero section text and image</p>
            
            <div class="field-group">
              <label>Badge</label>
              <input type="text" id="hero_badge" value="${t(e.hero?.badge||"")}" />
            </div>
            
            <div class="field-group">
              <label>Title</label>
              <input type="text" id="hero_title" value="${t(e.hero?.title||"")}" />
            </div>
            
            <div class="field-group">
              <label>Subtitle</label>
              <textarea id="hero_subtitle">${t(e.hero?.subtitle||"")}</textarea>
            </div>
            
            <div class="field-group">
              <label>Hero Image URL</label>
              <input type="text" id="hero_image" value="${t(e.hero?.image||"")}" />
              <div class="image-preview" id="hero_preview">
                ${e.hero?.image?`<img src="${e.hero.image}" alt="Preview" />`:""}
              </div>
            </div>
            
            <button onclick="saveField('hero', 'badge', document.getElementById('hero_badge').value)" class="save-btn">Save Changes</button>
          </div>
          
          <div class="editor-card">
            <h3>Mission & Goal</h3>
            
            <div class="field-group">
              <label>Mission Title</label>
              <input type="text" id="mission_title" value="${t(e.mission?.title||"")}" />
            </div>
            
            <div class="field-group">
              <label>Mission Description</label>
              <textarea id="mission_description">${t(e.mission?.description||"")}</textarea>
            </div>
            
            <div class="field-group">
              <label>Goal Description</label>
              <textarea id="mission_goal">${t(e.mission?.goal||"")}</textarea>
            </div>
            
            <button onclick="saveField('mission', 'title', document.getElementById('mission_title').value)" class="save-btn">Save Mission</button>
            <button onclick="saveField('mission', 'description', document.getElementById('mission_description').value)" class="save-btn" style="margin-left: 0.5rem;">Save Description</button>
          </div>
          
          <div class="editor-card">
            <h3>Impact Section</h3>
            
            <div class="field-group">
              <label>Impact Title</label>
              <input type="text" id="impact_title" value="${t(e.impact?.title||"")}" />
            </div>
            
            <div class="field-group">
              <label>Impact Description</label>
              <textarea id="impact_description">${t(e.impact?.description||"")}</textarea>
            </div>
            
            <div class="field-group">
              <label>Vision Statement</label>
              <textarea id="impact_vision">${t(e.impact?.vision||"")}</textarea>
            </div>
            
            <button onclick="saveField('impact', 'title', document.getElementById('impact_title').value)" class="save-btn">Save</button>
          </div>
        `,document.getElementById("hero_image")?.addEventListener("input",l=>{const s=document.getElementById("hero_preview");l.target.value?s.innerHTML=`<img src="${l.target.value}" alt="Preview" />`:s.innerHTML=""})):a==="about"?i.innerHTML=`
          <div class="editor-card">
            <h3>About Us Content</h3>
            
            <div class="field-group">
              <label>Journey Story</label>
              <textarea id="journey">${t(e.journey||"")}</textarea>
            </div>
            
            <div class="field-group">
              <label>Current Focus</label>
              <textarea id="focus">${t(e.focus||"")}</textarea>
            </div>
            
            <div class="field-group">
              <label>Mission Statement</label>
              <textarea id="mission">${t(e.mission||"")}</textarea>
            </div>
            
            <div class="field-group">
              <label>Goal Statement</label>
              <textarea id="goal">${t(e.goal||"")}</textarea>
            </div>
            
            <button onclick="saveAboutContent()" class="save-btn">Save All Changes</button>
          </div>
        `:a==="contact"?i.innerHTML=`
          <div class="editor-card">
            <h3>Contact Information</h3>
            
            <div class="field-group">
              <label>Address</label>
              <input type="text" id="address" value="${t(e.address||"")}" />
            </div>
            
            <div class="field-group">
              <label>Email</label>
              <input type="email" id="email" value="${t(e.email||"")}" />
            </div>
            
            <div class="field-group">
              <label>Primary Phone</label>
              <input type="text" id="phone" value="${t(e.phone||"")}" />
            </div>
            
            <div class="field-group">
              <label>Secondary Phone</label>
              <input type="text" id="phone2" value="${t(e.phone2||"")}" />
            </div>
            
            <button onclick="saveContactInfo()" class="save-btn">Save Contact Info</button>
          </div>
        `:a==="siteSettings"&&(i.innerHTML=`
          <div class="editor-card">
            <h3>Site Settings</h3>
            
            <div class="field-group">
              <label>Site Name</label>
              <input type="text" id="siteName" value="${t(e.siteName||"")}" />
            </div>
            
            <div class="field-group">
              <label>Site Tagline</label>
              <input type="text" id="siteTagline" value="${t(e.siteTagline||"")}" />
            </div>
            
            <div class="field-group">
              <label>Footer Text</label>
              <textarea id="footerText">${t(e.footerText||"")}</textarea>
            </div>
            
            <button onclick="saveSiteSettings()" class="save-btn">Save Settings</button>
          </div>
        `)}function t(i){return i?i.replace(/[&<>]/g,function(e){return e==="&"?"&amp;":e==="<"?"&lt;":e===">"?"&gt;":e}):""}document.querySelectorAll(".page-btn").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".page-btn").forEach(e=>e.classList.remove("active")),i.classList.add("active"),o(i.dataset.page)})});o("homepage");
