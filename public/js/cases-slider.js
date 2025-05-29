// Инициализация слайдера для блока "Наши работы"
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем наличие слайдера на странице
    if (document.querySelector('.cases-swiper') && typeof Swiper !== 'undefined') {
        const casesSwiper = new Swiper('.cases-swiper', {
            // Основные параметры
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            // Добавляем пагинацию
            pagination: {
                el: '.cases-pagination',
                clickable: true,
                dynamicBullets: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                }
            },
            // Добавляем навигацию
            navigation: {
                nextEl: '.cases-next',
                prevEl: '.cases-prev',
            },
            // Адаптивные настройки
            breakpoints: {
                // При ширине окна больше 640px
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // При ширине окна больше 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // При ширине окна больше 1024px
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            },
            // Эффект перехода
            effect: 'slide',
            // Анимации
            speed: 800,
            // Обновляем пагинацию при изменении слайдов
            on: {
                slideChange: function () {
                    this.pagination.update();
                },
                init: function() {
                    this.pagination.update();
                }
            },
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
