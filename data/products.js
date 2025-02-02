// Акционные товары (для Hero-блока)
const specialProducts = [
    {
        image: '/images/product1.jpg',
        title: 'PIR-плиты стандарт',
        description: 'Идеально подходят для утепления бань и саун.',
        price: 'от 500 ₽/м²',
        discount: 10
    },
    {
        image: '/images/product2.jpg',
        title: 'PIR-плиты премиум',
        description: 'Высокая плотность и долговечность.',
        price: 'от 800 ₽/м²',
        discount: 15
    },
    {
        image: '/images/product3.jpg',
        title: 'Комплектующие',
        description: 'Дополнительные материалы для монтажа.',
        price: 'от 200 ₽/шт',
        discount: 20
    }
];

// Обычные товары (для мини-каталога)
const regularProducts = [
    {
        image: '/images/product1.jpg',
        title: 'PIR-плиты эконом',
        description: 'Бюджетное решение для утепления.',
        price: 'от 400 ₽/м²'
    },
    {
        image: '/images/product1.jpg',
        title: 'Пароизоляция',
        description: 'Защита от влаги и конденсата.',
        price: 'от 150 ₽/м²'
    },
    {
        image: '/images/product1.jpg',
        title: 'Теплоизоляция для крыш',
        description: 'Универсальное решение для кровли.',
        price: 'от 600 ₽/м²'
    }
];

module.exports = { specialProducts, regularProducts };