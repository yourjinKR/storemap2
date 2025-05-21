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
				let target = document.querySelector("#idx"+this.getAttribute("href"));
				if(target.classList.contains("on")){
					
					target.classList.remove("on");
				}else{
					details.forEach(el => el.classList.remove("on"));
					target.classList.add("on");
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
// 버튼 이벤트 함수
function buttonEvent(){
	// 기존 버튼 선택
	const approvalBtns = document.querySelectorAll("#storeApprovalBtn");
	const disallowBtns = document.querySelectorAll("#storeDisallowBtn");
	
	//점포 승인
	approvalBtns.forEach(btn => {
		// 이벤트 중복 방지를 위한 복제
		const newBtn = btn.cloneNode(true);
		btn.parentNode.replaceChild(newBtn, btn);
		// 새 버튼에 이벤트 추가
		newBtn.addEventListener("click", function() {
			// 현재 버튼이 속한 행에서 member_idx 값 가져오기
			const li = this.closest('li');
			const memberIdx = li.querySelector('.idx').textContent;
			
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
		});
	});
	//점포 불허
	disallowBtns.forEach(btn => {
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
	// 점포 신고 취소
	// 리뷰 숨기기
	// 리뷰 신고 취소
}
// 점주 승인
function storeApproval(){
	storeRequestForm.action = '/admin/storeApproval';
	storeRequestForm.submit();
};
function storeDisallow(){
	if(confirm("정말 불허하시겠습니까?")){
		storeRequestForm.action = '/admin/storeDisallow';
		storeRequestForm.submit();
	    alert("불허 되었습니다");
	}else{
	}
}
// 점포 숨기기
function storeReportHide(){
	storeReportForm.action = '/admin/storeReportHide';
	storeReportForm.submit();
}
function storeReportRemove(){
	if(confirm("신고를 취소 하시겠습니까?")){
		storeReportForm.action = '/admin/storeReportRemove';
		storeReportForm.submit();
		alert("취소 되었습니다");
	}else{
	}
}
// 리뷰 숨기기
function reviewReportHide(){
	reviewReportForm.action = '/admin/reviewReportHide';
	reviewReportForm.submit();
}
function reviewReportRemove(){
	if(confirm("신고를 취소 하시겠습니까?")){
		reviewReportForm.action = '/admin/reviewReportRemove';
		reviewReportForm.submit();
		alert("취소 되었습니다");
	}else{
	}
}