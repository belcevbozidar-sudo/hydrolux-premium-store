// Hydrolux Group Store Configuration & Catalog Seed Data
const CONFIG = {
  company: {
    name: "Хидролукс Груп",
    tagline: "Хидравлични и пневматични решения, маркучи и компоненти",
    yearFounded: 2019,
    address: "Град Монтана, ул. „Индустриална“ 32г",
    addressShort: "ул. „Индустриална“ 32г, Монтана",
    phone: "+359 89 248 4337",
    phoneDisplay: "089 248 4337",
    email: "hydroluxgroup@gmail.com",
    workingHours: "Понеделник - Петък: 08:30 - 17:30 | Събота: 09:00 - 13:00",
    coords: { lat: 43.4116, lng: 23.2268 } // GPS placeholder
  },
  
  eurToBgn: 1.95583, // Fix rate
  
  categories: [
    {
      id: "air-hoses",
      name: "Маркучи за въздух",
      icon: "💨",
      subcategories: [
        { id: "air-polyurethane", name: "Полиуретанови" },
        { id: "air-pvc", name: "PVC" },
        { id: "air-rubber", name: "Гумени" }
      ]
    },
    {
      id: "water-hoses",
      name: "Маркучи за вода",
      icon: "💧",
      subcategories: [
        { id: "water-rubber", name: "Гумени" },
        { id: "water-flat", name: "Плоски (Layflat)" },
        { id: "water-pvc", name: "PVC" },
        { id: "water-sewer", name: "За каналопочистване" }
      ]
    },
    {
      id: "fuel-oil-hoses",
      name: "Маркучи за гориво и масло",
      icon: "🛢️",
      subcategories: []
    },
    {
      id: "coolant-hoses",
      name: "Маркучи за охлаждаща течност",
      icon: "❄️",
      subcategories: [
        { id: "coolant-silicone", name: "Силиконови" },
        { id: "coolant-rubber", name: "Гумени" }
      ]
    },
    {
      id: "silicone-hoses",
      name: "Силиконови маркучи и съединения",
      icon: "🧪",
      subcategories: [
        { id: "silicone-tubing", name: "Силиконови маркучи" },
        { id: "silicone-elbows", name: "Силиконови съединения" }
      ]
    },
    {
      id: "gas-hoses",
      name: "Маркучи за технически газове",
      icon: "🔥",
      subcategories: []
    },
    {
      id: "polyurethane-hoses",
      name: "Полиуретанови маркучи",
      icon: "🌀",
      subcategories: [
        { id: "pu-fittings", name: "Съединения за PU маркучи" }
      ]
    },
    {
      id: "pvc-hoses",
      name: "PVC Маркучи",
      icon: "📏",
      subcategories: [
        { id: "pvc-abrasion", name: "За абразия" },
        { id: "pvc-water", name: "За вода" },
        { id: "pvc-air", name: "За въздух" },
        { id: "pvc-fuel", name: "За гориво" },
        { id: "pvc-pesticides", name: "За пестициди" },
        { id: "pvc-food", name: "За храни" }
      ]
    },
    {
      id: "food-hoses",
      name: "Маркучи за храни",
      icon: "🍎",
      subcategories: [
        { id: "food-pvc", name: "PVC" },
        { id: "food-silicone", name: "Силиконови" },
        { id: "food-rubber", name: "Гумени" }
      ]
    },
    {
      id: "pneumatic-tubes",
      name: "Пневматични шлаухи",
      icon: "🧵",
      subcategories: [
        { id: "pneumatic-pa12", name: "PA 12 (Polyamide)" },
        { id: "pneumatic-nylon", name: "Nylon" },
        { id: "pneumatic-coils", name: "Спирални шлаухи" },
        { id: "pneumatic-pe", name: "Полиетиленови (PE)" },
        { id: "pneumatic-pu", name: "Полиуретанови (PU)" },
        { id: "pneumatic-ptfe", name: "Тефлонови (PTFE)" }
      ]
    },
    {
      id: "pneumatic-fittings",
      name: "Пневматични и съединители фитинги",
      icon: "⚙️",
      subcategories: [
        {
          id: "push-in",
          name: "Цангови връзки",
          sub: [
            { id: "push-in-inch", name: "Инчови" },
            { id: "push-in-metric", name: "Метрични" }
          ]
        },
        {
          id: "quick-couplings",
          name: "Бързи връзки",
          sub: [
            { id: "qc-highflow", name: "Високодебитни" },
            { id: "qc-mini", name: "Мини" },
            { id: "qc-standard", name: "Стандарт" }
          ]
        },
        { id: "threaded-fittings", name: "Резбови връзки" },
        { id: "cutting-ring", name: "Врязващ пръстен" },
        { id: "swivel-nut", name: "Затягаща гайка" },
        { id: "ball-valves", name: "Сферични кранове" },
        { id: "check-valves", name: "Възвратни клапани" },
        { id: "pneumatic-tools", name: "Инструменти" }
      ]
    },
    {
      id: "industrial-fittings",
      name: "Индустриални накрайници",
      icon: "⛓️",
      subcategories: [
        {
          id: "ibc-tote",
          name: "IBC бидони",
          sub: [
            { id: "ibc-caps", name: "Капачки" },
            { id: "ibc-valves", name: "Кранове" },
            { id: "ibc-nozzles", name: "Накрайници" }
          ]
        },
        {
          id: "camlock",
          name: "CAMLOCK бързи връзки",
          sub: [
            { id: "cam-alu", name: "Алуминий" },
            { id: "cam-brass", name: "Месинг" },
            { id: "cam-ss", name: "Неръждаема стомана" },
            { id: "cam-pp", name: "Полипропилен" }
          ]
        },
        { id: "hose-couplings", name: "Storz / Ferrari / GEKA / Guillemin / Cardan / Bauer" },
        { id: "industrial-nozzles", name: "Бързосменници / Пистолети" },
        { id: "industrial-valves", name: "Спирателни кранове и фланци" }
      ]
    },
    {
      id: "hydraulic-fittings",
      name: "Хидравлични накрайници",
      icon: "🔩",
      subcategories: [
        { id: "hyd-bsp", name: "BSP 60°" },
        { id: "hyd-din", name: "DIN 24°" },
        { id: "hyd-jic", name: "JIC 37°" },
        { id: "hyd-orfs", name: "ORFS" },
        { id: "hyd-flange", name: "Фланцови" },
        { id: "hyd-ferrules", name: "Чаши / Втулки за запресоване" }
      ]
    },
    {
      id: "high-pressure-hoses",
      name: "Маркучи за високо налягане",
      icon: "⚡",
      subcategories: [
        { id: "hp-thermoplastic", name: "Термопластични маркучи" },
        { id: "hp-hydraulic", name: "Хидравлични маркучи" },
        { id: "hp-sewer", name: "За каналопочистване" },
        { id: "hp-ptfe", name: "Тефлонови маркучи" },
        { id: "hp-washers", name: "За паро- и водоструйки" }
      ]
    },
    {
      id: "hose-accessories",
      name: "Аксесоари за маркучи",
      icon: "🎒",
      subcategories: [
        { id: "acc-joiners", name: "Месингови и POM снадки" },
        { id: "acc-guards", name: "Предпазни ръкави и спирали" },
        { id: "acc-clamps", name: "Скоби за маркучи" }
      ]
    }
  ],

  products: [
    {
      id: "semperit-plw-20",
      code: "PLW20",
      name: "Маркуч за въздух и вода SEMPERIT - PLW 20",
      category: "air-hoses",
      subcategory: "air-rubber",
      brand: "Semperit",
      rating: 5.0,
      reviewsCount: 12,
      views: 2136,
      inStock: true,
      tags: ["гумен маркуч", "маркуч за въздух", "маркуч за вода", "маркуч за компресор", "маркуч за помпене на гуми", "маркуч за миене", "градински маркуч"],
      description: `Висококачествен гумен маркуч за въздух и вода SEMPERIT - PLW 20 е класическо индустриално решение. Благодарение на своята надеждна конструкция с текстилна оплетка, той гарантира дълготрайна устойчивост и експлоатационна сигурност в изключително сурови условия.

Предназначен за пренос на индустриална вода и сгъстен въздух в строителството, индустрията, кариери и селското стопанство. Маркучът има отлична гъвкавост и е устойчив на усукване.`,
      specs: [
        { key: "Режим на работа", value: "Нагнетателен" },
        { key: "Материал на вложката", value: "Черна синтетична гума, устойчива на маслена мъгла" },
        { key: "Вид подсилване", value: "Две силно устойчиви текстилни оплетки" },
        { key: "Материал на покритието", value: "Черна синтетична гума, устойчива на озон, триене и атмосферни влияния" },
        { key: "Работна температура", value: "-25°C до +70°C" },
        { key: "Защитен фактор (безопасност)", value: "3:1 (Налягане на пръсване 60 bar)" },
        { key: "Минимално количество за поръчка", value: "1 метър (продава се на линеен метър)" }
      ],
      images: [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop", // placeholder premium industrial image
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop"
      ],
      // The core dynamic variants table
      variants: [
        { code: "PLW20006", innerDb: 6, inch: "1/4\"", outerDb: 12, pressure: 20, bend: 60, weight: 0.13, rollLength: 50, priceEur: 1.45 },
        { code: "PLW20008", innerDb: 8, inch: "5/16\"", outerDb: 15, pressure: 20, bend: 80, weight: 0.17, rollLength: 50, priceEur: 1.65 },
        { code: "PLW20010", innerDb: 10, inch: "3/8\"", outerDb: 17, pressure: 20, bend: 100, weight: 0.20, rollLength: 50, priceEur: 1.95 },
        { code: "PLW20013", innerDb: 13, inch: "1/2\"", outerDb: 20, pressure: 20, bend: 130, weight: 0.25, rollLength: 50, priceEur: 2.45 },
        { code: "PLW20016", innerDb: 16, inch: "5/8\"", outerDb: 23, pressure: 20, bend: 160, weight: 0.31, rollLength: 50, priceEur: 2.95 },
        { code: "PLW20019", innerDb: 19, inch: "3/4\"", outerDb: 27, pressure: 20, bend: 190, weight: 0.38, rollLength: 50, priceEur: 3.65 },
        { code: "PLW20025", innerDb: 25, inch: "1\"", outerDb: 34, pressure: 20, bend: 250, weight: 0.52, rollLength: 50, priceEur: 4.95 }
      ]
    },
    {
      id: "pu-tubing-pneumatic",
      code: "PU-PREM",
      name: "Полиуретанов пневматичен шлаух - PU Premium",
      category: "pneumatic-tubes",
      subcategory: "pneumatic-pu",
      brand: "Hydrolux OEM",
      rating: 4.9,
      reviewsCount: 8,
      views: 942,
      inStock: true,
      tags: ["полиуретан", "шлаух", "пневматика", "бързи връзки", "цанги", "въздух", "автоматизация"],
      description: `Гъвкав полиуретанов шлаух от най-висок клас, изработен от чист термопластичен полиуретан (TPU). Притежава забележителна устойчивост на пречупване, химикали, масла и абразия. Изключително подходящ за цангови връзки и автоматизирани пневматични системи.`,
      specs: [
        { key: "Материал", value: "100% термопластичен естерен полиуретан (TPU)" },
        { key: "Твърдост", value: "98 Shore A" },
        { key: "Работна температура", value: "-20°C до +60°C" },
        { key: "Работна среда", value: "Пречистен сгъстен въздух, вакуум, вода" },
        { key: "Защитен фактор", value: "3:1 при 23°C" },
        { key: "Цвят", value: "Син / Черен / Прозрачен" }
      ],
      images: [
        "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=600&auto=format&fit=crop"
      ],
      variants: [
        { code: "PU0425-BL", innerDb: 2.5, inch: "1/10\"", outerDb: 4, pressure: 10, bend: 15, weight: 0.012, rollLength: 100, priceEur: 0.35 },
        { code: "PU0640-BL", innerDb: 4.0, inch: "5/32\"", outerDb: 6, pressure: 10, bend: 25, weight: 0.023, rollLength: 100, priceEur: 0.55 },
        { code: "PU0855-BL", innerDb: 5.5, inch: "7/32\"", outerDb: 8, pressure: 10, bend: 35, weight: 0.039, rollLength: 100, priceEur: 0.75 },
        { code: "PU1075-BL", innerDb: 7.5, inch: "1/4\"", outerDb: 10, pressure: 10, bend: 50, weight: 0.055, rollLength: 100, priceEur: 1.15 },
        { code: "PU1290-BL", innerDb: 9.0, inch: "3/8\"", outerDb: 12, pressure: 10, bend: 65, weight: 0.078, rollLength: 100, priceEur: 1.55 }
      ]
    },
    {
      id: "hydraulic-hose-2sn",
      code: "2SN-HP",
      name: "Хидравличен маркуч за високо налягане 2SN - EN 853",
      category: "high-pressure-hoses",
      subcategory: "hp-hydraulic",
      brand: "Hydrolux High-Spec",
      rating: 5.0,
      reviewsCount: 16,
      views: 3105,
      inStock: true,
      tags: ["хидравличен маркуч", "високо налягане", "2SN", "запресоване", "хидравлика", "багер", "трактор"],
      description: `Професионален хидравличен маркуч с двойна стоманена оплетка (2SN) съгласно стандарт EN 853. Проектиран за пренос на хидравлични масла, емулсии вода-масло и водни разтвори под изключително високо налягане. Перфектен за строителна техника, селскостопански машини и промишлени хидравлични системи.`,
      specs: [
        { key: "Стандарт", value: "EN 853 2SN / SAE 100 R2AT" },
        { key: "Материал на вложката", value: "Маслоустойчива синтетична гума (NBR)" },
        { key: "Подсилване", value: "Две оплетки от високоякостна стоманена тел" },
        { key: "Външно покритие", value: "Синтетична гума, изключително устойчива на износване, озон и срязване" },
        { key: "Работна температура", value: "-40°C до +100°C (пикове до +120°C)" },
        { key: "Флуиди", value: "Минерални хидравлични масла, гликол, горива, вода" }
      ],
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop"
      ],
      variants: [
        { code: "2SN06", innerDb: 6.3, inch: "1/4\"", outerDb: 15.0, pressure: 400, bend: 100, weight: 0.38, rollLength: 50, priceEur: 2.80 },
        { code: "2SN08", innerDb: 8.0, inch: "5/16\"", outerDb: 16.6, pressure: 350, bend: 115, weight: 0.43, rollLength: 50, priceEur: 3.10 },
        { code: "2SN10", innerDb: 9.5, inch: "3/8\"", outerDb: 19.0, pressure: 330, bend: 130, weight: 0.51, rollLength: 50, priceEur: 3.40 },
        { code: "2SN13", innerDb: 12.7, inch: "1/2\"", outerDb: 22.2, pressure: 275, bend: 180, weight: 0.61, rollLength: 50, priceEur: 4.10 },
        { code: "2SN16", innerDb: 16.0, inch: "5/8\"", outerDb: 25.4, pressure: 250, bend: 200, weight: 0.73, rollLength: 50, priceEur: 4.90 },
        { code: "2SN19", innerDb: 19.0, inch: "3/4\"", outerDb: 29.3, pressure: 215, bend: 240, weight: 0.90, rollLength: 50, priceEur: 5.80 },
        { code: "2SN25", innerDb: 25.4, inch: "1\"", outerDb: 38.1, pressure: 165, bend: 300, weight: 1.35, rollLength: 40, priceEur: 8.20 }
      ]
    },
    {
      id: "pneumatic-fitting-pc",
      code: "PC-FITT",
      name: "Бърза цангова връзка - права с резба (Серия PC)",
      category: "pneumatic-fittings",
      subcategory: "push-in-metric",
      brand: "Pneumax Components",
      rating: 4.8,
      reviewsCount: 22,
      views: 745,
      inStock: true,
      tags: ["цангова връзка", "фитинг", "цанга", "пневматика", "PC", "права връзка", "метрична резба"],
      description: `Универсални месингови цангови връзки за пневматични инсталации с метричен/G захват. Осигуряват бързо и херметично свързване на полиуретанови и полиамидни шлаухи без инструменти. Вграденият О-пръстен осигурява отлично уплътнение.`,
      specs: [
        { key: "Тип", value: "Права цангова връзка с външна резба" },
        { key: "Материал на тялото", value: "Никелиран месинг" },
        { key: "Уплътнения", value: "NBR гума (висок клас)" },
        { key: "Работно налягане", value: "-0.95 до 12 bar" },
        { key: "Работна температура", value: "0°C до +60°C" }
      ],
      images: [
        "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?q=80&w=600&auto=format&fit=crop"
      ],
      variants: [
        { code: "PC6-01", innerDb: 6, inch: "G 1/8\"", outerDb: 6, pressure: 12, bend: 0, weight: 0.015, rollLength: 1, priceEur: 0.45 },
        { code: "PC6-02", innerDb: 6, inch: "G 1/4\"", outerDb: 6, pressure: 12, bend: 0, weight: 0.018, rollLength: 1, priceEur: 0.55 },
        { code: "PC8-01", innerDb: 8, inch: "G 1/8\"", outerDb: 8, pressure: 12, bend: 0, weight: 0.020, rollLength: 1, priceEur: 0.60 },
        { code: "PC8-02", innerDb: 8, inch: "G 1/4\"", outerDb: 8, pressure: 12, bend: 0, weight: 0.022, rollLength: 1, priceEur: 0.65 },
        { code: "PC10-02", innerDb: 10, inch: "G 1/4\"", outerDb: 10, pressure: 12, bend: 0, weight: 0.030, rollLength: 1, priceEur: 0.85 },
        { code: "PC12-03", innerDb: 12, inch: "G 3/8\"", outerDb: 12, pressure: 12, bend: 0, weight: 0.045, rollLength: 1, priceEur: 1.10 }
      ]
    }
  ]
};

// Helper function to format prices
function formatPrice(eur) {
  const bgn = eur * CONFIG.eurToBgn;
  return {
    eur: eur.toFixed(2) + " €",
    bgn: bgn.toFixed(2) + " лв.",
    eurRaw: eur,
    bgnRaw: bgn
  };
}
