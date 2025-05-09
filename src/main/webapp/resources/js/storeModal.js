const CSS_PATH = '/resources/css/storeModal.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

const modal = document.querySelector("#modal");
const image = document.querySelector(".store-info-image");
let store_id;

function openModal(){
	modal.style.display = "block";
}
function closeModal(){
	modal.style.display = "none";
}

function initializeEvents() {
	let currentStoreIdx, currentReviewIdx, currentMemberIdx;  // 신고용 store_idx, review_idx, member_idx 전역 변수 저장
	const declarationService = (function(){
		//점포신고 추가 함수
	    function storeDeclaration(vo, callback){
	        fetch('/modal/storeDeclaration',{
	            method: 'post',
	            body: JSON.stringify(vo),
	            headers: {
	                'Content-type' : 'application/json; charset=utf-8'
	            }
	        })
	            .then(response => response.text())
	            .then(data => {
	                callback(data);
	            })
	            .catch(err => console.log(err));
	    }
	    //리뷰신고 추가 함수
	    function reviewDeclaration(vo, callback){
	        fetch('/modal/reviewDeclaration',{
	            method: 'post',
	            body: JSON.stringify(vo),
	            headers: {
	                'Content-type' : 'application/json; charset=utf-8'
	            }
	        })
	            .then(response => response.text())
	            .then(data => {
	                callback(data);
	            })
	            .catch(err => console.log(err));
	    }
	    return {
	    	storeDeclaration: storeDeclaration,
	    	reviewDeclaration: reviewDeclaration
	    };
	})();
	const ds = declarationService;
	
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            let type = btn.getAttribute("id");
            
            if(type === 'reviewBtn'){
                location.href=`/store/review?store_idx=${store_id}`;
            }else if(type == 'storeReportBtn'){
            	addStoreReport();
            }else if(type == 'reviewReportBtn'){
            	addReviewReport();
            }else if(type === 'removeReviewBtn'){
                // 자기 리뷰 삭제 버튼 만들까말까
                if(confirm("정말 삭제하시겠습니까?")){
                    removeReview();
                }
            }
        });
    });
    
    // 점포 신고 추가 함수
    function addStoreReport(){
    	const inputAddCategory = document.querySelector("input[name='declaration_category']:checked");
    	const inputAddContent = document.querySelector("textarea[name='declaration_content']");
    	
    	if(!inputAddContent.value){
    		alert("신고 내용을 입력하세요");
    		return;
    	}
    	
    	ds.storeDeclaration(
    		{
    			store_idx: currentStoreIdx,
    			member_idx: currentMemberIdx,
    			declaration_category: inputAddCategory.value,
    			declaration_content: inputAddContent.value
    		},
    		function(result){
    			console.log("result: " + result);
    			document.querySelector("#store-report-selection").style.display = "none";
    			alert("점포신고를 성공 했습니다.");
    		}
    	);
    }
    
    // 리뷰 신고 추가 함수
    function addReviewReport(){
    	 const inputAddCategory = document.querySelector("#review-report-selection input[name='declaration_category']:checked");
    	 const inputAddContent = document.querySelector("#review-report-selection textarea[name='declaration_content']");
    	 
    	 if(!inputAddContent.value){
    	     alert("신고 내용을 입력하세요");
    	     return;
    	 }
    	 
    	 ds.reviewDeclaration(
    	     {
    	         review_idx: currentReviewIdx,
    	         member_idx: currentMemberIdx,
    	         declaration_category: inputAddCategory.value,
    	         declaration_content: inputAddContent.value
    	     },
    	     function(result){
    	         console.log("result: " + result);
    	         document.querySelector("#review-report-selection").style.display = "none";
    	         alert("리뷰신고를 성공 했습니다.");
    	     }
    	 );
    }
    
    // 점포 즐겨찾는 체크박스 설정
    const storeLikeCheckboxes = document.querySelectorAll('input[name="storeLike"]');
    storeLikeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const store_idx = this.id.replace('storeLike-icon', '');
            const member_idx = document.querySelector('input[name="member_idx"]').value;
            
            if (!member_idx || member_idx === '0') {
                alert('로그인이 필요합니다.');
                this.checked = false;
                return;
            }
            
            toggleStoreLike(store_idx, member_idx, this);
        });
    });
    
    // 점포 신고 버튼 눌렀을때
    const storeReportBtns = document.querySelectorAll('input[name="storeReport"]');
    storeReportBtns.forEach(button => {
    	button.addEventListener("click", () => {
    		const storeReport = document.querySelector("#store-report-selection")
    		currentStoreIdx = button.id.replace('storeReport-icon', '');
    		currentMemberIdx = document.querySelector('input[name="member_idx"]').value;
    		
    		if (!currentMemberIdx || currentMemberIdx === '0') {
                alert('로그인이 필요합니다.');
                return;
            }
    		
    		storeReport.style.display = "block";
    	});
    });
    //점포 신고창 닫기 이벤트
    let storeReports = document.querySelector('#store-report-selection');
    if(storeReports != null){
    	storeReports.addEventListener('click', function(e){
    		if ( e.target == document.querySelector('#store-report-selection') ) {
    			storeReports.style.display = "none";	
    		}
    	})
    }
    
    // 리뷰 좋아요 체크박스 설정
    const reviewLikeCheckboxes = document.querySelectorAll('input[name="reviewLike"]');
    reviewLikeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const review_idx = this.id.replace('reviewLike-icon', '');
            const member_idx = document.querySelector('input[name="member_idx"]').value;
            
            if (!member_idx || member_idx === '0') {
                alert('로그인이 필요합니다.');
                this.checked = false;
                return;
            }
            
            toggleReviewLike(review_idx, member_idx, this);
        });
    });
    
    // 리뷰 신고 버튼 눌렀을때
    const reviewReportBtns = document.querySelectorAll('input[name="reviewReport"]');
    reviewReportBtns.forEach(button => {
    	button.addEventListener("click", () => {
    		const reviewReport = document.querySelector("#review-report-selection")
    		currentReviewIdx = button.id.replace('reviewReport-icon', '');
    		currentMemberIdx = document.querySelector('input[name="member_idx"]').value;
    		
    		if (!currentMemberIdx || currentMemberIdx === '0') {
                alert('로그인이 필요합니다.');
                return;
            }
    		
    		reviewReport.style.display = "block";
    	});
    });
    //리뷰 신고창 닫기 이벤트
    let reviewReports = document.querySelector('#review-report-selection');
    if(reviewReports != null){
    	reviewReports.addEventListener('click', function(e){
    		if ( e.target == document.querySelector('#review-report-selection') ) {
    			reviewReports.style.display = "none";	
    		}
    	})
    }
    
    // 초기 즐겨찾기 상태 확인
    checkInitialStoreLike();
    checkInitialReviewLike();
}

