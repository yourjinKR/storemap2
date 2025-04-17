const MAIN_CSS_FILE_PATH = '/resources/css/main.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = MAIN_CSS_FILE_PATH;
document.head.appendChild(linkEle);


document.addEventListener("DOMContentLoaded", (event) => {
	var swiper = new Swiper(".mySwiper", {
		spaceBetween : 30,
		pagination : {
			el : ".swiper-pagination",
			clickable : true,
		},
	});
	
	var storeList = new Swiper(".store-list", {
		slidesPerView: 1,
		spaceBetween: 60,
		loop: true,
		navigation: {
	        nextEl: ".swiper-button-next",
	        prevEl: ".swiper-button-prev",
		},
	});
});

