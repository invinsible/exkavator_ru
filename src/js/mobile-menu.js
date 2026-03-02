(function () {
    const header = document.querySelector('.main-header');
    const burger = document.querySelector('.mobile-burger');
    const footerBtn = document.querySelector('.footerMobileMenu');
    const menu = document.querySelector('.main-menu');
    if (!burger || !menu) return;

    function openMenu() {
        menu.classList.add('is-open');
        burger.classList.add('is-active');
        // header.classList.add('fixed');
        document.body.classList.add('menu-open');
        // document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.classList.remove('is-open');
        burger.classList.remove('is-active');
        // header.classList.remove('fixed');
        // document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
        // setTimeout(() => {
            
        // }, 300);
       
        menu.querySelectorAll('.main-menu__submenu.is-open').forEach(function (sub) {
            sub.classList.remove('is-open');
        });
    }

    burger.addEventListener('click', function () {
        if (menu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    footerBtn.addEventListener('click', function () {
        if (menu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menu.querySelectorAll('.main-menu__item--has-children').forEach(function (item) {
        var link = item.querySelector(':scope > .main-menu__link');
        var submenu = item.querySelector(':scope > .main-menu__submenu');
        if (!link || !submenu) return;

        link.addEventListener('click', function (e) {
            if (window.innerWidth >= 1024) return;
            e.preventDefault();
            submenu.classList.add('is-open');
        });
    });

    menu.querySelectorAll('.main-menu__back').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var submenu = btn.closest('.main-menu__submenu');
            if (submenu) {
                submenu.classList.remove('is-open');
            }
        });
    });
})();
