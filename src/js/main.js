// Header
const userControlsMobileButton  = document.querySelector('.user-controls__mobile-button');
const showHeaderSearchButton  = document.querySelector('.js-header-search');
const headerSearch = document.querySelector('.main-header-search');

if(userControlsMobileButton) {
    userControlsMobileButton.addEventListener('click', function () {
        this.classList.toggle('is-open');
    });
}

// поиск в header
if (headerSearch) {    
    const headerSearchInput = headerSearch.querySelector('.main-header-search__input');
    const headerSearchControls = headerSearch.querySelector('.main-header-search__controls');
    const headerSearchReset = headerSearch.querySelector('.main-header-search__reset');
    const headerSearchSubmit = headerSearch.querySelector('.main-header-search__submit');

    showHeaderSearchButton.addEventListener('click', function (e) {
        e.stopPropagation();
        headerSearch.classList.toggle('is-show');
        headerSearchInput.focus();
    });    

    headerSearchInput.addEventListener('input', function(e) {
        headerSearchControls.classList.toggle('show', e.target.value.length > 0);
    });

    headerSearchReset.addEventListener('click', function() {
        headerSearchInput.value = '';
        headerSearchControls.classList.remove('show');
    });

    headerSearchSubmit.addEventListener('click', function() {
        console.log(headerSearchInput.value);
    });
}


// слайдеры
const specialOffersSlider = new Swiper('.special-offers__slider', {
    slidesPerView: 1.15,
    spaceBetween: 8,
    navigation: {
        nextEl: '.special-offers__next',
        prevEl: '.special-offers__prev',
    },
    breakpoints: {
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


// клик аутсайд
const clickOutsideTargets = [
    { selector: '.field-dropdown', stateClass: 'is-open' },
    { selector: '.sorting', stateClass: 'is-open' },
    { selector: '.detail-item-mobile-footer__more', stateClass: 'is-open' },
    { selector: '.main-header-search', stateClass: 'is-show', ignore: '.js-header-search' },
];

document.addEventListener('click', (e) => {
    clickOutsideTargets.forEach(({ selector, stateClass, ignore }) => {
        if (e.target.closest(selector)) return;
        if (ignore && e.target.closest(ignore)) return;
        document.querySelectorAll(selector).forEach(el => el.classList.remove(stateClass));
    });
});

// Маска телефона (iMask)
// document.querySelectorAll('input[type="tel"]').forEach(function (input) {
//     IMask(input, {
//         mask: '+{7} (000) 000-00-00',
//         lazy: false,
//         placeholderChar: '_'
//     });
// });