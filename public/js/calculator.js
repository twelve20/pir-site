// Данные о продуктах
const products = {
    'pir-foil-30': { 
        price: 550, 
        oldPrice: 790, 
        name: 'PIR плита 1200*600*30 фольга/фольга', 
        isPromo: true,
        area: 0.72
    },
    'pirro-termo-30': { 
        price: 590, 
        name: 'PIRRO Термо ФОЛЬГА 30 мм',
        area: 0.72
    },
    'pirro-termo-50': { 
        price: 820, 
        name: 'PIRRO Термо ФОЛЬГА 50 мм',
        area: 0.72
    },
    'pir-paper-30': { 
        price: 450, 
        name: 'PIR Плита Бумага/Бумага 30 мм',
        area: 0.72
    },
    'pir-paper-50': { 
        price: 650, 
        name: 'PIR Плита Бумага/Бумага 50 мм',
        area: 0.72
    },
    'pir-foil-40': { 
        price: 700, 
        name: 'PIR Плита Фольга/Фольга 40 мм',
        area: 0.72
    },
    'pir-foil-100': { 
        price: 5564, 
        name: 'PIR Плита Фольга/Фольга 100 мм',
        area: 2.88
    },
    'pir-600x1200-30': {
        price: 720,
        name: 'PIR плита 600*1200*30 (8 шт в упаковке)',
        area: 5.76
    }
};

// Цена клей-пены
const GLUE_PRICE = 1100;
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
        
        let promoMessage = '';
        if (selectedProduct.isPromo) {
            const savings = (selectedProduct.oldPrice - selectedProduct.price) * platesCount;
            promoMessage = `<p class="calc-result__promo">✨ Акционный товар! Экономия: ${savings} руб. ✨</p>`;
        }

        const result = `
            <div class="calc-result__content">
                <p>Вам нужно:</p>
                <p>${selectedProduct.name} — ${platesCount} плит, ${platesPrice} руб.</p>
                ${glueCheckbox.checked ? `<p>Клей-пена: ${glueCount} баллон(ов) — ${gluePrice} руб.</p>` : ''}
                <p class="calc-result__total">Итого: ${totalPrice} руб.</p>
                ${promoMessage}
            </div>
        `;

        resultDiv.innerHTML = result;
        resultDiv.classList.add('show');
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
