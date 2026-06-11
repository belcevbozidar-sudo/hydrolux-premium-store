const fs = require('fs');
const path = require('path');

function parseCSVRow(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function getCategoryIcon(name) {
  name = name.toLowerCase();
  if (name.includes("въздух")) return "💨";
  if (name.includes("вода")) return "💧";
  if (name.includes("горив") || name.includes("масл")) return "🛢️";
  if (name.includes("охлажд") || name.includes("антифриз")) return "❄️";
  if (name.includes("силикон")) return "🧪";
  if (name.includes("газ") || name.includes("газове")) return "🔥";
  if (name.includes("полиуретан") || name.includes("шлаух")) return "🌀";
  if (name.includes("pvc") || name.includes("пвц")) return "📏";
  if (name.includes("хран")) return "🍎";
  if (name.includes("пневматик") || name.includes("съединител")) return "⚙️";
  if (name.includes("накрайник") || name.includes("накрайници") || name.includes("резба")) return "🔩";
  if (name.includes("високо налягане") || name.includes("хидравлич")) return "⚡";
  if (name.includes("аксесоар") || name.includes("скоба") || name.includes("спирала")) return "🎒";
  return "📁";
}

const csvPath = "/Users/bozhidarbelchev/Downloads/hydrolux_ocar740 (2).csv";
if (!fs.existsSync(csvPath)) {
  console.error("Error: CSV file not found at " + csvPath);
  process.exit(1);
}

console.log("Reading CSV database dump...");
const csvData = fs.readFileSync(csvPath, 'utf-8');
const lines = csvData.split(/\r?\n/);

let currentTable = null;
const tables = {
  manufacturer: [],
  category_description: [],
  category: [],
  product_to_category: [],
  product_image: [],
  product_description: [],
  product_option_value: [],
  product: []
};

for (let line of lines) {
  if (!line.trim()) continue;
  
  if (line.startsWith('"category_id","image","parent_id"')) {
    currentTable = 'category';
    tables[currentTable] = [];
    continue;
  }
  if (line.startsWith('"category_id","language_id","name"')) {
    currentTable = 'category_description';
    tables[currentTable] = [];
    continue;
  }
  if (line.startsWith('"manufacturer_id","name","image"')) {
    currentTable = 'manufacturer';
    tables[currentTable] = [];
    continue;
  }
  if (line.startsWith('"product_id","model","sku"')) {
    currentTable = 'product';
    tables[currentTable] = [];
    continue;
  }
  if (line.startsWith('"product_id","attribute_id","language_id"')) {
    currentTable = 'product_attribute';
    tables[currentTable] = [];
    continue;
  }
  if (line.startsWith('"product_id","language_id","name"')) {
    currentTable = 'product_description';
    tables[currentTable] = [];
    continue;
  }
  if (line.startsWith('"product_image_id","product_id"')) {
    currentTable = 'product_image';
    tables[currentTable] = [];
    continue;
  }
  if (line.startsWith('"product_option_id","product_id"')) {
    currentTable = 'product_option';
    tables[currentTable] = [];
    continue;
  }
  if (line.startsWith('"product_option_value_id","product_option_id"')) {
    currentTable = 'product_option_value';
    tables[currentTable] = [];
    continue;
  }
  if (line.startsWith('"product_id","related_id"')) {
    currentTable = 'product_related';
    tables[currentTable] = [];
    continue;
  }
  if (line.startsWith('"product_id","category_id"')) {
    currentTable = 'product_to_category';
    tables[currentTable] = [];
    continue;
  }
  if (line.startsWith('"product_id","store_id"')) {
    currentTable = 'product_to_store';
    tables[currentTable] = [];
    continue;
  }

  if (currentTable) {
    const row = parseCSVRow(line);
    tables[currentTable].push(row);
  }
}

console.log("Parsing metadata tables...");

// Load previously extracted brands as fallback
let extractedBrands = {};
try {
  const brandsPath = path.join(__dirname, 'js', 'extracted_brands.json');
  if (fs.existsSync(brandsPath)) {
    extractedBrands = JSON.parse(fs.readFileSync(brandsPath, 'utf-8'));
    console.log(`Loaded ${Object.keys(extractedBrands).length} extracted brands from backup.`);
  }
} catch (e) {
  console.log("Warning: could not load extracted brands:", e.message);
}

function resolveImageUrl(img) {
  if (!img) return "";
  let url = img;
  if (img.startsWith("catalog/")) {
    url = `https://hydrolux.bg/image/${img}`;
  }
  return encodeURI(url);
}

// 1. Manufacturers / Brands
const manufacturerMap = new Map();
for (let row of tables.manufacturer) {
  const id = row[0];
  const name = row[1];
  manufacturerMap.set(id, name.trim());
}

// 2. Category Descriptions (Bulgarian language_id = 2, fallback to 1)
const categoryDescMap = new Map();
for (let row of tables.category_description) {
  const id = row[0];
  const lang = row[1];
  const name = row[2];
  if (lang === '2') {
    categoryDescMap.set(id, name.trim());
  }
}
for (let row of tables.category_description) {
  const id = row[0];
  const lang = row[1];
  const name = row[2];
  if (lang === '1' && !categoryDescMap.has(id)) {
    categoryDescMap.set(id, name.trim());
  }
}

// 3. Category Objects
const categoryMap = new Map();
for (let row of tables.category) {
  const id = row[0];
  const img = row[1];
  const parentId = row[2];
  const status = row[6];
  if (status !== "1") continue;

  const name = categoryDescMap.get(id) || `Категория ${id}`;
  let catImage = resolveImageUrl(img);
  const catImageOverrides = {
    "154": "assets/cat_154.jpg",
    "168": "assets/cat_168.jpg",
    "67": "assets/cat_67.jpg",
    "73": "assets/cat_73.jpg",
    "74": "assets/cat_74.jpg",
    "60": "assets/cat_air_hoses.webp",
    "61": "assets/cat_fuel_oil_hoses.webp",
    "62": "assets/cat_coolant_hoses.webp",
    "63": "assets/cat_silicone_hoses.webp",
    "64": "assets/cat_pvc_hoses.webp",
    "70": "assets/cat_polyurethane_hoses.webp",
    "69": "assets/cat_hose_accessories.webp",
    "68": "assets/cat_food_hoses.webp",
    "66": "assets/cat_gas_hoses.webp",
    "65": "assets/cat_hydraulic_fittings.webp",
    "59": "assets/cat_water_hoses.webp",
    "71": "assets/cat_pneumatic_tubes.webp"
  };
  if (catImageOverrides[id]) {
    catImage = catImageOverrides[id];
  }

  categoryMap.set(id, {
    id: id,
    name: name,
    image: catImage,
    parentId: parentId,
    subcategories: []
  });
}

// 4. Build Categories Hierarchical tree
const categoriesHierarchy = [];
const allCategories = new Map();
for (let [id, cat] of categoryMap) {
  allCategories.set(id, {
    id: id,
    name: cat.name,
    icon: getCategoryIcon(cat.name),
    image: cat.image,
    parentId: cat.parentId,
    subcategories: []
  });
}

for (let [id, cat] of allCategories) {
  if (cat.parentId === "0") {
    categoriesHierarchy.push(cat);
  } else {
    const parent = allCategories.get(cat.parentId);
    if (parent) {
      parent.subcategories.push(cat);
    } else {
      categoriesHierarchy.push(cat);
    }
  }
}

// Helper to clean parentIds from final output
function cleanHierarchy(cats) {
  return cats.map(c => {
    const cleanCat = {
      id: c.id,
      name: c.name,
      icon: c.icon,
      image: c.image
    };
    if (c.subcategories && c.subcategories.length > 0) {
      cleanCat.subcategories = cleanHierarchy(c.subcategories);
    }
    return cleanCat;
  });
}
const finalCategories = cleanHierarchy(categoriesHierarchy);

// 5. Product Category mapping
const prodToCatMap = new Map();
for (let row of tables.product_to_category) {
  const prodId = row[0];
  const catId = row[1];
  if (!prodToCatMap.has(prodId)) {
    prodToCatMap.set(prodId, []);
  }
  prodToCatMap.get(prodId).push(catId);
}

// 6. Additional Product Images
const additionalImagesMap = new Map();
for (let row of tables.product_image) {
  const prodId = row[1];
  const img = row[2];
  if (!additionalImagesMap.has(prodId)) {
    additionalImagesMap.set(prodId, []);
  }
  additionalImagesMap.get(prodId).push(img);
}

// 7. Product Descriptions
const productDescMap = new Map();
for (let row of tables.product_description) {
  const id = row[0];
  const lang = row[1];
  const name = row[2];
  const desc = row[3];
  const tags = row[4];
  if (lang === '2') {
    productDescMap.set(id, { name, desc, tags });
  }
}
for (let row of tables.product_description) {
  const id = row[0];
  const lang = row[1];
  const name = row[2];
  const desc = row[3];
  const tags = row[4];
  if (lang === '1' && !productDescMap.has(id)) {
    productDescMap.set(id, { name, desc, tags });
  }
}

function normalizeKey(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\s\/]/g, '')
    .replace(/м/g, 'm')
    .replace(/а/g, 'a')
    .replace(/о/g, 'o')
    .replace(/е/g, 'e')
    .replace(/х/g, 'x')
    .replace(/р/g, 'p')
    .replace(/с/g, 'c')
    .replace(/у/g, 'y');
}

