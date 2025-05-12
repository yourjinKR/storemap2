const NOTICE_CSS_FILE_PATH = '/resources/css/notice.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = NOTICE_CSS_FILE_PATH;
document.head.appendChild(linkEle);

document.addEventListener("DOMContentLoaded", (event) => {
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
	let quill = null;
	if(editor != null){
		quill = new Quill('#editor', {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow'
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

// 공지 생성
function noticeInsert(){
	let f = document.forms[0];
	let btn = document.querySelector(".write-btn");
	if(f != null && btn != null){
		document.querySelector("input[name='announce_content']").value = quill.root.innerHTML;
		f.action = "/admin/noticeWrite";
		f.submit();
	}
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
