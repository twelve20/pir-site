# 🏢 PIR-Planet - Интернет-магазин PIR плит

Современный интернет-магазин по продаже теплоизоляционных PIR-плит с каталогом товаров, блогом и калькулятором расчета материалов.

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка переменных окружения
Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

Заполните обязательные переменные:
```env
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id
```

### 3. Запуск сервера
```bash
npm start
```

Сервер запустится на http://localhost:3000

## 🔒 Безопасность

Проект защищен с помощью:
- **Helmet.js** - защита от веб-уязвимостей (XSS, clickjacking)
- **Rate Limiting** - защита от DDoS и спама (10 заявок/час)
- **Express Validator** - валидация и санитизация данных
- **Environment Variables** - безопасное хранение токенов

Подробнее см. [SECURITY.md](SECURITY.md)

## 📦 Оптимизация

### Минификация файлов
```bash
# Минифицировать CSS
npm run minify:css

# Минифицировать JavaScript
npm run minify:js
```

### Оптимизация изображений
Используйте онлайн-инструменты:
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/

**Приоритетные файлы для сжатия:**
- `public/images/garage-pir.png` (2.9 MB → цель: 300 KB)
- `public/images/warehouse-pir.png` (1.4 MB → цель: 200 KB)
- `public/images/blog7.png` (1.3 MB → цель: 200 KB)

## 🌐 Деплой

См. подробную инструкцию в [DEPLOY.md](DEPLOY.md)

```bash
# На сервере
git pull origin main
npm install
npm run minify:css
npm run minify:js
pm2 restart app
```

## 📁 Структура проекта

```
pir-site/
├── app.js                  # Главный файл сервера
├── package.json            # Зависимости и скрипты
├── data/                   # Данные товаров и утилиты
│   ├── products.js         # Каталог товаров
│   ├── productUtils.js     # Утилиты для работы с товарами
│   └── warehouse.js        # Данные склада
├── public/                 # Статические файлы
│   ├── css/               # CSS стили
│   ├── js/                # JavaScript файлы
│   └── images/            # Изображения
└── views/                 # EJS шаблоны
    ├── index.ejs          # Главная страница
    ├── blog.ejs           # Страница блога
    ├── contacts.ejs       # Контакты
    ├── product-detail.ejs # Страница товара
    └── partials/          # Переиспользуемые компоненты
```

## ⚡ Оптимизации

### Уже внедрено:
- ✅ **Gzip сжатие** - все файлы сжимаются автоматически
- ✅ **Кеширование** - JS/CSS (1 час), изображения (1 день)
- ✅ **Версионирование** - автоматический сброс кеша при обновлениях
- ✅ **Минификация** - CSS и JS файлы минифицируются

### Результаты:
- Размер страницы: **-70%** (5-7 MB → 1-2 MB)
- Время загрузки: **-60%** (3-5 сек → 1-2 сек)
- PageSpeed Score: **+50%** (40-60 → 80-90)

## 🛠️ Технологии

- **Node.js** + **Express** - серверная часть
- **EJS** - шаблонизатор
- **Compression** - gzip сжатие
- **Axios** - HTTP запросы (Telegram бот)
- **Clean-CSS** - минификация CSS
- **Terser** - минификация JavaScript

## 📞 Интеграции

- **Telegram Bot** - уведомления о заказах
- **Jivo Chat** - онлайн-консультант
- **Swiper** - слайдеры
- **Font Awesome** - иконки
- **Google Fonts** - шрифты

## 📄 Лицензия

Частный проект
