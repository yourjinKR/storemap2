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
				
				// 좋아요 목록 호출
				getMyLike(this.getAttribute("href"));
			})
		})
	}
	
	let tabParam = new URLSearchParams(location.search).get("sub");
	tabParam = tabParam != null ? tabParam : "event"; 
	getMyReview();
	getMyLike(tabParam);
})

// 좋아요 목록
function getMyLike(type){
	fetch(`/member/getMyLike/${type}`)
	.then(response => response.json())
	.then(result => {
		let str = "";
		if(result != null && result.length > 0){
			if(type == 'event'){
				for (let data of result) {
					str += `<li>`;
					str += `<div class="d-f">`;
					str += 		`<a href="/event/eventView?event_idx=${data.event_idx}">`;
					str += 			`<div class="img-box">`;
					if(data.attachFile != null && data.attachFile.length > 0){
						if(data.attachFile[0].filename.indexOf("https://kfescdn.visitkorea.or.kr/kfes/upload/contents/db/") == 0){
							str += 			`<img src="${data.attachFile[0].filename}">`;
						}else{
							str += 			`<img src="${IMG_URL}${data.attachFile[0].uuid}_${data.attachFile[0].filename}">`;
						}
					}else{
						str += 				`<img src="${IMG_URL}NoImage_pdlhxd.jpg">`;
					}
					str += 			`</div>`;
					str += 			`<dl>`;
					str += 				`<dt>이벤트 타이틀 : ${data.event_title}</dt>`;
					str += 				`<dd>이벤트 기간 : ${dateFormate(data.event_bstartdate)} ~ ${dateFormate(data.event_bstopdate)}</dd>	`;
					str += 				`<dd>내용 : ${data.event_content}</dd>`;
					str += 			`</dl>`;
					str += 		`</a>`;
					str += 		`<div class="like-box">`;
					str += 			`<input type="checkbox" data-idx="${data.event_idx}" id="likeChk${data.event_idx}" checked>`;
					str += 			`<label for="likeChk${data.event_idx}" class="material-symbols-outlined">`;
					str += 				`favorite`;
					str += 			`</label>`;
					str += 		`</div>`;
					str += 	`</div>`;
					str += `</li>`;
				}
			}else if(type == "store"){
				for (let data of result) {
					str += `<li>`;
					str += `<div class="d-f">`;
					str += 		`<a href="${data.store_idx}">`;
					str += 			`<div class="img-box">`;
					if(data.attach != null){
						str += 			`<img src="${IMG_URL}${data.attach.uuid}_${data.attach.filename}">`;
					}else{
						str += 			`<img src="${IMG_URL}NoImage_pdlhxd.jpg">`;
					}
					str += 			`</div>`;
					str += 			`<dl>`;
					str += 				`<dt>이벤트 타이틀 : ${data.store_name}</dt>`;
					str += 				`<dd>전화번호 : ${data.store_num}</dd>	`;
					str += 				`<dd>설명 : ${data.store_content}</dd>`;
					str += 			`</dl>`;
					str += 		`</a>`;
					str += 		`<div class="like-box">`;
					str += 			`<input type="checkbox" data-idx="${data.store_idx}" id="likeChk${data.store_idx}" checked>`;
					str += 			`<label for="likeChk${data.store_idx}" class="material-symbols-outlined">`;
					str += 				`favorite`;
					str += 			`</label>`;
					str += 		`</div>`;
					str += `</div>`;
					str += `</li>`;
				}
			}else{
				for (let data of result) {
					str += `<li>`;
					str += 		`<div>`;
					str += 			`<div class="img-box">`;
					if(data.attach != null){
						str += 				`<img src="${IMG_URL}${data.attach.uuid}_${data.attach.filename}">`;
					}else{
						str += 				`<img src="${IMG_URL}NoImage_pdlhxd.jpg">`;
					}
					str += 			`</div>`;
					str += 			`<dl>`;
					str += 				`<dt>리뷰 타이틀 : ${data.review_title}</dt>`;
					str += 				`<dd>작성자 : ${data.review_writer}</dd>`;
					str += 				`<dd>리뷰 내용 : ${data.review_content}</dd>`;
					str += 				`<dd>리뷰날짜 : ${dateFormate(data.review_regdate)}</dd>	`;
					str += 			`</dl>`;
					str += 			`<div class="like-box">`;
					str += 				`<input type="checkbox" data-idx="${data.review_idx}" id="likeChk${data.review_idx}" checked>`;
					str += 				`<label for="likeChk${data.review_idx}" class="material-symbols-outlined">`;
					str += 					`favorite`;
					str += 				`</label>`;
					str += 			`</div>`;
					str += 		`</div>`;
					str += `</li>`;
				}
			}
		}else{
			str += `<li class="empty-data">`;
			str += `<p>좋아요한 ${type == "event" ? '이벤트' : type == "store" ? '점포' : '리뷰'}가 없습니다. </p>`;
			str += `</li>`;
		}
		document.querySelector(".sub-tab-content.on ul").innerHTML = str;
		let likeIcon = document.querySelectorAll(".sub-tab-content.on ul li input[type='checkbox']");
		for (let icon of likeIcon) {
			icon.addEventListener("click",function(e){
				if(confirm("취소하시겠습니까?")){
					likeChkUpdate(type, this.dataset['idx']);
				}else{
					e.preventDefault();
				}
			})
		}
		let storeHref = document.querySelectorAll(".store-content > ul > li > .d-f > a");
		if(storeHref != null && storeHref.length > 0){
			storeHref.forEach(target => {
				target.addEventListener("click",function(e){
					e.preventDefault();
					sessionStorage.setItem('store_idx', this.getAttribute("href"));
					location.href = "/store/map";
				})
			})
		}
	})
	.catch(err => console.log(err))
	
}


