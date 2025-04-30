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


// 현위치 변수 선언
let currentLat, currentLng, pageNum, amount, user_id, auth, today = null;

document.addEventListener("DOMContentLoaded", (event) => {
	// 세션 데이터 (아이디/권한)
	userId = document.querySelector("input[name='sessionId']").value;
	auth = document.querySelector("input[name='auth']").value;
	today = dateFormate(new Date());
	
	pageNum = new URLSearchParams(location.search).get("pageNum");
	amount = new URLSearchParams(location.search).get("amount");
	
	if(!pageNum || !amount){
		pageNum = 1;
		amount = 20;
	}
	
	setStorageData(pageNum, amount);
	
	// 사이드바
	let mypage = document.querySelector(".right-div .profile");
	let sideBar = document.querySelector(".side-bar");
	if(mypage != null){
		mypage.addEventListener("click", function(){
			sideBar.classList.add("show");
		})
	}
	
	let closeBtn = document.querySelector(".close-btn");
	if(closeBtn != null){
		closeBtn.addEventListener("click", function(){
			sideBar.classList.remove("show");
		})
	}

	// 위치 정보
	getCurrentPlace();

	// 헤더 로그아웃
	headerLogout();
	
	// 사이드바 로그아웃
	sidebarLogout();
	
	// 헤더 검색창
	let search = document.querySelector(".search-bar input[name='search']");
	search.addEventListener("keydown", function(e){
		if(e.keyCode == 13){
			location.href="/store/map";
		}
	})
	
})


// 페이징 처리
function pager(){
	let aEles= document.querySelectorAll(".page-nation li a");
	if(aEles != null && pageNum != null && amount != null){
		aEles.forEach(aEles => {
			aEles.addEventListener("click", function(e){
				e.preventDefault();
				
				let pageNum = this.getAttribute("href");
				if(window.location.pathname == "/event/eventList"){
					eventFilter(pageNum, amount);
				}
			})
		})
	}
}


// 위치 정보 (위도,경도)
function getCurrentPlace(){
	window.navigator.geolocation.getCurrentPosition(function(position){
			currentLat = position.coords.latitude;
			currentLng = position.coords.longitude;

			getAddr(currentLat, currentLng);
			
		},function(error){
			switch(error.code){
			case error.PERMISSION_DENIED: str="사용자 거부"; break;
			case error.POSITION_UNAVAILABLE: str="지리정보 없음"; break;
			case error.TIMEOUT: str="시간 초과"; break;
		}
	},{
        enableHighAccuracy: true,  // 고정밀도 위치 요청
        timeout: 5000,             // 5초 이내에 위치 정보를 가져오지 않으면 오류 처리
        maximumAge: 0              // 캐시된 위치 정보 사용 안 함
    });
}

//로컬 스토리지 저장
function setStorageData(pageNum, amount){
	let pageData = {
			pageNum : pageNum,
			amount : amount
	};
	localStorage.setItem("page_data", JSON.stringify(pageData));
}

//로컬 스토리지 출력
function getStorageData(){
	return JSON.parse(localStorage.getItem("page_data"));
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


//날짜 포멧
function dateFormate(date){
	let newDate = new Date(date);
	let replydate = newDate.getFullYear()+ "-" + String(newDate.getMonth() + 1).padStart(2, '0')+ "-" + String(newDate.getDate()).padStart(2, '0')
	return replydate;
}

// 헤더 로그아웃
function headerLogout(){
	let logOut = document.getElementById('hlogoutLink');
	if(logOut != null){
		logOut.addEventListener('click', function(e) {
			e.preventDefault();
			console.log("1");
			fetch('/member/logout', {
				method : 'POST'
			})
			.then(() => {
				location.href = '/member/login';
			})
			.catch(err => {
				console.log("에러 : ", err);
			})
		});
	}
}

// 사이드바 로그아웃
function sidebarLogout(){
	document.getElementById('slogoutLink').addEventListener('click', function(e) {
		e.preventDefault();
		console.log("1");
		fetch('/member/logout', {
			method : 'POST'
		})
		.then(() => {
			location.href = '/member/login';
		})
		.catch(err => {
			console.log("에러 : ", err);
		})
	});
}