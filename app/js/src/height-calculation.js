const updateElementHeight = (element, variable) => {
    if (!element) return;

    const updateHeight = () => {
        document.documentElement.style.setProperty(
            variable,
            `${element.offsetHeight}px`
        );
    };

    const observer = new ResizeObserver(updateHeight);

    observer.observe(element);
    updateHeight();
};

updateElementHeight(
    document.querySelector('header'),
    '--header-height'
);

updateElementHeight(
    document.querySelector('footer'),
    '--footer-height'
);