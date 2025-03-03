// Установка title
// Если заголовка нет, он будет установлен
// !!! ДЛЯ CMS НЕ ПОНАДОБИТЬСЯ (начало)

let lang = document.documentElement.lang;
let title;

if (!document.title) {
    switch (document.location.pathname) {
        case '/':
            title = lang == 'ru' ? 'Главная' : 'Main';
            document.title = title;
            break;

        case '/start.html':
            title = lang == 'ru' ? 'С чего начать?' : 'Where to start?';
            document.title = title;
            break;

        case '/404.html':
            title = lang == 'ru' ? 'Страница не найдена?' : 'Page not found';
            document.title = title;
            break;

        case '/terms.html':
        case '/terms-of-trade.html':
            title = lang == 'ru' ? 'Условия торговли' : 'Trading terms';
            document.title = title;
            break;

        case '/platform.html':
            title = lang == 'ru' ? 'Торговая платформа' : 'Trading platform';
            document.title = title;
            break;

        case '/strategies.html':
            title = lang == 'ru' ? 'Торговые стратегии' : 'Trading strategies';
            document.title = title;
            break;

        case '/schedule.html':
            title = lang == 'ru' ? 'Часы работы рынка' : 'Market hours';
            document.title = title;
            break;

        case '/instruments.html':
            title = lang == 'ru' ? 'Торговые инструменты' : 'Trading instruments';
            document.title = title;
            break;

        case '/analytics.html':
            title = lang == 'ru' ? 'Аналитика рынка' : 'Market analytics';
            document.title = title;
            break;

        case '/review.html':
        case '/overview.html':
            title = lang == 'ru' ? 'Обзор рынка' : 'Market overview';
            document.title = title;
            break;

        case '/raw-materials.html':
        case '/commodities.html':
            title = lang == 'ru' ? 'Сырье' : 'Сommodities';
            document.title = title;
            break;

        case '/condition.html':
            title = lang == 'ru' ? 'Состояние рынка' : 'State of the market';
            document.title = title;
            break;

        case '/calendar.html':
            title = lang == 'ru' ? 'Экономический календарь' : 'Economic calendar';
            document.title = title;
            break;

        case '/news.html':
            title = lang == 'ru' ? 'Новости рынка' : 'Market news';
            document.title = title;
            break;

        case '/forecasts.html':
            title = lang == 'ru' ? 'Прогнозы рынка' : 'Market forecasts';
            document.title = title;
            break;

        case '/currencies.html':
            title = lang == 'ru' ? 'Валюты' : 'Currencies';
            document.title = title;
            break;

        case '/cryptocurrencies.html':
            title = lang == 'ru' ? 'Криптовалюты' : 'Cryptocurrencies';
            document.title = title;
            break;

        case '/stocks.html':
            title = lang == 'ru' ? 'Акции' : 'Stocks';
            document.title = title;
            break;

        case '/ies.html':
            title = lang == 'ru' ? 'Индексы' : 'Indices';
            document.title = title;
            break;

        case '/history.html':
            title = lang == 'ru' ? 'История компании' : 'Company history';
            document.title = title;
            break;

        case '/why.html':
            title = lang == 'ru' ? 'Почему мы?' : 'Why us?';
            document.title = title;
            break;

        case '/documents.html':
            title = lang == 'ru' ? 'Документы' : 'Documents';
            document.title = title;
            break;

        case '/about.html':
            title = lang == 'ru' ? 'О нас' : 'About us';
            document.title = title;
            break;

        case '/contacts.html':
            title = lang == 'ru' ? 'Контакты' : 'Contacts';
            document.title = title;
            break;

        case '/tips.html':
            title = lang == 'ru' ? 'Торговые советы' : 'Trading tips';
            document.title = title;
            break;

        default:
            document.title = 'Нужно установить title';
            break;
    }
}

// Установка title (конец)

// кнопка вверх (начало)

$(window).on('scroll', trackScroll);
$('.upButton').on('click', backToTop);

