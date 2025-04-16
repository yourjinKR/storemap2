console.log("default load");
const CSS_FILE_PATH = '/resources/css/reset.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);