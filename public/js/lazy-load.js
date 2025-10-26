// Lazy Loading для изображений
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем lazy loading ко всем изображениям без атрибута loading
    const images = document.querySelectorAll('img:not([loading])');

    images.forEach(img => {
        // Не применяем lazy loading к первым 3 изображениям (above the fold)
        const isAboveFold = img.getBoundingClientRect().top < window.innerHeight;

        if (!isAboveFold) {
            img.setAttribute('loading', 'lazy');
        }
    });

    console.log(`Lazy loading применен к ${images.length} изображениям`);
});
