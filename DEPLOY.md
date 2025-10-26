# Инструкция по обновлению сайта на сервере

## Проблема
Локально всё работает, но на удаленном сервере изменения не применяются (старая версия JS/CSS).

## Причина
Кеширование статических файлов браузером и/или сервером.

## Решение

### 1. Обновите код на сервере

```bash
# Подключитесь к серверу
ssh user@your-server.com

# Перейдите в папку проекта
cd /path/to/pir-site

# Получите последние изменения
git pull origin main

# Установите зависимости (если обновлялись)
npm install
```

### 2. Перезапустите Node.js процесс

**Если используете PM2:**
```bash
pm2 restart app
# или
pm2 restart all
```

**Если используете systemd:**
```bash
sudo systemctl restart pir-site
```

**Если запускаете вручную:**
```bash
# Найдите процесс
ps aux | grep node

# Остановите
pkill node

# Запустите заново
npm start
```

### 3. Очистите кеш

**На сервере (если используете Nginx/Apache):**

Для Nginx добавьте в конфигурацию:
```nginx
location ~* \.(js|css)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

**Для пользователей (инструкция):**

1. **Chrome/Edge:** Ctrl + Shift + Delete → Очистить кеш
2. **Firefox:** Ctrl + Shift + Delete → Кеш
3. **Safari:** Cmd + Option + E
4. Или просто Ctrl + F5 (жесткая перезагрузка)

### 4. Проверьте обновление

Откройте DevTools (F12) → вкладка Network → перезагрузите страницу и проверьте:
- `details.js?v=2.0` должен загружаться с кодом 200
- В файле должна быть актуальная версия кода

### 5. Если не помогло

```bash
# Полная очистка кеша npm
npm cache clean --force

# Удалить node_modules и переустановить
rm -rf node_modules
npm install

# Перезапустить сервер
pm2 restart app --update-env
```

## Изменения в коде

### index.ejs
Добавлены параметры версии к JS файлам:
```html
<script src="/js/details.js?v=2.0"></script>
```

### app.js
Добавлены заголовки Cache-Control для статических файлов:
```javascript
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
            res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 час
        }
    }
}));
```

## Проверка что всё работает

1. Откройте главную страницу
2. Найдите карточку "Клей-пена для PIR"
3. Проверьте что:
   - Цена отображается (1050 руб.)
   - Кнопка "Подробнее" работает
   - Модальное окно открывается с информацией

## Версионирование в будущем

При следующих обновлениях JS/CSS меняйте версию:
```html
<!-- Было -->
<script src="/js/details.js?v=2.0"></script>

<!-- Стало -->
<script src="/js/details.js?v=2.1"></script>
```

Это заставит браузеры загрузить новую версию файла.
