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
	
	
	// 메인 이벤트 리스트	
	fetch(`/main/getRanList`)
	.then(response => response.json())
	.then(result =>{
		let str = "";
		let eventSlier = document.querySelector(".list-event .swiper-wrapper");
		result.forEach((event,idx) => {
			if(idx == 0 || idx == 8){
				str += `<li class="swiper-slide">`;
				str += 		`<div class="card-list d_f">`;
			}
				str +=			`<div class="card-box">`;
				str += 				`<div class="card-img">${event.event_file}</div>`;
				str += 					`<div class="card-text">`;
				str += 					`${event.event_content}`;
				str += 				`</div>`;
				str += 			`</div>`;
			if(idx == 7 || idx == 15){
				str += 		`</div>`;
				str += `</li>`;
			}
		});

		eventSlier.innerHTML = str;
		
		if(result.length > 8){
			//슬라이드 생성
			var storeList = new Swiper(".list-event", {
				slidesPerView: 1,
				spaceBetween: 60,
				loop: true,
				navigation: {
			        nextEl: ".swiper-button-next",
			        prevEl: ".swiper-button-prev",
				},
			});
		}
	})
	.catch(err => console.log(err));
	
	// 메인 점포 리스트
	let selected = "";
	let place = document.querySelector("#place-select");
	place.addEventListener("change", function(){
		selected = this.value;
		storeList(selected);
	})
	
	storeList(selected);
});


function storeList(store_address){
	fetch(`/main/getStoreRanList/`)
	.then(response => response.json())
	.then(result =>{
		let str = "";
		let storeSlider = document.querySelector(".list-store .swiper-wrapper");
		
		result.forEach((store,idx) => {
			if(idx == 0 || idx == 8){
				str += `<li class="swiper-slide">`;
				str += 		`<div class="card-list d_f">`;
			}
			str +=			`<div class="card-box">`;
			str += 				`<div class="card-img">${store.store_image}</div>`;
			str += 					`<div class="card-text">`;
			str += 					`${store.store_name}`;
			str += 				`</div>`;
			str += 			`</div>`;
			if(idx == 7 || idx == 15){
				str += 		`</div>`;
				str += `</li>`;
			}
		});
		
		storeSlider.innerHTML = str;
		
		if(result.length > 8){
			//슬라이드 생성
			var storeList = new Swiper(".list-store", {
				slidesPerView: 1,
				spaceBetween: 60,
				loop: true,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});
		}
	})
	.catch(err => console.log(err));
}
