// мобильное меню
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".header .menu > .menu-item");
    const subMenus = document.querySelectorAll(".header .menu > .menu-item > .sub-menu");
    const burger = document.querySelector(".header__burger");
    const headerMenu = document.querySelector(".header .menu");
    const headerBox = document.querySelector(".header");
    const upButton = document.querySelector(".upButton");

    let isEnabled = false;
    let resizeTimeout;

    // простая slideUp/slideDown реализация
    function slideUp(element) {
        element.style.height = element.scrollHeight + "px"; // стартовая высота
        requestAnimationFrame(() => {
            element.style.transition = "height 0.3s ease";
            element.style.height = "0";
        });
        element.classList.remove("active");
        element.addEventListener("transitionend", function handler() {
            element.style.display = "none";
            element.style.removeProperty("height");
            element.style.removeProperty("transition");
            element.removeEventListener("transitionend", handler);
        });
    }

    function slideDown(element) {
        element.style.display = "block";
        element.style.height = "0";
        element.style.transition = "height 0.3s ease";
        requestAnimationFrame(() => {
            element.style.height = element.scrollHeight + "px";
        });
        element.classList.add("active");
        element.addEventListener("transitionend", function handler() {
            element.style.removeProperty("height");
            element.style.removeProperty("transition");
            element.removeEventListener("transitionend", handler);
        });
    }

    function closeAllSubMenus() {
        menuItems.forEach(item => item.classList.remove("active"));
        subMenus.forEach(sub => {
            if (sub.style.display !== "none") {
                slideUp(sub);
            } else {
                sub.classList.remove("active");
                sub.style.removeProperty("display");
            }
        });
    }

    function toggleMobileMenu() {
        burger.classList.toggle("active");
        headerBox.classList.toggle("active");
        headerMenu.classList.toggle("active");

        if (!burger.classList.contains("active")) {
            closeAllSubMenus();
        }
    }

    function bindHandlers() {
        burger.addEventListener("click", toggleMobileMenu);

        upButton.addEventListener("click", () => {
            burger.classList.remove("active");
            headerBox.classList.remove("active");
            headerMenu.classList.remove("active");
            closeAllSubMenus();
        });

        menuItems.forEach(item => {
            const link = item.querySelector(":scope > a");
            link.addEventListener("click", (e) => {
                const href = link.getAttribute("href");

                if (href === "##") {
                    e.preventDefault();
                    const submenu = item.querySelector(":scope > .sub-menu");

                    if (submenu.classList.contains("active")) {
                        slideUp(submenu);
                        item.classList.remove("active");
                    } else {
                        closeAllSubMenus();
                        slideDown(submenu);
                        item.classList.add("active");
                    }
                } else {
                    burger.classList.remove("active");
                    headerBox.classList.remove("active");
                    headerMenu.classList.remove("active");
                    closeAllSubMenus();
                }
            });
        });

        isEnabled = true;
    }

    function unbindHandlers() {
        burger.replaceWith(burger.cloneNode(true));
        upButton.replaceWith(upButton.cloneNode(true));
        menuItems.forEach(item => {
            const link = item.querySelector(":scope > a");
            link.replaceWith(link.cloneNode(true));
        });

        burger.classList.remove("active");
        headerBox.classList.remove("active");
        headerMenu.classList.remove("active");

        subMenus.forEach(sub => {
            sub.style.removeProperty("display");
            sub.classList.remove("active");
        });
        menuItems.forEach(item => item.classList.remove("active"));

        isEnabled = false;
    }

    function checkWidth() {
        if (window.innerWidth <= 1200) {
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

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkWidth, 150);
    });
});