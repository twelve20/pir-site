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

// Логика для выплывающих акций
let currentSlide = 0;
const slides = document.querySelectorAll('.promotion-slide');

function showNextSlide() {
    // Скрываем текущую акцию
    slides[currentSlide].classList.remove('active');

    // Переходим к следующей акции
    currentSlide = (currentSlide + 1) % slides.length;

    // Показываем следующую акцию
    slides[currentSlide].classList.add('active');
}

// Запускаем автоматическую смену акций каждые 3 секунды
setInterval(showNextSlide, 3000);