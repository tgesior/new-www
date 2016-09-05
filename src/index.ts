require('normalize.css/normalize.css');

const pages = ['index', 'team', 'services'];

try {
    for (let page of pages) {
        require(`file?name=[name].[ext]!./${page}.html`);
        if (__webpack_modules__[require.resolveWeak(`./${page}.scss`)]) {
            require(`./${page}.scss`);
        }
    }
} catch (err) {
    if (!__webpack_modules__) {
        throw err;
    }
}

document.getElementById('nav-icon').addEventListener('click', event => document.getElementsByTagName('nav')[0].classList.toggle('expanded'));

const setActiveNavItem = (currentPage: string) => {
    let mainNav = document.getElementById('main-nav');
    Array.prototype.forEach.call(mainNav.children, (navItem: HTMLElement) => {
        if (navItem.children[0].getAttribute('href') === currentPage) {
            navItem.classList.add('active');
        } else {
            navItem.classList.remove('active');
        }
    });
};

const bindOpenableAction = () => {
    document.addEventListener('click', (event: MouseEvent) => {
        let element = event.target as Element;
        
        while (element !== null) {
            if (element.classList.contains('js-openable')) {
                let currentlyOpened = element.parentElement.querySelector('.open');
                if (currentlyOpened) {
                    currentlyOpened.classList.remove('open');
                }
                element.classList.toggle('open');
                break;
            }

            element = element.parentElement;
        }
    });
};

setActiveNavItem(location.pathname);
bindOpenableAction();