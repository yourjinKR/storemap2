let formType = new URLSearchParams(location.search).get("type");
if(formType === 'personal') {
// ---------- 함수 ----------------
// 버튼들 클릭 이벤트
	let f = null;
	let mIdValidState, mPwValidState, mPwReValidState, mnameReValidState, mnicknameValidState= null;
	let regExpId, regExpPw, regExpName, regExpNickName = null;
	document.addEventListener("DOMContentLoaded", (event) => {
		f = document.getElementById('registerForm');
		mIdValidState = document.querySelector("#mIdValidState");
		mPwValidState = document.querySelector("#mPwValidState");
		mPwReValidState = document.querySelector("#mPwReValidState");
		mnameReValidState = document.querySelector("#mnameReValidState");
		mnicknameValidState = document.querySelector("#mnicknameValidState");
		let {idCk, pwCk, pwReCk, nameCk, nicknameCk} = false; // 검증
		
// ---------- 정규식 ----------------
		regExpId = /^[a-z]+[0-9a-z]{3,12}$/;	// 아이디 검증 정규식
		regExpPw = /^[0-9a-zA-Z]{8,16}$/;		// 비밀번호 검증 정규식
		regExpName = /^[가-힣a-zA-Z]{2,12}$/;	// 이름 검증 정규식 
		regExpNickName = /^[가-힣a-zA-Z]{2,12}$/;	// 별명 검증 정규식 
		document.querySelectorAll("button").forEach(btn => {
			btn.addEventListener('click', ()=> {
				let type = btn.getAttribute("id");
				
				if(type === 'duplicateCkBtn'){
					// id 중복확인
					validateId();
				}else if(type === 'registBtn'){
					// 회원가입
					regist();
				}else if(type === 'resetBtn'){
					f.reset();
				}else{
					location.href='MemberController?cmd=mainPage';
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
		// 이름 확인
		f.member_name.addEventListener('keyup', e=>{
			let target = e.currentTarget;
			
			if(target.value === ''){
				invalidate(target, mnameValidState, '이름을 입력해주세요.');
				nameCk = false;
			}else if(!regExpName.exec(target.value)){
				invalidate(target, mnameValidState, '형식에 맞지 않습니다.');
				nameCk = false;
			}else{
				validated(target, mnameValidState, '확인되었습니다.');
				nameCk = true;
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
			invalidate(target, mIdValidState, "형식에 맞지 않은 아이디입니다.");
			idCk = false;
			return;
		}
		
		let member_id = target.value;
		
		fetch(`/member/checkId?member_id=${encodeURIComponent(member_id)}`)
		.then(response => {
			return response.json()
			
		})
		.then(data => {
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

// 회원 가입
	function regist(){
		
		
		if(!idCk || !pwCk || !pwReCk || !nameCk || !nicknameCk){
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
				alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
				location.href=`/member/login`;
			} else {
				alert("회원가입이 실패했습니다.");
			}
		})
		.catch(err => {
			alert("회원가입 오류");
		});
	}
} else {
// -------------------------------- 기업/단체 회원가입 ------------------------------------
	let IdValidState, PwValidState, PwReValidState, nameReValidState, rnumValidState, locValidState, numValidState = null;
	let regExpId, regExpPw, regExpName, regExpRnum, regExpLoc, regExpNum = null;
	let f = null;
	document.addEventListener("DOMContentLoaded", (event) => {
		f = document.getElementById('registerForm');
		IdValidState = document.querySelector("#IdValidState");
		PwValidState = document.querySelector("#PwValidState");
		PwReValidState = document.querySelector("#PwReValidState");
		nameReValidState = document.querySelector("#nameReValidState");
		rnumValidState = document.querySelector("#rnumValidState");
		locValidState = document.querySelector("#locValidState");
		numValidState = document.querySelector("#numValidState");
		let {idCk, pwCk, pwReCk, nameCk, rnumCk, locCk, numCk} = false; // 검증
		
		regExpId = /^[a-z]+[0-9a-z]{3,12}$/;	// 아이디 검증 정규식
		regExpPw = /^[0-9a-zA-Z]{8,16}$/;		// 비밀번호 검증 정규식
		regExpName = /^[가-힣a-zA-Z]{2,12}$/;	// 이름 검증 정규식 
		regExpRnum = /^[0-9]{2,12}$/;	// 사업자번호 검증 정규식 
		regExpLoc = /^[가-힣a-zA-Z]{2,12}$/;	// 소재지 검증 정규식 
		regExpNum = /^[0-9]{8,12}$/;	// 대표연락처 검증 정규식 

		document.querySelectorAll("button").forEach(btn => {
			btn.addEventListener('click', ()=> {
				let type = btn.getAttribute("id");
				
				if(type === 'duplicateCkBtn'){
					// id 중복확인
					validateId();
				}else if(type === 'registBtn'){
					// 회원가입
					regist();
				}else if(type === 'resetBtn'){
					f.reset();
				}else{
					location.href='MemberController?cmd=mainPage';
				}
			});
		});
		
		// 비밀번호 입력 이벤트
		f.enter_pw.addEventListener('keyup', e => {
			let target = e.currentTarget;
			
			if(target.value === ''){
				// 값이 비어있을 때
				invalidate(target, PwValidState, '비밀번호를 입력해주세요.');
				pwCk = false;
			}else if(!regExpPw.exec(target.value)){
				// 데이터 검증 미완료
				invalidate(target, PwValidState, '올바른 형식이 아닙니다.');
				pwCk = false;
			}else{
				// 데이터 검증 완료
				validated(target, PwValidState, '사용 가능한 비밀번호입니다.');
				pwCk = true;
			}
		});
		// 비밀번호 확인 입력 이벤트
		f.enter_pw_re.addEventListener('keyup', e => {
			let target = e.currentTarget;
			
			if(target.value === ''){
				// 값이 비어있을 때 - 초기화
				invalidate(target, PwReValidState, '비밀번호를 입력해주세요.');
				pwReCk = false;
			}else if(target.value !== f.enter_pw.value){
				// 값이 다르면 - '비밀번호가 일치하지 않습니다.'
				invalidate(target, PwReValidState, '비밀번호가 일치하지 않습니다.');
				pwReCk = false;
			} else {
				// 값이 같으면 통과
				validated(target, PwReValidState, '확인되었습니다.');
				pwReCk = true;
			}
		});
		// 상호명 확인
		f.enter_name.addEventListener('keyup', e=>{
			let target = e.currentTarget;
			
			if(target.value === ''){
				invalidate(target, nameValidState, '이름을 입력해주세요.');
				nameCk = false;
			}else if(!regExpName.exec(target.value)){
				invalidate(target, nameValidState, '형식에 맞지 않습니다.');
				nameCk = false;
			}else{
				validated(target, nameValidState, '확인되었습니다.');
				nameCk = true;
			}
		});
		// 사업자번호 확인
		f.enter_rnum.addEventListener('keyup', e=>{
			let target = e.currentTarget;
			
			if(target.value === ''){
				invalidate(target, rnumValidState, '별명을 입력해주세요.');
				rnumCk = false;
			}else if(!regExpRnum.exec(target.value)){
				invalidate(target, rnumValidState, '숫자만 입력해주세요.');
				rnumCk = false;
			}else{
				validated(target, rnumValidState, '확인되었습니다.');
				rnumCk = true;
			}
		});
		// 소재지 확인
		f.enter_loc.addEventListener('keyup', e=>{
			let target = e.currentTarget;
			
			if(target.value === ''){
				invalidate(target, locValidState, '별명을 입력해주세요.');
				locCk = false;
			}else if(!regExpLoc.exec(target.value)){
				invalidate(target, locValidState, '형식에 맞지 않습니다.');
				locCk = false;
			}else{
				validated(target, locValidState, '확인되었습니다.');
				locCk = true;
			}
		});
		// 대표연락처 확인
		f.enter_num.addEventListener('keyup', e=>{
			let target = e.currentTarget;
			
			if(target.value === ''){
				invalidate(target, numValidState, '별명을 입력해주세요.');
				numCk = false;
			}else if(!regExpNum.exec(target.value)){
				invalidate(target, numValidState, '숫자만 입력해주세요.');
				numCk = false;
			}else{
				validated(target, numValidState, '확인되었습니다.');
				numCk = true;
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
		let target = f.enter_id;
		
		if(target.value == ''){
			Initialization(target, IdValidState);
			alert("아이디를 입력하세요.");
			idCk = false;
			return;
		}else if(!regExpId.exec(target.value)){
			invalidate(target, IdValidState, "형식에 맞지 않은 아이디입니다.");
			idCk = false;
			return;
		}
		
		let enter_id = target.value;
		
		fetch(`/member/echeckId?enter_id=${encodeURIComponent(enter_id)}`)
		.then(response => {
			return response.json()
			
		})
		.then(data => {
			if(data.result == 0){
				validated(target, IdValidState, '사용 가능한 아이디입니다.');
				idCk = true;
			}else{
				invalidate(target, IdValidState, '중복된 아이디입니다.');
				idCk = false;
			}
		})
		.catch(err => console.log("중복 아이디 체크 에러 : ", err));
	}

// 회원 가입
	function regist(){
		if(!idCk || !pwCk || !pwReCk || !nameCk || !rnumCk || !locCk || !numCk){
			alert("모든 입력 내용을 확인해주세요");
			return;
		}
		let formData = new FormData(f);
		let jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
		
		fetch(`/member/register/group`, {
			method : 'POST',
			headers : {
				'Content-type' : 'application/json; charset=utf-8'
			},
			body : jsonData
		})
		.then(response => response.json())
		.then(data => {
			if(data.result === 1){
				alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
				location.href=`/member/login`;
			} else {
				alert("회원가입이 실패했습니다.");
			}
		})
		.catch(err => {
			alert("회원가입 오류");
		});
	}
}







