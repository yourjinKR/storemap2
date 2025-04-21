const f = document.forms[0];

const CSS_PATH = '/resources/css/storeList.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

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
const storeInfo = document.querySelectorAll(".info-text");
let address = storeInfo[0].textContent;
let activity_time = storeInfo[1].textContent;
let num = storeInfo[2].textContent;
const image = document.querySelector(".store-image");

function openModal(){
	modal.style.display = "block";
}
function closeModal(){
	modal.style.display = "none";
}

let idx;
//점포 리스트 클릭 이벤트
function viewModalPage(li){
	// 값 가져와서 바인딩
	idx = li.getAttribute('data-store_idx');
	ss.get(idx, function(){
		//강제삽입해야적용됨
		//
		//
		//
		//
		image.src = li.querySelector("img").src;
		address += li.querySelector("input[name='store_address']").value;
		activity_time += li.querySelector("input[name='store_activity_time']").value;
		num += li.querySelector("input[name='store_num']").value;
	});	
	// 모달 창 열기
	openModal();
}
