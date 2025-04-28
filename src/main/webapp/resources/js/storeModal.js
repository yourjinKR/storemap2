const CSS_PATH = '/resources/css/storeModal.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

const modal = document.querySelector("#modal");
const image = document.querySelector(".store-info-image");
let store_idx = new URLSearchParams(location.search).get('store_idx');

function openModal(){
	modal.style.display = "block";
}
function closeModal(){
	modal.style.display = "none";
}

document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'reviewBtn'){
			location.href=`/store/review?store_idx=${store_idx}`;
		}else if(type === 'removeReviewBtn'){
			// 자기 리뷰 삭제 버튼 만들까말까
			if(confirm("정말 삭제하시겠습니까?")){
				removeReview();
			}
		}
	});
});
//나중에 삭제 만들지 결정(review_idx받아야함)
function removeReview(){
	if(confirm("정말 삭제하시겠습니까?")){
		f.action = `/store/reviewRemove?review_idx=${review_idx}`;
	    f.submit();
	    alert("삭제 되었습니다");
	}else{
	}
}

//점포 리스트 클릭 이벤트
function viewModalPage(li){
	// 값 가져와서 바인딩
	const sidx = li.getAttribute('data-store_idx');
	// storeView.jsp 불러오기
	fetch(`/modal/storeView?store_idx=${sidx}`)
    .then(response => response.text())
    .then(html => {
      document.querySelector(".modal-content").innerHTML = html;
      store_idx = new URLSearchParams(location.search).get('store_idx');
      document.querySelectorAll('button').forEach(btn => {
    		btn.addEventListener('click', ()=> {
    			let type = btn.getAttribute("id");
    			
    			if(type === 'reviewBtn'){
    				location.href=`/store/review?store_idx=${sidx}`;
    			}else if(type === 'removeReviewBtn'){
    				// 자기 리뷰 삭제 버튼 만들까말까
    				if(confirm("정말 삭제하시겠습니까?")){
    					removeReview();
    				}
    			}
    		});
    	});
      openModal();
    })
    .catch(error =>  console.err(err));
}
//점포 정보창 닫기 이벤트
let modals = document.querySelector('#modal');
if(modals != null){
	modals.addEventListener('click', function(e){
		if ( e.target == document.querySelector('#modal') ) {
			console.log(modals);
			closeModal();
		}
	})
}