function trackScroll() {
    let scrolled = window.pageYOffset;

    if (scrolled > 100) {
        $('.upButton').addClass('show');
    }
    if (scrolled < 100) {
        $('.upButton').removeClass('show');
    }
}

function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// кнопка вверх (конец)

// окно с предупреждением о куки (начало)

function getCookie(name) {
    let matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
            '=([^;]*)'
        )
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options,
    }

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString()
    }

    let updatedCookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value)

    for (let optionKey in options) {
        updatedCookie += '; ' + optionKey
        let optionValue = options[optionKey]
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue
        }
    }

    document.cookie = updatedCookie
}

if (!getCookie('cookies')) {
    document.querySelector('.cookies').style = 'display: flex'
}

document.querySelector('.cookies .btn').addEventListener('click', () => {
    document.querySelector('.cookies').style = 'display: none'
    setCookie('cookies', 'true', { 'max-age': 3600 * 24 * 365 })
})

// окно с предупреждением о куки (конец)

// мобильное меню (начало)

let menuItem = $('.header .menu > .menu-item');
let subMenu = $('.header .menu > .menu-item .sub-menu');
let burger = $('.header__burger'); // кнопка открытия мобильного меню
let headerMenu = $('.header .menu'); // меню хедера
let headerBox = $('.header__box'); // блок внутри контейнера хедера, например если он в виде острова и при выпадении мобильного меню, нужно его дополнительно стилизовать

if ($(window).width() <= 1024) {

    burger.on('click', function () {
        burger.toggleClass('active');
        headerBox.toggleClass('active');
        headerMenu.toggleClass('active');

        subMenu.slideUp();
        menuItem.removeClass('active');
    })

    $('.upButton').on('click', function () {
        burger.removeClass('active');
        headerBox.removeClass('active');
        headerMenu.removeClass('active');

        subMenu.slideUp();
        menuItem.removeClass('active');
    });

    for (let i = 0; i < menuItem.length; i++) {
        menuItem.eq(i).on('click', function () {

            if (menuItem.eq(i).hasClass('active')) {

                menuItem.eq(i).removeClass('active');
                subMenu.eq(i).slideUp();

            } else {
                subMenu.slideUp();
                menuItem.removeClass('active');

                subMenu.eq(i).slideDown();
                menuItem.eq(i).addClass('active');
            }
        })
    }
}

// мобильное меню (конец)

// табы для таблиц (начало)
let tableBtn = $(".start-instruments__btn");
let tableTable = $(".start-instruments__table");
let tableShow = $(".start-instruments__show");
let tableHide = $(".start-instruments__hide");
let tableTr = $(".start-instruments__table tr");

tableHide.css('display', 'none');

for (let i = 0; i < tableBtn.length; i++) {
    tableBtn.eq(i).on("click", () => {
        for (let n = 0; n < tableBtn.length; n++) {
            tableBtn.eq(n).removeClass("active");
            tableTable.eq(n).removeClass("active");
        };

        tableBtn.eq(i).addClass("active");
        tableTable.eq(i).addClass("active");
        hideTr();
    });
};

function showTr() {
    tableTr.addClass('active');
    tableShow.css('display', 'none');
    tableHide.css('display', 'flex');
}

function hideTr() {
    tableTr.removeClass('active');
    tableHide.css('display', 'none');
    tableShow.css('display', 'flex');

    $("body, html").animate({
        scrollTop: $('.start-instruments').offset().top
    }, 600);
}

tableShow.on('click', showTr);
tableHide.on('click', hideTr);

// табы для таблиц (конец)

// плавная прокрутка до якоря (начало)

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

// плавная прокрутка до якоря (конец)

// аккордеон (начало)

$(document).ready(function () {
    $('.faq__list > li > .answer').hide();

    $('.faq__list > li').click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active").find(".answer").slideUp();
        } else {
            $(".faq__list > li.active .answer").slideUp();
            $(".faq__list > li.active").removeClass("active");
            $(this).addClass("active").find(".answer").slideDown();
        }
        return false;
    });
});

// аккордеон (конец)