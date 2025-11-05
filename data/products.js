// Единый массив всех товаров с улучшенной структурой данных
const products = [
  // Основные товары - PIR плиты с фольгой PirroGroup
  {
    "id": "pir-foil-30",
    "category": "pirrogroup",
    "image": "/images/pirro1.webp",
    "hoverImage": "/images/pirro2.webp",
    "images": [
      "/images/pirro1.webp",
      "/images/pirro2.webp"
    ],
    "title": "PIR плита для бани ФОЛЬГА 30 мм",
    "description": "Площадь 0,72 м², в упаковке 7 шт. (5,04 м²), для утепления бань и саун.",
    // Цены в числовом формате
    "price": 575,
    "oldPrice": 582,
    "currency": "руб.",
    "unit": "шт.",
    // Технические характеристики
    "thickness": 30, // толщина в мм
    "area": 0.72, // площадь одной плиты в м²
    "material": "foil", // тип покрытия: foil или kraft
    "packQuantity": 7, // количество плит в упаковке
    "packArea": 5.04, // общая площадь упаковки в м²
    // Дополнительные поля
    "isPromo": true,
    "inStock": true,
    "featured": true, // рекомендуемый товар
    "brand": "Pirro Термо",
    "fireResistance": "Г4",
    "tempRange": "от -60 до +110°C",
    "thermalConductivity": "0,022 Вт/(м×К)",
    "application": "Для утепления бань и саун" // область применения
  },
  // {
  //   "id": "pirro-termo-30",
  //   "category": "regular",
  //   "image": "/images/product1.jpg",
  //   "title": "PIR плита для бани ФОЛЬГА 30 мм",
  //   "description": "Площадь 0,72 м², в упаковке 7 шт. (5,04 м²), для утепления бань и саун.",
  //   "price": 503,
  //   "currency": "руб.",
  //   "unit": "шт.",
  //   "thickness": 30,
  //   "area": 0.72,
  //   "material": "foil",
  //   "packQuantity": 7,
  //   "packArea": 5.04,
  //   "inStock": true,
  //   "application": "Для утепления бань и саун"
  // },
  {
    "id": "pirro-termo-40",
    "category": "pirrogroup",
    "image": "/images/pirro1.webp",
    "hoverImage": "/images/pirro2.webp",
    "images": [
      "/images/pirro1.webp",
      "/images/pirro2.webp"
    ],
    "title": "PIR плита для бани ФОЛЬГА 40 мм",
    "description": "Площадь 0,72 м², в упаковке 7 шт. (5,04 м²), для утепления бань и саун.",
    "price": 647,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 40,
    "area": 0.72,
    "material": "foil",
    "packQuantity": 7,
    "packArea": 5.04,
    "inStock": true,
    "featured": true,
    "brand": "Pirro Термо",
    "fireResistance": "Г4",
    "tempRange": "от -60 до +110°C",
    "thermalConductivity": "0,022 Вт/(м×К)",
    "application": "Для утепления бань и саун"
  },
  {
    "id": "pirro-termo-50",
    "category": "pirrogroup",
    "image": "/images/pirro1.webp",
    "hoverImage": "/images/pirro2.webp",
    "images": [
      "/images/pirro1.webp",
      "/images/pirro2.webp"
    ],
    "title": "PIR плита для бани ФОЛЬГА 50 мм",
    "description": "Площадь 0,72 м², в упаковке 6 шт. (4,32 м²), для утепления бань и саун.",
    "price": 770,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 50,
    "area": 0.72,
    "material": "foil",
    "packQuantity": 6,
    "packArea": 4.32,
    "inStock": true,
    "featured": true,
    "brand": "Pirro Термо",
    "fireResistance": "Г4",
    "tempRange": "от -60 до +110°C",
    "thermalConductivity": "0,022 Вт/(м×К)",
    "application": "Для утепления бань и саун"
  },
  // LOGICPIR БАНЯ - PIR плиты Технониколь премиум-класса
  {
    "id": "logicpir-banya-30",
    "category": "technonicol",
    "image": "/images/techno1.webp",
    "hoverImage": "/images/techno2.webp",
    "images": [
      "/images/techno1.webp",
      "/images/techno2.webp",
      "/images/techno3.webp",
      "/images/techno4.webp"
    ],
    "title": "LOGICPIR БАНЯ ФОЛЬГА Г1 Ф/Ф L 30 мм",
    "description": "Площадь 0,7 м² (590×1190 мм), в упаковке 8 шт. (5,62 м²). Премиум термоплита с двусторонней фольгированной обкладкой и L-кромкой для утепления бань и саун.",
    "price": 622,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 30,
    "area": 0.7,
    "material": "foil",
    "packQuantity": 8,
    "packArea": 5.62,
    "inStock": true,
    "featured": true,
    "fireResistance": "Г1",
    "edgeType": "L-кромка",
    "brand": "LOGICPIR",
    "tempRange": "от -65 до +120°C",
    "compression": "120 кПа при 10% деформации",
    "application": "Для утепления бань, саун, кровли, перекрытий, полов, фасадов, стен, балконов и лоджий"
  },
  {
    "id": "logicpir-banya-40",
    "category": "technonicol",
    "image": "/images/techno1.webp",
    "hoverImage": "/images/techno2.webp",
    "images": [
      "/images/techno1.webp",
      "/images/techno2.webp",
      "/images/techno3.webp",
      "/images/techno4.webp"
    ],
    "title": "LOGICPIR БАНЯ ФОЛЬГА Г1 Ф/Ф L 40 мм",
    "description": "Площадь 0,7 м² (590×1190 мм), в упаковке 6 шт. (4,2 м²). Премиум термоплита с двусторонней фольгированной обкладкой и L-кромкой для утепления бань и саун.",
    "price": 692,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 40,
    "area": 0.7,
    "material": "foil",
    "packQuantity": 6,
    "packArea": 4.2,
    "inStock": true,
    "featured": true,
    "fireResistance": "Г1",
    "edgeType": "L-кромка",
    "brand": "LOGICPIR",
    "tempRange": "от -65 до +120°C",
    "compression": "120 кПа при 10% деформации",
    "application": "Для утепления бань, саун, кровли, перекрытий, полов, фасадов, стен, балконов и лоджий"
  },
  {
    "id": "logicpir-banya-50",
    "category": "technonicol",
    "image": "/images/techno1.webp",
    "hoverImage": "/images/techno2.webp",
    "images": [
      "/images/techno1.webp",
      "/images/techno2.webp",
      "/images/techno3.webp",
      "/images/techno4.webp"
    ],
    "title": "LOGICPIR БАНЯ ФОЛЬГА Г1 Ф/Ф L 50 мм",
    "description": "Площадь 0,7 м² (590×1190 мм), в упаковке 5 шт. (3,5 м²). Премиум термоплита с двусторонней фольгированной обкладкой и L-кромкой для утепления бань и саун.",
    "price": 868,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 50,
    "area": 0.7,
    "material": "foil",
    "packQuantity": 5,
    "packArea": 3.5,
    "inStock": true,
    "featured": true,
    "fireResistance": "Г1",
    "edgeType": "L-кромка",
    "brand": "LOGICPIR",
    "tempRange": "от -65 до +120°C",
    "compression": "120 кПа при 10% деформации",
    "application": "Для утепления бань, саун, кровли, перекрытий, полов, фасадов, стен, балконов и лоджий"
  },
  {
    "id": "logicpir-stekloholst-30",
    "category": "technonicol",
    "image": "/images/techno5.webp",
    "hoverImage": "/images/techno6.webp",
    "images": [
      "/images/techno5.webp",
      "/images/techno6.webp",
      "/images/techno7.webp",
      "/images/techno8.webp",
      "/images/techno9.webp"
    ],
    "title": "LOGICPIR СТЕКЛОХОЛСТ СХМ/СХМ L 30 мм",
    "description": "Площадь 0,7 м² (590×1190 мм), в упаковке 8 шт. (5,62 м²). Универсальная термоплита с двусторонним покрытием из стеклохолста и L-кромкой для кровли, перекрытий, полов, фасадов, стен, балконов и лоджий.",
    "price": 833,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 30,
    "area": 0.7,
    "material": "stekloholst",
    "packQuantity": 8,
    "packArea": 5.62,
    "inStock": true,
    "featured": true,
    "fireResistance": "Г4",
    "edgeType": "L-кромка",
    "brand": "LOGICPIR",
    "tempRange": "от -65 до +110°C",
    "compression": "120 кПа при 10% деформации",
    "thermalConductivity": "0,021 Вт/(м×К) начальное, 0,025 Вт/(м×К) λA, 0,026 Вт/(м×К) λБ",
    "waterAbsorption": "1% по объему",
    "application": "Для утепления кровли, перекрытий, полов, фасадов, стен, балконов и лоджий"
  },
  {
    "id": "logicpir-stekloholst-50",
    "category": "technonicol",
    "image": "/images/techno5.webp",
    "hoverImage": "/images/techno6.webp",
    "images": [
      "/images/techno5.webp",
      "/images/techno6.webp",
      "/images/techno7.webp",
      "/images/techno8.webp",
      "/images/techno9.webp"
    ],
    "title": "LOGICPIR СТЕКЛОХОЛСТ СХМ/СХМ L 50 мм",
    "description": "Площадь 0,7 м² (590×1190 мм), в упаковке 5 шт. (3,5 м²). Универсальная термоплита с двусторонним покрытием из стеклохолста и L-кромкой для кровли, перекрытий, полов, фасадов, стен, балконов и лоджий.",
    "price": 1043,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 50,
    "area": 0.7,
    "material": "stekloholst",
    "packQuantity": 5,
    "packArea": 3.5,
    "inStock": true,
    "featured": true,
    "fireResistance": "Г4",
    "edgeType": "L-кромка",
    "brand": "LOGICPIR",
    "tempRange": "от -65 до +110°C",
    "compression": "120 кПа при 10% деформации",
    "thermalConductivity": "0,021 Вт/(м×К) начальное, 0,025 Вт/(м×К) λA, 0,026 Вт/(м×К) λБ",
    "waterAbsorption": "1% по объему",
    "application": "Для утепления кровли, перекрытий, полов, фасадов, стен, балконов и лоджий"
  },
  {
    "id": "logicpir-stekloholst-80",
    "category": "technonicol",
    "image": "/images/techno5.webp",
    "hoverImage": "/images/techno6.webp",
    "images": [
      "/images/techno5.webp",
      "/images/techno6.webp",
      "/images/techno7.webp",
      "/images/techno8.webp",
      "/images/techno9.webp"
    ],
    "title": "LOGICPIR СТЕКЛОХОЛСТ СХМ/СХМ L 80 мм",
    "description": "Площадь 0,7 м² (590×1190 мм), в упаковке 7 шт. (4,91 м²). Универсальная термоплита с двусторонним покрытием из стеклохолста и L-кромкой для кровли, перекрытий, полов, фасадов, стен, балконов и лоджий.",
    "price": 1429,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 80,
    "area": 0.7,
    "material": "stekloholst",
    "packQuantity": 7,
    "packArea": 4.91,
    "inStock": true,
    "featured": true,
    "fireResistance": "Г4",
    "edgeType": "L-кромка",
    "brand": "LOGICPIR",
    "tempRange": "от -65 до +110°C",
    "compression": "120 кПа при 10% деформации",
    "thermalConductivity": "0,021 Вт/(м×К) начальное, 0,025 Вт/(м×К) λA, 0,026 Вт/(м×К) λБ",
    "waterAbsorption": "1% по объему",
    "application": "Для утепления кровли, перекрытий, полов, фасадов, стен, балконов и лоджий"
  },
  {
    "id": "logicpir-stekloholst-100",
    "category": "technonicol",
    "image": "/images/techno5.webp",
    "hoverImage": "/images/techno6.webp",
    "images": [
      "/images/techno5.webp",
      "/images/techno6.webp",
      "/images/techno7.webp",
      "/images/techno8.webp",
      "/images/techno9.webp"
    ],
    "title": "LOGICPIR СТЕКЛОХОЛСТ СХМ/СХМ L 100 мм",
    "description": "Площадь 0,7 м² (590×1190 мм), в упаковке 6 шт. (4,2 м²). Универсальная термоплита с двусторонним покрытием из стеклохолста и L-кромкой для кровли, перекрытий, полов, фасадов, стен, балконов и лоджий.",
    "price": 1535,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 100,
    "area": 0.7,
    "material": "stekloholst",
    "packQuantity": 6,
    "packArea": 4.2,
    "inStock": true,
    "featured": true,
    "fireResistance": "Г4",
    "edgeType": "L-кромка",
    "brand": "LOGICPIR",
    "tempRange": "от -65 до +110°C",
    "compression": "120 кПа при 10% деформации",
    "thermalConductivity": "0,021 Вт/(м×К) начальное, 0,025 Вт/(м×К) λA, 0,026 Вт/(м×К) λБ",
    "waterAbsorption": "1% по объему",
    "application": "Для утепления кровли, перекрытий, полов, фасадов, стен, балконов и лоджий"
  },
  {
    "id": "pir-foil-100",
    "category": "pirrogroup",
    "image": "/images/pirro2.webp",
    "hoverImage": "/images/pirro1.webp",
    "images": [
      "/images/pirro2.webp",
      "/images/pirro1.webp"
    ],
    "title": "PIR Плита ФОЛЬГА 100 мм",
    "description": "Площадь 2,88 м², в упаковке 3 шт. (8,64 м²) для утепления стен, потолков и кровли.",
    "price": 5564,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 100,
    "area": 2.88,
    "material": "foil",
    "packQuantity": 3,
    "packArea": 8.64,
    "inStock": true,
    "featured": true,
    "brand": "Pirro Термо",
    "fireResistance": "Г4",
    "tempRange": "от -60 до +110°C",
    "thermalConductivity": "0,022 Вт/(м×К)",
    "application": "Для утепления стен, потолков и кровли"
  },
  // PIR плиты с крафт бумагой PirroGroup
  {
    "id": "pir-craft-30",
    "category": "pirrogroup",
    "image": "/images/pirro3.webp",
    "hoverImage": "/images/pirro4.webp",
    "images": [
      "/images/pirro3.webp",
      "/images/pirro4.webp"
    ],
    "title": "PIR Плита КРАФТ БУМАГА 30 мм",
    "description": "Площадь 0,72 м² (600×1200 мм), в упаковке 7 шт. (5,04 м²), для утепления полов и перекрытий.",
    "price": 410,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 30,
    "area": 0.72,
    "material": "kraft",
    "packQuantity": 7,
    "packArea": 5.04,
    "inStock": true,
    "featured": true,
    "brand": "Pirro Крафт",
    "fireResistance": "Г4",
    "tempRange": "от -70 до +120°C",
    "thermalConductivity": "0,023 Вт/(м×К)",
    "density": "31 кг/м³",
    "compression": "120 кПа при 10% деформации",
    "edgeType": "ровная",
    "application": "Для перекрытия, для пола, для фасадов, для стен, для балконов, для лоджий"
  },
  {
    "id": "pir-craft-40",
    "category": "pirrogroup",
    "image": "/images/pirro3.webp",
    "hoverImage": "/images/pirro4.webp",
    "images": [
      "/images/pirro3.webp",
      "/images/pirro4.webp"
    ],
    "title": "PIR Плита КРАФТ БУМАГА 40 мм",
    "description": "Площадь 0,72 м² (600×1200 мм), в упаковке 7 шт. (5,04 м²), для утепления полов и перекрытий.",
    "price": 520,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 40,
    "area": 0.72,
    "material": "kraft",
    "packQuantity": 7,
    "packArea": 5.04,
    "inStock": true,
    "featured": true,
    "brand": "Pirro Крафт",
    "fireResistance": "Г4",
    "tempRange": "от -70 до +120°C",
    "thermalConductivity": "0,023 Вт/(м×К)",
    "density": "31 кг/м³",
    "compression": "120 кПа при 10% деформации",
    "edgeType": "ровная",
    "application": "Для перекрытия, для пола, для фасадов, для стен, для балконов, для лоджий"
  },
  {
    "id": "pir-craft-50",
    "category": "pirrogroup",
    "image": "/images/pirro3.webp",
    "hoverImage": "/images/pirro4.webp",
    "images": [
      "/images/pirro3.webp",
      "/images/pirro4.webp"
    ],
    "title": "PIR Плита КРАФТ БУМАГА 50 мм",
    "description": "Площадь 0,72 м² (600×1200 мм), в упаковке 6 шт. (4,32 м²), для утепления полов и перекрытий.",
    "price": 600,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 50,
    "area": 0.72,
    "material": "kraft",
    "packQuantity": 6,
    "packArea": 4.32,
    "inStock": true,
    "featured": true,
    "brand": "Pirro Крафт",
    "fireResistance": "Г4",
    "tempRange": "от -70 до +120°C",
    "thermalConductivity": "0,023 Вт/(м×К)",
    "density": "31 кг/м³",
    "compression": "120 кПа при 10% деформации",
    "edgeType": "ровная",
    "application": "Для перекрытия, для пола, для фасадов, для стен, для балконов, для лоджий"
  },
  // Материалы для монтажа
  {
    "id": "glue-foam",
    "category": "installation",
    "image": "/images/glue.webp",
    "title": "Клей-пена PIRROклей для PIR плит",
    "description": "Огнестойкий полиуретановый клей-пена для теплоизоляции и PIR-плит. Расход 1 баллон на 10 м². Применяется для внутренних и внешних работ.",
    "price": 1050,
    "currency": "руб.",
    "unit": "/баллон",
    "coverage": 10, // расход на 10 м²
    "inStock": true,
    "brand": "PirroGroup",
    "thermalConductivity": "не более 0,035 W/mk",
    "tempRange": "от -60°C до +80°C",
    "workingTempRange": "от +10°C до +30°C",
    "cureTime": "2 часа при 20°C и 65% влажности",
    "correctionTime": "до 10 минут",
    "features": [
      "отсутствие запаха",
      "пригодность для внутренних и внешних работ",
      "высокая эластичность",
      "готов к применению",
      "огнестойкость",
      "влажностная полимеризация"
    ],
    "application": "Для монтажа PIR-плит, пенополистирола, пенопласта, минераловатных плит, гипсокартона и других материалов"
  }
];

// Импортируем утилиты для работы с товарами
const productUtils = require('./productUtils');

// Вспомогательные функции для работы с товарами (обратная совместимость)
const getProductsByCategory = (category) => {
  return productUtils.filterByCategory(products, category);
};

const getProductById = (id) => {
  return productUtils.findProductById(products, id);
};

const formatPrice = (product) => {
  return productUtils.formatPrice(product);
};

const addFormattedPrices = (productsList) => {
  return productUtils.addFormattedPrices(productsList);
};

// Экспорт для обратной совместимости и расширенный функционал
module.exports = {
  // Основной массив товаров
  products,

  // Товары по категориям (с форматированными ценами)
  regularProducts: addFormattedPrices(getProductsByCategory('regular')),
  pirrogroupProducts: addFormattedPrices(getProductsByCategory('pirrogroup')),
  technonicolProducts: addFormattedPrices(getProductsByCategory('technonicol')),
  installationProducts: addFormattedPrices(getProductsByCategory('installation')),
  specialProducts: addFormattedPrices(getProductsByCategory('special')),

  // Базовые функции (обратная совместимость)
  getProductsByCategory,
  getProductById,
  formatPrice,
  addFormattedPrices,

  // Все утилиты из productUtils
  ...productUtils
};
