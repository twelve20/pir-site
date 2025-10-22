/**
 * Утилиты для работы с товарами
 * Набор удобных функций для фильтрации, поиска, сортировки и работы с товарами
 */

// ============================================
// ФУНКЦИИ ФИЛЬТРАЦИИ
// ============================================

/**
 * Фильтрует товары по категории
 * @param {Array} products - массив товаров
 * @param {String} category - категория ('regular', 'installation', 'special')
 * @returns {Array} отфильтрованные товары
 */
const filterByCategory = (products, category) => {
  return products.filter(product => product.category === category);
};

/**
 * Фильтрует товары по материалу покрытия
 * @param {Array} products - массив товаров
 * @param {String} material - тип материала ('foil', 'kraft')
 * @returns {Array} отфильтрованные товары
 */
const filterByMaterial = (products, material) => {
  return products.filter(product => product.material === material);
};

/**
 * Фильтрует товары по толщине
 * @param {Array} products - массив товаров
 * @param {Number} thickness - толщина в мм
 * @returns {Array} отфильтрованные товары
 */
const filterByThickness = (products, thickness) => {
  return products.filter(product => product.thickness === thickness);
};

/**
 * Фильтрует товары по диапазону толщины
 * @param {Array} products - массив товаров
 * @param {Number} minThickness - минимальная толщина в мм
 * @param {Number} maxThickness - максимальная толщина в мм
 * @returns {Array} отфильтрованные товары
 */
const filterByThicknessRange = (products, minThickness, maxThickness) => {
  return products.filter(product =>
    product.thickness >= minThickness && product.thickness <= maxThickness
  );
};

/**
 * Фильтрует товары по наличию на складе
 * @param {Array} products - массив товаров
 * @param {Boolean} inStock - true для товаров в наличии
 * @returns {Array} отфильтрованные товары
 */
const filterByStock = (products, inStock = true) => {
  return products.filter(product => product.inStock === inStock);
};

/**
 * Фильтрует акционные товары
 * @param {Array} products - массив товаров
 * @returns {Array} товары со скидкой
 */
const filterPromoProducts = (products) => {
  return products.filter(product => product.isPromo === true);
};

/**
 * Фильтрует рекомендуемые товары
 * @param {Array} products - массив товаров
 * @returns {Array} рекомендуемые товары
 */
const filterFeaturedProducts = (products) => {
  return products.filter(product => product.featured === true);
};

/**
 * Фильтрует товары по диапазону цен
 * @param {Array} products - массив товаров
 * @param {Number} minPrice - минимальная цена
 * @param {Number} maxPrice - максимальная цена
 * @returns {Array} отфильтрованные товары
 */
const filterByPriceRange = (products, minPrice, maxPrice) => {
  return products.filter(product =>
    product.price >= minPrice && product.price <= maxPrice
  );
};

/**
 * Универсальный фильтр с множественными условиями
 * @param {Array} products - массив товаров
 * @param {Object} filters - объект с фильтрами
 * @returns {Array} отфильтрованные товары
 *
 * Пример: filterProducts(products, { category: 'regular', material: 'foil', inStock: true })
 */
const filterProducts = (products, filters = {}) => {
  return products.filter(product => {
    // Проверяем каждый фильтр
    for (let key in filters) {
      if (filters[key] !== undefined && filters[key] !== null) {
        // Специальная обработка для диапазонов
        if (key === 'minPrice' && product.price < filters.minPrice) return false;
        if (key === 'maxPrice' && product.price > filters.maxPrice) return false;
        if (key === 'minThickness' && product.thickness < filters.minThickness) return false;
        if (key === 'maxThickness' && product.thickness > filters.maxThickness) return false;

        // Обычное сравнение
        if (product[key] !== undefined && product[key] !== filters[key]) {
          return false;
        }
      }
    }
    return true;
  });
};

// ============================================
// ФУНКЦИИ СОРТИРОВКИ
// ============================================

/**
 * Сортирует товары по цене
 * @param {Array} products - массив товаров
 * @param {String} order - порядок ('asc' или 'desc')
 * @returns {Array} отсортированные товары
 */
const sortByPrice = (products, order = 'asc') => {
  return [...products].sort((a, b) => {
    return order === 'asc' ? a.price - b.price : b.price - a.price;
  });
};

/**
 * Сортирует товары по толщине
 * @param {Array} products - массив товаров
 * @param {String} order - порядок ('asc' или 'desc')
 * @returns {Array} отсортированные товары
 */
const sortByThickness = (products, order = 'asc') => {
  return [...products].sort((a, b) => {
    return order === 'asc' ? a.thickness - b.thickness : b.thickness - a.thickness;
  });
};

/**
 * Сортирует товары по названию
 * @param {Array} products - массив товаров
 * @param {String} order - порядок ('asc' или 'desc')
 * @returns {Array} отсортированные товары
 */
