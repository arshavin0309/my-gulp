// мобильное меню
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const burger = document.querySelector(".header__burger");
    const menuItems = document.querySelectorAll(".header .menu > .menu-item");
    const subMenus = document.querySelectorAll(".header .menu > .menu-item > .sub-menu");
    const headerBox = document.querySelector(".header .menu"); // выезжающий блок
    const mediaQuery = window.matchMedia("(max-width: 1200px)");

    if (subMenus.length > 0) {
        subMenus.forEach(subMenu => {
            subMenu.style.maxHeight = "0px";
        })
    }

    function handleChange(e) {
        // при клике на Esc
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                // Закрываем меню
                if (header) header.classList.remove("active");
                if (burger) burger.classList.remove("active");
                if (headerBox) headerBox.classList.remove("active");

                // Закрываем все подменю
                if (subMenus.length > 0) {
                    subMenus.forEach(subMenu => {
                        subMenu.classList.remove('active');
                        subMenu.closest('.menu-item')?.classList.remove('active');

                        if (e.matches) {
                            subMenu.style.maxHeight = "0px";
                        } else {
                            subMenu.style.maxHeight = "";
                        }
                    });
                }
            }
        });

        if (e.matches) {
            // экран <= 1200
            if (subMenus.length > 0) {
                subMenus.forEach(subMenu => {
                    subMenu.style.maxHeight = "0px";
                })
            }

            if (burger) burger.onclick = () => {
                if (burger.classList.contains('active')) {
                    // Закрыли меню
                    if (header) header.classList.remove("active");
                    if (burger) burger.classList.remove("active");
                    if (headerBox) headerBox.classList.remove("active");

                    if (subMenus.length > 0) {
                        subMenus.forEach(subMenu => {
                            subMenu.style.maxHeight = "0px";
                            subMenu.classList.remove('active');
                            subMenu.closest('.menu-item')?.classList.remove('active');
                        })
                    }
                } else {
                    // Активировали меню
                    if (header) header.classList.add("active");
                    if (burger) burger.classList.add("active");
                    if (headerBox) headerBox.classList.add("active");
                }
            };

            if (menuItems.length > 0) {
                menuItems.forEach(menuItem => {
                    menuItem.onclick = () => {
                        const link = menuItem.querySelector("a");

                        // Считаем количество решеток в ссылке
                        const hashCount = (link.href.match(/#/g) || []).length;

                        // Если решетка одна, то это точно якорь
                        if (hashCount === 1) {
                            if (header) header.classList.remove("active");
                            if (burger) burger.classList.remove("active");
                            if (headerBox) headerBox.classList.remove("active");
                        }

                        const subMenu = menuItem.querySelector(".sub-menu");

                        // Проверяем существует ли subMenu
                        if (!subMenu) return;

                        // Закрываем все подменю кроме текущего
                        menuItems.forEach(otherItem => {
                            const otherSubMenu = otherItem.querySelector(".sub-menu");

                            if (otherSubMenu && otherItem !== menuItem) {
                                otherSubMenu.classList.remove('active');
                                otherSubMenu.style.maxHeight = "0px";
                                otherItem.classList.remove('active');
                            }
                        });

                        // Переключаем текущее подменю
                        subMenu.classList.toggle('active');
                        menuItem.classList.toggle('active');

                        if (subMenu.classList.contains('active')) {
                            subMenu.style.maxHeight = subMenu.scrollHeight + "px";
                        } else {
                            subMenu.style.maxHeight = "0px";
                        }
                    }
                });
            }

        } else {
            // экран > 1200
            if (header) header.classList.remove("active");
            if (burger) burger.classList.remove("active");
            if (headerBox) headerBox.classList.remove("active");

            if (subMenus.length > 0) {
                subMenus.forEach(subMenu => {
                    subMenu.style.maxHeight = "";
                    subMenu.classList.remove('active');
                    subMenu.closest('.menu-item')?.classList.remove('active');
                })
            }
        }
    }

    // проверяем при загрузке
    handleChange(mediaQuery);

    // слушаем изменения
    mediaQuery.addEventListener("change", handleChange);
});