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
    const callModal = document.getElementById('callModal');
    if (callModal) {
        callModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeCallModal() {
    const callModal = document.getElementById('callModal');
    if (callModal) {
        callModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Обработчик отправки формы
document.addEventListener('DOMContentLoaded', function() {
    // Обработчик формы "Заказать звонок" 
    const callModalForm = document.querySelector('.modal-form');
    if (callModalForm) {
        callModalForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Предотвращаем стандартное поведение формы

            // Собираем данные из формы
            const formData = {
                name: e.target.querySelector('input[type="text"]').value,
                phone: e.target.querySelector('input[type="tel"]').value
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
    }

    // Обработчик отправки формы "Призыв к действию"
    const ctaForm = document.querySelector('.cta__form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', async (e) => {
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
    }

    // Обработчик для buyModal будет добавлен после создания модального окна
});

// Функции для модального окна "Получить консультацию"
function openConsultationModal() {
    const consultationModal = document.getElementById('consultationModal');
    if (consultationModal) {
        consultationModal.style.display = 'flex';
    }
}

function closeConsultationModal() {
    const consultationModal = document.getElementById('consultationModal');
    if (consultationModal) {
        consultationModal.style.display = 'none';
    }
}

// Закрытие модальных окон при клике вне их области
window.onclick = function (event) {
    const callModal = document.getElementById('callModal');
    const consultationModal = document.getElementById('consultationModal');

    if (event.target === callModal) {
        closeCallModal();
    }

    if (event.target === consultationModal) {
        closeConsultationModal();
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

// Функция для открытия модального окна заказа
// Поскольку buyModal не существует, открываем callModal
function openBuyModal() {
    openCallModal();
}

// Функция для закрытия модального окна
function closeBuyModal() {
    closeCallModal();
}
