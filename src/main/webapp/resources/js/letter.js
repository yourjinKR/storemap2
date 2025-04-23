document.addEventListener("DOMContentLoaded", (event) => {
	// 쪽지 버튼
	let letterBtn = document.querySelectorAll(".pop-content a");
	let historyBtn = "received";
	letterBtn.forEach(btn => {
		btn.addEventListener("click", function(e){
			e.preventDefault();
			letterBtn.forEach(btn2 => {
				if(btn2.classList.contains("on") && btn.getAttribute("href") != "read") 
					historyBtn = btn.getAttribute("href");
				
				btn2.classList.remove("on")
			});
			
			
			document.querySelector("#"+historyBtn).classList.add("on");
			switch (btn.getAttribute("href")) {
			// 받은 쪽지함
			case "received":
				getLetter("received"); 
			break;
			// 보낸 쪽지함
			case "send":
				getLetter("send"); 
				break;
			case "write":
				break;
			case "read":	 // 쪽지 view 확인
				getLetter(historyBtn);
				break;
			}
		})
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
				document.querySelector("#listBody").style.setProperty('width', 'calc(100% + 15px)');
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
	})
	.catch(err => console.log(err))
	
	document.querySelector("#list").classList.add("on");
	document.querySelector("#view").classList.remove("on");
}

// 쪽지 view
function letterView(letter_idx){
	
	// 선택 메시지 정보
	fetch(`/modal/getLetterView/${letter_idx}`)
	.then(response => response.json())
	.then(result => {
		if(result != undefined || result != null){
			document.querySelector("#letterWriter").value = result.letter_writer;
			document.querySelector("#letterReceiver").value = result.letter_receiver;
			document.querySelector("#letterContent").value = result.letter_content;
			
			// document.querySelector("#receivedBtn");
			document.querySelector("#list").classList.remove("on");
			document.querySelector("#view").classList.add("on");
		}else{
			alert("잘못된 접근입니다.");
			return;
		}
	})
	.catch(err => console.log(err))
}