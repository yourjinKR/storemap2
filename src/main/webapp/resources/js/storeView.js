const f = document.forms[0];

const CSS_PATH = '/resources/css/storeView.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		let bno = f.bno.value;
		
		if(type === 'closeGetModalBtn'){
			// 점포상세보기 취소 버튼
			closeGetModal();
		}else if(type === 'reviewBtn'){
			// 댓글 등록 버튼
			registerModalPage();
		}else if(type === 'closeReviewModalBtn'){
			// 리뷰 모달 취소 버튼
			closeReviewModal();
		}else if(type === 'addReviewBtn'){
			// 진짜 리뷰 등록 실행 버튼
			registerReview();
		}else if(type === 'modifyReviewBtn'){
			// 리뷰 수정 버튼
			updateReview();
		}else if(type === 'removeReviewBtn'){
			// 리뷰 삭제 버튼
			if(confirm("정말 삭제하시겠습니까?")){
				removeReview();
			}
		}
	});
});

//------------리뷰 관련 스크립트---------------
const rs = replyService;

// 시간 정렬 코드
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "." + String(myDate.getMonth()+1).padStart(2,'0') + "." + String(myDate.getDate()).padStart(2,'0');
	return date;
}
// 댓글 목록 가져오기
showList();
function showList(){
	const store_idx = f.store_idx.value;
	const reviewUL = document.querySelector(".review");
	let msg = '';

	rs.getList(bno, jsonArray => {
		jsonArray.forEach(json => {	
			msg += `<li data-review_idx="${json.review_idx}" onclick="modifyReviewModalPage(this)" name="review_idx">`;
			msg += `	<img src="/resources/img/profile.jpg" alt="리뷰어">`;
			msg += `	<div class="review-content">`;
			msg += `		<div class="stars">별점수정필요</div>`;
			msg += `		<div class="review-meta">`;
			msg += `			<strong>${json.review_writer}</strong> · <small class="">${dateFormate(json.review_regdate)}</small>`;
			msg += `		</div>`;
			msg += `		<div>${json.review_content}</div>`;
			msg += `	</div>`;
			msg += `</li>`;
		});
		reviewUL.innerHTML = msg;
	});
}

//----------모달 관련 스크립트---------------
