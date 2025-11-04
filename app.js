// Загрузка переменных окружения
require('dotenv').config();

const express = require('express');
const path = require('path');
const axios = require('axios');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

// Импортируем данные о товарах и утилиты
const {
  products,
  regularProducts,
  pirrogroupProducts,
  technonicolProducts,
  installationProducts,
  specialProducts,
  getProductById,
  getProductsByCategory,
  // Фильтрация
  filterProducts,
  filterByMaterial,
  filterByThickness,
  filterByPriceRange,
  filterPromoProducts,
  filterByStock,
  // Сортировка
  sortByPrice,
  sortByThickness,
  sortByTitle,
  sortByPriority,
  // Поиск
  searchProducts,
  findProductById,
  // Утилиты
  addFormattedPrices,
  getProductStats
} = require('./data/products');
const { featuredProjects, allProjects } = require('./data/projects');
const { documents, allDocumentsLink } = require('./data/documents');
const warehouse = require('./data/warehouse'); // Данные о складе

const app = express();
const PORT = process.env.PORT || 3000;

// Хранилище корзин в памяти (привязка к IP)
const carts = {};

// Функция для очистки старых корзин (старше 24 часов)
const cleanOldCarts = () => {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    Object.keys(carts).forEach(ip => {
        if (new Date(carts[ip].lastUpdated) < dayAgo) {
            delete carts[ip];
        }
    });
};

// Запускаем очистку каждый час
setInterval(cleanOldCarts, 60 * 60 * 1000);

// Middleware для получения IP адреса
const getClientIP = (req, res, next) => {
    req.clientIP = req.headers['x-forwarded-for'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
                   req.ip;
    
    // Обработка IPv6 localhost
    if (req.clientIP === '::1' || req.clientIP === '::ffff:127.0.0.1') {
        req.clientIP = '127.0.0.1';
    }
    
    next();
};

// ============================================
// БЕЗОПАСНОСТЬ
// ============================================

// Helmet - защита от известных веб-уязвимостей
app.use(helmet({
    contentSecurityPolicy: false, // Временно отключаем CSP для диагностики
    hsts: {
        maxAge: 31536000, // 1 год
        includeSubDomains: true,
        preload: true
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Rate limiting - защита от DDoS и брутфорса
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 минут
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Максимум 100 запросов
    message: 'Слишком много запросов с этого IP, попробуйте позже.',
    standardHeaders: true,
    legacyHeaders: false,
    // Исключаем статические файлы из лимита
    skip: (req) => {
        return req.path.startsWith('/css/') ||
               req.path.startsWith('/js/') ||
               req.path.startsWith('/images/');
    }
});

// Более строгий лимит для API эндпоинтов
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 20, // Максимум 20 запросов к API
    message: 'Слишком много запросов к API, попробуйте позже.'
});

// Строгий лимит для Telegram отправки
const telegramLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 час
    max: 10, // Максимум 10 сообщений в час
    message: 'Слишком много заявок. Попробуйте позже или позвоните нам.'
});

app.use(limiter);

// Настройка middleware
app.use(compression()); // Включаем gzip/deflate сжатие
app.use(express.json({ limit: '10mb' })); // Ограничение размера JSON
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Ограничение размера форм

// Настройка статических файлов с контролем кеша
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        // Для JS и CSS файлов устанавливаем короткое время кеша
        if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
            res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 час
        } else if (filePath.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
            // Для изображений - длинное кеширование
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 день
        }
    }
}));

app.use(getClientIP); // Добавляем middleware для IP

// Настройка EJS как шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Конфигурация Telegram Bot из переменных окружения
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Проверка наличия обязательных переменных окружения
if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('ОШИБКА: Не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID в .env файле');
    process.exit(1);
}

// Функция getProductById теперь импортируется из data/products.js

// ============================================
// API ДЛЯ КОРЗИНЫ
// ============================================

// Получить корзину
app.get('/api/cart', apiLimiter, (req, res) => {
    const ip = req.clientIP;
    const cart = carts[ip] || { items: [], total: 0, count: 0 };
    res.json(cart);
});

