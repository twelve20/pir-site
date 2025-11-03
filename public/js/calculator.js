// Переменные для хранения данных о продуктах (загружаются из API)
let products = {};
let GLUE_PRICE = 1050;
let GLUE_COVERAGE = 10; // м² на баллон

// Загрузка данных о продуктах из API
async function loadProductData() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        products = data.products;
        GLUE_PRICE = data.glue.price;
        GLUE_COVERAGE = data.glue.coverage;
    } catch (error) {
        console.error('Ошибка загрузки данных о продуктах:', error);
        // Fallback данные в случае ошибки
        products = {
            'pir-foil-30': {
                price: 575,
                oldPrice: 582,
                name: 'PIR плита для бани ФОЛЬГА 30 мм',
                isPromo: true,
                area: 0.72
            },
            'pirro-termo-30': {
                price: 575,
                name: 'PIR плита для бани ФОЛЬГА 30 мм',
                area: 0.72
            },
            'pirro-termo-40': {
                price: 647,
                name: 'PIR плита для бани ФОЛЬГА 40 мм',
                area: 0.72
            },
            'pirro-termo-50': {
                price: 770,
                name: 'PIR плита для бани ФОЛЬГА 50 мм',
                area: 0.72
            },
            'pir-foil-100': {
                price: 5564,
                name: 'PIR Плита ФОЛЬГА 100 мм',
                area: 2.88
            },
            'pir-craft-30': {
                price: 410,
                name: 'PIR Плита КРАФТ БУМАГА 30 мм',
                area: 0.72
            },
            'pir-craft-40': {
                price: 520,
                name: 'PIR Плита КРАФТ БУМАГА 40 мм',
                area: 0.72
            },
            'pir-craft-50': {
                price: 600,
                name: 'PIR Плита КРАФТ БУМАГА 50 мм',
                area: 0.72
            },
        };
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const calculator = document.getElementById('pir-calculator');
    if (!calculator) return;

    // Загружаем данные о продуктах
    await loadProductData();

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
        if (!selectedProduct) {
            resultDiv.innerHTML = '<p class="calc-error">Выбранный продукт не найден</p>';
            return;
        }

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
