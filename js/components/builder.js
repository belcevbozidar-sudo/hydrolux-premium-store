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
        
        <!-- Left Column: Realistic 3D Cutaway Diagram with pointer labels -->
        <div class="builder-graphic-column">
          <div class="hose-cutaway-container">
            <img src="assets/hose_cutaway.png" alt="Hydraulic Hose Cutaway" class="hose-cutaway-img">
            
            <!-- Interactive glowing hot spots and pointer labels -->
            <div class="pointer-label label-inner" style="top: 45%; left: 8%;">
              <span class="label-text">ВЪТРЕШЕН СЛОЙ</span>
              <div class="pointer-line" style="height: 25px; transform: rotate(45deg); margin-left: 20px;"></div>
              <div class="pointer-dot" style="margin-left: 38px;"></div>
            </div>
            
            <div class="pointer-label label-braid" style="top: 25%; left: 32%;">
              <span class="label-text">АРМИРОВКА</span>
              <div class="pointer-line" style="height: 35px; transform: rotate(20deg); margin-left: 10px;"></div>
              <div class="pointer-dot" style="margin-left: 20px;"></div>
            </div>
            
            <div class="pointer-label label-outer" style="top: 50%; left: 70%;">
              <span class="label-text">ВЪНШЕН СЛОЙ</span>
              <div class="pointer-line" style="height: 20px; transform: rotate(-35deg); margin-right: 15px; float: right;"></div>
              <div class="pointer-dot" style="margin-right: 25px; clear: both; float: right; margin-top: 5px;"></div>
            </div>
            
            <div class="pointer-label label-flex" style="top: 76%; left: 38%;">
              <div class="pointer-dot" style="margin-bottom: 5px; margin-left: 12px;"></div>
              <span class="label-text">360° ГЪВКАВОСТ</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Parameters, specs, selectors & CTA buttons -->
        <div class="builder-specs-column">
          <h2 class="config-title">${hose.name}</h2>
          
          <!-- Parameters Specs Table -->
          <div class="specs-table-container">
            <table class="specs-data-table">
              <thead>
                <tr>
                  <th>Параметри</th>
                  ${this.options.sizes.map(s => `
                    <th class="${this.state.sizeId === s.id ? 'active-spec-col' : ''}" style="${this.state.sizeId === s.id ? 'background-color: rgba(0, 187, 255, 0.3); color: #ffffff;' : ''}">
                      ${s.name.split(" ")[0]}
                    </th>
                  `).join("")}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Коефициент</td>
                  ${this.options.sizes.map(s => `
                    <td style="${this.state.sizeId === s.id ? 'background-color: rgba(0, 187, 255, 0.1); font-weight: bold;' : ''}">
                      x${s.factor.toFixed(2)}
                    </td>
                  `).join("")}
                </tr>
                <tr>
                  <td>Работно налягане</td>
                  ${this.options.sizes.map(s => {
                    const press = hose.pressures[s.name.split(" ")[0]] || "N/A";
                    return `
                      <td style="${this.state.sizeId === s.id ? 'background-color: rgba(0, 187, 255, 0.1); font-weight: bold; color: #2be885;' : ''}">
                        ${press} Bar
                      </td>
                    `;
                  }).join("")}
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Configuration Selectors Dropdowns Grid -->
          <div class="config-selectors-grid">
            <div class="form-group">
              <label class="form-group label" style="color: rgba(255,255,255,0.7); font-size: 0.8rem; margin-bottom: 5px; display: block;">1. Тип маркуч</label>
              <select class="form-control config-select" onchange="HoseBuilder.set('hoseTypeId', this.value)">
                ${this.options.hoseTypes.map(h => `
                  <option value="${h.id}" ${this.state.hoseTypeId === h.id ? 'selected' : ''}>
                    ${h.name}
                  </option>
                `).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-group label" style="color: rgba(255,255,255,0.7); font-size: 0.8rem; margin-bottom: 5px; display: block;">2. Диаметър (DN)</label>
              <select class="form-control config-select" onchange="HoseBuilder.set('sizeId', this.value)">
                ${this.options.sizes.map(s => `
                  <option value="${s.id}" ${this.state.sizeId === s.id ? 'selected' : ''}>
                    ${s.name}
                  </option>
                `).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-group label" style="color: rgba(255,255,255,0.7); font-size: 0.8rem; margin-bottom: 5px; display: block;">3. Дължина (м)</label>
              <select class="form-control config-select" onchange="HoseBuilder.set('lengthMeters', this.value)">
                <option value="0.5" ${this.state.lengthMeters === 0.5 ? 'selected' : ''}>0.5 м</option>
                <option value="1.0" ${this.state.lengthMeters === 1.0 ? 'selected' : ''}>1.0 м</option>
                <option value="1.5" ${this.state.lengthMeters === 1.5 ? 'selected' : ''}>1.5 м</option>
                <option value="2.0" ${this.state.lengthMeters === 2.0 ? 'selected' : ''}>2.0 м</option>
                <option value="3.0" ${this.state.lengthMeters === 3.0 ? 'selected' : ''}>3.0 м</option>
                <option value="5.0" ${this.state.lengthMeters === 5.0 ? 'selected' : ''}>5.0 м</option>
                <option value="10.0" ${this.state.lengthMeters === 10.0 ? 'selected' : ''}>10.0 м</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-group label" style="color: rgba(255,255,255,0.7); font-size: 0.8rem; margin-bottom: 5px; display: block;">4. Тип накрайник (Ляв)</label>
              <select class="form-control config-select" onchange="HoseBuilder.set('fittingLeftId', this.value)">
                ${this.options.fittings.map(f => `
                  <option value="${f.id}" ${this.state.fittingLeftId === f.id ? 'selected' : ''}>
                    ${f.name}
                  </option>
                `).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-group label" style="color: rgba(255,255,255,0.7); font-size: 0.8rem; margin-bottom: 5px; display: block;">5. Тип накрайник (Десен)</label>
              <select class="form-control config-select" onchange="HoseBuilder.set('fittingRightId', this.value)">
                ${this.options.fittings.map(f => `
                  <option value="${f.id}" ${this.state.fittingRightId === f.id ? 'selected' : ''}>
                    ${f.name}
                  </option>
                `).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-group label" style="color: rgba(255,255,255,0.7); font-size: 0.8rem; margin-bottom: 5px; display: block;">6. Допълнителен ръкав</label>
              <select class="form-control config-select" onchange="HoseBuilder.set('sleeveId', this.value)">
                ${this.options.sleeves.map(sl => `
                  <option value="${sl.id}" ${this.state.sleeveId === sl.id ? 'selected' : ''}>
                    ${sl.name}
                  </option>
                `).join("")}
              </select>
            </div>
          </div>

          <!-- Add to Cart and Availability panel -->
          <div class="config-actions-row">
            <button class="btn btn-config-cyan" onclick="HoseBuilder.addToCart()">
              ДОБАВИ В КОЛИЧКАТА
            </button>
            
            <div class="availability-badge">
              <span class="check-circle-icon">✓</span>
              <span class="avail-text">НАЛИЧНОСТ: <strong class="text-green">НА СКЛАД</strong></span>
            </div>
          </div>

          <!-- Inquiry Button -->
          <div class="inquiry-button-row">
            <button class="btn-config-outline" onclick="HoseBuilder.openQuickInquiryForm()">
              ЗАПИТВАНЕ ЗА ПРОДУКТ
            </button>
          </div>

          <div class="pricing-summary-bar font-small text-muted mt-20" style="border-top: 1px solid rgba(0, 187, 255, 0.15); padding-top: 15px;">
            <span>Спецификация: ${size.name} маркуч, прогнозна цена: <strong style="color: #00bbff; font-size: 1.1rem;">${price.eur.toFixed(2)} €</strong> с ДДС.</span>
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
