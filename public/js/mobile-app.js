/**
 * Мобильное приложение - JavaScript
 */

(function() {
    'use strict';

    // Проверка мобильного устройства
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) return;

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    document.addEventListener('DOMContentLoaded', function() {
        initBottomNavigation();
        initSmoothScroll();
        initProductCards();
        initTouchFeedback();
        hideDesktopElements();
    });

    // ===== НИЖНЯЯ НАВИГАЦИЯ =====
    function initBottomNavigation() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

        // Установка активного элемента при загрузке
        bottomNavItems.forEach(item => {
            const href = item.getAttribute('href');

            if (href === currentPath ||
                (currentPath === '/' && href === '/') ||
                (href.includes('#') && currentHash && href.includes(currentHash))) {
                item.classList.add('active');
            }
        });

        // Обработка кликов
        bottomNavItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Если это не промо-модал
                if (!this.classList.contains('promo')) {
                    bottomNavItems.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                }

                // Добавляем анимацию нажатия
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    // ===== ПЛАВНАЯ ПРОКРУТКА =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const headerOffset = 140; // Учитываем верхний и нижний хедер
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ===== КАРТОЧКИ ТОВАРОВ =====
    function initProductCards() {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            // Добавляем волновой эффект при клике
            card.addEventListener('click', function(e) {
                if (!e.target.closest('button')) {
                    createRipple(e, this);
                }
            });

            // Предзагрузка изображений
            const img = card.querySelector('img');
            if (img && !img.complete) {
                img.style.opacity = '0';
                img.addEventListener('load', function() {
                    this.style.transition = 'opacity 0.3s ease';
                    this.style.opacity = '1';
                });
            }
        });
    }

    // Создание волнового эффекта
    function createRipple(event, element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;

        const rect = element.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        const ripple = element.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    // ===== ТАКТИЛЬНАЯ ОБРАТНАЯ СВЯЗЬ =====
    function initTouchFeedback() {
        const buttons = document.querySelectorAll('button, .btn, .product-card, .bottom-nav-item');

        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });

            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }

    // ===== СКРЫТИЕ ДЕСКТОПНЫХ ЭЛЕМЕНТОВ =====
    function hideDesktopElements() {
        // Скрываем десктопную навигацию
        const desktopNav = document.querySelector('.nav');
        const headerRight = document.querySelector('.header-right');

        if (desktopNav) desktopNav.style.display = 'none';
        if (headerRight) headerRight.style.display = 'none';
    }

    // ===== УЛУЧШЕНИЕ МОДАЛЬНЫХ ОКОН =====
    function enhanceModals() {
        const modals = document.querySelectorAll('.modal-overlay, #callModal, #orderModal, #calculatorModal');

        modals.forEach(modal => {
            // Закрытие при свайпе вниз
            let startY = 0;
            let currentY = 0;

            const modalBox = modal.querySelector('.modal-box, .modal-content');
            if (!modalBox) return;

            modalBox.addEventListener('touchstart', function(e) {
                startY = e.touches[0].clientY;
            });

            modalBox.addEventListener('touchmove', function(e) {
                currentY = e.touches[0].clientY;
                const diff = currentY - startY;

                if (diff > 0) {
                    this.style.transform = `translateY(${diff}px)`;
                }
            });

            modalBox.addEventListener('touchend', function() {
                const diff = currentY - startY;

                if (diff > 100) {
                    // Закрыть модальное окно
                    const closeBtn = modal.querySelector('.modal-close, [onclick*="close"]');
                    if (closeBtn) closeBtn.click();
                }

                this.style.transform = 'translateY(0)';
                this.style.transition = 'transform 0.3s ease';
            });
        });
    }

    // ===== ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ =====
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ===== СКРЫТИЕ/ПОКАЗ НАВИГАЦИИ ПРИ СКРОЛЛЕ =====
    let lastScrollTop = 0;
    const bottomNav = document.querySelector('.mobile-bottom-nav');
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Скролл вниз - скрываем навигацию
            if (bottomNav) {
                bottomNav.style.transform = 'translateY(100%)';
                bottomNav.style.transition = 'transform 0.3s ease';
            }
            if (header) {
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease';
            }
        } else {
            // Скролл вверх - показываем навигацию
            if (bottomNav) {
                bottomNav.style.transform = 'translateY(0)';
            }
            if (header) {
                header.style.transform = 'translateY(0)';
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // ===== ВИБРООТКЛИК (если поддерживается) =====
    function vibrate(duration = 10) {
        if ('vibrate' in navigator) {
            navigator.vibrate(duration);
        }
    }

    // Добавляем виброотклик к кнопкам
    document.addEventListener('click', function(e) {
        if (e.target.closest('button, .btn, .bottom-nav-item')) {
            vibrate(10);
        }
    });

    // ===== ИНИЦИАЛИЗАЦИЯ ДОПОЛНИТЕЛЬНЫХ ФУНКЦИЙ =====
    enhanceModals();
    initLazyLoading();

    // ===== CSS ДЛЯ RIPPLE ЭФФЕКТА =====
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        img.loaded {
            animation: fadeIn 0.3s ease-in;
        }
    `;
    document.head.appendChild(style);

    // ===== PULL TO REFRESH (ОБНОВЛЕНИЕ СТРАНИЦЫ) =====
    let touchStartY = 0;
    let touchCurrentY = 0;
    const pullThreshold = 100;
    let isPulling = false;

    document.addEventListener('touchstart', function(e) {
        if (window.pageYOffset === 0) {
            touchStartY = e.touches[0].clientY;
            isPulling = true;
        }
    });

    document.addEventListener('touchmove', function(e) {
        if (!isPulling) return;

        touchCurrentY = e.touches[0].clientY;
        const pullDistance = touchCurrentY - touchStartY;

        if (pullDistance > 0) {
            // Можно добавить визуальный индикатор загрузки
        }
    });

    document.addEventListener('touchend', function() {
        if (!isPulling) return;

        const pullDistance = touchCurrentY - touchStartY;

        if (pullDistance > pullThreshold) {
            window.location.reload();
        }

        isPulling = false;
        touchStartY = 0;
        touchCurrentY = 0;
    });

})();
