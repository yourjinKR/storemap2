<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div>
	<h1>login</h1>
	<form action="${pageContext.request.contextPath}/member/login" method="post">
		<input type="text" name="memberId" placeholder="아이디"/>
		<input type="password" name="memberPw" placeholder="비밀번호"/>
		<button type="submit">로그인</button>
	</form>
	<c:if test="${not empty msg}">
		<p style="color:red;">${msg}</p>
	</c:if>
	<br>
	<h1>회원이 아니신가요?</h1>
	<form action="">
		<button>일반/점주 회원가입</button>
		<button>기관/단체 회원가입</button>
	</form>
</div>
