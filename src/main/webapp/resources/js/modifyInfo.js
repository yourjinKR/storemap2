const MEMBER_CSS_FILE_PATH = '/resources/css/member.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = MEMBER_CSS_FILE_PATH;
document.head.appendChild(linkEle);

// ---------- Form 관련 요소들 ----------------
let formType = new URLSearchParams(location.search).get("type");
if(formType == 'personal') {
	// **************** 개인 **********************
	//
	let mPwValidState, mPwReValidState, mnicknameValidState = null;
	let regExpPw, regExpName, regExpNickName = null;
	let f = null;
	document.addEventListener("DOMContentLoaded", (event) => {
		f = document.getElementById('ModifyForm');
		mPwValidState = document.querySelector("#mPwValidState");
		mPwReValidState = document.querySelector("#mPwReValidState");
		mnicknameValidState = document.querySelector("#mnicknameValidState");
		let {pwCk, pwReCk, nicknameCk} = false; // 검증
		
		regExpPw = /^[0-9a-zA-Z]{8,16}$/;		// 비밀번호 검증 정규식
		regExpName = /^[가-힣a-zA-Z]{2,12}$/;	// 이름 검증 정규식 
		regExpNickName = /^[가-힣a-zA-Z]{2,12}$/;	// 별명 검증 정규식 

		document.querySelectorAll("button").forEach(btn => {
			btn.addEventListener('click', ()=> {
				let type = btn.getAttribute("id");
				
				if(type === 'modifyBtn'){
					// 수정하기
					regist();
				}else if(type === 'resetBtn'){
					f.reset();
				}
			});
		});
		
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
		
		// 별명 확인
		f.member_nickname.addEventListener('keyup', e=>{
			let target = e.currentTarget;
			
			if(target.value === ''){
				invalidate(target, mnicknameValidState, '별명을 입력해주세요.');
				nicknameCk = false;
			}else if(!regExpName.exec(target.value)){
				invalidate(target, mnicknameValidState, '형식에 맞지 않습니다.');
				nicknameCk = false;
			}else{
				validated(target, mnicknameValidState, '확인되었습니다.');
				nicknameCk = true;
			}
		});
	})
	
	
	function validated(inputTarget, resultState, comment){
		inputTarget.classList.add("is-valid");
		inputTarget.classList.remove("is-invalid");
		if(resultState){
			resultState.classList.add("valid-feedback");
			resultState.classList.remove("invalid-feedback");
			comment ? resultState.innerHTML = comment : resultState.innerHTML = '' ;
		}
	}
	
	// 데이터 검증 미완료 함수
	function invalidate(inputTarget, resultState, comment){
		inputTarget.classList.remove("is-valid");
		inputTarget.classList.add("is-invalid");
		if(resultState){
			resultState.classList.remove("valid-feedback");
			resultState.classList.add("invalid-feedback");
			comment ? resultState.innerHTML = comment : resultState.innerHTML = '' ;
		}
	}
	
	// 수정하기
	function regist(){
		
		if(!pwCk || !pwReCk || !nicknameCk){
			//alert("모든 입력 내용을 확인해주세요");
			//return;
		}
		let formData = new FormData();
		formData.append("member_idx", f.member_idx.value);
		formData.append("member_id", f.member_id.value);
		formData.append("member_pw", f.member_pw.value);
		formData.append("member_name", f.member_name.value);
		formData.append("member_nickname", f.member_nickname.value);
		
		// 이미지 파일
		const fileInput = document.querySelector("input[name='member_image']");
		if(fileInput.files[0]) {
			formData.append("file", fileInput.files[0]);
		}
		
		fetch(`/member/modifyPersonal`, {
			method : 'POST',
			body : formData
		})
		.then(response => {
			if(response.ok) {
				alert("회원정보 수정이 완료되었습니다. 메인 페이지로 이동합니다.");
				location.href=`/`;
				return;
			}
			return response.text().then(text => {
				throw new Error(text);
			});
		})
		.catch(err => {
			alert("오류가 발생했습니다. 다시 시도해주세요.");
		});
	}

} else if(formType == 'group') {
	// **************** 단체 **********************
	//
	let ePwValidState, ePwReValidState, regExpPw = null;
	document.addEventListener("DOMContentLoaded", (event) => {
		ePwValidState = document.querySelector("#ePwValidState");
		ePwReValidState = document.querySelector("#ePwReValidState");
		let {pwCk, pwReCk} = false; // 검증
		regExpPw = /^[0-9a-zA-Z]{8,16}$/;		// 비밀번호 검증 정규식
		
		document.querySelectorAll("button").forEach(btn => {
			btn.addEventListener('click', ()=> {
				let type = btn.getAttribute("id");
				
				if(type === 'modifyBtn'){
					// 수정하기
					regist();
				}else if(type === 'resetBtn'){
					f.reset();
				}
			});
		});
		
		// 비밀번호 입력 이벤트
		f.enter_pw.addEventListener('keyup', e => {
			let target = e.currentTarget;
			
			if(target.value === ''){
				// 값이 비어있을 때
				invalidate(target, ePwValidState, '비밀번호를 입력해주세요.');
				pwCk = false;
			}else if(!regExpPw.exec(target.value)){
				// 데이터 검증 미완료
				invalidate(target, ePwValidState, '올바른 형식이 아닙니다.');
				pwCk = false;
			}else{
				// 데이터 검증 완료
				validated(target, ePwValidState, '사용 가능한 비밀번호입니다.');
				pwCk = true;
			}
		});
		
		// 비밀번호 확인 입력 이벤트
		f.enter_pw_re.addEventListener('keyup', e => {
			let target = e.currentTarget;
			
			if(target.value === ''){
				// 값이 비어있을 때 - 초기화
				invalidate(target, ePwReValidState, '비밀번호를 입력해주세요.');
				pwReCk = false;
			}else if(target.value !== f.enter_pw.value){
				// 값이 다르면 - '비밀번호가 일치하지 않습니다.'
				invalidate(target, ePwReValidState, '비밀번호가 일치하지 않습니다.');
				pwReCk = false;
			} else {
				// 값이 같으면 통과
				validated(target, ePwReValidState, '확인되었습니다.');
				pwReCk = true;
			}
		});
		
	})
	
	// 데이터 검증 완료 함수
	function validated(inputTarget, resultState, comment){
		inputTarget.classList.add("is-valid");
		inputTarget.classList.remove("is-invalid");
		if(resultState){
			resultState.classList.add("valid-feedback");
			resultState.classList.remove("invalid-feedback");
			comment ? resultState.innerHTML = comment : resultState.innerHTML = '' ;
		}
	}
	
	// 데이터 검증 미완료 함수
	function invalidate(inputTarget, resultState, comment){
		inputTarget.classList.remove("is-valid");
		inputTarget.classList.add("is-invalid");
		if(resultState){
			resultState.classList.remove("valid-feedback");
			resultState.classList.add("invalid-feedback");
			comment ? resultState.innerHTML = comment : resultState.innerHTML = '' ;
		}
	}
	
	// 수정하기
	function regist(){
		
		if(!pwCk || !pwReCk){
			//alert("모든 입력 내용을 확인해주세요");
			//return;
		}
		
		let formData = new FormData();
		formData.append("enter_idx", f.enter_idx.value);
		formData.append("enter_id", f.enter_id.value);
		formData.append("enter_pw", f.enter_pw.value);
		formData.append("enter_name", f.enter_name.value);
		formData.append("enter_rnum", f.enter_rnum.value);
		formData.append("enter_loc", f.enter_loc.value);
		formData.append("enter_num", f.enter_num.value);
		
		// 이미지 파일
		const fileInput = document.querySelector("input[name='enter_image']");
		if(fileInput.files[0]) {
			formData.append("file", fileInput.files[0]);
		}

		fetch(`/member/modifyGroup`, {
			method : 'POST',
			body : formData
		})
		.then(response => {
			if(response.ok) {
				alert("회원정보 수정이 완료되었습니다. 메인 페이지로 이동합니다.");
				location.href=`/`;
				return;
			}
			return response.text().then(text => {
				throw new Error(text);
			});
		})
		.catch(err => {
			alert("오류가 발생했습니다. 다시 시도해주세요.");
		});
	}
}
