const EVENT_CSS_FILE_PATH = '/resources/css/event.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = EVENT_CSS_FILE_PATH;
document.head.appendChild(linkEle);

let filterBtn, filter, filterAmount = null;

document.addEventListener("DOMContentLoaded", (event) => {
	// 이벤트 리스트 뷰타입 변환
	let boardType = document.querySelectorAll(".board-type input[type=radio]");
	boardType.forEach(el => {
	    el.addEventListener("change", function(){
	    	let checkedType = document.querySelector(".board-type input[type=radio]:checked").value;
	    	boardChange(checkedType);
	    });
	});

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
	  }
	  
	  
	  // 이벤트 리스트 출력
	  if(window.location.pathname == "/event/eventList"){
		  
		  // 필터 모달
		  filterBtn = document.querySelector("#filterChk");
		  filter = document.querySelector(".filter");
		  if(filterBtn != null || filter != null){
			  filterBtn.addEventListener("change",function(){
				  filter.classList.toggle("on");
			  })
		  }
		  //게시물 수 
		  filterAmount = document.querySelector("#amount");
		  if(filterAmount != null){
			  filterAmount.addEventListener("change",function(){
				  eventFilter(pageNum, this.value)
			  })
		  }
		  eventFilter(pageNum);
	  }
	  
	  
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

function eventFilter(pageNum){
	let pageNumData = pageNum != null ? pageNum : 1;
	let amountData = filterAmount.value;
	// 이벤트 필터링
	fetch("/event/eventFilter", {
		method : 'POST',
		headers:{
			'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
        	sort_type : document.querySelector("input[name='sort']:checked").getAttribute("id"),
        	search_date : "",
    		page_num : pageNumData,
    		amount_num : amountData
        })
	})
	.then(response => response.json())
	.then(result => {
		let str = "";
		let paging = "";
		let pageMaker = result.pager;
		result.event.forEach(data => {
			str += 	`<tr data-idx="${data.event_idx}">`;
			str += 		`<td>`;
			str += 			`<a href="/event/eventView?event_idx=${data.event_idx}">${data.event_title}`;
			str += 				`최대 : ${data.max_store}`;
			str += 			`</a>`;
			str += 		`</td>`;
			str += 		`<td>`;
			str += 			`<span class="finsh-icon">마감 임박</span>`;
			str += 		`</td>`;
			
			if(document.querySelector("#eventRdate").checked){
				str += 		`<td class="t-l">`;
				str += 			`<span>입점 신청 : ${dateFormate(data.event_rstartdate)} ~ ${dateFormate(data.event_rstopdate)}</span>`;
				str += 		`</td>`;
			}
			if(document.querySelector("#eventBdate").checked){
				str += 		`<td class="t-l">`;
				str += 			`<span>이벤트 : ${dateFormate(data.event_bstartdate)} ~ ${dateFormate(data.event_bstopdate)}</span>`;
				str += 		`</td>`;
			}
			
			str += 	`</tr>`;
		})
		
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
		
		document.querySelector("#eventList tbody").innerHTML = str;
		document.querySelector(".page-wrap").innerHTML = paging;
		
		if(document.querySelector("#eventRdate").checked && document.querySelector("#eventBdate").checked){
			document.querySelectorAll("#eventList colgroup col")[3].classList.remove("hide");
		}else{
			document.querySelectorAll("#eventList colgroup col")[3].classList.add("hide");
		}
		
		filterBtn.checked = false;
		filter.classList.remove("on");
		
		pager();
	})
	.catch(err => console.log(err))
}




