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

function initializeEvents() {
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
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
    
    // 즐겨찾는 체크박스 설정
    const likeCheckboxes = document.querySelectorAll('input[name="like"]');
    likeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const storeId = this.id.replace('like-icon', '');
            const member_idx = document.querySelector('input[name="member_idx"]').value;
            
            if (!member_idx || member_idx === '0') {
                alert('로그인이 필요합니다.');
                this.checked = false;
                return;
            }
            
            toggleFavorite(storeId, member_idx, this);
        });
    });
    
    // 초기 즐겨찾기 상태 확인
    checkInitialFavoriteStatus();
}

// 사용자가 이미 해당 매장을 좋아하는지 확인
function checkInitialFavoriteStatus() {
    const likeCheckboxes = document.querySelectorAll('input[name="like"]');
    if (likeCheckboxes.length === 0) return;
    
    const member_idx = document.querySelector('input[name="member_idx"]').value;
    if (!member_idx || member_idx === '0') return;
    
    likeCheckboxes.forEach(checkbox => {
        const storeId = checkbox.id.replace('like-icon', '');
        
        // 좋아요 체크
        fetch(`/modal/favorite/check?store_idx=${storeId}&member_idx=${member_idx}`)
            .then(response => response.json())
            .then(data => {
                checkbox.checked = data.liked;
            })
            .catch(error => console.error('Error checking favorite status:', error));
    });
}

// 즐겨찾기 상태 전환
function toggleFavorite(storeId, member_idx, checkbox) {
    fetch(`/modal/favorite/toggle?store_idx=${storeId}&member_idx=${member_idx}`)
        .then(response => response.json())
        .then(data => {
            // 서버 상태와 일치하도록 체크박스 업데이트
            checkbox.checked = data.liked;
//            const likeCount = document.querySelector(`.like-count-${storeId}`);
//            if (likeCount) likeCount.textContent = data.likeCount;
        })
        .catch(error => {
            console.error('Error toggling favorite:', error);
            // 오류 발생 시 체크박스 상태 되돌리기
            checkbox.checked = !checkbox.checked;
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
      store_idx = new URLSearchParams(location.search).get('store_idx');
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