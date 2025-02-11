// Выделенные проекты (для главной страницы)
const featuredProjects = [
    {
        image: '/images/case1.jpg',
        title: 'Баня в Подмосковье',
        description: 'Сроки: 2 дня. Материалы: PIR-плиты.',
        link: '/projects'
    },
    {
        image: '/images/case2.jpg',
        title: 'Сауна в Санкт-Петербурге',
        description: 'Сроки: 3 дня. Материалы: PIR-плиты.',
        link: '/projects'
    },
    {
        image: '/images/case3.jpg',
        title: 'Дом в Новгороде',
        description: 'Сроки: 5 дней. Материалы: PIR-плиты.',
        link: '/projects'
    }
];

// Все проекты (для страницы "Проекты")
const allProjects = [
    {
        image: '/images/case1.jpg',
        title: 'Утепление бани в Подмосковье',
        description: 'Площадь: 50 м², сроки: 3 дня, особенности: сложная геометрия.'
    },
    {
        image: '/images/case2.jpg',
        title: 'Утепление частного дома',
        description: 'Площадь: 200 м², сроки: 7 дней, особенности: экологичность.'
    },
    {
        image: '/images/case3.jpg',
        title: 'Утепление коммерческого объекта',
        description: 'Площадь: 500 м², сроки: 14 дней, особенности: высокие требования к теплоизоляции.'
    }
];

module.exports = { featuredProjects, allProjects };