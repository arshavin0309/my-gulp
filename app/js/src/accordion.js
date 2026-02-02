// Структура для работы аккордеона, класс accordion не менять!
// <ul class="accordion">
//     <li>
//         <h3 class="title">Заголовок</h3>
//         <div class="answer">Контент</div>
//     </li>
// </ul>

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.accordion > li');

    // --- начальная инициализация (всё свернуто)
    items.forEach(item => {
        const answer = item.querySelector('.answer');
        if (!answer) return;

        gsap.set(answer, {
            height: 0,
            overflow: 'hidden'
        });

        item.classList.remove('active');
    });

    items.forEach(item => {
        const answer = item.querySelector('.answer');
        if (!answer) return;

        item.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // --- закрываем все остальные
            items.forEach(other => {
                if (other === item) return;

                other.classList.remove('active');
                const otherAnswer = other.querySelector('.answer');

                if (!otherAnswer) return;

                gsap.killTweensOf(otherAnswer);
                gsap.to(otherAnswer, {
                    height: 0,
                    duration: 0.35,
                    ease: "power2.out"
                });
            });

            // --- переключаем текущий
            if (isOpen) {
                item.classList.remove('active');

                gsap.killTweensOf(answer);
                gsap.to(answer, {
                    height: 0,
                    duration: 0.35,
                    ease: "power2.out"
                });

            } else {
                item.classList.add('active');

                // важно: сначала auto, потом измеряем
                gsap.set(answer, { height: "auto" });
                const h = answer.offsetHeight;
                gsap.set(answer, { height: 0 });

                gsap.killTweensOf(answer);
                gsap.to(answer, {
                    height: h,
                    duration: 0.35,
                    ease: "power2.out"
                });
            }
        });
    });
});