// Валидация для корзины
const validateCartItem = [
    body('productId').trim().isLength({ min: 1, max: 100 }).withMessage('Product ID обязателен'),
    body('quantity').optional().isInt({ min: 1, max: 1000 }).withMessage('Количество должно быть от 1 до 1000')
];

// Добавить товар в корзину
app.post('/api/cart/add', apiLimiter, validateCartItem, (req, res) => {
    // Проверка результатов валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Ошибка валидации данных',
            details: errors.array().map(e => e.msg)
        });
    }

    const { productId, quantity = 1 } = req.body;
    const ip = req.clientIP;
    
    const product = getProductById(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    // Инициализируем корзину если её нет
    if (!carts[ip]) {
        carts[ip] = { items: [], total: 0, count: 0, lastUpdated: new Date() };
    }
    
    // Получаем цену (теперь уже в числовом формате)
    const price = typeof product.price === 'number' ? product.price : parseInt(product.price.replace(/[^\d]/g, ''));
    
    // Проверяем, есть ли уже этот товар в корзине
    const existingItem = carts[ip].items.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        carts[ip].items.push({
            productId: productId,
            title: product.title,
            price: price,
            quantity: quantity,
            image: product.image
        });
    }
    
    // Пересчитываем итоги
    carts[ip].total = carts[ip].items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    carts[ip].count = carts[ip].items.reduce((sum, item) => sum + item.quantity, 0);
    carts[ip].lastUpdated = new Date();
    
    res.json({ success: true, cart: carts[ip] });
});

// Обновить количество товара в корзине
app.put('/api/cart/update', apiLimiter, validateCartItem, (req, res) => {
    // Проверка результатов валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Ошибка валидации данных',
            details: errors.array().map(e => e.msg)
        });
    }

    const { productId, quantity } = req.body;
    const ip = req.clientIP;

    if (!carts[ip]) {
        return res.status(400).json({ error: 'Корзина не найдена' });
    }
    
    const item = carts[ip].items.find(item => item.productId === productId);
    if (!item) {
        return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    if (quantity === 0) {
        // Удаляем товар из корзины
        carts[ip].items = carts[ip].items.filter(item => item.productId !== productId);
    } else {
        item.quantity = quantity;
    }
    
    // Пересчитываем итоги
    carts[ip].total = carts[ip].items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    carts[ip].count = carts[ip].items.reduce((sum, item) => sum + item.quantity, 0);
    carts[ip].lastUpdated = new Date();
    
    res.json({ success: true, cart: carts[ip] });
});

// Валидация для удаления из корзины
const validateCartRemove = [
    body('productId').trim().isLength({ min: 1, max: 100 }).withMessage('Product ID обязателен')
];

// Удалить товар из корзины
app.delete('/api/cart/remove', apiLimiter, validateCartRemove, (req, res) => {
    // Проверка результатов валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Ошибка валидации данных',
            details: errors.array().map(e => e.msg)
        });
    }

    const { productId } = req.body;
    const ip = req.clientIP;

    if (!carts[ip]) {
        return res.status(400).json({ error: 'Корзина не найдена' });
    }
    
    carts[ip].items = carts[ip].items.filter(item => item.productId !== productId);
    
    // Пересчитываем итоги
    carts[ip].total = carts[ip].items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    carts[ip].count = carts[ip].items.reduce((sum, item) => sum + item.quantity, 0);
    carts[ip].lastUpdated = new Date();
    
    res.json({ success: true, cart: carts[ip] });
});

// Очистить корзину
app.post('/api/cart/clear', apiLimiter, (req, res) => {
    const ip = req.clientIP;
    carts[ip] = { items: [], total: 0, count: 0, lastUpdated: new Date() };
    res.json({ success: true, cart: carts[ip] });
});

// Страницы корзины и оформления заказа
app.get('/cart', (req, res) => {
    const ip = req.clientIP;
    const cart = carts[ip] || { items: [], total: 0, count: 0 };
    res.render('cart', { cart });
});

app.get('/checkout', (req, res) => {
    const ip = req.clientIP;
    const cart = carts[ip] || { items: [], total: 0, count: 0 };
    
    if (cart.items.length === 0) {
        return res.redirect('/cart');
    }
    
    res.render('checkout', { cart });
});

