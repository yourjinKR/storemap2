console.log("default load");
const CSS_FILE_PATH = [
		'/resources/css/reset.css',
		'/resources/css/default.css'];
for (let hrefs of CSS_FILE_PATH) {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = hrefs;
	document.head.appendChild(linkEle);
}
