const f = document.forms[0];

const CSS_PATH = '/resources/css/reviewRegister.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);