const express = require('express');
const path = require('path');
// Импортируем данные о товарах
const { specialProducts, regularProducts } = require('./data/products');
const { featuredProjects, allProjects } = require('./data/projects');
const articles = require('./data/articles');
const { documents, allDocumentsLink } = require('./data/documents');

const app = express();
const PORT = 3000;

// Настройка EJS как шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')))

// Роутинг
// Роутинг
app.get('/', (req, res) => {
    res.render('index', {
        specialProducts, // Акционные товары
        regularProducts, // Обычные товары
        projects: featuredProjects // Проекты для главной страницы
    });
});

app.get('/blog', (req, res) => {
    res.render('blog', { articles }); // Передаем данные о статьях
});

app.get('/documents', (req, res) => {
    res.render('documents', { documents, allDocumentsLink }); // Передаем данные о документах
});

app.get('/projects', (req, res) => {
    res.render('projects', { projects: allProjects }); // Передаем данные о всех проектах
});

app.get('/contacts', (req, res) => {
    res.render('contacts');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});