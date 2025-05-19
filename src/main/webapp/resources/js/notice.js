const NOTICE_CSS_FILE_PATH = '/resources/css/notice.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = NOTICE_CSS_FILE_PATH;
document.head.appendChild(linkEle);
const IMG_URL = "https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/";

let formData, fileData, quill, idx, pathName, imgArr = null;

document.addEventListener("DOMContentLoaded", (event) => {
	fileData = [];
	imgArr = [];
	idx = new URLSearchParams(window.location.search).get("idx");
	pathName = window.location.pathname;
	
	let btns = document.querySelectorAll(".btn-box a");
	btns.forEach(btn => {
		btn.addEventListener("click", function(e){
			e.preventDefault();
			let target = btn.getAttribute("href");
			switch (target) {
			case "noticeInsert":
				noticeInsert();
				break;
			case "noticeModify":
				location.href = `/admin/noticeModify?idx=${idx}`;
				break;
			case "noticeUpdate":
				updateNotice();
				break;
			case "noticeDelete":
				if(confirm("삭제하시겠습니다?")) noticeDelete();
				break;
			case "noticeList":
				location.href = "/admin/notice";
				break;
			}
		})
	})
	
	if(pathName == "/admin/noticeView" || pathName == "/admin/noticeModify"){
		getNotice();
	}
	if(pathName == "/admin/noticeWrite"){
		editorInit();
	}
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
            const validExtensions = ["gif", "jpg", "jpeg", "png", "bmp"];

            // 확장자가 유효한지 확인
            if (!validExtensions.includes(ext)) {
                alert("jpg, jpeg, png, bmp, gif 파일만 업로드 가능합니다.");
                return;
            }
            
            var fileSize = this.files[0].size;
            var maxSize = 20 * 1024 * 1024;
            if (fileSize > maxSize) {
                alert("업로드 가능한 최대 이미지 용량은 20MB입니다.");
                return;

            }
            const file = fileInput.files[0];
            fileData.push(file);
            
            const range = quill.getSelection(); // 사용자가 선택한 에디터 범위
            
            if (fileInput.files[0] && /^image\//.test(fileInput.files[0].type)) {
	        	const reader = new FileReader();
	        	reader.onload = function (e) {
	        		const range = quill.getSelection();
	        		quill.insertEmbed(range ? range.index : 0, 'image', e.target.result);
	        		imgArr.push([range.index,fileInput.files[0]]);
	        		quill.setSelection(range.index + 1, 0); 
	            };
            }
            
            // 파일을 base64로 변환하기 위한 FileReader 사용
            const reader = new FileReader();

            // 변환이 완료되면 실행되는 함수
            reader.onload = function(event) {
            	const range = quill.getSelection();
            	const base64Data = event.target.result; // base64로 변환된 데이터
            	quill.insertEmbed(range ? range.index : 0, 'image', base64Data);
            	fileData.push({ base64: base64Data, file: file }); // 파일과 base64 데이터를 배열에 저장
            };

            // base64로 파일을 읽기
            reader.readAsDataURL(file); // 비동기적으로 실행됩니다.
        }
    });
}

// 에디터 설정
function editorInit(){
	const isNoticeView = pathName === "/admin/noticeView";
	
	if(pathName == "/admin/noticeWrite" || pathName == "/admin/noticeModify"){
		Quill.register('modules/imageResize', QuillResizeModule);
	}
	
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
		
		const modulesConfig = {
			toolbar: isNoticeView ? false : toolbarOptions,
		};

		if (!isNoticeView) {
			// imageResize는 /admin/noticeView 가 아닐 때만 추가
			modulesConfig.imageResize = {
				displaySize: true
			};
		}
		
		quill = new Quill('#editor', {
			modules: modulesConfig,
			theme: 'snow',
			readOnly: isNoticeView
		});
		
		if(!isNoticeView){
			quill.on('text-change', function() {
		        document.getElementById("quill_html").value = quill.root.innerHTML;
			});
			
			quill.getModule('toolbar').addHandler('image', function () {
		        selectLocalImage();
		    });
		}
	}
	
}

// 공지 등록
function noticeInsert() {
    const form = document.forms[0];
    if (!form) return;
    let historyData = quill.root.innerHTML;
    let editorImg = document.querySelectorAll("#editor img");
    editorImg.forEach(img => {
    	img.setAttribute("src", "");
    })
    
    // Quill 에디터 내용 저장
    document.querySelector("#quill_html").value = quill.root.innerHTML;
    
    // FormData 생성
    const formData = new FormData(form);

    quill.getContents().ops.map(op => {
        if(op.insert.image != true && op.insert.image != undefined){
            for(let data of fileData){
                if(op.insert.image == data.base64){
                    formData.append("files", data.file);
                }
            }
        } 
    });
    
    quill.clipboard.dangerouslyPasteHTML(historyData);
   
    if(document.querySelector("input[name='announce_title']").value == ""){
    	alert("제목을 입력해주세요");
    	document.querySelector("input[name='announce_title']").focus();
    	return;
    }
    if(document.getElementById("quill_html").value == "<p><br></p>"){
    	alert("공지사항을 입력해주세요");
    	document.querySelector(".ql-editor").focus();
    	return;
    }
    document.querySelector("#savingUI").classList.add("save");
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
        alert("공지사항이 성공적으로 등록되었습니다.");
        location.href = "/admin/notice"; // 성공 시 리다이렉트
    })
    .catch(error => {
        alert("공지사항 등록 중 오류가 발생했습니다.");
    });
}

