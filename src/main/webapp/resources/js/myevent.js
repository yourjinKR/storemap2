const MYEVENT_CSS_FILE_PATH = '/resources/css/myevent.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = MYEVENT_CSS_FILE_PATH;
document.head.appendChild(linkEle);

document.addEventListener("DOMContentLoaded", (event) => {
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
	
	let eventBtn = document.querySelectorAll(".tab-content > ul > li > p");
	let detail = document.querySelectorAll(".request-detail");
	if(eventBtn.length > 0 ){
		eventBtn.forEach(event => {
			event.addEventListener("click",function(e){
				eventBtn.forEach(event => event.classList.remove("on"));
				detail.forEach(req => req.classList.remove("on"));
				event.classList.add("on");
				this.closest("li").querySelector(".request-detail").classList.add("on");
			})
		})
	}
	// 일차 변경
	let edayTab = document.querySelectorAll(".request-detail.on .eday-tab > li > a");
	if(edayTab.length > 0 ){
		edayTab.forEach(eday => {
			eday.addEventListener("click",function(e){
				e.preventDefault();
				edayTab.forEach(tab => tab.classList.remove("on"));
				this.classList.add("on");
				let event_idx = "1";
				let edayCon = document.querySelectorAll(".eday-content");
				if(edayCon.length > 0 ){
					edayCon.forEach(tab => tab.classList.remove("on"));
				}
				document.querySelector(".event"+event_idx+"-eday"+this.getAttribute("href")).classList.add("on");
			})
		})
	}
	
	
})
