// const f = document.forms[0];

// const CSS_PATH = '/resources/css/menu.css';
// let linkEle = document.createElement('link');
// linkEle.rel = 'stylesheet';
// linkEle.href = CSS_PATH;
// document.head.appendChild(linkEle);

const menuService = (function(){
	//메뉴 목록 함수
    function getList(store_idx, callback){
    	fetch(`/store/list/${store_idx}.json`)
            .then(response => response.json())
            .then(data => {
                callback(data);
            })
            .catch(err => console.log(err));
    }
    //메뉴 조회 함수 
    function get(menu_idx,callback){
    	fetch(`/store/${menu_idx}.json`)
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(err => console.log(err));
    }
    //메뉴 추가 함수
    function add(vo, callback){
        fetch('/store/new',{
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
    //메뉴 수정 함수
    function update(menu_idx, vo, callback){
    	fetch(`/store/${menu_idx}`,{
            method: 'put',
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
	//메뉴 삭제 함수 
    function remove(menu_idx,callback){
    	fetch(`/store/${menu_idx}`,{
    		method: 'delete'
    	})
        .then(response => response.text())
        .then(data => {
            callback(data);
        })
        .catch(err => console.log(err));
    }
    
	return {
		getList : getList,
		get : get,
		add: add,
		update : update,
        remove : remove
    };
})();
const ms = menuService;

const addModal = document.querySelector("#add-modal");
const modifyModal = document.querySelector("#modify-modal");
const image = document.querySelector(".store-image");
let store_idx = new URLSearchParams(location.search).get('store_idx');

function openAddModal(){
	addModal.style.display = "block";
}
function closeAddModal(){
	addModal.style.display = "none";
}
function openModifyModal(){
	modifyModal.style.display = "block";
}
function closeModifyModal(){
	modifyModal.style.display = "none";
}
//메뉴 추가 닫기 이벤트
if(addModal != null){
	addModal.addEventListener('click', function(e){
		if ( e.target == document.querySelector('#add-modal') ) {
			console.log(addModal);
			closeAddModal();
		}
	})
}
//메뉴 수정 닫기 이벤트
if(modifyModal != null){
	modifyModal.addEventListener('click', function(e){
		if ( e.target == document.querySelector('#modify-modal') ) {
			console.log(modifyModal);
			closeModifyModal();
		}
	})
}

document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'addMenuBtn'){
			addMenu();
		}else if(type === 'addMenuPageBtn'){
			addMenuPage();
		}else if(type === 'storeBtn'){
			location.href=`/store/storeModify?store_idx=${store_idx}`;
		}else if(type === 'modifyMenuBtn'){
			updateMenu();
		}else if(type === 'removeMenuBtn'){
			removeMenu();
		}
	})
});

//메뉴 목록 가져오기
showMenuList();
function showMenuList(){
	const menuUL = document.querySelector(".menu-page");
	let msg = '';

	ms.getList(store_idx, jsonArray => {
		jsonArray.forEach(json => {	
			msg += `<li data-menu_idx="${json.menu_idx}" onclick="menuModifyPage(this)" name="mid">`;
			msg += `	<img src="/resources/img/${json.menu_image}" alt="${json.menu_image}" class="menu-image">`;
			msg += `	<div class="menu-description">`;
			msg += `		<div class="menu-name">${json.menu_name}</div>`;
			msg += `		<div class="menu-price">₩${json.menu_price}</div>`;
			msg += `	</div>`;
			msg += `	<br>`;
			msg += `</li>`;
		});
		menuUL.innerHTML = msg;
	});
}

const inputAddImage = document.querySelector("input[name='menu_image']");
const inputAddName = document.querySelector("input[name='menu_name']");
const inputAddPrice = document.querySelector("input[name='menu_price']");
const inputModifyImage = document.querySelector("input[name='modify_image']");
const inputModifyName = document.querySelector("input[name='modify_name']");
const inputModifyPrice = document.querySelector("input[name='modify_price']");

//메뉴 추가 페이지 버튼 클릭 이벤트
function addMenuPage(){
	//input 내용 초기화
	inputAddImage.value = '';
	inputAddName.value = '';
	inputAddPrice.value = '';

	openAddModal();
}

let menu_idx;
// 메뉴 수정 페이지 버튼 클릭 이벤트
function menuModifyPage(li){
	menu_idx = li.getAttribute('data-menu_idx');
	ms.get(menu_idx, function(){
		inputModifyImage.value = "menu1.jpg";// 파일업로드 만들면 고칠것 li.querySelector(".menu-image").alt;
		inputModifyName.value = li.querySelector(".menu-name").textContent;
		inputModifyPrice.value = li.querySelector(".menu-price").textContent.substring(1);
	});
	// 모달 창 열기
	openModifyModal();
}

// 메뉴 추가 함수
function addMenu(){
	if(!inputAddImage.value || !inputAddName.value || !inputAddPrice.value){
		alert("모든 내용을 입력하세요");
		return;
	}
	ms.add(
		{
			store_idx: store_idx,
			menu_image: inputAddImage.value,
			menu_name: inputAddName.value,
			menu_price: inputAddPrice.value
		},
		function(result){
			console.log("result: " + result);
			closeAddModal();
			showMenuList();
		}
	);
}

// 메뉴 수정 함수
function updateMenu(){
	ms.update(menu_idx,{
		menu_image : inputModifyImage.value,
		menu_name : inputModifyName.value,
		menu_price : inputModifyPrice.value
	},
	function(){
		closeModifyModal();
		showMenuList();
	});
}

//메뉴 삭제 함수
function removeMenu(){
	ms.remove(menu_idx, function(){
		closeModifyModal();
		showMenuList();
	});
}