// Роутинг
app.get('/', (req, res) => {
    const ip = req.clientIP;
    const cart = carts[ip] || { items: [], total: 0, count: 0 };

    res.render('index', {
        specialProducts, // Акционные товары
        regularProducts, // Обычные товары
        pirrogroupProducts, // PIR плиты PirroGroup
        technonicolProducts, // PIR плиты Технониколь
        installationProducts, // Товары для монтажа
        projects: featuredProjects, // Проекты для главной страницы
        cart // Передаем корзину
    });
});

app.get('/blog', (req, res) => {
    // Статические данные для блога
    const articles = [
        {
            title: 'Утепление гаража PIR-плитами: как создать комфортное пространство круглый год',
            description: 'Полное руководство по утеплению гаража с помощью PIR-плит. Инструкция по монтажу, расчет материалов, преимущества технологии. Сделайте гараж теплым и уютным!',
            date: '5 июня 2025',
            readTime: '6 минут',
            image: { src: '/images/garage-pir.png', alt: 'Утепление гаража PIR-плитами' },
            url: '/uteplenie-garazha-pir'
        },
        {
            title: 'Утепление балкона и лоджии PIR-плитами: от холодного склада к уютной комнате',
            description: 'Пошаговое руководство по утеплению балкона PIR-плитами. Превратите холодное помещение в уютную комнату. Инструкция, расчеты, советы экспертов.',
            date: '31 мая 2025',
            readTime: '6 минут',
            image: { src: '/images/blog7.png', alt: 'Утепление балкона PIR-плитами' },
            url: '/uteplenie-balkona-pir'
        },
        {
            title: 'Утепление бани и сауны PIR-плитами: полное руководство от экспертов',
            description: 'Как правильно утеплить баню и сауну PIR-плитами. Технология монтажа в условиях высоких температур и влажности. Экспертное руководство!',
            date: '30 мая 2025',
            readTime: '7 минут',
            image: { src: '/images/sauna.jpg', alt: 'Утепление бани и сауны PIR-плитами' },
            url: '/uteplenie-bani-sauny-pir'
        },
        {
            title: 'Как утеплить мансарду с помощью PIR-плит: полное руководство от экспертов',
            description: 'Пошаговая инструкция по утеплению мансарды PIR-плитами. Схемы утепления, расчет материалов, практические советы. Читайте экспертное руководство!',
            date: '30 мая 2025',
            readTime: '8 минут',
            image: { src: '/images/blog5.jpg', alt: 'Утепление мансарды PIR-плитами' },
            url: '/uteplenie-mansardy-pir'
        },
        {
            title: 'Как утеплить крышу, кровлю и мансарду с помощью PIR-плит: преимущества и инструкция',
            description: 'Узнайте, почему PIR-плиты – лучший выбор для утепления крыши, кровли и мансарды. Преимущества материала: высокая теплоизоляция, долговечность, влагостойкость.',
            date: '2 февраля 2025',
            readTime: '6 минут',
            image: { src: '/images/blog4.jpg', alt: 'Утепление крыши PIR-плитами' },
            url: '/uteplenie-kryshi-pir'
        },
        {
            title: 'Утепление фасада дома под штукатурку с помощью PIR-плит: инструкция и преимущества',
            description: 'Узнайте, как правильно утеплить фасад дома под штукатурку с помощью PIR-плит. Преимущества материала: влагостойкость, долговечность, экологичность.',
            date: '17 января 2025',
            readTime: '5 минут',
            image: { src: '/images/blog3.jpg', alt: 'Утепление фасада дома PIR-плитами' },
            url: '/uteplenie-fasada-pir'
        },
        {
            title: 'Преимущества утепления складов и промышленных объектов PIR-плитами',
            description: 'Узнайте о преимуществах утепления складов и промышленных объектов с помощью PIR-плит. Экономия до 60% на отоплении, быстрая окупаемость, долговечность.',
            date: '15 января 2025',
            readTime: '7 минут',
            image: { src: '/images/warehouse-pir.png', alt: 'Утепление складов PIR-плитами' },
            url: '/uteplenie-skladov-pir'
        },
        {
            title: 'Как утеплить пол над холодным подвалом с помощью PIR-плит: инструкция и преимущества',
            description: 'Узнайте, как эффективно утеплить пол над холодным подвалом с помощью PIR-плит. Преимущества материала: влагостойкость, огнестойкость, экологичность.',
            date: '2 января 2025',
            readTime: '4 минуты',
            image: { src: '/images/blog1.jpg', alt: 'Утепление пола над холодным подвалом PIR-плитами' },
            url: '/uteplenie-pola-nad-podvalom'
        }
    ];
    res.render('blog', { articles });
});

