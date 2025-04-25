<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div>
	<h1>회원탈퇴</h1><br>
	<form>
		<p>
			비밀번호
		 	<input type="password" name="member_pw" id="member_pw" placeholder="8~16자리 입력"/>
			<span id="mPwValidState"></span>
	 	</p>
		<p>
			비밀번호 확인 
			<input type="password" name="member_pw_re" id="member_pw_re" placeholder="같은 비밀번호 입력"/>
			<span id="mPwReValidState"></span>
		</p>
	</form><br>
	<button type="submit">탈퇴하기</button>
	<button onclick="location.href='/'">돌아가기</button>
</div>