let viewWriter, viewContent, writeReceiver, writeContent, eventSelect, listDetail = null;
document.addEventListener("DOMContentLoaded", (event) => {
	listDetail = document.querySelector(".list-detail");
	attendList = document.querySelector(".attend-list");
	viewWriter = document.querySelector("#view .letter-writer");
	viewContent = document.querySelector("#view .letter-content");
	writeReceiver = document.querySelector("#write .letter-receiver");
	hideReceiver = document.querySelector(".hidden-receiver");
	writeContent = document.querySelector("#write .letter-content");
	
	// 쪽지 버튼
	let letterBtn = document.querySelectorAll(".pop-content a");
	let historyBtn = "received";
	letterBtn.forEach(btn => {
		btn.addEventListener("click", function(e){
			e.preventDefault();
			letterBtn.forEach(btn2 => {
				if(btn2.classList.contains("on") && btn.getAttribute("href") != "read" && btn.getAttribute("href") != "post") 
					historyBtn = btn.getAttribute("href");
				btn2.classList.remove("on")
			});
			document.querySelector("."+historyBtn).classList.add("on");
			switch (btn.getAttribute("href")) {
			// 받은 쪽지함
			case "received": getLetter("received"); break;
			// 보낸 쪽지함
			case "send": getLetter("send"); break;
			//쓰기 Form
			case "write": changeLetterModal("write"); break;
			// 문의 하기 
			case "question": changeLetterModal("write"); break;
			// 쪽지 전송 
			case "post": insertLetter(); break;
			// 쪽지 view 확인
			case "read": getLetter(historyBtn); break;
			}
		})
	})
	
	
	
	if(attendList != null && (auth == "enter" || auth == "owner")){
		attendList.addEventListener("change",function(){
			if(this.value != 0){
				if(auth == "enter"){
					// n일차 참여 점포 리스트
					getAttendList(this.value);
				}else{
					let arr = this.value.split("//");
					writeReceiver.value = arr[0];
					hideReceiver.value = arr[1];
				}
			}
		})
		
		let div2 = document.querySelector(".letter-form td.por");
		if(div2 != null){
			div2.addEventListener("mouseenter",function(){
				listDetail.classList.add("on");
			})
			div2.addEventListener("mouseleave",function(){
				listDetail.classList.remove("on");
			})
		}
	}

	if(userId != ""){
		getLetter("received");
	}
})

// modal Show
function modalShow(pop){
	document.querySelector(".bg").classList.add("on");
	if(pop == "letter") {
		document.querySelector("#"+pop).classList.add("on");
	};
}
// modal Close
function modalClose(){
	document.querySelector(".bg").classList.remove("on");
	document.querySelector(".pop-content").classList.remove("on");
}
// 쪽지 modal 탭변경
function changeLetterModal(page){
	let content = document.querySelectorAll(".js-tab-content");
	if(content.length > 0){
		content.forEach(con => con.classList.remove("on"));
		document.querySelector("#"+ page).classList.add("on");
	}
	let eventSelect = document.querySelector(".event-select");
	 if(document.querySelector(".letter-tab > li a.on").getAttribute("href") == "write"){
		 if(auth == 'enter') getEdayList();
		 if(auth == 'owner') getAttendEvent();
		 if(eventSelect != null) eventSelect.classList.remove("hide");
		 if(listDetail != null) listDetail.classList.remove("hide");
		 writeReceiver.value = "";
		 hideReceiver.value = "";
	 }else{
		 if(eventSelect != null) eventSelect.classList.add("hide");
		 if(listDetail != null) listDetail.classList.add("hide");
		 writeReceiver.value = "관리자";
		 hideReceiver.value = "admin";
	 }
}


// 쪽지 리스트
function getLetter(type){
	fetch(`/modal/getLetterList/${type}`)
	.then(res => {
	    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
	    return res.text();
	})
	.then(text => {
	    if (!text) return null;
	    return JSON.parse(text);
	})
	.then(result => {
		if(result != null && result.length > 0){
			let str = "";
			let firstEl = document.querySelector("#list > .letter-list > li").firstElementChild;
			result.forEach(letter =>{
				str += `<li>`;
				if(type == "received"){
					firstEl.innerHTML = "작성자";
					str += `<span class="items">${letter.letter_writer}</span>`;				
				}else{
					firstEl.innerHTML = "수신자";
					str += `<span class="items">${letter.letter_receiver}</span>`;								
				}
				str += `<a href="${letter.letter_idx}" class="items t-l">${letter.letter_content != null ? letter.letter_content : ''}</a>`;
				str += `<span class="items">${dateFormate(letter.letter_regdate)}</span>`;
				if(type == "sendLetter"){
					str += `<i class="items material-symbols-outlined drafts">drafts</i>`;
				}else{
					if(letter.letter_read > 0){
						str += `<i class="items material-symbols-outlined drafts">drafts</i>`;
					}else{
						str += `<i class="items material-symbols-outlined">mail</i>`;
					}
				}
				str += `</li>`;
				
				if(result.length > 7){
					document.querySelector("#list .inner").style.setProperty('width', 'calc(100% + 1.5vw)');
				}else{
					document.querySelector("#list .inner").style.setProperty('width', '100%');
				}
			})
			document.querySelector("#listBody").innerHTML = str;
			
			
			
			// 리스트 클릭 이벤트
			let letters = document.querySelectorAll(".letter-list a");
			if(letters.length > 0 && letter != null){
				letters.forEach(letterEl => {
					letterEl.addEventListener("click", function(e){
						e.preventDefault();
						let letter_idx = letterEl.getAttribute("href");
						letterView(letter_idx);
					})
				})
			}
			
		}else{
			
			let str = "";
			str += `<li class="empty-data">`;
			str += 		`<p>데이터 없음</p>`;
			str += `</li>`;
			document.querySelector("#listBody").innerHTML = str;
		}
		changeLetterModal("list");
		getLetterCnt();
	})
	.catch(err => console.log(err))
}

