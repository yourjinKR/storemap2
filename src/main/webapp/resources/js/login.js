/*let sendData;

 ---------- Form 관련 요소들 ----------------
const f = document.forms[0];
const LOGIN_FAIL_MSG = '아이디 또는 비밀번호가 일치하지 않습니다.';

 ---------- 함수 ----------------
document.querySelectorAll("button").forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'loginBtn'){
			login();
		}else{
			location.href='MemberController?cmd=mainPage';
		}
	});
});
function login(){
	if(!f.mId.value){
		alert("아이디를 입력하세요.");
		return;
	}
	if(!f.mPw.value){
		alert("비밀번호를 입력하세요.");
		return;
	}
	
	sendData = {
		mId : f.mId.value,
		mPw : f.mPw.value,
		cmd : 'login'
	};
	
	fetch(`MemberAsyncController`, {
			method : 'post',
			body : JSON.stringify(sendData),
			headers : {
				'Content-type' : 'application/json; charset=utf-8'
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data.result);
			
			if(data.result === 'success'){
				location.href='MemberController?cmd=mainPage';
			}else{
				alert(LOGIN_FAIL_MSG);
			}
		})
		.catch(err => console.log(err));
	
	
}*/





