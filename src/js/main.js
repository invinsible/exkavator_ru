const dropdownButtons = document.querySelectorAll('.button--dropdown');
if (dropdownButtons.length > 0) {
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('is-open');
        });
    })
    
}


const dropdownFields = document.querySelectorAll('.field-dropdown');

function closeAllSelects(except = null) {
    dropdownFields.forEach((el) => {
        if (el !== except) {
            el.classList.remove('is-open');
        }
    });
}

if(dropdownFields.length > 0) {
    dropdownFields.forEach((el) => {
        const input = el.querySelector('input');
        input.readOnly = true;

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllSelects(el);
            el.classList.toggle('is-open');
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
    slidesPerView: 1,
    spaceBetween: 8,
    navigation: {
        nextEl: '.special-offers__next',
        prevEl: '.special-offers__prev',
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1280: { slidesPerView: 3, spaceBetween: 12, },
    }
});