// 사용자가 이미 해당 매장을 좋아하는지 확인
function checkInitialStoreLike() {
    const storeLikeCheckboxes = document.querySelectorAll('input[name="storeLike"]');
    if (storeLikeCheckboxes.length === 0) return;
    
    const member_idx = document.querySelector('input[name="member_idx"]').value;
    if (!member_idx || member_idx === '0') return;
    
    storeLikeCheckboxes.forEach(checkbox => {
        const store_idx = checkbox.id.replace('storeLike-icon', '');
        
        // 좋아요 체크
        fetch(`/modal/storeLike/check?store_idx=${store_idx}&member_idx=${member_idx}`)
            .then(response => response.json())
            .then(data => {
                checkbox.checked = data.storeLiked;
                // 좋아요 카운트 업데이트 (검증 목적)
                const storeLikeCount = document.querySelector(`.storeLike-count-${store_idx}`);
                if (storeLikeCount && data.storeLikeCount) {
                    storeLikeCount.textContent = data.storeLikeCount;
                }
            })
            .catch(error => console.error('Error checking favorite status:', error));
    });
}

//사용자가 이미 해당 리뷰를 좋아하는지 확인
function checkInitialReviewLike() {
    const reviewLikeCheckboxes = document.querySelectorAll('input[name="reviewLike"]');
    if (reviewLikeCheckboxes.length === 0) return;
    
    const member_idx = document.querySelector('input[name="member_idx"]').value;
    if (!member_idx || member_idx === '0') return;
    
    reviewLikeCheckboxes.forEach(checkbox => {
        const review_idx = checkbox.id.replace('reviewLike-icon', '');
        
        // 좋아요 체크
        fetch(`/modal/reviewLike/check?review_idx=${review_idx}&member_idx=${member_idx}`)
            .then(response => response.json())
            .then(data => {
                checkbox.checked = data.reviewLikedMap;
                // 좋아요 카운트 업데이트 (검증 목적)
                const reviewLikeCount = document.querySelector(`.reviewLike-count-${review_idx}`);
                if (reviewLikeCount && data.reviewLikeCount) {
                    reviewLikeCount.textContent = data.reviewLikeCount;
                }
            })
            .catch(error => console.error('Error checking favorite status:', error));
    });
}

