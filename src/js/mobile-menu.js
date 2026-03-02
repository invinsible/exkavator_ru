(function () {    
    const burger = document.querySelector('.mobile-burger');
    const footerBtn = document.querySelector('.footerMobileMenu');
    const mainMenu = document.querySelector('.main-menu');
    const mainMenuList = document.querySelector('.main-menu__list');
    if (!burger || !mainMenu) return;

    function openMenu() {
        mainMenu.classList.add('is-open');
        burger.classList.add('is-active');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        mainMenu.classList.remove('is-open');
        burger.classList.remove('is-active');        
        setTimeout(() => {
            document.body.classList.remove('menu-open');
        }, 250);
       
        mainMenuList.querySelectorAll('.main-menu__submenu.is-open').forEach(function (sub) {
            sub.classList.remove('is-open');
        });
    }

    burger.addEventListener('click', function () {
        if (mainMenu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    footerBtn.addEventListener('click', function () {
        if (mainMenu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    mainMenuList.querySelectorAll('.main-menu__item--has-children').forEach(function (item) {
        var link = item.querySelector(':scope > .main-menu__link');
        var submenu = item.querySelector(':scope > .main-menu__submenu');
        if (!link || !submenu) return;

        link.addEventListener('click', function (e) {
            if (window.innerWidth >= 1024) return;
            e.preventDefault();
            submenu.classList.add('is-open');
        });
    });

    mainMenuList.querySelectorAll('.main-menu__back').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var submenu = btn.closest('.main-menu__submenu');
            if (submenu) {
                submenu.classList.remove('is-open');
            }
        });
    });
})();
