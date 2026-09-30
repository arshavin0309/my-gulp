gsap.utils.toArray('section').forEach(section => {
    const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const textNodes = section.querySelectorAll('p, ul, ol');
    const filtered = [...textNodes].filter(el => !el.closest('.accordion'));

    const animatedElements = [
        section,
        ...headings,
        ...filtered
    ];

    // Отключаем глобальный transition для элементов,
    // которыми управляет GSAP
    animatedElements.forEach(el => {
        el.classList.add('gsap-animation');
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            once: true,
            fastScrollEnd: true
        },

        onComplete: () => {
            // После завершения GSAP возвращаем обычный transition
            animatedElements.forEach(el => {
                el.classList.remove('gsap-animation');
            });
        }
    });

    tl.from(section, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out'
    });

    tl.from(headings, {
        y: 30,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
        stagger: 0.1
    });

    tl.from(filtered, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
        stagger: 0.05
    });
});

document.body.classList.remove('preload');