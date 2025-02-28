// Данные о товарах для модальных окон
const productDetails = {
    'pirro-termo-30': {
        title: 'PIRRO Термо ФОЛЬГА 30 мм',
        image: '/images/product1.jpg',
        description: 'Плита с фольгированным покрытием для эффективного утепления стен, потолков и перегородок. Обеспечивает отличную тепло- и звукоизоляцию, подходит для быстрого монтажа в жилых и коммерческих помещениях. Размеры: 600х1200х30 мм, площадь 0,72 м². Вес: 1,5 кг/шт. Рекомендуем использовать с клей-пеной для надежной фиксации.',
        price: '560 руб./шт.',
        advantages: ['Легкость', 'Водоотталкивающие свойства', 'Экологичность']
    },
    'pir-paper-50': {
        title: 'PIR Плита Бумага/Бумага 50 мм',
        image: '/images/product1.jpg',
        description: 'Универсальная плита для утепления полов, перекрытий и кровли. Имеет бумажные слои, что делает её доступной и экологичной. Размеры: 600х1200х50 мм, площадь 0,72 м². Вес: 2 кг/шт. Идеально сочетается с клей-пеной для прочного монтажа.',
        price: '619 руб./шт.',
        advantages: ['Простота монтажа', 'Долговечность', 'Низкая теплопроводность']
    },
    'pirro-termo-50': {
        title: 'PIRRO Термо ФОЛЬГА 50 мм',
        image: '/images/product1.jpg',
        description: 'Прочная плита с фольгированным покрытием для сложных конструкций, фасадов и кровли. Обеспечивает максимальную теплоизоляцию и устойчивость к влаге. Размеры: 600х1200х50 мм, площадь 0,72 м². Вес: 2,2 кг/шт. Рекомендуется использовать с клей-пеной для обеспечения долговечности.',
        price: '785 руб./шт.',
        advantages: ['Высокая прочность', 'Водонепроницаемость', 'Идеальна для наружных работ']
    },
    'pir-paper-30': {
        title: 'PIR Плита Бумага/Бумага 30 мм',
        image: '/images/product1.jpg',
        description: 'Плита с бумажными слоями для утепления стен, перегородок и легких конструкций. Экологична, легка в монтаже и обеспечивает хорошую теплоизоляцию. Размеры: 600х1200х30 мм, площадь 0,72 м². Вес: 1,4 кг/шт. Рекомендуется использовать с клей-пеной для надежной фиксации.',
        price: '429 руб./шт.',
        advantages: ['Доступная цена', 'Простота монтажа', 'Экологичность']
    },
    'pir-foil-100': {
        title: 'PIR Плита Фольга/Фольга 100 мм',
        image: '/images/product2.jpg',
        description: 'Плита с двусторонним фольгированным покрытием для высокоэффективного утепления стен, потолков, перегородок и кровельных конструкций. Обеспечивает превосходную тепло- и звукоизоляцию, идеально подходит для применения в жилых, коммерческих и промышленных помещениях. Размеры: 2400х1200х100 мм, площадь 2,88 м². Вес: 9,5 кг/шт. Для надежной фиксации рекомендуется использовать клей-пену или механический крепеж.',
        price: '2100 руб./шт.',
        advantages: ['Высокая теплоизоляционная эффективность', 'Водоотталкивающие свойства', 'Экологически безопасный материал']
    },
    'glue-foam': {
        title: 'Клей-пена для PIR',
        image: '/images/product4.jpg',
        description: 'Специальная клей-пена для надежного и быстрого монтажа PIR-плит. Объем: 750 мл/баллон, расход — 1 баллон на 10 м². Обеспечивает прочное сцепление с любыми поверхностями, подходит для внутренних и внешних работ. Легко наносится, быстро твердеет.',
        price: '1050 руб./баллон',
        advantages: ['Высокая адгезия', 'Удобство использования', 'Экономичность']
    }
};

// Открытие модального окна с подробной информацией о товаре
function openDetailsModal(productId) {
    const product = productDetails[productId];
    if (!product) return;

    // Заполняем модальное окно данными о товаре
    const modal = document.getElementById('detailsModal');
    modal.querySelector('.product-modal__title').textContent = product.title;
    modal.querySelector('.product-modal__image img').src = product.image;
    modal.querySelector('.product-modal__description').textContent = product.description;
    modal.querySelector('.product-modal__price').textContent = product.price;

    // Заполняем преимущества
    const advantagesList = modal.querySelector('.product-modal__advantages');
    advantagesList.innerHTML = '';
    product.advantages.forEach(advantage => {
        const li = document.createElement('li');
        li.textContent = advantage;
        advantagesList.appendChild(li);
    });

    // Отображаем модальное окно
    modal.style.display = 'block';

    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeDetailsModal() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'none';

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