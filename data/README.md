# Документация по работе с товарами

## Структура файлов

```
data/
├── products.js       # Основной файл с товарами и экспортом всех функций
├── productUtils.js   # Утилиты для работы с товарами
├── EXAMPLES.md       # Подробные примеры использования
└── README.md         # Эта документация
```

## Быстрый старт

### Импорт

```javascript
// Импорт всех функций и данных
const {
  products,
  regularProducts,
  installationProducts,
  specialProducts,
  // ... все утилиты
} = require('./data/products');
```

### Базовое использование

```javascript
// Получить товар по ID
const product = findProductById(products, 'pir-foil-30');

// Отфильтровать товары
const foilProducts = filterByMaterial(products, 'foil');

// Отсортировать по цене
const sorted = sortByPrice(products, 'asc');

// Поиск товаров
const results = searchProducts(products, 'баня');
```

## Структура данных товара

```javascript
{
  // Основные поля
  "id": "pir-foil-30",                    // Уникальный ID
  "category": "regular",                  // Категория: regular | installation | special
  "title": "PIR плита для бани ФОЛЬГА 30 мм",
  "description": "Площадь 0,72 м², в упаковке 7 шт...",
  "image": "/images/product1.jpg",

  // Цены (числовой формат)
  "price": 510,                          // Текущая цена
  "oldPrice": 530,                       // Старая цена (опционально)
  "currency": "руб.",                    // Валюта
  "unit": "шт.",                         // Единица измерения

  // Технические характеристики
  "thickness": 30,                       // Толщина в мм
  "area": 0.72,                          // Площадь одной плиты в м²
  "material": "foil",                    // Тип покрытия: foil | kraft
  "packQuantity": 7,                     // Количество в упаковке
  "packArea": 5.04,                      // Площадь упаковки в м²

  // Дополнительные поля
  "inStock": true,                       // Наличие на складе
  "isPromo": true,                       // Акционный товар
  "featured": true,                      // Рекомендуемый товар
  "application": "Для утепления бань...", // Область применения
  "coverage": 10                         // Расход (для монтажных материалов)
}
```

## Категории функций

### 1. Фильтрация

| Функция | Описание |
|---------|----------|
| `filterByCategory(products, category)` | Фильтр по категории |
| `filterByMaterial(products, material)` | Фильтр по материалу |
| `filterByThickness(products, thickness)` | Фильтр по толщине |
| `filterByThicknessRange(products, min, max)` | Фильтр по диапазону толщины |
| `filterByStock(products, inStock)` | Фильтр по наличию |
| `filterPromoProducts(products)` | Только акционные товары |
| `filterFeaturedProducts(products)` | Только рекомендуемые товары |
| `filterByPriceRange(products, min, max)` | Фильтр по диапазону цен |
| `filterProducts(products, filters)` | Универсальный фильтр |

### 2. Сортировка

| Функция | Описание |
|---------|----------|
| `sortByPrice(products, order)` | Сортировка по цене ('asc' / 'desc') |
| `sortByThickness(products, order)` | Сортировка по толщине |
| `sortByTitle(products, order)` | Сортировка по названию |
| `sortByArea(products, order)` | Сортировка по площади |
| `sortByPriority(products)` | Сортировка: акции → рекомендуемые → по цене |

### 3. Поиск

| Функция | Описание |
|---------|----------|
| `findProductById(products, id)` | Найти товар по ID |
| `searchByTitle(products, query)` | Поиск по названию |
| `searchByDescription(products, query)` | Поиск по описанию |
| `searchProducts(products, query)` | Универсальный поиск |

### 4. Работа с ценами

| Функция | Описание |
|---------|----------|
| `formatPrice(product)` | Форматировать цену в текст |
| `calculateDiscount(product)` | Процент скидки |
| `calculateSavings(product)` | Сумма экономии |
| `calculateTotal(product, quantity)` | Общая стоимость |
| `getPricePerSquareMeter(product)` | Цена за м² |
| `calculateQuantityForArea(product, area)` | Количество для площади |
| `addFormattedPrices(products)` | Добавить форматированные цены |

### 5. Работа с упаковками

| Функция | Описание |
|---------|----------|
| `getPackPrice(product)` | Стоимость упаковки |
| `calculatePacksForArea(product, area)` | Количество упаковок для площади |

