const CSS_PATH = '/resources/css/menu.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

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
    function add(formData, callback){
        fetch('/store/new',{
            method: 'post',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                callback(data);
            })
            .catch(err => console.log(err));
    }
    //메뉴 수정 함수
    function update(menu_idx, formData, callback){
    	fetch(`/store/${menu_idx}`,{
            method: 'put',
            body: formData
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
			if(!json.attach || !json.attach.filename){
				msg += `	<img src="${IMG_URL}NoImage_pdlhxd.jpg" alt="사진이 없습니다!" class="menu-image"/>`;
			}else{
				msg += `	<img src="${IMG_URL}${json.menu_image}_${json.attach.filename}" alt="${json.attach.filename}" class="menu-image"/>`;				
			}
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
		inputModifyImage.value = '';
		inputModifyName.value = li.querySelector(".menu-name").textContent;
		inputModifyPrice.value = li.querySelector(".menu-price").textContent.substring(1);
	});
	// 모달 창 열기
	openModifyModal();
}

// 메뉴 추가 함수
function addMenu(){
	if(!inputAddName.value || !inputAddPrice.value){
		alert("모든 내용을 입력하세요");
		return;
	}
	
	// FormData 생성
	const formData = new FormData();
    formData.append("store_idx", store_idx);
    formData.append("menu_name", inputAddName.value);
    formData.append("menu_price", inputAddPrice.value);
    // 이미지 파일
    formData.append("file", inputAddImage.files[0]);
	
    document.querySelector("#savingUI").classList.add("save");
	ms.add(
		formData,
		function(result){
			console.log("result: " + result);
			document.querySelector("#savingUI").classList.remove("save");
			closeAddModal();
			showMenuList();
		}
	);
}

// 메뉴 수정 함수
function updateMenu(){
	//FormData 생성
	const formData = new FormData();
    formData.append("store_idx", store_idx);
    formData.append("menu_name", inputModifyName.value);
    formData.append("menu_price", inputModifyPrice.value);
    // 이미지 파일
    formData.append("file", inputModifyImage.files[0]);
    
    document.querySelector("#savingUI").classList.add("save");
	const vo = {
		menu_image: inputModifyImage.value,
		menu_name: inputModifyName.value,
		menu_price: inputModifyPrice.value
	};
	
	ms.update(menu_idx, formData,
	function(){
		document.querySelector("#savingUI").classList.remove("save");
		closeModifyModal();
		showMenuList();
	});
}

//메뉴 삭제 함수
function removeMenu(){
	document.querySelector("#savingUI").classList.add("save");
	ms.remove(menu_idx, function(){
		document.querySelector("#savingUI").classList.remove("save");
		closeModifyModal();
		showMenuList();
	});
}

//메뉴 추가 시 미리보기
inputAddImage.addEventListener("change", function (e) {
    const file = e.target.files[0];
    let preview = document.querySelector("#add-preview");
    
    // preview 영역이 없다면 동적으로 생성
    if (!preview) {
        preview = document.createElement("div");
        preview.id = "add-preview";
        preview.style.marginTop = "10px";
        inputAddImage.parentNode.appendChild(preview);
    }

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="미리보기" style="max-width:100px; height:auto; border:1px solid #ccc;">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = "";
    }
});

// 메뉴 수정 시 미리보기
inputModifyImage.addEventListener("change", function (e) {
    const file = e.target.files[0];
    let preview = document.querySelector("#modify-preview");

    // preview 영역이 없다면 동적으로 생성
    if (!preview) {
        preview = document.createElement("div");
        preview.id = "modify-preview";
        preview.style.marginTop = "10px";
        inputModifyImage.parentNode.appendChild(preview);
    }

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="미리보기" style="max-width:100px; height:auto; border:1px solid #ccc;">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = "";
    }
});