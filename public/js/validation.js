// Регулярные выражения для валидации
const nameRegex = /^[а-яёА-ЯЁa-zA-Z\s]{2,50}$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const commentRegex = /^.{5,500}$/;

// Функция для отображения ошибки
function showError(input, message) {
    const errorDiv = input.nextElementSibling?.classList.contains('error-message') 
        ? input.nextElementSibling 
        : document.createElement('div');
    
    if (!input.nextElementSibling?.classList.contains('error-message')) {
        errorDiv.className = 'error-message';
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    
    errorDiv.textContent = message;
    input.classList.add('error');
    updateSubmitButton(input.closest('form'));
}

// Функция для скрытия ошибки
function hideError(input) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv?.classList.contains('error-message')) {
        errorDiv.remove();
    }
    input.classList.remove('error');
    updateSubmitButton(input.closest('form'));
}

// Функция обновления состояния кнопки отправки
function updateSubmitButton(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const hasErrors = form.querySelectorAll('.error').length > 0;
    const emptyFields = Array.from(form.querySelectorAll('input[required], textarea[required]'))
        .some(field => !field.value);

    submitButton.disabled = hasErrors || emptyFields;
    submitButton.style.opacity = (hasErrors || emptyFields) ? '0.5' : '1';
    submitButton.style.cursor = (hasErrors || emptyFields) ? 'not-allowed' : 'pointer';
}

// Функция валидации имени
function validateName(input) {
    const value = input.value.trim();
    if (!value) {
        showError(input, 'Поле обязательно для заполнения');
        return false;
    }
    if (!nameRegex.test(value)) {
        showError(input, 'Введите корректное имя (только буквы и пробелы)');
        return false;
    }
    hideError(input);
    return true;
}

// Функция валидации телефона
function validatePhone(input) {
    const value = input.value.trim().replace(/\D/g, '');
    if (!value) {
        showError(input, 'Поле обязательно для заполнения');
        return false;
    }
    if (value.length < 10 || value.length > 12) {
        showError(input, 'Введите корректный номер телефона (10-12 цифр)');
        return false;
    }
    hideError(input);
    return true;
}

// Функция валидации комментария
function validateComment(textarea) {
    if (!textarea.required && !textarea.value) {
        hideError(textarea);
        return true;
    }
    
    const value = textarea.value.trim();
    if (textarea.required && !value) {
        showError(textarea, 'Поле обязательно для заполнения');
        return false;
    }
    if (!commentRegex.test(value)) {
        showError(textarea, 'Комментарий должен содержать минимум 5 символов');
        return false;
    }
    hideError(textarea);
    return true;
}

// Функция инициализации валидации для формы
function initFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    const submitButton = form.querySelector('button[type="submit"]');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.type === 'text' && input.placeholder.toLowerCase().includes('имя')) {
                validateName(input);
            } else if (input.type === 'tel' || input.placeholder.toLowerCase().includes('телефон')) {
                validatePhone(input);
            } else if (input.tagName.toLowerCase() === 'textarea') {
                validateComment(input);
            }
        });

        input.addEventListener('blur', () => {
            if (input.type === 'text' && input.placeholder.toLowerCase().includes('имя')) {
                validateName(input);
            } else if (input.type === 'tel' || input.placeholder.toLowerCase().includes('телефон')) {
                validatePhone(input);
            } else if (input.tagName.toLowerCase() === 'textarea') {
                validateComment(input);
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            if (input.type === 'text' && input.placeholder.toLowerCase().includes('имя')) {
                isValid = validateName(input) && isValid;
            } else if (input.type === 'tel' || input.placeholder.toLowerCase().includes('телефон')) {
                isValid = validatePhone(input) && isValid;
            } else if (input.tagName.toLowerCase() === 'textarea') {
                isValid = validateComment(input) && isValid;
            }
        });

        if (isValid) {
            alert('Форма успешно отправлена!');
            form.reset();
        }
    });
}

// Инициализация валидации для всех форм при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => initFormValidation(form));
}); 