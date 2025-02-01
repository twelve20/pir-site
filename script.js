/// Функция для переключения мобильного меню
function toggleMenu() {
    const menuMobile = document.querySelector('.menu-mobile');
    if (menuMobile.style.display === 'block') {
        menuMobile.style.display = 'none';
    } else {
        menuMobile.style.display = 'block';
    }
}

function openModal() {
    document.getElementById('buymodal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('buymodal').style.display = 'none';
}

// Функции для модального окна "Заказать звонок"
function openCallModal() {
    document.getElementById('callModal').style.display = 'flex';
}

function closeCallModal() {
    document.getElementById('callModal').style.display = 'none';
}

// Функции для модального окна "Получить консультацию"
function openConsultationModal() {
    document.getElementById('consultationModal').style.display = 'flex';
}

function closeConsultationModal() {
    document.getElementById('consultationModal').style.display = 'none';
}

// Закрытие модальных окон при клике вне их области
window.onclick = function (event) {
    const callModal = document.getElementById('callModal');
    const consultationModal = document.getElementById('consultationModal');

    if (event.target === callModal) {
        callModal.style.display = 'none';
    }

    if (event.target === consultationModal) {
        consultationModal.style.display = 'none';
    }
};

// Функция для анимации выплывающих карточек
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".hero-card");

    // Добавляем класс "show" к каждой карточке с задержкой
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("show");
        }, index * 300); // Задержка между карточками
    });
});

// Функция для открытия модального окна
function openBuyModal() {
    document.getElementById('buyModal').style.display = 'flex';
}

// Функция для закрытия модального окна
function closeBuyModal() {
    document.getElementById('buyModal').style.display = 'none';
}

// Закрытие модального окна при клике вне его области
window.onclick = function (event) {
    const modal = document.getElementById('buyModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Инициализация слайдера
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.sales-slider__swiper', {
        slidesPerView: 1, // Показывать только один слайд
        spaceBetween: 20, // Отступ между слайдами
        loop: true, // Бесконечный цикл
        autoplay: {
            delay: 5000, // Автоматическая смена слайдов каждые 5 секунд
            disableOnInteraction: false, // Продолжать автопрокрутку после взаимодействия пользователя
        },
    });
});

function openCallModal() {
    document.getElementById('callModal').style.display = 'flex';
}

function closeCallModal() {
    document.getElementById('callModal').style.display = 'none';
}

