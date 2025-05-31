/**
 * Скрипт для адаптации таблиц под мобильные устройства
 * Конвертирует сложные таблицы в удобные карточки
 */

(function() {
    'use strict';
    
    // Проверяем, является ли устройство мобильным
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Конвертирует таблицу в мобильные карточки
    function convertTableToCards(tableContainer) {
        const table = tableContainer.querySelector('table');
        if (!table) return;
        
        const rows = table.querySelectorAll('tbody tr');
        const headers = table.querySelectorAll('thead th');
        
        if (rows.length === 0 || headers.length === 0) return;
        
        // Создаем контейнер для карточек
        let cardsContainer = tableContainer.querySelector('.mobile-cards-container');
        if (!cardsContainer) {
            cardsContainer = document.createElement('div');
            cardsContainer.className = 'mobile-cards-container';
            tableContainer.appendChild(cardsContainer);
        }
        
        // Очищаем контейнер
        cardsContainer.innerHTML = '';
        
        // Для каждой строки создаем карточку
        rows.forEach((row, index) => {
            const cells = row.querySelectorAll('td');
            if (cells.length === 0) return;
            
            const card = document.createElement('div');
            card.className = 'table-mobile-card';
            
            // Заголовок карточки (обычно первая ячейка)
            const header = document.createElement('div');
            header.className = 'table-mobile-header';
            header.textContent = cells[0].textContent.trim();
            card.appendChild(header);
            
            // Добавляем остальные данные
            for (let i = 1; i < cells.length && i < headers.length; i++) {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'table-mobile-row';
                
                const label = document.createElement('div');
                label.className = 'table-mobile-label';
                label.textContent = headers[i].textContent.trim();
                
                const value = document.createElement('div');
                value.className = 'table-mobile-value';
                
                // Сохраняем классы из оригинальной ячейки
                if (cells[i].classList.contains('best')) {
                    value.classList.add('best');
                }
                
                value.textContent = cells[i].textContent.trim();
                
                rowDiv.appendChild(label);
                rowDiv.appendChild(value);
                card.appendChild(rowDiv);
            }
            
            cardsContainer.appendChild(card);
        });
    }
    
    // Обрабатываем таблицы сравнения
    function handleComparisonTables() {
        const comparisonTables = document.querySelectorAll('.comparison-table, .economics-table, .calculation-table');
        
        comparisonTables.forEach(tableContainer => {
            const table = tableContainer.querySelector('table');
            if (!table) return;
            
            if (isMobile()) {
                // На мобильных - показываем карточки, скрываем таблицу
                table.style.display = 'none';
                convertTableToCards(tableContainer);
                
                const cardsContainer = tableContainer.querySelector('.mobile-cards-container');
                if (cardsContainer) {
                    cardsContainer.style.display = 'block';
                }
            } else {
                // На десктопе - показываем таблицу, скрываем карточки
                table.style.display = 'table';
                
                const cardsContainer = tableContainer.querySelector('.mobile-cards-container');
                if (cardsContainer) {
                    cardsContainer.style.display = 'none';
                }
            }
        });
    }
    
    // Обрабатываем специальные таблицы с множественными заголовками
    function handleSpecialTables() {
        // Обработка таблиц с заголовками-колонками (например, сравнение PIR vs другие материалы)
        const specialTables = document.querySelectorAll('.comparison-table table');
        
        specialTables.forEach(table => {
            const container = table.closest('.comparison-table');
            if (!container || !isMobile()) return;
            
            const thead = table.querySelector('thead');
            const tbody = table.querySelector('tbody');
            
            if (!thead || !tbody) return;
            
            const headerRow = thead.querySelector('tr');
            const dataRows = tbody.querySelectorAll('tr');
            
            if (!headerRow || dataRows.length === 0) return;
            
            const headers = headerRow.querySelectorAll('th');
            
            // Создаем карточки для каждого столбца (кроме первого)
            let cardsContainer = container.querySelector('.mobile-cards-container');
            if (!cardsContainer) {
                cardsContainer = document.createElement('div');
                cardsContainer.className = 'mobile-cards-container';
                container.appendChild(cardsContainer);
            }
            
            cardsContainer.innerHTML = '';
            
            // Для каждого столбца материала создаем отдельную карточку
            for (let colIndex = 1; colIndex < headers.length; colIndex++) {
                const card = document.createElement('div');
                card.className = 'table-mobile-card';
                
                // Заголовок карточки - название материала
                const header = document.createElement('div');
                header.className = 'table-mobile-header';
                header.textContent = headers[colIndex].textContent.trim();
                
                // Добавляем класс цвета заголовка
                if (headers[colIndex].classList.contains('header-pir')) {
                    header.style.background = '#1A4C8A';
                    header.style.color = 'white';
                    header.style.padding = '8px';
                    header.style.borderRadius = '4px';
                } else if (headers[colIndex].classList.contains('header-other')) {
                    header.style.background = '#6c757d';
                    header.style.color = 'white';
                    header.style.padding = '8px';
                    header.style.borderRadius = '4px';
                }
                
                card.appendChild(header);
                
                // Добавляем данные из каждой строки
                dataRows.forEach(row => {
                    const cells = row.querySelectorAll('td, th');
                    if (cells.length > colIndex) {
                        const rowDiv = document.createElement('div');
                        rowDiv.className = 'table-mobile-row';
                        
                        const label = document.createElement('div');
                        label.className = 'table-mobile-label';
                        label.textContent = cells[0].textContent.trim();
                        
                        const value = document.createElement('div');
                        value.className = 'table-mobile-value';
                        
                        // Сохраняем классы из оригинальной ячейки
                        if (cells[colIndex].classList.contains('best')) {
                            value.classList.add('best');
                        }
                        
                        value.textContent = cells[colIndex].textContent.trim();
                        
                        rowDiv.appendChild(label);
                        rowDiv.appendChild(value);
                        card.appendChild(rowDiv);
                    }
                });
                
                cardsContainer.appendChild(card);
            }
        });
    }
    
    // Инициализация
    function init() {
        handleComparisonTables();
        handleSpecialTables();
    }
    
    // Запуск при загрузке страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Перезапуск при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            init();
        }, 250);
    });
    
})();