// Helper to parse parameter string
function parseParams(paramStr) {
  const params = {};
  if (!paramStr) return params;
  
  const parts = paramStr.split(',');
  for (let part of parts) {
    if (!part.trim()) continue;
    
    let key = '';
    let val = '';
    const sepIdx = part.indexOf(':');
    if (sepIdx !== -1) {
      key = part.substring(0, sepIdx).trim();
      val = part.substring(sepIdx + 1).trim();
    } else {
      // Fallback for missing colon: split text and numeric/dash value at the end
      const match = part.trim().match(/^([\s\S]*?)(-|\d+(?:\.\d+)?)\s*$/);
      if (match) {
        key = match[1].trim();
        val = match[2].trim();
      } else {
        continue;
      }
    }
    params[key] = val;
  }
  return params;
}

// Helper to extract variant
function extractVariant(params, basePrice, optPrice, optPrefix, optSku) {
  const v = {
    code: optSku || ""
  };
  
  const pFloat = (val) => {
    const f = parseFloat(val);
    return isNaN(f) ? 0 : f;
  };

  // Normalize all keys of the params object using normalizeKey
  const norm = {};
  for (let key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      norm[normalizeKey(key)] = params[key].toString().trim();
    }
  }

  const getVal = (list) => {
    for (let k of list) {
      const clean = normalizeKey(k);
      if (norm[clean] !== undefined) return norm[clean];
    }
    return null;
  };

  // 1. Inner diameter / Вътрешен диаметър
  let inner = getVal([
    "вътрешен диаметър (мм)",
    "вътрешен размер (мм)",
    "вътрешен размер (mm)",
    "вътрешен диаметър (цол)",
    "вътрешен диаметър (inch)",
    "dn",
    "inmm",
    "idmm",
    "вътр. ø (мм)",
    "id mm",
    "маркуч dn",
    "размер dn",
    "dn (мм)",
    "диаметър на маркуча (мм)",
    "диаметър на маркуча (mm)",
    "вътрешен размер (dn)",
    "вътрешен диаметър dn",
    "вътрешен диаметър mm",
    "вътрешен размер на тръба mm",
    "вътрешен размер на фланец mm",
    "за маркуч dn (mm)",
    "за накрайник dn",
    "storz dn",
    "guilemin dn",
    "фланец dn",
    "d1",
    "d (mm)",
    "d1 (mm)",
    "d2 (mm)",
    "d3",
    "размер",
    "размер (mm)",
    "за тръба (mm)",
    "условен размер",
    "вътрешен ø mm кислород",
    "вътрешен ø mm ацетилен"
  ]);
  if (inner) {
    const f = parseFloat(inner);
    v.innerDb = isNaN(f) ? inner : f;
  } else {
    v.innerDb = 0;
  }
  
  // 2. Inch size / Инчов размер
  let inch = getVal([
    "inch",
    "цол",
    "инч",
    "ininch",
    "вътрешен диаметър (цол)",
    "вътрешен диаметър (inch)",
    "id inch",
    "резба",
    "резба g",
    "g",
    "резба bspp",
    "bspp",
    "резба npt",
    "npt",
    "резба inch",
    "резба rd",
    "резба r(bspt)",
    "резба r",
    "резба ibc",
    "резба 1",
    "резба 2",
    "за маркуч inch",
    "за маркуч dn (inch)"
  ]);
  if (inch) {
    if (inch === "-") {
      v.inch = "";
    } else {
      v.inch = inch.toString().includes('"') ? inch : `${inch}"`;
    }
  } else {
    v.inch = "";
  }
  
  // 3. Outer diameter / Външен диаметър
  let outer = getVal([
    "външен диаметър (мм)",
    "външен размер (мм)",
    "външен размер (mm)",
    "външен диаметър (inch)",
    "outmm",
    "odmm",
    "външ. ø (мм)",
    "od mm",
    "външен диаметър",
    "външен диаметър mm",
    "външен диаметър dn",
    "d2",
    "външен ø mm",
    "външен размер на тръба mm",
    "външен размер (mm) min",
    "външен размер (mm) max",
    "външен размер-min (мм)",
    "външен размер-max (мм)",
    "оплетка (мм)"
  ]);
  if (outer) {
    v.outerDb = pFloat(outer);
  } else {
    v.outerDb = 0;
  }
  
  // 4. Pressure / Работно налягане
  let pressure = getVal([
    "работно налягане (bar)",
    "работно налягане",
    "работно нал.",
    "wpbar",
    "maxbar",
    "wp bar",
    "работно налятане (bar)",
    "работноналягане (bar)",
    "максимално работно налягане (bar)",
    "налягане (bar)",
    "работно налягане bar",
    "работно налягане (psi)",
    "bar"
  ]);
  if (pressure) {
    v.pressure = pFloat(pressure);
  } else {
    v.pressure = 0;
  }
  
  // 5. Bending radius / Радиус огъване
  let bend = getVal([
    "радиус на огъване (мм)",
    "радиус на огъване",
    "радиус огъване",
    "radiusog",
    "радиус на огъенае (mm)",
    "минимален радиус на огъване (mm)",
    "минимален радиус на огъване (мм)",
    "радиус на огъване в mm",
    "адиус на огъване (mm)",
    "радиус на огъване (bar)"
  ]);
  if (bend) {
    v.bend = pFloat(bend);
  } else {
    v.bend = 0;
  }
  
  // 6. Weight / Тегло
  let weight = getVal([
    "тегло (кг/м)",
    "тегло",
    "wgm",
    "w g/m",
    "тегло (kg/m)",
    "тегло(kg/m)",
    "тегло (g/m)",
    "тегло (кг/г)",
    "тегло (kg/g)",
    "тегло kg/mm",
    "тегло (кг/m)",
    "тегло kg / m",
    "тегло (м)",
    "тегло (мм)"
  ]);
  if (weight) {
    v.weight = pFloat(weight);
  } else {
    v.weight = 0;
  }
  
  // 7. Roll length / Дължина на ролката
  let rollLength = getVal([
    "дължина линейна (m)",
    "дължина на ролката",
    "дълж. ролка",
    "l",
    "sizeroll",
    "размер на ролка (м)",
    "размер на ролка (m)",
    "размер на ролката",
    "размер на ролката (m)",
    "размер на ролката(m)",
    "дължина на ролката (m)",
    "ролка (m)",
    "l (m)",
    "дължина на рулата",
    "количество на ролки в метри",
    "дължина на маркуча (m)"
  ]);
  if (rollLength) {
    v.rollLength = pFloat(rollLength);
  } else {
    v.rollLength = 0;
  }
  
  // 7a. Wall thickness / Дебелина на стената
  let wallMin = getVal([
    "дебелина на стената min (mm)",
    "дебелина на стената min (мм)",
    "дебелина на стената - min"
  ]);
  let wallMax = getVal([
    "дебелина на стената max (mm)",
    "дебелина на стената max (мм)",
    "дебелина на стената - max"
  ]);
  let wall = getVal([
    "дебелина на стената (mm)",
    "дебелина на стената (мм)",
    "дебелина на стената",
    "стена (мм)",
    "стена(мм)",
    "дебелина на стената mm кислород",
    "дебелина на стената mm ацетилен"
  ]);

  if (wallMin && wallMax) {
    v.wallDb = `${wallMin}-${wallMax}`;
  } else if (wall) {
    v.wallDb = wall;
  } else if (wallMin) {
    v.wallDb = wallMin;
  } else if (wallMax) {
    v.wallDb = wallMax;
  } else {
    v.wallDb = "";
  }

  // 7b. Vacuum / Вакуум
  let vacuumVal = getVal([
    "вакуум (%)",
    "вакуум %",
    "вакуум (bar)",
    "275 вакуум (bar)",
    "вакуум (m h2o)",
    "вакуум (23 °c m/h2o)",
    "вакуум (h2o)",
    "вакуум (мм)",
    "вакуум (м)",
    "вакуум"
  ]);

  if (vacuumVal && vacuumVal !== "-") {
    let matchedKey = "";
    for (let k of [
      "вакуум (%)", "вакуум %", "вакуум (bar)", "275 вакуум (bar)",
      "вакуум (m h2o)", "вакуум (23 °c m/h2o)", "вакуум (h2o)",
      "вакуум (мм)", "вакуум (м)", "вакуум"
    ]) {
      if (norm[normalizeKey(k)] !== undefined) {
        matchedKey = k;
        break;
      }
    }
    
    if (matchedKey.includes("%")) {
      v.vacuumDb = `${vacuumVal}%`;
    } else if (matchedKey.includes("bar")) {
      v.vacuumDb = `${vacuumVal} Bar`;
    } else if (matchedKey.includes("h2o")) {
      v.vacuumDb = `${vacuumVal} m H2O`;
    } else if (matchedKey.includes("(мм)")) {
      v.vacuumDb = `${vacuumVal} m H2O`;
    } else if (matchedKey.includes("(м)")) {
      v.vacuumDb = `${vacuumVal} m H2O`;
    } else {
      const num = parseFloat(vacuumVal);
      if (!isNaN(num)) {
        if (num > 10) {
          v.vacuumDb = `${vacuumVal}%`;
        } else if (num > 0 && num < 1) {
          v.vacuumDb = `${vacuumVal} Bar`;
        } else {
          v.vacuumDb = `${vacuumVal} m H2O`;
        }
      } else {
        v.vacuumDb = vacuumVal;
      }
    }
  } else {
    v.vacuumDb = "";
  }

  // 7c. Burst pressure / Разрушаващо налягане
  let burstVal = getVal([
    "bp bar",
    "bp psi",
    "налягане на разкъсване (bar)",
    "налягане на разкъсване (Bar)",
    "налягане на разкъсване (23 °c bar)",
    "разрушаващо налягане (bar)",
    "налягане на разкъсване (psi)",
    "налягане на разкъсване (мм)",
    "разрушаващо налягане (bar)"
  ]);
  
  if (burstVal && burstVal !== "-") {
    let matchedKey = "";
    for (let k of [
      "bp bar", "bp psi", "налягане на разкъсване (bar)", "налягане на разкъсване (Bar)",
      "налягане на разкъсване (23 °c bar)", "разрушаващо налягане (bar)", "налягане на разкъсване (psi)",
      "налягане на разкъсване (мм)", "разрушаващо налягане (bar)"
    ]) {
      if (norm[normalizeKey(k)] !== undefined) {
        matchedKey = k;
        break;
      }
    }
    if (matchedKey.toLowerCase().includes("psi")) {
      const psi = parseFloat(burstVal);
      if (!isNaN(psi)) {
        v.burstDb = `${Math.round(psi / 14.5)} Bar`;
      } else {
        v.burstDb = `${burstVal} PSI`;
      }
    } else {
      v.burstDb = `${burstVal} Bar`;
    }
  } else {
    v.burstDb = "";
  }

  // 7d. Spacing / Разстояние между зъбите
  let spacingVal = getVal([
    "разстояние между зъбите (мм)",
    "разстояние между зъбите (mm)",
    "разстоние на зъбите (мм)",
    "разтояние между зъбите (mm )",
    "разтояние между зъбите (мм)",
    "разстояние между зъбите (mm )",
    "разтояние между зъбите (mm)",
    "разстояние между зъбите (мм)",
    "расзтояние на зъбите (mm)"
  ]);
  if (spacingVal && spacingVal !== "-") {
    v.spacingDb = spacingVal;
  } else {
    v.spacingDb = "";
  }

  // 7e. HEX Size / HEX размер
  let hexVal = getVal([
    "hex (mm)",
    "hex(mm)",
    "hex",
    "sw (mm)",
    "sw",
    "ch",
    "ch1",
    "ch2"
  ]);
  if (hexVal && hexVal !== "-") {
    v.hexDb = hexVal;
  } else {
    v.hexDb = "";
  }

  // 7f. Sleeve Width / Широчина на ръкава
  let sleeveWidthVal = getVal([
    "широчина на ръкава (мм)",
    "ширина на ръкава (мм)",
    "ширина на ръкава"
  ]);
  if (sleeveWidthVal && sleeveWidthVal !== "-") {
    v.sleeveWidthDb = sleeveWidthVal;
  } else {
    v.sleeveWidthDb = "";
  }

  // 7g. Braids / Оплетки
  let braidsVal = getVal([
    "оплетки (nr)",
    "брой оплетки",
    "брой на оплетките",
    "оплетки краища (nr)"
  ]);
  if (braidsVal && braidsVal !== "-") {
    v.braidsDb = braidsVal;
  } else {
    v.braidsDb = "";
  }

  // 7h. Clamping Range / Работен диапазон
  let rangeMin = getVal([
    "диапазон долен - диаметър (mm)",
    "диапазон долен - диаметър (мм)",
    "диапазон - мин"
  ]);
  let rangeMax = getVal([
    "диапазон горен - диаметър (mm)",
    "диапазон горен - диаметър (мм)",
    "диапазон - макс"
  ]);
  let rangeVal = getVal([
    "диапазон"
  ]);
  if (rangeMin && rangeMax) {
    v.rangeDb = `${rangeMin}-${rangeMax}`;
  } else if (rangeVal) {
    v.rangeDb = rangeVal;
  } else {
    v.rangeDb = "";
  }
  
  let price = basePrice;
  const diff = parseFloat(optPrice) || 0;
  if (optPrefix === '+') {
    price += diff;
  } else if (optPrefix === '-') {
    price -= diff;
  }
  if (price <= 0 && basePrice > 0) {
    price = basePrice;
  }
  v.priceEur = parseFloat(price.toFixed(2));
  
  return v;
}