// 점포 좋아요 상태 전환
function toggleStoreLike(store_idx, member_idx, checkbox) {
	const storeLikeCount = document.querySelector(`.storeLike-count-${store_idx}`);
	let currentCount = parseInt(storeLikeCount.textContent || '0');
    let newCount = checkbox.checked ? currentCount + 1 : Math.max(currentCount - 1, 0);
    
    // 애니메이션을 위해 먼저 클래스 제거
    storeLikeCount.classList.remove('like-update');
    // 강제로 리플로우 발생시켜 애니메이션 초기화
    void storeLikeCount.offsetWidth;
    // 즉시 UI 업데이트
    storeLikeCount.textContent = newCount;
    storeLikeCount.classList.add('like-update');
	
    fetch(`/modal/storeLike/toggle?store_idx=${store_idx}&member_idx=${member_idx}`)
        .then(response => response.json())
        .then(data => {
            // 서버 상태와 일치하도록 체크박스 업데이트
            checkbox.checked = data.storeLiked;
            // 좋아요 수 카운트 업데이트
            if (storeLikeCount && data.storeLikeCount !== undefined) {
                storeLikeCount.textContent = data.storeLikeCount;
            }
            // 좋아요 상태 애니메이션 효과
            setTimeout(() => {
                storeLikeCount.classList.remove('like-update');
            }, 500);
        })
        .catch(error => {
            console.error('Error toggling favorite:', error);
            // 오류 발생 시 체크박스 상태 되돌리기(무조건 오류떠서 잠정 보류)
//            checkbox.checked = !checkbox.checked;
//            storeLikeCount.textContent = currentCount;
//            storeLikeCount.classList.remove('like-update');
//            alert('좋아요 처리 중 오류가 발생했습니다.');
        });
}

//리뷰 좋아요 상태 전환
function toggleReviewLike(review_idx, member_idx, checkbox) {
	const reviewLikeCount = document.querySelector(`.reviewLike-count-${review_idx}`);
    let currentCount = parseInt(reviewLikeCount.textContent || '0');
    let newCount = checkbox.checked ? currentCount + 1 : Math.max(currentCount - 1, 0);
    
    // 애니메이션을 위해 먼저 클래스 제거
    reviewLikeCount.classList.remove('like-update');
    // 강제로 리플로우 발생시켜 애니메이션 초기화
    void reviewLikeCount.offsetWidth;
    // 즉시 UI 업데이트
    reviewLikeCount.textContent = newCount;
    reviewLikeCount.classList.add('like-update');
    
    fetch(`/modal/reviewLike/toggle?review_idx=${review_idx}&member_idx=${member_idx}`)
        .then(response => response.json())
        .then(data => {
            // 서버 상태와 일치하도록 체크박스 업데이트
            checkbox.checked = data.reviewLikedMap;
            // 좋아요 수 카운트 업데이트
            if (reviewLikeCount && data.reviewLikeCount !== undefined) {
                reviewLikeCount.textContent = data.reviewLikeCount;
            }
            // 좋아요 상태 애니메이션 효과
            setTimeout(() => {
                reviewLikeCount.classList.remove('like-update');
            }, 500);
        })
        .catch(error => {
            console.error('Error toggling review favorite:', error);
            // 오류 발생 시 체크박스 상태 되돌리기
//            checkbox.checked = !checkbox.checked;
//            reviewLikeCount.textContent = currentCount;
//            reviewLikeCount.classList.remove('like-update');
//            alert('좋아요 처리 중 오류가 발생했습니다.');
        });
}

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
      store_id = document.querySelector('input[name="store_idx"]').value;
      initializeEvents();
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

//페이지가 로드될 때 이벤트를 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeEvents();
});