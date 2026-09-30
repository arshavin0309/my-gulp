const footer = document.querySelector('footer');

const updateFooterHeight = () => {
    document.documentElement.style.setProperty(
        '--footer-height',
        `${footer.offsetHeight}px`
    );
};

const footerObserver = new ResizeObserver(updateFooterHeight);

footerObserver.observe(footer);

updateFooterHeight();