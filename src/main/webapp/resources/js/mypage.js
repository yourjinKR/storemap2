const MYPAGE_CSS_FILE_PATH = '/resources/css/mypage.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = MYPAGE_CSS_FILE_PATH;
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
	
	// 서브 탭 변경
	if(subTabs != null){
		subTabs.forEach(tab => {
			tab.addEventListener("click", function(e){
				e.preventDefault();
				let subContent = document.querySelectorAll(".sub-tab-content");
				subTabs.forEach(tab => tab.classList.remove("on"));
				subContent.forEach(con => con.classList.remove("on"));
				
				this.classList.add("on");
				document.querySelector("."+this.getAttribute("href")+"-content").classList.add("on");
				getMyLike(this.getAttribute("href"));
			})
		})
	}
	
	getMyLike("event");
})

function getMyLike(type){
	fetch(`/member/getMyLike/${type}`)
	.then(responce => responce.json())
	.then(result => {
		console.log(result);
		let str = "";
		for (let data of result) {
			str += `<li>`;
			str += 		`<a href="/event/eventView?event_idx=${data.event_idx}">`;
			str += 			`<div class="img-box">`;
			if(result.attach_list != null && result.attach_list.length > 0){

			}else{
				str += 				`<img src="${IMG_URL}NoImage_pdlhxd.jpg">`;
			}
			str += 			`</div>`;
			str += 			`<dl>`;
			str += 				`<dt>이벤트 타이틀 : ${data.event_title}</dt>`;
			str += 				`<dd>이벤트 기간 : ${dateFormate(data.event_bstartdate)} ~ ${dateFormate(data.event_bstopdate)}</dd>	`;
			str += 				`<dd>내용 : ${data.event_content}</dd>`;
			str += 			`</dl>`;
			str += 			`<div class="like-box">`;
			str += 				`<input type="checkbox" id="likeChk${data.event_idx}" checked>`;
			str += 				`<label for="likeChk${data.event_idx}" class="material-symbols-outlined">`;
			str += 					`favorite`;
			str += 				`</label>`;
			str += 			`</div>`;
			str += 		`</a>`;
			str += `</li>`;
		}
		document.querySelector(".sub-tab-content.on ul").innerHTML = str;
	})
	.catch(err => console.log(err))
}

