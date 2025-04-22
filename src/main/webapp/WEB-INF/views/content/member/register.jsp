<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
	</head>
	<body>
	<form action="">
		<div>
			<c:choose>
				<c:when test="${type == 'personal'}">
					<h1>일반/점주 회원가입</h1>
					<br>
					<form action="/member/register/personal" method="post">
						<p>
							아이디
							<input type="text" name="member_id" id="member_id" placeholder="4~12자리 입력"/>
							<button type="button" id="duplicateCkBtn">중복확인</button>
							<span id="mIdValidState"></span>
						</p>
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
						<p>이름 <input type="text" name="member_name" placeholder="2~12자리 입력"/></p>
						<p>별명 <input type="text" name="member_nickname" placeholder="2~12자리 입력"/></p>
						<button type="button" id="registBtn">가입하기</button>
						<button type="reset" id="resetBtn">다시작성</button>
					</form>
				</c:when>
				<c:when test="${type == 'group'}">
					<h1>기관/단체 회원가입</h1>
					<br>
					<form action="/member/register/group" method="post">
						<p>아이디 <input type="text" name="enter_id" placeholder="아이디 입력"/><button type="duplicateCkBtn">중복확인</button></p>
						<p>비밀번호 <input type="password" name="enter_pw" placeholder="비밀번호입력"/></p>
						<p>비밀번호 확인 <input type="password" name="enter_pw_re" placeholder="비밀번호확인"/></p>
						<p>상호명 <input type="text" name="enter_name" placeholder="아이디 입력"/></p>
						<p>사업자번호 <input type="text" name="enter_rnum" placeholder="사업자번호 입력"/><button type="imgBtn">이미지 추가</button></p>
						<p>소재지 <input type="text" name="enter_loc" placeholder="아이디 입력"/></p>
						<p>대표 연락처 <input type="text" name="enter_num" placeholder="아이디 입력"/></p>
						<button type="button">가입하기</button>
						<button type="reset">다시작성</button>
					</form>
				</c:when>
				<c:otherwise>
			    	<h1>타입 값이 잘못되었습니다.</h1>
			  	</c:otherwise>
			</c:choose>
		</div>
	</form>
	<script type="text/javascript" src="/resources/js/register.js"></script>
	</body>
</html>
