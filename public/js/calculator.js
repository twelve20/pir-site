// Данные о продуктах
const products = {
    'pirro-termo-30': {
        name: 'PIRRO Термо ФОЛЬГА 30 мм',
        price: 562,
        area: 0.72
    },
    'pirro-termo-50': {
        name: 'PIRRO Термо ФОЛЬГА 50 мм',
        price: 785,
        area: 0.72
    },
    'pir-paper-30': {
        name: 'PIR Плита Бумага/Бумага 30 мм',
        price: 429,
        area: 0.72
    },
    'pir-paper-50': {
        name: 'PIR Плита Бумага/Бумага 50 мм',
        price: 619,
        area: 0.72
    },
    'pir-foil-40': {
        name: 'PIR Плита Фольга/Фольга 40 мм',
        price: 679,
        area: 0.72
    },
    'pir-foil-100': {
        name: 'PIR Плита Фольга/Фольга 100 мм',
        price: 2100,
        area: 2.88
    }
};

// Цена клей-пены
const GLUE_PRICE = 1050;
const GLUE_COVERAGE = 10; // м² на баллон

document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.getElementById('pir-calculator');
    if (!calculator) return;

    const areaInput = calculator.querySelector('#calc-area');
    const typeSelect = calculator.querySelector('#calc-type');
    const glueCheckbox = calculator.querySelector('#calc-glue');
    const calculateBtn = calculator.querySelector('#calc-button');
    const resultDiv = calculator.querySelector('#calc-result');
    const commentField = document.querySelector('.cta__form textarea');
    const sendWithCalcBtn = calculator.querySelector('#send-with-calc');

    calculateBtn.addEventListener('click', () => {
        const area = parseFloat(areaInput.value);
        if (!area || area < 1) {
            resultDiv.innerHTML = '<p class="calc-error">Введите корректную площадь</p>';
            return;
        }

        const selectedProduct = products[typeSelect.value];
        const platesCount = Math.ceil(area / selectedProduct.area);
        const platesPrice = platesCount * selectedProduct.price;

        let glueCount = 0;
        let gluePrice = 0;
        let totalPrice = platesPrice;

        if (glueCheckbox.checked) {
            glueCount = Math.ceil(area / GLUE_COVERAGE);
            gluePrice = glueCount * GLUE_PRICE;
            totalPrice += gluePrice;
        }

        const result = `
            <div class="calc-result__content">
                <p>Вам нужно:</p>
                <p>${selectedProduct.name} — ${platesCount} плит, ${platesPrice} руб.</p>
                ${glueCheckbox.checked ? `<p>Клей-пена: ${glueCount} баллон(ов) — ${gluePrice} руб.</p>` : ''}
                <p class="calc-result__total">Итого: ${totalPrice} руб.</p>
            </div>
        `;

        resultDiv.innerHTML = result;
        sendWithCalcBtn.style.display = 'block';

        // Сохраняем результат для формы
        calculator.dataset.calculationResult = 
            `${selectedProduct.name} — ${platesCount} плит, ${platesPrice} руб.` +
            (glueCheckbox.checked ? `, клей-пена — ${glueCount} баллон(ов), ${gluePrice} руб.` : '') +
            `, итог ${totalPrice} руб.`;
    });

    sendWithCalcBtn.addEventListener('click', () => {
        if (calculator.dataset.calculationResult) {
            commentField.value = calculator.dataset.calculationResult;
            commentField.closest('form').scrollIntoView({ behavior: 'smooth' });
        }
    });
});