const sortByTitle = (products, order = 'asc') => {
  return [...products].sort((a, b) => {
    const comparison = a.title.localeCompare(b.title, 'ru');
    return order === 'asc' ? comparison : -comparison;
  });
};

/**
 * Сортирует товары по площади
 * @param {Array} products - массив товаров
 * @param {String} order - порядок ('asc' или 'desc')
 * @returns {Array} отсортированные товары
 */
const sortByArea = (products, order = 'asc') => {
  return [...products].sort((a, b) => {
    return order === 'asc' ? a.area - b.area : b.area - a.area;
  });
};

/**
 * Сортирует товары с приоритетом для акций и рекомендуемых
 * @param {Array} products - массив товаров
 * @returns {Array} отсортированные товары (сначала акции, потом рекомендуемые)
 */
const sortByPriority = (products) => {
  return [...products].sort((a, b) => {
    // Акции имеют наивысший приоритет
    if (a.isPromo && !b.isPromo) return -1;
    if (!a.isPromo && b.isPromo) return 1;

    // Затем рекомендуемые товары
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // Остальные по цене
    return a.price - b.price;
  });
};

// ============================================
// ФУНКЦИИ ПОИСКА
// ============================================

/**
 * Ищет товар по ID
 * @param {Array} products - массив товаров
 * @param {String} id - ID товара
 * @returns {Object|null} найденный товар или null
 */
const findProductById = (products, id) => {
  return products.find(product => product.id === id) || null;
};

/**
 * Ищет товары по названию (полнотекстовый поиск)
 * @param {Array} products - массив товаров
 * @param {String} query - поисковый запрос
 * @returns {Array} найденные товары
 */
const searchByTitle = (products, query) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.title.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Ищет товары по описанию
 * @param {Array} products - массив товаров
 * @param {String} query - поисковый запрос
 * @returns {Array} найденные товары
 */
const searchByDescription = (products, query) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.description.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Универсальный поиск по всем текстовым полям
 * @param {Array} products - массив товаров
 * @param {String} query - поисковый запрос
 * @returns {Array} найденные товары
 */
const searchProducts = (products, query) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => {
    return (
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      (product.application && product.application.toLowerCase().includes(lowerQuery))
    );
  });
};

// ============================================
// ФУНКЦИИ ДЛЯ РАБОТЫ С ЦЕНАМИ
// ============================================

/**
 * Форматирует цену в читаемый вид
 * @param {Object} product - товар
 * @returns {String} форматированная цена
 */
const formatPrice = (product) => {
  if (!product || !product.price) return '';
  return `${product.price} ${product.currency || 'руб.'}/${product.unit || 'шт.'}`;
};

/**
 * Вычисляет размер скидки
 * @param {Object} product - товар
 * @returns {Number} процент скидки или 0
 */
const calculateDiscount = (product) => {
  if (!product.oldPrice || !product.price) return 0;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
};

/**
 * Вычисляет сумму экономии
 * @param {Object} product - товар
 * @returns {Number} сумма экономии или 0
 */
const calculateSavings = (product) => {
  if (!product.oldPrice || !product.price) return 0;
  return product.oldPrice - product.price;
};

/**
 * Вычисляет общую стоимость товара
 * @param {Object} product - товар
 * @param {Number} quantity - количество
 * @returns {Number} общая стоимость
 */
const calculateTotal = (product, quantity = 1) => {
  return product.price * quantity;
};

/**
 * Вычисляет стоимость за квадратный метр
 * @param {Object} product - товар
 * @returns {Number} цена за м²
 */
const getPricePerSquareMeter = (product) => {
  if (!product.area || product.area === 0) return 0;
  return Math.round(product.price / product.area);
};

/**
 * Вычисляет количество товара для заданной площади
 * @param {Object} product - товар
 * @param {Number} targetArea - нужная площадь в м²
 * @returns {Object} { quantity: число плит, totalArea: итоговая площадь, totalPrice: итоговая цена }
 */
const calculateQuantityForArea = (product, targetArea) => {
  if (!product.area || product.area === 0) {
    return { quantity: 0, totalArea: 0, totalPrice: 0 };
  }

  const quantity = Math.ceil(targetArea / product.area);
  const totalArea = quantity * product.area;
  const totalPrice = quantity * product.price;

  return {
    quantity,
    totalArea: Math.round(totalArea * 100) / 100,
    totalPrice
  };
};

/**
 * Добавляет форматированные цены ко всем товарам
 * @param {Array} products - массив товаров
 * @returns {Array} товары с добавленными полями priceFormatted, oldPriceFormatted
 */