function getMyReview(){
	fetch(`/member/getMyReview`)
	.then(response => response.json())
	.then(result => {
		let str = "";
		for (let data of result.reviewData) {
			str += `<li data.review_hidden>`;
			str += 		`<div class="img-box">`;
			if(data.attach != null){
				str += 				`<img src="${IMG_URL}${data.attach.uuid}_${data.attach.filename}">`;
			}else{
				str += 				`<img src="${IMG_URL}NoImage_pdlhxd.jpg">`;
			}
			str += 		`</div>`;
			str += 		`<dl>`;
			str += 			`<dt>리뷰 타이틀 : ${data.review_title}</dt>`;
			str += 			`<dd>작성자 : ${data.review_writer}</dd>`;
			str += 			`<dd>리뷰 내용 : ${data.review_content}</dd>`;
			str += 			`<dd>리뷰날짜 : ${dateFormate(data.review_regdate)}</dd>	`;
			str += 		`</dl>`;
			str += 		`<div class="like-box">`;
			str += 			`<input type="checkbox" data-idx="${data.review_idx}" id="likeChk${data.review_idx}" ${likeChk(result.myLikeData, data.review_idx, data.member_idx) ? 'checked' : ''}>`;
			str += 			`<label for="likeChk${data.review_idx}" class="material-symbols-outlined">`;
			str += 				`favorite`;
			str += 			`</label>`;
			str += 		`</div>`;
			str += `</li>`;
		}
		
		document.querySelector(".myreview").innerHTML = str;
		
		let myReviewIcon = document.querySelectorAll(".myreview input[type='checkbox']")
		if(myReviewIcon != null){
			myReviewIcon.forEach(icon => {
				icon.addEventListener("change",function(){
					likeChkUpdate('', icon.dataset['idx']);
				})
			})
		}
	})
	.catch(err => console.log(err))
}

// 좋아요 업데이트
function likeChkUpdate(type, list_idx){
	let main_tab = document.querySelector(".main-tab > li > a.on");
	let sub_tab = document.querySelector(".sub-tab > li > a.on");

	let postUrl = null;
	if(type == "event"){
		postUrl = `/event/eventLike?event_idx=${list_idx}`;
	}else if(type == "store"){
		postUrl = `/modal/storeLike/toggle?store_idx=${list_idx}`;
	}else{
		postUrl = `/modal/reviewLike/toggle?review_idx=${list_idx}`;
	}
	fetch(`${postUrl}`)
	.then(response => response.json())
	.then(result => {
		if(!result.reviewLikedMap || !result.storeLiked){
			if(main_tab != "reviewList"){
				location.href=`/member/mypage?type=${main_tab.getAttribute("href")}&sub=${sub_tab.getAttribute("href")}`;
			}else{
				location.href=`/member/mypage?type=${main_tab.getAttribute("href")}`;
			}
		}
	})
	.catch(err => console.log(err))
}

// 좋아요 체크 여부 확인
function likeChk(likeData, ridx, midx){
	let result = false;
	for (let data of likeData) {
		if(data.member_idx == midx && data.review_idx == ridx){
			result = true;
			break;
		}else{
			result = false;
		}
	}
	return result;
}
