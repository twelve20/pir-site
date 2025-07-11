// Данные о товарах для модальных окон
const productDetails = {
    'pir-foil-30': {
        title: 'PIR плита 1200*600*30 фольга/фольга',
        image: '/images/product1.jpg',
        description: 'Идеальное решение для утепления бань и саун. Выдерживает высокие температуры, не впитывает влагу, обеспечивает отличную теплоизоляцию. Размеры: 1200х600х30 мм, площадь 0,72 м² за штуку. В упаковке 8 шт. (общая площадь 5,76 м²). Вес: 1,5 кг/шт. Рекомендуем использовать с клей-пеной для надежной фиксации.',
        price: '550 руб./шт.',
        oldPrice: '790 руб./шт.',
        isPromo: true,
        advantages: ['Термостойкость до +120°C', 'Влагостойкость 100%', 'Экономия пространства'],
        fireClass: 'Г1'
    },
    'pirro-termo-30': {
        title: 'PIRRO Термо ФОЛЬГА 30 мм',
        image: '/images/product1.jpg',
        description: 'Плита с фольгированным покрытием для эффективного утепления стен, потолков и перегородок. Обеспечивает отличную тепло- и звукоизоляцию, подходит для быстрого монтажа в жилых и коммерческих помещениях. Размеры: 600х1200х30 мм, площадь 0,72 м². Вес: 1,5 кг/шт. Рекомендуем использовать с клей-пеной для надежной фиксации.',
        price: '550 руб./шт.',
        advantages: ['Легкость', 'Водоотталкивающие свойства', 'Экологичность'],
        fireClass: 'Г1'
    },
    'pir-paper-50': {
        title: 'PIR Плита Бумага/Бумага 50 мм',
        image: '/images/product1.jpg',
        description: 'Универсальная плита для утепления полов, перекрытий и кровли. Имеет бумажные слои, что делает её доступной и экологичной. Размеры: 600х1200х50 мм, площадь 0,72 м². Вес: 2 кг/шт. Идеально сочетается с клей-пеной для прочного монтажа.',
        price: '619 руб./шт.',
        advantages: ['Простота монтажа', 'Долговечность', 'Низкая теплопроводность'],
        fireClass: 'Г3'
    },
    'pirro-termo-50': {
        title: 'PIRRO Термо ФОЛЬГА 50 мм',
        image: '/images/product1.jpg',
        description: 'Прочная плита с фольгированным покрытием для сложных конструкций, фасадов и кровли. Обеспечивает максимальную теплоизоляцию и устойчивость к влаге. Размеры: 600х1200х50 мм, площадь 0,72 м². Вес: 2,2 кг/шт. Рекомендуется использовать с клей-пеной для обеспечения долговечности.',
        price: '756 руб./шт.',
        advantages: ['Высокая прочность', 'Водонепроницаемость', 'Идеальна для наружных работ'],
        fireClass: 'Г1'
    },
    'pir-paper-30': {
        title: 'PIR Плита Бумага/Бумага 30 мм',
        image: '/images/product1.jpg',
        description: 'Плита с бумажными слоями для утепления стен, перегородок и легких конструкций. Экологична, легка в монтаже и обеспечивает хорошую теплоизоляцию. Размеры: 600х1200х30 мм, площадь 0,72 м². Вес: 1,4 кг/шт. Рекомендуется использовать с клей-пеной для надежной фиксации.',
        price: '429 руб./шт.',
        advantages: ['Доступная цена', 'Простота монтажа', 'Экологичность'],
        fireClass: 'Г3'
    },
    'pir-foil-40': {
        title: 'PIR Плита Фольга/Фольга 40 мм',
        image: '/images/product1.jpg',
        description: 'Универсальная плита с двусторонним фольгированным покрытием для эффективного утепления стен, потолков и кровли. Обеспечивает отличную тепло- и звукоизоляцию, подходит для применения в жилых и коммерческих помещениях. Размеры: 600х1200х40 мм, площадь 0,72 м². Вес: 1,8 кг/шт. Рекомендуется использовать с клей-пеной для надежной фиксации.',
        price: '679 руб./шт.',
        advantages: ['Универсальность', 'Высокая теплоизоляция', 'Влагостойкость'],
        fireClass: 'Г1'
    },
    'pir-foil-100': {
        title: 'PIR Плита Фольга/Фольга 100 мм',
        image: '/images/product2.jpg',
        description: 'Плита с двусторонним фольгированным покрытием для высокоэффективного утепления стен, потолков, перегородок и кровельных конструкций. Обеспечивает превосходную тепло- и звукоизоляцию, идеально подходит для применения в жилых, коммерческих и промышленных помещениях. Размеры: 2400х1200х100 мм, площадь 2,88 м². Вес: 9,5 кг/шт. Для надежной фиксации рекомендуется использовать клей-пену или механический крепеж.',
        price: '5564 руб./шт.',
        advantages: ['Высокая теплоизоляционная эффективность', 'Водоотталкивающие свойства', 'Экологически безопасный материал'],
        fireClass: 'Г1'
    },
    'glue-foam': {
        title: 'Клей-пена для PIR',
        image: '/images/product4.jpg',
        description: 'Специальная клей-пена для надежного и быстрого монтажа PIR-плит. Объем: 750 мл/баллон, расход — 1 баллон на 10 м². Обеспечивает прочное сцепление с любыми поверхностями, подходит для внутренних и внешних работ. Легко наносится, быстро твердеет.',
        price: '1050 руб./баллон',
        advantages: ['Высокая адгезия', 'Удобство использования', 'Экономичность'],
        fireClass: 'Н/Д'
    }
};

