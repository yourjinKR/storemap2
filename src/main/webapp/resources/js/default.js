console.log("default load");
const CSS_FILE_PATH = [
		'/resources/css/reset.css',
		'/resources/css/default.css',
		'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
		];
for (let hrefs of CSS_FILE_PATH) {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = hrefs;
	document.head.appendChild(linkEle);
}
