// новая версия аккордеона

$(document).ready(function () {
    $('.partner-tags__list > li').click(function (e) {
        $(".partner-tags__list > li").not($(this)).removeClass("active").find(".answer").slideUp();
        $(this).toggleClass("active").find(".answer").slideToggle();
    });
});