const f = document.forms[0];

const CSS_PATH = '/resources/css/store.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

document.addEventListener("DOMContentLoaded", (event) => {
	let storeState = document.querySelector(".store-state");
	if(document.querySelector("#stopBtn") != null){
		if(storeState != null){
			storeState.classList.add("open");
			storeState.querySelector("span").innerHTML = "OPEN";
		}
	}
	if(document.querySelector("#startBtn") != null){
		if(storeState != null){
			storeState.classList.remove("open");
			storeState.querySelector("span").innerHTML = "CLOSE";
		}
	}
})

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
	
	// FormData 생성
    const formData = new FormData();
    formData.append("store_idx" , document.querySelector("input[name='store_idx']").value);
	formData.append("member_idx" , document.querySelector("input[name='member_idx']").value);
	formData.append("store_name" , document.querySelector("input[name='store_name']").value);
	formData.append("store_image" , document.querySelector("input[name='store_image']").value);
	formData.append("store_num" , document.querySelector("input[name='store_num']").value);
	formData.append("store_email" , document.querySelector("input[name='store_email']").value);
	formData.append("store_lat" , document.querySelector("input[name='store_lat']").value);
	formData.append("store_lng" , document.querySelector("input[name='store_lng']").value);
	formData.append("store_address" , document.querySelector("input[name='store_address']").value);
	formData.append("store_regcode" , document.querySelector("input[name='store_regcode']").value);
	formData.append("store_area" , document.querySelector("input[name='store_area']").value);
	formData.append("store_activity_time" , document.querySelector("input[name='store_activity_time']").value);
	formData.append("store_content" , document.querySelector("textarea[name='store_content']").value);
	formData.append("store_rnum" , document.querySelector("input[name='store_rnum']").value);
	//이미지 파일
    formData.append("file", document.querySelector("input[type='file']").files[0]);
    
    document.querySelector("#savingUI").classList.add("save");
    // 데이터 전송
    fetch("/store/storeStart", {
        method: "POST",
        body: formData
    })
    .then(response => {
	    if (!response.ok) {
	    	return response.text().then(text => {
                throw new Error('서버 응답 에러: ' + text);
            });
	    }
        return response.text();
    })
    .then(data => {
        alert("점포 시작!");
        location.href = "/store/storeModify?store_idx="+document.querySelector("input[name='store_idx']").value; // 성공 시 리다이렉트
    })
    .catch(error => {
        console.error("Error:", error);
        alert("점포 수정 실패: " + error.message);
    });
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
	
	// FormData 생성
    const formData = new FormData();
	formData.append("member_idx" , document.querySelector("input[name='member_idx']").value);
	formData.append("store_name" , document.querySelector("input[name='store_name']").value);
	formData.append("store_image" , document.querySelector("input[name='store_image']").value);
	formData.append("store_num" , document.querySelector("input[name='store_num']").value);
	formData.append("store_email" , document.querySelector("input[name='store_email']").value);
	formData.append("store_address" , document.querySelector("input[name='store_address']").value);
	formData.append("store_area" , document.querySelector("input[name='store_area']").value);
	formData.append("store_activity_time" , document.querySelector("input[name='store_activity_time']").value);
	formData.append("store_content" , document.querySelector("textarea[name='store_content']").value);
	formData.append("store_rnum" , document.querySelector("input[name='store_rnum']").value);
	formData.append("store_regcode" , document.querySelector("input[name='store_regcode']").value);
	formData.append("store_lat" , document.querySelector("input[name='store_lat']").value);
	formData.append("store_lng" , document.querySelector("input[name='store_lng']").value);
	//이미지 파일
    formData.append("file", document.querySelector("input[type='file']").files[0]);

    document.querySelector("#savingUI").classList.add("save");
	
    // 데이터 전송
    fetch("/store/storeRegister", {
        method: "POST",
        body: formData
    })
    .then(response => {
	    if (!response.ok) {
	        throw new Error('서버오류'+response);
	    }
        return response.text();
    })
    .then(data => {
    	// 로딩창 숨기기
        document.querySelector("#savingUI").classList.remove("save");
        alert("점주 신청 완료.");
        location.href = "/"; // 성공 시 리다이렉트
    })
    .catch(error => {
        console.error("Error:", error);
        // 에러 발생 시에도 로딩창 숨기기
        document.querySelector("#savingUI").classList.remove("save");
        alert("점주 신청 실패.");
    });

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
	
	// FormData 생성
    const formData = new FormData();
    formData.append("store_idx" , document.querySelector("input[name='store_idx']").value);
	formData.append("member_idx" , document.querySelector("input[name='member_idx']").value);
	formData.append("store_name" , document.querySelector("input[name='store_name']").value);
	formData.append("store_image" , document.querySelector("input[name='store_image']").value);
	formData.append("store_num" , document.querySelector("input[name='store_num']").value);
	formData.append("store_email" , document.querySelector("input[name='store_email']").value);
	formData.append("store_lat" , document.querySelector("input[name='store_lat']").value);
	formData.append("store_lng" , document.querySelector("input[name='store_lng']").value);
	formData.append("store_address" , document.querySelector("input[name='store_address']").value);
	formData.append("store_regcode" , document.querySelector("input[name='store_regcode']").value);
	formData.append("store_area" , document.querySelector("input[name='store_area']").value);
	formData.append("store_activity_time" , document.querySelector("input[name='store_activity_time']").value);
	formData.append("store_content" , document.querySelector("textarea[name='store_content']").value);
	formData.append("store_rnum" , document.querySelector("input[name='store_rnum']").value);
	//이미지 파일
    formData.append("file", document.querySelector("input[type='file']").files[0]);
    
    document.querySelector("#savingUI").classList.add("save");
    // 데이터 전송
    fetch("/store/storeModify", {
        method: "POST",
        body: formData
    })
    .then(response => {
	    if (!response.ok) {
	    	return response.text().then(text => {
                throw new Error('서버 응답 에러: ' + text);
            });
	    }
        return response.text();
    })
    .then(data => {
        alert("점포 수정 완료.");
        location.href = "/store/storeModify?store_idx="+document.querySelector("input[name='store_idx']").value; // 성공 시 리다이렉트
    })
    .catch(error => {
        console.error("Error:", error);
        alert("점포 수정 실패: " + error.message);
    });
    
};

let store_idx = new URLSearchParams(location.search).get('store_idx');
function menu(){
	location.href=`/store/menu?store_idx=${store_idx}`;
}

// 점주에서 user로 격하도 시켜야됨
function remove(){
	if(confirm("정말 페업하시겠습니까?")){
		document.querySelector("#savingUI").classList.add("save");
		f.action = "/store/storeRemove";
	    f.submit();
	    alert("삭제 되었습니다");
	}else{
	}
}

// 미리보기
document.querySelector("#simage").addEventListener("change", function (e) {
    const preview = document.querySelector("#preview");
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
        	preview.querySelector("img").setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});