// 쪽지 view
function letterView(letter_idx){
	
	// 선택 메시지 정보
	fetch(`/modal/getLetterView/${letter_idx}`)
	.then(response => response.json())
	.then(result => {
		if(result != undefined || result != null){
			viewWriter.value = result.letter_writer;
			viewContent.value = result.letter_content;
			
			changeLetterModal("view");
		}else{
			alert("잘못된 접근입니다.");
			return;
		}
	})
	.catch(err => console.log(err))
}


function getLetterCnt(){
	// 선택 메시지 정보
	fetch(`/modal/getLetterCnt`)
	.then(response => response.json())
	.then(result => {
		if(result > 0 ){
			document.querySelector(".right-div > .icon > span").innerHTML = result != null ? result : 0;
			document.querySelector(".right-div > .icon > span").classList.remove("hide");
		}else{
			document.querySelector(".right-div > .icon > span").classList.add("hide");
		}
	})
	.catch(err => console.log(err))
}



// 쪽지 전송
function insertLetter(f){
	if(hideReceiver.value == ""){
		alert("받는 사람을 입력해주세요.");
		return;
	}
	if(writeContent.value.length <= 10){
		alert("내용을 10자 이상 입력해주세요.");
		return;
	}

	
	fetch(`/modal/insertLetter`,{
		method : "post",
		headers:{
			'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
			letter_receiver : hideReceiver.value,
			letter_content : writeContent.value
        })
	})
	.then(response => response.text())
	.then(result => {
		if(result == "undefind"){
			alert("등록되지 않은 사용자입니다");
			document.querySelector("#write .letter-receiver").focus();
			return;
		}else if(result == "fail"){
			alert("전송에 실패 하였습니다");
			return;
		}else{
			alert("전송이 완료되었습니다.");
			writeReceiver.value = "";
			writeContent.value = "";
			hideReceiver.value = "";
		}
		getLetter("received");
	})
	.catch(err => console.log(err))
}

// 이벤트 참석 리스트
function getEdayList(){
	let dayList = [];
	fetch(`/modal/getEdayList`)
	.then(response => response.json())
	.then(result => {
		if(result != null){
			let str = `<option value="0">이벤트를 선택하세요</option>`;
			result.forEach(event => {
				event.join_eday.forEach((eday,idx) => {
					
					if(eday.eventRequestCount > 0){
						str += `<option value="${event.join_eday[idx].eday_idx}">(${idx + 1}일차) ${event.event_title}</option>`;
					}
				})
			})
			attendList.innerHTML = str;
		}
	})
	.catch(err => console.log(err))
}
// 이벤트 참석 리스트
function getAttendList(eday){
	fetch(`/modal/getAttendList/${eday}`)
	.then(response => response.json())
	.then(result => {
		if(result != null || result.length > 0){
			writeReceiver.value = "";
			hideReceiver.value = "";
			let detail = ``;
			result.forEach((day,idx) => {
				let storeName = day.join_request.join_store.store_name;
				let storeId = day.member_id;
				hideReceiver.value += `${storeId}`;
				writeReceiver.value += `"${storeName} (${storeId})"`;
				if(result.length - 1 > idx){
					writeReceiver.value += `, `;
					hideReceiver.value += `, `;
				}
				detail += `<li>${storeName} (${storeId})</li>`;
			})
			
			listDetail.innerHTML = detail;
		}
	})
	.catch(err => console.log(err))
}

function getAttendEvent(){
	let dayList = [];
	fetch(`/modal/getAttendEvent`)
	.then(response => response.json())
	.then(result => {
		console.log(result);
		if(result != null){
			let str = `<option value="0">이벤트를 선택하세요</option>`;
			let idx = 0;
			for (let i = 0; i < result.length; i++) {
				if(i != 0 && result[i].event_idx != result[i - 1].event_idx){
					idx = 0;
				}
				if(result[i].pon == 1){
					str += `<option value="${result[i].enter_id}//${result[i].enter_name}">(${idx + 1}일차) ${result[i].event_title}</option>`;
				}
				idx++;
			}
		
			attendList.innerHTML = str;
		}
	})
	.catch(err => console.log(err))
}
