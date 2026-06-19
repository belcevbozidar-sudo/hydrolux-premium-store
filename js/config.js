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
    "id": "73",
    "name": "Пневматични и съединители фитинги",
    "icon": "⚙️",
    "image": "assets/cat_73.jpg",
    "subcategories": [
      {
        "id": "96",
        "name": "Цангови връзки",
        "icon": "📁",
        "image": "",
        "subcategories": [
          {
            "id": "97",
            "name": "Инчови цангови връзки",
            "icon": "📁",
            "image": ""
          },
          {
            "id": "98",
            "name": "Метрични цангови връзки",
            "icon": "📁",
            "image": ""
          }
        ]
      },
      {
        "id": "99",
        "name": "Бързи връзки",
        "icon": "📁",
        "image": "",
        "subcategories": [
          {
            "id": "100",
            "name": "Високо дебитни",
            "icon": "📁",
            "image": ""
          },
          {
            "id": "101",
            "name": "Стандартен дебит",
            "icon": "📁",
            "image": ""
          },
          {
            "id": "102",
            "name": "Мини",
            "icon": "📁",
            "image": ""
          }
        ]
      },
      {
        "id": "103",
        "name": "Резбови Връзки",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "104",
        "name": "Връзки с врязващ пръстен",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "105",
        "name": "Сферични кранове",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "106",
        "name": "Възвратни клапани",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "107",
        "name": "Връзки със затягаща гайка",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "108",
        "name": "Инструменти за пневматика",
        "icon": "⚙️",
        "image": ""
      },
      {
        "id": "175",
        "name": "PVC снадки за шлаух",
        "icon": "🌀",
        "image": ""
      }
    ]
  },
  {
    "id": "71",
    "name": "Пневматични шлаухи",
    "icon": "🌀",
    "image": "assets/cat_pneumatic_tubes.webp",
    "subcategories": [
      {
        "id": "90",
        "name": "Полиамидни шлаухи PA 12",
        "icon": "🌀",
        "image": ""
      },
      {
        "id": "91",
        "name": "Полиамидни шлаухи - NYLON",
        "icon": "🌀",
        "image": ""
      },
      {
        "id": "92",
        "name": "Полиамидни шлаухи - Спирали",
        "icon": "🌀",
        "image": ""
      },
      {
        "id": "93",
        "name": "Полиетиленови шлаухи",
        "icon": "🌀",
        "image": ""
      },
      {
        "id": "94",
        "name": "Полиуретанови шлаухи",
        "icon": "🌀",
        "image": ""
      },
      {
        "id": "95",
        "name": "Тефлонови шлаухи",
        "icon": "🌀",
        "image": ""
      }
    ]
  },
  {
    "id": "61",
    "name": "Маркучи за гориво и масло",
    "icon": "🛢️",
    "image": "assets/cat_fuel_oil_hoses.webp"
  },
  {
    "id": "60",
    "name": "Маркучи за въздух",
    "icon": "💨",
    "image": "assets/cat_air_hoses.webp",
    "subcategories": [
      {
        "id": "75",
        "name": "Гумени маркучи за въздух",
        "icon": "💨",
        "image": ""
      },
      {
        "id": "76",
        "name": "PVC маркучи за въздух",
        "icon": "💨",
        "image": ""
      },
      {
        "id": "77",
        "name": "Полиуретанови маркучи за въздух",
        "icon": "💨",
        "image": ""
      }
    ]
  },
  {
    "id": "74",
    "name": "Индустриални накрайници",
    "icon": "🔩",
    "image": "assets/cat_74.jpg",
    "subcategories": [
      {
        "id": "109",
        "name": "IBC накрайници за бидони",
        "icon": "🔩",
        "image": "",
        "subcategories": [
          {
            "id": "110",
            "name": "Накрайници IBC",
            "icon": "🔩",
            "image": ""
          },
          {
            "id": "111",
            "name": "Кранове за бидони IBC",
            "icon": "📁",
            "image": ""
          },
          {
            "id": "112",
            "name": "Капачки и чучури за IBC бидони",
            "icon": "📁",
            "image": ""
          }
        ]
      },
      {
        "id": "113",
        "name": "Накрайници CAMLOCK",
        "icon": "🔩",
        "image": "",
        "subcategories": [
          {
            "id": "181",
            "name": "Алуминий",
            "icon": "📁",
            "image": ""
          },
          {
            "id": "182",
            "name": "Месинг",
            "icon": "📁",
            "image": ""
          },
          {
            "id": "183",
            "name": "Неръждаема стомана",
            "icon": "📁",
            "image": ""
          },
          {
            "id": "184",
            "name": "Полипропилен",
            "icon": "📁",
            "image": ""
          }
        ]
      },
      {
        "id": "114",
        "name": "Накрайници Storz",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "115",
        "name": "Накрайници FERRARI",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "116",
        "name": "Накрайници GEKA",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "117",
        "name": "Накрайници SANDBLAST - MORTAR",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "118",
        "name": "Накрайници Guillemin",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "119",
        "name": "Накрайници Cardan Perrot",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "120",
        "name": "Накрайници TODO",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "176",
        "name": "Резбови накрайници",
        "icon": "🔩",
        "image": "",
        "subcategories": [
          {
            "id": "177",
            "name": "Резбови накраници - Алуминий",
            "icon": "📁",
            "image": ""
          },
          {
            "id": "178",
            "name": "Резбови накрайници - месинг",
            "icon": "🔩",
            "image": ""
          },
          {
            "id": "179",
            "name": "Резбови накрайници - неръждаеми",
            "icon": "🔩",
            "image": ""
          },
          {
            "id": "180",
            "name": "Резбови фитинги - полипропилен",
            "icon": "📁",
            "image": ""
          }
        ]
      },
      {
        "id": "122",
        "name": "Бързосменници за въздух, компресори",
        "icon": "💨",
        "image": ""
      },
      {
        "id": "123",
        "name": "Накрайници за храни и фармация",
        "icon": "🍎",
        "image": ""
      },
      {
        "id": "124",
        "name": "Накрайници за бензиноколонки",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "125",
        "name": "Накрайници Фланци",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "126",
        "name": "Накрайници за къртачи",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "127",
        "name": "Накрайници BAUER",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "128",
        "name": "Чаши за каучукови маркучи",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "129",
        "name": "Възвратни клапани",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "130",
        "name": "Накрайници за заварка",
        "icon": "🔩",
        "image": ""
      },
      {
        "id": "131",
        "name": "Спирателни кранове",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "132",
        "name": "Пистолети за измиване",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "153",
        "name": "Накрайници TW",
        "icon": "🔩",
        "image": ""
      }
    ]
  },
  {
    "id": "62",
    "name": "Маркучи за охлаждаща течност",
    "icon": "❄️",
    "image": "assets/cat_coolant_hoses.webp",
    "subcategories": [
      {
        "id": "82",
        "name": "Силиконови маркучи за охлаждаща течност",
        "icon": "❄️",
        "image": ""
      },
      {
        "id": "83",
        "name": "Гумени маркучи за охлаждаща течност",
        "icon": "❄️",
        "image": ""
      }
    ]
  },
  {
    "id": "63",
    "name": "Силиконови маркучи и Съединения",
    "icon": "🧪",
    "image": "assets/cat_silicone_hoses.webp",
    "subcategories": [
      {
        "id": "84",
        "name": "Силиконови маркучи",
        "icon": "🧪",
        "image": ""
      },
      {
        "id": "85",
        "name": "Силиконови съединения",
        "icon": "🧪",
        "image": ""
      }
    ]
  },
  {
    "id": "64",
    "name": "PVC Маркучи",
    "icon": "📏",
    "image": "assets/cat_pvc_hoses.webp",
    "subcategories": [
      {
        "id": "155",
        "name": "Маркучи за въздух",
        "icon": "💨",
        "image": ""
      },
      {
        "id": "156",
        "name": "Маркучи за гориво и масло",
        "icon": "🛢️",
        "image": ""
      },
      {
        "id": "157",
        "name": "Маркучи за храна",
        "icon": "🍎",
        "image": ""
      },
      {
        "id": "158",
        "name": "PVC маркучи за абразия",
        "icon": "📏",
        "image": ""
      },
      {
        "id": "159",
        "name": "Маркучи за вода",
        "icon": "💧",
        "image": ""
      },
      {
        "id": "160",
        "name": "Маркучи за пестициди",
        "icon": "📁",
        "image": ""
      }
    ]
  },
  {
    "id": "70",
    "name": "Полиуретанови маркучи",
    "icon": "🌀",
    "image": "assets/cat_polyurethane_hoses.webp",
    "subcategories": [
      {
        "id": "86",
        "name": "Съединения за полиуретанови маркучи",
        "icon": "🌀",
        "image": ""
      }
    ]
  },
  {
    "id": "69",
    "name": "Аксесоари за маркучи",
    "icon": "🎒",
    "image": "assets/cat_hose_accessories.webp",
    "subcategories": [
      {
        "id": "142",
        "name": "Свръзки за маркучи",
        "icon": "📁",
        "image": "",
        "subcategories": [
          {
            "id": "144",
            "name": "POM снадки за маркучи",
            "icon": "📁",
            "image": ""
          },
          {
            "id": "145",
            "name": "Месингови снадки за маркучи",
            "icon": "📁",
            "image": ""
          }
        ]
      },
      {
        "id": "146",
        "name": "Предпазни ръкави и спирали",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "147",
        "name": "Инструменти за маркучи",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "174",
        "name": "Помпи и клапани",
        "icon": "📁",
        "image": ""
      }
    ]
  },
  {
    "id": "68",
    "name": "Маркучи за храни",
    "icon": "🍎",
    "image": "assets/cat_food_hoses.webp",
    "subcategories": [
      {
        "id": "87",
        "name": "PVC маркучи за храни",
        "icon": "📏",
        "image": ""
      },
      {
        "id": "88",
        "name": "Силиконови маркучи за храни",
        "icon": "🧪",
        "image": ""
      },
      {
        "id": "89",
        "name": "Гумени маркучи за храни",
        "icon": "🍎",
        "image": ""
      }
    ]
  },
  {
    "id": "67",
    "name": "Машини за Кербоване",
    "icon": "📁",
    "image": "assets/cat_67.jpg",
    "subcategories": [
      {
        "id": "148",
        "name": "Преси за маркучи",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "149",
        "name": "Отрезни машини",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "150",
        "name": "Забелващи машини",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "151",
        "name": "Аксесоари за машини за кербоване",
        "icon": "🎒",
        "image": ""
      },
      {
        "id": "152",
        "name": "Машини за монтиране на врязващи пръстени",
        "icon": "📁",
        "image": ""
      }
    ]
  },
  {
    "id": "66",
    "name": "Маркучи за технически газове",
    "icon": "🔥",
    "image": "assets/cat_gas_hoses.webp"
  },
  {
    "id": "65",
    "name": "Хидравлични накрайници",
    "icon": "🔩",
    "image": "assets/cat_hydraulic_fittings.webp",
    "subcategories": [
      {
        "id": "133",
        "name": "BSP 60°",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "134",
        "name": "DIN 24°",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "135",
        "name": "Hyper Spiral",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "136",
        "name": "Interlock",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "137",
        "name": "JIC 37°",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "138",
        "name": "ORFS",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "139",
        "name": "Универсален конус",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "140",
        "name": "Фланцови",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "141",
        "name": "Чаши",
        "icon": "📁",
        "image": ""
      }
    ]
  },
  {
    "id": "59",
    "name": "Маркучи за вода",
    "icon": "💧",
    "image": "assets/cat_water_hoses.webp",
    "subcategories": [
      {
        "id": "78",
        "name": "Гумени маркучи за вода",
        "icon": "💧",
        "image": ""
      },
      {
        "id": "79",
        "name": "Плоски маркучи",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "80",
        "name": "PVC маркучи за вода",
        "icon": "💧",
        "image": ""
      },
      {
        "id": "81",
        "name": "Маркучи за каналопочистване",
        "icon": "📁",
        "image": ""
      }
    ]
  },
  {
    "id": "154",
    "name": "Продукти",
    "icon": "📁",
    "image": "assets/cat_154.jpg"
  },
  {
    "id": "168",
    "name": "Маркучи за високо налягане",
    "icon": "⚡",
    "image": "assets/cat_168.jpg",
    "subcategories": [
      {
        "id": "173",
        "name": "Паро-Водоструйки",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "172",
        "name": "Тефлонови маркучи",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "171",
        "name": "Маркучи за каналопочистване",
        "icon": "📁",
        "image": ""
      },
      {
        "id": "170",
        "name": "Хидравлични маркучи",
        "icon": "⚡",
        "image": ""
      },
      {
        "id": "169",
        "name": "Термопластични маркучи",
        "icon": "📁",
        "image": ""
      }
    ]
  }
],

  products: [],
  featuredProducts: [
    {
      "id": "prod-134",
      "code": "SEMPERPAC 2SN-K",
      "name": "Хидравличен маркуч за високо налягане SEMPERPAC 2SN-K",
      "brand": "Semperit",
      "unit": "м",
      "images": [
        "https://hydrolux.bg/image/catalog/%20%D0%BD%D0%B0%D0%BB%D1%8F%D0%B3%D0%B0%D0%BD%D0%B5/hidravlichen-markuch-visoko-nalyagane-SEMPERIT-2sn-k-1200x1200.jpg"
      ],
      "homeSpecs": [
        { "key": "Марка", "value": "Semperit" }
      ],
      "variants": [
        { "priceEur": 18.4 }
      ]
    },
    {
      "id": "prod-168",
      "code": "Spiral poliamid RILSAN PA 11 PHL",
      "name": "Спирален шлаух полиамид RILSAN PA 11 PHL",
      "brand": "Хидролукс",
      "unit": "м",
      "images": [
        "https://hydrolux.bg/image/catalog/shlauhi/spiralni-shlauhi-1200x1200.png"
      ],
      "homeSpecs": [
        { "key": "Марка", "value": "Хидролукс" }
      ],
      "variants": [
        { "priceEur": 0 }
      ]
    },
    {
      "id": "prod-185",
      "code": "Комплект маслоустойчиви о-пръстени BSP",
      "name": "Комплект маслоустойчиви о-пръстени BSP",
      "brand": "Balflex",
      "unit": "м",
      "images": [
        "https://hydrolux.bg/image/catalog/aksesoari/komplekt-masloustoichivi-o-prysteni-bsp1-1200x1200.png"
      ],
      "homeSpecs": [
        { "key": "Марка", "value": "Balflex" }
      ],
      "variants": [
        { "priceEur": 36 }
      ]
    },
    {
      "id": "prod-203",
      "code": "PHC",
      "name": "Бърза връзка мъжка месинг с извод за маркуч",
      "brand": "CMATIC",
      "unit": "м",
      "images": [
        "https://hydrolux.bg/image/catalog/pnevmatika/nipel-mesing-s-izvod-za-markuch-1200x1200.jpg"
      ],
      "homeSpecs": [
        { "key": "Марка", "value": "CMATIC" }
      ],
      "variants": [
        { "priceEur": 2.2 }
      ]
    }
  ],

  builderOptions: {
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
  }
};

