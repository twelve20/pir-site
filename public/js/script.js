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

// Обработчик отправки формы
document.querySelector('.modal__form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Собираем данные из формы
    const formData = {
        name: document.querySelector('.modal__form input[type="text"]').value,
        phone: document.querySelector('.modal__form input[type="tel"]').value
    };

    try {
        // Отправляем данные на сервер
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Заявка успешно отправлена!');
            closeCallModal(); // Закрываем модальное окно
        } else {
            alert('Произошла ошибка при отправке заявки.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось отправить заявку. Попробуйте позже.');
    }
});

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

// Обработчик отправки формы "Призыв к действию"
document.querySelector('.cta__form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Собираем данные из формы
    const formData = {
        name: document.querySelector('.cta__form input[type="text"]').value,
        phone: document.querySelector('.cta__form input[type="tel"]').value,
        comment: document.querySelector('.cta__form textarea').value
    };

    try {
        // Отправляем данные на сервер
        const response = await fetch('/submit-cta-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Заявка успешно отправлена!');
            document.querySelector('.cta__form').reset(); // Очищаем форму
        } else {
            alert('Произошла ошибка при отправке заявки.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось отправить заявку. Попробуйте позже.');
    }
});

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

// Обработчик отправки формы "Оформить заказ"
document.querySelector('#buyModal .modal__form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Собираем данные из формы
    const formData = {
        name: document.querySelector('#buyModal input[type="text"]').value,
        phone: document.querySelector('#buyModal input[type="tel"]').value,
        email: document.querySelector('#buyModal input[type="email"]').value,
        comment: document.querySelector('#buyModal textarea').value
    };

    try {
        // Отправляем данные на сервер
        const response = await fetch('/submit-buy-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Заказ успешно отправлен!');
            document.querySelector('#buyModal .modal__form').reset(); // Очищаем форму
            closeBuyModal(); // Закрываем модальное окно
        } else {
            alert('Произошла ошибка при отправке заказа.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось отправить заказ. Попробуйте позже.');
    }
});

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

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/products');
    const products = await response.json();

    const heroCards = document.querySelector('.hero__cards');
    heroCards.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'hero-card';
        card.innerHTML = `
        <div class="hero-card__image">
          <img src="${product.image}" alt="${product.title}" class="hero-card__img">
        </div>
        <div class="hero-card__content">
          <h3 class="hero-card__title">${product.title}</h3>
          <p class="hero-card__description">${product.description}</p>
          <p class="hero-card__price highlight-price">${product.price}</p>
          <p class="hero-card__discount">${product.discount || ''}</p>
          <button class="btn btn--orange" onclick="openBuyModal()">Купить сейчас</button>
        </div>
      `;
        heroCards.appendChild(card);
    });
});