app.get('/documents', (req, res) => {
    res.render('documents', { documents, allDocumentsLink }); // Передаем данные о документах
});

app.get('/projects', (req, res) => {
    res.render('projects', { projects: allProjects }); // Передаем данные о всех проектах
});

app.get('/contacts', (req, res) => {
    res.render('contacts', { warehouse });
});

// Юридические страницы
app.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy');
});

app.get('/terms-of-use', (req, res) => {
    res.render('terms-of-use');
});

// Роут для страницы товара
app.get('/product/:id', (req, res) => {
    const { id } = req.params;
    console.log('=== Запрос страницы товара ===');
    console.log('ID товара:', id);
    console.log('Всего товаров в базе:', products.length);

    try {
        const product = findProductById(products, id);
        console.log('Результат поиска:', product ? `Найден: ${product.title}` : 'НЕ НАЙДЕН');

        if (!product) {
            console.log('Товар не найден, возвращаем 404');
            return res.status(404).render('404', {
                message: 'Товар не найден'
            });
        }

        // Добавляем форматированные данные
        console.log('Добавляем форматированные данные...');
        const formattedProduct = addFormattedPrices([product])[0];

        // Находим похожие товары (той же категории или материала)
        let similarProducts = products.filter(p =>
            p.id !== product.id &&
            (p.category === product.category || p.material === product.material)
        );

        // Ограничиваем количество похожих товаров
        similarProducts = sortByPriority(similarProducts).slice(0, 4);
        const formattedSimilar = addFormattedPrices(similarProducts);
        console.log('Похожих товаров найдено:', formattedSimilar.length);

        console.log('Рендерим страницу товара...');
        res.render('product-detail', {
            product: formattedProduct,
            similarProducts: formattedSimilar,
            warehouse
        });

    } catch (error) {
        console.error('!!! ОШИБКА при загрузке страницы товара:', error);
        console.error('Stack trace:', error.stack);
        res.status(500).render('404', {
            message: 'Произошла ошибка при загрузке товара'
        });
    }
});

// Роуты для отдельных статей
app.get('/uteplenie-pola-nad-podvalom', (req, res) => {
    res.render('floor-insulation-article');
});

app.get('/uteplenie-bani-pir', (req, res) => {
    res.render('bath-insulation-article');
});

app.get('/uteplenie-bani-sauny-pir', (req, res) => {
    res.render('sauna-insulation-article');
});

app.get('/uteplenie-fasada-pir', (req, res) => {
    res.render('facade-insulation-article');
});

app.get('/uteplenie-kryshi-pir', (req, res) => {
    res.render('roof-insulation-article');
});

app.get('/uteplenie-mansardy-pir', (req, res) => {
    res.render('mansard-insulation-article');
});

app.get('/preimushchestva-sklada-pir', (req, res) => {
    res.render('warehouse-advantages-article');
});

app.get('/uteplenie-skladov-pir', (req, res) => {
    res.render('warehouse-advantages-article');
});

app.get('/uteplenie-balkona-pir', (req, res) => {
    res.render('balcony-insulation-article');
});

app.get('/uteplenie-garazha-pir', (req, res) => {
    res.render('garage-insulation-article');
});

