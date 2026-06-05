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
    { id: "air-hoses", name: "Маркучи за въздух", icon: "💨" },
    { id: "water-hoses", name: "Маркучи за вода", icon: "💧" },
    { id: "fuel-oil-hoses", name: "Маркучи за гориво и масло", icon: "🛢️" },
    { id: "coolant-hoses", name: "Маркучи за охлаждаща течност", icon: "❄️" },
    { id: "silicone-hoses", name: "Силиконови маркучи и съединения", icon: "🧪" },
    { id: "gas-hoses", name: "Маркучи за технически газове", icon: "🔥" },
    { id: "polyurethane-hoses", name: "Полиуретанови маркучи", icon: "🌀" },
    { id: "pvc-hoses", name: "PVC Маркучи", icon: "📏" },
    { id: "food-hoses", name: "Маркучи за храни", icon: "🍎" },
    { id: "pneumatic-tubes", name: "Пневматични шлаухи", icon: "🧵" },
    { id: "pneumatic-fittings", name: "Пневматични и съединители фитинги", icon: "⚙️" },
    { id: "hydraulic-fittings", name: "Хидравлични накрайници", icon: "🔩" },
    { id: "high-pressure-hoses", name: "Маркучи за високо налягане", icon: "⚡" },
    { id: "hose-accessories", name: "Аксесоари за маркучи", icon: "🎒" }
  ],

  products: [
    {
      id: "semperit-plw-20",
      code: "PLW20",
      isSpecial: false,
      name: "Маркуч за въздух и вода SEMPERIT - PLW 20",
      category: "air-hoses",
      brand: "Semperit",
      rating: 5.0,
      reviewsCount: 12,
      views: 2136,
      inStock: true,
      unit: "м",
      homeSpecs: [
        { key: "Материал", value: "Синтетична гума" },
        { key: "Работно налягане", value: "20 bar" },
        { key: "Температура", value: "-25°C до +70°C" }
      ],
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
        "assets/air_hoses.png"
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
      isSpecial: false,
      name: "Плосък маркуч за вода Layflat - Flatline Premium",
      category: "water-hoses",
      brand: "Hydrolux OEM",
      rating: 4.9,
      reviewsCount: 6,
      views: 541,
      inStock: true,
      unit: "м",
      homeSpecs: [
        { key: "Диаметър", value: '2" (DN50)' },
        { key: "Работно налягане", value: "8 bar" },
        { key: "Материал", value: "Син PVC" }
      ],
      tags: ["layflat", "плосък маркуч", "помпа", "поливане", "земеделие"],
      description: `Ултра-лек и здрав плосък маркуч тип Layflat, изработен от висококачествен PVC материал и полиестерна текстилна мрежа. Лесен за съхранение, перфектен за изпомпване на вода под средно налягане, отводняване и напояване в земеделието.`,
      specs: [
        { key: "Тип", value: "Плосък маркуч (Layflat)" },
        { key: "Материал", value: "Мек PVC с полиестерна армировка" },
        { key: "Цвят", value: "Син" },
        { key: "Работна температура", value: "-10°C до +60°C" }
      ],
      images: [
        "assets/product_layflat.png"
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
      isSpecial: false,
      name: "Маркуч за масло и горива Semperit - TOF 319",
      category: "fuel-oil-hoses",
      brand: "Semperit",
      rating: 5.0,
      reviewsCount: 14,
      views: 1290,
      inStock: true,
      unit: "м",
      homeSpecs: [
        { key: "Материал", value: "NBR каучук" },
        { key: "Работно налягане", value: "20 bar" },
        { key: "Стандарт", value: "EN ISO 1307" }
      ],
      tags: ["горива", "масла", "бензин", "дизел", "semperit"],
      description: `Специализиран гумен маркуч за безоловен бензин, дизелово гориво, мазут и технически масла. Отличава се с високоякостен вътрешен слой, напълно устойчив на аромати и химически примеси в съвременните горива. Предназначен за индустриални инсталации и цистерни.`,
      specs: [
        { key: "Стандарт", value: "EN ISO 1307" },
        { key: "Материал на вложката", value: "NBR гума, изключително маслоустойчива" },
        { key: "Подсилване", value: "Текстилни нишки, медна жица за антистатичност" },
        { key: "Работна температура", value: "-30°C до +80°C" }
      ],
      images: [
        "assets/fuel_hoses.png"
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
      isSpecial: false,
      name: "Силиконово съединение под 90° - Premium Grade",
      category: "silicone-hoses",
      brand: "Hydrolux High-Spec",
      rating: 4.8,
      reviewsCount: 11,
      views: 749,
      inStock: true,
      unit: "бр",
      homeSpecs: [
        { key: "Материал", value: "4-слоен силикон" },
        { key: "Рамо дължина", value: "102 мм" },
        { key: "Температура", value: "-50°C до +180°C" }
      ],
      tags: ["силикон", "коляно 90", "турбо", "охлаждане", "тунинг", "силиконово съединение"],
      description: `Армирано силиконово колена на 90 градуса, произведено от 4 слоен висококачествен полиестерно подсилен силикон. Проектирано за високи температури и натоварвания в турбо компресори и охладителни системи. Изключителна устойчивост на разширение.`,
      specs: [
        { key: "Материал", value: "Силикон с 4 текстилни армировки" },
        { key: "Дължина на рамото", value: "102 мм (10.2 см)" },
        { key: "Работна температура", value: "-50°C до +180°C" },
        { key: "Дебелина на стената", value: "5.0 мм" }
      ],
      images: [
        "assets/product_silicone_elbow.png"
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
      isSpecial: false,
      name: "Хранителен гумен маркуч за мляко и вино - Foodflex",
      category: "food-hoses",
      brand: "Semperit",
      rating: 4.9,
      reviewsCount: 5,
      views: 482,
      inStock: true,
      unit: "м",
      homeSpecs: [
        { key: "Вложка", value: "FDA Бял бутилов каучук" },
        { key: "Работно налягане", value: "10 bar" },
        { key: "Покритие", value: "Син каучук" }
      ],
      tags: ["хранителен маркуч", "мляко", "вино", "бира", "храни", "semperit"],
      description: `Премиум маркуч за течни хранителни продукти - специално сертифициран за мляко, млечни продукти, бира, вино, гроздов сок и алкохолни напитки с концентрация до 96%. Не влияе на вкусовите и ароматни качества на флуидите. Напълно отговаря на FDA стандартите.`,
      specs: [
        { key: "Слой", value: "Бял бутилов каучук (FDA сертифициран)" },
        { key: "Покритие", value: "Син каучук, устойчив на триене и стареене" },
        { key: "Дезинфекция", value: "С пара до +120°C (максимум 20 мин)" },
        { key: "Работна температура", value: "-35°C до +95°C" }
      ],
      images: [
        "assets/product_food_hose.png"
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
      isSpecial: false,
      name: "Полиуретанов пневматичен шлаух - PU Premium",
      category: "pneumatic-tubes",
      brand: "Hydrolux OEM",
      rating: 4.9,
      reviewsCount: 8,
      views: 942,
      inStock: true,
      unit: "м",
      homeSpecs: [
        { key: "Материал", value: "100% TPU" },
        { key: "Работно налягане", value: "10 bar" },
        { key: "Твърдост", value: "98 Shore A" }
      ],
      tags: ["полиуретан", "шлаух", "пневматика", "бързи връзки"],
      description: `Гъвкав полиуретанов шлаух от най-висок клас, изработен от чист термопластичен полиуретан (TPU). Изключително подходящ за цангови връзки и автоматизирани пневматични системи.`,
      specs: [
        { key: "Материал", value: "100% TPU" },
        { key: "Твърдост", value: "98 Shore A" },
        { key: "Работна температура", value: "-20°C до +60°C" }
      ],
      images: [
        "assets/product_pu_tubing.png"
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
      isSpecial: false,
      name: "Хидравличен маркуч EN 853 2SN DN12",
      category: "high-pressure-hoses",
      brand: "Hydrolux High-Spec",
      rating: 5.0,
      reviewsCount: 16,
      views: 3105,
      inStock: true,
      unit: "м",
      homeSpecs: [
        { key: "DN", value: "12 mm" },
        { key: "Работно налягане", value: "275 bar" },
        { key: "Стандарт", value: "EN 853 2SN" }
      ],
      tags: ["2SN", "запресоване", "хидравлика", "багер"],
      description: `Професионален хидравличен маркуч с двойна стоманена оплетка (2SN) съгласно стандарт EN 853. Проектиран за пренос на хидравлични масла при високо налягане.`,
      specs: [
        { key: "Стандарт", value: "EN 853 2SN" },
        { key: "Материал", value: "Маслоустойчива NBR гума" },
        { key: "Подсилване", value: "Две оплетки от стоманена тел" }
      ],
      images: [
        "assets/product_hydraulic_2sn.png"
      ],
      variants: [
        { code: "2SN06", innerDb: 6.3, inch: "1/4\"", outerDb: 15.0, pressure: 400, bend: 100, weight: 0.38, rollLength: 50, priceEur: 3.80 },
        { code: "2SN10", innerDb: 9.5, inch: "3/8\"", outerDb: 19.0, pressure: 330, bend: 130, weight: 0.51, rollLength: 50, priceEur: 4.90 },
        { code: "2SN12", innerDb: 12.7, inch: "1/2\"", outerDb: 22.2, pressure: 275, bend: 180, weight: 0.61, rollLength: 50, priceEur: 5.80 },
        { code: "2SN25", innerDb: 25.4, inch: "1\"", outerDb: 38.1, pressure: 165, bend: 300, weight: 1.35, rollLength: 40, priceEur: 11.50 }
      ]
    },
    {
      id: "acc-spiral-guard",
      code: "SPIRAL-G",
      isSpecial: false,
      name: "Пластмасова предпазна спирала за маркучи - Spiral Guard",
      category: "hose-accessories",
      brand: "Hydrolux OEM",
      rating: 4.8,
      reviewsCount: 7,
      views: 312,
      inStock: true,
      unit: "м",
      homeSpecs: [
        { key: "Материал", value: "HDPE" },
        { key: "Температура", value: "-40°C до +90°C" },
        { key: "Устойчивост", value: "UV и триене" }
      ],
      tags: ["спирала", "предпазител", "аксесоари", "защита маркуч"],
      description: `Високоякостна спирала от полиетилен с висока плътност (HDPE). Предпазва хидравличните маркучи от триене, усукване, силни удари и UV слънчево лъчение. Увеличава експлоатационния живот на маркучите до 3 пъти.`,
      specs: [
        { key: "Материал", value: "HDPE (Полиетилен с висока плътност)" },
        { key: "Устойчивост", value: "UV, киселини, основи, масла" },
        { key: "Работна температура", value: "-40°C до +90°C" }
      ],
      images: [
        "assets/product_spiral_guard.png"
      ],
      variants: [
        { code: "SP-16G", innerDb: 13.0, inch: "ø 16мм", outerDb: 16.0, pressure: 0, bend: 0, weight: 0.05, rollLength: 20, priceEur: 0.85 },
        { code: "SP-20G", innerDb: 16.0, inch: "ø 20мм", outerDb: 20.6, pressure: 0, bend: 0, weight: 0.08, rollLength: 20, priceEur: 1.15 },
        { code: "SP-25G", innerDb: 20.0, inch: "ø 25мм", outerDb: 26.0, pressure: 0, bend: 0, weight: 0.12, rollLength: 25, priceEur: 1.50 },
        { code: "SP-32G", innerDb: 27.0, inch: "ø 32мм", outerDb: 32.8, pressure: 0, bend: 0, weight: 0.19, rollLength: 25, priceEur: 1.95 }
      ]
    },
    {
      id: "fitting-90-bsp",
      code: "FIT90-BSP",
      isSpecial: false,
      name: "Фитинг 90° BSP външна резба",
      category: "hydraulic-fittings",
      brand: "Hydrolux OEM",
      rating: 5.0,
      reviewsCount: 4,
      views: 189,
      inStock: true,
      unit: "бр",
      homeSpecs: [
        { key: "Размер", value: "1/2\"" },
        { key: "Материал", value: "Стомана" },
        { key: "Стандарт", value: "DIN 2353" }
      ],
      tags: ["фитинг", "накрайник", "хидравлика", "коляно 90", "резба"],
      description: `Хидравличен накрайник коляно 90 градуса с външна резба BSP. Прецизна изработка от висококачествена въглеродна стомана с галванично покритие за максимална защита от корозия.`,
      specs: [
        { key: "Вид фитинг", value: "Коляно 90°" },
        { key: "Тип резба", value: "BSP външна резба" },
        { key: "Материал", value: "Поцинкована стомана" }
      ],
      images: [
        "assets/product_fitting_90.png"
      ],
      variants: [
        { code: "FIT90-BSP-12", innerDb: 12, inch: "1/2\"", outerDb: 0, pressure: 315, bend: 90, weight: 0.08, rollLength: 1, priceEur: 3.45 },
        { code: "FIT90-BSP-34", innerDb: 19, inch: "3/4\"", outerDb: 0, pressure: 250, bend: 90, weight: 0.14, rollLength: 1, priceEur: 4.80 },
        { code: "FIT90-BSP-10", innerDb: 25, inch: "1\"", outerDb: 0, pressure: 200, bend: 90, weight: 0.22, rollLength: 1, priceEur: 6.90 }
      ]
    },
    {
      id: "pu-spiral-hose",
      code: "PU-SPIRAL",
      isSpecial: true,
      specialOfferLabel: "Топ продажба",
      name: "Пневматичен маркуч PU спирала 8x12 mm",
      category: "pneumatic-tubes",
      brand: "Hydrolux OEM",
      rating: 4.9,
      reviewsCount: 15,
      views: 742,
      inStock: true,
      unit: "бр",
      homeSpecs: [
        { key: "Работно налягане", value: "15 bar" },
        { key: "Дължина", value: "10 m" },
        { key: "Температура", value: "-20°C / +60°C" }
      ],
      tags: ["спирален маркуч", "пневматика", "полиуретан", "компресор", "бърза връзка"],
      description: `Спирален полиуретанов маркуч за компресор, окомплектован с бързи връзки на двата края. Изключително гъвкав и устойчив на пречупване и стареене. Идеален за пневматични инструменти.`,
      specs: [
        { key: "Материал", value: "Полиуретан (PU)" },
        { key: "Размер на шлауха", value: "8x12 мм" },
        { key: "Максимално налягане", value: "15 bar" }
      ],
      images: [
        "assets/product_pu_spiral.png"
      ],
      variants: [
        { code: "PU-SPIR-812-10", innerDb: 8, inch: "10м", outerDb: 12, pressure: 15, bend: 0, weight: 0.65, rollLength: 10, priceEur: 18.90 },
        { code: "PU-SPIR-812-15", innerDb: 8, inch: "15м", outerDb: 12, pressure: 15, bend: 0, weight: 0.95, rollLength: 15, priceEur: 24.90 }
      ]
    },
    {
      id: "quick-coupling-isoa",
      code: "ISOA-M",
      isSpecial: false,
      name: "Бърза връзка ISO-A мъжка",
      category: "pneumatic-fittings",
      brand: "Hydrolux OEM",
      rating: 4.8,
      reviewsCount: 9,
      views: 312,
      inStock: true,
      unit: "бр",
      homeSpecs: [
        { key: "Размер", value: "1/2\"" },
        { key: "Работно налягане", value: "350 bar" },
        { key: "Материал", value: "Стомана" }
      ],
      tags: ["бърза връзка", "куплунг", "хидравлика", "мъжка бърза връзка", "ISO-A"],
      description: `Класическа мъжка бърза връзка от тип ISO-A. Широко използвана в селскостопанската техника и индустрията за бързо свързване на хидравлични маркучи.`,
      specs: [
        { key: "Стандарт", value: "ISO 7241-1 A" },
        { key: "Материал", value: "Въглеродна стомана" },
        { key: "Начин на затваряне", value: "Със сачмен клапан" }
      ],
      images: [
        "assets/product_quick_coupling.png"
      ],
      variants: [
        { code: "ISOA-12-M", innerDb: 12, inch: "1/2\"", outerDb: 0, pressure: 350, bend: 0, weight: 0.12, rollLength: 1, priceEur: 12.90 },
        { code: "ISOA-34-M", innerDb: 19, inch: "3/4\"", outerDb: 0, pressure: 300, bend: 0, weight: 0.18, rollLength: 1, priceEur: 18.50 }
      ]
    }
  ]
};

// Helper function to format prices (EUR + BGN Dual Currency)
function formatPrice(price, isPerMeter = false) {
  price = parseFloat(price) || 0;
  const bgnPrice = price * 1.95583;
  const suffixEur = isPerMeter ? " €/м" : " €";
  const suffixBgn = isPerMeter ? " лв./м" : " лв.";
  const formatted = price.toFixed(2) + suffixEur + " (" + bgnPrice.toFixed(2) + suffixBgn + ")";
  return {
    eur: formatted,
    bgn: formatted,
    eurRaw: price,
    bgnRaw: bgnPrice
  };
}function saveLocalState() {
  localStorage.setItem("hydrolux_products", JSON.stringify(CONFIG.products));
  localStorage.setItem("hydrolux_categories", JSON.stringify(CONFIG.categories));
  localStorage.setItem("hydrolux_builder_options", JSON.stringify(CONFIG.builderOptions));
}

function mergeById(remoteItems, localItems) {
  const merged = Array.isArray(remoteItems) ? [...remoteItems] : [];
  const seen = new Set(merged.map(item => item && item.id).filter(Boolean));

  (Array.isArray(localItems) ? localItems : []).forEach(item => {
    if (item && item.id && !seen.has(item.id)) {
      merged.push(item);
      seen.add(item.id);
    }
  });

  return merged;
}

// Clear localStorage products/categories if they contain old unsplash urls to migrate to new local assets
if (localStorage.getItem("hydrolux_products") && localStorage.getItem("hydrolux_products").includes("unsplash.com")) {
  localStorage.removeItem("hydrolux_products");
  localStorage.removeItem("hydrolux_categories");
  localStorage.removeItem("hydrolux_builder_options");
}

// Load dynamic state if present in localStorage to support admin dashboard updates in real-time
if (localStorage.getItem("hydrolux_products")) {
  try {
    CONFIG.products = JSON.parse(localStorage.getItem("hydrolux_products"));
  } catch (e) {
    console.error("Error parsing products from localStorage", e);
  }
} else {
  saveLocalState();
}

if (localStorage.getItem("hydrolux_categories")) {
  try {
    CONFIG.categories = JSON.parse(localStorage.getItem("hydrolux_categories"));
  } catch (e) {
    console.error("Error parsing categories from localStorage", e);
  }
} else {
  saveLocalState();
}

// Load dynamic builderOptions if present
if (localStorage.getItem("hydrolux_builder_options")) {
  try {
    CONFIG.builderOptions = JSON.parse(localStorage.getItem("hydrolux_builder_options"));
  } catch (e) {
    console.error("Error parsing builderOptions from localStorage", e);
  }
} else {
  CONFIG.builderOptions = {
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
  };
  saveLocalState();
}

CONFIG.ready = (async () => {
  if (typeof HydroluxBackend === "undefined") return;

  try {
    const localProducts = JSON.parse(localStorage.getItem("hydrolux_products") || "[]");
    const localCategories = JSON.parse(localStorage.getItem("hydrolux_categories") || "[]");
    const localTemplates = JSON.parse(localStorage.getItem("hydrolux_table_templates") || "[]");
    const state = await HydroluxBackend.getState();
    const hasRemoteProducts = Array.isArray(state.products) && state.products.length > 0;
    const hasRemoteCategories = Array.isArray(state.categories) && state.categories.length > 0;
    const hasRemoteTemplates = Array.isArray(state.tableTemplates);
    const hasRemoteBuilderOptions = state.builderOptions !== null && state.builderOptions !== undefined;
    let shouldSyncMergedState = false;

    if (hasRemoteProducts) {
      CONFIG.products = mergeById(state.products, localProducts);
      shouldSyncMergedState = CONFIG.products.length !== state.products.length;
    }
    if (hasRemoteCategories) {
      CONFIG.categories = mergeById(state.categories, localCategories);
      shouldSyncMergedState = shouldSyncMergedState || CONFIG.categories.length !== state.categories.length;
    }
    if (hasRemoteTemplates) {
      const tableTemplates = mergeById(state.tableTemplates, localTemplates);
      localStorage.setItem("hydrolux_table_templates", JSON.stringify(tableTemplates));
      shouldSyncMergedState = shouldSyncMergedState || tableTemplates.length !== state.tableTemplates.length;
    }
    if (hasRemoteBuilderOptions) {
      CONFIG.builderOptions = state.builderOptions;
      localStorage.setItem("hydrolux_builder_options", JSON.stringify(CONFIG.builderOptions));
    }

    saveLocalState();

    if (!hasRemoteProducts || !hasRemoteCategories || shouldSyncMergedState) {
      await HydroluxBackend.saveState({
        products: CONFIG.products,
        categories: CONFIG.categories,
        tableTemplates: JSON.parse(localStorage.getItem("hydrolux_table_templates") || "null"),
        builderOptions: CONFIG.builderOptions,
      });
    }
  } catch (err) {
    console.warn("Convex state load failed; using browser fallback", err);
  }
})();

// Global API to save state
CONFIG.saveState = function() {
  saveLocalState();
  const values = {
    products: CONFIG.products,
    categories: CONFIG.categories,
    tableTemplates: JSON.parse(localStorage.getItem("hydrolux_table_templates") || "null"),
    builderOptions: CONFIG.builderOptions,
  };

  if (typeof HydroluxBackend === "undefined") {
    return Promise.resolve({ ok: true, localOnly: true });
  }

  return HydroluxBackend.saveState(values);
};

CONFIG.addProduct = function(p) {
  CONFIG.products.push(p);
  CONFIG.saveState();
};

CONFIG.deleteProduct = function(productId) {
  CONFIG.products = CONFIG.products.filter(p => p.id !== productId);
  CONFIG.saveState();
};

CONFIG.addCategory = function(c) {
  CONFIG.categories.push(c);
  CONFIG.saveState();
};

CONFIG.deleteCategory = function(categoryId) {
  CONFIG.categories = CONFIG.categories.filter(c => c.id !== categoryId);
  CONFIG.saveState();
};

CONFIG.resetToDefaults = function() {
  localStorage.removeItem("hydrolux_products");
  localStorage.removeItem("hydrolux_categories");
  localStorage.removeItem("hydrolux_builder_options");
  window.location.reload();
};