// Helper function to format prices (EUR + BGN Dual Currency)
function formatPrice(price, isPerMeter = false) {
  price = parseFloat(price) || 0;
  if (price <= 0) {
    return {
      eur: "По запитване",
      bgn: "По запитване",
      eurRaw: 0,
      bgnRaw: 0
    };
  }
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

function filterOldItems(items) {
  if (!Array.isArray(items)) return [];
  return items.filter(item => {
    if (!item || !item.id) return false;
    const s = String(item.id);
    const isOld = !/^\d+$/.test(s) && !s.startsWith("custom-") && !s.startsWith("prod-");
    return !isOld;
  });
}

// Clear localStorage products/categories if they contain old unsplash urls, png image extensions, or old category IDs
const hasOldUnsplashOrPng = localStorage.getItem("hydrolux_products") && 
    (localStorage.getItem("hydrolux_products").includes("unsplash.com") || localStorage.getItem("hydrolux_products").includes(".png"));
const hasOldCategoryIds = localStorage.getItem("hydrolux_categories") && 
    (localStorage.getItem("hydrolux_categories").includes("air-hoses") || localStorage.getItem("hydrolux_categories").includes("water-hoses"));

if (hasOldUnsplashOrPng || hasOldCategoryIds) {
  localStorage.removeItem("hydrolux_products");
  localStorage.removeItem("hydrolux_categories");
  localStorage.removeItem("hydrolux_builder_options");
}

// Load dynamic state if present in localStorage to support admin dashboard updates in real-time
let staticProducts = [];
const staticCategories = [...CONFIG.categories];

if (localStorage.getItem("hydrolux_products")) {
  try {
    const local = JSON.parse(localStorage.getItem("hydrolux_products"));
    CONFIG.products = mergeById(filterOldItems(local), staticProducts);
  } catch (e) {
    console.error("Error parsing products from localStorage", e);
  }
} else {
  saveLocalState();
}

if (localStorage.getItem("hydrolux_categories")) {
  try {
    const local = JSON.parse(localStorage.getItem("hydrolux_categories"));
    CONFIG.categories = mergeById(filterOldItems(local), staticCategories);
  } catch (e) {
    console.error("Error parsing categories from localStorage", e);
  }
} else {
  saveLocalState();
}

// Load dynamic builderOptions if present
if (localStorage.getItem("hydrolux_builder_options")) {
  try {
    const parsed = JSON.parse(localStorage.getItem("hydrolux_builder_options"));
    if (parsed && 
        Array.isArray(parsed.hoseTypes) && parsed.hoseTypes.length > 0 &&
        Array.isArray(parsed.sizes) && parsed.sizes.length > 0 &&
        Array.isArray(parsed.fittings) && parsed.fittings.length > 0 &&
        Array.isArray(parsed.sleeves) && parsed.sleeves.length > 0) {
      CONFIG.builderOptions = parsed;
      // Migrate fittings to have 'prices' and 'angle' if missing
      if (CONFIG.builderOptions.fittings) {
      let migrated = false;
      CONFIG.builderOptions.fittings.forEach(f => {
        if (!f.category) {
          if (f.id === "none") f.category = "Без накрайник";
          else if (f.id.includes("dkol")) f.category = "DKOL Метрични";
          else if (f.id.includes("bsp")) f.category = "BSP Инчови";
          else if (f.id.includes("jic")) f.category = "JIC Инчови";
          else f.category = "Други";
          migrated = true;
        }
        if (!f.prices) {
          f.prices = {};
          const activeSizes = CONFIG.builderOptions.sizes || [
            { id: "1/4" }, { id: "3/8" }, { id: "1/2" }, { id: "3/4" }, { id: "1" }
          ];
          const basePrice = f.priceEur !== undefined ? f.priceEur : 0.0;
          activeSizes.forEach(s => {
            f.prices[s.id] = basePrice;
          });
          delete f.priceEur;
          migrated = true;
        }
        if (!f.angle) {
          if (f.id.includes("straight")) f.angle = "straight";
          else if (f.id.includes("90")) f.angle = "90";
          else if (f.id.includes("45")) f.angle = "45";
          else if (f.id === "none") f.angle = "none";
          else f.angle = "straight";
          migrated = true;
        }
      });
      if (migrated) {
        saveLocalState();
      }
    }
  } else {
    localStorage.removeItem("hydrolux_builder_options");
  }
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
  };
  saveLocalState();
}

let catalogLoadPromise = null;

CONFIG.loadCatalog = function() {
  if (catalogLoadPromise) return catalogLoadPromise;

  const configScript = document.querySelector('script[src*="config.js"]');
  const catalogUrl = configScript ? configScript.src.replace("config.js", "products_catalog.json") : "js/products_catalog.json";

  catalogLoadPromise = fetch(catalogUrl)
    .then(res => res.json())
    .then(catalogResponse => {
      staticProducts = catalogResponse;
      const localProducts = JSON.parse(localStorage.getItem("hydrolux_products") || "[]");
      CONFIG.products = mergeById(filterOldItems(localProducts), staticProducts);
      saveLocalState();
      
      if (typeof App !== "undefined" && typeof App.renderAllUI === "function") {
        App.renderAllUI();
      }
      return catalogResponse;
    })
    .catch(err => {
      console.warn("Failed to fetch static products catalog", err);
      return [];
    });

  return catalogLoadPromise;
};

CONFIG.ready = (async () => {
  if (typeof HydroluxBackend === "undefined") {
    setTimeout(() => CONFIG.loadCatalog(), 2000);
    return;
  }

  // The home/landing page renders entirely from the built-in seed catalog
  // (categories + featured), so the heavy server revalidation — downloading the
  // compressed product state and decompressing/parsing ~1.9 MB of JSON — does
  // not need to run during the initial paint. Holding it until the page has
  // loaded and the main thread is idle keeps it from slowing down LCP.
  await new Promise(resolve => {
    const runWhenIdle = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(resolve, { timeout: 2000 });
      } else {
        setTimeout(resolve, 800);
      }
    };
    if (document.readyState === "complete") {
      runWhenIdle();
    } else {
      window.addEventListener("load", runWhenIdle, { once: true });
    }
  });

  try {
    const localProducts = JSON.parse(localStorage.getItem("hydrolux_products") || "[]");
    const localCategories = JSON.parse(localStorage.getItem("hydrolux_categories") || "[]");
    const localTemplates = JSON.parse(localStorage.getItem("hydrolux_table_templates") || "[]");

    const state = await HydroluxBackend.getState().catch(err => {
      console.warn("Convex getState failed", err);
      return {};
    });

    const hasRemoteProducts = Array.isArray(state.products) && state.products.length > 0;
    const hasRemoteCategories = Array.isArray(state.categories) && state.categories.length > 0;
    const hasRemoteTemplates = Array.isArray(state.tableTemplates);
    const hasRemoteBuilderOptions = state.builderOptions !== null && state.builderOptions !== undefined;
    let shouldSyncMergedState = false;

    if (hasRemoteCategories) {
      const cleanRemoteCategories = filterOldItems(state.categories);
      const cleanLocalCategories = filterOldItems(localCategories);
      const mergedCategories = mergeById(mergeById(cleanRemoteCategories, cleanLocalCategories), staticCategories);
      shouldSyncMergedState = mergedCategories.length !== state.categories.length || 
                              JSON.stringify(mergedCategories) !== JSON.stringify(state.categories);
      CONFIG.categories = mergedCategories;
    }
    if (hasRemoteTemplates) {
      const tableTemplates = mergeById(state.tableTemplates, localTemplates);
      localStorage.setItem("hydrolux_table_templates", JSON.stringify(tableTemplates));
      shouldSyncMergedState = shouldSyncMergedState || tableTemplates.length !== state.tableTemplates.length;
    }
    if (hasRemoteBuilderOptions && state.builderOptions && state.builderOptions.hoseTypes && state.builderOptions.hoseTypes.length > 0) {
      CONFIG.builderOptions = state.builderOptions;
      localStorage.setItem("hydrolux_builder_options", JSON.stringify(CONFIG.builderOptions));
    }

    let hasLegacyPng = false;
    CONFIG.categories.forEach(c => {
      if (c.image && typeof c.image === "string" && c.image.endsWith(".png")) {
        hasLegacyPng = true;
        c.image = c.image.slice(0, -4) + ".webp";
      }
    });

    if (hasLegacyPng) {
      shouldSyncMergedState = true;
    }

    saveLocalState();

    if (hasRemoteProducts) {
      const cleanRemoteProducts = filterOldItems(state.products);
      const cleanLocalProducts = filterOldItems(localProducts);
      CONFIG.products = mergeById(cleanRemoteProducts, cleanLocalProducts);
    }

    // Trigger deferred load of the full 3.7MB products catalog after 2.5 seconds to optimize initial PageSpeed score
    setTimeout(() => {
      CONFIG.loadCatalog().then(async () => {
        if (shouldSyncMergedState || !hasRemoteProducts || !hasRemoteCategories) {
          try {
            await HydroluxBackend.saveState({
              products: CONFIG.products,
              categories: CONFIG.categories,
              tableTemplates: JSON.parse(localStorage.getItem("hydrolux_table_templates") || "null"),
              builderOptions: CONFIG.builderOptions,
            });
          } catch (syncErr) {
            console.warn("Background sync failed", syncErr);
          }
        }
      });
    }, 2500);

  } catch (err) {
    console.warn("Convex state load failed; using browser fallback", err);
    setTimeout(() => CONFIG.loadCatalog(), 2000);
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













