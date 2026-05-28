// Hose Configurator Component (Euro € Optimized)
const HoseBuilder = {
  options: {
    hoseTypes: [
      { id: "hp-2sn", name: "Хидравличен маркуч 2SN (Двуоплетен)", basePriceEurPerMeter: 3.50, pressures: { "1/4\"": 400, "3/8\"": 330, "1/2\"": 275, "3/4\"": 215, "1\"": 165 } },
      { id: "hp-1sn", name: "Хидравличен маркуч 1SN (Еднооплетен)", basePriceEurPerMeter: 2.70, pressures: { "1/4\"": 225, "3/8\"": 180, "1/2\"": 160, "3/4\"": 105, "1\"": 88 } },
      { id: "hp-thermo", name: "Термопластичен маркуч R7", basePriceEurPerMeter: 4.20, pressures: { "1/4\"": 210, "3/8\"": 190, "1/2\"": 140, "3/4\"": 112, "1\"": 70 } }
    ],
    sizes: [
      { id: "1/4", name: "1/4\" (DN06)", factor: 1.0 },
      { id: "3/8", name: "3/8\" (DN10)", factor: 1.25 },
      { id: "1/2", name: "1/2\" (DN13)", factor: 1.5 },
      { id: "3/4", name: "3/4\" (DN19)", factor: 2.1 },
      { id: "1", name: "1\" (DN25)", factor: 3.0 }
    ],
    fittings: [
      { id: "none", name: "Без накрайник (прав срез)", priceEur: 0.0, icon: "➖" },
      { id: "dkol-straight", name: "DKOL Метричен прав (DKO-L)", priceEur: 3.20, icon: "➡️" },
      { id: "dkol-90", name: "DKOL Метричен 90° коляно", priceEur: 5.80, icon: "↳" },
      { id: "dkol-45", name: "DKOL Метричен 45° коляно", priceEur: 6.20, icon: "↗️" },
      { id: "bsp-straight", name: "BSP Прав с вътрешна резба", priceEur: 3.40, icon: "➡️" },
      { id: "bsp-90", name: "BSP 90° коляно с вътрешна резба", priceEur: 6.00, icon: "↳" },
      { id: "jic-straight", name: "JIC Прав с инчова резба (37° UNF)", priceEur: 3.60, icon: "➡️" }
    ],
    sleeves: [
      { id: "none", name: "Без предпазен ръкав", priceEurPerMeter: 0.0 },
      { id: "plastic-spiral", name: "Предпазна пластмасова спирала (жълта)", priceEurPerMeter: 1.20 },
      { id: "textile-sleeve", name: "Текстилен предпазен шлаух (черен)", priceEurPerMeter: 1.50 },
      { id: "metal-spiral", name: "Стоманена предпазна пружина", priceEurPerMeter: 2.80 }
    ]
  },

  state: {
    hoseTypeId: "hp-2sn",
    sizeId: "3/8",
    fittingLeftId: "dkol-straight",
    fittingRightId: "dkol-straight",
    sleeveId: "none",
    lengthMeters: 1.5
  },

  calculatePrice() {
    const hose = this.options.hoseTypes.find(h => h.id === this.state.hoseTypeId);
    const size = this.options.sizes.find(s => s.id === this.state.sizeId);
    const fitL = this.options.fittings.find(f => f.id === this.state.fittingLeftId);
    const fitR = this.options.fittings.find(f => f.id === this.state.fittingRightId);
    const sleeve = this.options.sleeves.find(sl => sl.id === this.state.sleeveId);

    if (!hose || !size || !fitL || !fitR || !sleeve) return { eur: 0 };

    const baseHosePrice = hose.basePriceEurPerMeter * size.factor;
    const hoseCost = baseHosePrice * this.state.lengthMeters;
    const sleeveCost = sleeve.priceEurPerMeter * this.state.lengthMeters * size.factor;
    const fittingsCost = fitL.priceEur + fitR.priceEur;

    const totalEur = hoseCost + sleeveCost + fittingsCost;

    return {
      eur: totalEur,
      details: {
        hoseCost,
        sleeveCost,
        fittingsCost
      }
    };
  },

  set(key, value) {
    if (key === "lengthMeters") {
      this.state[key] = Math.max(0.1, parseFloat(value) || 1.0);
    } else {
      this.state[key] = value;
    }
    this.render();
  },

  render() {
    const container = document.getElementById("hose-builder-container");
    if (!container) return;

    const price = this.calculatePrice();
    const hose = this.options.hoseTypes.find(h => h.id === this.state.hoseTypeId);
    const size = this.options.sizes.find(s => s.id === this.state.sizeId);
    const currentPressure = hose.pressures[size.name.split(" ")[0]] || "N/A";

    container.innerHTML = `
      <div class="builder-layout">
        <!-- Selection Column -->
        <div class="builder-inputs card">
          <h3 class="section-title">🔩 Параметри на запресоване</h3>
          
          <div class="form-group">
            <label>1. Тип на маркуча</label>
            <div class="builder-grid-options">
              ${this.options.hoseTypes.map(h => `
                <div class="grid-option ${this.state.hoseTypeId === h.id ? 'active' : ''}" 
                     onclick="HoseBuilder.set('hoseTypeId', '${h.id}')">
                  <div class="option-name">${h.name}</div>
                  <div class="option-sub">Базова цена: ${formatPrice(h.basePriceEurPerMeter).eur}/м</div>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="form-group">
            <label>2. Работен диаметър (DN)</label>
            <div class="builder-grid-options grid-3">
              ${this.options.sizes.map(s => `
                <div class="grid-option ${this.state.sizeId === s.id ? 'active' : ''}" 
                     onclick="HoseBuilder.set('sizeId', '${s.id}')">
                  <div class="option-name font-large">${s.name}</div>
                  <div class="option-sub">Коеф: x${s.factor}</div>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="form-group-split">
            <div class="form-group">
              <label>3. Ляв Накрайник (А)</label>
              <select class="form-control" onchange="HoseBuilder.set('fittingLeftId', this.value)">
                ${this.options.fittings.map(f => `
                  <option value="${f.id}" ${this.state.fittingLeftId === f.id ? 'selected' : ''}>
                    ${f.icon} ${f.name} (+${formatPrice(f.priceEur).eur})
                  </option>
                `).join("")}
              </select>
            </div>

            <div class="form-group">
              <label>4. Десен Накрайник (Б)</label>
              <select class="form-control" onchange="HoseBuilder.set('fittingRightId', this.value)">
                ${this.options.fittings.map(f => `
                  <option value="${f.id}" ${this.state.fittingRightId === f.id ? 'selected' : ''}>
                    ${f.icon} ${f.name} (+${formatPrice(f.priceEur).eur})
                  </option>
                `).join("")}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>5. Допълнителен предпазен ръкав</label>
            <select class="form-control" onchange="HoseBuilder.set('sleeveId', this.value)">
              ${this.options.sleeves.map(sl => `
                <option value="${sl.id}" ${this.state.sleeveId === sl.id ? 'selected' : ''}>
                  ${sl.name} ${sl.priceEurPerMeter > 0 ? `(+${formatPrice(sl.priceEurPerMeter).eur}/м)` : ''}
                </option>
              `).join("")}
            </select>
          </div>

          <div class="form-group">
            <label>6. Дължина на маркуча (метри)</label>
            <div class="length-input-wrapper">
              <button class="btn btn-secondary btn-icon" onclick="HoseBuilder.adjustLength(-0.1)">-</button>
              <input type="number" step="0.1" min="0.1" max="100" class="form-control length-input text-center" 
                     value="${this.state.lengthMeters.toFixed(1)}" 
                     onchange="HoseBuilder.set('lengthMeters', this.value)">
              <button class="btn btn-secondary btn-icon" onclick="HoseBuilder.adjustLength(0.1)">+</button>
              <span class="length-unit">метра</span>
            </div>
          </div>
        </div>

        <!-- Live Preview / Pricing Column -->
        <div class="builder-preview-panel">
          <div class="preview-card card text-center">
            <h3>🎨 Визуален Конфигуратор</h3>
            <div class="hose-schematic">
              <div class="fitting-graphic left-fitting ${this.state.fittingLeftId !== 'none' ? 'has-fitting' : ''}">
                <div class="fitting-label">А</div>
              </div>
              <div class="hose-graphic ${this.state.sleeveId !== 'none' ? 'sleeved' : ''}">
                <span class="hose-length-tag">${this.state.lengthMeters.toFixed(1)} м</span>
              </div>
              <div class="fitting-graphic right-fitting ${this.state.fittingRightId !== 'none' ? 'has-fitting' : ''}">
                <div class="fitting-label">Б</div>
              </div>
            </div>

            <div class="specs-summary">
              <div class="spec-badge">
                <span class="label">Диаметър</span>
                <span class="val">${size.name}</span>
              </div>
              <div class="spec-badge badge-warning">
                <span class="label">Раб. налягане</span>
                <span class="val">${currentPressure} Bar</span>
              </div>
              <div class="spec-badge">
                <span class="label">Защита</span>
                <span class="val">${this.options.sleeves.find(sl => sl.id === this.state.sleeveId).name}</span>
              </div>
            </div>

            <div class="divider"></div>

            <div class="pricing-panel">
              <div class="pricing-label">ПРОГНОЗНА ЦЕНА (С ДДС)</div>
              <div class="price-bgn font-huge text-primary">${price.eur.toFixed(2)} €</div>
              
              <div class="price-breakdown font-small text-muted">
                <span>Маркуч: ${formatPrice(price.details.hoseCost).eur}</span> | 
                <span>Накрайници: ${formatPrice(price.details.fittingsCost).eur}</span>
                ${price.details.sleeveCost > 0 ? `| <span>Ръкав: ${formatPrice(price.details.sleeveCost).eur}</span>` : ""}
              </div>
            </div>

            <a href="tel:+359892484337" class="btn btn-accent btn-block btn-large mt-20 text-center" style="display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none; font-weight: 800; background-color: var(--accent); color: #1f2421;">
              📞 Поръчай по телефон: 089 248 4337
            </a>
            <button class="btn btn-primary btn-block btn-large mt-10" onclick="HoseBuilder.openQuickInquiryForm()">
              ✉️ Изпрати запитване за тази сглобка
            </button>
            <p class="font-xs text-muted mt-10">
              * Запресоването се извършва на професионална холандска преса на място в гр. Монтана. Гаранция за херметичност 100%.
            </p>
          </div>
        </div>
      </div>
    `;
  },

  adjustLength(diff) {
    this.set("lengthMeters", (this.state.lengthMeters + diff).toFixed(1));
  },

  openQuickInquiryForm() {
    const hose = this.options.hoseTypes.find(h => h.id === this.state.hoseTypeId);
    const size = this.options.sizes.find(s => s.id === this.state.sizeId);
    const fitL = this.options.fittings.find(f => f.id === this.state.fittingLeftId);
    const fitR = this.options.fittings.find(f => f.id === this.state.fittingRightId);
    const sleeve = this.options.sleeves.find(sl => sl.id === this.state.sleeveId);
    const price = this.calculatePrice();

    const specText = `Здравейте, желая да направя запитване за следната сглобка:
- Тип маркуч: ${hose.name}
- Диаметър: ${size.name}
- Дължина: ${this.state.lengthMeters} метра
- Ляв накрайник: ${fitL.name}
- Десен накрайник: ${fitR.name}
- Предпазен ръкав: ${sleeve.name}
- Прогнозна цена: ${price.eur.toFixed(2)} €`;

    // Navigate to services/contacts SPA view
    App.navigate("services");

    // Wait a brief moment for DOM to mount and pre-fill the textarea
    setTimeout(() => {
      const textarea = document.querySelector("#services-view textarea");
      if (textarea) {
        textarea.value = specText;
        textarea.focus();
        // Scroll into view smoothly
        textarea.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  }
};
