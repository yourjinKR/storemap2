<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="side-bar">
	<div class="info d_f">
		<div class="left-con profile">
			<img alt="" src="/resources/img/profile.jpg">
		</div>
		<div class="right-con">
			<c:choose>
				<c:when test="${userType == 'user'}">
					<div class="user-nickname">${sessionScope.userNickName}</div>
					<div class="user-name">${sessionScope.userName}</div>
				</c:when>
				<c:when test="${userType == 'owner'}">
					<div class="user-nickname">${sessionScope.userNickName}</div>
					<div class="user-name">${sessionScope.userName}</div>
				</c:when>
				<c:when test="${userType == 'admin'}">
					<div class="user-nickname">${sessionScope.userNickName}</div>
					<div class="user-name">${sessionScope.userName}</div>
				</c:when>
				<c:when test="${userType == 'enter'}">
					<div class="user-name">${sessionScope.userName}</div>
				</c:when>
			</c:choose>
		</div>
	</div>
	<ul class="btn-list">
		<li><a href="/member/modifyInfo">개인정보 수정</a></li>

		<!-- 일반 회원 -->
		<li>내 리뷰 확인</li>
		<li>좋아요 목록</li>

		<!-- 점포 회원 -->
		<li>점포관리</li>
		
		<!-- 기업 회원 -->
		<li>이벤트 관리</li>

		<li><a id="slogoutLink" href="/member/login">로그아웃</a></li>
	</ul>
	
	<button type="button" class="close-btn">닫기</button>

</div>