// API endpoint для получения данных о продуктах для калькулятора
app.get('/api/products', (req, res) => {
    // Преобразуем данные из data/products.js в формат для калькулятора
    const calculatorProducts = {};

    // Обрабатываем обычные продукты
    regularProducts.forEach(product => {
        // Получаем цену (теперь уже числовая)
        const price = typeof product.price === 'number' ? product.price : parseInt(product.price.replace(/[^\d]/g, ''));
        const oldPrice = product.oldPrice
            ? (typeof product.oldPrice === 'number' ? product.oldPrice : parseInt(product.oldPrice.replace(/[^\d]/g, '')))
            : null;

        // Используем площадь из данных товара
        const area = product.area || 0.72;

        calculatorProducts[product.id] = {
            price: price,
            oldPrice: oldPrice,
            name: product.title,
            isPromo: product.isPromo || false,
            area: area
        };
    });

    // Обрабатываем товары PirroGroup
    pirrogroupProducts.forEach(product => {
        const price = typeof product.price === 'number' ? product.price : parseInt(product.price.replace(/[^\d]/g, ''));
        const oldPrice = product.oldPrice
            ? (typeof product.oldPrice === 'number' ? product.oldPrice : parseInt(product.oldPrice.replace(/[^\d]/g, '')))
            : null;
        const area = product.area || 0.72;

        calculatorProducts[product.id] = {
            price: price,
            oldPrice: oldPrice,
            name: product.title,
            isPromo: product.isPromo || false,
            area: area
        };
    });

    // Обрабатываем товары Технониколь
    technonicolProducts.forEach(product => {
        const price = typeof product.price === 'number' ? product.price : parseInt(product.price.replace(/[^\d]/g, ''));
        const oldPrice = product.oldPrice
            ? (typeof product.oldPrice === 'number' ? product.oldPrice : parseInt(product.oldPrice.replace(/[^\d]/g, '')))
            : null;
        const area = product.area || 0.7;

        calculatorProducts[product.id] = {
            price: price,
            oldPrice: oldPrice,
            name: product.title,
            isPromo: product.isPromo || false,
            area: area
        };
    });

    // Добавляем специальный продукт для упаковки 600x1200
    calculatorProducts['pir-600x1200-30'] = {
        price: 720,
        name: 'PIR плита 600*1200*30 (8 шт в упаковке)',
        area: 5.76
    };

    // Данные о клей-пене (используем новые поля)
    const glueProduct = installationProducts.find(p => p.id === 'glue-foam');
    const gluePrice = glueProduct
        ? (typeof glueProduct.price === 'number' ? glueProduct.price : parseInt(glueProduct.price.replace(/[^\d]/g, '')))
        : 1050;
    const glueCoverage = glueProduct?.coverage || 10;

    res.json({
        products: calculatorProducts,
        glue: {
            price: gluePrice,
            coverage: glueCoverage // м² на баллон
        }
    });
});

// ============================================
// API ДЛЯ ФИЛЬТРАЦИИ И ПОИСКА ТОВАРОВ
// ============================================

// API endpoint для фильтрации товаров
app.get('/api/products/filter', (req, res) => {
    const {
        category,
        material,
        thickness,
        minPrice,
        maxPrice,
        inStock,
        isPromo,
        featured,
        sort
    } = req.query;

    try {
        // Создаем объект фильтров
        const filters = {};

        if (category) filters.category = category;
        if (material) filters.material = material;
        if (thickness) filters.thickness = parseInt(thickness);
        if (minPrice) filters.minPrice = parseInt(minPrice);
        if (maxPrice) filters.maxPrice = parseInt(maxPrice);
        if (inStock !== undefined) filters.inStock = inStock === 'true';
        if (isPromo !== undefined) filters.isPromo = isPromo === 'true';
        if (featured !== undefined) filters.featured = featured === 'true';

        // Применяем фильтры
        let filtered = filterProducts(products, filters);

        // Применяем сортировку
        if (sort) {
            switch (sort) {
                case 'price_asc':
                    filtered = sortByPrice(filtered, 'asc');
                    break;
                case 'price_desc':
                    filtered = sortByPrice(filtered, 'desc');
                    break;
                case 'thickness_asc':
                    filtered = sortByThickness(filtered, 'asc');
                    break;
                case 'thickness_desc':
                    filtered = sortByThickness(filtered, 'desc');
                    break;
                case 'title_asc':
                    filtered = sortByTitle(filtered, 'asc');
                    break;
                case 'title_desc':
                    filtered = sortByTitle(filtered, 'desc');
                    break;
                case 'priority':
                    filtered = sortByPriority(filtered);
                    break;
                default:
                    filtered = sortByPriority(filtered);
            }
        } else {
            filtered = sortByPriority(filtered); // По умолчанию
        }

        // Добавляем форматированные цены
        const result = addFormattedPrices(filtered);

        res.json({
            success: true,
            count: result.length,
            products: result
        });

    } catch (error) {
        console.error('Ошибка фильтрации товаров:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка при фильтрации товаров'
        });
    }
});

