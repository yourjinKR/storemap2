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
	});
	
	// 이벤트 등록 시 일정 추가 버튼 클릭 이벤트
	const today = new Date().toISOString().split("T")[0];
	const startDateInput = document.getElementById("startDate");
	const endDateInput = document.getElementById("endDate");

	startDateInput.setAttribute("min", today);
	endDateInput.setAttribute("min", today);

	  // 시작일 선택 시 종료일 제한 (최대 5일)
	  startDateInput.addEventListener("change", () => {
	    const start = new Date(startDateInput.value);
	    if (isNaN(start)) return;

	    const maxDate = new Date(start);
	    maxDate.setDate(maxDate.getDate() + 5); // 총 5일

	    const maxDateStr = maxDate.toISOString().split("T")[0];
	    endDateInput.setAttribute("max", maxDateStr);
	    endDateInput.setAttribute("min", startDateInput.value);

	    if (new Date(endDateInput.value) > maxDate) {
	      endDateInput.value = "";
	    }
	  });
	  
	  
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

//generateDays 함수 정의
function generateDays() {
    const container = document.getElementById("eventDaysContainer");
    container.innerHTML = "";

    const startInput = document.getElementById("startDate");
    const endInput = document.getElementById("endDate");

    const startDate = new Date(startInput.value);
    const endDate = new Date(endInput.value);

    if (isNaN(startDate) || isNaN(endDate) || startDate > endDate) {
      alert("올바른 날짜를 선택하세요.");
      return;
    }

    let current = new Date(startDate);
    let index = 0;

    while (current <= endDate) {
      const yyyyMMdd = current.toISOString().split("T")[0];
      const dayIndex = index + 1;

      const div = document.createElement("div");
      div.style.marginBottom = "15px";
      div.innerHTML = `
        <fieldset style="border:1px solid #ccc; padding:10px;">
          <legend><strong>${dayIndex}일차 (${yyyyMMdd})</strong></legend>
          <input type="hidden" name="days[${index}].eday_date" value="${yyyyMMdd}">
          최대 입점 수:
          <input type="number" name="days[${index}].store_max" required style="width: 80px;">
          시작 시간:
          <input type="time" name="days[${index}].event_starttime" required>
          종료 시간:
          <input type="time" name="days[${index}].event_stoptime" required>
        </fieldset>
      `;
      container.appendChild(div);

      current.setDate(current.getDate() + 1);
      index++;
    }
  }

//function favoriteChk(eventIdx){
//	fetch(`/event/favorite/${eventIdx}`)
//	.then(response => response.json())
//	.then(result => {
//		console.log("result : " + result);
//	})
//}




