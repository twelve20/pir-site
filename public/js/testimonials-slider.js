// Инициализация слайдера с отзывами
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем наличие слайдера на странице
    if (document.querySelector('.testimonials-swiper')) {
        const testimonialsSwiper = new Swiper('.testimonials-swiper', {
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
                el: '.testimonials-pagination',
                clickable: true,
            },
            // Добавляем навигацию
            navigation: {
                nextEl: '.testimonials-button-next',
                prevEl: '.testimonials-button-prev',
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
                prevSlideMessage: 'Предыдущий отзыв',
                nextSlideMessage: 'Следующий отзыв',
                firstSlideMessage: 'Это первый отзыв',
                lastSlideMessage: 'Это последний отзыв',
                paginationBulletMessage: 'Перейти к отзыву {{index}}',
            }
        });
    }
}); 