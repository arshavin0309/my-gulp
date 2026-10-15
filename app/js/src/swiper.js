// шаблон инициализации слайдера
const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto', // задаёт конкретное количество слайдов
    spaceBetween: 5, // задаёт отступ между слайдами в пикселях
    direction: 'vertical', // слайдер становится вертикальным
    loop: true, // включает бесконечную прокрутку
    initialSlide: 2, // при инициализации слайдер стартует не с первого слайда. Loop выключить
    speed: 600, // Анимация перехода длится 600 мс (0.6 сек)
    allowTouchMove: false, // отключает возможность перетаскивать слайды пальцем
    freeMode: true, // отключает «прилипание» к слайдам и включает инерцию
    watchSlidesProgress: true, // начинает отслеживать «прогресс» слайдов: насколько каждый слайд виден и в каком он состоянии
   
    thumbs: {
        swiper: platformPlatformLeft, // platformPlatformLeft управляет слайдером
    },

    autoplay: {
        delay: 2000, // Задержка между переходами в мс (5 секунд)
        disableOnInteraction: false, // Автопрокрутка не останавливается при ручном управлении
        pauseOnMouseEnter: true, // Приостановка при наведении курсора
        reverseDirection: false, // Прямое направление
        stopOnLastSlide: false, // В режиме зацикливания не останавливает автопрокрутку
        waitForTransition: true, // Ожидание завершения анимации
    },

    pagination: {
        el: '.swiper-pagination',
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    scrollbar: {
        el: '.swiper-scrollbar',
    },
});