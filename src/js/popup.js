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
        } else {
            console.warn('В разметке не найден нужный popup');
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

    const cancelBtn = popup.querySelector('.js-close-popup');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            closePopup(popup);
        });
    }
});

// // Попап Заказать обратный звонок
// (function () {
//     const popup = document.getElementById('popup-callback');
//     if (!popup) return;

//     const phoneInput = popup.querySelector('#callback-phone');
//     const personalDataCheckbox = popup.querySelector('#ch-presonal-data');
//     const submitBtn = popup.querySelector('.send-callback-form');

//     function updateSubmitState() {
//         const phoneFilled = phoneInput.value.indexOf('_') === -1;
//         const agreed = personalDataCheckbox.checked;
//         submitBtn.disabled = !(phoneFilled && agreed);
//     }

//     phoneInput.addEventListener('input', updateSubmitState);
//     personalDataCheckbox.addEventListener('change', updateSubmitState);

//     submitBtn.addEventListener('click', function () {
//         if (submitBtn.disabled) return;
//         console.log(phoneInput.value); // отправляем на сервер
//         closePopup(popup);
//     });
// })();
