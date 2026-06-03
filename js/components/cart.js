// Shopping Cart & B2B/B2C Checkout Manager (Euro € Optimized)
const Cart = {
  items: [],

  init() {
    const saved = localStorage.getItem("hydrolux_cart");
    if (saved) {
      try {
        this.items = JSON.parse(saved);
      } catch (e) {
        this.items = [];
      }
    }
    this.updateCartBadge();
  },

  save() {
    localStorage.setItem("hydrolux_cart", JSON.stringify(this.items));
    this.updateCartBadge();
    if (typeof HydroluxBackend !== "undefined") {
      HydroluxBackend.saveCart(this.items).catch(err => {
        console.warn("Convex cart sync failed", err);
      });
    }
  },

  getVariantCode(product, variant, index = 0) {
    if (!variant) return "CUSTOM-SPEC";

    const preferredKeys = ["code", "sku", "article", "id"];
    for (const key of preferredKeys) {
      if (variant[key] !== undefined && String(variant[key]).trim() !== "") {
        return String(variant[key]).trim();
      }
    }

    const firstFilledValue = Object.values(variant).find(value => String(value ?? "").trim() !== "");
    if (firstFilledValue !== undefined) {
      return String(firstFilledValue).trim();
    }

    return `${product.code || product.id || "product"}-${index + 1}`;
  },

  findVariant(product, variantCode) {
    if (!product.variants || variantCode === "CUSTOM-SPEC") return null;
    return product.variants.find((variant, index) => this.getVariantCode(product, variant, index) === variantCode) || null;
  },

  escapeJsString(value) {
    return String(value ?? "")
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },

  addItem(product, variantCode, quantity) {
    if (quantity <= 0) return;

    let priceEur = parseFloat(product.priceEur) || 0;
    let variantName = "";
    let specsText = "";

    // If it's a product variant
    if (product.variants && variantCode !== "CUSTOM-SPEC") {
      const variant = this.findVariant(product, variantCode);
      if (variant) {
        priceEur = parseFloat(variant.priceEur) || 0;
        const diameter = variant.innerDb !== undefined && variant.innerDb !== "" ? `ø ${variant.innerDb}мм` : variantCode;
        const inch = variant.inch ? ` (${variant.inch})` : "";
        variantName = `Размер: ${diameter}${inch}`;
        const specs = [];
        if (variant.pressure !== undefined && variant.pressure !== "") specs.push(`Работно налягане: ${variant.pressure} Bar`);
        if (variant.rollLength !== undefined && variant.rollLength !== "") specs.push(`Дължина на ролката: ${variant.rollLength}м`);
        specsText = specs.join(" | ");
      }
    } else if (product.isCustomHose) {
      variantName = `Конфигуриран маркуч (${product.specsSummary.size})`;
      specsText = `${product.specsSummary.hoseType} | А: ${product.specsSummary.fittingL} | Б: ${product.specsSummary.fittingR} | Защита: ${product.specsSummary.sleeve}`;
    }

    const cartKey = `${product.id}::${variantCode}`;
    const existing = this.items.find(item => item.cartKey === cartKey);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        cartKey,
        productId: product.id,
        name: product.name,
        variantCode,
        variantName,
        specsText,
        priceEur,
        quantity,
        isCustomHose: !!product.isCustomHose,
        specsSummary: product.specsSummary || null
      });
    }

    this.save();
    this.renderDrawer();
    this.showToast(`Добавено в количката!`);
  },

  removeItem(cartKey) {
    this.items = this.items.filter(item => item.cartKey !== cartKey);
    this.save();
    this.renderDrawer();
  },

  updateQuantity(cartKey, newQty) {
    const item = this.items.find(item => item.cartKey === cartKey);
    if (item) {
      item.quantity = Math.max(1, parseInt(newQty) || 1);
      this.save();
      this.renderDrawer();
    }
  },

  clear() {
    this.items = [];
    this.save();
    this.renderDrawer();
  },

  getTotal() {
    let totalEur = 0;
    this.items.forEach(item => {
      totalEur += (parseFloat(item.priceEur) || 0) * (parseInt(item.quantity) || 0);
    });
    return {
      eur: totalEur,
      bgn: totalEur
    };
  },

  updateCartBadge() {
    const inlineBadges = document.querySelectorAll(".cart-count-badge-inline");
    const displayEur = document.getElementById("cart-display-eur");

    let totalItems = 0;
    this.items.forEach(item => {
      totalItems += item.quantity;
    });

    inlineBadges.forEach(b => {
      b.textContent = totalItems;
    });

    const totals = this.getTotal();
    if (displayEur) displayEur.textContent = totals.eur.toFixed(2) + " лв.";

    // Pulse the cart button
    const cartBtn = document.querySelector(".btn-cart-trigger");
    if (cartBtn) {
      cartBtn.classList.add("pulse");
      setTimeout(() => cartBtn.classList.remove("pulse"), 500);
    }
  },

  openDrawer() {
    const drawer = document.getElementById("cart-drawer");
    if (drawer) {
      drawer.classList.add("open");
      document.body.classList.add("no-scroll");
      this.renderDrawer();
    }
  },

  closeDrawer() {
    const drawer = document.getElementById("cart-drawer");
    if (drawer) {
      drawer.classList.remove("open");
      document.body.classList.remove("no-scroll");
    }
  },

  renderDrawer() {
    const container = document.getElementById("cart-items-container");
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="empty-cart text-center py-40">
          <div class="empty-cart-icon">🛒</div>
          <h3>Количката е празна</h3>
          <p class="text-muted">Разгледайте нашия богат продуктов асортимент и добавете необходимите продукти.</p>
          <button class="btn btn-primary mt-20" onclick="Cart.closeDrawer(); App.navigate('catalog')">Към Каталога</button>
        </div>
      `;
      document.getElementById("cart-footer-panel").style.display = "none";
      return;
    }

    document.getElementById("cart-footer-panel").style.display = "block";
    const totals = this.getTotal();

    container.innerHTML = this.items.map(item => {
      const cartKey = this.escapeJsString(item.cartKey);
      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            ${item.variantName ? `<div class="cart-item-variant">${item.variantName}</div>` : ""}
            ${item.specsText ? `<div class="cart-item-specs font-xs text-muted">${item.specsText}</div>` : ""}
            <div class="cart-item-pricing font-small">
              <span class="text-primary font-bold">${formatPrice(item.priceEur).eur}</span>
            </div>
          </div>
          <div class="cart-item-actions">
            <div class="quantity-input-wrapper small">
              <button class="btn btn-secondary btn-icon small" onclick="Cart.updateQuantity('${cartKey}', ${item.quantity - 1})">-</button>
              <input type="number" class="form-control text-center small qty-input" value="${item.quantity}"
                     onchange="Cart.updateQuantity('${cartKey}', this.value)">
              <button class="btn btn-secondary btn-icon small" onclick="Cart.updateQuantity('${cartKey}', ${item.quantity + 1})">+</button>
            </div>
            <button class="btn-delete" onclick="Cart.removeItem('${cartKey}')" title="Премахни">🗑️</button>
          </div>
        </div>
      `;
    }).join("");

    // Update prices in footer panel strictly in BGN
    document.getElementById("cart-total-bgn").textContent = totals.eur.toFixed(2) + " лв.";
  },

  openCheckout() {
    this.closeDrawer();
    App.navigate('checkout');
    this.renderCheckoutSummary();
    setTimeout(() => {
      this.toggleInvoiceFields("b2c"); // default B2C
    }, 50);
  },

  toggleInvoiceFields(type) {
    const b2bFields = document.getElementById("b2b-invoice-fields");
    if (!b2bFields) return;
    if (type === "b2b") {
      b2bFields.classList.remove("hidden");
      b2bFields.querySelectorAll("input").forEach(i => i.setAttribute("required", "true"));
    } else {
      b2bFields.classList.add("hidden");
      b2bFields.querySelectorAll("input").forEach(i => i.removeAttribute("required"));
    }
  },

  renderCheckoutSummary() {
    const container = document.getElementById("checkout-summary-container");
    if (!container) return;

    const totals = this.getTotal();
    container.innerHTML = `
      <div class="checkout-summary-card">
        <h4>📦 Обобщение на поръчката</h4>
        <div class="checkout-summary-items">
          ${this.items.map(item => `
            <div class="checkout-summary-item font-small">
              <div>
                <strong>${item.name}</strong> x ${item.quantity}
                ${item.variantName ? `<div class="text-muted font-xs">${item.variantName}</div>` : ""}
              </div>
              <div class="text-right">${formatPrice(item.priceEur * item.quantity).eur}</div>
            </div>
          `).join("")}
        </div>
        <div class="divider"></div>
        <div class="checkout-summary-totals">
          <div class="row">
            <span>Общо (с ДДС):</span>
            <strong class="font-large text-primary">${totals.eur.toFixed(2)} лв.</strong>
          </div>
          <div class="row font-xs text-muted mt-5">
            <span>* Включено ДДС (20%):</span>
            <span>${(totals.eur * 0.2).toFixed(2)} лв.</span>
          </div>
        </div>
      </div>
    `;
  },

  async submitOrder(event) {
    event.preventDefault();
    const form = event.target;
    
    // Extract customer details
    const name = form.elements["client_name"].value;
    const phone = form.elements["client_phone"].value;
    const email = form.elements["client_email"].value;
    const delivery = form.elements["delivery_method"].value;
    const address = form.elements["delivery_address"].value;
    const notes = form.elements["order_notes"].value;
    const clientType = form.elements["client_type"].value;

    let b2bDetails = null;
    if (clientType === "b2b") {
      b2bDetails = {
        companyName: form.elements["company_name"].value,
        companyVat: form.elements["company_vat"].value,
        companyMol: form.elements["company_mol"].value,
        companyAddress: form.elements["company_address"].value
      };
    }

    const orderNumber = "HL-" + Math.floor(100000 + Math.random() * 900000);
    const totals = this.getTotal();
    const orderedItems = [...this.items];
    const order = {
      orderNumber,
      customer: { name, phone, email },
      items: orderedItems,
      totals,
      delivery,
      address,
      notes,
      clientType,
      b2bDetails,
      status: "new",
      createdAt: Date.now(),
    };

    try {
      if (typeof HydroluxBackend !== "undefined") {
        await HydroluxBackend.saveOrder(order);
      }
    } catch (err) {
      console.warn("Convex order save failed", err);
      const pendingOrders = JSON.parse(localStorage.getItem("hydrolux_pending_orders") || "[]");
      pendingOrders.push(order);
      localStorage.setItem("hydrolux_pending_orders", JSON.stringify(pendingOrders));
      alert("Поръчката е приета локално, но не успяхме да я запишем в Convex. Проверете връзката и синхронизирайте отново.");
    }

    // Show success dialog
    this.closeCheckout();
    const successModal = document.getElementById("success-modal");
    if (successModal) {
      successModal.classList.add("open");
      document.body.classList.add("no-scroll");

      const successDetails = document.getElementById("success-details-container");
      successDetails.innerHTML = `
        <div class="success-header text-center">
          <div class="success-check-icon">✓</div>
          <h2>Поръчката е приета успешно!</h2>
          <p class="lead">Номер на поръчката: <strong class="text-primary">${orderNumber}</strong></p>
          <p class="text-muted font-small">Наш консултант ще се свърже с Вас на тел. <strong>${phone}</strong> за потвърждение.</p>
        </div>
        
        <div class="invoice-box card mt-20 font-small">
          <div class="invoice-title">📝 ДЕТАЙЛИ НА ПОРЪЧКАТА / ПРОФОРМА ФАКТУРА (В ЕВРО)</div>
          <div class="divider"></div>
          
          <div class="invoice-grid">
            <div>
              <strong>Доставчик:</strong><br>
              Хидролукс Груп ЕООД<br>
              ЕИК: 205612345 (Монтана)<br>
              гр. Монтана, ул. „Индустриална“ 32г<br>
              тел: +359 89 248 4337
            </div>
            <div>
              <strong>Получател:</strong><br>
              ${clientType === 'b2b' ? `
                <strong>${b2bDetails.companyName}</strong><br>
                ЕИК/ДДС: ${b2bDetails.companyVat}<br>
                МОЛ: ${b2bDetails.companyMol}<br>
                Адрес: ${b2bDetails.companyAddress}
              ` : `
                ${name}<br>
                тел: ${phone}<br>
                имейл: ${email}
              `}<br>
              <strong>Доставка:</strong> ${delivery === 'shop' ? 'Вземане от магазина в гр. Монтана' : `До адрес: ${address}`}
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="invoice-items">
            ${orderedItems.map((item, idx) => `
              <div class="invoice-item-row">
                <span>${idx + 1}. ${item.name} ${item.variantName ? `(${item.variantName})` : ''}</span>
                <span>${item.quantity} x ${formatPrice(item.priceEur).eur}</span>
                <span class="text-right font-bold">${formatPrice(item.priceEur * item.quantity).eur}</span>
              </div>
            `).join("")}
          </div>
          
          <div class="divider"></div>
          
          <div class="invoice-footer-totals">
            <div class="row">
              <span>Междинна сума:</span>
              <span>${(totals.eur / 1.2).toFixed(2)} лв.</span>
            </div>
            <div class="row">
              <span>ДДС (20%):</span>
              <span>${(totals.eur - (totals.eur / 1.2)).toFixed(2)} лв.</span>
            </div>
            <div class="row font-large text-primary font-bold">
              <span>ОБЩО С ДДС:</span>
              <span>${totals.eur.toFixed(2)} лв.</span>
            </div>
          </div>
        </div>
      `;
    }

    this.clear();
  },

  closeSuccess() {
    const successModal = document.getElementById("success-modal");
    if (successModal) {
      successModal.classList.remove("open");
      document.body.classList.remove("no-scroll");
      App.navigate("home");
    }
  },

  showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add("show"), 10);
    
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};
