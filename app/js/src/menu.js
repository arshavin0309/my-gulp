// мобильное меню

$(function () {
    const menuItems = $('.header .menu > .menu-item');
    const subMenus = $('.header .menu > .menu-item > .sub-menu');
    const burger = $('.header__burger');
    const headerMenu = $('.header__content');
    const headerBox = $('.header');
    const upButton = $('.upButton');

    let isEnabled = false;

    function closeAllSubMenus() {
        menuItems.removeClass('active');
        subMenus.removeClass('active').slideUp();
    }

    function toggleMobileMenu() {
        burger.toggleClass('active');
        headerBox.toggleClass('active');
        headerMenu.toggleClass('active');

        if (!burger.hasClass('active')) {
            closeAllSubMenus();
        }
    }

    function bindHandlers() {
        burger.on('click.mobileMenu', function () {
            toggleMobileMenu();
        });

        upButton.on('click.mobileMenu', function () {
            burger.removeClass('active');
            headerBox.removeClass('active');
            headerMenu.removeClass('active');
            closeAllSubMenus();
        });

        menuItems.on('click.mobileMenu', '> a', function (e) {
            const $parentItem = $(this).parent();

            // Если есть подменю — отменяем переход и переключаем меню
            if ($parentItem.children('.sub-menu').length) {
                e.preventDefault();

                const $submenu = $parentItem.children('.sub-menu');

                if ($submenu.is(':visible')) {
                    $submenu.removeClass('active').slideUp();
                    $parentItem.removeClass('active');
                } else {
                    closeAllSubMenus();
                    $submenu.addClass('active').slideDown();
                    $parentItem.addClass('active');
                }
            }
            // Иначе — переход по ссылке происходит как обычно
        });

        isEnabled = true;
    }

    function unbindHandlers() {
        burger.off('.mobileMenu');
        upButton.off('.mobileMenu');
        menuItems.off('.mobileMenu');

        burger.removeClass('active');
        headerBox.removeClass('active');
        headerMenu.removeClass('active');
        subMenus.removeAttr('style').removeClass('active');
        menuItems.removeClass('active');

        isEnabled = false;
    }

    function checkWidth() {
        if ($(window).width() <= 1200) {
            if (!isEnabled) {
                closeAllSubMenus();
                bindHandlers();
            }
        } else {
            if (isEnabled) {
                unbindHandlers();
            }
        }
    }

    checkWidth();

    let resizeTimeout;
    $(window).on('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkWidth, 150);
    });
});
