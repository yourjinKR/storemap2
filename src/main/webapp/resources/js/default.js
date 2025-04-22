console.log("default load");
const CSS_FILE_PATH = [
		'/resources/css/reset.css',
		'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
		'/resources/css/default.css',
		'/resources/css/common.css'
		];
for (let hrefs of CSS_FILE_PATH) {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = hrefs;
	document.head.appendChild(linkEle);
};
let thisPlace = "";


document.addEventListener("DOMContentLoaded", (event) => {
	
	let mypage = document.querySelector(".right-div .profile");
	let sideBar = document.querySelector(".side-bar");
	mypage.addEventListener("click", function(){
		sideBar.classList.add("show");
	})
	
	let closeBtn = document.querySelector(".close-btn");
	closeBtn.addEventListener("click", function(){
		sideBar.classList.remove("show");
	})
	
	// 위치 정보
	getCurrentPlace();
})

// 위치 정보
function getCurrentPlace(){
	window.navigator.geolocation.getCurrentPosition(function(position){
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;

			getAddr(lat, lng);
			
		},function(error){
			switch(error.code){
			case error.PERMISSION_DENIED: str="사용자 거부"; break;
			case error.POSITION_UNAVAILABLE: str="지리정보 없음"; break;
	        case error.TIMEOUT: str="시간 초과"; break;
		}
	});
}

// 위치 정보 주소 변환
function getAddr(lat, lng){
	fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,{
		headers :{
			"Authorization" : "KakaoAK 8cb40f03f6a15ef141e002783147b3ff"
		}
	})
	.then(response => response.json())
	.then(result => {
		
		// 현재 지역
		if(result.documents.length > 0){
			thisPlace = result.documents[0].address.region_1depth_name;			
		}
		
		// 위치 정보를 기반으로 점포 리스트 선택
		if(typeof placeSelect != 'undefined'){
			placeSelect();			
		}
	})
	.catch(err => console.log(err));
};

// 페이징
//if(pageNumData != null || amountData != null){
//	
//	let pageNumData = document.querySelector(".page-nation").dataset['pagenum'];
//	let amountData = document.querySelector(".page-nation").dataset['amount'];
//	// URL에서 파라미터 값 찾아 스토리지 저장
//	let pageNum = new URLSearchParams(location.search).get("pageNum");
//	let amount = new URLSearchParams(location.search).get("amount");
//	if(!pageNum || !amount){
//		pageNum = 1;
//		amount = 5;
//	}
//}
//setStorageData(pageNum, amount);

