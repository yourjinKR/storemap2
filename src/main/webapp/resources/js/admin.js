const ADMIN_CSS_FILE_PATH = '/resources/css/admin.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = ADMIN_CSS_FILE_PATH;
document.head.appendChild(linkEle);


const f = document.forms[0];


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
	
})


document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'storeApprovalBtn'){
			storeApproval();
		}else if(type === 'storeDisallowBtn'){
			storeDisallow();
		}
		else if(type === 'storeReportHideBtn'){
			storeReportHide();
		}
		else if(type === 'storeReportRemoveBtn'){
			storeReportRemove();
		}
		else if(type === 'reviewReportHideBtn'){
			reviewReportHide();
		}
		else if(type === 'reviewReportRemoveBtn'){
			reviewReportRemove();
		}
	})
});

function storeApproval(){
	f.action = '/admin/adminStoreView';
	f.submit();
};
function storeDisallow(){
	if(confirm("정말 불허하시겠습니까?")){
		f.action = '/admin/adminStoreRemove';
	    f.submit();
	    alert("불허 되었습니다");
	}else{
	}
}

function storeReportHide(){
	f.action = '/admin/storeReportHide';
	f.submit();
}
function storeReportRemove(){
	if(confirm("신고를 취소 하시겠습니까?")){
		f.action = '/admin/storeReportRemove';
		f.submit();
		alert("취소 되었습니다");
	}else{
	}
}

function reviewReportHide(){
	f.action = '/admin/reviewReportHide';
	f.submit();
}
function reviewReportRemove(){
if(confirm("신고를 취소 하시겠습니까?")){
		f.action = '/admin/reviewReportRemove';
		f.submit();
		alert("취소 되었습니다");
	}else{
	}
}

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
			})
		})
	}
}

