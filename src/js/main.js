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


