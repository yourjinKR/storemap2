const EVENT_CSS_FILE_PATH = '/resources/css/event.css';
let eventLinkEle = document.createElement('link');
eventLinkEle.rel = 'stylesheet';
eventLinkEle.href = EVENT_CSS_FILE_PATH;
document.head.appendChild(eventLinkEle);

let f;
document.addEventListener("DOMContentLoaded", (event) => {
	
	// 이벤트 등록 시 일정 추가 버튼 클릭 이벤트
	const today = new Date().toISOString().split("T")[0];
	const startDateInput = document.getElementById("startDate");
	const endDateInput = document.getElementById("endDate");

		if(startDateInput != null && endDateInput != null){
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
			   
			  const rstart = document.getElementById('rstartDate');
			    const rend = document.getElementById('rendDate');
			    const bstart = document.getElementById('startDate');
			    const bend = document.getElementById('endDate');

			    // 오늘 이전 모집 시작일 선택 방지
			    rstart.min = today;

			    // 모집 시작일을 선택하면 마감일 최소 날짜 제한
			    rstart.addEventListener('change', function () {
			      if (rstart.value) {
			        rend.min = rstart.value;
			        if (rend.value && rend.value < rstart.value) {
			          rend.value = '';
			        }
			      }
			    });

			    // 모집 마감일을 선택하면 행사 시작일은 최소 7일 뒤부터
			    rend.addEventListener('change', function () {
			      if (rend.value) {
			        const rendDate = new Date(rend.value);
			        rendDate.setDate(rendDate.getDate() + 7); // +7일

			        const minEventDate = rendDate.toISOString().split('T')[0];
			        bstart.min = minEventDate;
			        bend.min = minEventDate;

			        // 기존 값이 제한보다 작으면 초기화
			        if (bstart.value && bstart.value < minEventDate) bstart.value = '';
			        if (bend.value && bend.value < minEventDate) bend.value = '';
			      }
			    });
	  }
		
	f = document.forms[0];
	console.log(document.querySelectorAll('button.eventBtn'));

	document.querySelectorAll('button.eventBtn').forEach(btn=>{
		btn.addEventListener('click',(e)=>{
			e.preventDefault();
			console.log('click');
			
			if(e.currentTarget.getAttribute("id")=="registerBtn"){
				logEventDayList();
			}else if(e.currentTarget.getAttribute("id")=="resetBtn"){
				f.reset();
			}else if(e.currentTarget.getAttribute("id")=="listBtn"){
				goIndex();
			}else if(e.currentTarget.getAttribute("id")=="goRegister"){
				goRegister();
			}
		})
	});
});


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

	  // 일괄 입력 폼 추가
	  const bulkDiv = document.createElement("div");
	  bulkDiv.style.marginBottom = "15px";
	  bulkDiv.innerHTML = `
	    <fieldset style="border:1px solid #aaa; padding:10px;">
	      <legend><strong> 일괄 입력</strong></legend>
	      최대 입점 수: <input type="number" id="bulkStoreMax" style="width: 80px;">
	      시작 시간: <input type="time" id="bulkStartTime">
	      종료 시간: <input type="time" id="bulkStopTime">
	      <button type="button" onclick="bulkFill()">일괄 등록</button>
	    </fieldset>
	  `;
	  container.appendChild(bulkDiv);

	  // 날짜별 일정 생성
	  let current = new Date(startDate);
	  let index = 0;

	  while (current <= endDate) {
	    const yyyyMMdd = current.toISOString().split("T")[0];
	    const dayIndex = index + 1;

	    const div = document.createElement("div");
	    div.style.marginBottom = "15px";
	    div.innerHTML = `
		최대 입점 수:
		    <input type="number" name="eventDay[${index}].store_max" class="storeMax" required style="width: 80px;">
		시작 시간:
		    <input type="time" name="eventDay[${index}].event_starttime" class="startTime" required>
		종료 시간:
		    <input type="time" name="eventDay[${index}].event_stoptime" class="stopTime" required>
		  </fieldset>
	    `;
	    container.appendChild(div);

	    current.setDate(current.getDate() + 1);
	    index++;
	  }
	}

// 일괄 등록 함수
function bulkFill() {
  const storeMaxInput = document.getElementById("bulkStoreMax");
  const startTimeInput = document.getElementById("bulkStartTime");
  const stopTimeInput = document.getElementById("bulkStopTime");

  if (!storeMaxInput || !startTimeInput || !stopTimeInput) {
    alert("일괄 입력 값을 모두 입력하세요.");
    return;
  }

  const storeMaxValue = storeMaxInput.value;
  const startTimeValue = startTimeInput.value;
  const stopTimeValue = stopTimeInput.value;

  if (!storeMaxValue || !startTimeValue || !stopTimeValue) {
    alert("모든 필드를 입력해야 합니다.");
    return;
  }

  // 각각 클래스명으로 찾기
  const storeMaxInputs = document.querySelectorAll(".storeMax");
  const startTimeInputs = document.querySelectorAll(".startTime");
  const stopTimeInputs = document.querySelectorAll(".stopTime");

  storeMaxInputs.forEach(input => input.value = storeMaxValue);
  startTimeInputs.forEach(input => input.value = startTimeValue);
  stopTimeInputs.forEach(input => input.value = stopTimeValue);

  alert("일괄 입력 완료!");
}


	
//function register(){
//	
//	let a = document.querySelectorAll('input[name="eventDayList[0]"]');
//	console.log(a.value);
//	f.action="/event/eventRegister";
//	f.submit();
//}

function goIndex(){
	location.href = "/event/eventList";
}

function goRegister(){
	console.log(1)
	location.href ="/event/eventRegister"
}
function logEventDayList() {
    const storeMaxInputs = document.querySelectorAll('.storeMax');
    const startTimeInputs = document.querySelectorAll('.startTime');
    const stopTimeInputs = document.querySelectorAll('.stopTime');

    const eventDayList = [];

    for (let i = 0; i < storeMaxInputs.length; i++) {
        const item = {
            store_max: storeMaxInputs[i].value,
            event_starttime: startTimeInputs[i].value,
            event_stoptime: stopTimeInputs[i].value
        };
        eventDayList.push(item);
    }

    console.log("이벤트 날짜 정보 리스트:", eventDayList);
    
	f.action="/event/eventRegister";
	f.submit();
}