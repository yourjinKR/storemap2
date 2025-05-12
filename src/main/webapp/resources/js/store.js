const f = document.forms[0];

const CSS_PATH = '/resources/css/store.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'registerBtn'){
			register();
		}else if(type === 'startBtn'){
			start();
		}else if(type === 'stopBtn'){
			stop();
		}else if(type === 'modifyBtn'){
			modify();
		}else if(type === 'menuBtn'){
			menu();
		}else if(type === 'resetBtn'){
			f.reset();
		}else if(type === 'indexBtn'){
			location.href=`/`;
		}else if(type === 'removeBtn'){
			remove();
		}
	})
});

function start(){
	f.action = '/store/storeStart';
	f.submit();
}
function stop(){
	f.action = '/store/storeStop';
	f.submit();
}

function register(){
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
	
	f.action = '/store/storeRegister';
	f.submit();
};

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
	
	f.action = '/store/storeModify';
	f.submit();
};

let store_idx = new URLSearchParams(location.search).get('store_idx');
function menu(){
	location.href=`/store/menu?store_idx=${store_idx}`;
}

// 점주에서 user로 격하도 시켜야됨
function remove(){
	if(confirm("정말 취소하시겠습니까?")){
		f.action = `/store/storeRemove?store_idx=${store_idx}`;
	    f.submit();
	    alert("삭제 되었습니다");
	}else{
	}
}