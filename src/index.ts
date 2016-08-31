require("normalize.css/normalize.css");
require("./style.scss");

document.getElementById('nav-icon').addEventListener('click', event => document.getElementsByTagName('nav')[0].classList.toggle('expanded'));