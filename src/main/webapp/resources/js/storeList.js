
const CSS_PATH = '/resources/css/storeList.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

const f = document.forms[0];
const storeService = (function(){
	//댓글 조회 함수 
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

function openModal(){
	modal.style.display = "block";
}
function closeModal(){
	modal.style.display = "none";
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