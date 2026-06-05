// Catalog Filtering, Dropdowns & Details Controller (Euro € Optimized)
const Catalog = {
  activeCategory: null,
  activeSubcategory: null,
  activeSubSubcategory: null,
  searchQuery: "",
  filterBrand: "",
  filterSize: "",
  filterPressure: "",
  filterTemp: "",

  expandedCategories: {},

  toggleTreeExpand(catId) {
    this.expandedCategories[catId] = !this.expandedCategories[catId];
    this.renderSidebar();
  },

  toggleTreeExpandSub(catId, subId) {
    const key = `${catId}_${subId}`;
    this.expandedCategories[key] = !this.expandedCategories[key];
    this.renderSidebar();
  },

  selectSubcategoryClick(catId, subId) {
    this.activeCategory = catId;
    this.activeSubcategory = subId;
    this.activeSubSubcategory = null;
    if (App.currentView !== "catalog") {
      App.navigate("catalog");
    }
    this.renderSidebar();
    this.applyFiltersAndRender();
  },

  selectSubSubcategoryClick(catId, subId, subsubId) {
    this.activeCategory = catId;
    this.activeSubcategory = subId;
    this.activeSubSubcategory = subsubId;
    if (App.currentView !== "catalog") {
      App.navigate("catalog");
    }
    this.renderSidebar();
    this.applyFiltersAndRender();
  },

  // Render product categories inside the top collapsible dropdown menu
  renderSidebar() {
    const container = document.getElementById("catalog-categories-tags-list");
    if (!container) return;

    let treeHtml = `
      <div class="catalog-tree-container">
        <ul class="catalog-tree-menu">
          <li class="tree-item ${!this.activeCategory ? 'active' : ''}">
            <div class="tree-row" onclick="Catalog.selectCategory('')">
              <span class="tree-icon">📂</span>
              <span class="tree-label">Всички продукти</span>
            </div>
          </li>
    `;

    CONFIG.categories.forEach(cat => {
      const isCatActive = this.activeCategory === cat.id;
      const hasSub = cat.subcategories && cat.subcategories.length > 0;
      const isExpanded = isCatActive || !!this.expandedCategories[cat.id];

      treeHtml += `
        <li class="tree-item ${isCatActive ? 'active' : ''} ${hasSub ? 'has-children' : ''} ${isExpanded ? 'expanded' : ''}" id="tree-cat-${cat.id}">
          <div class="tree-row">
            ${hasSub ? `<span class="tree-toggle" onclick="event.stopPropagation(); Catalog.toggleTreeExpand('${cat.id}')">${isExpanded ? '▼' : '▶'}</span>` : '<span class="tree-toggle-spacer"></span>'}
            <span class="tree-link" onclick="Catalog.selectCategory('${cat.id}')">
              <span class="tree-icon">${cat.icon || '📁'}</span>
              <span class="tree-label">${cat.name}</span>
            </span>
          </div>
      `;

      if (hasSub) {
        treeHtml += `<ul class="tree-sub-list ${isExpanded ? 'open' : ''}">`;
        
        cat.subcategories.forEach(sub => {
          const isSubActive = this.activeSubcategory === sub.id;
          const hasSubSub = sub.subcategories && sub.subcategories.length > 0;
          const subKey = `${cat.id}_${sub.id}`;
          const isSubExpanded = (isSubActive && isCatActive) || !!this.expandedCategories[subKey];

          treeHtml += `
            <li class="tree-item ${isSubActive ? 'active' : ''} ${hasSubSub ? 'has-children' : ''} ${isSubExpanded ? 'expanded' : ''}" id="tree-sub-${sub.id}">
              <div class="tree-row">
                ${hasSubSub ? `<span class="tree-toggle" onclick="event.stopPropagation(); Catalog.toggleTreeExpandSub('${cat.id}', '${sub.id}')">${isSubExpanded ? '▼' : '▶'}</span>` : '<span class="tree-toggle-spacer"></span>'}
                <span class="tree-link" onclick="Catalog.selectSubcategoryClick('${cat.id}', '${sub.id}')">
                  <span class="tree-label">${sub.name}</span>
                </span>
              </div>
          `;

          if (hasSubSub) {
            treeHtml += `<ul class="tree-sub-sub-list ${isSubExpanded ? 'open' : ''}">`;
            sub.subcategories.forEach(subsub => {
              const isSubSubActive = this.activeSubSubcategory === subsub.id;
              treeHtml += `
                <li class="tree-item ${isSubSubActive ? 'active' : ''}">
                  <div class="tree-row" onclick="Catalog.selectSubSubcategoryClick('${cat.id}', '${sub.id}', '${subsub.id}')">
                    <span class="tree-toggle-spacer"></span>
                    <span class="tree-link">
                      <span class="tree-label">${subsub.name}</span>
                    </span>
                  </div>
                </li>
              `;
            });
            treeHtml += `</ul>`;
          }

          treeHtml += `</li>`;
        });
        
        treeHtml += `</ul>`;
      }

      treeHtml += `</li>`;
    });

    treeHtml += `
        </ul>
      </div>
    `;

    container.innerHTML = treeHtml;
    this.renderSpecsFilters();
  },

  renderSpecsFilters() {
    const container = document.getElementById("catalog-specs-filters");
    if (!container) return;

    // Filter available option options to match the selected category & subcategory
    let scopeProducts = CONFIG.products;
    if (this.activeCategory) {
      scopeProducts = scopeProducts.filter(p => p.category === this.activeCategory);
    }
    if (this.activeSubcategory) {
      scopeProducts = scopeProducts.filter(p => p.subcategory === this.activeSubcategory);
    }

    // 1. Brands
    const brands = [...new Set(scopeProducts.map(p => p.brand).filter(Boolean))].sort();

    // 2. Sizes (innerDb)
    const sizes = [...new Set(scopeProducts.flatMap(p => (p.variants || []).map(v => v.innerDb)).filter(Boolean))].sort((a, b) => parseFloat(a) - parseFloat(b));

    // 3. Pressures
    const pressures = [...new Set(scopeProducts.flatMap(p => (p.variants || []).map(v => v.pressure)).filter(Boolean))].sort((a, b) => parseFloat(a) - parseFloat(b));

    // 4. Temps (specs containing "температура")
    const temps = [...new Set(scopeProducts.flatMap(p => (p.specs || []).filter(s => s.key.toLowerCase().includes("температура")).map(s => s.value)).filter(Boolean))].sort();

    container.innerHTML = `
      <div class="filter-group-item" style="flex: 1; min-width: 140px;">
        <label style="display: block; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Марка</label>
        <select class="form-control" onchange="Catalog.filterBrand = this.value; Catalog.applyFiltersAndRender();" style="height: 38px; padding: 6px 12px; font-size: 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; width: 100%;">
          <option value="">Всички</option>
          ${brands.map(b => `<option value="${b}" ${this.filterBrand === b ? 'selected' : ''}>${b}</option>`).join("")}
        </select>
      </div>

      <div class="filter-group-item" style="flex: 1; min-width: 140px;">
        <label style="display: block; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Размер (ø вътр.)</label>
        <select class="form-control" onchange="Catalog.filterSize = this.value; Catalog.applyFiltersAndRender();" style="height: 38px; padding: 6px 12px; font-size: 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; width: 100%;">
          <option value="">Всички</option>
          ${sizes.map(s => `<option value="${s}" ${this.filterSize === s ? 'selected' : ''}>${s} мм</option>`).join("")}
        </select>
      </div>

      <div class="filter-group-item" style="flex: 1; min-width: 140px;">
        <label style="display: block; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Налягане (Bar)</label>
        <select class="form-control" onchange="Catalog.filterPressure = this.value; Catalog.applyFiltersAndRender();" style="height: 38px; padding: 6px 12px; font-size: 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; width: 100%;">
          <option value="">Всички</option>
          ${pressures.map(p => `<option value="${p}" ${this.filterPressure === p ? 'selected' : ''}>${p} Bar</option>`).join("")}
        </select>
      </div>

      <div class="filter-group-item" style="flex: 1; min-width: 140px;">
        <label style="display: block; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Работна темп.</label>
        <select class="form-control" onchange="Catalog.filterTemp = this.value; Catalog.applyFiltersAndRender();" style="height: 38px; padding: 6px 12px; font-size: 0.85rem; border: 1px solid #cbd5e1; border-radius: 6px; width: 100%;">
          <option value="">Всички</option>
          ${temps.map(t => `<option value="${t}" ${this.filterTemp === t ? 'selected' : ''}>${t}</option>`).join("")}
        </select>
      </div>
    `;
  },

  toggleCategoriesDropdown() {
    const menu = document.getElementById("catalog-cat-dropdown-menu");
    if (menu) {
      menu.classList.toggle("hidden");
    }
  },

  selectCategory(catId) {
    this.activeCategory = catId || null;
    this.activeSubcategory = null; // Clear subcategory filter when changing category
    this.activeSubSubcategory = null; // Clear sub-subcategory filter when changing category
    
    if (App.currentView !== "catalog") {
      App.navigate("catalog");
    }
    
    this.renderSidebar();
    this.applyFiltersAndRender();
  },

  selectSubcategory(subId) {
    this.activeSubcategory = subId || null;
    this.activeSubSubcategory = null; // Clear sub-subcategory filter when changing subcategory
    this.renderSidebar();
    this.applyFiltersAndRender();
  },

  selectSubSubcategory(subsubId) {
    this.activeSubSubcategory = subsubId || null;
    this.renderSidebar();
    this.applyFiltersAndRender();
  },

  resetFilters() {
    this.activeCategory = null;
    this.activeSubcategory = null;
    this.activeSubSubcategory = null;
    this.searchQuery = "";
    this.filterBrand = "";
    this.filterSize = "";
    this.filterPressure = "";
    this.filterTemp = "";
    
    const searchInput = document.getElementById("search-input-blue");
    if (searchInput) searchInput.value = "";
    
    this.renderSidebar();
    this.applyFiltersAndRender();
  },

  applyFiltersAndRender() {
    const products = CONFIG.products;
    const grid = document.getElementById("products-grid");
    if (!grid) return;

    // Set grid class back to products grid by default
    grid.className = "products-grid full-width";

    // If no category and no other filter/search is active, render category card grid
    if (!this.activeCategory && !this.searchQuery && !this.filterBrand && !this.filterSize && !this.filterPressure && !this.filterTemp) {
      const titleEl = document.getElementById("catalog-active-title");
      const countEl = document.getElementById("catalog-count");
      if (titleEl) titleEl.textContent = "Всички категории";
      if (countEl) countEl.textContent = CONFIG.categories.length;

      grid.className = "catalog-categories-cards-grid";
      grid.innerHTML = CONFIG.categories.map(cat => {
        const imgName = `cat_${cat.id.replace(/-/g, '_')}.png`;
        return `
          <div class="category-card-card" onclick="Catalog.selectCategory('${cat.id}')" style="background-image: url('assets/${imgName}');">
            <div class="category-card-overlay">
              <div class="category-card-info">
                <span class="category-card-icon">${cat.icon || '📁'}</span>
                <h3 class="category-card-title">${cat.name}</h3>
              </div>
            </div>
          </div>
        `;
      }).join("");
      return;
    }

    let filtered = products.filter(p => {
      // 1. Category check
      if (this.activeCategory && p.category !== this.activeCategory) return false;

      // 2. Subcategory check
      if (this.activeSubcategory && p.subcategory !== this.activeSubcategory) return false;

      // 2.5. Sub-subcategory check
      if (this.activeSubSubcategory && p.subsubcategory !== this.activeSubSubcategory) return false;

      // 3. Search check
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesCode = p.code.toLowerCase().includes(query);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesCode && !matchesTags) return false;
      }

      // 4. Spec Filters
      // 4.1 Brand
      if (this.filterBrand && p.brand !== this.filterBrand) return false;

      // 4.2 Size (innerDb from variants)
      if (this.filterSize && !(p.variants || []).some(v => String(v.innerDb) === this.filterSize)) return false;

      // 4.3 Pressure (pressure from variants)
      if (this.filterPressure && !(p.variants || []).some(v => String(v.pressure) === this.filterPressure)) return false;

      // 4.4 Temp (specs key temperature value)
      if (this.filterTemp && !(p.specs || []).some(s => s.key.toLowerCase().includes("температура") && s.value === this.filterTemp)) return false;

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
      let breadcrumbHtml = `<a onclick="App.navigate('home')">Начало</a>`;
      if (cat) {
        breadcrumbHtml += ` › <a onclick="Catalog.selectCategory('${cat.id}'); App.navigate('catalog')">${cat.name}</a>`;
        if (product.subcategory && cat.subcategories) {
          const subObj = cat.subcategories.find(s => s.id === product.subcategory);
          if (subObj) {
            breadcrumbHtml += ` › <a onclick="Catalog.selectCategory('${cat.id}'); Catalog.selectSubcategory('${subObj.id}'); App.navigate('catalog')">${subObj.name}</a>`;
            if (product.subsubcategory && subObj.subcategories) {
              const subsubObj = subObj.subcategories.find(ss => ss.id === product.subsubcategory);
              if (subsubObj) {
                breadcrumbHtml += ` › <a onclick="Catalog.selectCategory('${cat.id}'); Catalog.selectSubcategory('${subObj.id}'); Catalog.selectSubSubcategory('${subsubObj.id}'); App.navigate('catalog')">${subsubObj.name}</a>`;
              }
            }
          }
        }
      }
      breadcrumbHtml += ` › <span class="text-muted">${product.name}</span>`;
      breadcrumb.innerHTML = breadcrumbHtml;
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
  },

  toggleMobileFilters() {
    const sidebar = document.querySelector(".popular-sidebar");
    const btn = document.getElementById("mobile-filter-toggle-btn");
    if (sidebar) {
      sidebar.classList.toggle("open");
      const isOpen = sidebar.classList.contains("open");
      if (btn) {
        btn.querySelector("span").textContent = isOpen ? "Скрий Филтри" : "Покажи Филтри";
      }
    }
  }
};
