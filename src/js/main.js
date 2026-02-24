const dropdownButtons = document.querySelectorAll('.button--dropdown');
if (dropdownButtons.length > 0) {
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('is-open');
        });
    })
    
}


const dropdownFields = document.querySelectorAll('.field-dropdown');

if(dropdownFields.length > 0) {
    function closeAllSelects(except = null) {
        dropdownFields.forEach((el) => {
            if (el !== except) {
                el.classList.remove('is-open');
            }
        });
}

    dropdownFields.forEach((el) => {
        const input = el.querySelector('input');
        input.readOnly = true;

        el.addEventListener('click', (e) => {
            // if (e.target === input) return;
            e.stopPropagation();
            closeAllSelects(el);
            el.classList.toggle('is-open');
        });

        const options = el.querySelectorAll('.dropdown-backdrop__option');
        options.forEach((option) => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                el.querySelector('.dropdown-backdrop__option.selected')?.classList.remove('selected');
                input.value = input.type === 'number'
                    ? option.textContent.trim().replace(/\s/g, '')
                    : option.textContent.trim();
                option.classList.add('selected');
                el.classList.add('selected');
                el.classList.remove('is-open');
            });
        });

    })
}

document.addEventListener('click', () => {
    closeAllSelects();
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

