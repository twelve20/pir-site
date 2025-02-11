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
        title: 'PIRRO Термо ФОЛЬГА Г1 600х1200х30 мм L4',
        description: '📏30 мм | 🟫5,04 м²/лист | 📦7 шт./уп.',
        price: '560₽/ШТ'
    },
    {
        image: '/images/product2.jpg',
        title: 'PIRRO Термо ФОЛЬГА Г1 600х1200х50 мм L4',
        description: '📏50 мм | 🟫4,32 м²/уп. | 📦6 шт./уп.',
        price: '785₽/ШТ'
    },
];

module.exports = { specialProducts, regularProducts };