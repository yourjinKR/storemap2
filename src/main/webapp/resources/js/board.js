const BOARD_CSS_FILE_PATH = '/resources/css/board.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = BOARD_CSS_FILE_PATH;
document.head.appendChild(linkEle);

let filterBtn, filter, eLocation, filterAmount, boardSearch, sortCountType, rDate, bDate, setFixed= null;

document.addEventListener("DOMContentLoaded", (event) => {
	boardSearch = document.querySelector("#boardSearch");
	rDate = document.querySelector("#eventRdate");
	bDate = document.querySelector("#eventBdate");

	// 게시물 수
	filterAmount = document.querySelector("#amount");
	if(filterAmount != null){
		filterAmount.addEventListener("change",function(){
			if(window.location.pathname == "/event/eventList"){
				eventFilter(pageNum, this.value);			
			}else{
				getNotice();
			}
		})
	}
	
	// 이벤트 리스트 출력
	if(window.location.pathname == "/event/eventList"){
		if(userId != null && userId != "" && auth != "user"){
			// 필터 모달
			filterBtn = document.querySelector("#filterChk");
			filter = document.querySelector(".filter");
			if(filterBtn != null || filter != null){
				filterBtn.addEventListener("change",function(){
					filter.classList.toggle("on");
				})
			}
		}
		
		// 지역선택
		eLocation = document.querySelector("#eLocation");
		if(eLocation != null){
			eLocation.addEventListener("change",function(){
				eventFilter(pageNum);
			})
		}
	
		// 게시판 탭변경
		let tabEl = document.querySelectorAll(".board-tab li a");
		if(tabEl != null || tabEl.length > 0){
			tabEl.forEach(tab => {
				tab.addEventListener("click", function(e){
					e.preventDefault();
					
					tabEl.forEach(tab2 => tab2.classList.remove("on"));
					tab.classList.add("on");
					document.querySelector(".list-top > h3").innerHTML = (this.innerHTML + "리스트"); 
					eventFilter();
				})
			})
		}
		
		// 게시물 검색
		if(boardSearch != null){
			boardSearch.addEventListener("keydown", function(e){
				if(e.keyCode == 13){
					eventFilter();
				}
			})
		}
		
		// 좋아요 or 댓글순
		let sortBtn = document.querySelectorAll(".board-top .left-con input[type=checkbox]");
		if(sortBtn.length > 0){
			sortBtn.forEach(btnEl => {
				btnEl.addEventListener("change", function(){
					let sortChkBtn = document.querySelectorAll(".board-top .left-con input[type=checkbox]:checked");
					if(sortChkBtn.length > 1){
						sortBtn.forEach(btnEl => btnEl.checked = false);
						this.checked = true;
					}
					sortCountType = sortChkBtn.length == 0 ? "" : this.value;
					eventFilter();
				})
			})
		}
		
		eventFilter(pageNum);
	}
	
	// 공지사항 리스트 출력
	if(window.location.pathname == "/admin/notice"){
		getNotice();
	}
	
	
	
});

// 이벤트 필터
function eventFilter(pageNum){
	if(userId != null && userId != "" && auth != "user"){
		if(document.querySelectorAll(".filter input[type=checkbox]:checked").length == 0){
			alert("일정을 하나 이상 선택해주세요.");
			return;
		}
	}
	
	let pageNumData = pageNum != null ? pageNum : 1;
	let amountData = filterAmount.value;
	let sort = document.querySelector("input[name='sort']:checked");
	let showList = document.querySelector(".board-tab > li > a.on");
	// 이벤트 필터링
	fetch("/event/eventFilter", {
		method : 'POST',
		headers:{
			'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
        	sort_date_type : sort != null ? sort.getAttribute("id") : 'event_bstopdate',
			sort_count_type : sortCountType != null ? sortCountType : "", 
        	event_location : eLocation != null ? eLocation.value : "전체",
        	list_state : showList != null ? showList.getAttribute("href") : "open",
        	board_search : boardSearch != null || boardSearch != "" ? boardSearch.value : "",
    		page_num : pageNumData,
    		amount_num : amountData,
    		auth : auth != null ? auth : "" 
        })
	})
	.then(response => response.json())
	.then(result => {
		console.log(result);
		if(userId != null && userId != "" && auth != "user"){
			listBoard(result);
		}else{
			cardBoard(result);
		}
		
		pager(result.pager);
	})
	.catch(err => console.log(err))
}


// 이벤트 카드 형태 게시판
function cardBoard(result){
	let str = "";
	if(result != null && result.event.length > 0){
		result.event.forEach(data => {
			str += 	`<li class="card-box" data-idx="${data.event_idx}">`;
			str += 		`<div class="card-img por">idx : ${data.event_idx}<br> 지역 : ${data.event_location}<br> 제목 : ${data.event_title}`;
			str += 		`<img alt="" src="/resources/img/${data.event_file}">`;
			str += 		`<span class="event-date">${dateFormate(data.event_bstartdate)} ~ ${dateFormate(data.event_bstopdate)}</span>`;
			str += 		`</div>`;
			str += 		`<div class="card-text">`;
			str += 			`좋아요 : ${data.like_count} `;
			str += 			`댓글 : ${data.comment_count}<br>`;
			str += 			`${data.event_content}`;
			str += 		`</div>`;
			str += `</li>`;
		})
	}else{
		str += `<div class="empty-data">
					검색된 이벤트가 없습니다.
				</div>`;
	}
	document.querySelector("#boardCard").innerHTML = str;
}


