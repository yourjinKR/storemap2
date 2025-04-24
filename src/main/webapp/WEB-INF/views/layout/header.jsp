<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<input type="hidden" name="sessionId" value="${ loginUser }">
<input type="hidden" name="auth" value="${ userType }">
사용자 : ${ loginUser }

<div class="header d_f">
	<h1>로고</h1>
	<div class="search-bar">
		<input type="text" name="search" placeholder="검색어를 입력해주세요.">
	</div>
	
	<div class="right-div d_f">
		<div class="icon" onclick="modalShow('letter')">
			<span>1</span>
			<i class="material-symbols-outlined">
				mail
			</i>
		</div>
		
		<a class="btn" href="/member/login">로그인</a>
		<a class="btn" id="hlogoutLink" href="/member/login">로그아웃</a>
		<div class="profile">
			<img alt="" src="/resources/img/profile.jpg">			
		</div>
	</div>	
</div>

<jsp:include page="./sideBar.jsp"/>
<jsp:include page="./letter.jsp"/>


