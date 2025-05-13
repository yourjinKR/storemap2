const NOTICE_CSS_FILE_PATH = '/resources/css/notice.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = NOTICE_CSS_FILE_PATH;
document.head.appendChild(linkEle);

let formData, quill = null;

document.addEventListener("DOMContentLoaded", (event) => {
	
	formData = new FormData();
	
	
	const toolbarOptions = [
	  ['bold', 'underline', 'strike'],        // toggled buttons
	  ['blockquote','code-block'],
	  ['link', 'image'],
	
	  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
	  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
	  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
	  [{ 'direction': 'rtl' }],                         // text direction
	
	  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
	  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
	
	  [{ 'color': []}, { 'background': [] }],          // dropdown with defaults from theme
	  [{ 'font':  []}],
	  [{ 'align': [] }],
	
	  ['clean']                                         // remove formatting button
	];
	
	
	let editor = document.querySelector("#editor");
	if(editor != null){
		quill = new Quill('#editor', {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow'
		});
		
		quill.on('text-change', function() {
		        document.getElementById("quill_html").value = quill.root.innerHTML;
		        console.log(document.getElementById("quill_html").value)
		});
		
		quill.getModule('toolbar').addHandler('image', function () {
	        selectLocalImage();
	    });
	}
	
	
	let btns = document.querySelectorAll(".btn-box a");
	btns.forEach(btn => {
		btn.addEventListener("click", function(e){
			e.preventDefault();
			let target = btn.getAttribute("href");
			switch (target) {
			case "noticeInsert":
				noticeInsert();
				
				break;
			case "noticeDelete":
				if(confirm("삭제하시겠습니다?")){
					noticeDelete();
				}
				break;
			case "noticeList":
				location.href = "/admin/notice";
				break;
			}
		})
	})
});

// 파일 핸들링
function selectLocalImage() {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.accept = "image/*";
    fileInput.click();
    fileInput.addEventListener("change", function () {  // change 이벤트로 input 값이 바뀌면 실행
        if (this.value !== "") { // 파일이 있을때만.
            var ext = this.value.split(".").pop().toLowerCase();
//            if ($.inArray(ext, ["gif", "jpg", "jpeg", "png", "bmp"]) == -1) {
//
//                alert("jpg, jpeg, png, bmp, gif 파일만 업로드 가능합니다.");
//                return;
//            }
            var fileSize = this.files[0].size;
            var maxSize = 20 * 1024 * 1024;
            if (fileSize > maxSize) {
                alert("업로드 가능한 최대 이미지 용량은 20MB입니다.");
                return;

            }
            const file = fileInput.files[0];
            formData.append('uploadFile', file);
            for (const x of formData.entries()) {
        	 console.log(x);
        	};
        }
    });
}

// 공지 생성
function noticeInsert(){
	let f = document.forms[0];
	let btn = document.querySelector(".write-btn");
	if(f != null && btn != null){
		document.querySelector("#quill_html").value = quill.root.innerHTML;
	}
	fetch("/admin/noticeWrite", {
		method: "POST",
		body: formData
	})
	.then(response => {
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.text(); // 서버 응답 처리
	})
	.then(data => {
		console.log("Success:", data);
		alert("Notice successfully submitted!");
		location.href = "/admin/notice"; // 성공 시 리다이렉트
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Error submitting notice.");
	});
}

// 공지 삭제
function noticeDelete(){
	let idx = document.querySelector(".notice-title").dataset['idx'];
	fetch(`/admin/noticeDelete/${idx}`,{
		method : 'delete'
	})
	.then(response => response.text())
	.then(result => {
		if(result == "success"){			
			alert("삭제되었습니다.");
			location.href = "/admin/notice";
		}else{
			alert("삭제에 실패하였습니다");
		}
	})
	.catch(err => console.log(err))
}
