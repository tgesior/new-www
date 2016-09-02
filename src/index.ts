require('normalize.css/normalize.css');

require('file?name=[name].[ext]!./index.html');
require('./style.scss');

require('file?name=[name].[ext]!./team.html');
require('./team.scss');

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