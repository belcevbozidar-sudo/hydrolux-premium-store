// Hydrolux Premium Store - Admin Dashboard Module
const Admin = {
  activeTab: "products", // "products" or "categories" or "system"

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
        padding: 20px;
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
            <li class="admin-menu-item ${this.activeTab === 'system' ? 'active' : ''}" onclick="Admin.switchTab('system')">
              ⚙️ Настройки & Тест
            </li>
          </ul>
        </aside>

        <!-- Main Workspace -->
        <main class="admin-content" id="admin-workspace">
          ${this.renderActiveWorkspace()}
        </main>
      </div>
    `;

    // Initialize custom interactive listeners (like dynamic specs or variants)
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
      case "system":
        return this.renderSystemWorkspace();
      default:
        return "Няма намерен работен панел.";
    }
  },

  // ==========================================================================
  // PRODUCTS WORKSPACE
  // ==========================================================================
  renderProductsWorkspace() {
    const products = CONFIG.products;

    let productRows = products.map(p => {
      const minPrice = Math.min(...p.variants.map(v => v.priceEur));
      const catObj = CONFIG.categories.find(c => c.id === p.category);
      const catName = catObj ? catObj.name : p.category;

      return `
        <tr>
          <td>
            <strong>${p.name}</strong><br>
            <span class="text-muted font-xs">Код: ${p.code} | Марка: ${p.brand}</span>
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
      productRows = `<tr><td colspan="5" class="text-center text-muted">Няма добавени продукти. Добавете нов чрез формата по-долу!</td></tr>`;
    }

    // Generate categories options for product creation
    const categoryOptions = CONFIG.categories.map(c => `
      <option value="${c.id}">${c.name}</option>
    `).join("");

    return `
      <div class="admin-header-row">
        <h2>Управление на Продукти</h2>
        <span class="admin-badge admin-badge-success">${products.length} Продукта общо</span>
      </div>

      <!-- Add New Product Form Card -->
      <div class="admin-form-card">
        <h4>➕ Добавяне на нов продукт</h4>
        <form id="admin-add-product-form" onsubmit="Admin.handleProductSubmit(event)">
          <div class="form-grid-2">
            <div class="form-group">
              <label>Име на продукта <span class="text-accent">*</span></label>
              <input type="text" id="prod-name" class="form-control" placeholder="напр. Маркуч за гореща вода SEMPERIT FKS" required>
            </div>
            <div class="form-group">
              <label>Код / Артикулен номер <span class="text-accent">*</span></label>
              <input type="text" id="prod-code" class="form-control" placeholder="напр. FKS15" required>
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

          <div class="form-grid-2">
            <div class="form-group">
              <label>Етикети (разделени със запетая)</label>
              <input type="text" id="prod-tags" class="form-control" placeholder="гумен маркуч, гореща вода, semperit">
            </div>
            <div class="form-group">
              <label>Линк към снимка (Unsplash или локален)</label>
              <input type="url" id="prod-image" class="form-control" placeholder="https://images.unsplash.com/photo-...">
            </div>
          </div>

          <!-- Product Specs Section -->
          <div class="form-group">
            <label style="font-weight: 800;">⚙️ Технически характеристики</label>
            <div id="prod-specs-container">
              <div class="admin-spec-row">
                <input type="text" class="form-control spec-key" placeholder="напр. Работно налягане">
                <input type="text" class="form-control spec-val" placeholder="напр. 20 bar">
                <button type="button" class="btn-icon-danger" onclick="this.parentElement.remove()">×</button>
              </div>
            </div>
            <button type="button" class="btn btn-secondary mt-10" onclick="Admin.addNewSpecRow()">+ Добави Характеристика</button>
          </div>

          <!-- Product Variants (Sizes/Prices) Section -->
          <div class="form-group mt-20">
            <label style="font-weight: 800; display: block; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">📏 Размери и Цени в EUR (Въведете поне един ред)</label>
            <div id="prod-variants-container">
              <div class="admin-variant-row" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto; gap: 8px; margin-bottom: 8px; align-items: center;">
                <input type="number" step="any" class="form-control var-inner" placeholder="Вътр. ø (DN)" required>
                <input type="text" class="form-control var-inch" placeholder="Размер (инч)" required>
                <input type="number" step="any" class="form-control var-outer" placeholder="Външ. ø (мм)" required>
                <input type="number" step="any" class="form-control var-pressure" placeholder="Наляг. (bar)" required>
                <input type="number" step="any" class="form-control var-price" placeholder="Цена в EUR (€)" required>
                <button type="button" class="btn-icon-danger" onclick="this.parentElement.remove()">×</button>
              </div>
            </div>
            <button type="button" class="btn btn-secondary mt-10" onclick="Admin.addNewVariantRow()">+ Добави нов размер (Вариант)</button>
          </div>

          <div class="divider"></div>
          <button type="submit" class="btn btn-accent btn-large" style="min-width: 200px;">💾 Запази Продукта</button>
        </form>
      </div>

      <!-- Current Products Table -->
      <h3 style="font-weight: 800; font-size: 1.2rem; margin-top: 35px; margin-bottom: 15px; color: #1e293b;">Списък с налични продукти</h3>
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
    const container = document.getElementById("prod-variants-container");
    if (!container) return;
    const div = document.createElement("div");
    div.className = "admin-variant-row";
    div.style = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto; gap: 8px; margin-bottom: 8px; align-items: center;";
    div.innerHTML = `
      <input type="number" step="any" class="form-control var-inner" placeholder="Вътр. ø (DN)" required>
      <input type="text" class="form-control var-inch" placeholder="Размер (инч)" required>
      <input type="number" step="any" class="form-control var-outer" placeholder="Външ. ø (мм)" required>
      <input type="number" step="any" class="form-control var-pressure" placeholder="Наляг. (bar)" required>
      <input type="number" step="any" class="form-control var-price" placeholder="Цена в EUR (€)" required>
      <button type="button" class="btn-icon-danger" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(div);
  },

  initProductFormHandlers() {
    // Add default behavior if containers are empty to populate at least one variant template row
    const varsContainer = document.getElementById("prod-variants-container");
    if (varsContainer && varsContainer.children.length === 0) {
      this.addNewVariantRow();
    }
  },

  handleProductSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("prod-name").value;
    const code = document.getElementById("prod-code").value;
    const category = document.getElementById("prod-category").value;
    const brand = document.getElementById("prod-brand").value;
    const description = document.getElementById("prod-description").value;
    const tagsInput = document.getElementById("prod-tags").value;
    const imageInput = document.getElementById("prod-image").value;

    const tags = tagsInput ? tagsInput.split(",").map(t => t.trim()) : [];
    const imageUrl = imageInput || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop";

    // 1. Parse specifications
    const specs = [];
    document.querySelectorAll(".admin-spec-row").forEach(row => {
      const key = row.querySelector(".spec-key").value.trim();
      const val = row.querySelector(".spec-val").value.trim();
      if (key && val) {
        specs.push({ key, value: val });
      }
    });

    // 2. Parse variants
    const variants = [];
    document.querySelectorAll(".admin-variant-row").forEach((row, index) => {
      const inner = parseFloat(row.querySelector(".var-inner").value);
      const inch = row.querySelector(".var-inch").value.trim();
      const outer = parseFloat(row.querySelector(".var-outer").value);
      const pressure = parseFloat(row.querySelector(".var-pressure").value);
      const price = parseFloat(row.querySelector(".var-price").value);

      if (!isNaN(price)) {
        variants.push({
          code: `${code}-${index + 1}`,
          innerDb: inner,
          inch: inch,
          outerDb: outer,
          pressure: pressure,
          bend: 0,
          weight: 0.1,
          rollLength: 50,
          priceEur: price
        });
      }
    });

    if (variants.length === 0) {
      alert("Моля въведете поне един размер с валидна цена в евро!");
      return;
    }

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newProduct = {
      id,
      code,
      name,
      category,
      subcategory: "",
      brand,
      rating: 5.0,
      reviewsCount: 1,
      views: 12,
      inStock: true,
      tags,
      description,
      specs,
      images: [imageUrl],
      variants
    };

    // Add product to memory/local storage state
    CONFIG.addProduct(newProduct);

    // Dynamic rendering propagation across all screens instantly
    this.propagateStateChanges();
    
    alert("Продуктът е успешно записан и се вижда в реално време!");
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
          <td><code>${c.id}</code></td>
          <td><span class="admin-badge admin-badge-success">${productCount} продукта</span></td>
          <td>
            <button class="btn-admin-action btn-admin-danger" onclick="Admin.deleteCategory('${c.id}')">✕ Изтрий</button>
          </td>
        </tr>
      `;
    }).join("");

    if (categories.length === 0) {
      categoryRows = `<tr><td colspan="5" class="text-center text-muted">Няма въведени категории.</td></tr>`;
    }

    return `
      <div class="admin-header-row">
        <h2>Управление на Категории</h2>
        <span class="admin-badge admin-badge-category">${categories.length} Категории</span>
      </div>

      <!-- Add New Category Form -->
      <div class="admin-form-card">
        <h4>📁 Добавяне на нова категория</h4>
        <form onsubmit="Admin.handleCategorySubmit(event)">
          <div class="form-grid-2">
            <div class="form-group">
              <label>Име на категорията <span class="text-accent">*</span></label>
              <input type="text" id="cat-name" class="form-control" placeholder="напр. Маркучи за пара" required>
            </div>
            <div class="form-group">
              <label>Икона / Емоджи <span class="text-accent">*</span></label>
              <input type="text" id="cat-icon" class="form-control" placeholder="напр. 💨 или 🌡️" required>
            </div>
          </div>
          <button type="submit" class="btn btn-accent mt-10">💾 Запази Категорията</button>
        </form>
      </div>

      <!-- Current Categories Table -->
      <h3 style="font-weight: 800; font-size: 1.2rem; margin-top: 35px; margin-bottom: 15px; color: #1e293b;">Налични категории</h3>
      <div style="overflow-x: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th width="40">Икона</th>
              <th>Име</th>
              <th>Системен ID</th>
              <th>Брой продукти</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            ${categoryRows}
          </tbody>
        </table>
      </div>
    `;
  },

  handleCategorySubmit(event) {
    event.preventDefault();

    const name = document.getElementById("cat-name").value;
    const icon = document.getElementById("cat-icon").value;
    const id = name.toLowerCase()
      .replace(/[^а-яa-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .replace(/[а-я]/g, m => {
        // Simple cyrillic-to-latin transliteration for URL compatibility
        const cyr = "абвгдежзийклмнопрстуфхцчшщъьюя";
        const lat = ["a","b","v","g","d","e","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","h","ts","ch","sh","sht","a","y","yu","ya"];
        const idx = cyr.indexOf(m);
        return idx > -1 ? lat[idx] : m;
      });

    const newCategory = {
      id,
      name,
      icon,
      subcategories: []
    };

    CONFIG.addCategory(newCategory);
    this.propagateStateChanges();

    alert("Категорията е успешно създадена и добавена!");
    this.render();
  },

  deleteCategory(categoryId) {
    if (confirm("Наистина ли искате да изтриете тази категория? Всички продукти в нея няма да имат свързана категория.")) {
      CONFIG.deleteCategory(categoryId);
      this.propagateStateChanges();
      this.render();
    }
  },

  // ==========================================================================
  // SYSTEM SETUP WORKSPACE (RESET & UTILITIES)
  // ==========================================================================
  renderSystemWorkspace() {
    return `
      <div class="admin-header-row">
        <h2>Системни Настройки</h2>
      </div>

      <div class="card p-30 text-center" style="border: 1px dashed var(--border-light); background-color: #f8fafc;">
        <span style="font-size: 3rem; display: block; margin-bottom: 15px;">🔄</span>
        <h4 style="font-weight: 800; font-size: 1.2rem; color: #1e293b; margin-bottom: 10px;">Връщане на фабрични данни</h4>
        <p class="text-muted font-small" style="max-width: 500px; margin: 0 auto 20px;">
          Тази операция ще изтрие всички продукти и категории, които сте добавили или изтрили в админ панела, и ще възстанови пълния асортимент на "Хидролукс Груп" с 8-те премиум индустриални продукта по подразбиране.
        </p>
        <button class="btn btn-accent btn-large" onclick="CONFIG.resetToDefaults()">Възстанови Спецификации по подразбиране</button>
      </div>

      <div class="card p-30 mt-30">
        <h4 style="font-weight: 800; color: #1e293b; margin-bottom: 15px; border-left: 3px solid var(--primary); padding-left: 8px;">📊 Информационно табло за данни</h4>
        <div class="form-grid-2" style="margin-top: 15px;">
          <div style="background-color: var(--primary-light); padding: 15px; border-radius: 8px;">
            <span class="text-muted font-xs font-bold text-uppercase">Продукти в паметта</span>
            <h3 style="font-size: 2rem; font-weight: 900; color: var(--primary); margin-top: 5px;">${CONFIG.products.length}</h3>
          </div>
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px;">
            <span style="color: #d97706;" class="font-xs font-bold text-uppercase">Категории в паметта</span>
            <h3 style="font-size: 2rem; font-weight: 900; color: #d97706; margin-top: 5px;">${CONFIG.categories.length}</h3>
          </div>
        </div>
      </div>
    `;
  },

  // Propagates active memory/localStorage state to all visible SPA views instantly
  propagateStateChanges() {
    // 1. Re-render UI components on main page
    App.renderQuickCategories();
    App.renderSearchCategories();
    App.renderFeaturedProductsHome();
    
    // 2. Re-render catalog view
    Catalog.renderSidebar();
    Catalog.applyFiltersAndRender();
  }
};
