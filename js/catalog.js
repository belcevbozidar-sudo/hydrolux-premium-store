// Catalog Filtering, Dropdowns & Details Controller (Euro € Optimized)
const Catalog = {
  activeCategory: null,
  searchQuery: "",

  // Render product categories inside the top collapsible dropdown menu
  renderSidebar() {
    const menu = document.getElementById("catalog-cat-dropdown-menu");
    if (!menu) return;

    menu.innerHTML = `
      <div class="dropdown-all-item" onclick="Catalog.selectCategory(''); Catalog.toggleCategoriesDropdown()">
        📂 Всички Продукти (Всички Категории)
      </div>
      ${CONFIG.categories.map(cat => `
        <div class="dropdown-col">
          <div class="dropdown-col-title" onclick="Catalog.selectCategory('${cat.id}'); Catalog.toggleCategoriesDropdown()">
            ${cat.icon || '📦'} ${cat.name}
          </div>
        </div>
      `).join("")}
    `;
  },

  toggleCategoriesDropdown() {
    const menu = document.getElementById("catalog-cat-dropdown-menu");
    if (menu) {
      menu.classList.toggle("hidden");
    }
  },

  selectCategory(catId) {
    const btn = document.getElementById("catalog-cat-dropdown-btn");
    
    if (!catId) {
      this.activeCategory = null;
      if (btn) btn.textContent = "📂 Изберете Категория (Всички Категории) ▾";
    } else {
      this.activeCategory = catId;
      const cat = CONFIG.categories.find(c => c.id === catId);
      if (btn && cat) btn.textContent = `📂 Категория: ${cat.name} ▾`;
    }
    
    if (App.currentView !== "catalog") {
      App.navigate("catalog");
    }
    
    this.applyFiltersAndRender();
  },

  resetFilters() {
    this.activeCategory = null;
    this.searchQuery = "";
    
    const btn = document.getElementById("catalog-cat-dropdown-btn");
    if (btn) btn.textContent = "📂 Изберете Категория (Всички Категории) ▾";
    
    const searchInput = document.getElementById("search-input-blue");
    if (searchInput) searchInput.value = "";
    
    this.applyFiltersAndRender();
  },

  applyFiltersAndRender() {
    const products = CONFIG.products;
    const grid = document.getElementById("products-grid");
    if (!grid) return;

    let filtered = products.filter(p => {
      // 1. Category check
      if (this.activeCategory && p.category !== this.activeCategory) return false;

      // 2. Search check
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesCode = p.code.toLowerCase().includes(query);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesCode && !matchesTags) return false;
      }

      return true;
    });

    // Update active filters title
    const titleEl = document.getElementById("catalog-active-title");
    const countEl = document.getElementById("catalog-count");
    if (countEl) countEl.textContent = filtered.length;

    if (titleEl) {
      if (this.activeCategory) {
        const cat = CONFIG.categories.find(c => c.id === this.activeCategory);
        titleEl.textContent = cat ? cat.name : "Всички продукти";
      } else if (this.searchQuery) {
        titleEl.textContent = `Резултати за "${this.searchQuery}"`;
      } else {
        titleEl.textContent = "Всички продукти";
      }
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-products text-center py-40 card">
          <div class="no-products-icon">🔍</div>
          <h3>Няма намерени продукти</h3>
          <p class="text-muted">Променете филтрите или опитайте с друга ключова дума.</p>
          <button class="btn btn-secondary mt-20" onclick="Catalog.resetFilters()">Изчисти филтрите</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => {
      const prices = p.variants.map(v => v.priceEur);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const priceText = prices.length > 1
        ? `от ${formatPrice(minPrice, p.unit === 'м').eur} до ${formatPrice(maxPrice, p.unit === 'м').eur}`
        : `${formatPrice(minPrice, p.unit === 'м').eur}`;

      return `
        <div class="product-card card" onclick="Catalog.openProductDetails('${p.id}')">
          <div class="product-badge">${p.inStock ? 'В наличност' : 'По поръчка'}</div>
          <div class="product-card-img-wrapper">
            <img src="${p.images[0]}" alt="${p.name}" class="product-card-img" onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'">
          </div>
          <div class="product-card-body">
            <div class="product-card-brand">${p.brand}</div>
            <h4 class="product-card-title">${p.name}</h4>
            <div class="product-card-rating">
              <span class="stars">★★★★★</span>
              <span class="rating-val">${p.rating.toFixed(1)}</span>
            </div>
            
            <div class="product-card-bottom">
              <div class="product-card-price">
                <span class="price-bgn font-medium text-primary font-bold">${priceText}</span>
                <span class="price-eur font-xs text-muted">/ линеен метър или бр.</span>
              </div>
              <button class="btn btn-secondary btn-icon" onclick="event.stopPropagation(); Catalog.openProductDetails('${p.id}')">➔</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  openProductDetails(productId) {
    const product = CONFIG.products.find(p => p.id === productId);
    if (!product) return;

    // Transition view
    App.navigate("product-detail");

    // Breadcrumb rendering
    const breadcrumb = document.getElementById("product-detail-breadcrumb");
    if (breadcrumb) {
      const cat = CONFIG.categories.find(c => c.id === product.category);
      breadcrumb.innerHTML = `
        <a onclick="App.navigate('home')">Начало</a> › 
        <a onclick="Catalog.selectCategory('${cat.id}'); App.navigate('catalog')">${cat.name}</a> › 
        <span class="text-muted">${product.name}</span>
      `;
    }

    // Set title and brand
    document.getElementById("prod-title").textContent = product.name;
    document.getElementById("prod-brand").textContent = product.brand;
    document.getElementById("prod-sku").textContent = product.code;
    document.getElementById("prod-views").textContent = product.views;
    
    // Set stock
    const stockEl = document.getElementById("prod-stock");
    stockEl.className = `stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`;
    stockEl.textContent = product.inStock ? "В наличност" : "По запитване";

    // Inject Description
    document.getElementById("prod-desc-text").innerHTML = product.description.replace(/\n\n/g, "<br><br>");

    // Inject Specs List
    const specsContainer = document.getElementById("prod-specs-list");
    specsContainer.innerHTML = product.specs.map(s => `
      <div class="spec-row">
        <span class="spec-key">${s.key}</span>
        <span class="spec-val">${s.value}</span>
      </div>
    `).join("");

    // Inject Tags
    const tagsContainer = document.getElementById("prod-tags-container");
    tagsContainer.innerHTML = product.tags.map(t => `
      <span class="tag" onclick="Catalog.triggerTagSearch('${t}')">${t}</span>
    `).join("");

    // Inject Gallery Image
    const mainImg = document.getElementById("prod-main-image");
    mainImg.src = product.images[0];
    
    const thumbsContainer = document.getElementById("prod-thumbnails");
    thumbsContainer.innerHTML = product.images.map((img, idx) => `
      <img src="${img}" class="thumb-img ${idx === 0 ? 'active' : ''}" 
           onclick="Catalog.changeMainImage('${img}', this)">
    `).join("");

    // 🔥 Dynamic Variants Table strictly in EUR €
    const tableContainer = document.querySelector(".table-responsive");
    if (tableContainer) {
      const cols = product.columns || [
        { key: "code", label: "Код на размер" },
        { key: "innerDb", label: "Вътр. ø (мм)", suffix: " мм" },
        { key: "inch", label: "Инч" },
        { key: "outerDb", label: "Външ. ø (мм)", suffix: " мм" },
        { key: "pressure", label: "Работно нал.", suffix: " Bar" },
        { key: "bend", label: "Радиус огъване", suffix: " мм" },
        { key: "weight", label: "Тегло", suffix: " кг/м" },
        { key: "rollLength", label: "Дълж. ролка", suffix: " м" },
        { key: "priceEur", label: "Цена" }
      ];

      tableContainer.innerHTML = `
        <table class="table">
          <thead>
            <tr>
              ${cols.map(c => `<th>${c.label}</th>`).join("")}
              <th>Количество</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody id="prod-variants-tbody">
            ${product.variants.map((v, idx) => {
              const priceVal = parseFloat(v.priceEur) || 0;
              const vCode = this.getVariantCode(product, v, idx);
              const qtyId = this.getVariantQtyInputId(idx);
              return `
                <tr>
                  ${cols.map(c => {
                    const val = v[c.key] !== undefined ? v[c.key] : '';
                    if (c.key === 'priceEur') {
                      return `<td><div class="table-price-bgn">${formatPrice(priceVal, product.unit === 'м').eur}</div></td>`;
                    }
                    if (c.key === 'code') {
                      return `<td class="font-bold text-primary font-xs">${val}</td>`;
                    }
                    if (c.key === 'pressure') {
                      return `<td><span class="badge badge-warning">${val} Bar</span></td>`;
                    }
                    const suffix = c.suffix || '';
                    return `<td>${val}${suffix}</td>`;
                  }).join("")}
                  <td>
                    <div class="quantity-input-wrapper small">
                      <button class="btn btn-secondary btn-icon small" onclick="Catalog.adjustVariantQtyByIndex(${idx}, -1)">-</button>
                      <input type="number" id="${qtyId}" class="form-control text-center small qty-input" value="1" min="1">
                      <button class="btn btn-secondary btn-icon small" onclick="Catalog.adjustVariantQtyByIndex(${idx}, 1)">+</button>
                    </div>
                  </td>
                  <td>
                    <button class="btn btn-primary small btn-buy-variant" onclick="Catalog.buyVariantByIndex('${product.id}', ${idx})">
                      Купи
                    </button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      `;
    }

    // Set grand "Buy Selected" actions
    const bulkBtn = document.getElementById("prod-bulk-add-btn");
    bulkBtn.onclick = () => {
      let addedAny = false;
      product.variants.forEach((v, idx) => {
        const input = document.getElementById(this.getVariantQtyInputId(idx));
        const qty = parseInt(input.value) || 0;
        if (qty > 0) {
          Cart.addItem(product, this.getVariantCode(product, v, idx), qty);
          addedAny = true;
        }
      });
      if (addedAny) {
        Cart.openDrawer();
      } else {
        Cart.showToast("Моля, задайте количество за поне един вариант.");
      }
    };
  },

  getVariantCode(product, variant, index = 0) {
    if (typeof Cart !== "undefined" && typeof Cart.getVariantCode === "function") {
      return Cart.getVariantCode(product, variant, index);
    }
    return variant.code || `${product.code || product.id || "product"}-${index + 1}`;
  },

  getVariantQtyInputId(index) {
    return `qty-variant-${index}`;
  },

  changeMainImage(src, thumbEl) {
    document.getElementById("prod-main-image").src = src;
    document.querySelectorAll(".thumb-img").forEach(t => t.classList.remove("active"));
    thumbEl.classList.add("active");
  },

  adjustVariantQty(code, diff) {
    const input = document.getElementById(`qty-${code}`);
    if (input) {
      input.value = Math.max(1, (parseInt(input.value) || 1) + diff);
    }
  },

  adjustVariantQtyByIndex(index, diff) {
    const input = document.getElementById(this.getVariantQtyInputId(index));
    if (input) {
      input.value = Math.max(1, (parseInt(input.value) || 1) + diff);
    }
  },

  buyVariant(productId, code) {
    const product = CONFIG.products.find(p => p.id === productId);
    const input = document.getElementById(`qty-${code}`);
    const qty = parseInt(input.value) || 1;
    if (product) {
      Cart.addItem(product, code, qty);
      Cart.openDrawer();
    }
  },

  buyVariantByIndex(productId, index) {
    const product = CONFIG.products.find(p => p.id === productId);
    if (!product || !product.variants || !product.variants[index]) return;

    const input = document.getElementById(this.getVariantQtyInputId(index));
    const qty = parseInt(input ? input.value : 1) || 1;
    const variantCode = this.getVariantCode(product, product.variants[index], index);
    Cart.addItem(product, variantCode, qty);
    Cart.openDrawer();
  },

  triggerTagSearch(tag) {
    this.searchQuery = tag;
    document.getElementById("search-input-blue").value = tag;
    App.navigate("catalog");
    this.applyFiltersAndRender();
  },

  // Modal Inquiry Form (Задай въпрос)
  openInquiryModal() {
    const modal = document.getElementById("inquiry-modal");
    if (modal) {
      modal.classList.add("open");
      document.body.classList.add("no-scroll");
      const prodTitle = document.getElementById("prod-title").textContent;
      const sku = document.getElementById("prod-sku").textContent;
      document.getElementById("inquiry-subject").value = `Запитване относно: ${prodTitle} (SKU: ${sku})`;
    }
  },

  closeInquiryModal() {
    const modal = document.getElementById("inquiry-modal");
    if (modal) {
      modal.classList.remove("open");
      document.body.classList.remove("no-scroll");
    }
  },

  submitInquiry(event) {
    event.preventDefault();
    this.closeInquiryModal();
    Cart.showToast("Благодарим Ви! Запитването е изпратено успешно.");
  }
};
