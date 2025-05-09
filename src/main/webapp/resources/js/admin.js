console.log("admin.js load");
const f = document.forms[0];

document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'storeApprovalBtn'){
			storeApproval();
		}else if(type === 'storeDisallowBtn'){
			storeDisallow();
		}
		else if(type === 'storeReportHideBtn'){
			storeReportHide();
		}
		else if(type === 'storeReportRemoveBtn'){
			storeReportRemove();
		}
		else if(type === 'reviewReportHideBtn'){
			reviewReportHide();
		}
		else if(type === 'reviewReportRemoveBtn'){
			reviewReportRemove();
		}
	})
});

function storeApproval(){
	f.action = '/admin/adminStoreView';
	f.submit();
};
function storeDisallow(){
	if(confirm("정말 불허하시겠습니까?")){
		f.action = '/admin/adminStoreRemove';
	    f.submit();
	    alert("불허 되었습니다");
	}else{
	}
}

function storeReportHide(){
	f.action = '/admin/storeReportHide';
	f.submit();
}
function storeReportRemove(){
	if(confirm("신고를 취소 하시겠습니까?")){
		f.action = '/admin/storeReportRemove';
		f.submit();
		alert("취소 되었습니다");
	}else{
	}
}

function reviewReportHide(){
	f.action = '/admin/reviewReportHide';
	f.submit();
}
function reviewReportRemove(){
if(confirm("신고를 취소 하시겠습니까?")){
		f.action = '/admin/reviewReportRemove';
		f.submit();
		alert("취소 되었습니다");
	}else{
	}
}