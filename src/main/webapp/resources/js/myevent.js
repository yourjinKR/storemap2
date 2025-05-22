const MYEVENT_CSS_FILE_PATH = '/resources/css/myevent.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = MYEVENT_CSS_FILE_PATH;
document.head.appendChild(linkEle);
let reqCon = null;
document.addEventListener("DOMContentLoaded", (event) => {
	let mainTab, subTab = null;
	let mainTabs = document.querySelectorAll(".main-tab > li > a");
	let selectMainTab = document.querySelector(".main-tab > li > a.on");
	let subTabs = document.querySelectorAll(".sub-tab > li > a");
	reqCon = document.querySelector(".request-content");
	if(selectMainTab != null) {
		mainTab = selectMainTab.getAttribute("href");
	}
	// 상단 메인 탭 변경	
	if(mainTabs != null){
		mainTabs.forEach(tab => {
			tab.addEventListener("click", function(e){
				e.preventDefault();
				let mainContent = document.querySelectorAll(".tab-content");
				mainTabs.forEach(tab => tab.classList.remove("on"));
				mainContent.forEach(tab => tab.classList.remove("on"));
				this.classList.add("on");
				document.querySelector("."+this.getAttribute("href")+"-content").classList.add("on");
			})
		})
	}
	
	getEventRequest();
})

function getEventRequest(){
	fetch(`/event/getEventRequest`)
	.then(response => response.json())
	.then(result => {
		let str = "";
		for (let data of result) {
			if(data.eventDay != null && data.eventDay.length > 0){
				str += `<li>`;
				str += 		`<p data-idx="${data.event_idx}">${data.event_title}</p>`;
				str += 		`<div class="request-detail">`;
				str += 			`<ul class="eday-tab">`;
				data.eventDay.forEach((eday,idx) => {
					str += 			`<li><a href="${eday.eday_idx}">${idx + 1}일차</a></li>`;
				})
				str += 			`</ul>`;
				data.eventDay.forEach((eday,idx) => {
					str += 		`<div class="eday-content event${data.event_idx}-eday${eday.eday_idx}">`;
					str += 			`<table data-idx="${eday.eday_idx}">`;
					str += 				`<colgroup>`;
					str += 					`<col width="*">`;
					str += 					`<col width="175px">`;
					str += 					`<col width="150px">`;
					str += 					`<col width="75px">`;
					str += 					`<col width="75px">`;
					str += 					`<col width="150px">`;
					str += 				`</colgroup>`;
					str += 				`<thead>`;
					str += 					`<tr>`;
					str += 						`<th>점포명</th>`;
					str += 						`<th>품목</th>`;
					str += 						`<th>신청날짜</th>`;
					str += 						`<th>좋아요</th>`;
					str += 						`<th>신고</th>`;
					str += 						`<th></th>`;
					str += 					`</tr>`;
					str += 				`</thead>`;
					str += 				`<tbody>`;
					str += 					`<tr>`;
					str += 						`<td colspan="6" class="empty-data">신청 정보가 없습니다</td>`;
					str += 					`</tr>`;
					str += 				`</tbody>`;
					str += 			`</table>`;
					str += 		`</div>`;
				})
				str += 		`</div>`;
				str += 	`</li>`;
			}
		}
		
		reqCon.querySelector("ul").innerHTML = str;
		
		let eventBtn = document.querySelectorAll(".tab-content > ul > li > p");
		let detail = document.querySelectorAll(".request-detail");
		
		if(eventBtn.length > 0 ){
			eventBtn.forEach(event => {
				event.addEventListener("click",function(e){
					eventBtn.forEach(event => event.classList.remove("on"));
					detail.forEach(req => req.classList.remove("on"));
					event.classList.add("on");
					this.closest("li").querySelector(".request-detail").classList.add("on");
					changeEday();
				})
			})
		}
	})
	.catch(err => console.log(err))
}

function getEdayRequest(eday_idx){
	fetch(`/event/getEdayRequest/${eday_idx}`)
	.then(response => response.json())
	.then(result => {
		let str = "";
		if(result != null && result.length > 0){
			for (let data of result) {
				str += `<tr data-idx="${data.join_store.store_idx}">`;
				str += 		`<td class="t-l">${data.join_store.store_name}</td>`;
				str += 		`<td>`;
				if(data.join_store.join_menu != null && data.join_store.join_menu.length > 0){
					str += 		`<select>`;
					for (let menu of data.join_store.join_menu) {
						str += 		`<option value="">${menu.menu_name}</option>`;
					}
					str += 		`</select>`;
				}else{
					str += 	`정보 없음`;
				}
				str += 		`</td>`;
				str += 		`<td>${dateFormate(data.regdate)}</td>`;
				str += 		`<td>${data.join_store.store_like_cnt}</td>`;
				str += 		`<td>${data.join_store.report_cnt}</td>`;
				str += 		`<td>`;
				str += 			`<div class="btn-box">`;
				str += 				`<button class="approve-btn" type="button">승인</button>`;
				str += 				`<button class="reject-btn" type="button">취소</button>`;
				str += 			`</div>	`;
				str += 		`</td>`;
				str += `</tr>`;
			}
		}else{
			str += `<tr>`;
			str += 		`<td colspan="6" class="empty-data">신청 정보가 없습니다</td>`;
			str += `</tr>`;
		}
		document.querySelector(".eday-content.on tbody").innerHTML = str;
		btnAction();
	})
	.catch(err => console.log(err))
}

function updateRequest(eday_idx, store_idx){
	fetch(`/event/updateRequest/${eday_idx}/${store_idx}`, {
		method : 'POST'
	})
	.then(response => response.json())
	.then(result => {
		
	})
	.catch(err => console.log(err))
}

// Eday선택
function changeEday(){
	let edayTab = document.querySelectorAll(".request-detail.on .eday-tab > li > a");
	let eventIdx = document.querySelector(".request-content p.on").dataset['idx'];
	if(edayTab != null && edayTab.length > 0 ){
		edayTab.forEach(eday => {
			eday.addEventListener("click",function(e){
				e.preventDefault();
				edayTab.forEach(tab => tab.classList.remove("on"));
				this.classList.add("on");
				let event_idx = "1";
				let edayCon = document.querySelectorAll(".eday-content");
				if(edayCon.length > 0 ){
					edayCon.forEach(tab => tab.classList.remove("on"));
				}
				document.querySelector(".event"+eventIdx+"-eday"+this.getAttribute("href")).classList.add("on");
				getEdayRequest(this.getAttribute("href"));
			})
		})
	}
}

// 승인, 거절 btn
function btnAction(){
	let btns = document.querySelectorAll(".eday-content.on .btn-box button");
	for (let btn of btns) {
		btn.addEventListener("click",function(e){
			e.preventDefault();
			updateRequest(this.closest("table").dataset['idx'], this.closest("tr").dataset['idx'])
		})
	}
}



