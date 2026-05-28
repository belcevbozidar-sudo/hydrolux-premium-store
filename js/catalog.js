// Catalog Filtering & Details Controller
const Catalog = {
  activeCategory: null,
  activeSubcategory: null,
  searchQuery: "",
  priceFilterMax: 10, // Default slider max
  pressureFilterMax: 400,

  // Render product categories in the sidebar (multi-level tree)
  renderSidebar() {
    const sidebar = document.getElementById("catalog-sidebar-categories");
    if (!sidebar) return;

    sidebar.innerHTML = CONFIG.categories.map(cat => {
      const hasSubs = cat.subcategories && cat.subcategories.length > 0;
      const isCatActive = this.activeCategory === cat.id;

      return `
        <div class="sidebar-cat-group ${isCatActive ? 'expanded' : ''}">
          <div class="sidebar-cat-header ${isCatActive ? 'active' : ''}" 
               onclick="Catalog.selectCategory('${cat.id}')">
            <span class="cat-icon">${cat.icon}</span>
            <span class="cat-name">${cat.name}</span>
            ${hasSubs ? `<span class="cat-toggle-arrow">▼</span>` : ""}
          </div>
          
          ${hasSubs ? `
            <div class="sidebar-cat-subs">
              ${cat.subcategories.map(sub => {
                const isSubActive = this.activeSubcategory === sub.id;
                const hasThirdLevel = sub.sub && sub.sub.length > 0;
                
                return `
                  <div class="sidebar-sub-group ${isSubActive ? 'expanded' : ''}">
                    <div class="sidebar-sub-header ${isSubActive ? 'active' : ''}" 
                         onclick="event.stopPropagation(); Catalog.selectSubcategory('${cat.id}', '${sub.id}')">
                      <span>${sub.name}</span>
                      ${hasThirdLevel ? `<span class="sub-toggle-arrow">▼</span>` : ""}
                    </div>
                    
                    ${hasThirdLevel ? `
                      <div class="sidebar-sub-third">
                        ${sub.sub.map(third => `
                          <div class="sidebar-third-item" 
                               onclick="event.stopPropagation(); Catalog.selectThirdCategory('${cat.id}', '${sub.id}', '${third.id}')">
                            • ${third.name}
                          </div>
                        `).join("")}
                      </div>
                    ` : ""}
                  </div>
                `;
              }).join("")}
            </div>
          ` : ""}
        </div>
      `;
    }).join("");
  },

  selectCategory(catId) {
    if (this.activeCategory === catId && !this.activeSubcategory) {
      // Toggle off if clicked again
      this.activeCategory = null;
    } else {
      this.activeCategory = catId;
      this.activeSubcategory = null;
    }
    this.renderSidebar();
    this.applyFiltersAndRender();
  },

  selectSubcategory(catId, subId) {
    this.activeCategory = catId;
    this.activeSubcategory = this.activeSubcategory === subId ? null : subId;
    this.renderSidebar();
    this.applyFiltersAndRender();
  },

  selectThirdCategory(catId, subId, thirdId) {
    this.activeCategory = catId;
    this.activeSubcategory = subId;
    // Show quick filter toast for advanced categories
    Cart.showToast(`Избрана подкатегория: ${thirdId}`);
    this.applyFiltersAndRender();
  },

  resetFilters() {
    this.activeCategory = null;
    this.activeSubcategory = null;
    this.searchQuery = "";
    document.getElementById("search-input-blue").value = "";
    this.renderSidebar();
    this.applyFiltersAndRender();
  },

  applyFiltersAndRender() {
    const products = CONFIG.products;
    const grid = document.getElementById("products-grid");
    if (!grid) return;

    let filtered = products.filter(p => {
      // 1. Category check
      if (this.activeCategory && p.category !== this.activeCategory) return false;
      if (this.activeSubcategory && p.subcategory !== this.activeSubcategory) return false;

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
    if (titleEl) {
      if (this.activeCategory) {
        const cat = CONFIG.categories.find(c => c.id === this.activeCategory);
        let title = cat.name;
        if (this.activeSubcategory) {
          const sub = cat.subcategories.find(s => s.id === this.activeSubcategory);
          title += ` › ${sub.name}`;
        }
        titleEl.textContent = title;
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
      // Find range of prices
      const prices = p.variants.map(v => v.priceEur);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const priceText = prices.length > 1
        ? `от ${formatPrice(minPrice).bgn} до ${formatPrice(maxPrice).bgn}`
        : `${formatPrice(minPrice).bgn}`;

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

  // Open details view and inject values
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

    // 🔥 Key Component: Dynamic Variants Table
    const tableBody = document.getElementById("prod-variants-tbody");
    tableBody.innerHTML = product.variants.map(v => `
      <tr>
        <td class="font-bold text-primary font-xs">${v.code}</td>
        <td><strong>${v.innerDb}</strong> мм</td>
        <td class="text-muted font-xs">${v.inch}</td>
        <td>${v.outerDb} мм</td>
        <td><span class="badge badge-warning">${v.pressure} Bar</span></td>
        <td class="text-muted font-xs">${v.bend} мм</td>
        <td class="text-muted font-xs">${v.weight} кг/м</td>
        <td>${v.rollLength} м</td>
        <td>
          <div class="table-price-bgn">${formatPrice(v.priceEur).bgn}</div>
          <div class="table-price-eur text-muted font-xs">${formatPrice(v.priceEur).eur}</div>
        </td>
        <td>
          <div class="quantity-input-wrapper small">
            <button class="btn btn-secondary btn-icon small" onclick="Catalog.adjustVariantQty('${v.code}', -1)">-</button>
            <input type="number" id="qty-${v.code}" class="form-control text-center small qty-input" value="1" min="1">
            <button class="btn btn-secondary btn-icon small" onclick="Catalog.adjustVariantQty('${v.code}', 1)">+</button>
          </div>
        </td>
        <td>
          <button class="btn btn-primary small btn-buy-variant" onclick="Catalog.buyVariant('${product.id}', '${v.code}')">
            Купи
          </button>
        </td>
      </tr>
    `).join("");

    // Set grand "Buy Selected" actions
    const bulkBtn = document.getElementById("prod-bulk-add-btn");
    bulkBtn.onclick = () => {
      let addedAny = false;
      product.variants.forEach(v => {
        const input = document.getElementById(`qty-${v.code}`);
        const qty = parseInt(input.value) || 0;
        if (qty > 0) {
          Cart.addItem(product, v.code, qty);
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

  buyVariant(productId, code) {
    const product = CONFIG.products.find(p => p.id === productId);
    const input = document.getElementById(`qty-${code}`);
    const qty = parseInt(input.value) || 1;
    if (product) {
      Cart.addItem(product, code, qty);
      Cart.openDrawer();
    }
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
      // Pre-fill subject
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
    Cart.showToast("Благодарим Ви! Запитването е изпратено. Ще се свържем с Вас до 2 часа.");
  }
};