// 8. Product Option Values
const productOptionValuesMap = new Map();
for (let row of tables.product_option_value) {
  const prodId = row[2];
  const price = row[7];
  const paramsStr = row[8];
  const prefix = row[9];
  const params = parseParams(paramsStr);
  
  if (!productOptionValuesMap.has(prodId)) {
    productOptionValuesMap.set(prodId, []);
  }
  productOptionValuesMap.get(prodId).push({
    price,
    prefix,
    params
  });
}

console.log("Assembling products array...");

// 9. Map and build final Products list
const finalProducts = [];
for (let row of tables.product) {
  const id = row[0];
  const model = row[1];
  const sku = row[2];
  const image = row[11];
  const mfrId = row[12];
  const price = parseFloat(row[14]) || 0;
  const status = row[27];
  
  if (status !== "1") continue; // only active products

  const descObj = productDescMap.get(id) || { name: `Продукт ${model}`, desc: "", tags: "" };
  const categories = prodToCatMap.get(id) || [];
  let brand = "Хидролукс";
  if (extractedBrands[`prod-${id}`]) {
    brand = extractedBrands[`prod-${id}`];
  } else if (manufacturerMap.has(mfrId)) {
    brand = manufacturerMap.get(mfrId);
  }
  const mainImage = resolveImageUrl(image) || "assets/logo.webp";
  const addImages = (additionalImagesMap.get(id) || []).map(resolveImageUrl).filter(Boolean);
  const images = [mainImage, ...addImages];
  
  const tags = descObj.tags ? descObj.tags.split(",").map(t => t.trim()).filter(Boolean) : [];
  
  // Clean description HTML slightly
  let cleanDesc = descObj.desc || "";
  cleanDesc = cleanDesc.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  let textDesc = cleanDesc.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (textDesc.length > 250) {
    textDesc = textDesc.substring(0, 247) + "...";
  }

  // Parse variants
  const optValues = productOptionValuesMap.get(id) || [];
  const variants = optValues.map((opt, vIdx) => {
    return extractVariant(opt.params, price, opt.price, opt.prefix, `${sku || model || ('prod-' + id)}-${vIdx + 1}`);
  });
  
  // If no variants, create a single default variant
  if (variants.length === 0) {
    variants.push({
      code: sku || model,
      innerDb: 0,
      inch: "",
      outerDb: 0,
      wallDb: "",
      burstDb: "",
      pressure: 0,
      vacuumDb: "",
      spacingDb: "",
      hexDb: "",
      sleeveWidthDb: "",
      braidsDb: "",
      rangeDb: "",
      bend: 0,
      weight: 0,
      rollLength: 0,
      priceEur: price
    });
  }

  finalProducts.push({
    id: `prod-${id}`,
    code: sku || model,
    isSpecial: false,
    name: descObj.name,
    category: categories[0] || "",
    categories: categories,
    brand: brand,
    rating: 5.0,
    reviewsCount: 0,
    views: 0,
    inStock: true,
    unit: "м",
    homeSpecs: [
      { key: "Марка", value: brand }
    ],
    tags: tags,
    description: textDesc || descObj.name,
    specs: [],
    images: images,
    variants: variants
  });
}

