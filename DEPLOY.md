# 🚀 Инструкция по деплою PIR-Planet

## Подготовка к деплою

### 1. Локальная подготовка

```bash
# 1. Убедитесь что все изменения закоммичены
git status

# 2. Запустите минификацию
npm run minify:css
npm run minify:js

# 3. Закоммитьте минифицированные файлы
git add public/css/*.min.css public/js/*.min.js
git commit -m "Build: minify CSS and JS"

# 4. Отправьте на сервер
git push origin main
```

### 2. Деплой на сервер

```bash
# Подключитесь к серверу
ssh user@your-server.com

# Перейдите в директорию проекта
cd /var/www/my-website/pir-site

# Получите последние изменения
git pull origin main

# Установите/обновите зависимости
npm install

# ВАЖНО: Создайте .env файл если его еще нет
nano .env
```

### 3. Настройка .env на сервере

Создайте файл `.env` со следующим содержимым:

```env
# Обязательные переменные
NODE_ENV=production
PORT=3000

# Telegram Bot (ваши реальные данные)
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id

# Безопасность
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Домен сайта
ALLOWED_ORIGIN=https://pir-planet.ru
```

**ВАЖНО:**
- Никогда не коммитьте `.env` файл в Git!
- Используйте настоящие токены Telegram Bot
- Для получения токена: напишите @BotFather в Telegram
- Для получения chat_id: напишите @userinfobot в Telegram

### 4. Запуск приложения

#### Вариант A: PM2 (рекомендуется)

```bash
# Первый запуск
pm2 start app.js --name pir-site

# Или перезапуск существующего
pm2 restart pir-site

# Автозапуск при перезагрузке сервера
pm2 startup
pm2 save

# Проверка статуса
pm2 status

# Просмотр логов
pm2 logs pir-site --lines 50
```

#### Вариант B: systemd

```bash
# Перезапуск службы
sudo systemctl restart pir-site

# Проверка статуса
sudo systemctl status pir-site

# Просмотр логов
sudo journalctl -u pir-site -n 50 -f
```

### 5. Проверка работоспособности

```bash
# Проверьте что приложение запущено
curl http://localhost:3000

# Проверьте логи на ошибки
pm2 logs pir-site --err --lines 20

# Проверьте процессы
pm2 list
```

## Устранение проблем

### Ошибка 502 Bad Gateway

**Причины:**
1. Node.js приложение не запущено
2. Ошибка в коде (проверьте логи)
3. Не установлены зависимости
4. Отсутствует .env файл

**Решение:**

```bash
# 1. Проверьте статус приложения
pm2 status

# 2. Просмотрите логи ошибок
pm2 logs pir-site --err --lines 50

# 3. Убедитесь что зависимости установлены
npm install

# 4. Проверьте наличие .env файла
ls -la .env

# 5. Перезапустите приложение
pm2 restart pir-site

# 6. Проверьте что порт 3000 слушается
netstat -tlnp | grep 3000
```

### Проблемы с кешированием

Если изменения не применяются на сайте:

```bash
# 1. Очистите кеш браузера (Ctrl+Shift+R)

# 2. Проверьте версии файлов в HTML
# Должны быть параметры ?v=2.0 или выше
curl https://pir-planet.ru | grep "\.min\."

# 3. Перезапустите Nginx
sudo systemctl restart nginx

# 4. Очистите кеш Nginx (если настроен)
sudo rm -rf /var/cache/nginx/*
```

### Telegram бот не отправляет сообщения

**Проверка:**

```bash
# 1. Проверьте что .env файл существует
cat .env | grep TELEGRAM

# 2. Проверьте логи приложения
pm2 logs pir-site | grep -i telegram

# 3. Проверьте что токен работает
curl "https://api.telegram.org/bot<ВАШ_ТОКЕН>/getMe"

# 4. Тестовая отправка
curl -X POST "https://api.telegram.org/bot<ВАШ_ТОКЕН>/sendMessage" \
  -d "chat_id=<ВАШ_CHAT_ID>" \
  -d "text=Тест"
```

### Превышен Rate Limit

Если пользователи получают ошибку "Слишком много запросов":

