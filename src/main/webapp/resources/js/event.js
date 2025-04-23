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


document.addEventListener("DOMContentLoaded", () => {
	  const modal = document.getElementById("calendarModal");
	  const selectedDateInput = document.getElementById("selectedDate");
	  const currentCountElement = document.getElementById("currentCount");

	  const maxPerDay = config.maxPerDay;
	  const startDate = config.startDate;
	  const endDate = config.endDate;

	  // 날짜별 참여 수 저장
	  const participationMap = {};

	  // 모달 열기
	  document.getElementById("openBtn").addEventListener("click", () => {
	    modal.style.display = "block";
	  });

	  // 모달 닫기
	  document.getElementById("closeBtn").addEventListener("click", () => {
	    modal.style.display = "none";
	  });

	  // 참여 확정
	  document.getElementById("confirmBtn").addEventListener("click", () => {
	    const selectedDate = selectedDateInput.value;

	    if (!selectedDate) {
	      alert("참여할 날짜를 선택해주세요.");
	      return;
	    }

	    const selected = new Date(selectedDate);
	    if (selected < new Date(startDate) || selected > new Date(endDate)) {
	      alert("유효한 날짜를 선택해주세요.");
	      return;
	    }

	    const currentCount = participationMap[selectedDate] || 0;
	    if (currentCount < maxPerDay) {
	      participationMap[selectedDate] = currentCount + 1;
	      updateDisplay(selectedDate);
	      modal.style.display = "none";
	      alert(`${selectedDate}에 참여가 등록되었습니다!`);
	    } else {
	      alert("해당 날짜는 최대 인원에 도달했습니다.");
	    }
	  });

	  // 철회 버튼
	  document.getElementById("withdrawBtn").addEventListener("click", () => {
	    const selectedDate = selectedDateInput.value;

	    if (!selectedDate) {
	      alert("철회할 날짜를 선택해주세요.");
	      return;
	    }

	    const currentCount = participationMap[selectedDate] || 0;
	    if (currentCount > 0) {
	      participationMap[selectedDate] = currentCount - 1;
	      updateDisplay(selectedDate);
	      alert(`${selectedDate} 참여가 철회되었습니다.`);
	    } else {
	      alert("철회할 참여가 없습니다.");
	    }
	  });

	  // 참여 인원 수 갱신
	  function updateDisplay(date) {
	    const count = participationMap[date] || 0;
	    currentCountElement.innerText = count;
	  }
	});

