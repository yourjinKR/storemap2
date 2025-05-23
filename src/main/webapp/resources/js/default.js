const CSS_FILE_PATH = [
		'/resources/css/reset.css',
		'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
		'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap',
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
const IMG_URL = "https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/";

// 현위치 변수 선언
let currentLat, currentLng, pageNum, amount, userId, auth, today = null;
/** 위치정보 확인 여부 */
let positionCheck = false;

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
	
	// 로그인 후
	let mypage = document.querySelector(".right-div .profile");
	let sideBar = document.querySelector(".side-bar");
	if(mypage != null){
		mypage.addEventListener("click", function(){
			sideBar.classList.add("show");
		})
	}
	
	// 로그인전
	let menu = document.querySelector(".side-btn");
	if(menu != null){
		menu.addEventListener("click", function(){
			sideBar.classList.add("show");
		})
	}
	
	let closeBtn = document.querySelector(".close-btn");
	if(closeBtn != null){
		closeBtn.addEventListener("click", function(){
			sideBar.classList.remove("show");
		})
	}
	
	let btnTop = document.querySelector(".topScroll");
	if(btnTop != null){
		btnTop.addEventListener("click", function(e){
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		})
	}

	// 위치 정보 실행 (1회)
	getCurrentPlace();

	// 헤더 로그아웃
	headerLogout();
	
	// 사이드바 로그아웃
	sidebarLogout();
	
	// 헤더 검색창
	// let search = document.querySelector(".search-bar input[name='keyword']");
	// if (search != null) {
	// 	search.addEventListener("keydown", function (e) {
	// 		if (e.keyCode == 13) {
	// 			e.preventDefault();
	// 			const keyword = search.value.trim();
	// 			if (keyword.length > 0) {
	// 				sessionStorage.setItem("initialKeyword", keyword);
	// 				location.href = "/store/map";  // 주소에 파라미터 안 붙음
	// 			}
	// 		}
	// 	});
	// }
})


// 페이징 처리
function pager(pageMaker){
	let paging = "";
	
	paging += `<ul class="page-nation" data-pageNum="${pageMaker.cri.pageNum}" data-amount="${pageMaker.cri.amount}">`;
	if(pageMaker.prev){
		paging += `<li class="previous">`;
		paging += 	`<a href="${pageMaker.startPage-1 }"> &lt; </a>`;
		paging += `</li>`;
	}
	
	for (var i = pageMaker.startPage; i <= pageMaker.endPage; i++) {
		paging += `<li>`;
		paging += 	`<a href="${i}" class="${pageMaker.cri.pageNum == i ? 'active' : '' }"> ${i}</a>`;
		paging += `</li>`;
	}
	
	if(pageMaker.next){
		paging += `<li>`;
		paging += 	`<a href="${pageMaker.endPage+1 }"> &gt; </a>`;
		paging += `</li>`;
	}
	paging += `</ul>`;
	
	document.querySelector(".page-wrap").innerHTML = paging;
	
	let aEles= document.querySelectorAll(".page-nation li a");
	if(aEles != null && pageNum != null && amount != null){
		aEles.forEach(aEles => {
			aEles.addEventListener("click", function(e){
				e.preventDefault();
				
				let pageNum = this.getAttribute("href");
				if(window.location.pathname == "/event/eventList"){
					eventFilter(pageNum, amount);
				}
				if(window.location.pathname == "/admin/notice"){
					getNotice(pageNum);
				}
			})
		})
	}
}


// 위치 정보 (위도,경도)
function getCurrentPlace(){
    // 이미 로컬스토리지에 위치정보가 있다면 함수 종료
    if (localStorage.getItem("position_data")) {
        // console.log("기존 위치 정보가 존재하므로 위치를 다시 설정하지 않습니다.");
        return;
    }

	window.navigator.geolocation.getCurrentPosition(function(position){
			console.log("현위치를 다시 설정합니다");
			currentLat = position.coords.latitude;
			currentLng = position.coords.longitude;
			setPositionData(currentLat, currentLng);

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

/** 로컬 스토리지에 위치정보를 저장 */
function setPositionData(lat, lng) {
	let positionData = {
		lat : lat,
		lng : lng
	};
	localStorage.setItem("position_data", JSON.stringify(positionData));
} 
/** 로컬 스토리에 담긴 위치정보를 출력 */
function getPositionData(){
	return JSON.parse(localStorage.getItem("position_data"));
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
	let logoutBnt = document.getElementById('slogoutLink');
	if(logoutBnt != null){
		logoutBnt.addEventListener('click', function(e) {
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