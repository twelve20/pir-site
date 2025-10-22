# Примеры использования функций для работы с товарами

Этот файл содержит примеры использования всех функций из `productUtils.js` для работы с товарами.

## Содержание

1. [Фильтрация товаров](#фильтрация-товаров)
2. [Сортировка товаров](#сортировка-товаров)
3. [Поиск товаров](#поиск-товаров)
4. [Работа с ценами](#работа-с-ценами)
5. [Работа с упаковками](#работа-с-упаковками)
6. [Статистика](#статистика)
7. [Комбинированные примеры](#комбинированные-примеры)

---

## Фильтрация товаров

### Фильтрация по категории

```javascript
const { products, filterByCategory } = require('./data/products');

// Получить все основные товары
const regularProducts = filterByCategory(products, 'regular');

// Получить товары для монтажа
const installationProducts = filterByCategory(products, 'installation');

// Получить акционные товары
const specialProducts = filterByCategory(products, 'special');
```

### Фильтрация по материалу

```javascript
const { products, filterByMaterial } = require('./data/products');

// Получить товары с фольгой
const foilProducts = filterByMaterial(products, 'foil');

// Получить товары с крафт-бумагой
const kraftProducts = filterByMaterial(products, 'kraft');
```

### Фильтрация по толщине

```javascript
const { products, filterByThickness, filterByThicknessRange } = require('./data/products');

// Получить товары толщиной 30 мм
const products30mm = filterByThickness(products, 30);

// Получить товары толщиной от 30 до 50 мм
const thinProducts = filterByThicknessRange(products, 30, 50);

// Получить товары толщиной более 50 мм
const thickProducts = filterByThicknessRange(products, 51, 999);
```

### Фильтрация по наличию

```javascript
const { products, filterByStock } = require('./data/products');

// Получить товары в наличии
const availableProducts = filterByStock(products, true);

// Получить товары, которых нет в наличии
const unavailableProducts = filterByStock(products, false);
```

### Фильтрация акций и рекомендуемых

```javascript
const { products, filterPromoProducts, filterFeaturedProducts } = require('./data/products');

// Получить акционные товары
const promoProducts = filterPromoProducts(products);

// Получить рекомендуемые товары
const featuredProducts = filterFeaturedProducts(products);
```

### Фильтрация по цене

```javascript
const { products, filterByPriceRange } = require('./data/products');

// Получить товары от 400 до 600 рублей
const budgetProducts = filterByPriceRange(products, 400, 600);

// Получить премиум товары (дороже 1000 рублей)
const premiumProducts = filterByPriceRange(products, 1000, 999999);
```

### Универсальный фильтр

```javascript
const { products, filterProducts } = require('./data/products');

// Пример 1: Товары с фольгой, толщиной 30 мм, в наличии
const filteredProducts = filterProducts(products, {
  material: 'foil',
  thickness: 30,
  inStock: true
});

// Пример 2: Акционные товары с крафт-бумагой
const promoKraftProducts = filterProducts(products, {
  material: 'kraft',
  isPromo: true
});

// Пример 3: Товары по диапазону цен и категории
const regularBudgetProducts = filterProducts(products, {
  category: 'regular',
  minPrice: 400,
  maxPrice: 700
});

// Пример 4: Рекомендуемые товары в наличии
const featuredAvailable = filterProducts(products, {
  featured: true,
  inStock: true
});
```

---

## Сортировка товаров

### Сортировка по цене

```javascript
const { products, sortByPrice } = require('./data/products');

// Сортировка от дешевых к дорогим
const cheapToExpensive = sortByPrice(products, 'asc');

// Сортировка от дорогих к дешевым
const expensiveToCheap = sortByPrice(products, 'desc');
```

### Сортировка по толщине

```javascript
const { products, sortByThickness } = require('./data/products');

// Сортировка от тонких к толстым
const thinToThick = sortByThickness(products, 'asc');

// Сортировка от толстых к тонким
const thickToThin = sortByThickness(products, 'desc');
```

### Сортировка по названию

```javascript
const { products, sortByTitle } = require('./data/products');

// Сортировка А-Я
const alphabeticalAZ = sortByTitle(products, 'asc');

// Сортировка Я-А
const alphabeticalZA = sortByTitle(products, 'desc');
```

### Сортировка по площади

```javascript
const { products, sortByArea } = require('./data/products');

// Сортировка от малой площади к большой
const smallToLarge = sortByArea(products, 'asc');

// Сортировка от большой площади к малой
const largeToSmall = sortByArea(products, 'desc');
```

### Сортировка с приоритетом

```javascript
const { products, sortByPriority } = require('./data/products');

// Сортировка: сначала акции, потом рекомендуемые, потом по цене
const prioritizedProducts = sortByPriority(products);
```

---

## Поиск товаров

### Поиск по ID

```javascript
const { products, findProductById } = require('./data/products');

// Найти товар по ID
const product = findProductById(products, 'pir-foil-30');

if (product) {
  console.log('Найден товар:', product.title);
} else {
  console.log('Товар не найден');
}
```

### Поиск по названию

```javascript
const { products, searchByTitle } = require('./data/products');

// Найти товары с "ФОЛЬГА" в названии
const foilProducts = searchByTitle(products, 'ФОЛЬГА');

// Найти товары с "30 мм" в названии
const products30mm = searchByTitle(products, '30 мм');
```

### Поиск по описанию

```javascript
const { products, searchByDescription } = require('./data/products');

// Найти товары для бань
const saunaProducts = searchByDescription(products, 'бани');

// Найти товары для полов
const floorProducts = searchByDescription(products, 'полов');
```

### Универсальный поиск

```javascript
const { products, searchProducts } = require('./data/products');

// Поиск по всем текстовым полям
const searchResults = searchProducts(products, 'утепление');
```

---

## Работа с ценами

### Форматирование цены

```javascript
const { findProductById, formatPrice } = require('./data/products');

const product = findProductById(products, 'pir-foil-30');
const formattedPrice = formatPrice(product);

console.log(formattedPrice); // "510 руб./шт."
```

### Расчет скидки

```javascript
const { findProductById, calculateDiscount, calculateSavings } = require('./data/products');

const product = findProductById(products, 'pir-foil-30');

// Получить процент скидки
const discountPercent = calculateDiscount(product);
console.log(`Скидка: ${discountPercent}%`); // "Скидка: 4%"

// Получить сумму экономии
const savings = calculateSavings(product);
console.log(`Экономия: ${savings} руб.`); // "Экономия: 20 руб."
```

### Расчет общей стоимости

```javascript
const { findProductById, calculateTotal } = require('./data/products');

const product = findProductById(products, 'pir-foil-30');

// Стоимость 10 штук
const total = calculateTotal(product, 10);
console.log(`Итого: ${total} руб.`); // "Итого: 5100 руб."
```

### Цена за квадратный метр

```javascript
const { findProductById, getPricePerSquareMeter } = require('./data/products');

const product = findProductById(products, 'pir-foil-30');
const pricePerM2 = getPricePerSquareMeter(product);

console.log(`Цена за м²: ${pricePerM2} руб./м²`); // "Цена за м²: 708 руб./м²"
```

### Расчет количества для площади

```javascript
const { findProductById, calculateQuantityForArea } = require('./data/products');

const product = findProductById(products, 'pir-foil-30');

// Рассчитать количество для 50 м²
const result = calculateQuantityForArea(product, 50);

console.log(`Нужно плит: ${result.quantity} шт.`);
console.log(`Общая площадь: ${result.totalArea} м²`);
console.log(`Общая стоимость: ${result.totalPrice} руб.`);
```

### Добавление форматированных цен

```javascript
const { products, addFormattedPrices } = require('./data/products');

// Добавить форматированные цены ко всем товарам
const productsWithPrices = addFormattedPrices(products);

productsWithPrices.forEach(product => {
  console.log(`${product.title}: ${product.priceFormatted}`);
  if (product.discountPercent > 0) {
    console.log(`  Скидка: ${product.discountPercent}%`);
    console.log(`  Старая цена: ${product.oldPriceFormatted}`);
    console.log(`  Экономия: ${product.savings} руб.`);
  }
  console.log(`  Цена за м²: ${product.pricePerSquareMeter} руб./м²`);
});
```

---

## Работа с упаковками

### Стоимость упаковки

```javascript
const { findProductById, getPackPrice } = require('./data/products');

const product = findProductById(products, 'pir-foil-30');
const packPrice = getPackPrice(product);

console.log(`Цена упаковки (${product.packQuantity} шт.): ${packPrice} руб.`);
```

### Расчет упаковок для площади

```javascript
const { findProductById, calculatePacksForArea } = require('./data/products');

const product = findProductById(products, 'pir-foil-30');

// Рассчитать упаковки для 100 м²
const result = calculatePacksForArea(product, 100);

console.log(`Нужно упаковок: ${result.packs} шт.`);
console.log(`Цена одной упаковки: ${result.packPrice} руб.`);
console.log(`Общая площадь: ${result.totalArea} м²`);
console.log(`Общая стоимость: ${result.totalPrice} руб.`);
```

---

## Статистика

### Общая статистика по товарам

```javascript
const { products, getProductStats } = require('./data/products');

const stats = getProductStats(products);

console.log('=== Статистика товаров ===');
console.log(`Всего товаров: ${stats.total}`);
console.log(`В наличии: ${stats.inStock}`);
console.log(`Нет в наличии: ${stats.outOfStock}`);
console.log(`Акционных: ${stats.promo}`);
console.log(`Рекомендуемых: ${stats.featured}`);
console.log('\nПо категориям:');
console.log(stats.categories);
console.log('\nПо материалам:');
console.log(stats.materials);
console.log('\nПо толщине:');
console.log(stats.thicknesses);
console.log(`\nСредняя цена: ${stats.avgPrice} руб.`);
console.log(`Мин. цена: ${stats.minPrice} руб.`);
console.log(`Макс. цена: ${stats.maxPrice} руб.`);
```

### Группировка товаров

```javascript
const { products, groupByCategory, groupByMaterial, groupByThickness } = require('./data/products');

// Группировка по категориям
const byCategory = groupByCategory(products);
console.log('Категории:', Object.keys(byCategory));
console.log('Обычных товаров:', byCategory.regular.length);

// Группировка по материалам
const byMaterial = groupByMaterial(products);
console.log('Товаров с фольгой:', byMaterial.foil.length);
console.log('Товаров с крафт-бумагой:', byMaterial.kraft.length);

// Группировка по толщине
const byThickness = groupByThickness(products);
console.log('Доступные толщины:', Object.keys(byThickness));
```

---

## Комбинированные примеры

### Пример 1: Каталог с фильтрами

```javascript
const {
  products,
  filterProducts,
  sortByPrice,
  addFormattedPrices
} = require('./data/products');

// Фильтруем товары: фольга, в наличии, от 400 до 700 руб.
let filtered = filterProducts(products, {
  material: 'foil',
  inStock: true,
  minPrice: 400,
  maxPrice: 700
});

// Сортируем по цене
filtered = sortByPrice(filtered, 'asc');

// Добавляем форматированные цены
const catalog = addFormattedPrices(filtered);

console.log('=== Каталог PIR плит с фольгой (400-700 руб.) ===');
catalog.forEach(product => {
  console.log(`${product.title}`);
  console.log(`  Цена: ${product.priceFormatted}`);
  console.log(`  Толщина: ${product.thickness} мм`);
  console.log(`  Площадь: ${product.area} м²`);
  console.log('---');
});
```

### Пример 2: Акционные предложения

```javascript
const {
  products,
  filterPromoProducts,
  sortByPriority,
  calculateDiscount,
  calculateSavings
} = require('./data/products');

// Получаем акционные товары
const promoProducts = filterPromoProducts(products);

// Сортируем по приоритету
const sorted = sortByPriority(promoProducts);

console.log('=== АКЦИИ ===');
sorted.forEach(product => {
  const discount = calculateDiscount(product);
  const savings = calculateSavings(product);

  console.log(`${product.title}`);
  console.log(`  Скидка: ${discount}%`);
  console.log(`  Старая цена: ${product.oldPrice} руб.`);
  console.log(`  Новая цена: ${product.price} руб.`);
  console.log(`  Экономия: ${savings} руб.`);
  console.log('---');
});
```

### Пример 3: Калькулятор материалов

```javascript
const {
  products,
  filterByMaterial,
  filterByThickness,
  calculatePacksForArea,
  findProductById
} = require('./data/products');

// Пользователь хочет утеплить 80 м² с помощью фольгированной плиты 30 мм
const targetArea = 80;
const material = 'foil';
const thickness = 30;

// Находим подходящие товары
let suitable = filterByMaterial(products, material);
suitable = filterByThickness(suitable, thickness);

if (suitable.length === 0) {
  console.log('Подходящие товары не найдены');
} else {
  const product = suitable[0];
  const calculation = calculatePacksForArea(product, targetArea);

  // Расчет клея-пены
  const glue = findProductById(products, 'glue-foam');
  const glueBottles = Math.ceil(targetArea / (glue?.coverage || 10));
  const glueCost = glueBottles * (glue?.price || 1050);

  console.log('=== Расчет материалов ===');
  console.log(`Площадь утепления: ${targetArea} м²`);
  console.log(`Выбранный товар: ${product.title}`);
  console.log('');
  console.log('PIR плиты:');
  console.log(`  Упаковок: ${calculation.packs} шт.`);
  console.log(`  Цена упаковки: ${calculation.packPrice} руб.`);
  console.log(`  Итого площадь: ${calculation.totalArea} м²`);
  console.log(`  Итого стоимость: ${calculation.totalPrice} руб.`);
  console.log('');
  console.log('Клей-пена:');
  console.log(`  Баллонов: ${glueBottles} шт.`);
  console.log(`  Стоимость: ${glueCost} руб.`);
  console.log('');
  console.log(`ИТОГО: ${calculation.totalPrice + glueCost} руб.`);
}
```

### Пример 4: Сравнение товаров

```javascript
const {
  findProductById,
  calculateQuantityForArea,
  getPricePerSquareMeter
} = require('./data/products');

const targetArea = 50; // м²

// Товары для сравнения
const productIds = ['pir-foil-30', 'pir-foil-100', 'pir-craft-30'];

console.log(`=== Сравнение товаров для ${targetArea} м² ===\n`);

productIds.forEach(id => {
  const product = findProductById(products, id);
  if (!product) return;

  const calculation = calculateQuantityForArea(product, targetArea);
  const pricePerM2 = getPricePerSquareMeter(product);

  console.log(`${product.title}`);
  console.log(`  Толщина: ${product.thickness} мм`);
  console.log(`  Площадь плиты: ${product.area} м²`);
  console.log(`  Цена за плиту: ${product.price} руб.`);
  console.log(`  Цена за м²: ${pricePerM2} руб./м²`);
  console.log(`  Потребуется: ${calculation.quantity} шт.`);
  console.log(`  Общая стоимость: ${calculation.totalPrice} руб.`);
  console.log('---');
});
```

### Пример 5: Поиск и фильтрация

```javascript
const {
  products,
  searchProducts,
  filterByStock,
  sortByPrice
} = require('./data/products');

// Ищем товары для бани
let results = searchProducts(products, 'бани');

// Оставляем только те, что в наличии
results = filterByStock(results, true);

// Сортируем по цене
results = sortByPrice(results, 'asc');

console.log('=== Товары для бани (в наличии) ===');
results.forEach(product => {
  console.log(`${product.title} - ${product.price} руб.`);
});
```

---

## Использование в API (app.js)

### Пример роута для фильтрации

```javascript
// В app.js
const {
  products,
  filterProducts,
  sortByPrice,
  addFormattedPrices
} = require('./data/products');

// API endpoint для фильтрации товаров
app.get('/api/products/filter', (req, res) => {
  const { category, material, minPrice, maxPrice, thickness, inStock, sort } = req.query;

  // Применяем фильтры
  let filtered = filterProducts(products, {
    category,
    material,
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    thickness: thickness ? parseInt(thickness) : undefined,
    inStock: inStock === 'true'
  });

  // Сортируем если нужно
  if (sort === 'price_asc') {
    filtered = sortByPrice(filtered, 'asc');
  } else if (sort === 'price_desc') {
    filtered = sortByPrice(filtered, 'desc');
  }

  // Добавляем форматированные цены
  const result = addFormattedPrices(filtered);

  res.json(result);
});
```

### Пример роута для поиска

```javascript
// API endpoint для поиска
app.get('/api/products/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter required' });
  }

  const results = searchProducts(products, q);
  const formatted = addFormattedPrices(results);

  res.json(formatted);
});
```

---

## Заключение

Эти функции предоставляют мощный и гибкий инструментарий для работы с товарами. Вы можете комбинировать их для создания сложной логики фильтрации, поиска и обработки данных о товарах.
