const f = document.forms[0];

const CSS_PATH = '/resources/css/storeModify.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'modifyBtn'){
			modify();
		}else if(type === 'menuBtn'){
			menu();
		}else if(type === 'resetBtn'){
			f.reset();
		}else if(type === 'indexBtn'){
			location.href=`/index`;
		}
	})
});

function menu(){
	location.href='/store/menu';
}

function modify(){
	if(!f.store_name.value){
		alert("점포명을 입력하세요.");
		return;
	}
	if(!f.store_num.value){
		alert("연락처를 입력하세요.");
		return;
	}
	if(!f.store_email.value){
		alert("이메일을 입력하세요.");
		return;
	}
	if(!f.store_address.value){
		alert("주소를 선택하세요.");
		return;
	}
	if(!f.store_area.value){
		alert("활동지역을 입력하세요.");
		return;
	}
	if(!f.store_activity_time.value){
		alert("운영시간을 입력하세요.");
		return;
	}
	
	f.action - '/store/storeModify';
	f.submit();
};