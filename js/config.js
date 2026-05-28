// Hydrolux Group Store Configuration & Catalog Seed Data (Euro € Optimized)
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
    workingHours: "Понеделник - Петък: 08:30 - 17:30 | Събота: 09:00 - 13:00"
  },
  
  eurToBgn: 1.0, // Strictly EUR now
  
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
        { id: "push-in", name: "Цангови връзки" },
        { id: "quick-couplings", name: "Бързи връзки" },
        { id: "threaded-fittings", name: "Резбови връзки" }
      ]
    },
    {
      id: "hydraulic-fittings",
      name: "Хидравлични накрайници",
      icon: "🔩",
      subcategories: [
        { id: "hyd-bsp", name: "BSP 60°" },
        { id: "hyd-din", name: "DIN 24°" },
        { id: "hyd-jic", name: "JIC 37°" }
      ]
    },
    {
      id: "high-pressure-hoses",
      name: "Маркучи за високо налягане",
      icon: "⚡",
      subcategories: [
        { id: "hp-hydraulic", name: "Хидравлични маркучи" },
        { id: "hp-washers", name: "За паро- и водоструйки" }
      ]
    },
    {
      id: "hose-accessories",
      name: "Аксесоари за маркучи",
      icon: "🎒",
      subcategories: [
        { id: "acc-joiners", name: "Месингови и POM снадки" },
        { id: "acc-guards", name: "Предпазни ръкави и спирали" }
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
      tags: ["гумен маркуч", "маркуч за въздух", "маркуч за вода", "маркуч за компресор"],
      description: `Висококачествен гумен маркуч за въздух и вода SEMPERIT - PLW 20 е класическо индустриално решение. Подходящ за пренос на индустриална вода и сгъстен въздух в строителството, индустрията, кариери и селското стопанство. Маркучът има отлична гъвкавост и е устойчив на усукване.`,
      specs: [
        { key: "Режим на работа", value: "Нагнетателен" },
        { key: "Материал", value: "Черна синтетична гума" },
        { key: "Вид подсилване", value: "Две силно устойчиви текстилни оплетки" },
        { key: "Работна температура", value: "-25°C до +70°C" },
        { key: "Защитен фактор", value: "3:1 (Налягане на пръсване 60 bar)" }
      ],
      images: [
        "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600&auto=format&fit=crop"
      ],
      variants: [
        { code: "PLW20006", innerDb: 6, inch: "1/4\"", outerDb: 12, pressure: 20, bend: 60, weight: 0.13, rollLength: 50, priceEur: 1.45 },
        { code: "PLW20008", innerDb: 8, inch: "5/16\"", outerDb: 15, pressure: 20, bend: 80, weight: 0.17, rollLength: 50, priceEur: 1.65 },
        { code: "PLW20010", innerDb: 10, inch: "3/8\"", outerDb: 17, pressure: 20, bend: 100, weight: 0.20, rollLength: 50, priceEur: 1.95 },
        { code: "PLW20013", innerDb: 13, inch: "1/2\"", outerDb: 20, pressure: 20, bend: 130, weight: 0.25, rollLength: 50, priceEur: 2.45 },
        { code: "PLW20019", innerDb: 19, inch: "3/4\"", outerDb: 27, pressure: 20, bend: 190, weight: 0.38, rollLength: 50, priceEur: 3.65 },
        { code: "PLW20025", innerDb: 25, inch: "1\"", outerDb: 34, pressure: 20, bend: 250, weight: 0.52, rollLength: 50, priceEur: 4.95 }
      ]
    },
    {
      id: "water-flat-flatline",
      code: "FLAT-HP",
      name: "Плосък маркуч за вода Layflat - Flatline Premium",
      category: "water-hoses",
      subcategory: "water-flat",
      brand: "Hydrolux OEM",
      rating: 4.9,
      reviewsCount: 6,
      views: 541,
      inStock: true,
      tags: ["layflat", "плосък маркуч", "помпа", "поливане", "земеделие"],
      description: `Ултра-лек и здрав плосък маркуч тип Layflat, изработен от висококачествен PVC материал и полиестерна текстилна мрежа. Лесен за съхранение, перфектен за изпомпване на вода под средно налягане, отводняване и напояване в земеделието.`,
      specs: [
        { key: "Тип", value: "Плосък маркуч (Layflat)" },
        { key: "Материал", value: "Мек PVC с полиестерна армировка" },
        { key: "Цвят", value: "Син" },
        { key: "Работна температура", value: "-10°C до +60°C" }
      ],
      images: [
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop"
      ],
      variants: [
        { code: "FLAT-DN50", innerDb: 51, inch: "2\"", outerDb: 53.5, pressure: 8, bend: 0, weight: 0.28, rollLength: 100, priceEur: 2.10 },
        { code: "FLAT-DN75", innerDb: 76, inch: "3\"", outerDb: 78.8, pressure: 7, bend: 0, weight: 0.49, rollLength: 100, priceEur: 3.20 },
        { code: "FLAT-DN100", innerDb: 102, inch: "4\"", outerDb: 105.0, pressure: 6, bend: 0, weight: 0.72, rollLength: 50, priceEur: 4.50 }
      ]
    },
    {
      id: "fuel-oil-carbopress",
      code: "TO-CARBO",
      name: "Маркуч за масло и горива Semperit - TOF 319",
      category: "fuel-oil-hoses",
      subcategory: "",
      brand: "Semperit",
      rating: 5.0,
      reviewsCount: 14,
      views: 1290,
      inStock: true,
      tags: ["горива", "масла", "бензин", "дизел", "semperit"],
      description: `Специализиран гумен маркуч за безоловен бензин, дизелово гориво, мазут и технически масла. Отличава се с високоякостен вътрешен слой, напълно устойчив на аромати и химически примеси в съвременните горива. Предназначен за индустриални инсталации и цистерни.`,
      specs: [
        { key: "Стандарт", value: "EN ISO 1307" },
        { key: "Материал на вложката", value: "NBR гума, изключително маслоустойчива" },
        { key: "Подсилване", value: "Текстилни нишки, медна жица за антистатичност" },
        { key: "Работна температура", value: "-30°C до +80°C" }
      ],
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop"
      ],
      variants: [
        { code: "TOF319-06", innerDb: 6, inch: "1/4\"", outerDb: 13, pressure: 20, bend: 40, weight: 0.15, rollLength: 50, priceEur: 2.20 },
        { code: "TOF319-08", innerDb: 8, inch: "5/16\"", outerDb: 15, pressure: 20, bend: 50, weight: 0.18, rollLength: 50, priceEur: 2.50 },
        { code: "TOF319-10", innerDb: 10, inch: "3/8\"", outerDb: 17, pressure: 20, bend: 60, weight: 0.21, rollLength: 50, priceEur: 2.90 },
        { code: "TOF319-13", innerDb: 13, inch: "1/2\"", outerDb: 21, pressure: 20, bend: 80, weight: 0.32, rollLength: 50, priceEur: 3.80 },
        { code: "TOF319-19", innerDb: 19, inch: "3/4\"", outerDb: 29, pressure: 20, bend: 120, weight: 0.54, rollLength: 50, priceEur: 5.40 }
      ]
    },
    {
      id: "silicone-elbow-90",
      code: "SIL-90",
      name: "Силиконово съединение под 90° - Premium Grade",
      category: "silicone-hoses",
      subcategory: "silicone-elbows",
      brand: "Hydrolux High-Spec",
      rating: 4.8,
      reviewsCount: 11,
      views: 749,
      inStock: true,
      tags: ["силикон", "коляно 90", "турбо", "охлаждане", "тунинг", "силиконово съединение"],
      description: `Армирано силиконово колена на 90 градуса, произведено от 4 слоен висококачествен полиестерно подсилен силикон. Проектирано за високи температури и натоварвания в турбо компресори и охладителни системи. Изключителна устойчивост на разширение.`,
      specs: [
        { key: "Материал", value: "Силикон с 4 текстилни армировки" },
        { key: "Дължина на рамото", value: "102 мм (10.2 см)" },
        { key: "Работна температура", value: "-50°C до +180°C" },
        { key: "Дебелина на стената", value: "5.0 мм" }
      ],
      images: [
        "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=600&auto=format&fit=crop"
      ],
      variants: [
        { code: "SIL90-DN38", innerDb: 38, inch: "1 1/2\"", outerDb: 48, pressure: 5, bend: 90, weight: 0.22, rollLength: 1, priceEur: 8.50 },
        { code: "SIL90-DN51", innerDb: 51, inch: "2\"", outerDb: 61, pressure: 4.5, bend: 90, weight: 0.31, rollLength: 1, priceEur: 11.20 },
        { code: "SIL90-DN63", innerDb: 63, inch: "2 1/2\"", outerDb: 73, pressure: 4.0, bend: 90, weight: 0.42, rollLength: 1, priceEur: 14.80 },
        { code: "SIL90-DN76", innerDb: 76, inch: "3\"", outerDb: 86, pressure: 3.5, bend: 90, weight: 0.53, rollLength: 1, priceEur: 17.50 }
      ]
    },
    {
      id: "food-milk-foodflex",
      code: "FOOD-FLEX",
      name: "Хранителен гумен маркуч за мляко и вино - Foodflex",
      category: "food-hoses",
      subcategory: "food-rubber",
      brand: "Semperit",
      rating: 4.9,
      reviewsCount: 5,
      views: 482,
      inStock: true,
      tags: ["хранителен маркуч", "мляко", "вино", "бира", "храни", "semperit"],
      description: `Премиум маркуч за течни хранителни продукти - специално сертифициран за мляко, млечни продукти, бира, вино, гроздов сок и алкохолни напитки с концентрация до 96%. Не влияе на вкусовите и ароматни качества на флуидите. Напълно отговаря на FDA стандартите.`,
      specs: [
        { key: "Слой", value: "Бял бутилов каучук (FDA сертифициран)" },
        { key: "Покритие", value: "Син каучук, устойчив на триене и стареене" },
        { key: "Дезинфекция", value: "С пара до +120°C (максимум 20 мин)" },
        { key: "Работна температура", value: "-35°C до +95°C" }
      ],
      images: [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop"
      ],
      variants: [
        { code: "FOOD-DN25", innerDb: 25, inch: "1\"", outerDb: 37, pressure: 10, bend: 150, weight: 0.76, rollLength: 40, priceEur: 9.80 },
        { code: "FOOD-DN32", innerDb: 32, inch: "1 1/4\"", outerDb: 44, pressure: 10, bend: 190, weight: 0.94, rollLength: 40, priceEur: 12.40 },
        { code: "FOOD-DN38", innerDb: 38, inch: "1 1/2\"", outerDb: 51, pressure: 10, bend: 220, weight: 1.15, rollLength: 40, priceEur: 14.90 }
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
      tags: ["полиуретан", "шлаух", "пневматика", "бързи връзки"],
      description: `Гъвкав полиуретанов шлаух от най-висок клас, изработен от чист термопластичен полиуретан (TPU). Изключително подходящ за цангови връзки и автоматизирани пневматични системи.`,
      specs: [
        { key: "Материал", value: "100% TPU" },
        { key: "Твърдост", value: "98 Shore A" },
        { key: "Работна температура", value: "-20°C до +60°C" }
      ],
      images: [
        "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=600&auto=format&fit=crop"
      ],
      variants: [
        { code: "PU0425-BL", innerDb: 2.5, inch: "1/10\"", outerDb: 4, pressure: 10, bend: 15, weight: 0.012, rollLength: 100, priceEur: 0.35 },
        { code: "PU0640-BL", innerDb: 4.0, inch: "5/32\"", outerDb: 6, pressure: 10, bend: 25, weight: 0.023, rollLength: 100, priceEur: 0.55 },
        { code: "PU0855-BL", innerDb: 5.5, inch: "7/32\"", outerDb: 8, pressure: 10, bend: 35, weight: 0.039, rollLength: 100, priceEur: 0.75 },
        { code: "PU1075-BL", innerDb: 7.5, inch: "1/4\"", outerDb: 10, pressure: 10, bend: 50, weight: 0.055, rollLength: 100, priceEur: 1.15 }
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
      tags: ["2SN", "запресоване", "хидравлика", "багер"],
      description: `Професионален хидравличен маркуч с двойна стоманена оплетка (2SN) съгласно стандарт EN 853. Проектиран за пренос на хидравлични масла.`,
      specs: [
        { key: "Стандарт", value: "EN 853 2SN" },
        { key: "Материал", value: "Маслоустойчива NBR гума" },
        { key: "Подсилване", value: "Две оплетки от стоманена тел" }
      ],
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop"
      ],
      variants: [
        { code: "2SN06", innerDb: 6.3, inch: "1/4\"", outerDb: 15.0, pressure: 400, bend: 100, weight: 0.38, rollLength: 50, priceEur: 2.80 },
        { code: "2SN10", innerDb: 9.5, inch: "3/8\"", outerDb: 19.0, pressure: 330, bend: 130, weight: 0.51, rollLength: 50, priceEur: 3.40 },
        { code: "2SN13", innerDb: 12.7, inch: "1/2\"", outerDb: 22.2, pressure: 275, bend: 180, weight: 0.61, rollLength: 50, priceEur: 4.10 },
        { code: "2SN25", innerDb: 25.4, inch: "1\"", outerDb: 38.1, pressure: 165, bend: 300, weight: 1.35, rollLength: 40, priceEur: 8.20 }
      ]
    },
    {
      id: "acc-spiral-guard",
      code: "SPIRAL-G",
      name: "Пластмасова предпазна спирала за маркучи - Spiral Guard",
      category: "hose-accessories",
      subcategory: "acc-guards",
      brand: "Hydrolux OEM",
      rating: 4.8,
      reviewsCount: 7,
      views: 312,
      inStock: true,
      tags: ["спирала", "предпазител", "аксесоари", "защита маркуч"],
      description: `Високоякостна спирала от полиетилен с висока плътност (HDPE). Предпазва хидравличните маркучи от триене, усукване, силни удари и UV слънчево лъчение. Увеличава експлоатационния живот на маркучите до 3 пъти.`,
      specs: [
        { key: "Материал", value: "HDPE (Полиетилен с висока плътност)" },
        { key: "Устойчивост", value: "UV, киселини, основи, масла" },
        { key: "Работна температура", value: "-40°C до +90°C" }
      ],
      images: [
        "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?q=80&w=600&auto=format&fit=crop"
      ],
      variants: [
        { code: "SP-16G", innerDb: 13.0, inch: "ø 16мм", outerDb: 16.0, pressure: 0, bend: 0, weight: 0.05, rollLength: 20, priceEur: 0.85 },
        { code: "SP-20G", innerDb: 16.0, inch: "ø 20мм", outerDb: 20.6, pressure: 0, bend: 0, weight: 0.08, rollLength: 20, priceEur: 1.15 },
        { code: "SP-25G", innerDb: 20.0, inch: "ø 25мм", outerDb: 26.0, pressure: 0, bend: 0, weight: 0.12, rollLength: 25, priceEur: 1.50 },
        { code: "SP-32G", innerDb: 27.0, inch: "ø 32мм", outerDb: 32.8, pressure: 0, bend: 0, weight: 0.19, rollLength: 25, priceEur: 1.95 }
      ]
    }
  ]
};

// Helper function to format prices (EUR strictly)
function formatPrice(eur) {
  return {
    eur: eur.toFixed(2) + " €",
    bgn: "", 
    eurRaw: eur,
    bgnRaw: eur
  };
}