// API endpoint для поиска товаров
app.get('/api/products/search', (req, res) => {
    const { q, category, sort } = req.query;

    if (!q || q.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Поисковый запрос не может быть пустым'
        });
    }

    try {
        // Выполняем поиск
        let results = searchProducts(products, q);

        // Фильтруем по категории если указана
        if (category) {
            results = results.filter(p => p.category === category);
        }

        // Сортируем
        if (sort === 'price_asc') {
            results = sortByPrice(results, 'asc');
        } else if (sort === 'price_desc') {
            results = sortByPrice(results, 'desc');
        } else {
            results = sortByPriority(results);
        }

        // Добавляем форматированные цены
        const formatted = addFormattedPrices(results);

        res.json({
            success: true,
            query: q,
            count: formatted.length,
            products: formatted
        });

    } catch (error) {
        console.error('Ошибка поиска товаров:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка при поиске товаров'
        });
    }
});

// API endpoint для получения одного товара по ID
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;

    try {
        const product = findProductById(products, id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Товар не найден'
            });
        }

        // Добавляем форматированные данные
        const formatted = addFormattedPrices([product])[0];

        res.json({
            success: true,
            product: formatted
        });

    } catch (error) {
        console.error('Ошибка получения товара:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка при получении товара'
        });
    }
});

// API endpoint для получения статистики по товарам
app.get('/api/products/stats/summary', (req, res) => {
    try {
        const stats = getProductStats(products);

        res.json({
            success: true,
            stats
        });

    } catch (error) {
        console.error('Ошибка получения статистики:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка при получении статистики'
        });
    }
});

// Роут для оформления заказа из корзины
// Валидация для заказа из корзины
const validateCartOrder = [
    body('name').trim().isLength({ min: 2, max: 100 }).escape().withMessage('Имя должно быть от 2 до 100 символов'),
    body('phone').trim().matches(/^[\d\s\+\-\(\)]+$/).isLength({ min: 10, max: 20 }).withMessage('Неверный формат телефона'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Неверный формат email'),
    body('comment').optional().trim().isLength({ max: 500 }).escape().withMessage('Комментарий не должен превышать 500 символов')
];

app.post('/submit-cart-order', telegramLimiter, validateCartOrder, async (req, res) => {
    // Проверка результатов валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Ошибка валидации данных',
            errors: errors.array().map(e => e.msg)
        });
    }

    const { name, phone, email, comment } = req.body;
    const ip = req.clientIP;
    
    const cart = carts[ip];
    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Корзина пуста.' });
    }
    
    // Формируем детализированное сообщение для Telegram
    let itemsList = cart.items.map(item => 
        `• ${item.title} × ${item.quantity} шт. = ${(item.price * item.quantity).toLocaleString('ru-RU')}₽`
    ).join('\n');
    
    const telegramMessage = `🛒 НОВЫЙ ЗАКАЗ ИЗ КОРЗИНЫ:

👤 Клиент: ${name}
📞 Телефон: ${phone}
📧 Email: ${email}

🛍️ Товары:
${itemsList}

💰 Итого: ${cart.total.toLocaleString('ru-RU')}₽
💬 Комментарий: ${comment || 'Нет комментария'}
📍 IP: ${ip}`;

    try {
        // Отправляем сообщение в Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage
        });

        console.log('Заказ из корзины успешно отправлен в Telegram:', { name, phone, email, comment, cart: cart.items });

        // Очищаем корзину после успешного заказа
        carts[ip] = { items: [], total: 0, count: 0, lastUpdated: new Date() };

        // Отправляем успешный ответ клиенту
        res.status(200).json({ message: 'Заказ успешно отправлен!' });
    } catch (error) {
        console.error('Ошибка при отправке заказа в Telegram:', error.response?.data || error.message);
        res.status(500).json({ message: 'Не удалось отправить заказ. Попробуйте позже.' });
    }
});

