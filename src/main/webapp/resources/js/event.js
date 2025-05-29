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
			    maxDate.setDate(maxDate.getDate() + 30);

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
			    	// eventRegister 이미지 관련
			    const imageInput = document.getElementById('imageInput');
			    const previewContainer = document.getElementById('previewContainer');
			    let selectedFiles = [];

			    imageInput.addEventListener('change', function (event) {
			      const files = Array.from(event.target.files);

			      if ((selectedFiles.length + files.length) > 4) {
			        alert("이미지는 최대 4장까지만 업로드할 수 있습니다.");
			        imageInput.value = "";
			        return;
			      }

			      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

			      files.forEach((file) => {
			        if (!validImageTypes.includes(file.type)) {
			          alert(file.name + " 은 지원하지 않는 이미지 형식입니다.");
			          return;
			        }

			        const reader = new FileReader();
			        reader.onload = function (e) {
			          const previewWrapper = document.createElement('div');
			          previewWrapper.style.position = 'relative';

			          const img = document.createElement('img');
			          img.src = e.target.result;
			          img.style.width = '120px';
			          img.style.height = '120px';
			          img.style.objectFit = 'cover';
			          img.style.border = '1px solid #ccc';
			          img.style.borderRadius = '6px';

			          const deleteBtn = document.createElement('button');
			          deleteBtn.textContent = '×';
			          deleteBtn.type = 'button';
			          deleteBtn.style.position = 'absolute';
			          deleteBtn.style.top = '2px';
			          deleteBtn.style.right = '2px';
			          deleteBtn.style.background = 'rgba(0,0,0,0.6)';
			          deleteBtn.style.color = '#fff';
			          deleteBtn.style.border = 'none';
			          deleteBtn.style.borderRadius = '50%';
			          deleteBtn.style.width = '24px';
			          deleteBtn.style.height = '24px';
			          deleteBtn.style.cursor = 'pointer';

			          deleteBtn.addEventListener('click', function () {
			            previewWrapper.remove();
			            selectedFiles = selectedFiles.filter(f => f !== file);
			            updateInputFiles();
			          });

			          previewWrapper.appendChild(img);
			          previewWrapper.appendChild(deleteBtn);
			          previewContainer.appendChild(previewWrapper);
			        };

			        reader.readAsDataURL(file);
			        selectedFiles.push(file);
			      });

			    });
}
		
	f = document.forms[0];
	console.log(document.querySelectorAll('button.eventBtn'));

	document.querySelectorAll('button.eventBtn').forEach(btn=>{
		btn.addEventListener('click',(e)=>{
			e.preventDefault();
			console.log('click');
			
			if(e.currentTarget.getAttribute("id")=="registerBtn"){
				event.preventDefault();
				logEventDayList();
			}else if(e.currentTarget.getAttribute("id")=="resetBtn"){
				f.reset();
			}else if(e.currentTarget.getAttribute("id")=="listBtn"){
				goIndex();
			}else if(e.currentTarget.getAttribute("id")=="goRegister"){
				goRegister();
			}else if(e.currentTarget.getAttribute("id")=="goEventList"){
				goEventList();
			}else if(e.currentTarget.getAttribute("id")=="modifyBtn"){
				modifyBtn();
			}
		})
	});
	// 모달 열기
	let openBtn = document.getElementById('openBtn');
	if (openBtn != null) {
	    openBtn.addEventListener('click', function (e) {
	        e.preventDefault();
	        document.getElementById('calendarModal').style.display = 'block';
	    });
	}

	// 모달 닫기
	let closeBtn = document.getElementById('closeBtn');
	if (closeBtn != null) {
	    closeBtn.addEventListener('click', function () {
	        document.getElementById('calendarModal').style.display = 'none';
	    });
	}

	// 모달 바깥 클릭 시 닫기
	window.addEventListener('click', function (event) {
	    const modal = document.getElementById('calendarModal');
	    if (event.target === modal) {
	        modal.style.display = 'none';
	    }
	});

	const participationButtons = document.querySelectorAll('.participationBtn');

	participationButtons.forEach(button => {
	    button.addEventListener('click', function(event) {
	        const edayIdx = this.getAttribute('data-eday-idx');
	        const withdrawBtn = document.querySelector(`.withdrawBtn[data-eday-idx='${edayIdx}']`);
	        // 신청 버튼을 눌렀을 때 철회 버튼 보이기
	        if (withdrawBtn) {
	            withdrawBtn.style.display = 'inline-block';
	        }
	    });
	});

	window.withdrawEntry = function(button) {
	    const edayIdx = button.getAttribute("data-eday-idx");
	    const storeIdx = button.getAttribute("data-store-idx");

	    fetch("/event/cancelEntry", {
	        method: "POST",
	        headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	        },
	        body: `eday_idx=${edayIdx}&store_idx=${storeIdx}`
	    })
	    .then(response => response.json())
	    .then(data => {
	        if (data.success) {
	            alert("입점 신청이 철회되었습니다.");
	            window.location.href = `/event/eventView?event_idx=${data.eventIdx}`;
	        } else {
	            alert(data.message || "철회 처리에 실패했습니다.");
	        }
	    })
	    .catch(error => {
	        console.error('서버 요청 중 오류:', error);
	        alert("서버 요청 중 오류가 발생했습니다.");
	    });
	}
    
	// 이벤트 신고 모달
	const reportButtons = document.querySelectorAll('.report-button');
	const modal = document.querySelector('#event-report-selection');
	const closeReportBtn = document.querySelector('#event-report-selection .close');
	const reportForm = document.getElementById('eventReportForm');
	const reportSubmitBtn = document.getElementById('eventReportBtn');
	const isLoggedInInput = document.getElementById('isLoggedIn');
	const isLoggedIn = isLoggedInInput && isLoggedInInput.value === "true";

	// 요소 확인 로그
	if (!modal || !closeReportBtn || !reportForm || !reportSubmitBtn) {
	  console.warn('모달 또는 필수 요소들을 찾을 수 없습니다.');
	  return;
	}

	// 신고 버튼 누르면 모달 열기
	reportButtons.forEach(button => {
	  button.addEventListener('click', function () {
	    if (!isLoggedIn) {
	      alert("로그인해야 신고할 수 있습니다.");
	      return;
	    }

	    if (userType === 'enter') {
	      alert("기업 회원은 신고 기능을 사용할 수 없습니다.");
	      return;
	    }

	    modal.style.display = 'block';
	  });
	});

	// 닫기 버튼 (X) 누르면 모달 닫기
	closeReportBtn.addEventListener('click', function () {
	  modal.style.display = 'none';
	});

	// 신고 제출 버튼 클릭 이벤트
	reportSubmitBtn.addEventListener('click', function () {
	  if (!isLoggedIn) {
	    alert("로그인해야 신고할 수 있습니다.");
	    return;
	  }

	  if (userType === 'enter') {
	    alert("입점 업체 회원은 신고 기능을 사용할 수 없습니다.");
	    return;
	  }

	  const categoryInput = document.querySelector('input[name="declaration_category"]:checked');
	  const contentInput = document.querySelector('textarea[name="declaration_content"]');

	  if (!categoryInput || !contentInput) {
	    alert('필수 입력값이 누락되었습니다.');
	    return;
	  }

	  const content = contentInput.value.trim();
	  if (!content) {
	    alert('신고 내용을 입력해주세요.');
	    return;
	  }

	  alert("신고가 접수 되었습니다.");
	  reportForm.submit();
	});
      
      
      const userTypeInput = document.getElementById('userType');
      const userType = userTypeInput ? userTypeInput.value.trim() : '';

      const heartIcons = document.querySelectorAll('.eventLike-checkbox');
      heartIcons.forEach(icon => {
        icon.addEventListener('click', function (e) {
          if (userType.toLowerCase() !== 'user') {
            alert('일반회원만 좋아요를 등록할 수 있습니다.');
            e.preventDefault();
            return false;
          }
        });

        icon.addEventListener('change', function () {
          if (userType.toLowerCase() !== 'user') {
            alert('일반회원만 좋아요를 등록할 수 있습니다.');
            this.checked = !this.checked;
            return;
          }

          const eventIdx = this.id.replace('eventLike-icon', '');
          if (!eventIdx) return;

          const isLiked = this.checked;

          fetch('/event/like', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify({
              event_idx: eventIdx,
              action: isLiked ? 'like' : 'unlike'
            })
          })
          .then(response => {
            if (response.status === 401) {
              alert('로그인이 필요합니다.');
              return;
            }

            if (!response.ok) {
              return Promise.reject('서버 오류');
            }

            return response.json();
          })
          .then(data => {
            if (data && data.likeCount !== undefined) {
              const likeCountElement = document.querySelector(`.eventLike-count-${eventIdx}`);
              if (likeCountElement) {
                likeCountElement.textContent = data.likeCount;
              }
            } else {
              console.error('Invalid response data:', data);
            }
          })
          .catch(error => {
            if (error === '서버 오류') {
              alert('서버에서 오류가 발생했습니다.');
            } else {
              console.error('Error:', error);
            }
          });
        });
      });
      
      new Swiper('.swiper-container', {
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          allowTouchMove: false,
          slidesPerView: 1,
        });
      
      // 이벤트 설명 더보기     
      let moreBtn = document.querySelector(".more-content");
      if(moreBtn != null){
    	  moreBtn.addEventListener("click", function(e){
    		  e.preventDefault();
    		  let detailCon = document.querySelector(".event-detail");
    		  if(detailCon != null){
    			  if (detailCon.style.height && detailCon.style.height !== "0px") {
				    detailCon.style.height = "0px";
				    document.querySelector(".more-content").innerHTML = "더보기 ▼";
				    document.querySelector(".event-text").scrollIntoView({ behavior: "smooth" });
				  } else {
				    detailCon.style.height = detailCon.scrollHeight + "px";
				    document.querySelector(".more-content").innerHTML = "접기 ▲";
				  }
    		  }
    	  })
    	  
    	  let detailCon = document.querySelector(".event-detail");
    	  if(detailCon == null){
    		  moreBtn.style.display = "none";
    	  }
      }
      
      // 상점이동
      let storeHref = document.querySelectorAll(".store-box > a");
		if(storeHref != null && storeHref.length > 0){
			storeHref.forEach(target => {
				target.addEventListener("click",function(e){
					e.preventDefault();
					sessionStorage.setItem('store_idx', this.getAttribute("href"));
					location.href = "/store/map";
				})
			})
		}		
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
	    adjustEventDaysContainerScroll();
	    return;
	  }
	  
	  

	  // 일괄 입력 폼 추가
	  const bulkDiv = document.createElement("div");
	  let edayCon = document.querySelector("tr.hide");
	  if(edayCon != null){
		  edayCon.classList.remove("hide");
	  }
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

	    const div = document.createElement("div");
	    div.classList.add("event-day");
	    div.dataset.date = yyyyMMdd;
	    div.style.marginBottom = "15px";

	    div.innerHTML = `
	      <fieldset style="border:1px solid #ccc; padding:10px;">
	        <legend><strong>${yyyyMMdd}</strong></legend>
	        최대 입점 수:
	        <input type="number" name="eventDay[${index}].store_max" class="storeMax" required style="width: 80px;">
	        시작 시간:
	        <input type="time" class="startTime" required>
	        종료 시간:
	        <input type="time" class="stopTime" required>
	        <input type="hidden" name="eventDay[${index}].event_starttime" class="eventStartTime">
	        <input type="hidden" name="eventDay[${index}].event_stoptime" class="eventStopTime">
	      </fieldset>
	    `;

	    container.appendChild(div);
	    current.setDate(current.getDate() + 1);
	    index++;
	  }

	  updateDateTimeHiddenFields();  // 생성 직후에도 값 채워넣기
	}
	// 날짜 포맷
	function updateDateTimeHiddenFields() {
	  const fieldsets = document.querySelectorAll('.event-day');

	  fieldsets.forEach((fs) => {
	    const eventDate = fs.dataset.date;  // YYYY-MM-DD
	    const startTime = fs.querySelector('.startTime').value; // HH:mm
	    const stopTime = fs.querySelector('.stopTime').value;

	    if (eventDate && startTime && stopTime) {
	      const fullStart = `${eventDate} ${startTime}:00`;
	      const fullStop = `${eventDate} ${stopTime}:00`;

	      fs.querySelector('.eventStartTime').value = fullStart;
	      fs.querySelector('.eventStopTime').value = fullStop;
	    }
	  });
	  
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

function goIndex(){
	location.href = "/event/eventList";
}

function goRegister(){
	location.href ="/event/eventRegister"
}
function goEventList(){
	location.href="/event/eventList"
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
    
    if (!f.event_title.value) {
        alert("행사명을 입력하세요.");
        return;
    }

    if (!f.event_category.value) {
        alert("카테고리를 선택하세요.");
        return;
    }

    if (!f.event_rstartdate.value) {
        alert("모집 시작 날짜를 선택하세요.");
        return;
    }

    if (!f.event_rstopdate.value) {
        alert("모집 종료 날짜를 선택하세요.");
        return;
    }

    if (!f.event_bstartdate.value) {
        alert("행사 시작 날짜를 선택하세요.");
        return;
    }

    if (!f.event_bstopdate.value) {
        alert("행사 종료 날짜를 선택하세요.");
        return;
    }

    if (!f.event_content.value.trim()) {
        alert("행사 내용을 입력하세요.");
        return;
    }

    if (!f.eventImage.value) {
        alert("대표 이미지를 선택하세요.");
        return;
    }
    document.querySelector("#savingUI").classList.add("save");
    updateDateTimeHiddenFields()
    f.action="/event/eventRegister";
	f.submit();
}

function modifyBtn(){
	const deletedUuidsInput = document.getElementById('deletedUuidsInput');
	deletedUuidsInput.value = deletedUuids.join(',');
	console.log("삭제 대상 UUIDs:", deletedUuidsInput.value);
	
	  const postcodeInput = document.getElementById('postcodeInput');
	  const warning = document.getElementById('postcodeWarning');

	  if (!postcodeInput.value.trim()) {
	    warning.style.display = 'inline';
	    postcodeInput.focus();
	    return false;
	  } 
	
	document.querySelector("#savingUI").classList.add("save");
	f.submit();
}

function adjustEventDaysContainerScroll() {
	  const container = document.getElementById('eventDaysContainer');
	  const days = container.querySelectorAll('.event-day').length;

	  if (days > 5) {
	    container.style.maxHeight = "600px"; // 높이 조절 가능
	    container.style.overflowY = "auto";
	  } else {
	    container.style.maxHeight = "";
	    container.style.overflowY = "";
	  }
	}
