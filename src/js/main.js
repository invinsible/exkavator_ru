function initDropdowns(selector, { onSelect } = {}) {
    const containers = document.querySelectorAll(selector);
    if (!containers.length) return containers;

    containers.forEach(container => {
        container.addEventListener('click', (e) => {
            if (e.target.closest('.dropdown-backdrop') && !e.target.closest('.dropdown-backdrop__option')) {
                e.stopPropagation();
                return;
            }
            e.stopPropagation();
            containers.forEach(c => { if (c !== container) c.classList.remove('is-open'); });
            container.classList.toggle('is-open');
        });

        container.querySelectorAll('.dropdown-backdrop__option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                container.querySelector('.dropdown-backdrop__option.selected')?.classList.remove('selected');
                option.classList.add('selected');
                container.classList.remove('is-open');
                if (onSelect) onSelect(option, container);
            });
        });
    });

    return containers;
}

const dropdownFields = initDropdowns('.field-dropdown', {
    onSelect(option, container) {
        const input = container.querySelector('input');
        input.value = input.type === 'number'
            ? option.textContent.trim().replace(/\s/g, '')
            : option.textContent.trim();
        container.classList.add('selected');
        const searchInput = container.querySelector('.field-text__input');
        if (searchInput) searchInput.value = '';
    }
});

dropdownFields.forEach(el => {
    const input = el.querySelector('input');
    if (input) input.readOnly = true;
});

initDropdowns('.sorting', {
    onSelect(option, container) {
        const btn = container.querySelector('.button--dropdown');
        if (btn) btn.textContent = option.textContent.trim();
    }
});

document.addEventListener('click', () => {
    document.querySelectorAll('.field-dropdown, .sorting').forEach(el => el.classList.remove('is-open'));
});

const burger = document.querySelector('.mobile-burger');
if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('is-active');
    });
}

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

