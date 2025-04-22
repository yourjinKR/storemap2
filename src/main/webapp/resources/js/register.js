let sendData;

// ---------- Form 관련 요소들 ----------------
const f = document.forms[0];
const mIdValidState = document.querySelector("#mIdValidState");
const mPwValidState = document.querySelector("#mPwValidState");
const mPwReValidState = document.querySelector("#mPwReValidState");
let {idCk, pwCk, pwReCk, nameCk} = false; // 검증

// ---------- 정규식 ----------------
const regExpId = /^[a-z]+[0-9a-z]{3,12}$/;	// 아이디 검증 정규식
const regExpPw = /^[0-9a-zA-Z]{8,16}$/;		// 비밀번호 검증 정규식
const regExpName = /^[가-힣a-zA-Z]{2,12}$/;	// 이름 검증 정규식 
const regExpNickName = /^[가-힣a-zA-Z]{2,12}$/;	// 별명 검증 정규식 

// ---------- 함수 ----------------
// 버튼들 클릭 이벤트
document.querySelectorAll("button").forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'duplicateCkBtn'){
			// id 중복확인
			console.log("ok");
			validateId();
		}else if(type === 'registBtn'){
			console.log("ok");
			// 회원가입
			regist();
		}else if(type === 'resetBtn'){
			console.log("ok");
			f.reset();
		}else{
			location.href='MemberController?cmd=mainPage';
		}
	});
});
// 데이터 검증 완료 함수
function validated(inputTarget, resultState, comment){
	inputTarget.classList.add("is-valid");
	inputTarget.classList.remove("is-invalid");
	if(resultState){
		resultState.classList.add("valid-feedback");
		resultState.classList.remove("invalid-feedback");
		comment ? 
			resultState.innerHTML = comment : 
				resultState.innerHTML = '' ;
	}
}
// 데이터 검증 미완료 함수
function invalidate(inputTarget, resultState, comment){
	inputTarget.classList.remove("is-valid");
	inputTarget.classList.add("is-invalid");
	if(resultState){
		resultState.classList.remove("valid-feedback");
		resultState.classList.add("invalid-feedback");
		comment ? 
			resultState.innerHTML = comment : 
				resultState.innerHTML = '' ;
	}
}
// 검증 스타일 초기화 함수
function Initialization(inputTarget, resultState){
	inputTarget.classList.remove("is-valid");
	inputTarget.classList.remove("is-invalid");
	if(resultState){
		resultState.classList.remove("valid-feedback");
		resultState.classList.remove("invalid-feedback");
		resultState.innerHTML = '';
	}
}
// ID 중복 확인
function validateId(){
	let target = f.member_id;
	
	if(target.value == ''){
		Initialization(target, mIdValidState);
		alert("아이디를 입력하세요.");
		idCk = false;
		return;
	}else if(!regExpId.exec(target.value)){
		console.log("ok2");
		invalidate(target, mIdValidState, "형식에 맞지 않은 아이디입니다.");
		idCk = false;
		return;
	}
	
	let member_id = target.value;
			
	fetch(`/member/checkId?member_id=${encodeURIComponent(member_id)}`)
		.then(response => {
//			console.log("raw response : ", response);
//			return response.text();
			return response.json()
			
		})
		.then(data => {
			console.log("중복 체크 결과 : ", data);
			if(data.result == 0){
				validated(target, mIdValidState, '사용 가능한 아이디입니다.');
				idCk = true;
			}else{
				invalidate(target, mIdValidState, '중복된 아이디입니다.');
				idCk = false;
			}
		})
		.catch(err => console.log("중복 아이디 체크 에러 : ", err));
}

// 비밀번호 입력 이벤트
f.member_pw.addEventListener('keyup', e => {
	let target = e.currentTarget;
	
	if(target.value === ''){
		// 값이 비어있을 때
		invalidate(target, mPwValidState, '비밀번호를 입력해주세요.');
		pwCk = false;
	}else if(!regExpPw.exec(target.value)){
		// 데이터 검증 미완료
		invalidate(target, mPwValidState, '올바른 형식이 아닙니다.');
		pwCk = false;
	}else{
		// 데이터 검증 완료
		validated(target, mPwValidState, '사용 가능한 비밀번호입니다.');
		pwCk = true;
	}
});
// 비밀번호 확인 입력 이벤트
f.member_pw_re.addEventListener('keyup', e => {
	let target = e.currentTarget;
	
	if(target.value === ''){
		// 값이 비어있을 때 - 초기화
		invalidate(target, mPwReValidState, '비밀번호를 입력해주세요.');
		pwReCk = false;
	}else if(target.value !== f.member_pw.value){
		// 값이 다르면 - '비밀번호가 일치하지 않습니다.'
		invalidate(target, mPwReValidState, '비밀번호가 일치하지 않습니다.');
		pwReCk = false;
	} else {
		// 값이 같으면 통과
		validated(target, mPwReValidState, '확인되었습니다.');
		pwReCk = true;
	}
});
//이름 확인
f.member_name.addEventListener('keyup', e=>{
	let target = e.currentTarget;
	
	if(target.value === ''){
		Initialization(target, '이름을 입력해주세요.');
		nameCk = false;
	}else if(!regExpName.exec(target.value)){
		invalidate(target);
		nameCk = false;
	}else{
		validated(target);
		nameCk = true;
	}
});

// 회원 가입
function regist(){
	
	console.log(idCk, pwCk, pwReCk, nameCk)
	
	if(!idCk || !pwCk || !pwReCk || !nameCk){
		alert("모든 입력 내용을 확인해주세요");
		return;
	}
	let formData = new FormData(f);
	let jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
	
	fetch(`/member/register`, {
			method : 'POST',
			headers : {
				'Content-type' : 'application/json; charset=utf-8'
			},
			body : jsonData
	})
	.then(response => response.json())
	.then(data => {
		if(data.result === 1){
			alert("회원가입이 완료되었습니다.");
			location.href=`/member/login`;
		} else {
			alert("회원가입이 실패했습니다.");
		}
	})
	.catch(err => {
		console.log("회원가입 오류 : ", err);
		alert("회원가입 오류");
	});
}







