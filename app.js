const express = require('express');
const path = require('path');
const axios = require('axios'); // Для отправки HTTP-запросов

// Импортируем данные о товарах
const { specialProducts, regularProducts } = require('./data/products');
const { featuredProjects, allProjects } = require('./data/projects');
const { documents, allDocumentsLink } = require('./data/documents');
const blogPosts = require('./data/blog-posts'); // Переименовано в blogPosts
const warehouse = require('./data/warehouse'); // Данные о складе

const app = express();
const PORT = 3000;

// Настройка middleware
app.use(express.json()); // Для парсинга JSON
app.use(express.urlencoded({ extended: true })); // Для парсинга данных из форм
app.use(express.static(path.join(__dirname, 'public')));

// Настройка EJS как шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Конфигурация Telegram Bot
const TELEGRAM_BOT_TOKEN = '7606877003:AAFgoTDB23-GSuQVcqmECZywH-FrNk2UDj8'; // Замените на ваш токен
const TELEGRAM_CHAT_ID = '-4648477237'; // Замените на ваш chat_id

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')))

// Роутинг
app.get('/', (req, res) => {
    res.render('index', {
        specialProducts, // Акционные товары
        regularProducts, // Обычные товары
        projects: featuredProjects // Проекты для главной страницы
    });
});

app.get('/blog', (req, res) => {
    res.render('blog', { articles: blogPosts }); // Передаем данные о статьях (переименовано в blogPosts)
});

// Роутинг для отдельных статей
app.get('/article/:id', (req, res) => {
    const articleId = req.params.id; // Получаем ID статьи из URL
    const article = blogPosts.find(a => a.id === articleId); // Находим статью по ID

    if (article) {
        res.render('article', { article }); // Передаем данные о статье
    } else {
        res.status(404).render('404'); // Если статья не найдена, показываем страницу 404
    }
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

// Роут для обработки формы
app.post('/submit-form', async (req, res) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ message: 'Пожалуйста, заполните все поля.' });
    }

    // Формируем текст сообщения
    const message = `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}`;

    try {
        // Отправляем сообщение в Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });

        console.log('Заявка успешно отправлена в Telegram:', { name, phone });

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