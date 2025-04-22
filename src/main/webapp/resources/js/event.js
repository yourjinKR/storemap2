const EVENT_CSS_FILE_PATH = '/resources/css/event.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = EVENT_CSS_FILE_PATH;
document.head.appendChild(linkEle);

document.addEventListener("DOMContentLoaded", (event) => {
	// 이벤트 리스트 뷰타입 변환
	let boardType = document.querySelectorAll("input[type=radio]");
	boardType.forEach(el => {
	    el.addEventListener("change", function(){
	    	let checkedType = document.querySelector("input[type=radio]:checked").value;
	    	boardChange(checkedType);
	    });
	});
	
	let favorite = document.querySelectorAll("input[type=checkbox]");
	favorite.forEach(heart => {
		heart.addEventListener("change" , function(){
			
			favoriteChk(this.closest("tr").dataset["idx"]);
		})
	})
	
	
});

//이벤트 리스트 뷰타입 변환
function boardChange(chkEl){
	let barod = document.querySelectorAll(".barod");
	let barodShow = document.querySelector(chkEl);
	barod.forEach(el => {
		if(!el.classList.contains("hide")){
			el.classList.add("hide");			
		}else{
			el.classList.remove("hide");
		}
	})
}

//function favoriteChk(eventIdx){
//	fetch(`/event/favorite/${eventIdx}`)
//	.then(response => response.json())
//	.then(result => {
//		console.log("result : " + result);
//	})
//}

function openModal() {
	  document.getElementById("calendarModal").style.display = "block";
	}

	function closeModal() {
	  document.getElementById("calendarModal").style.display = "none";
	}

	function confirmParticipation() {
	  const selectedDate = document.getElementById("selectedDate").value;
	  if (!selectedDate) {
	    alert("참여할 날짜를 선택해주세요.");
	    return;
	  }

	  const currentCountElement = document.getElementById("currentCount");
	  let number = parseInt(currentCountElement.innerText);
	  const max = parseInt("${vo.event_max_list}");

	  if (number < max) {
	    number += 1;
	    currentCountElement.innerText = number;
	    closeModal();
	    alert(`✅ ${selectedDate}에 참여가 등록되었습니다!`);
	  } else {
	    alert("최대 인원을 초과할 수 없습니다.");
	  }
	}


