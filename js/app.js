// Hydrolux Premium Store SPA Routing & App Orchestrator
const App = {
  currentView: "home",

  init() {
    // 1. Initialize Components
    Cart.init();
    
    // 2. Setup Global Search Input
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

    // 3. Render Catalog Sidebar on startup
    Catalog.renderSidebar();
    Catalog.applyFiltersAndRender();

    // 4. Default View routing
    this.route();
    window.addEventListener("hashchange", () => this.route());
    
    // 5. Hero Stats
    this.updateHeroStats();
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