```bash
# 1. Проверьте настройки в .env
cat .env | grep RATE_LIMIT

# 2. Увеличьте лимиты (если нужно)
# Отредактируйте .env:
RATE_LIMIT_MAX_REQUESTS=200  # было 100

# 3. Перезапустите приложение
pm2 restart pir-site
```

## Настройка Nginx

Пример конфигурации `/etc/nginx/sites-available/pir-planet.ru`:

```nginx
# HTTPS (порт 443)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name pir-planet.ru www.pir-planet.ru;

    # SSL сертификаты
    ssl_certificate /etc/letsencrypt/live/pir-planet.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pir-planet.ru/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Gzip сжатие
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Проксирование к Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Таймауты
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Кеширование статических файлов
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 7d;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # Логи
    access_log /var/log/nginx/pir-planet-access.log;
    error_log /var/log/nginx/pir-planet-error.log;
}

# Редирект с HTTP на HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name pir-planet.ru www.pir-planet.ru;

    return 301 https://$server_name$request_uri;
}

# Редирект с www на без www (опционально)
server {
    listen 443 ssl http2;
    server_name www.pir-planet.ru;

    ssl_certificate /etc/letsencrypt/live/pir-planet.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pir-planet.ru/privkey.pem;

    return 301 https://pir-planet.ru$request_uri;
}
```

После изменения конфигурации:

```bash
# Проверка конфигурации
sudo nginx -t

# Применение изменений
sudo systemctl reload nginx
```

## SSL сертификат (Let's Encrypt)

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d pir-planet.ru -d www.pir-planet.ru

# Автообновление (тест)
sudo certbot renew --dry-run

# Проверка автообновления
sudo systemctl status certbot.timer
```

## Мониторинг

### Просмотр логов в реальном времени

```bash
# PM2 логи
pm2 logs pir-site -f

# Nginx логи
sudo tail -f /var/log/nginx/pir-planet-access.log

# Ошибки Nginx
sudo tail -f /var/log/nginx/pir-planet-error.log

# Системные логи
sudo journalctl -u pir-site -f
```

### Мониторинг производительности

```bash
# Статистика PM2
pm2 monit

# Использование ресурсов
pm2 show pir-site

# Список процессов
pm2 list
```

## Безопасность

См. подробную информацию в [SECURITY.md](SECURITY.md)

**Обязательные меры:**

1. ✅ Используйте HTTPS (Let's Encrypt)
2. ✅ Настройте firewall (ufw)
3. ✅ Установите Fail2Ban
4. ✅ Регулярно обновляйте зависимости (`npm audit`)
5. ✅ Делайте бэкапы базы данных и кода
6. ✅ Мониторьте логи на подозрительную активность

## Автоматизация деплоя

Создайте скрипт `deploy.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Начинаем деплой PIR-Planet..."

# 1. Остановка приложения
echo "⏸️  Останавливаем приложение..."
pm2 stop pir-site

# 2. Получение изменений
echo "📥 Получаем изменения из Git..."
git pull origin main

# 3. Установка зависимостей
echo "📦 Устанавливаем зависимости..."
npm install

# 4. Минификация
echo "🗜️  Минифицируем файлы..."
npm run minify:css
npm run minify:js

# 5. Запуск приложения
echo "▶️  Запускаем приложение..."
pm2 start pir-site

# 6. Проверка
echo "✅ Проверяем статус..."
pm2 status pir-site

echo "✨ Деплой завершен!"
```

Использование:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Откат к предыдущей версии

```bash
# Просмотр истории коммитов
git log --oneline -10

# Откат к конкретному коммиту
git reset --hard <commit-hash>

# Откат на 1 коммит назад
git reset --hard HEAD~1

# Перезапуск приложения
pm2 restart pir-site
```

## Чеклист перед деплоем

- [ ] Код протестирован локально
- [ ] Запущена минификация CSS/JS
- [ ] .env файл настроен на сервере
- [ ] Зависимости обновлены (`npm install`)
- [ ] SSL сертификат актуален
- [ ] Бэкап базы данных/кода сделан
- [ ] Логи проверены на ошибки
- [ ] Тестовая заявка отправлена успешно

## Контакты поддержки

При возникновении проблем:
1. Проверьте логи: `pm2 logs pir-site --err`
2. Проверьте документацию: [README.md](README.md), [SECURITY.md](SECURITY.md)
3. Откройте issue на GitHub (без секретных данных!)
