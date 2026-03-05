// Popup
document.querySelectorAll('.js-open-popup').forEach(function (button) {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const popupId = button.dataset.popupId;
        const popup = document.getElementById(popupId);
        if (popup) {
            // Компенсируем скролл
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = scrollbarWidth + 'px';
            popup.classList.add('is-open');
            document.body.classList.add('popup-open');
        }
    });
});

function closePopup(popup) {
    popup.classList.remove('is-open');
    popup.addEventListener('transitionend', function handler() {
        popup.removeEventListener('transitionend', handler);
        document.body.classList.remove('popup-open');
        document.body.style.paddingRight = '';
    });
}

document.querySelectorAll('.popup').forEach(function (popup) {
    popup.addEventListener('click', function (e) {
        if (e.target === popup) closePopup(popup);
    });

    const closeBtn = popup.querySelector('.popup__close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            closePopup(popup);
        });
    }
});
