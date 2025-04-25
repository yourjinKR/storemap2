let viewWriter, viewContent, writeReceiver, writeContent, eventSelect, listDetail = null;
document.addEventListener("DOMContentLoaded", (event) => {
	listDetail = document.querySelector(".list-detail");
	attendList = document.querySelector(".attend-list");
	viewWriter = document.querySelector("#view .letter-writer");
	viewContent = document.querySelector("#view .letter-content");
	writeReceiver = document.querySelector("#write .letter-receiver");
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
			case "received":
				getLetter("received"); 
			break;
			// 보낸 쪽지함
			case "send":
				getLetter("send"); 
				break;
			//쓰기 Form
			case "write":
				changeLetterModal("write")
				break;
			// 쪽지 전송 
			case "post":
				insertLetter();
				break;
			case "read":	 // 쪽지 view 확인
				getLetter(historyBtn);
				break;
			}
		})
	})
	
	getEdayList();
	
	attendList.addEventListener("change",function(){
		if(this.value != 0){
			// n일차 참여 점포 리스트
			getAttendList(this.value);
		}
	})
})

// modal Show
function modalShow(pop){
	document.querySelector(".bg").classList.add("on");
	if(pop == "letter") {
		document.querySelector("#"+pop).classList.add("on");
		getLetter("received");
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
}

getLetter("received");

// 쪽지 리스트
function getLetter(type){
	fetch(`/modal/getLetterList/${type}`)
	.then(response => response.json())
	.then(result => {
		let str = "";
		result.forEach(letter =>{
			str += `<li>`;
			str += `<span class="items">${letter.letter_writer}</span>`;
			str += `<a href="${letter.letter_idx}" class="items t-l">${letter.letter_content}</a>`;
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
		
		changeLetterModal("list");
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


function insertLetter(f){
	fetch(`/modal/insertLetter`,{
		method : "post",
		headers:{
			'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
			letter_receiver : writeReceiver.value,
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
			writeReceiver.value = "";
			writeContent.value = "";
		}
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
			result.join_eday.forEach((eday,idx) => {
				str += `<option value="${result.join_eday[idx].eday_idx}">(${idx + 1}일차)${result.event_title}</option>`;
			})
			attendList.innerHTML = str;
		}
	})
	.catch(err => console.log(err))
}
// 이벤트 참석 리스트
function getAttendList(eday){
	let dayList = [];
	fetch(`/modal/getAttendList/${eday}`)
	.then(response => response.json())
	.then(result => {
		console.log(result);
//		if(result != null){
//			let str = `<option value="0">이벤트를 선택하세요</option>`;
//			result.join_eday.forEach((eday,idx) => {
//				str += `<option value="${idx + 1}">(${idx + 1}일차)${result.event_title}</option>`;
//
//				dayList.push(eday.join_event_request.join_store);
//			})
//			attendList.innerHTML = str;
//		}
//		
//		// 이벤트 일차 선택
//		attendList.addEventListener("change",function(){
//			if(this.value != 0){
//				let detail = ``;
//				writeReceiver.value = "";
//				dayList[this.value - 1].forEach((day,idx) => {
//					writeReceiver.value += `"${day.store_name}"`;
//					detail += `<li>${day.store_name}</li>`;
//					if(dayList[this.value - 1].length - 1 > idx){
//						writeReceiver.value += `, `;
//					}
//				})
//			}
//		})
	})
	.catch(err => console.log(err))
}