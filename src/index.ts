require('normalize.css/normalize.css');
require('./style.scss');
require('file?name=[name].[ext]!./index.html');

document.getElementById('nav-icon').addEventListener('click', event => document.getElementsByTagName('nav')[0].classList.toggle('expanded'));