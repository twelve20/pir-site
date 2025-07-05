const express = require('express');
const path = require('path');
const axios = require('axios'); // Для отправки HTTP-запросов

// Импортируем данные о товарах
const { specialProducts, regularProducts, installationProducts } = require('./data/products');
const { featuredProjects, allProjects } = require('./data/projects');
const { documents, allDocumentsLink } = require('./data/documents');
const warehouse = require('./data/warehouse'); // Данные о складе

const app = express();
const PORT = 3000;

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

// Настройка middleware
app.use(express.json()); // Для парсинга JSON
app.use(express.urlencoded({ extended: true })); // Для парсинга данных из форм
app.use(express.static(path.join(__dirname, 'public')));
app.use(getClientIP); // Добавляем middleware для IP

// Настройка EJS как шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Конфигурация Telegram Bot
const TELEGRAM_BOT_TOKEN = '7782157467:AAEs683d-Y-IjYjBnzrWfzHklAwqecP1SWY'; // Замените на ваш токен
const TELEGRAM_CHAT_ID = '-4667528349'; // Замените на ваш chat_id

// Функция для получения информации о товаре по ID
const getProductById = (productId) => {
    // Ищем в обычных товарах
    let product = regularProducts.find(p => p.id === productId);
    if (product) return { ...product, category: 'regular' };
    
    // Ищем в товарах для монтажа
    product = installationProducts.find(p => p.id === productId);
    if (product) return { ...product, category: 'installation' };
    
    // Ищем в акционных товарах
    product = specialProducts.find(p => p.id === productId);
    if (product) return { ...product, category: 'special' };
    
    return null;
};

// API для корзины
// Получить корзину
app.get('/api/cart', (req, res) => {
    const ip = req.clientIP;
    const cart = carts[ip] || { items: [], total: 0, count: 0 };
    res.json(cart);
});

