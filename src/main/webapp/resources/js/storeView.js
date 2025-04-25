const CSS_PATH = '/resources/css/storeView.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

let store_idx = new URLSearchParams(location.search).get('store_idx');
document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'reviewBtn'){
			// 리뷰 쓰게 페이지 이동 버튼
			location.href=`/store/reviewRegister?store_idx=${store_idx}`;
		}else if(type === 'removeReviewBtn'){
			// 자기 리뷰 삭제 버튼 만들까말까
			if(confirm("정말 삭제하시겠습니까?")){
				removeReview();
			}
		}
	});
});
// 나중에 삭제 만들지 결정
function removeReview(){
	if(confirm("정말 삭제하시겠습니까?")){
		f.action = `/store/reviewRemove?review_idx=${review_idx}`;
	    f.submit();
	    alert("삭제 되었습니다");
	}else{
	}
}