const BOARD_CSS_FILE_PATH = '/resources/css/board.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = BOARD_CSS_FILE_PATH;
document.head.appendChild(linkEle);

let filterBtn, filter, filterAmount, boardSearch, rDate, bDate = null;

document.addEventListener("DOMContentLoaded", (event) => {
	boardSearch = document.querySelector("#boardSearch");
	rDate = document.querySelector("#eventRdate");
	bDate = document.querySelector("#eventBdate");
	
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
		
		// 게시물 수
		filterAmount = document.querySelector("#amount");
		if(filterAmount != null){
			filterAmount.addEventListener("change",function(){
				eventFilter(pageNum, this.value)
			})
		}
	
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
		
		if(boardSearch != null){
			boardSearch.addEventListener("keydown", function(e){
				if(e.keyCode == 13){
					eventFilter();
				}
			})
		}
		
		eventFilter(pageNum);
	}
});

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
        	sort_type : sort != null ? sort.getAttribute("id") : 'event_bstopdate',
        	search_date : "",
        	list_state : showList != null ? showList.getAttribute("href") : "open",
        	board_search : boardSearch != null || boardSearch != "" ? boardSearch.value : "",
    		page_num : pageNumData,
    		amount_num : amountData,
    		auth : auth != null ? auth : "" 
        })
	})
	.then(response => response.json())
	.then(result => {
		if(userId != null && userId != "" && auth != "user"){
			listBoard(result);
		}else{
			cardBoard(result);
		}

		let paging = "";
		let pageMaker = result.pager;
		
		paging += `<ul class="page-nation" data-pageNum="${pageMaker.cri.pageNum}" data-amount="${pageMaker.cri.amount}">`;
		if(pageMaker.prev){
			paging += `<li class="previous">`;
			paging += `<a href="${pageMaker.startPage-1 }"> &lt; </a>`;
			paging += `</li>`;
		}
		
		for (var i = pageMaker.startPage; i <= pageMaker.endPage; i++) {
			paging += `<li>`;
			paging += `<a href="${i}" class="${pageMaker.cri.pageNum == i ? 'active' : '' }"> ${i}</a>`;
			paging += `</li>`;
		}
		
		if(pageMaker.next){
			paging += `<li>`;
			paging += `<a href="${pageMaker.endPage+1 }"> &gt; </a>`;
			paging += `</li>`;
		}
		paging += `</ul>`;
		
		document.querySelector(".page-wrap").innerHTML = paging;
		
		pager();
	})
	.catch(err => console.log(err))
}


// 카드 형태 게시판
function cardBoard(result){
	let str = "";
	if(result != null && result.event.length > 0){
		console.log(result.event );
		
		result.event.forEach(data => {
			str += 	`<li class="card-box">`;
			str += 		`<div class="card-img por">`;
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
	
	}
	document.querySelector("#boardCard").innerHTML = str;
}


// 리스트 형태 게시판
function listBoard(result){
	let str = "";
	if(result != null && result.event.length > 0){
		result.event.forEach(data => {
			str += 	`<tr data-idx="${data.event_idx}">`;
			str += 		`<td>`;
			str += 			`<a href="/event/eventView?event_idx=${data.event_idx}">${data.event_title}&emsp;신청 : ${data.approved_store}&emsp;최대 : ${data.max_store}</a>`;
			str += 		`</td>`;
			str += 		`<td>`;
			if(today >= dateFormate(data.event_rstartdate) && today <= dateFormate(data.event_rstopdate)){
				if((data.approved_store / data.max_store * 100) < 80){
					str += 	 `<span class="state-icon open-icon">모집 중</span>`;
				}else{
					str += 	 `<span class="state-icon warning-icon">마감 임박</span>`;
				}
			}else{
				if(today <= dateFormate(data.event_rstartdate)){
					str += 	 `<span class="state-icon planned-icon">모집 예정</span>`;
					
				}else{
					str += 	 `<span class="state-icon end-icon">모집 종료</span>`;
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
		
		filterBtn.checked = false;
		filter.classList.remove("on");

	}else{
		str += `
			<tr>
				<td colspan="4" class="empty-data">
					검색된 이벤트가 없습니다.
				</td>
			</tr>`
	}
	document.querySelector("#boardList tbody").innerHTML = str;
}
