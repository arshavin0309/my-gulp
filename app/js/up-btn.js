// кнопка наверх

$(function () {
    const $btn = $('.upButton');
    const $header = $('.header');

    function trackScroll() {
        const scrolled = window.pageYOffset;
        const show = scrolled > 100;

        $btn.toggleClass('show', show);
        $header.toggleClass('scrolled', show);
    }

    $(window).on('scroll', trackScroll);
    trackScroll(); // Проверка при загрузке

    $btn.on('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});