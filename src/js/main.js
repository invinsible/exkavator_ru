const selectFields = document.querySelectorAll('.field--select');

function closeAllSelects(except = null) {
    selectFields.forEach((el) => {
        if (el !== except) {
            el.classList.remove('is-open');
        }
    });
}

if(selectFields.length > 0) {
    selectFields.forEach((el) => {
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


