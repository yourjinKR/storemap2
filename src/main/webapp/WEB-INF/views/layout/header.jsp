<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

사용자 : ${ loginUser }, 권한 : ${ userType }
<input type="hidden" name="sessionId" value="${ loginUser }">
<input type="hidden" name="auth" value="${ userType }">

<div class="header d_f">
	<h1><a href="/">로고</a></h1>
	<div class="search-bar">
		<input type="text" name="search" placeholder="검색어를 입력해주세요.">
	</div>
	
	<div class="right-div d_f">
		<c:choose>
			<c:when test="">
			</c:when>
			<c:otherwise>
			</c:otherwise>
		</c:choose>
		<c:if test="${loginUser ne null}">
			<div class="icon" onclick="modalShow('letter')">
				<span>1</span>
				<i class="material-symbols-outlined">
					mail
				</i>
			</div>
		</c:if>
		
		<c:choose>
			<c:when test="${loginUser ne null}">
				<a class="btn" id="hlogoutLink" href="/member/login">로그아웃</a>
				<div class="profile">
					<img alt="" src="/resources/img/profile.jpg">			
				</div>
			</c:when>
			<c:otherwise>
				<a class="btn" href="/member/login">로그인</a>
			</c:otherwise>
		</c:choose>
		<c:if test="${loginUser eq null}">
		<button type="button" class="side-btn">
			<span class="material-symbols-outlined">
				menu
			</span>
		</button> 
		</c:if>
	</div>	
</div>

<jsp:include page="./sideBar.jsp"/>
<jsp:include page="./letter.jsp"/>


