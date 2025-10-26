# Безопасность PIR Planet

## Реализованные меры безопасности

### 1. Защита чувствительных данных

#### Переменные окружения (.env)
Все чувствительные данные (токены, API ключи) хранятся в файле `.env`:

```bash
# Обязательные переменные:
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id

# Опциональные (с дефолтными значениями):
PORT=3000
NODE_ENV=production
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**ВАЖНО:**
- Файл `.env` добавлен в `.gitignore` и НЕ коммитится в Git
- На сервере создайте `.env` файл вручную с реальными значениями
- Используйте `.env.example` как шаблон

### 2. Helmet.js - Защита от веб-уязвимостей

Автоматически настраивает защитные HTTP заголовки:

- **Content Security Policy (CSP)** - защита от XSS атак
- **HSTS** - принудительное использование HTTPS
- **X-Frame-Options** - защита от clickjacking
- **X-Content-Type-Options** - защита от MIME-sniffing
- **Referrer Policy** - контроль передачи referrer

### 3. Rate Limiting - Защита от DDoS и брутфорса

#### Основной лимит (для всех запросов)
- **100 запросов** за 15 минут с одного IP
- Статические файлы (CSS, JS, изображения) исключены из лимита

#### API лимит (для /api/* эндпоинтов)
- **20 запросов** за 15 минут с одного IP
- Защита API корзины от злоупотреблений

#### Telegram лимит (для форм с отправкой в Telegram)
- **10 заявок** за 1 час с одного IP
- Защита от спама через формы обратной связи

### 4. Валидация и санитизация входящих данных

Все пользовательские данные проходят валидацию с помощью `express-validator`:

#### Формы заказа и обратной связи:
- **Имя**: 2-100 символов, экранирование HTML
- **Телефон**: только цифры, пробелы, +, -, (), 10-20 символов
- **Email**: валидация формата, нормализация
- **Комментарий**: максимум 500 символов, экранирование HTML

#### API корзины:
- **Product ID**: 1-100 символов
- **Quantity**: целое число от 1 до 1000
- **Автоматическая защита от SQL/NoSQL инъекций** через санитизацию

### 5. Безопасность данных

- **Ограничение размера запросов**: максимум 10MB для JSON и форм
- **Очистка старых корзин**: автоматическое удаление через 24 часа
- **IP-based изоляция**: каждому IP своя корзина

### 6. HTTPS и безопасное подключение

Рекомендуется настроить на уровне Nginx/Apache:

```nginx
# Пример конфигурации Nginx
server {
    listen 443 ssl http2;
    server_name pir-planet.ru;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Дополнительные заголовки безопасности
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";

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
    }
}

# Редирект с HTTP на HTTPS
server {
    listen 80;
    server_name pir-planet.ru;
    return 301 https://$server_name$request_uri;
}
```

## Проверка безопасности

### Тестирование заголовков безопасности

```bash
# Проверка HTTPS и заголовков
curl -I https://pir-planet.ru

# Детальная проверка безопасности
curl -s -D - https://pir-planet.ru -o /dev/null | grep -i "security\|strict\|content-security"
```

### Онлайн инструменты

1. **Mozilla Observatory**: https://observatory.mozilla.org/
2. **Security Headers**: https://securityheaders.com/
3. **SSL Labs**: https://www.ssllabs.com/ssltest/

## Мониторинг и логирование

### Логи безопасности

Приложение логирует:
- ✅ Все успешные заказы/заявки (с IP)
- ❌ Ошибки валидации
- ❌ Превышение rate limit
- ❌ Попытки отправки некорректных данных

### Просмотр логов

```bash
# PM2 логи
pm2 logs app --lines 100

# Поиск подозрительной активности
pm2 logs app | grep "429\|400\|validation"

# Системные логи
sudo journalctl -u pir-site -f
```

## Рекомендации по дополнительной защите

### 1. Firewall (ufw)

```bash
# Разрешить только необходимые порты
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### 2. Fail2Ban (защита от брутфорса SSH)

```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 3. Регулярные обновления

```bash
# Обновление зависимостей Node.js
npm audit
npm audit fix

# Системные обновления
sudo apt update && sudo apt upgrade
```

### 4. Бэкапы

```bash
# Автоматический бэкап каждую ночь
0 3 * * * tar -czf /backups/pir-site-$(date +\%Y\%m\%d).tar.gz /var/www/pir-site
```

### 5. Мониторинг SSL сертификатов

Если используете Let's Encrypt:

```bash
# Автообновление сертификатов
sudo certbot renew --dry-run
```

## Чеклист безопасности

- [x] Чувствительные данные в .env (не в коде)
- [x] Helmet.js настроен
- [x] Rate limiting включен
- [x] Валидация всех входящих данных
- [x] Санитизация HTML
- [x] Ограничение размера запросов
- [ ] HTTPS настроен (на уровне Nginx)
- [ ] Firewall настроен
- [ ] Fail2Ban установлен
- [ ] Автоматические бэкапы
- [ ] Мониторинг логов

## Контакты для сообщения об уязвимостях

Если вы обнаружили уязвимость безопасности:

1. **НЕ создавайте публичный issue в GitHub**
2. Отправьте приватное сообщение через Telegram
3. Опишите проблему максимально подробно
4. Мы ответим в течение 48 часов

## Обновления безопасности

**Последнее обновление**: 2025-01-26

### Версия 2.0.0 (2025-01-26)
- ✅ Добавлен Helmet.js
- ✅ Добавлен Rate Limiting
- ✅ Добавлена валидация и санитизация
- ✅ Переменные окружения вынесены в .env
- ✅ Gzip сжатие
- ✅ Cache-Control заголовки
