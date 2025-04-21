const MAIN_CSS_FILE_PATH = '/resources/css/main.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = MAIN_CSS_FILE_PATH;
document.head.appendChild(linkEle);


document.addEventListener("DOMContentLoaded", (event) => {
	// 메인 배너 슬라이드
	var swiper = new Swiper(".mySwiper", {
		spaceBetween : 30,
		pagination : {
			el : ".swiper-pagination",
			clickable : true,
		},
	});	
	
	// 메인 점포 리스트 변경
	let selected = encodeURIComponent("전체");
	let place = document.querySelector("#place-select");
	place.addEventListener("change", function(){
		selected = encodeURIComponent(this.value) ;
		storeList(selected);
	})
	

	
	storeList(selected); // 점   포 랜덤
	eventList();         // 이벤트 랜덤
	calendarInit();		 // 캘린더 렌더
});

function placeSelect(){
	document.querySelectorAll("#place-select option").forEach(el => {
		if(thisPlace == el.value){
			el.setAttribute("selected" ,true);
		}
	});
}

// 메인 랜덤 이벤트 리스트	
function eventList(){
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
}


// 메인 점포 리스트
function storeList(store_address){
	fetch(`/main/getStoreRanList/`+store_address)
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

// 상단 이벤트 출력
function eventListEndDate(dateStr){

	fetch(`/main/getListEndDate/`+ dateStr)
	.then(response => response.json())
	.then(result =>{
		console.log(result);
		let str = "";
		let eventList = document.querySelector(".event-calendar .event-list");
		
		if(result.length > 0){
			result.forEach((json,idx) => {
				let date = new Date(json.event_bstopdate);
				let replydate = date.getFullYear()+ "-" + String(date.getMonth() + 1).padStart(2, '0')+ "-" + String(date.getDate()).padStart(2, '0');
				
				str += 	`<li>`;
				str += 		`<a class="d_f">`;
				str += 			`<p>${json.event_content}</p>`;
				str += 			`<span>종료 날짜 : ${replydate}</span>`;
				str += 		`</a>`;
				str +=  `</li>`;
			});
		}else{
			str += 	`<li class="no-list">`;
			str += 		`<p>진행 중인 이벤트가 없습니다.</p>`;
			str +=  `</li>`;
		}
		
		eventList.innerHTML = str;
		
	})
	.catch(err => console.log(err));
}

// 달력 정보
function calendarInit() {

    // 날짜 정보
    var date = new Date(); // 현재 날짜
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; 	// 한국 kst 기준시간 더하기
    var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
  
    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    var currentYear = thisMonth.getFullYear();
    var currentMonth = thisMonth.getMonth();
    var currentDate = thisMonth.getDate();

    // 캘린더 렌더링
    renderCalender(thisMonth);

    function renderCalender(thisMonth) {

        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        // 현재 월 표기
        let yearMonth = document.querySelector(".year-month");
        yearMonth.innerHTML = currentYear + '.' + String(currentMonth + 1).padStart(2, '0');

        calendar = document.querySelector('.dates')
        calendar.innerHTML = '';
        
        // 지난달
        for (var i = prevDate - prevDay; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
        }
        // 이번달
        for (var i = 1; i <= nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day current">' + i + '</div>'
        }
        // 다음달
        for (var i = 1; i <= ((6 - nextDay) == 7 ? 0 : 7 - nextDay - 1); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
        }

        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth) {
            todayDate = today.getDate();
            var currentMonthDate = document.querySelectorAll('.dates .current');
            currentMonthDate[todayDate -1].classList.add('today');
        }

        // 현재 날짜 저장
        let selectYear = String(currentYear);
        let selectMonth = String(currentMonth + 1).padStart(2, '0');
        let selectDay = "";
        let dateStr = "";
        if(document.querySelector(".today") != null){
        	selectDay = document.querySelector(".today").innerHTML.padStart(2, '0');
        	dateStr = `${selectYear}${selectMonth}${selectDay}`;
        	eventListEndDate(dateStr);  // 이벤트 종료 순 출력
        }
        
        // 일자 선택
        let current = document.querySelectorAll(".current");
    	current.forEach(day => {
            day.addEventListener("click", function(){
                current.forEach(el => {
                    el.classList.remove("today");
                })
                this.classList.add("today");
                
                // 선택 날짜 설정
                selectYear = String(currentYear);
                selectMonth = String(currentMonth + 1).padStart(2, '0');
                if(document.querySelector(".today") != null){
                	selectDay = document.querySelector(".today").innerHTML.padStart(2, '0');
                	dateStr = `${selectYear}${selectMonth}${selectDay}`;
                	eventListEndDate(dateStr);  // 이벤트 종료 순 출력
                };
                eventListEndDate(dateStr);
            })
        })
        
    }

    let navBtn = document.querySelectorAll(".nav-btn");
    navBtn.forEach(btn => {
    	btn.addEventListener("click", function(){
    		// 이전달
    		if(this.classList.contains("go-prev")){
		        thisMonth = new Date(currentYear, currentMonth - 1, 1);
		        renderCalender(thisMonth);
    		}else if(this.classList.contains("go-next")){
			// 다음달
		        thisMonth = new Date(currentYear, currentMonth + 1, 1);
		        renderCalender(thisMonth); 
    		}else{
    			thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    			renderCalender(thisMonth); 
    		}
    	})
    })
}