document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray("section").forEach(section => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                once: true,
                fastScrollEnd: true
            }
        });

        // 1️⃣ Секция
        tl.from(section, {
            opacity: 0,
            x: 0,
            duration: 0.25,
            ease: "power2.out"
        });

        // 2️⃣ Заголовки внутри секции
        tl.from(section.querySelectorAll("h1, h2, h3, h4, h5, h6"), {
            y: 30,
            opacity: 0,
            duration: 0.25,
            ease: "power2.out",
            stagger: 0.1
        });

        // 3️⃣ Параграфы и списки
        const textNodes = section.querySelectorAll("p, ul, ol");
        const filtered = [...textNodes].filter(el => !el.closest('.answer'));

        tl.from(filtered, {
            x: 0,
            opacity: 0,
            duration: 0.25,
            ease: "power2.out",
            stagger: 0.05
        });
    });

    document.body.classList.remove('preload');
})