console.log(`Parsed ${finalCategories.length} top-level categories and ${finalProducts.length} active products.`);

// 10. Update config.js
const configPath = path.join(__dirname, 'js', 'config.js');
console.log("Updating config file at: " + configPath);

if (!fs.existsSync(configPath)) {
  console.error("Error: config.js not found at " + configPath);
  process.exit(1);
}

// Backup original config.js
const backupPath = configPath + '.bak';
fs.copyFileSync(configPath, backupPath);
console.log("Created backup of config.js at: " + backupPath);

const originalConfig = fs.readFileSync(configPath, 'utf-8');

// We will replace categories and products arrays
// Let's find the company object block
const companyMatch = originalConfig.match(/company:\s*\{[\s\S]*?\},\s*/);
const companyStr = companyMatch ? companyMatch[0] : `company: {
    name: "Хидролукс Груп",
    tagline: "Хидравлични и пневматични решения, маркучи и компоненти",
    yearFounded: 2019,
    address: "Град Монтана, ул. „Индустриална“ 32г",
    addressShort: "ул. „Индустриална“ 32г, Монтана",
    phone: "+359 89 248 4337",
    phoneDisplay: "089 248 4337",
    email: "hydroluxgroup@gmail.com",
    workingHours: "Понеделник - Петък: 08:30 - 17:30 | Събота: 09:00 - 13:00"
  },`;

