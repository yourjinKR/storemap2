const CSS_PATH = '/resources/css/storeModal.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

// const f = document.forms[0];
const storeService = (function(){
	//점포 조회 함수 
    function get(store_idx,callback){
    fetch(`/modal/${store_idx}.json`)
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(err => console.log(err));
    }
    
	return {
        get : get
    };
})();
const ss = storeService;

const modal = document.querySelector("#modal");
const image = document.querySelector(".store-image");
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
	const idx = li.getAttribute('data-store_idx');
	const img = li.querySelector("img").src;
	const address = li.querySelector("input[name='store_address']").value;
	const activity_time = li.querySelector("input[name='store_activity_time']").value;
	const num = li.querySelector("input[name='store_num']").value;
	image.src = img;
	
	ss.get(idx, function(data){
		const modalInfo = document.querySelector(".store-info");
		modalInfo.innerHTML = `
			<h3>가게정보</h3>
            <div class="info-text">주소: ${address}</div>
            <div class="info-text">영업일: ${activity_time}</div>
            <div class="info-text">전화: ${num}</div>
		`;
		// 모달 창 열기
		openModal();
	});
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