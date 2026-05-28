// Hydrolux Premium Store - Admin Dashboard Module (Full Real-Time CRUD + Drag-and-Drop)
const Admin = {
  activeTab: "products", // "products" or "categories"
  filterCategory: "", // Current category filter in products list
  editingCategory: null, // Category currently being edited
  editingProduct: null, // Product currently being edited
  uploadedImages: [], // Temporary Base64 strings or existing URLs of uploaded files

  init() {
    this.loadTemplates();
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
        gap: 24px;
        margin-top: 20px;
        min-height: 600px;
        max-width: 100%;
        overflow: hidden;
      }
      .admin-sidebar {
        background-color: var(--bg-pure);
        border: 1px solid var(--border-light);
        border-radius: 12px;
        padding: 20px;
        box-shadow: var(--shadow-sm);
        height: fit-content;
        flex-shrink: 0;
      }
      .admin-sidebar h3 {
        margin-bottom: 20px;
        font-weight: 800;
        font-size: 1.1rem;
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
        gap: 6px;
      }
      .admin-menu-item {
        padding: 10px 14px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 0.88rem;
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
        padding: 28px;
        box-shadow: var(--shadow-sm);
        min-width: 0;
        max-width: 100%;
        overflow: hidden;
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
        white-space: nowrap;
      }
      .admin-table tbody tr:hover {
        background-color: #f8fafc;
      }
      .btn-admin-action {
        padding: 6px 14px;
        border-radius: 6px;
        font-weight: 700;
        font-size: 0.8rem;
        cursor: pointer;
        border: none;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .admin-actions-cell {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: nowrap;
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
      }
      .btn-admin-edit:hover {
        background-color: var(--primary);
        color: white;
      }
      .admin-badge {
        display: inline-block;
        padding: 3px 10px;
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
      
      /* Visual Image Upload Preview Elements with Drag handles & Crown */
      .image-preview-wrapper {
        position: relative;
        display: inline-block;
        border: 1.5px solid var(--border-light);
        border-radius: 8px;
        padding: 4px;
        background-color: white;
        cursor: grab;
        user-select: none;
        transition: transform 0.15s ease;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .image-preview-wrapper:active {
        cursor: grabbing;
        transform: scale(0.96);
      }
      .image-preview-wrapper.dragging {
        border-color: var(--primary);
        opacity: 0.5;
        transform: scale(1.05);
      }
      .image-preview-thumbnail {
        width: 75px;
        height: 75px;
        border-radius: 6px;
        object-fit: cover;
        display: block;
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
        z-index: 25;
      }
      
      /* Gold Crown for Main Face Image (Centered Symmetrically at Bottom) */
      .image-preview-crown {
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ffd700, #ffb703);
        color: #1e293b;
        font-size: 0.7rem;
        padding: 2px 6px;
        border-radius: 12px;
        border: 1.5px solid white;
        z-index: 20;
        box-shadow: 0 3px 6px rgba(251, 191, 36, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        white-space: nowrap;
        gap: 2px;
      }

      /* Drag handle dots at the top of the image */
      .image-preview-drag-handle {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #ffffff;
        color: #64748b;
        border: 1.5px solid var(--border-light);
        border-radius: 6px;
        font-size: 0.75rem;
        padding: 1px 6px;
        font-weight: bold;
        z-index: 20;
        cursor: grab;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.08);
      }

      /* Responsive centring overrides for the entire admin view on mobile */
      @media (max-width: 992px) {
        .admin-container {
          grid-template-columns: 1fr;
          gap: 15px;
          padding: 0 5px;
        }
        .admin-sidebar {
          width: 100%;
          text-align: center;
          background-color: var(--primary-light);
          padding: 15px;
          border-radius: 12px;
          border: 1px solid rgba(13, 110, 253, 0.1);
        }
        .admin-sidebar h3 {
          justify-content: center;
          margin-bottom: 12px;
          border-bottom: 1px dashed var(--primary);
          padding-bottom: 8px;
        }
        .admin-menu-list {
          flex-direction: row;
          justify-content: center;
          gap: 8px;
        }
        .admin-menu-item {
          flex-grow: 1;
          justify-content: center;
          padding: 10px 5px;
          font-size: 0.85rem;
          border-radius: 8px;
        }
        .admin-content {
          padding: 15px;
          border-radius: 12px;
          width: 100%;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .form-grid-2 {
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .admin-header-row {
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          border-bottom: 1.5px solid #f1f5f9;
          padding-bottom: 15px;
          margin-bottom: 15px;
        }
        .admin-header-row h2 {
          font-size: 1.3rem;
        }

        /* Table to Card Conversions for mobile list */
        .admin-table {
          border: 0;
        }
        .admin-table thead {
          display: none; /* Hide header rows on mobile */
        }
        .admin-table tr {
          display: block;
          border: 1px solid var(--border-light);
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 15px;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .admin-table td {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
          text-align: right;
          font-size: 0.85rem;
        }
        .admin-table td:last-child {
          border-bottom: 0;
          justify-content: center;
          padding-top: 12px;
        }
        .admin-table td:last-child .admin-actions-cell {
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .admin-table td::before {
          content: attr(data-label);
          font-weight: 800;
          text-align: left;
          color: #475569;
          font-size: 0.8rem;
        }
        .admin-table td > div,
        .admin-table td > span,
        .admin-table td > strong {
          text-align: right;
        }
        /* Override: actions cell should not be right-aligned */
        .admin-table td > .admin-actions-cell {
          text-align: left;
        }

        /* Variant editing grid on mobile */
        #prod-variants-tbody {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .admin-variant-tr {
          display: grid !important;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          padding: 12px !important;
          background-color: #f8fafc;
          border: 1.5px solid var(--border-light) !important;
          border-radius: 10px;
        }
        .admin-variant-tr td {
          display: block !important;
          border: 0 !important;
          padding: 0 !important;
          text-align: left;
        }
        .admin-variant-tr td::before {
          content: attr(data-label);
          display: block;
          font-weight: 800;
          font-size: 0.7rem;
          color: #64748b;
          margin-bottom: 3px;
        }
        .admin-variant-tr td:last-child {
          grid-column: span 2;
          display: flex !important;
          justify-content: center;
          border-top: 1.5px solid var(--border-light) !important;
          padding-top: 10px !important;
          margin-top: 5px;
        }
        
        /* Specs grid on mobile */
        .admin-spec-row {
          flex-direction: column;
          gap: 8px;
          background-color: #f8fafc;
          padding: 10px;
          border: 1px dashed var(--border-light);
          border-radius: 8px;
        }
        .admin-spec-row input {
          width: 100% !important;
        }
        .admin-spec-row .btn-icon-danger {
          width: 100% !important;
          height: 34px;
        }
      }
    `;
    document.head.appendChild(style);
  },

  switchTab(tabId) {
    this.activeTab = tabId;
    this.editingProduct = null; // Cancel editing product when switching
    this.editingCategory = null; // Cancel editing category
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

    // Initialize custom interactive handlers (like spec lists or images preview)
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
      const minPrice = p.variants && p.variants.length > 0 ? Math.min(...p.variants.map(v => v.priceEur)) : 0;
      const catObj = CONFIG.categories.find(c => c.id === p.category);
      const catName = catObj ? catObj.name : p.category;
      const thumb = p.images && p.images[0] ? p.images[0] : "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop";

      return `
        <tr class="admin-table-row">
          <td data-label="Продукт">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="${thumb}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-light); margin-right: 12px;" onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'">
              <div>
                <strong>${p.name}</strong><br>
                <span class="text-muted font-xs">Код: ${p.code} | Марка: ${p.brand}</span>
              </div>
            </div>
          </td>
          <td data-label="Категория">
            <span class="admin-badge admin-badge-category">${catName}</span>
          </td>
          <td data-label="Цена EUR">
            <strong class="text-primary">${minPrice.toFixed(2)} €</strong>
          </td>
          <td data-label="Вариации">
            <span class="admin-badge admin-badge-success">${p.variants ? p.variants.length : 0} размери</span>
          </td>
          <td data-label="Действия">
            <div class="admin-actions-cell">
              <button class="btn-admin-action btn-admin-edit" onclick="Admin.startEditProduct('${p.id}')">✏️ Редактирай</button>
              <button class="btn-admin-action btn-admin-danger" onclick="Admin.deleteProduct('${p.id}')">✕ Изтрий</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    if (products.length === 0) {
      productRows = `<tr><td colspan="5" class="text-center text-muted" style="padding: 30px; color: #94a3b8;">Няма добавени продукти в тази категория.</td></tr>`;
    }

    // Generate categories options for product creation
    const categoryOptions = CONFIG.categories.map(c => `
      <option value="${c.id}">${c.name}</option>
    `).join("");

    // Generate categories options for list filtering
    const filterOptions = CONFIG.categories.map(c => `
      <option value="${c.id}" ${this.filterCategory === c.id ? 'selected' : ''}>${c.name}</option>
    `).join("");

    const isEditing = this.editingProduct !== null;

    return `
      <div class="admin-header-row">
        <div>
          <h2>Управление на Продукти</h2>
        </div>
        <div>
          <span class="admin-badge admin-badge-success">${products.length} Продукта</span>
        </div>
      </div>

      <!-- Add or Edit Product Form Card -->
      <div class="admin-form-card">
        <h4>${isEditing ? `✏️ Редактиране на продукт: "${this.editingProduct.name}"` : '➕ Добавяне на нов продукт'}</h4>
        <form id="admin-add-product-form" onsubmit="Admin.handleProductSubmit(event)">
          
          <!-- IMAGE UPLOAD FIELD AT THE VERY TOP (Without static help text) -->
          <div class="form-group" style="background-color: var(--primary-light); padding: 15px; border-radius: 8px; border: 1.5px dashed var(--primary); margin-bottom: 20px;">
            <label style="font-weight: 800; color: var(--primary); display: block; margin-bottom: 5px;">📷 Снимки от устройството <span class="text-accent">*</span></label>
            <input type="file" id="prod-images-upload" class="form-control" multiple accept="image/*" style="padding: 6px; border: 1px solid var(--border-light); font-weight: bold; background-color: white;">
            
            <!-- Image Previews Container with Drag and Drop Support -->
            <div id="prod-images-preview" style="display: flex; gap: 12px; margin-top: 15px; flex-wrap: wrap;"></div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label>Име на продукта <span class="text-accent">*</span></label>
              <input type="text" id="prod-name" class="form-control" value="${isEditing ? this.editingProduct.name : ''}" placeholder="напр. Маркуч за сгъстен въздух PLW 20" required>
            </div>
            <div class="form-group">
              <label>Код / Артикулен номер <span class="text-accent">*</span></label>
              <input type="text" id="prod-code" class="form-control" value="${isEditing ? this.editingProduct.code : ''}" placeholder="напр. PLW20" required>
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label>Категория <span class="text-accent">*</span></label>
              <select id="prod-category" class="form-control" required>
                ${CONFIG.categories.map(c => `
                  <option value="${c.id}" ${isEditing && this.editingProduct.category === c.id ? 'selected' : ''}>${c.name}</option>
                `).join("")}
              </select>
            </div>
            <div class="form-group">
              <label>Марка <span class="text-accent">*</span></label>
              <input type="text" id="prod-brand" class="form-control" value="${isEditing ? this.editingProduct.brand : ''}" placeholder="напр. Semperit" required>
            </div>
          </div>

          <div class="form-group">
            <label>Описание на продукта</label>
            <textarea id="prod-description" class="form-control" rows="3" placeholder="Кратко описание на предназначението, гъвкавостта и материалите...">${isEditing ? this.editingProduct.description : ''}</textarea>
          </div>

          <div class="form-group">
            <label>Етикети (разделени със запетая)</label>
            <input type="text" id="prod-tags" class="form-control" value="${isEditing ? this.editingProduct.tags.join(", ") : ''}" placeholder="гумен маркуч, маркуч за въздух, компресор">
          </div>

          <!-- SPECIAL SEASONAL OFFER CHECKBOX -->
          <div class="form-group" style="background-color: #fffbeb; padding: 12px 15px; border-radius: 8px; border: 1px solid #fef3c7; display: flex; align-items: center; gap: 10px; margin-top: 15px; margin-bottom: 20px;">
            <input type="checkbox" id="prod-is-special" ${isEditing && this.editingProduct.isSpecial ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer;">
            <label for="prod-is-special" style="margin: 0; font-weight: 700; color: #b45309; cursor: pointer; display: flex; align-items: center; gap: 6px;">
              🔥 Маркирай като специално предложение (Сезонно намаление / Гореща оферта)
            </label>
          </div>

          <!-- Product Specs Section -->
          <div class="form-group">
            <label style="font-weight: 800;">🛠️ Технически характеристики</label>
            <div id="prod-specs-container">
              ${isEditing && this.editingProduct.specs ? this.editingProduct.specs.map(spec => `
                <div class="admin-spec-row">
                  <input type="text" class="form-control spec-key" value="${spec.key}" placeholder="напр. Работна температура">
                  <input type="text" class="form-control spec-val" value="${spec.value}" placeholder="напр. -25°C до +70°C">
                  <button type="button" class="btn-icon-danger" onclick="this.parentElement.remove()">×</button>
                </div>
              `).join("") : `
                <div class="admin-spec-row">
                  <input type="text" class="form-control spec-key" placeholder="напр. Работна температура">
                  <input type="text" class="form-control spec-val" placeholder="напр. -25°C до +70°C">
                  <button type="button" class="btn-icon-danger" onclick="this.parentElement.remove()">×</button>
                </div>
              `}
            </div>
            <button type="button" class="btn btn-secondary mt-10" onclick="Admin.addNewSpecRow()">+ Добави Характеристика</button>
          </div>

          <!-- Product Variants Table (Customizable and Operational) -->
          <div id="variants-table-container">
            ${this.renderVariantsTable()}
          </div>

          <div class="divider"></div>
          <div style="display: flex; gap: 10px;">
            <button type="submit" class="btn btn-accent btn-large" style="min-width: 200px;">💾 ${isEditing ? 'Запази промените' : 'Запази Продукта'}</button>
            ${isEditing ? `
              <button type="button" class="btn btn-secondary btn-large" onclick="Admin.cancelProductEdit()">Отказ</button>
            ` : ''}
          </div>
        </form>
      </div>

      <!-- Current Products Table Header with Category Filter directly below the form -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 40px; margin-bottom: 15px; flex-wrap: wrap; gap: 15px; border-bottom: 2px solid var(--border-light); padding-bottom: 12px;">
        <h3 style="font-weight: 800; font-size: 1.3rem; color: #1e293b; margin: 0;">Списък с продукти</h3>
        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <span class="text-muted font-bold font-xs" style="text-transform: uppercase; letter-spacing: 0.5px;">Филтриране:</span>
          <select id="prod-filter-category" class="form-control" onchange="Admin.filterProductsList(this.value)" style="width: 240px; font-weight: 700; height: 38px; padding: 6px; border: 1.5px solid var(--primary); border-radius: 6px; color: var(--primary); background-color: white;">
            <option value="">Всички категории</option>
            ${filterOptions}
          </select>
        </div>
      </div>

      <!-- Current Products Table -->
      <div style="overflow-x: auto; width: 100%; border: 1px solid var(--border-light); border-radius: 8px;">
        <table class="admin-table" id="admin-products-list-table" style="width: 100%; min-width: 800px; margin-top: 0;">
          <thead>
            <tr>
              <th>Продукт</th>
              <th>Категория</th>
              <th>Цена EUR</th>
              <th>Вариации</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>
      </div>
    `;
  },

  filterProductsList(catId) {
    this.filterCategory = catId;
    
    const tbody = document.querySelector("#admin-products-list-table tbody");
    if (!tbody) return;
    
    let products = CONFIG.products;
    if (catId) {
      products = products.filter(p => p.category === catId);
    }
    
    let productRows = products.map(p => {
      const minPrice = p.variants && p.variants.length > 0 ? Math.min(...p.variants.map(v => v.priceEur)) : 0;
      const catObj = CONFIG.categories.find(c => c.id === p.category);
      const catName = catObj ? catObj.name : p.category;
      const thumb = p.images && p.images[0] ? p.images[0] : "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop";

      return `
        <tr class="admin-table-row">
          <td data-label="Продукт">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="${thumb}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-light); margin-right: 12px;" onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'">
              <div>
                <strong>${p.name}</strong><br>
                <span class="text-muted font-xs">Код: ${p.code} | Марка: ${p.brand}</span>
              </div>
            </div>
          </td>
          <td data-label="Категория">
            <span class="admin-badge admin-badge-category">${catName}</span>
          </td>
          <td data-label="Цена EUR">
            <strong class="text-primary">${minPrice.toFixed(2)} €</strong>
          </td>
          <td data-label="Вариации">
            <span class="admin-badge admin-badge-success">${p.variants ? p.variants.length : 0} размери</span>
          </td>
          <td data-label="Действия">
            <div class="admin-actions-cell">
              <button class="btn-admin-action btn-admin-edit" type="button" onclick="Admin.startEditProduct('${p.id}')">✏️ Редактирай</button>
              <button class="btn-admin-action btn-admin-danger" type="button" onclick="Admin.deleteProduct('${p.id}')">✕ Изтрий</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    if (products.length === 0) {
      productRows = `<tr><td colspan="5" class="text-center text-muted" style="padding: 30px; color: #94a3b8;">Няма добавени продукти в тази категория.</td></tr>`;
    }
    
    tbody.innerHTML = productRows;
    
    // Update count badge in the header above the products list
    const badge = document.querySelector(".admin-header-row .admin-badge-success");
    if (badge) {
      badge.textContent = `${products.length} Продукта`;
    }
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

  renderVariantsTable() {
    const isEditing = this.editingProduct !== null;
    
    if (!this.currentColumns || this.currentColumns.length === 0) {
      if (isEditing && this.editingProduct.columns) {
        this.currentColumns = [...this.editingProduct.columns];
      } else {
        this.currentColumns = [
          { key: "code", label: "Код на размер" },
          { key: "innerDb", label: "Вътр. ø (мм)" },
          { key: "inch", label: "Инч" },
          { key: "outerDb", label: "Външ. ø (мм)" },
          { key: "pressure", label: "Работно нал.(Bar)" },
          { key: "bend", label: "Радиус огъване(мм)" },
          { key: "weight", label: "Тегло кг/м" },
          { key: "rollLength", label: "Дълж. ролка(м)" },
          { key: "priceEur", label: "Цена EUR (€)" }
        ];
      }
    }

    const activeVariants = this.tempVariants || this.collectVariantsFromDOM() || (isEditing ? this.editingProduct.variants : []);

    // Load saved templates for selection
    this.loadTemplates();
    const templateOptions = this.savedTemplates.map(t => `
      <option value="${t.id}">${t.name}</option>
    `).join("");

    const headersHTML = this.currentColumns.map(c => `
      <th style="padding: 8px; min-width: 110px; position: relative; text-align: center;">
        <div style="display: flex; flex-direction: column; gap: 4px; align-items: center;">
          <input type="text" class="form-control text-center" value="${c.label}" 
                 onchange="Admin.renameColumn('${c.key}', this.value)" 
                 style="font-size: 0.75rem; font-weight: 800; padding: 4px; border: 1.5px dashed var(--primary); background: #f8fafc; border-radius: 4px;">
          <button type="button" class="btn-icon-danger" onclick="Admin.deleteColumn('${c.key}')" 
                  style="width: 20px; height: 20px; font-size: 0.7rem; border-radius: 4px; margin-top: 2px;" title="Изтрий колоната">✕</button>
        </div>
      </th>
    `).join("");

    const rowsHTML = activeVariants.map((v, rIdx) => `
      <tr class="admin-variant-tr">
        ${this.currentColumns.map(c => {
          const val = v[c.key] !== undefined ? v[c.key] : '';
          const isPrice = c.key === 'priceEur';
          return `
            <td data-label="${c.label}" style="padding: 5px;">
              <input type="text" 
                     class="form-control var-cell" 
                     data-key="${c.key}" 
                     value="${val}" 
                     style="padding: 6px; font-size: 0.8rem; ${isPrice ? 'font-weight: 700; border-color: var(--accent);' : ''}">
            </td>
          `;
        }).join("")}
        <td data-label="Действия" style="padding: 5px; text-align: center;">
          <button type="button" class="btn-icon-danger" style="width: 32px; height: 32px; font-size: 0.9rem;" onclick="this.parentElement.parentElement.remove()">×</button>
        </td>
      </tr>
    `).join("");

    return `
      <div class="form-group mt-20">
        <label style="font-weight: 800; display: block; border-bottom: 1px solid var(--border-light); padding-bottom: 8px; color: var(--primary);">📏 Таблица с размери, цени и детайли (Еднакви с продуктовата таблица)</label>
        <p class="text-muted font-xs" style="margin-bottom: 15px;">Всички полета и колони са изцяло редактируеми. Можете да променяте имената на колоните, да добавяте нови или да ги изтривате.</p>
        
        <!-- Table Column Templates Selection Bar -->
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid var(--border-light); margin-bottom: 20px;">
          <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
            <div>
              <label style="font-weight: 700; font-size: 0.8rem; color: #475569; display: block; margin-bottom: 5px;">📋 Бърз шаблон на колоните:</label>
              <select class="form-control" onchange="Admin.loadTemplateById(this.value)" style="width: 250px; padding: 6px; font-weight: 700; height: 36px;">
                <option value="">-- Изберете готов шаблон --</option>
                ${templateOptions}
              </select>
            </div>
            <div>
              <label style="font-weight: 700; font-size: 0.8rem; color: #475569; display: block; margin-bottom: 5px;">💾 Запази текущите колони като шаблон:</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="new-template-name" class="form-control" placeholder="напр. Шаблон за Въздух" style="width: 220px; padding: 6px; height: 36px;">
                <button type="button" class="btn btn-secondary" onclick="Admin.saveTemplate(document.getElementById('new-template-name').value)" style="height: 36px; padding: 0 15px;">Запази</button>
              </div>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary btn-small" onclick="Admin.addColumn()">➕ Добави Нова Колона</button>
          <button type="button" class="btn btn-secondary btn-small" onclick="Admin.addNewVariantRow()">➕ Добави Нов Размер (Ред)</button>
        </div>

        <div class="admin-table-responsive" style="max-width: 100%; overflow-x: auto; border-radius: 8px; border: 1px solid var(--border-light);">
          <table class="admin-table" style="min-width: 900px; font-size: 0.85rem; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f1f5f9;">
                ${headersHTML}
                <th style="padding: 8px; width: 60px; text-align: center;">Действие</th>
              </tr>
            </thead>
            <tbody id="prod-variants-tbody">
              ${rowsHTML}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  collectVariantsFromDOM() {
    const tbody = document.getElementById("prod-variants-tbody");
    if (!tbody) return null;
    
    const variants = [];
    tbody.querySelectorAll(".admin-variant-tr").forEach(row => {
      const v = {};
      row.querySelectorAll(".var-cell").forEach(input => {
        const key = input.getAttribute("data-key");
        const val = input.value.trim();
        if (key === 'code' || key === 'inch') {
          v[key] = val;
        } else {
          v[key] = isNaN(parseFloat(val)) || val === '' ? val : parseFloat(val);
        }
      });
      if (Object.keys(v).length > 0) {
        variants.push(v);
      }
    });
    return variants;
  },

  renameColumn(key, newLabel) {
    if (!this.currentColumns) return;
    const col = this.currentColumns.find(c => c.key === key);
    if (col) {
      col.label = newLabel.trim();
    }
    const activeVariants = this.collectVariantsFromDOM();
    this.refreshVariantsTable(activeVariants);
  },

  deleteColumn(key) {
    if (confirm("Сигурни ли сте, че искате да изтриете тази колона? Данните в нея ще бъдат премахнати.")) {
      const activeVariants = this.collectVariantsFromDOM();
      if (activeVariants) {
        activeVariants.forEach(v => {
          delete v[key];
        });
      }
      this.currentColumns = this.currentColumns.filter(c => c.key !== key);
      this.refreshVariantsTable(activeVariants);
    }
  },

  addColumn() {
    const label = prompt("Въведете име на новата колона (напр. Работна температура):");
    if (label && label.trim()) {
      const key = "col_" + Date.now();
      const activeVariants = this.collectVariantsFromDOM();
      if (activeVariants) {
        activeVariants.forEach(v => {
          v[key] = "";
        });
      }
      if (!this.currentColumns) this.currentColumns = [];
      this.currentColumns.push({ key, label: label.trim() });
      this.refreshVariantsTable(activeVariants);
    }
  },

  addNewVariantRow() {
    const activeVariants = this.collectVariantsFromDOM() || [];
    const newRow = {};
    if (!this.currentColumns) return;
    this.currentColumns.forEach(c => {
      newRow[c.key] = "";
    });
    activeVariants.push(newRow);
    this.refreshVariantsTable(activeVariants);
  },

  refreshVariantsTable(variants = null) {
    const container = document.getElementById("variants-table-container");
    if (container) {
      if (variants) {
        this.tempVariants = variants;
      }
      container.innerHTML = this.renderVariantsTable();
      this.tempVariants = null;
    }
  },

  initProductFormHandlers() {
    // Register file input listener
    const fileInput = document.getElementById("prod-images-upload");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);
        let filesLoaded = 0;

        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64String = event.target.result;
            Admin.uploadedImages.push(base64String);
            filesLoaded++;
            
            if (filesLoaded === files.length) {
              Admin.renderImagePreviews();
            }
          };
          reader.readAsDataURL(file);
        });
      });
    }

    // Populate thumbnails preview
    this.renderImagePreviews();

    // Populate template variant row if empty
    const tbody = document.getElementById("prod-variants-tbody");
    if (tbody && tbody.children.length === 0) {
      this.addNewVariantRow();
    }
  },

  renderImagePreviews() {
    const previewContainer = document.getElementById("prod-images-preview");
    if (!previewContainer) return;

    previewContainer.innerHTML = this.uploadedImages.map((img, idx) => {
      if (!img) return '';
      return `
        <div class="image-preview-wrapper" draggable="true" data-index="${idx}">
          <div class="image-preview-drag-handle">⠿</div>
          ${idx === 0 ? `<div class="image-preview-crown" title="Главно лице на продукта">👑 Главна</div>` : ''}
          <img src="${img}" class="image-preview-thumbnail">
          <div class="image-preview-delete" onclick="Admin.removeUploadedImage(${idx}, event)">×</div>
        </div>
      `;
    }).join("");

    this.setupDragAndDrop();
  },

  removeUploadedImage(index, event) {
    event.stopPropagation();
    this.uploadedImages.splice(index, 1);
    this.renderImagePreviews();
  },

  // Touch & Mouse Drag and Drop Reordering Engine
  setupDragAndDrop() {
    const container = document.getElementById("prod-images-preview");
    if (!container) return;

    let draggedItem = null;

    container.querySelectorAll(".image-preview-wrapper").forEach(item => {
      // 1. Desktop mouse events
      item.addEventListener("dragstart", (e) => {
        draggedItem = item;
        item.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      });

      item.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      });

      item.addEventListener("drop", (e) => {
        e.preventDefault();
        if (item !== draggedItem) {
          const children = Array.from(container.children);
          const draggedIdx = children.indexOf(draggedItem);
          const targetIdx = children.indexOf(item);

          if (draggedIdx < targetIdx) {
            container.insertBefore(draggedItem, item.nextSibling);
          } else {
            container.insertBefore(draggedItem, item);
          }

          // Sync with uploadedImages memory state
          const reorderedImages = [];
          Array.from(container.children).forEach(wrapper => {
            const idx = parseInt(wrapper.getAttribute("data-index"));
            reorderedImages.push(Admin.uploadedImages[idx]);
          });

          Admin.uploadedImages = reorderedImages;
          Admin.renderImagePreviews(); // Re-render to update crowns & indices
        }
      });

      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
        draggedItem = null;
      });

      // 2. Mobile touch events for true drag & drop reordering
      item.addEventListener("touchstart", (e) => {
        draggedItem = item;
        item.classList.add("dragging");
      }, { passive: true });

      item.addEventListener("touchmove", (e) => {
        if (!draggedItem) return;
        
        // Prevent default screen scrolling during active drag
        if (e.cancelable) {
          e.preventDefault();
        }
        
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (!element) return;
        
        const hoverItem = element.closest(".image-preview-wrapper");
        if (hoverItem && hoverItem !== draggedItem && hoverItem.parentNode === container) {
          const children = Array.from(container.children);
          const draggedIdx = children.indexOf(draggedItem);
          const hoverIdx = children.indexOf(hoverItem);
          
          if (draggedIdx < hoverIdx) {
            container.insertBefore(draggedItem, hoverItem.nextSibling);
          } else {
            container.insertBefore(draggedItem, hoverItem);
          }
        }
      }, { passive: false });

      item.addEventListener("touchend", () => {
        if (!draggedItem) return;
        item.classList.remove("dragging");
        
        // Sync reordered state with the memory array Admin.uploadedImages
        const reorderedImages = [];
        Array.from(container.children).forEach(wrapper => {
          const originalIdx = parseInt(wrapper.getAttribute("data-index"));
          reorderedImages.push(Admin.uploadedImages[originalIdx]);
        });
        
        Admin.uploadedImages = reorderedImages;
        Admin.renderImagePreviews(); // Re-render to update crowns & indices
        
        draggedItem = null;
      });

      item.addEventListener("touchcancel", () => {
        if (!draggedItem) return;
        item.classList.remove("dragging");
        draggedItem = null;
      });
    });
  },

  startEditProduct(prodId) {
    const prod = CONFIG.products.find(p => p.id === prodId);
    if (prod) {
      this.editingProduct = prod;
      this.uploadedImages = [...prod.images]; // Load existing images
      this.currentColumns = prod.columns ? [...prod.columns] : null; // Load product columns
      this.render();
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  },

  cancelProductEdit() {
    this.editingProduct = null;
    this.uploadedImages = [];
    this.currentColumns = null; // Clear columns
    this.render();
  },

  handleProductSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("prod-name").value.trim();
    const code = document.getElementById("prod-code").value.trim();
    const category = document.getElementById("prod-category").value;
    const brand = document.getElementById("prod-brand").value.trim();

    // JS-based validation for required core fields (replaces silent HTML5 blocks)
    if (!name) { alert("Моля въведете Име на продукта!"); document.getElementById("prod-name").focus(); return; }
    if (!code) { alert("Моля въведете Код / Артикулен номер!"); document.getElementById("prod-code").focus(); return; }
    if (!category) { alert("Моля изберете Категория!"); document.getElementById("prod-category").focus(); return; }
    if (!brand) { alert("Моля въведете Марка!"); document.getElementById("prod-brand").focus(); return; }
    const description = document.getElementById("prod-description").value.trim();
    const tagsInput = document.getElementById("prod-tags").value;
    const isSpecial = document.getElementById("prod-is-special").checked;

    const tags = tagsInput ? tagsInput.split(",").map(t => t.trim()) : [];
    
    // Read all uploaded base64 / url images in order
    const images = this.uploadedImages.filter(img => img !== null && img !== "");

    if (images.length === 0) {
      alert("Моля качете поне една снимка от устройството!");
      return;
    }

    // 1. Collect technical specifications
    const specs = [];
    document.querySelectorAll(".admin-spec-row").forEach(row => {
      const key = row.querySelector(".spec-key").value.trim();
      const val = row.querySelector(".spec-val").value.trim();
      if (key && val) {
        specs.push({ key, value: val });
      }
    });

    // 2. Collect dynamic size/variant columns using our DOM collector
    const variants = this.collectVariantsFromDOM();

    if (!variants || variants.length === 0) {
      alert("Моля добавете поне един размер в таблицата!");
      return;
    }

    if (this.editingProduct) {
      // EDIT MODE
      const target = CONFIG.products.find(p => p.id === this.editingProduct.id);
      if (target) {
        target.name = name;
        target.code = code;
        target.category = category;
        target.brand = brand;
        target.description = description;
        target.tags = tags;
        target.isSpecial = isSpecial;
        target.images = images;
        target.specs = specs;
        target.columns = this.currentColumns; // Save columns schema
        target.variants = variants;
      }
      CONFIG.saveState();
      this.editingProduct = null;
      this.uploadedImages = [];
      this.currentColumns = null;
      alert("Продуктът е успешно редактиран и обновен на сайта!");
    } else {
      // CREATE MODE
      const id = name.toLowerCase()
        .replace(/[^а-яa-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .replace(/[а-я]/g, m => {
          const cyr = "абвгдежзийклмнопрстуфхцчшщъьюя";
          const lat = ["a","b","v","g","d","e","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","h","ts","ch","sh","sht","a","y","yu","ya"];
          const idx = cyr.indexOf(m);
          return idx > -1 ? lat[idx] : m;
        });

      if (CONFIG.products.some(p => p.id === id)) {
        alert("Продукт с това име вече съществува!");
        return;
      }

      const newProduct = {
        id,
        code,
        name,
        category,
        brand,
        rating: 5.0,
        reviewsCount: 1,
        views: 12,
        inStock: true,
        isSpecial,
        tags,
        description,
        specs,
        images,
        columns: this.currentColumns, // Save columns schema
        variants
      };

      CONFIG.addProduct(newProduct);
      this.currentColumns = null;
      alert("Продуктът е успешно добавен!");
    }

    this.propagateStateChanges();
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
        <tr class="admin-table-row">
          <td data-label="Икона"><span style="font-size: 1.4rem;">${c.icon || '📦'}</span></td>
          <td data-label="Име"><strong>${c.name}</strong></td>
          <td data-label="Брой продукти"><span class="admin-badge admin-badge-success">${productCount} продукта</span></td>
          <td data-label="Действия">
            <div class="admin-actions-cell">
              <button class="btn-admin-action btn-admin-edit" onclick="Admin.startEditCategory('${c.id}')">✏️ Редактирай</button>
              <button class="btn-admin-action btn-admin-danger" onclick="Admin.deleteCategory('${c.id}')">✕ Изтрий</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    if (categories.length === 0) {
      categoryRows = `<tr><td colspan="4" class="text-center text-muted" style="padding: 30px; color: #94a3b8;">Няма въведени категории.</td></tr>`;
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
      // EDIT MODE
      const target = CONFIG.categories.find(c => c.id === this.editingCategory.id);
      if (target) {
        target.name = name;
        target.icon = icon;
      }
      CONFIG.saveState();
      this.editingCategory = null;
      alert("Категорията е успешно актуализирана!");
    } else {
      // CREATE MODE
      const id = name.toLowerCase()
        .replace(/[^а-яa-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .replace(/[а-я]/g, m => {
          const cyr = "абвгдежзийклмнопрстуфхцчшщъьюя";
          const lat = ["a","b","v","g","d","e","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","h","ts","ch","sh","sht","a","y","yu","ya"];
          const idx = cyr.indexOf(m);
          return idx > -1 ? lat[idx] : m;
        });

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
  },

  loadTemplates() {
    const raw = localStorage.getItem("hydrolux_table_templates");
    if (raw) {
      try {
        this.savedTemplates = JSON.parse(raw);
      } catch (e) {
        this.savedTemplates = [];
      }
    } else {
      this.savedTemplates = [
        {
          id: "standard",
          name: "Стандартен (Маркучи)",
          columns: [
            { key: "code", label: "Код на размер" },
            { key: "innerDb", label: "Вътр. ø (мм)" },
            { key: "inch", label: "Инч" },
            { key: "outerDb", label: "Външ. ø (мм)" },
            { key: "pressure", label: "Работно нал.(Bar)" },
            { key: "bend", label: "Радиус огъване(мм)" },
            { key: "weight", label: "Тегло кг/м" },
            { key: "rollLength", label: "Дълж. ролка(м)" },
            { key: "priceEur", label: "Цена EUR (€)" }
          ]
        }
      ];
      localStorage.setItem("hydrolux_table_templates", JSON.stringify(this.savedTemplates));
    }
  },

  saveTemplate(name) {
    if (!name || !name.trim()) {
      alert("Моля въведете име на шаблона!");
      return;
    }
    this.loadTemplates();
    const id = "tpl_" + Date.now();
    this.savedTemplates.push({
      id,
      name: name.trim(),
      columns: [...this.currentColumns]
    });
    localStorage.setItem("hydrolux_table_templates", JSON.stringify(this.savedTemplates));
    alert(`Шаблонът "${name}" е запазен успешно!`);
    this.refreshVariantsTable();
  },

  loadTemplateById(id) {
    if (!id) return;
    this.loadTemplates();
    const tpl = this.savedTemplates.find(t => t.id === id);
    if (tpl) {
      this.currentColumns = [...tpl.columns];
      const activeVariants = this.collectVariantsFromDOM() || [];
      if (activeVariants.length === 0) {
        const newRow = {};
        this.currentColumns.forEach(c => {
          newRow[c.key] = "";
        });
        activeVariants.push(newRow);
      }
      this.refreshVariantsTable(activeVariants);
    }
  }
};