// 공지 삭제
function noticeDelete(){
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

// 공지 View
function getNotice(){
	fetch(`/admin/getNotice/${idx}`)
	.then(response => response.json())
	.then(result => {
		editorInit();
		quill.clipboard.dangerouslyPasteHTML(result.announce_content);
		setTimeout(() => {
		    const tempContainer = document.createElement('div');
		    tempContainer.innerHTML = result.announce_content;
	
		    const pastedImages = tempContainer.querySelectorAll('img');
		    const editorImages = document.querySelectorAll('#editor img');
	
		    pastedImages.forEach((img, index) => {
			    const style = img.getAttribute('style');
			    if (style && editorImages[index]) {
			    	editorImages[index].setAttribute('style', style);
			    }
		    });
	
		    // 필요한 경우 다른 태그들도 스타일 복원 가능
		}, 0);
		if(pathName == "/admin/noticeModify"){
			document.querySelector("input[name='announce_title']").value = result.announce_title;
		}else{
			document.querySelector(".notice-title").innerHTML = result.announce_title;
		}
		let img = document.querySelectorAll("#editor img");
		if(result.attach_list != null && result.attach_list.length > 0){
			result.attach_list.forEach((attach,i) => {
				if(attach != null){
					img[i].setAttribute("src", IMG_URL+attach.uuid+"_"+attach.filename);
					img[i].setAttribute("data-uuid", attach.uuid);
				}
			})
		}
	})
}


// 공지 Modify
function updateNotice(){
	const form = document.forms[0];
    if (!form) return;
    let historyData = quill.root.innerHTML;
    let imgData = "";
    let editorImg = document.querySelectorAll("#editor img");
    
    editorImg.forEach((img,i) => {
    	if(img.getAttribute("src") == ""){
    		img.remove();
    	}
    	
    	if(img.dataset['uuid'] != undefined){
    		// 사용 예시
    		imgData += img.dataset['uuid'];
    	}else if(img.getAttribute("src") != ""){
    		imgData += "newFile";
    	}
    	if(i < editorImg.length - 1){ 
    		imgData += ",";
    	}
    	img.setAttribute("src", "");
    })
    
    imgData = cleanString(imgData);
    
    // Quill 에디터 내용 저장
    document.querySelector("#quill_html").value = quill.root.innerHTML;
    document.querySelector("input[name='announce_image']").value = imgData;
    document.querySelector("input[name='announce_idx']").value = idx;

    // FormData 생성
    const formData = new FormData(form);

    
    quill.getContents().ops.map(op => {
    	if(op.insert.image != true && op.insert.image != undefined){
    		for(let data of fileData){
    			if(op.insert.image == data.base64){
    				formData.append("files", data.file);
    			}
    		}
    	} 
    });
    
    quill.clipboard.dangerouslyPasteHTML(historyData);
    editorImg = document.querySelectorAll("#editor img");
    quill.getContents().ops.map(op => {
    	if(op.insert.image != true && op.insert.image != undefined){
    		let imgStr = op.insert.image;
    		let target = "https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/";
    		editorImg.forEach(img => {
    			if(img.getAttribute("src") == op.insert.image){
    				img.setAttribute("data-uuid",imgStr.substring(target.length, imgStr.indexOf("_")));
    			}
    		})
    	} 
    });
    if(document.querySelector("input[name='announce_title']").value == ""){
    	alert("제목을 입력해주세요");
    	document.querySelector("input[name='announce_title']").focus();
    	return;
    }
    if(document.getElementById("quill_html").value == "<p><br></p>"){
    	alert("공지사항을 입력해주세요");
    	document.querySelector(".ql-editor").focus();
    	return;
    }
    document.querySelector("#savingUI").classList.add("save");
    // 데이터 전송
    fetch("/admin/noticeUpdate", {
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
        alert("공지사항이 수정되었습니다.");
        location.href = `/admin/noticeView?idx=${idx}`; // 성공 시 리다이렉트
    })
    .catch(error => {
        alert("공지사항 등록 중 오류가 발생했습니다.");
    });
}

function cleanString(str) {
	// 1. 앞뒤의 쉼표와 공백 제거
	let cleanedStr = str.replace(/^[, ]+|[, ]+$/g, "");

	// 2. 중간의 쉼표와 공백을 하나로 축소 (여기서 중간 공백 제거)
	cleanedStr = cleanedStr.replace(/, +/g, ",");

	return cleanedStr;
}
