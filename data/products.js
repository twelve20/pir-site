// Единый массив всех товаров с категориями
const products = [
  // Основные товары - PIR плиты с фольгой
  {
    "id": "pir-foil-30",
    "category": "regular",
    "image": "/images/product1.jpg",
    "title": "PIR плита для бани ФОЛЬГА 30 мм",
    "description": "Площадь 0,72 м², в упаковке 7 шт. (5,04 м²), для утепления бань и саун.",
    "price": "510 руб./шт.",
    "oldPrice": "530 руб./шт.",
    "isPromo": true
  },
  // {
  //   "id": "pirro-termo-30",
  //   "category": "regular",
  //   "image": "/images/product1.jpg",
  //   "title": "PIR плита для бани ФОЛЬГА 30 мм",
  //   "description": "Площадь 0,72 м², в упаковке 7 шт. (5,04 м²), для утепления бань и саун.",
  //   "price": "503 руб./шт."
  // },
  {
    "id": "pirro-termo-40",
    "category": "regular",
    "image": "/images/product1.jpg",
    "title": "PIR плита для бани ФОЛЬГА 40 мм",
    "description": "Площадь 0,72 м², в упаковке 7 шт. (5,04 м²), для утепления бань и саун.",
    "price": "647 руб./шт."
  },
  {
    "id": "pirro-termo-50",
    "category": "regular",
    "image": "/images/product1.jpg",
    "title": "PIR плита для бани ФОЛЬГА 50 мм",
    "description": "Площадь 0,72 м², в упаковке 6 шт. (4,32 м²), для утепления бань и саун.",
    "price": "755 руб./шт."
  },
  {
    "id": "pir-foil-100",
    "category": "regular",
    "image": "/images/product2.jpg",
    "title": "PIR Плита ФОЛЬГА 100 мм",
    "description": "Площадь 2,88 м², в упакевке 3шт. (8,64 м²) для утепления стен, потолков и кровли.",
    "price": "5564 руб./шт."
  },
  // PIR плиты с крафт бумагой
  {
    "id": "pir-craft-30",
    "category": "regular",
    "image": "/images/product1.jpg",
    "title": "PIR Плита КРАФТ БУМАГА 30 мм",
    "description": "Площадь 0,72 м², в упаковке 7 шт. (5,04 м²), для утепления полов и перекрытий.",
    "price": "410 руб./шт."
  },
  {
    "id": "pir-craft-40",
    "category": "regular",
    "image": "/images/product1.jpg",
    "title": "PIR Плита КРАФТ БУМАГА 40 мм",
    "description": "Площадь 0,72 м², в упаковке 7 шт. (5,04 м²), для утепления полов и перекрытий.",
    "price": "520 руб./шт."
  },
  {
    "id": "pir-craft-50",
    "category": "regular",
    "image": "/images/product1.jpg",
    "title": "PIR Плита КРАФТ БУМАГА 50 мм",
    "description": "Площадь 0,72 м², в упаковке 6 шт. (4,32 м²), для утепления полов и перекрытий.",
    "price": "600 руб./шт."
  },
  // Материалы для монтажа
  {
    "id": "glue-foam",
    "category": "installation",
    "image": "/images/product4.jpg",
    "title": "Клей-пена для PIR",
    "description": "Расход 1 баллон на 10 м², для надежного монтажа PIR-плит.",
    "price": "1050 руб./баллон"
  }
];

// Вспомогательные функции для фильтрации по категориям
const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

const getProductById = (id) => {
  return products.find(product => product.id === id);
};

// Экспорт для обратной совместимости
module.exports = {
  products,
  regularProducts: getProductsByCategory('regular'),
  installationProducts: getProductsByCategory('installation'),
  specialProducts: getProductsByCategory('special'),
  getProductsByCategory,
  getProductById
};
