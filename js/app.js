// Hydrolux Premium Store SPA Routing & App Orchestrator
const App = {
  currentView: "home",

  async init() {
    if (CONFIG.ready) {
      await CONFIG.ready;
    }

    // 1. Initialize Components
    Cart.init();
    
    // 2. Render dynamic components based on the localStorage state
    this.renderQuickCategories();
    this.renderSearchCategories();
    
    // 3. Setup Smart Search Suggestions and Input
    this.setupSearchSuggestions();

    // 4. Render Catalog Sidebar on startup
    Catalog.renderSidebar();
    Catalog.applyFiltersAndRender();
    
    // 5. Populate Homepage Featured Products Grid
    this.renderFeaturedProductsHome();

    // 6. Default View routing
    this.route();
    window.addEventListener("hashchange", () => this.route());
    
    // 7. Hero Stats
    this.updateHeroStats();
  },

  renderFeaturedProductsHome() {
    const grid = document.getElementById("home-featured-products-grid");
    const specialGrid = document.getElementById("home-special-products-grid");
    const specialHeader = document.getElementById("home-special-section-header");
    if (!grid) return;

    // 1. Filter Special Seasonal Products
    const specialProducts = CONFIG.products.filter(p => p.isSpecial === true);
    
    if (specialGrid && specialHeader) {
      if (specialProducts.length > 0) {
        specialGrid.innerHTML = specialProducts.map(p => {
          const prices = p.variants.map(v => v.priceEur);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          const priceText = prices.length > 1
            ? `от ${minPrice.toFixed(2)} € до ${maxPrice.toFixed(2)} €`
            : `${minPrice.toFixed(2)} €`;
          const coverImg = p.images[0] || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop";
          const specialLabel = this.getSpecialOfferLabel(p);

          return `
            <div class="product-card card special-promo-card" onclick="Catalog.openProductDetails('${p.id}')" style="border: 1.5px solid #ea580c; box-shadow: 0 4px 20px rgba(234, 88, 12, 0.08);">
              <div class="product-badge" style="background-color: #ea580c; color: white;">🔥 ${specialLabel}</div>
              <div class="product-card-img-wrapper">
                <img src="${coverImg}" alt="${p.name}" class="product-card-img" onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'">
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
                    <span class="price-bgn font-medium text-accent font-bold" style="color: #ea580c;">${priceText}</span>
                  </div>
                  <button class="btn btn-accent btn-icon" onclick="event.stopPropagation(); Catalog.openProductDetails('${p.id}')" style="background-color: #ea580c;">➔</button>
                </div>
              </div>
            </div>
          `;
        }).join("");
        specialGrid.style.display = "grid";
        specialHeader.style.display = "flex";
      } else {
        specialGrid.style.display = "none";
        specialHeader.style.display = "none";
      }
    }

    // 2. Render first 4 standard featured products
    const featured = CONFIG.products.filter(p => !p.isSpecial).slice(0, 4);
    grid.innerHTML = featured.map(p => {
      const prices = p.variants.map(v => v.priceEur);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const priceText = prices.length > 1
        ? `от ${minPrice.toFixed(2)} € до ${maxPrice.toFixed(2)} €`
        : `${minPrice.toFixed(2)} €`;
      const coverImg = p.images[0] || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop";

      return `
        <div class="product-card card" onclick="Catalog.openProductDetails('${p.id}')">
          <div class="product-badge">${p.inStock ? 'В наличност' : 'По поръчка'}</div>
          <div class="product-card-img-wrapper">
            <img src="${coverImg}" alt="${p.name}" class="product-card-img" onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'">
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
              </div>
              <button class="btn btn-secondary btn-icon" onclick="event.stopPropagation(); Catalog.openProductDetails('${p.id}')">➔</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  getSpecialOfferLabel(product) {
    if (product.specialOfferLabel) return product.specialOfferLabel;
    if (product.specialOfferType === "hot") return "ГОРЕЩА ОФЕРТА";
    if (product.specialOfferType === "other" && product.specialOfferText) return product.specialOfferText;
    return "СЕЗОННО НАМАЛЕНИЕ";
  },

  renderQuickCategories() {
    const grid = document.querySelector(".quick-categories-grid");
    if (!grid) return;
    
    // Display the first 8 main categories or all of them
    const categories = CONFIG.categories.slice(0, 8);
    grid.innerHTML = categories.map(c => `
      <div class="category-card card" onclick="Catalog.selectCategory('${c.id}'); App.navigate('catalog')">
        <span class="cat-icon">${c.icon || '📦'}</span>
        <h4>${c.name}</h4>
      </div>
    `).join("");
  },

  renderSearchCategories() {
    const select = document.getElementById("search-category-dropdown");
    if (!select) return;
    
    let html = '<option value="">Всички категории</option>';
    CONFIG.categories.forEach(c => {
      html += `<option value="${c.id}">${c.name}</option>`;
    });
    select.innerHTML = html;
  },

  setupSearchSuggestions() {
    const searchInput = document.getElementById("search-input-blue");
    const wrapper = document.querySelector(".search-bar-wrapper");
    if (!searchInput || !wrapper) return;

    // Create suggestions dropdown element dynamically if it doesn't exist
    let dropdown = document.getElementById("search-suggestions-dropdown");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.id = "search-suggestions-dropdown";
      dropdown.className = "search-suggestions-dropdown";
      wrapper.appendChild(dropdown);
    }

    // Input event for real-time autocomplete
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      
      // Keep main Catalog search query in sync
      Catalog.searchQuery = e.target.value;
      if (this.currentView === "catalog") {
        Catalog.applyFiltersAndRender();
      }

      if (query.length < 2) {
        dropdown.style.display = "none";
        return;
      }

      // Filter Categories
      const matchingCats = CONFIG.categories.filter(c => 
        c.name.toLowerCase().includes(query)
      );

      // Filter Products (including name, brand, code, tags, and variant codes!)
      const matchingProds = CONFIG.products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query)) ||
        p.variants.some(v => v.code.toLowerCase().includes(query))
      );

      if (matchingCats.length === 0 && matchingProds.length === 0) {
        dropdown.innerHTML = `<div class="search-no-suggestions">Няма намерени съвпадения за "${e.target.value}"</div>`;
        dropdown.style.display = "block";
        return;
      }

      let html = "";

      // 1. Categories Section
      if (matchingCats.length > 0) {
        html += `
          <div class="search-suggestions-section">
            <div class="search-suggestions-section-title">Категории</div>
            ${matchingCats.map(c => `
              <div class="search-suggestion-item" onclick="App.handleCategorySuggestionClick('${c.id}')">
                <span style="font-size: 1.2rem;">${c.icon || '📦'}</span>
                <div class="search-suggestion-info">
                  <span class="search-suggestion-name">${c.name}</span>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      }

      // 2. Products Section
      if (matchingProds.length > 0) {
        html += `
          <div class="search-suggestions-section">
            <div class="search-suggestions-section-title">Продукти</div>
            ${matchingProds.map(p => {
              const prices = p.variants.map(v => v.priceEur);
              const minPrice = Math.min(...prices);
              const coverImg = p.images[0] || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop";
              
              // Find if a specific variant code matched
              const matchedVar = p.variants.find(v => v.code.toLowerCase().includes(query));
              const subText = matchedVar 
                ? `Код размер: ${matchedVar.code} (${matchedVar.inch})` 
                : `Код продукт: ${p.code} | Марка: ${p.brand}`;

              return `
                <div class="search-suggestion-item" onclick="App.handleProductSuggestionClick('${p.id}')">
                  <img src="${coverImg}" class="search-suggestion-img" onerror="this.src='https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'">
                  <div class="search-suggestion-info">
                    <span class="search-suggestion-name">${p.name}</span>
                    <span class="search-suggestion-meta">${subText}</span>
                  </div>
                  <div class="search-suggestion-price">${minPrice.toFixed(2)} €</div>
                </div>
              `;
            }).join("")}
          </div>
        `;
      }

      dropdown.innerHTML = html;
      dropdown.style.display = "block";
    });

    // Close suggestions dropdown on click outside
    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });

    // Re-open on focus if query is already present
    searchInput.addEventListener("focus", (e) => {
      if (e.target.value.trim().length >= 2) {
        dropdown.style.display = "block";
      }
    });
  },

  handleCategorySuggestionClick(catId) {
    Catalog.selectCategory(catId);
    this.navigate("catalog");
    const dropdown = document.getElementById("search-suggestions-dropdown");
    if (dropdown) dropdown.style.display = "none";
  },

  handleProductSuggestionClick(prodId) {
    Catalog.openProductDetails(prodId);
    this.navigate("product-detail");
    const dropdown = document.getElementById("search-suggestions-dropdown");
    if (dropdown) dropdown.style.display = "none";
  },

  // Switch SPA views smoothly
  navigate(viewId) {
    window.location.hash = `#${viewId}`;
  },

  route() {
    let hash = window.location.hash.substring(1);
    if (!hash) hash = "home";

    // Separate params if any, e.g. product/semperit-plw-20
    const parts = hash.split("/");
    const mainView = parts[0];
    
    // Hide all views
    document.querySelectorAll(".spa-view").forEach(v => {
      v.classList.remove("active");
    });

    // Remove active class from navigation links
    document.querySelectorAll(".nav-link").forEach(l => {
      l.classList.remove("active");
    });

    // Close drawers/menus
    Cart.closeDrawer();
    this.toggleMobileMenu(false);

    // Show selected view
    const targetView = document.getElementById(`${mainView}-view`);
    if (targetView) {
      targetView.classList.add("active");
      this.currentView = mainView;

      // Update active nav link
      const navLink = document.querySelector(`.nav-link[onclick*="navigate('${mainView}')"]`);
      if (navLink) navLink.classList.add("active");

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Run view-specific inits
      if (mainView === "builder") {
        HoseBuilder.render();
      } else if (mainView === "admin") {
        Admin.init();
      } else if (mainView === "checkout") {
        Cart.renderCheckoutSummary();
      }
    } else {
      // Fallback
      document.getElementById("home-view").classList.add("active");
      this.currentView = "home";
    }
  },

  toggleMobileMenu(forceState) {
    const nav = document.getElementById("main-nav-links");
    if (!nav) return;
    if (forceState !== undefined) {
      if (forceState) nav.classList.add("open");
      else nav.classList.remove("open");
    } else {
      nav.classList.toggle("open");
    }
  },

  updateHeroStats() {
    // Dynamically display date/year in footer
    const yearEl = document.getElementById("footer-current-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
};

// Start application when DOM is ready
document.addEventListener("DOMContentLoaded", () => App.init());