// Добавить товар в корзину
app.post('/api/cart/add', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const ip = req.clientIP;
    
    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
    }
    
    const product = getProductById(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    // Инициализируем корзину если её нет
    if (!carts[ip]) {
        carts[ip] = { items: [], total: 0, count: 0, lastUpdated: new Date() };
    }
    
    // Извлекаем цену из строки
    const price = parseInt(product.price.replace(/[^\d]/g, ''));
    
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
app.put('/api/cart/update', (req, res) => {
    const { productId, quantity } = req.body;
    const ip = req.clientIP;
    
    if (!carts[ip] || !productId || quantity < 0) {
        return res.status(400).json({ error: 'Invalid request' });
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

// Удалить товар из корзины
app.delete('/api/cart/remove', (req, res) => {
    const { productId } = req.body;
    const ip = req.clientIP;
    
    if (!carts[ip] || !productId) {
        return res.status(400).json({ error: 'Invalid request' });
    }
    
    carts[ip].items = carts[ip].items.filter(item => item.productId !== productId);
    
    // Пересчитываем итоги
    carts[ip].total = carts[ip].items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    carts[ip].count = carts[ip].items.reduce((sum, item) => sum + item.quantity, 0);
    carts[ip].lastUpdated = new Date();
    
    res.json({ success: true, cart: carts[ip] });
});

// Очистить корзину
app.post('/api/cart/clear', (req, res) => {
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
        installationProducts, // Товары для монтажа
        projects: featuredProjects, // Проекты для главной страницы
        cart // Передаем корзину
    });
});

app.get('/blog', (req, res) => {
    // Статические данные для блога
    const articles = [
        {
            title: 'Утепление балкона и лоджии PIR-плитами: от холодного склада к уютной комнате',
            description: 'Пошаговое руководство по утеплению балкона PIR-плитами. Превратите холодное помещение в уютную комнату. Инструкция, расчеты, советы экспертов.',
            date: '31 мая 2025',
            readTime: '6 минут',
            image: { src: '/images/blog7.png', alt: 'Утепление балкона PIR-плитами' },
            url: '/uteplenie-balkona-pir'
        },
        {
            title: 'Как утеплить пол над холодным подвалом с помощью PIR-плит: инструкция и преимущества',
            description: 'Узнайте, как эффективно утеплить пол над холодным подвалом с помощью PIR-плит. Преимущества материала: влагостойкость, огнестойкость, экологичность.',
            date: '2 января 2025',
            readTime: '4 минуты',
            image: { src: '/images/blog1.jpg', alt: 'Утепление пола над холодным подвалом PIR-плитами' },
            url: '/uteplenie-pola-nad-podvalom'
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
            title: 'Утепление фасада дома под штукатурку с помощью PIR-плит: инструкция и преимущества',
            description: 'Узнайте, как правильно утеплить фасад дома под штукатурку с помощью PIR-плит. Преимущества материала: влагостойкость, долговечность, экологичность.',
            date: '17 января 2025',
            readTime: '5 минут',
            image: { src: '/images/blog3.jpg', alt: 'Утепление фасада дома PIR-плитами' },
            url: '/uteplenie-fasada-pir'
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
            title: 'Как утеплить мансарду с помощью PIR-плит: полное руководство от экспертов',
            description: 'Пошаговая инструкция по утеплению мансарды PIR-плитами. Схемы утепления, расчет материалов, практические советы. Читайте экспертное руководство!',
            date: '30 мая 2025',
            readTime: '8 минут',
            image: { src: '/images/blog5.jpg', alt: 'Утепление мансарды PIR-плитами' },
            url: '/uteplenie-mansardy-pir'
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
            title: 'Преимущества покупки PIR-плит с нашего склада: быстрая доставка и гарантия качества',
            description: 'Узнайте о преимуществах покупки PIR-плит с нашего склада. Быстрая доставка по Москве и области, гарантия качества, конкурентные цены.',
            date: '15 января 2025',
            readTime: '3 минуты',
            image: { src: '/images/blog6.jpg', alt: 'Склад PIR-плит' },
            url: '/preimushchestva-sklada-pir'
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

// API endpoint для получения данных о продуктах для калькулятора
app.get('/api/products', (req, res) => {
    // Преобразуем данные из data/products.js в формат для калькулятора
    const calculatorProducts = {};
    
    // Обрабатываем обычные продукты
    regularProducts.forEach(product => {
        // Извлекаем числовое значение цены
        const price = parseInt(product.price.replace(/[^\d]/g, ''));
        const oldPrice = product.oldPrice ? parseInt(product.oldPrice.replace(/[^\d]/g, '')) : null;
        
        // Определяем площадь в зависимости от продукта
        let area = 0.72; // Стандартная площадь для большинства плит
        if (product.id === 'pir-foil-100') {
            area = 2.88; // Специальная площадь для 100 мм плиты
        }
        
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
    
    // Данные о клей-пене
    const glueProduct = installationProducts.find(p => p.id === 'glue-foam');
    const gluePrice = glueProduct ? parseInt(glueProduct.price.replace(/[^\d]/g, '')) : 1050;
    
    res.json({
        products: calculatorProducts,
        glue: {
            price: gluePrice,
            coverage: 10 // м² на баллон
        }
    });
});

// Роут для оформления заказа из корзины
app.post('/submit-cart-order', async (req, res) => {
    const { name, phone, email, comment } = req.body;
    const ip = req.clientIP;
    
    if (!name || !phone || !email) {
        return res.status(400).json({ message: 'Пожалуйста, заполните все обязательные поля.' });
    }
    
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

// Роут для обработки формы
app.post('/submit-form', async (req, res) => {
    const { name, phone, email, comment, formType } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ message: 'Пожалуйста, заполните все поля.' });
    }

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
app.post('/submit-buy-form', async (req, res) => {
    const { name, phone, email, comment } = req.body;

    if (!name || !phone || !email) {
        return res.status(400).json({ message: 'Пожалуйста, заполните все обязательные поля.' });
    }

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
app.post('/submit-cta-form', async (req, res) => {
    const { name, phone, comment } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ message: 'Пожалуйста, заполните все обязательные поля.' });
    }

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