// Валидация для общей формы
const validateContactForm = [
    body('name').trim().isLength({ min: 2, max: 100 }).escape().withMessage('Имя должно быть от 2 до 100 символов'),
    body('phone').trim().matches(/^[\d\s\+\-\(\)]+$/).isLength({ min: 10, max: 20 }).withMessage('Неверный формат телефона'),
    body('email').optional().trim().isEmail().normalizeEmail().withMessage('Неверный формат email'),
    body('comment').optional().trim().isLength({ max: 500 }).escape().withMessage('Комментарий не должен превышать 500 символов'),
    body('formType').optional().trim().isIn(['order', 'contact', 'callback']).withMessage('Неверный тип формы')
];

// Роут для обработки формы
app.post('/submit-form', telegramLimiter, validateContactForm, async (req, res) => {
    // Проверка результатов валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Ошибка валидации данных',
            errors: errors.array().map(e => e.msg)
        });
    }

    const { name, phone, email, comment, formType } = req.body;

    // Формируем текст сообщения в зависимости от типа формы
    let message = '';
    if (formType === 'order') {
        message = `🛒 НОВЫЙ ЗАКАЗ МАТЕРИАЛА:\n\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email || 'Не указан'}\nКомментарий: ${comment || 'Нет комментария'}`;
    } else if (formType === 'contact') {
        message = `📨 НОВОЕ СООБЩЕНИЕ С ФОРМЫ КОНТАКТОВ:\n\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email || 'Не указан'}\nСообщение: ${comment || 'Нет сообщения'}`;
    } else {
        message = `📞 Новая заявка на звонок:\n\nИмя: ${name}\nТелефон: ${phone}`;
    }

    try {
        // Отправляем сообщение в Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });

        console.log('Заявка успешно отправлена в Telegram:', { name, phone, email, comment, formType });

        // Отправляем успешный ответ клиенту
        res.status(200).json({ message: 'Заявка успешно отправлена!' });
    } catch (error) {
        console.error('Ошибка при отправке заявки в Telegram:', error.response?.data || error.message);
        res.status(500).json({ message: 'Не удалось отправить заявку. Попробуйте позже.' });
    }
});

// Роут для обработки формы "Оформить заказ"
app.post('/submit-buy-form', telegramLimiter, validateCartOrder, async (req, res) => {
    // Проверка результатов валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Ошибка валидации данных',
            errors: errors.array().map(e => e.msg)
        });
    }

    const { name, phone, email, comment } = req.body;

    // Формируем текст сообщения
    const telegramMessage = `Новый заказ:\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nКомментарий: ${comment || 'Нет комментария'}`;

    try {
        // Отправляем сообщение в Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage
        });

        console.log('Заказ успешно отправлен в Telegram:', { name, phone, email, comment });

        // Отправляем успешный ответ клиенту
        res.status(200).json({ message: 'Заказ успешно отправлен!' });
    } catch (error) {
        console.error('Ошибка при отправке заказа в Telegram:', error.response?.data || error.message);
        res.status(500).json({ message: 'Не удалось отправить заказ. Попробуйте позже.' });
    }
});

// Роут для обработки формы "Призыв к действию"
app.post('/submit-cta-form', telegramLimiter, validateContactForm, async (req, res) => {
    // Проверка результатов валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Ошибка валидации данных',
            errors: errors.array().map(e => e.msg)
        });
    }

    const { name, phone, comment } = req.body;

    // Формируем текст сообщения
    const telegramMessage = `Новая заявка с главной страницы:\nИмя: ${name}\nТелефон: ${phone}\nКомментарий: ${comment || 'Нет комментария'}`;

    try {
        // Отправляем сообщение в Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage
        });

        console.log('Заявка успешно отправлена в Telegram:', { name, phone, comment });

        // Отправляем успешный ответ клиенту
        res.status(200).json({ message: 'Заявка успешно отправлена!' });
    } catch (error) {
        console.error('Ошибка при отправке заявки в Telegram:', error.response?.data || error.message);
        res.status(500).json({ message: 'Не удалось отправить заявку. Попробуйте позже.' });
    }
});

// Обработка несуществующих страниц (404)
app.use((req, res) => {
    res.status(404).render('404');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
