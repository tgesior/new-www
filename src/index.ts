require('normalize.css/normalize.css');

const pages = ['index', 'team', 'services', 'portfolio'];
const projects = ['smarthelp', 'airhelp', 'everytap', 'motivo', 'coffee', 'easycard', 'easytapp', 'pitupitu'];

try {
    for (let page of pages) {
        require(`file?name=[name].[ext]!./${page}.html`);
        if (__webpack_modules__[require.resolveWeak(`./${page}.scss`)]) {
            require(`./${page}.scss`);
        }
    }

    for (let project of projects) {
        require(`file?name=projects/[name].[ext]!./projects/${project}.html`);
    }
} catch (err) {
    if (!__webpack_modules__) { // catch false positives in development
        throw err;
    }
}

require('file?emitFile=false!./CNAME');
require.context('./assets/', true, /^\.\/.*\.(pn|jp|sv)g/);
require.context('./assets/projects/', true, /^\.\/projects\/.*\.(pn|jp|sv)g/);

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
    Array.prototype.forEach.call(document.querySelectorAll('.js-openable'), (element: Element) => {
        element.addEventListener('mouseenter', (event: MouseEvent) => {
            let currentlyOpened = element.parentElement.querySelector('.open');
            if (currentlyOpened) {
                currentlyOpened.classList.remove('open');
            }
            element.classList.toggle('open');
        });
    });
};

setActiveNavItem(location.pathname);
bindOpenableAction();