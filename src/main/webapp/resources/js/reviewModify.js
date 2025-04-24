const f = document.forms[0];

const CSS_PATH = '/resources/css/reviewModify.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'modifyBtn'){
			modify();
		}else if(type === 'removeBtn'){
			remove();
		}else if(type === 'storeBtn'){
			store();
		}
	})
});

function modify(){
	if(!f.review_title.value){
		alert("제목을 입력하세요.");
		return;
	}
	if(!f.review_content.value){
		alert("내용을 입력하세요.");
		return;
	}
	f.action = '/store/reviewModify';
	f.submit();
};

let review_idx = new URLSearchParams(location.search).get('review_idx');
function remove(){
	if(confirm("정말 삭제하시겠습니까?")){
		f.action = `/store/reviewRemove?review_idx=${review_idx}`;
	    f.submit();
	    alert("삭제 되었습니다");
	}else{
	}
}

function store(){
	location.href=`/modal/storeView?store_idx=${f.store_idx.value}`;
}