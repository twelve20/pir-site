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
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
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

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Обновляем активные индикаторы
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Автоматическая прокрутка слайдов (опционально)
setInterval(() => changeSlide(1), 5000);