// 이벤트 리스트 형태 게시판
function listBoard(result){
	let str = "";
	if(result != null && result.event.length > 0){
		result.event.forEach(data => {
			let address = data.event_location.split(" ");
			str += 	`<tr data-idx="${data.event_idx}">`;
			str += 		`<td>`;
			str += 		`지역 : ${address[0]} `;
			str += 		`</td>`;
			str += 		`<td>`;
			str += 			`<a href="/event/eventView?event_idx=${data.event_idx}">${data.event_title}&emsp;신청 : ${data.approved_store}&emsp;최대 : ${data.max_store}</a>`;
			str += 		`</td>`;
			str += 		`<td>`;
			
			if(today > dateFormate(data.event_rstopdate) || data.max_store == data.approved_store){
				str += 	 `<span class="state-icon end-icon">모집 종료</span>`;
			}else if(today < dateFormate(data.event_rstartdate)){
				str += 	 `<span class="state-icon planned-icon">모집 예정</span>`;
			}else{
				if((data.approved_store / data.max_store * 100) < 80){
					str += 	 `<span class="state-icon open-icon">모집 중</span>`;
				}else{
					str += 	 `<span class="state-icon warning-icon">마감 임박</span>`;
				}
			}
			
			str += 		`</td>`;
			
			if(rDate != null && rDate.checked){
				str += 		`<td class="t-l">`;
				str += 			`<span>입점 신청 : ${dateFormate(data.event_rstartdate)} ~ ${dateFormate(data.event_rstopdate)}</span>`;
				str += 		`</td>`;
			}
			
			if(bDate != null && bDate.checked){
				str += 		`<td class="t-l">`;
				str += 			`<span>이벤트 : ${dateFormate(data.event_bstartdate)} ~ ${dateFormate(data.event_bstopdate)}</span>`;
				str += 		`</td>`;
			}
			
			str += 	`</tr>`;
		})
		
		
		
		if((rDate != null && bDate != null) && (rDate.checked && bDate.checked)){
			document.querySelectorAll("#boardList colgroup col")[3].classList.remove("hide");
		}else{
			document.querySelectorAll("#boardList colgroup col")[3].classList.add("hide");
		}
	}else{
		str += `
			<tr>
				<td colspan="4" class="empty-data">
					검색된 이벤트가 없습니다.
				</td>
			</tr>`;
	}
	
	filterBtn.checked = false;
	filter.classList.remove("on");
	
	document.querySelector("#boardList tbody").innerHTML = str;
}

// 공지사항 고정
function noticeFixed(){
	fetch(`/admin/updateFixed`,{
		method : 'POST',
		headers:{
			'Content-Type' : 'application/json'
	    },
	    body: JSON.stringify(setFixed)
	})
	.then(result => {
		getNotice();
	})
	.catch(err => console.log(err))
}

// 수정된 고정 게시글 idx
function setFixedData(){
	// 공지사항 고정
	let fixNotice = document.querySelectorAll("#boardList input[name='fixChk[]']");
	setFixed = [];
	
	fixNotice.forEach(idx => {
		idx.addEventListener("change", function(){
			if(setFixed.includes(idx.value)){
				setFixed.pop(idx.value);
			}else{
				setFixed.push(idx.value);
			}
		})
	})
}

// 공지사항 리스트
function getNotice(pageNum){
	let pageNumData = pageNum != null ? pageNum : 1;
	let amountData = filterAmount.value;
	let searchData = boardSearch != null || boardSearch != "" ? boardSearch.value : "";
	let sendData = `?pageNum=${pageNumData}&amount=${amountData}`+ (searchData != "" ? `&search=${searchData}` : ``);
	fetch(`/admin/getNotice/${sendData}`)
	.then(response => response.json())
	.then(result => {
		let str = "";
		if(result != null && result.announce.length > 0){
			result.announce.forEach(data => {
				str += 	`<tr data-idx="${data.announce_idx}">`;
				if(auth == 'admin'){
					str += 	`<td class="t-c">`;
					str += 		`<input type="checkbox" name="fixChk[]" value="${data.announce_idx}" ${data.fixed == 1 ? 'checked' : ''}>`;
					str += 	`</td>`;
				}
				str += 		`<td class="t-c">`;
				if(data.fixed == 1){
					str += 			`<span class="fixed-icon" data-idx="${data.announce_idx}">고정</span>`;
				}else{
					str += 			`${data.announce_idx}`;
				}
				str += 		`</td>`;
				str += 		`<td class="t-l">`;
				str += 			`<a href="/admin/noticeView?idx=${data.announce_idx}">`;
				str += 				`${data.announce_title}`;
				if(today <= dateFormate((data.announce_regdate + 86400000 * 3))){
					str += 			`<span class="new-icon">N</span>`;
				}
				str += 			`</a>`;
				str += 		`</td>`;
				str += 		`<td class="t-c">`;
				str += 			`${dateFormate(data.announce_regdate)}`;
				str += 		`</td>`;
				str += 	`</tr>`;
			})
		}else{
			str += `
				<tr>
					<td colspan="2" class="empty-data">
						공지사항이 없습니다.
					</td>
				</tr>`;
		}
		document.querySelector("#boardList tbody").innerHTML = str;
		
		pager(result.pager);
		setFixedData();
	})
	.catch(err => console.log(err))
}
