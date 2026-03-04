// слайдеры
const specialOffersSlider = new Swiper('.special-offers__slider', {
    slidesPerView: 1.15,
    spaceBetween: 8,
    navigation: {
        nextEl: '.special-offers__next',
        prevEl: '.special-offers__prev',
    },
    breakpoints: {
        480: { spaceBetween: 12 },
        768: { slidesPerView: 3 },       
    }
});

const filterChipsSlider = new Swiper('.slider-chips__slider', {
    slidesPerView: 'auto',
    spaceBetween: 6,
    navigation: {
        nextEl: '.slider-chips__next',
        prevEl: '.slider-chips__prev',
    },
});

const companiesSlider = new Swiper('.companies__slider', {
    slidesPerView: 4,
    spaceBetween: 9,
    breakpoints: {
        480: { spaceBetween: 12 },
        560: { slidesPerView: 5 },
        700: { slidesPerView: 6 },
        1440: { slidesPerView: 8 },
    }
});

// item-card-more: показать/свернуть
document.querySelectorAll('.item-card-more').forEach(block => {
    const button = block.querySelector('.item-card-more__button');
    const items = block.querySelectorAll('.item-card-more__item');
    if (!button || items.length <= 2) {
        if (button) button.style.display = 'none';
        return;
    }

    const defaultText = button.textContent;

    button.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = block.classList.toggle('is-open');
        button.textContent = isOpen ? 'Свернуть' : defaultText;
    });
});

// футер
const currentYear = document.querySelector('.main-footer__current-year');
if (currentYear) {
    currentYear.innerHTML = new Date().getFullYear();
}