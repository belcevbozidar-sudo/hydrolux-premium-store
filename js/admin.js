// Hydrolux Premium Store - Admin Dashboard Module (Vercel Offline Upload Ready)
const Admin = {
  activeTab: "products", // "products" or "categories"
  filterCategory: "", // Current category filter in products list
  editingCategory: null, // Category currently being edited
  uploadedImages: [], // Temporary Base64 strings of uploaded files

  init() {
    this.injectStyles();
    this.render();
  },

  injectStyles() {
    if (document.getElementById("admin-custom-styles")) return;
    const style = document.createElement("style");
    style.id = "admin-custom-styles";
    style.innerHTML = `
      .admin-container {
        display: grid;
        grid-template-columns: 240px 1fr;
        gap: 30px;
        margin-top: 20px;
        min-height: 600px;
      }
      @media (max-width: 992px) {
        .admin-container {
          grid-template-columns: 1fr;
        }
      }
      .admin-sidebar {
        background-color: var(--bg-pure);
        border: 1px solid var(--border-light);
        border-radius: 12px;
        padding: 20px;
        box-shadow: var(--shadow-sm);
        height: fit-content;
      }
      .admin-sidebar h3 {
        margin-bottom: 20px;
        font-weight: 800;
        font-size: 1.2rem;
        color: #1e293b;
        display: flex;
        align-items: center;
        gap: 8px;
        border-bottom: 2px solid var(--primary);
        padding-bottom: 10px;
      }
      .admin-menu-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .admin-menu-item {
        padding: 12px 15px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #475569;
      }
      .admin-menu-item:hover {
        background-color: #f1f5f9;
        color: var(--primary);
      }
      .admin-menu-item.active {
        background-color: var(--primary-light);
        color: var(--primary);
      }
      .admin-content {
        background-color: var(--bg-pure);
        border: 1px solid var(--border-light);
        border-radius: 12px;
        padding: 30px;
        box-shadow: var(--shadow-sm);
      }
      .admin-header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
        border-bottom: 1px solid var(--border-light);
        padding-bottom: 15px;
        flex-wrap: wrap;
        gap: 15px;
      }
      .admin-header-row h2 {
        font-weight: 900;
        font-size: 1.6rem;
        color: #1e293b;
      }
      .admin-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
        font-size: 0.9rem;
      }
      .admin-table th, .admin-table td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid var(--border-light);
        vertical-align: middle;
      }
      .admin-table th {
        background-color: #f8fafc;
        font-weight: 700;
        color: #475569;
      }
      .admin-table tbody tr:hover {
        background-color: #f8fafc;
      }
      .btn-admin-action {
        padding: 6px 12px;
        border-radius: 6px;
        font-weight: 700;
        font-size: 0.8rem;
        cursor: pointer;
        border: none;
        transition: all 0.2s ease;
      }
      .btn-admin-danger {
        background-color: #fee2e2;
        color: #ef4444;
      }
      .btn-admin-danger:hover {
        background-color: #ef4444;
        color: white;
      }
      .btn-admin-edit {
        background-color: #e0f2fe;
        color: var(--primary);
        margin-right: 5px;
      }
      .btn-admin-edit:hover {
        background-color: var(--primary);
        color: white;
      }
      .admin-badge {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 700;
      }
      .admin-badge-success {
        background-color: #dcfce7;
        color: #16a34a;
      }
      .admin-badge-category {
        background-color: #e0f2fe;
        color: #0284c7;
      }
      
      /* Grid Forms */
      .form-grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }
      @media (max-width: 576px) {
        .form-grid-2 {
          grid-template-columns: 1fr;
        }
      }
      .admin-form-card {
        background-color: #f8fafc;
        border: 1px dashed var(--border-light);
        border-radius: 8px;
        padding: 25px;
        margin-bottom: 25px;
      }
      .admin-form-card h4 {
        margin-bottom: 15px;
        font-weight: 800;
        color: #334155;
        border-left: 3px solid var(--accent);
        padding-left: 8px;
      }
      .admin-spec-row {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        gap: 10px;
        margin-bottom: 8px;
        align-items: center;
      }
      .btn-icon-danger {
        background-color: #fee2e2;
        color: #ef4444;
        border: none;
        width: 38px;
        height: 38px;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      .btn-icon-danger:hover {
        background-color: #ef4444;
        color: white;
      }
      
      /* Visual Image Upload Preview Elements */
      .image-preview-thumbnail {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        object-fit: cover;
        border: 1.5px solid var(--border-light);
        position: relative;
      }
      .image-preview-wrapper {
        position: relative;
        display: inline-block;
      }
      .image-preview-delete {
        position: absolute;
        top: -6px;
        right: -6px;
        background-color: #ef4444;
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        font-size: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1.5px solid white;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  },

  switchTab(tabId) {
    this.activeTab = tabId;
    this.render();
  },

  render() {
    const container = document.getElementById("admin-view-content");
    if (!container) return;

    container.innerHTML = `
      <div class="admin-container">
        <!-- Sidebar Navigation -->
        <aside class="admin-sidebar">
          <h3>🛠️ Панел Хидролукс</h3>
          <ul class="admin-menu-list">
            <li class="admin-menu-item ${this.activeTab === 'products' ? 'active' : ''}" onclick="Admin.switchTab('products')">
              📦 Продукти
            </li>
            <li class="admin-menu-item ${this.activeTab === 'categories' ? 'active' : ''}" onclick="Admin.switchTab('categories')">
              📁 Категории
            </li>
          </ul>
        </aside>

        <!-- Main Workspace -->
        <main class="admin-content" id="admin-workspace">
          ${this.renderActiveWorkspace()}
        </main>
      </div>
    `;

    // Initialize custom interactive handlers (like dynamic specs, files or variants)
    if (this.activeTab === "products") {
      this.initProductFormHandlers();
    }
  },

  renderActiveWorkspace() {
    switch (this.activeTab) {
      case "products":
        return this.renderProductsWorkspace();
      case "categories":
        return this.renderCategoriesWorkspace();
      default:
        return "Няма намерен работен панел.";
    }
  },

  // ==========================================================================
  // PRODUCTS WORKSPACE
  // ==========================================================================
  renderProductsWorkspace() {
    // Filter products list based on selected category filter
    let products = CONFIG.products;
    if (this.filterCategory) {
      products = products.filter(p => p.category === this.filterCategory);
    }

    let productRows = products.map(p => {
      const minPrice = p.variants.length > 0 ? Math.min(...p.variants.map(v => v.priceEur)) : 0;
      const catObj = CONFIG.categories.find(c => c.id === p.category);
      const catName = catObj ? catObj.name : p.category;
      const thumb = p.images && p.images[0] ? p.images[0] : "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop";

      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center;">
              <img src="${thumb}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-light); margin-right: 12px;" onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'">
              <div>
                <strong>${p.name}</strong><br>
                <span class="text-muted font-xs">Код: ${p.code} | Марка: ${p.brand}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="admin-badge admin-badge-category">${catName}</span>
          </td>
          <td>
            <strong class="text-primary">${minPrice.toFixed(2)} €</strong>
          </td>
          <td>
            <span class="admin-badge admin-badge-success">${p.variants.length} размери</span>
          </td>
          <td>
            <button class="btn-admin-action btn-admin-danger" onclick="Admin.deleteProduct('${p.id}')">✕ Изтрий</button>
          </td>
        </tr>
      `;
    }).join("");

    if (products.length === 0) {
      productRows = `<tr><td colspan="5" class="text-center text-muted">Няма добавени продукти в тази категория.</td></tr>`;
    }

    // Generate categories options for product creation
    const categoryOptions = CONFIG.categories.map(c => `
      <option value="${c.id}">${c.name}</option>
    `).join("");

    // Generate categories options for list filtering
    const filterOptions = CONFIG.categories.map(c => `
      <option value="${c.id}" ${this.filterCategory === c.id ? 'selected' : ''}>${c.name}</option>
    `).join("");

    return `
      <div class="admin-header-row">
        <div>
          <h2>Управление на Продукти</h2>
        </div>
        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <span class="text-muted font-bold font-xs">Филтър:</span>
          <select id="prod-filter-category" class="form-control" onchange="Admin.filterCategory = this.value; Admin.render();" style="width: 220px; font-weight: 700; height: 38px;">
            <option value="">Всички категории</option>
            ${filterOptions}
          </select>
          <span class="admin-badge admin-badge-success">${products.length} Продукта</span>
        </div>
      </div>

      <!-- Add New Product Form Card -->
      <div class="admin-form-card">
        <h4>➕ Добавяне на нов продукт</h4>
        <form id="admin-add-product-form" onsubmit="Admin.handleProductSubmit(event)">
          
          <!-- IMAGE UPLOAD FIELD AT THE VERY TOP -->
          <div class="form-group" style="background-color: var(--primary-light); padding: 15px; border-radius: 8px; border: 1.5px dashed var(--primary); margin-bottom: 20px;">
            <label style="font-weight: 800; color: var(--primary);">📷 Качване на Снимки от устройството <span class="text-accent">*</span></label>
            <p class="text-muted font-xs" style="margin-bottom: 10px;">Първата избрана снимка ще бъде главното лице на продукта. Може да изберете множество снимки.</p>
            <input type="file" id="prod-images-upload" class="form-control" multiple accept="image/*" style="padding: 6px; border: 1px solid var(--border-light); font-weight: bold; background-color: white;" required>
            
            <!-- Image Previews Container -->
            <div id="prod-images-preview" style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;"></div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label>Име на продукта <span class="text-accent">*</span></label>
              <input type="text" id="prod-name" class="form-control" placeholder="напр. Маркуч за сгъстен въздух PLW 20" required>
            </div>
            <div class="form-group">
              <label>Код / Артикулен номер <span class="text-accent">*</span></label>
              <input type="text" id="prod-code" class="form-control" placeholder="напр. PLW20" required>
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label>Категория <span class="text-accent">*</span></label>
              <select id="prod-category" class="form-control" required>
                ${categoryOptions}
              </select>
            </div>
            <div class="form-group">
              <label>Марка <span class="text-accent">*</span></label>
              <input type="text" id="prod-brand" class="form-control" placeholder="напр. Semperit" required>
            </div>
          </div>

          <div class="form-group">
            <label>Описание на продукта</label>
            <textarea id="prod-description" class="form-control" rows="3" placeholder="Кратко описание на предназначението, гъвкавостта и материалите..."></textarea>
          </div>

          <div class="form-group">
            <label>Етикети (разделени със запетая)</label>
            <input type="text" id="prod-tags" class="form-control" placeholder="гумен маркуч, маркуч за въздух, компресор">
          </div>

          <!-- SPECIAL SEASONAL OFFER CHECKBOX -->
          <div class="form-group" style="background-color: #fffbeb; padding: 12px 15px; border-radius: 8px; border: 1px solid #fef3c7; display: flex; align-items: center; gap: 10px; margin-top: 15px; margin-bottom: 20px;">
            <input type="checkbox" id="prod-is-special" style="width: 20px; height: 20px; cursor: pointer;">
            <label for="prod-is-special" style="margin: 0; font-weight: 700; color: #b45309; cursor: pointer; display: flex; align-items: center; gap: 6px;">
              🔥 Маркирай като специално предложение (Сезонно намаление / Гореща оферта)
            </label>
          </div>

          <!-- Product Specs Section -->
          <div class="form-group">
            <label style="font-weight: 800;">🛠️ Технически характеристики</label>
            <div id="prod-specs-container">
              <div class="admin-spec-row">
                <input type="text" class="form-control spec-key" placeholder="напр. Работна температура">
                <input type="text" class="form-control spec-val" placeholder="напр. -25°C до +70°C">
                <button type="button" class="btn-icon-danger" onclick="this.parentElement.remove()">×</button>
              </div>
            </div>
            <button type="button" class="btn btn-secondary mt-10" onclick="Admin.addNewSpecRow()">+ Добави Характеристика</button>
          </div>

          <!-- Product Variants (Customizable Table of Sizes & Prices) -->
          <div class="form-group mt-20">
            <label style="font-weight: 800; display: block; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">📏 Таблица с размери, цени и детайли (Еднакви с продуктовата таблица)</label>
            <p class="text-muted font-xs" style="margin-bottom: 10px;">Всички полета са изцяло редактируеми. Попълнете данните, които ще се покажат в продуктовата таблица на сайта.</p>
            
            <div style="overflow-x: auto;">
              <table class="admin-table" style="min-width: 900px; font-size: 0.8rem; margin-top: 5px;">
                <thead>
                  <tr style="background-color: #f1f5f9;">
                    <th style="padding: 8px;">Код на раздав</th>
                    <th style="padding: 8px; width: 100px;">Вътр. ø (мм)</th>
                    <th style="padding: 8px; width: 80px;">Инч</th>
                    <th style="padding: 8px; width: 100px;">Външ. ø (мм)</th>
                    <th style="padding: 8px; width: 110px;">Работно нал.(Bar)</th>
                    <th style="padding: 8px; width: 110px;">Радиус огъване(мм)</th>
                    <th style="padding: 8px; width: 100px;">Тегло кг/м</th>
                    <th style="padding: 8px; width: 100px;">Дълж. ролка(м)</th>
                    <th style="padding: 8px; width: 110px;">Цена EUR (€)</th>
                    <th style="padding: 8px; width: 40px;"></th>
                  </tr>
                </thead>
                <tbody id="prod-variants-tbody">
                  <!-- Appended rows -->
                </tbody>
              </table>
            </div>
            <button type="button" class="btn btn-secondary mt-10" onclick="Admin.addNewVariantRow()">+ Добави нов размер (Ред в таблицата)</button>
          </div>

          <div class="divider"></div>
          <button type="submit" class="btn btn-accent btn-large" style="min-width: 200px;">💾 Запази Продукта</button>
        </form>
      </div>

      <!-- Current Products Table -->
      <h3 style="font-weight: 800; font-size: 1.2rem; margin-top: 35px; margin-bottom: 15px; color: #1e293b;">Списък с продукти</h3>
      <div style="overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Продукт</th>
              <th>Категория</th>
              <th>Цена EUR</th>
              <th>Вариации</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>
      </div>
    `;
  },

  addNewSpecRow() {
    const container = document.getElementById("prod-specs-container");
    if (!container) return;
    const div = document.createElement("div");
    div.className = "admin-spec-row";
    div.innerHTML = `
      <input type="text" class="form-control spec-key" placeholder="Характеристика">
      <input type="text" class="form-control spec-val" placeholder="Стойност">
      <button type="button" class="btn-icon-danger" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(div);
  },

  addNewVariantRow() {
    const tbody = document.getElementById("prod-variants-tbody");
    if (!tbody) return;
    const tr = document.createElement("tr");
    tr.className = "admin-variant-tr";
    tr.innerHTML = `
      <td style="padding: 5px;"><input type="text" class="form-control var-code" placeholder="напр. PLW20006" style="padding: 6px; font-size:0.8rem;" required></td>
      <td style="padding: 5px;"><input type="number" step="any" class="form-control var-inner" placeholder="напр. 6" style="padding: 6px; font-size:0.8rem;" required></td>
      <td style="padding: 5px;"><input type="text" class="form-control var-inch" placeholder="напр. 1/4\\"" style="padding: 6px; font-size:0.8rem;" required></td>
      <td style="padding: 5px;"><input type="number" step="any" class="form-control var-outer" placeholder="напр. 12" style="padding: 6px; font-size:0.8rem;" required></td>
      <td style="padding: 5px;"><input type="number" step="any" class="form-control var-pressure" placeholder="напр. 20" style="padding: 6px; font-size:0.8rem;" required></td>
      <td style="padding: 5px;"><input type="number" step="any" class="form-control var-bend" placeholder="напр. 60" style="padding: 6px; font-size:0.8rem;" required></td>
      <td style="padding: 5px;"><input type="number" step="any" class="form-control var-weight" placeholder="напр. 0.13" style="padding: 6px; font-size:0.8rem;" required></td>
      <td style="padding: 5px;"><input type="number" step="any" class="form-control var-roll" placeholder="напр. 50" style="padding: 6px; font-size:0.8rem;" required></td>
      <td style="padding: 5px;"><input type="number" step="any" class="form-control var-price" placeholder="напр. 1.45" style="padding: 6px; font-size:0.8rem; font-weight:700;" required></td>
      <td style="padding: 5px;"><button type="button" class="btn-icon-danger" style="width:30px; height:30px; font-size:0.8rem;" onclick="this.parentElement.parentElement.remove()">×</button></td>
    `;
    tbody.appendChild(tr);
  },

  initProductFormHandlers() {
    this.uploadedImages = [];
    
    // Add dynamic listeners to file input
    const fileInput = document.getElementById("prod-images-upload");
    const previewContainer = document.getElementById("prod-images-preview");
    
    if (fileInput && previewContainer) {
      fileInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);
        
        files.forEach((file, index) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64String = event.target.result;
            Admin.uploadedImages.push(base64String);
            
            // Render a small thumbnail preview
            const wrapper = document.createElement("div");
            wrapper.className = "image-preview-wrapper";
            wrapper.innerHTML = `
              <img src="${base64String}" class="image-preview-thumbnail">
              <div class="image-preview-delete" onclick="Admin.removeUploadedImage(${Admin.uploadedImages.length - 1}, this.parentElement)">×</div>
            `;
            previewContainer.appendChild(wrapper);
          };
          reader.readAsDataURL(file);
        });
      });
    }

    const tbody = document.getElementById("prod-variants-tbody");
    if (tbody && tbody.children.length === 0) {
      this.addNewVariantRow();
    }
  },

  removeUploadedImage(index, element) {
    this.uploadedImages[index] = null; // Mark as deleted
    element.remove();
  },

  handleProductSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("prod-name").value;
    const code = document.getElementById("prod-code").value;
    const category = document.getElementById("prod-category").value;
    const brand = document.getElementById("prod-brand").value;
    const description = document.getElementById("prod-description").value;
    const tagsInput = document.getElementById("prod-tags").value;

    const tags = tagsInput ? tagsInput.split(",").map(t => t.trim()) : [];
    
    // Filter deleted items out of Base64 images
    const images = this.uploadedImages.filter(img => img !== null);

    if (images.length === 0) {
      alert("Моля изберете поне една снимка от устройството за вашия продукт!");
      return;
    }

    // 1. Parse specifications
    const specs = [];
    document.querySelectorAll(".admin-spec-row").forEach(row => {
      const key = row.querySelector(".spec-key").value.trim();
      const val = row.querySelector(".spec-val").value.trim();
      if (key && val) {
        specs.push({ key, value: val });
      }
    });

    // 2. Parse variations
    const variants = [];
    document.querySelectorAll(".admin-variant-tr").forEach((row) => {
      const vCode = row.querySelector(".var-code").value.trim();
      const inner = parseFloat(row.querySelector(".var-inner").value) || 0;
      const inch = row.querySelector(".var-inch").value.trim();
      const outer = parseFloat(row.querySelector(".var-outer").value) || 0;
      const pressure = parseFloat(row.querySelector(".var-pressure").value) || 0;
      const bend = parseFloat(row.querySelector(".var-bend").value) || 0;
      const weight = parseFloat(row.querySelector(".var-weight").value) || 0;
      const roll = parseFloat(row.querySelector(".var-roll").value) || 0;
      const price = parseFloat(row.querySelector(".var-price").value) || 0;

      if (vCode && !isNaN(price)) {
        variants.push({
          code: vCode,
          innerDb: inner,
          inch: inch,
          outerDb: outer,
          pressure: pressure,
          bend: bend,
          weight: weight,
          rollLength: roll,
          priceEur: price
        });
      }
    });

    if (variants.length === 0) {
      alert("Моля въведете поне един размер в таблицата с валидна цена!");
      return;
    }

    const id = name.toLowerCase()
      .replace(/[^а-яa-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .replace(/[а-я]/g, m => {
        const cyr = "абвгдежзийклмнопрстуфхцчшщъьюя";
        const lat = ["a","b","v","g","d","e","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","h","ts","ch","sh","sht","a","y","yu","ya"];
        const idx = cyr.indexOf(m);
        return idx > -1 ? lat[idx] : m;
      });

    const isSpecial = document.getElementById("prod-is-special").checked;

    const newProduct = {
      id,
      code,
      name,
      category,
      brand,
      rating: 5.0,
      reviewsCount: 1,
      views: 10,
      inStock: true,
      isSpecial: isSpecial,
      tags,
      description,
      specs,
      images: images,
      variants
    };

    CONFIG.addProduct(newProduct);
    this.propagateStateChanges();
    
    alert("Продуктът е успешно записан в базата и се вижда в реално време!");
    this.render();
  },

  deleteProduct(productId) {
    if (confirm("Наистина ли искате да изтриете този продукт?")) {
      CONFIG.deleteProduct(productId);
      this.propagateStateChanges();
      this.render();
    }
  },

  // ==========================================================================
  // CATEGORIES WORKSPACE
  // ==========================================================================
  renderCategoriesWorkspace() {
    const categories = CONFIG.categories;

    let categoryRows = categories.map(c => {
      const productCount = CONFIG.products.filter(p => p.category === c.id).length;
      return `
        <tr>
          <td><span style="font-size: 1.4rem; margin-right: 8px;">${c.icon || '📦'}</span></td>
          <td><strong>${c.name}</strong></td>
          <td><span class="admin-badge admin-badge-success">${productCount} продукта</span></td>
          <td>
            <button class="btn-admin-action btn-admin-edit" onclick="Admin.startEditCategory('${c.id}')">✏️ Редактирай</button>
            <button class="btn-admin-action btn-admin-danger" onclick="Admin.deleteCategory('${c.id}')">✕ Изтрий</button>
          </td>
        </tr>
      `;
    }).join("");

    if (categories.length === 0) {
      categoryRows = `<tr><td colspan="4" class="text-center text-muted">Няма въведени категории.</td></tr>`;
    }

    const isEditing = this.editingCategory !== null;

    return `
      <div class="admin-header-row">
        <h2>Управление на Категории</h2>
        <span class="admin-badge admin-badge-category">${categories.length} Категории</span>
      </div>

      <!-- Add or Edit Category Form -->
      <div class="admin-form-card">
        <h4>${isEditing ? `✏️ Редактиране на категория: "${this.editingCategory.name}"` : '📁 Добавяне на нова категория'}</h4>
        <form onsubmit="Admin.handleCategorySubmit(event)">
          <div class="form-grid-2">
            <div class="form-group">
              <label>Име на категорията <span class="text-accent">*</span></label>
              <input type="text" id="cat-name" class="form-control" value="${isEditing ? this.editingCategory.name : ''}" placeholder="напр. Маркучи за пара" required>
            </div>
            <div class="form-group">
              <label>Икона / Емоджи (не е задължително)</label>
              <input type="text" id="cat-icon" class="form-control" value="${isEditing ? this.editingCategory.icon : ''}" placeholder="напр. 🌡️ (по подразбиране е 📦)">
            </div>
          </div>
          
          <div style="margin-top: 15px; display: flex; gap: 10px;">
            <button type="submit" class="btn btn-accent">💾 ${isEditing ? 'Запази промените' : 'Запази Категорията'}</button>
            ${isEditing ? `
              <button type="button" class="btn btn-secondary" onclick="Admin.cancelCategoryEdit()">Отказ</button>
            ` : ''}
          </div>
        </form>
      </div>

      <!-- Current Categories Table (No ID column, clean design) -->
      <h3 style="font-weight: 800; font-size: 1.2rem; margin-top: 35px; margin-bottom: 15px; color: #1e293b;">Налични категории</h3>
      <div style="overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th width="40">Икона</th>
              <th>Име</th>
              <th>Брой продукти</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            ${categoryRows}
          </tbody>
        </table>
      </div>
    `;
  },

  startEditCategory(catId) {
    const cat = CONFIG.categories.find(c => c.id === catId);
    if (cat) {
      this.editingCategory = cat;
      this.render();
    }
  },

  cancelCategoryEdit() {
    this.editingCategory = null;
    this.render();
  },

  handleCategorySubmit(event) {
    event.preventDefault();

    const name = document.getElementById("cat-name").value.trim();
    const icon = document.getElementById("cat-icon").value.trim() || "📦";

    if (this.editingCategory) {
      // 1. We are editing an existing category
      const target = CONFIG.categories.find(c => c.id === this.editingCategory.id);
      if (target) {
        target.name = name;
        target.icon = icon;
      }
      CONFIG.saveState();
      this.editingCategory = null;
      alert("Категорията е успешно актуализирана!");
    } else {
      // 2. Creating a new category
      const id = name.toLowerCase()
        .replace(/[^а-яa-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .replace(/[а-я]/g, m => {
          const cyr = "абвгдежзийклмнопрстуфхцчшщъьюя";
          const lat = ["a","b","v","g","d","e","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","h","ts","ch","sh","sht","a","y","yu","ya"];
          const idx = cyr.indexOf(m);
          return idx > -1 ? lat[idx] : m;
        });

      // Avoid duplication
      if (CONFIG.categories.some(c => c.id === id)) {
        alert("Категория с това име вече съществува!");
        return;
      }

      const newCategory = {
        id,
        name,
        icon
      };

      CONFIG.addCategory(newCategory);
      alert("Категорията е успешно създадена!");
    }

    this.propagateStateChanges();
    this.render();
  },

  deleteCategory(categoryId) {
    if (confirm("Наистина ли искате да изтриете тази категория? Всички продукти в нея няма да имат свързана категория.")) {
      CONFIG.deleteCategory(categoryId);
      this.propagateStateChanges();
      this.render();
    }
  },

  // Propagates active memory/localStorage state to all visible SPA views instantly
  propagateStateChanges() {
    App.renderQuickCategories();
    App.renderSearchCategories();
    App.renderFeaturedProductsHome();
    Catalog.renderSidebar();
    Catalog.applyFiltersAndRender();
  }
};
