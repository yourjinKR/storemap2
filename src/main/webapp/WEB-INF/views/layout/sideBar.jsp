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
				<c:when test="${userType == 'user' or userType == 'owner' or userType == 'admin'}">
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

		<c:choose>
			<%-- 일반 회원 --%>
			<c:when test="${userType == 'user'}">
				<li><a href="">내 리뷰 확인</a></li>
				<li><a href="">좋아요 목록</a></li>
				<li><a href="/store/storeRegister">점포신청</a></li>
			</c:when>
			<%-- 점포 회원 --%>
			<c:when test="${userType == 'owner'}">
				<li><a href="/store/storeModify?store_idx=${storeIdx}">점포관리</a></li>
			</c:when>
			<%-- 기업 회원 --%>
			<c:when test="${userType == 'enter'}">
				<li><a href="">이벤트 관리</a></li>
			</c:when>
			<c:otherwise>
				<li><a href="/admin/adminMain">관리자 페이지</a></li>
			</c:otherwise>
		</c:choose>

		

		<li><a id="slogoutLink" href="/member/login">로그아웃</a></li>
	</ul>
	
	<button type="button" class="close-btn">닫기</button>

</div>