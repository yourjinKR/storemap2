const NOTICE_CSS_FILE_PATH = '/resources/css/notice.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = NOTICE_CSS_FILE_PATH;
document.head.appendChild(linkEle);

let formData, fileData, quill = null;

document.addEventListener("DOMContentLoaded", (event) => {
	fileData = [];
	
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
            
            fileData.push(fileInput.files[0]);
            
            const range = quill.getSelection(); // 사용자가 선택한 에디터 범위
            
            if (fileInput.files[0] && /^image\//.test(fileInput.files[0].type)) {
	        	const reader = new FileReader();
	        	reader.onload = function (e) {
	        		const range = quill.getSelection();
	        		quill.insertEmbed(range ? range.index : 0, 'image', e.target.result);
	            };
	            reader.readAsDataURL(fileInput.files[0]); // base64로 변환
            }
        }
    });
}

function noticeInsert() {
    const form = document.forms[0];
    if (!form) return;

    let editorImg = document.querySelectorAll("#editor img");
    editorImg.forEach(img => {
    	img.setAttribute("src", "");
    })
    
    // Quill 에디터 내용 저장
    document.querySelector("#quill_html").value = quill.root.innerHTML;
    
    // FormData 생성
    const formData = new FormData(form);

    // fileData 배열의 파일을 FormData에 추가
    for (const file of fileData) {
    	formData.append("files", file);
    }
 
    // FormData 확인 (디버깅용)
    for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);
    }

    // 데이터 전송
    fetch("/admin/noticeWrite", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    })
    .then(data => {
        console.log("Success:", data);
        alert("공지사항이 성공적으로 등록되었습니다.");
        location.href = "/admin/notice"; // 성공 시 리다이렉트
    })
    .catch(error => {
        console.error("Error:", error);
        alert("공지사항 등록 중 오류가 발생했습니다.");
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
