const ADMIN_CSS_FILE_PATH = '/resources/css/admin.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = ADMIN_CSS_FILE_PATH;
document.head.appendChild(linkEle);


document.addEventListener("DOMContentLoaded", (event) => {
	// 관리자단 탭변경
	tabChange();
	
	let btns = document.querySelectorAll(".detail-btn");
	let details = document.querySelectorAll(".report-detail");
	if(btns != null && btns.length > 0){
		btns.forEach(btn => {
			btn.addEventListener("click",function(e){
				e.preventDefault();
				let targetIdx = this.getAttribute("href");
				let target = document.querySelector("#idx"+targetIdx);
				
				if(target.classList.contains("on")){
					target.classList.remove("on");
				}else{
					details.forEach(el => el.classList.remove("on"));
					target.classList.add("on");
					
					// 해당 항목의 신고 상세만 표시
					reportDetails(targetIdx, target);
				}
			})
		})
	}
	// 버튼 이벤트 처리
	buttonEvent();
});
// 탭변경
function tabChange(){
	let mainTab, subTab = null;
	let mainTabs = document.querySelectorAll(".main-tab > li > a");
	let selectMainTab = document.querySelector(".main-tab > li > a.on");
	let subTabs = document.querySelectorAll(".sub-tab > li > a");
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
				mainTab = selectMainTab.getAttribute("href");
				
				// 탭 변경시 현재 탭정보 초기화
				mainTabs = document.querySelectorAll(".main-tab > li > a");
				selectMainTab = document.querySelector(".main-tab > li > a.on");
				if(selectMainTab != null) {
					mainTab = selectMainTab.getAttribute("href");
				}
				
				// 버튼 이벤트 등록 함수 다시 호출
				setTimeout(() => {
					buttonEvent();
				}, 100);
			})
		})
	}
	// 서브 탭 변경
	if(subTabs != null){
		subTabs.forEach(tab => {
			tab.addEventListener("click", function(e){
				e.preventDefault();
				let subContent = document.querySelectorAll(".sub-tab-content");
				subTabs.forEach(tab => tab.classList.remove("on"));
				subContent.forEach(con => con.classList.remove("on"));
				
				this.classList.add("on");
				document.querySelector("."+mainTab+"-"+this.getAttribute("href")).classList.add("on");
				
				// 버튼 이벤트 등록 함수 다시 호출
				setTimeout(() => {
					buttonEvent();
				}, 100);
			})
		})
	}
}
//신고 상세 필터링 함수
function reportDetails(targetIdx, targetElement) {
	// 데이터가 들어있는 두 번째 ul을 찾기
	let dataUl = targetElement.querySelector('ul:nth-child(2)');
	
	if(dataUl) {
		// 데이터 행들만 필터링 (헤더는 첫 번째 ul에 있으므로 제외)
		let detailRows = dataUl.querySelectorAll('li');
		
		detailRows.forEach(row => {
			// 각 행에서 idx 데이터 속성 확인
			let rowIdx = row.getAttribute('data-store-idx') || row.getAttribute('data-review-idx') || row.getAttribute('data-event-idx');
			
			if(rowIdx && rowIdx === targetIdx) {
				row.style.display = 'flex'; // 해당 번호의 신고만 표시
			} else {
				row.style.display = 'none'; // 다른 번호의 신고는 숨김
			}
		});
	}
}
// 버튼 이벤트 함수
function buttonEvent(){
	// 리뷰 버튼 선택
	const ReviewReportHideBtns = document.querySelectorAll("#reviewReportHideBtn");
	const ReviewReportUnhideBtns = document.querySelectorAll("#reviewReportUnhideBtn");
	const ReviewReportRemoveAllBtns = document.querySelectorAll("#reviewReportRemoveAllBtn");
	const ReviewReportRemoveBtns = document.querySelectorAll("#reviewReportRemoveBtn");
	// 점포 버튼 선택
	const StoreApprovalBtns = document.querySelectorAll("#storeApprovalBtn");
	const StoreDisallowBtns = document.querySelectorAll("#storeDisallowBtn");
	const StoreReportHideBtns = document.querySelectorAll("#storeReportHideBtn");
	const storeReportunHideBtn = document.querySelectorAll("#storeReportunHideBtn");
	const StoreReportRemoveAllBtns = document.querySelectorAll("#storeReportRemoveAllBtn");
	const StoreReportRemoveBtns = document.querySelectorAll("#storeReportRemoveBtn");
	// 기업 버튼 선택
	const EnterApprovalBtns = document.querySelectorAll("#enterApprovalBtn");
	const EnterDisallowBtns = document.querySelectorAll("#enterDisallowBtn");
	// 이벤트 버튼 선택
	const EventReportHideBtns = document.querySelectorAll("#eventReportHideBtn");
	const EventReportUnhideBtns = document.querySelectorAll("#eventReportUnhideBtn");
	const EventReportRemoveAllBtns = document.querySelectorAll("#eventReportRemoveAllBtn");
	const EventReportRemoveBtns = document.querySelectorAll("#eventReportRemoveBtn");
	
	// 리뷰 숨기기
	ReviewReportHideBtns.forEach(btn => {
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		newBtn.addEventListener("click", function() {
			const li = this.closest('li');
			const reviewIdx = li.querySelector('.idx').textContent;
			if(confirm("정말 숨기시겠습니까?")){
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/reviewReportHide';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'review_idx';
				input.value = reviewIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});

	// 리뷰 숨기기 해제
	ReviewReportUnhideBtns.forEach(btn => {
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		newBtn.addEventListener("click", function() {
			const li = this.closest('li');
			const reviewIdx = li.querySelector('.idx').textContent;
			if(confirm("정말 숨기기를 해제하시겠습니까?")){
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/reviewReportunHide';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'review_idx';
				input.value = reviewIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});

	// 리뷰 신고 전체 취소
	ReviewReportRemoveAllBtns.forEach(btn => {
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		newBtn.addEventListener("click", function() {
			const li = this.closest('li');
			const reviewIdx = li.querySelector('.idx').textContent;
			if(confirm("정말 전체 신고를 삭제하시겠습니까?")){
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/reviewReportRemoveAll';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'review_idx';
				input.value = reviewIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});

	// 리뷰 신고 취소
	ReviewReportRemoveBtns.forEach(btn => {
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		newBtn.addEventListener("click", function() {
			const li = this.closest('li');
			const reviewIdx = li.getAttribute('data-review-idx');
			const buttonText = this.textContent;
			const memberIdx = buttonText.replace('신고 삭제', '');
			
			if(confirm("정말 신고를 삭제하시겠습니까?")){
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/reviewReportRemove';
				
				const input1 = document.createElement('input');
				input1.type = 'hidden';
				input1.name = 'review_idx';
				input1.value = reviewIdx;
				
				const input2 = document.createElement('input');
				input2.type = 'hidden';
				input2.name = 'member_idx';
				input2.value = memberIdx;
				
				form.appendChild(input1);
				form.appendChild(input2);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	//점포 승인
	StoreApprovalBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 member_idx 값 가져오기
			const li = this.closest('li');
			const memberIdx = li.querySelector('.idx').textContent;
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 승인하시겠습니까?")){
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/storeApproval';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'member_idx';
				input.value = memberIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	//점포 불허
	StoreDisallowBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 member_idx 값 가져오기
			const li = this.closest('li');
			const memberIdx = li.querySelector('.idx').textContent;
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 불허하시겠습니까?")) {
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/storeDisallow';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'member_idx';
				input.value = memberIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	// 점포 숨기기
	StoreReportHideBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 store_idx 값 가져오기
			const li = this.closest('li');
			const storeIdx = li.querySelector('.idx').textContent;
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 숨기시겠습니까?")){
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/storeReportHide';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'store_idx';
				input.value = storeIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	// 점포 숨기기 해제
	storeReportunHideBtn.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 store_idx 값 가져오기
			const li = this.closest('li');
			const storeIdx = li.querySelector('.idx').textContent;
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 해제하시겠습니까?")){
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/storeReportunHide';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'store_idx';
				input.value = storeIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	// 점포 신고 전체 취소
	StoreReportRemoveAllBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 store_idx 값 가져오기
			const li = this.closest('li');
			const storeIdx = li.querySelector('.idx').textContent;
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 삭제하시겠습니까?")){
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/storeReportRemoveAll';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'store_idx';
				input.value = storeIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	// 점포 신고 취소
	StoreReportRemoveBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 store_idx와 member_idx 값 가져오기
			const li = this.closest('li');
			const storeIdx = li.getAttribute('data-store-idx');
			// 버튼 텍스트에서 member_idx 추출 (예: "신고 삭제123" -> "123")
			const buttonText = this.textContent;
			const memberIdx = buttonText.replace('신고 삭제', '');
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 삭제하시겠습니까?")){
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/storeReportRemove';
				
				const input1 = document.createElement('input');
				input1.type = 'hidden';
				input1.name = 'store_idx';
				input1.value = storeIdx;
				
				const input2 = document.createElement('input');
				input2.type = 'hidden';
				input2.name = 'member_idx';
				input2.value = memberIdx;
				
				form.appendChild(input1);
				form.appendChild(input2);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	// 기업 승인
	EnterApprovalBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 enter_idx 값 가져오기
			const li = this.closest('li');
			const enterIdx = li.querySelector('.idx').textContent;
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 승인하시겠습니까?")){
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/enterApproval';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'enter_idx';
				input.value = enterIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	// 기업 불허
	EnterDisallowBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 enter_idx 값 가져오기
			const li = this.closest('li');
			const enterIdx = li.querySelector('.idx').textContent;
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 불허하시겠습니까?")) {
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/enterDisallow';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'enter_idx';
				input.value = enterIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	// 이벤트 숨기기
	EventReportHideBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 event_idx와 enter_idx 값 가져오기
			const li = this.closest('li');
			const eventIdx = li.querySelector('.idx').textContent;
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 숨기시겠습니까?")){
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/eventReportHide';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'event_idx';
				input.value = eventIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	// 이벤트 숨기기 해제
	EventReportUnhideBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 event_idx 값 가져오기
			const li = this.closest('li');
			const eventIdx = li.querySelector('.idx').textContent;
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 해제하시겠습니까?")){
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/eventReportunHide';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'event_idx';
				input.value = eventIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	// 이벤트 신고 취소
	EventReportRemoveBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 event_idx와 member_idx 값 가져오기
			const li = this.closest('li');
			const eventIdx = li.getAttribute('data-event-idx');
			// 버튼 텍스트에서 member_idx 추출
			const buttonText = this.textContent;
			const memberIdx = buttonText.replace('신고 삭제', '');
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 삭제하시겠습니까?")){
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/eventReportRemove';
				
				const input1 = document.createElement('input');
				input1.type = 'hidden';
				input1.name = 'event_idx';
				input1.value = eventIdx;
				
				const input2 = document.createElement('input');
				input2.type = 'hidden';
				input2.name = 'member_idx';
				input2.value = memberIdx;
				
				form.appendChild(input1);
				form.appendChild(input2);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
	
	// 이벤트 신고 전체 취소
	EventReportRemoveAllBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 event_idx 값 가져오기
			const li = this.closest('li');
			const eventIdx = li.querySelector('.idx').textContent;
			// 확인 메시지는 한 번만 표시
			if(confirm("정말 삭제하시겠습니까?")){
				// 새로운 form 생성 및 제출
				const form = document.createElement('form');
				form.method = 'post';
				form.action = '/admin/eventReportRemoveAll';
				
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'event_idx';
				input.value = eventIdx;
				
				form.appendChild(input);
				document.body.appendChild(form);
				form.submit();
			}
		});
	});
}