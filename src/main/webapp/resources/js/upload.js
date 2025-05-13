const f = document.forms[0];

document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'uploadBtn'){
			f.action = '/uploadFormAction';
            f.submit();
		}
	})
});

function upload(){
	f.action = '/uploadFormAction';
	f.submit();
};