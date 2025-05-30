const f = document.forms[0];

const CSS_PATH = '/resources/css/review.css';
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
			location.href="/store/map";
		}
	})
});

let store_idx = new URLSearchParams(location.search).get('store_idx');

function register(){
	if(!f.review_title.value){
		alert("제목을 입력하세요.");
		return;
	}
	if(!f.review_content.value){
		alert("내용을 입력하세요.");
		return;
	}
	
	// FormData 생성
    const formData = new FormData();
	formData.append("store_idx" , document.querySelector("input[name='store_idx']").value);
	formData.append("member_idx" , document.querySelector("input[name='member_idx']").value);
	formData.append("review_title" , document.querySelector("input[name='review_title']").value);
	formData.append("review_writer" , document.querySelector("input[name='review_writer']").value);
	formData.append("review_star" , document.querySelector("select[name='review_star']").value);
	formData.append("review_content" , document.querySelector("textarea[name='review_content']").value);
	formData.append("review_image" , document.querySelector("input[name='review_image']").value);
	//이미지 파일
	const fileInput =  document.querySelector("input[type='file']");
    if (fileInput.files[0]) {
		formData.append("file", fileInput.files[0]);
	}
    
    document.querySelector("#savingUI").classList.add("save");
    // 데이터 전송
    fetch("/store/review", {
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
    	document.querySelector("#savingUI").classList.remove("save");
        alert("리뷰 등록 완료.");
        location.href = "/store/map";
    })
    .catch(error => {
    	document.querySelector("#savingUI").classList.remove("save");
        console.error("Error:", error);
        alert("이미 리뷰가 존재합니다.");
    });
};

//미리보기
document.querySelector("#simage").addEventListener("change", function (e) {
    const preview = document.querySelector("#preview");
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="미리보기 이미지" style="max-width:100px; height:auto;">`;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = "";
        preview.style.display = "none";
    }
});