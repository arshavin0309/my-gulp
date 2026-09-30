const header = document.querySelector('header');

const updateHeaderHeight = () => {
    document.documentElement.style.setProperty(
        '--header-height',
        `${header.offsetHeight}px`
    );
};

const headerObserver = new ResizeObserver(updateHeaderHeight);

headerObserver.observe(header);

updateHeaderHeight();