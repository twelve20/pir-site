document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate-savings');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateSavings);
    }
});

function calculateSavings() {
    const houseType = document.getElementById('house-type').value;
    const area = parseInt(document.getElementById('square-meters').value);
    const region = document.getElementById('region').value;
    
    // Базовые значения для расчетов
    let baseSavingsPerSqm = 300; // базовая экономия на м² в год
    let basePaybackYears = 3; // базовый срок окупаемости в годах
    let baseHeatLossReduction = 40; // базовое снижение теплопотерь в %
    
    // Корректировки по типу здания
    if (houseType === 'house') {
        baseSavingsPerSqm *= 1.2;
        basePaybackYears *= 0.9;
    } else if (houseType === 'commercial') {
        baseSavingsPerSqm *= 1.5;
        basePaybackYears *= 0.8;
    }
    
    // Корректировки по региону
    if (region === 'north') {
        baseSavingsPerSqm *= 1.4;
        basePaybackYears *= 0.8;
        baseHeatLossReduction *= 1.1;
    } else if (region === 'south') {
        baseSavingsPerSqm *= 0.8;
        basePaybackYears *= 1.2;
        baseHeatLossReduction *= 0.9;
    }
    
    // Расчет итоговых значений
    const yearlySavings = Math.round(baseSavingsPerSqm * area);
    const paybackPeriod = basePaybackYears.toFixed(1);
    const heatLossReduction = Math.round(baseHeatLossReduction);
    
    // Отображение результатов
    document.getElementById('yearly-savings').textContent = `${yearlySavings.toLocaleString('ru-RU')} ₽`;
    document.getElementById('payback-period').textContent = `${paybackPeriod} года`;
    document.getElementById('heat-loss-reduction').textContent = `до ${heatLossReduction}%`;
    
    // Делаем результаты видимыми
    document.getElementById('savings-result').style.display = 'flex';
} 