// Открытие модального окна с подробной информацией о товаре
function openDetailsModal(productId) {
    const product = productDetails[productId];
    if (!product) return;

    // Заполняем модальное окно данными о товаре
    const modal = document.getElementById('detailsModal');
    modal.querySelector('.product-modal__title').textContent = product.title;
    modal.querySelector('.product-modal__image-img').src = product.image;
    modal.querySelector('.product-modal__image-img').alt = product.title;
    modal.querySelector('.product-modal__description').textContent = product.description;
    
    // Обновляем отображение цены в зависимости от наличия акции
    const priceBlock = modal.querySelector('.product-modal__price-block');
    if (product.isPromo) {
        // Если это акционный товар, показываем старую и новую цену
        if (!priceBlock.querySelector('.product-modal__old-price')) {
            const oldPriceSpan = document.createElement('span');
            oldPriceSpan.className = 'product-modal__old-price';
            priceBlock.insertBefore(oldPriceSpan, priceBlock.firstChild);
        }
        priceBlock.querySelector('.product-modal__old-price').textContent = product.oldPrice;
        modal.querySelector('.product-modal__price').textContent = product.price;
        modal.querySelector('.product-modal__price').classList.add('product-modal__price--promo');
        
        // Добавляем акционный бейдж
        modal.querySelector('.product-modal__badge').textContent = 'АКЦИЯ';
        modal.querySelector('.product-modal__badge').classList.add('product-modal__badge--promo');
    } else {
        // Если это обычный товар, показываем только текущую цену
        if (priceBlock.querySelector('.product-modal__old-price')) {
            priceBlock.querySelector('.product-modal__old-price').remove();
        }
        modal.querySelector('.product-modal__price').textContent = product.price;
        modal.querySelector('.product-modal__price').classList.remove('product-modal__price--promo');
        
        // Возвращаем обычный бейдж
        modal.querySelector('.product-modal__badge').textContent = 'PIR';
        modal.querySelector('.product-modal__badge').classList.remove('product-modal__badge--promo');
    }
    
    // Обновляем класс горючести
    modal.querySelector('.product-modal__specs .product-modal__spec-item:first-child span').textContent = `Класс горючести ${product.fireClass}`;

    // Заполняем преимущества
    const advantagesList = modal.querySelector('.product-modal__advantages');
    advantagesList.innerHTML = '';
    product.advantages.forEach(advantage => {
        const li = document.createElement('li');
        li.textContent = advantage;
        advantagesList.appendChild(li);
    });

    // Устанавливаем ID товара в кнопку корзины
    modal.querySelector('.product-modal__cart-btn').setAttribute('data-product-id', productId);

    // Отображаем модальное окно
    modal.style.display = 'block';

    // Добавляем анимацию появления
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeDetailsModal() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'none';
    modal.classList.remove('active');

    // Разблокируем прокрутку страницы
    document.body.style.overflow = '';
}

// Закрытие модального окна при клике вне его содержимого
window.addEventListener('click', function (event) {
    const modal = document.getElementById('detailsModal');
    if (event.target === modal) {
        closeDetailsModal();
    }
});

// Закрытие модального окна при нажатии клавиши Esc
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeDetailsModal();
    }
});

// Функция добавления товара в корзину из модального окна
async function addToCartFromModal() {
    const button = document.querySelector('.product-modal__cart-btn');
    const productId = button.getAttribute('data-product-id');
    
    if (!productId || button.classList.contains('loading')) {
        return;
    }
    
    // Состояние загрузки
    button.classList.add('loading');
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner"></i> Добавление...';
    
    try {
        const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                productId: productId,
                quantity: 1
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            button.classList.remove('loading');
            button.classList.add('added');
            button.innerHTML = '<i class="fas fa-check"></i> Добавлено';
            
            if (typeof updateCartBadge === 'function') {
                updateCartBadge(result.cart.count);
            }
            
            setTimeout(() => {
                button.classList.remove('added');
                button.innerHTML = originalContent;
            }, 2000);
            
        } else {
            throw new Error(result.message || 'Ошибка добавления в корзину');
        }
    } catch (error) {
        console.error('Ошибка добавления в корзину:', error);
        button.classList.remove('loading');
        button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Ошибка';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
        }, 2000);
        
        alert('Не удалось добавить товар в корзину. Попробуйте позже.');
    }
}