// Use hardcoded builderOptions to avoid lazy regex match errors
const builderStr = `builderOptions: {
    hoseTypes: [
      { id: "hp-2sn", name: "Хидравличен маркуч 2SN (Двуоплетен)", basePriceEurPerMeter: 3.50, pressures: { "1/4\\\"": 400, "3/8\\\"": 330, "1/2\\\"": 275, "3/4\\\"": 215, "1\\\"": 165 } },
      { id: "hp-1sn", name: "Хидравличен маркуч 1SN (Еднооплетен)", basePriceEurPerMeter: 2.70, pressures: { "1/4\\\"": 225, "3/8\\\"": 180, "1/2\\\"": 160, "3/4\\\"": 105, "1\\\"": 88 } },
      { id: "hp-thermo", name: "Термопластичен маркуч R7", basePriceEurPerMeter: 4.20, pressures: { "1/4\\\"": 210, "3/8\\\"": 190, "1/2\\\"": 140, "3/4\\\"": 112, "1\\\"": 70 } }
    ],
    sizes: [
      { id: "1/4", name: "1/4\\\" (DN06)", factor: 1.0 },
      { id: "3/8", name: "3/8\\\" (DN10)", factor: 1.25 },
      { id: "1/2", name: "1/2\\\" (DN13)", factor: 1.5 },
      { id: "3/4", name: "3/4\\\" (DN19)", factor: 2.1 },
      { id: "1", name: "1\\\" (DN25)", factor: 3.0 }
    ],
    fittings: [
      { id: "none", name: "Без накрайник (прав срез)", prices: { "1/4": 0.0, "3/8": 0.0, "1/2": 0.0, "3/4": 0.0, "1": 0.0 }, icon: "➖", category: "Без накрайник", angle: "none" },
      { id: "dkol-straight", name: "DKOL Метричен прав (DKO-L)", prices: { "1/4": 3.20, "3/8": 3.60, "1/2": 4.20, "3/4": 5.50, "1": 7.50 }, icon: "➡️", category: "DKOL Метрични", angle: "straight" },
      { id: "dkol-90", name: "DKOL Метричен 90° коляно", prices: { "1/4": 5.80, "3/8": 6.50, "1/2": 7.50, "3/4": 9.80, "1": 13.50 }, icon: "↳", category: "DKOL Метрични", angle: "90" },
      { id: "dkol-45", name: "DKOL Метричен 45° коляно", prices: { "1/4": 6.20, "3/8": 6.90, "1/2": 7.90, "3/4": 10.50, "1": 14.20 }, icon: "↗️", category: "DKOL Метрични", angle: "45" },
      { id: "bsp-straight", name: "BSP Прав с вътрешна резба", prices: { "1/4": 3.40, "3/8": 3.80, "1/2": 4.40, "3/4": 5.80, "1": 7.90 }, icon: "➡️", category: "BSP Инчови", angle: "straight" },
      { id: "bsp-90", name: "BSP 90° коляно с вътрешна резба", prices: { "1/4": 6.00, "3/8": 6.70, "1/2": 7.75, "3/4": 10.20, "1": 14.00 }, icon: "↳", category: "BSP Инчови", angle: "90" },
      { id: "jic-straight", name: "JIC Прав с инчова резба (37° UNF)", prices: { "1/4": 3.60, "3/8": 4.10, "1/2": 4.80, "3/4": 6.20, "1": 8.50 }, icon: "➡️", category: "JIC Инчови", angle: "straight" }
    ],
    sleeves: [
      { id: "none", name: "Без предпазен ръкав", priceEurPerMeter: 0.0 },
      { id: "plastic-spiral", name: "Предпазна пластмасова спирала (жълта)", priceEurPerMeter: 1.20 },
      { id: "textile-sleeve", name: "Текстилен предпазен шлаух (черен)", priceEurPerMeter: 1.50 },
      { id: "metal-spiral", name: "Стоманена предпазна пружина", priceEurPerMeter: 2.80 }
    ]
  }`;

// Find functions after CONFIG object
const functionsIndex = originalConfig.indexOf('// Helper function to format prices');
const functionsStr = functionsIndex !== -1 ? originalConfig.substring(functionsIndex) : '';

// Rebuild new config
const newConfig = `// Hydrolux Group Store Configuration & Catalog Seed Data (Euro € Optimized)
const CONFIG = {
  ${companyStr.trim()}
  
  eurToBgn: 1.0, // Strictly EUR now
  
  categories: ${JSON.stringify(finalCategories, null, 2)},

  products: ${JSON.stringify(finalProducts, null, 2)},

  ${builderStr.trim()}
};

${functionsStr}
`;

fs.writeFileSync(configPath, newConfig, 'utf-8');
console.log("Import completed successfully!");