const addFormattedPrices = (products) => {
  return products.map(product => ({
    ...product,
    priceFormatted: formatPrice(product),
    oldPriceFormatted: product.oldPrice
      ? `${product.oldPrice} ${product.currency || 'руб.'}/${product.unit || 'шт.'}`
      : null,
    discountPercent: calculateDiscount(product),
    savings: calculateSavings(product),
    pricePerSquareMeter: getPricePerSquareMeter(product)
  }));
};

// ============================================
// ФУНКЦИИ ДЛЯ РАБОТЫ С УПАКОВКАМИ
// ============================================

/**
 * Вычисляет стоимость упаковки
 * @param {Object} product - товар
 * @returns {Number} стоимость упаковки
 */
const getPackPrice = (product) => {
  if (!product.packQuantity) return product.price;
  return product.price * product.packQuantity;
};

/**
 * Вычисляет количество упаковок для заданной площади
 * @param {Object} product - товар
 * @param {Number} targetArea - нужная площадь в м²
 * @returns {Object} { packs: число упаковок, totalArea: итоговая площадь, totalPrice: итоговая цена }
 */
const calculatePacksForArea = (product, targetArea) => {
  if (!product.packArea || product.packArea === 0) {
    return { packs: 0, totalArea: 0, totalPrice: 0 };
  }

  const packs = Math.ceil(targetArea / product.packArea);
  const totalArea = packs * product.packArea;
  const packPrice = getPackPrice(product);
  const totalPrice = packs * packPrice;

  return {
    packs,
    totalArea: Math.round(totalArea * 100) / 100,
    totalPrice,
    packPrice
  };
};

// ============================================
// ФУНКЦИИ ДЛЯ СТАТИСТИКИ
// ============================================

/**
 * Получает статистику по товарам
 * @param {Array} products - массив товаров
 * @returns {Object} объект со статистикой
 */
const getProductStats = (products) => {
  const stats = {
    total: products.length,
    inStock: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length,
    promo: products.filter(p => p.isPromo).length,
    featured: products.filter(p => p.featured).length,
    categories: {},
    materials: {},
    thicknesses: {},
    avgPrice: 0,
    minPrice: Infinity,
    maxPrice: 0
  };

  let totalPrice = 0;

  products.forEach(product => {
    // Категории
    stats.categories[product.category] = (stats.categories[product.category] || 0) + 1;

    // Материалы
    if (product.material) {
      stats.materials[product.material] = (stats.materials[product.material] || 0) + 1;
    }

    // Толщины
    if (product.thickness) {
      stats.thicknesses[product.thickness] = (stats.thicknesses[product.thickness] || 0) + 1;
    }

    // Цены
    totalPrice += product.price;
    if (product.price < stats.minPrice) stats.minPrice = product.price;
    if (product.price > stats.maxPrice) stats.maxPrice = product.price;
  });

  stats.avgPrice = Math.round(totalPrice / products.length);

  return stats;
};

/**
 * Группирует товары по категории
 * @param {Array} products - массив товаров
 * @returns {Object} объект с группами товаров по категориям
 */
const groupByCategory = (products) => {
  return products.reduce((groups, product) => {
    const category = product.category || 'other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});
};

/**
 * Группирует товары по материалу
 * @param {Array} products - массив товаров
 * @returns {Object} объект с группами товаров по материалам
 */
const groupByMaterial = (products) => {
  return products.reduce((groups, product) => {
    const material = product.material || 'other';
    if (!groups[material]) {
      groups[material] = [];
    }
    groups[material].push(product);
    return groups;
  }, {});
};

/**
 * Группирует товары по толщине
 * @param {Array} products - массив товаров
 * @returns {Object} объект с группами товаров по толщине
 */
const groupByThickness = (products) => {
  return products.reduce((groups, product) => {
    const thickness = product.thickness || 0;
    if (!groups[thickness]) {
      groups[thickness] = [];
    }
    groups[thickness].push(product);
    return groups;
  }, {});
};

// ============================================
// ЭКСПОРТ
// ============================================

module.exports = {
  // Фильтрация
  filterByCategory,
  filterByMaterial,
  filterByThickness,
  filterByThicknessRange,
  filterByStock,
  filterPromoProducts,
  filterFeaturedProducts,
  filterByPriceRange,
  filterProducts,

  // Сортировка
  sortByPrice,
  sortByThickness,
  sortByTitle,
  sortByArea,
  sortByPriority,

  // Поиск
  findProductById,
  searchByTitle,
  searchByDescription,
  searchProducts,

  // Работа с ценами
  formatPrice,
  calculateDiscount,
  calculateSavings,
  calculateTotal,
  getPricePerSquareMeter,
  calculateQuantityForArea,
  addFormattedPrices,

  // Работа с упаковками
  getPackPrice,
  calculatePacksForArea,

  // Статистика
  getProductStats,
  groupByCategory,
  groupByMaterial,
  groupByThickness
};
