const EVENT_CSS_FILE_PATH = '/resources/css/event.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = EVENT_CSS_FILE_PATH;
document.head.appendChild(linkEle);

document.addEventListener("DOMContentLoaded", (event) => {
	let boardType = document.querySelectorAll("input[type=radio]");
	boardType.forEach(el => {
    el.addEventListener("change", function(){
    	let checkedType = document.querySelector("input[type=radio]:checked").value;
    	boardChange(checkedType);
    });
  });
});

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

