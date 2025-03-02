// Инициализация слайдера для блока "Наши работы"
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем наличие слайдера на странице
    if (document.querySelector('.cases-swiper')) {
        const casesSwiper = new Swiper('.cases-swiper', {
            // Основные параметры
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            // Добавляем пагинацию
            pagination: {
                el: '.cases-pagination',
                clickable: true,
            },
            // Добавляем навигацию
            navigation: {
                nextEl: '.cases-button-next',
                prevEl: '.cases-button-prev',
            },
            // Адаптивные настройки
            breakpoints: {
                // При ширине окна больше 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // При ширине окна больше 1024px
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            },
            // Эффект перехода
            effect: 'slide',
            // Анимации
            speed: 800,
            // Доступность
            a11y: {
                prevSlideMessage: 'Предыдущий проект',
                nextSlideMessage: 'Следующий проект',
                firstSlideMessage: 'Это первый проект',
                lastSlideMessage: 'Это последний проект',
                paginationBulletMessage: 'Перейти к проекту {{index}}',
            }
        });
    }
}); 