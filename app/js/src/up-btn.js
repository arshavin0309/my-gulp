// кнопка наверх
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.upButton');
    const header = document.querySelector('.header');
    const logo = document.querySelector('.header__logo');

    function trackScroll() {
        const scrolled = window.scrollY;
        const show = scrolled > 100;

        if(btn) btn.classList.toggle('show', show);
        if(header) header.classList.toggle('scrolled', show);
    }

    window.addEventListener('scroll', trackScroll);
    trackScroll(); // Проверка при загрузке

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (btn) btn.addEventListener('click', scrollToTop);
    if (logo) logo.addEventListener('click', scrollToTop);
});