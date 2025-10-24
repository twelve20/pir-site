// Единый массив всех товаров с улучшенной структурой данных
const products = [
  // Основные товары - PIR плиты с фольгой
  {
    "id": "pir-foil-30",
    "category": "regular",
    "image": "/images/product1.jpg",
    "title": "PIR плита для бани ФОЛЬГА 30 мм",
    "description": "Площадь 0,72 м², в упаковке 7 шт. (5,04 м²), для утепления бань и саун.",
    // Цены в числовом формате
    "price": 582,
    "oldPrice": 590,
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
    "category": "regular",
    "image": "/images/product1.jpg",
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
    "application": "Для утепления бань и саун"
  },
  {
    "id": "pirro-termo-50",
    "category": "regular",
    "image": "/images/product1.jpg",
    "title": "PIR плита для бани ФОЛЬГА 50 мм",
    "description": "Площадь 0,72 м², в упаковке 6 шт. (4,32 м²), для утепления бань и саун.",
    "price": 755,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 50,
    "area": 0.72,
    "material": "foil",
    "packQuantity": 6,
    "packArea": 4.32,
    "inStock": true,
    "application": "Для утепления бань и саун"
  },
  {
    "id": "pir-foil-100",
    "category": "regular",
    "image": "/images/product2.jpg",
    "title": "PIR Плита ФОЛЬГА 100 мм",
    "description": "Площадь 2,88 м², в упакевке 3шт. (8,64 м²) для утепления стен, потолков и кровли.",
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
    "application": "Для утепления стен, потолков и кровли"
  },
  // PIR плиты с крафт бумагой
  {
    "id": "pir-craft-30",
    "category": "regular",
    "image": "/images/product1.jpg",
    "title": "PIR Плита КРАФТ БУМАГА 30 мм",
    "description": "Площадь 0,72 м², в упаковке 7 шт. (5,04 м²), для утепления полов и перекрытий.",
    "price": 410,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 30,
    "area": 0.72,
    "material": "kraft",
    "packQuantity": 7,
    "packArea": 5.04,
    "inStock": true,
    "application": "Для утепления полов и перекрытий"
  },
  {
    "id": "pir-craft-40",
    "category": "regular",
    "image": "/images/product1.jpg",
    "title": "PIR Плита КРАФТ БУМАГА 40 мм",
    "description": "Площадь 0,72 м², в упаковке 7 шт. (5,04 м²), для утепления полов и перекрытий.",
    "price": 520,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 40,
    "area": 0.72,
    "material": "kraft",
    "packQuantity": 7,
    "packArea": 5.04,
    "inStock": true,
    "application": "Для утепления полов и перекрытий"
  },
  {
    "id": "pir-craft-50",
    "category": "regular",
    "image": "/images/product1.jpg",
    "title": "PIR Плита КРАФТ БУМАГА 50 мм",
    "description": "Площадь 0,72 м², в упаковке 6 шт. (4,32 м²), для утепления полов и перекрытий.",
    "price": 600,
    "currency": "руб.",
    "unit": "шт.",
    "thickness": 50,
    "area": 0.72,
    "material": "kraft",
    "packQuantity": 6,
    "packArea": 4.32,
    "inStock": true,
    "application": "Для утепления полов и перекрытий"
  },
  // Материалы для монтажа
  {
    "id": "glue-foam",
    "category": "installation",
    "image": "/images/product4.jpg",
    "title": "Клей-пена для PIR",
    "description": "Расход 1 баллон на 10 м², для надежного монтажа PIR-плит.",
    "price": 1050,
    "currency": "руб.",
    "unit": "баллон",
    "coverage": 10, // расход на 10 м²
    "inStock": true,
    "application": "Для надежного монтажа PIR-плит"
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
