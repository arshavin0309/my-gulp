// мобильное меню
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const burger = document.querySelector(".header__burger");
    const menuItems = document.querySelectorAll(".header .menu > .menu-item");
    const subMenus = document.querySelectorAll(".header .menu > .menu-item > .sub-menu");
    const headerBox = document.querySelector(".header__content");
    const mediaQuery = window.matchMedia("(max-width: 1200px)");

    if (subMenus.length > 0) {
        subMenus.forEach(subMenu => {
            subMenu.style.maxHeight = "0px";
        })
    }

    function handleChange(e) {
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
                    burger.classList.remove("active");
                    if (headerBox) headerBox.classList.remove("active");

                    if (subMenus.length > 0) {
                        subMenus.forEach(subMenu => {
                            subMenu.style.maxHeight = "0px";
                            subMenu.classList.remove('active');
                        })
                    }
                } else {
                    // Активировали меню
                    if (header) header.classList.add("active");
                    burger.classList.add("active");
                    if (headerBox) headerBox.classList.add("active");
                }
            };

            if (menuItems.length > 0) {
                menuItems.forEach(menuItem => {
                    menuItem.onclick = () => {
                        const subMenu = menuItem.querySelector(".sub-menu");

                        // Проверяем существует ли subMenu
                        if (!subMenu) return;

                        // Закрываем все подменю кроме текущего
                        menuItems.forEach(otherItem => {
                            const otherSubMenu = otherItem.querySelector(".sub-menu");

                            if (otherSubMenu && otherItem !== menuItem) {
                                otherSubMenu.classList.remove('active');
                                otherSubMenu.style.maxHeight = "0px";
                            }
                        });

                        // Переключаем текущее подменю
                        subMenu.classList.toggle('active');

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
                })
            }
        }
    }

    // проверяем при загрузке
    handleChange(mediaQuery);

    // слушаем изменения
    mediaQuery.addEventListener("change", handleChange);
});