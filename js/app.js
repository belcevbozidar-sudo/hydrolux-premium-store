// Hydrolux Premium Store SPA Routing & App Orchestrator
const App = {
  currentView: "home",

  init() {
    // 1. Initialize Components
    Cart.init();
    
    // 2. Render dynamic components based on the localStorage state
    this.renderQuickCategories();
    this.renderSearchCategories();
    
    // 3. Setup Global Search Input
    const searchInput = document.getElementById("search-input-blue");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        Catalog.searchQuery = e.target.value;
        if (this.currentView !== "catalog") {
          this.navigate("catalog");
        }
        Catalog.applyFiltersAndRender();
      });
    }

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
    if (!grid) return;
    // Render first 4 premium seeded products on homepage
    const featured = CONFIG.products.slice(0, 4);
    grid.innerHTML = featured.map(p => {
      const prices = p.variants.map(v => v.priceEur);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const priceText = prices.length > 1
        ? `от ${minPrice.toFixed(2)} € до ${maxPrice.toFixed(2)} €`
        : `${minPrice.toFixed(2)} €`;

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
              </div>
              <button class="btn btn-secondary btn-icon" onclick="event.stopPropagation(); Catalog.openProductDetails('${p.id}')">➔</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
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
