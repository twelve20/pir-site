document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.swiper-slide');
    const prevButton = document.querySelector('.sales-slider .hero-nav--prev');
    const nextButton = document.querySelector('.sales-slider .hero-nav--next');
    const indicators = document.querySelectorAll('.sales-slider .hero-indicator');
    let currentSlide = 0;

    // Function to update slide visibility
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Show current slide and update indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    // Previous button click handler
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            showSlide(currentSlide);
        });
    }

    // Next button click handler
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
    }

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }, 5000);

    // Show initial slide
    showSlide(currentSlide);
});