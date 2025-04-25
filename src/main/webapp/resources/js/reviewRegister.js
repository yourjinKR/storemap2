const f = document.forms[0];

const CSS_PATH = '/resources/css/reviewRegister.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'registerBtn'){
			register();
		}else if(type === 'resetBtn'){
			f.reset();
		}else if(type === 'storeBtn'){
			location.href=`/modal/storeView?store_idx=${f.store_idx.value}`;
		}
	})
});

function register(){
	if(!f.review_title.value){
		alert("제목을 입력하세요.");
		return;
	}
	if(!f.review_content.value){
		alert("내용을 입력하세요.");
		return;
	}
	f.action = '/store/reviewRegister';
	f.submit();
};