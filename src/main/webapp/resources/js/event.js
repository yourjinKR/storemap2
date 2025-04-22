const EVENT_CSS_FILE_PATH = '/resources/css/event.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = EVENT_CSS_FILE_PATH;
document.head.appendChild(linkEle);

document.addEventListener("DOMContentLoaded", (event) => {
	// 이벤트 리스트 뷰타입 변환
	let boardType = document.querySelectorAll("input[type=radio]");
	boardType.forEach(el => {
	    el.addEventListener("change", function(){
	    	let checkedType = document.querySelector("input[type=radio]:checked").value;
	    	boardChange(checkedType);
	    });
	});
	
	let favorite = document.querySelectorAll("input[type=checkbox]");
	favorite.forEach(heart => {
		heart.addEventListener("change" , function(){
			
			favoriteChk(this.closest("tr").dataset["idx"]);
		})
	})
	
	
});

//이벤트 리스트 뷰타입 변환
function boardChange(chkEl){
	let barod = document.querySelectorAll(".barod");
	let barodShow = document.querySelector(chkEl);
	barod.forEach(el => {
		if(!el.classList.contains("hide")){
			el.classList.add("hide");			
		}else{
			el.classList.remove("hide");
		}
	})
}

//function favoriteChk(eventIdx){
//	fetch(`/event/favorite/${eventIdx}`)
//	.then(response => response.json())
//	.then(result => {
//		console.log("result : " + result);
//	})
//}




