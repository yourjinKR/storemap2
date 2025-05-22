//페이지가 로드될 때 이벤트를 초기화
console.log('eventModal.js')

document.addEventListener('DOMContentLoaded', function() {
    initializeEvents();

    const CSS_PATH = '/resources/css/eventModal.css';
    let linkEle = document.createElement('link');
    linkEle.rel = 'stylesheet';
    linkEle.href = CSS_PATH;
    document.head.appendChild(linkEle);
});