### 6. Статистика

| Функция | Описание |
|---------|----------|
| `getProductStats(products)` | Общая статистика |
| `groupByCategory(products)` | Группировка по категориям |
| `groupByMaterial(products)` | Группировка по материалам |
| `groupByThickness(products)` | Группировка по толщине |

## Примеры использования

### Простой фильтр

```javascript
// Получить все товары с фольгой толщиной 30 мм в наличии
const filtered = filterProducts(products, {
  material: 'foil',
  thickness: 30,
  inStock: true
});
```

### Поиск и сортировка

```javascript
// Найти товары для бани и отсортировать по цене
const results = searchProducts(products, 'баня');
const sorted = sortByPrice(results, 'asc');
```

### Расчет материалов

```javascript
const product = findProductById(products, 'pir-foil-30');
const calculation = calculateQuantityForArea(product, 50);

console.log(`Для 50 м² нужно:`);
console.log(`- ${calculation.quantity} плит`);
console.log(`- Стоимость: ${calculation.totalPrice} руб.`);
```

### Акционные товары со скидками

```javascript
const promos = filterPromoProducts(products);
const withPrices = addFormattedPrices(promos);

withPrices.forEach(p => {
  console.log(`${p.title}: ${p.priceFormatted}`);
  console.log(`Скидка: ${p.discountPercent}%, экономия: ${p.savings} руб.`);
});
```

## Использование в API

### Роут для фильтрации

```javascript
app.get('/api/products/filter', (req, res) => {
  const { category, material, minPrice, maxPrice } = req.query;

  let filtered = filterProducts(products, {
    category,
    material,
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined
  });

  filtered = sortByPrice(filtered, 'asc');
  const result = addFormattedPrices(filtered);

  res.json(result);
});
```

### Роут для поиска

```javascript
app.get('/api/products/search', (req, res) => {
  const { q } = req.query;
  const results = searchProducts(products, q);
  const formatted = addFormattedPrices(results);

  res.json(formatted);
});
```

### Роут для калькулятора

```javascript
app.post('/api/calculate', (req, res) => {
  const { productId, area } = req.body;

  const product = findProductById(products, productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const materials = calculatePacksForArea(product, area);
  const glue = findProductById(products, 'glue-foam');
  const glueBottles = Math.ceil(area / (glue?.coverage || 10));

  res.json({
    product: addFormattedPrices([product])[0],
    materials,
    glue: {
      bottles: glueBottles,
      totalPrice: glueBottles * (glue?.price || 0)
    },
    total: materials.totalPrice + (glueBottles * (glue?.price || 0))
  });
});
```

## Полезные комбинации

### Каталог с фильтрами и сортировкой

```javascript
const {
  products,
  filterProducts,
  sortByPrice,
  addFormattedPrices
} = require('./data/products');

// Фильтруем
let result = filterProducts(products, {
  category: 'regular',
  inStock: true,
  minPrice: 400,
  maxPrice: 700
});

// Сортируем
result = sortByPrice(result, 'asc');

// Добавляем форматированные данные
result = addFormattedPrices(result);
```

### Сравнение товаров

```javascript
const productIds = ['pir-foil-30', 'pir-foil-100', 'pir-craft-30'];
const targetArea = 50;

const comparison = productIds.map(id => {
  const product = findProductById(products, id);
  const calculation = calculateQuantityForArea(product, targetArea);

  return {
    ...product,
    pricePerM2: getPricePerSquareMeter(product),
    forArea: calculation
  };
});
```

### Статистика и аналитика

```javascript
const stats = getProductStats(products);
const byCategory = groupByCategory(products);
const byMaterial = groupByMaterial(products);

console.log('Всего товаров:', stats.total);
console.log('Средняя цена:', stats.avgPrice);
console.log('По категориям:', stats.categories);
console.log('По материалам:', stats.materials);
```

## Дополнительная информация

Для более подробных примеров смотрите [EXAMPLES.md](./EXAMPLES.md)

## Changelog

### v2.0 (текущая версия)
- Единый массив товаров с категориями
- Числовой формат цен
- Расширенные технические характеристики
- 40+ функций для работы с товарами
- Полная документация и примеры

### v1.0
- Три отдельных массива товаров
- Строковый формат цен
- Базовые функции
