console.log("admin.js load");
const f = document.forms[0];

document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'registerBtn'){
			register();
		}else if(type === 'removeBtn'){
			remove();
		}
	})
});

function register(){
	f.action = '/admin/adminStoreView';
	f.submit();
};
function remove(){
	if(confirm("정말 불허하시겠습니까?")){
		f.action = '/admin/adminStoreRemove';
	    f.submit();
	    alert("불허 되었습니다");
	}else{
	}
}