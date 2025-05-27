<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="side-bar">
	<div class="info d_f">
		<div class="left-con profile">
		<c:choose>
			<c:when test="${sessionScope.userFilename eq '' or sessionScope.userFilename eq null}">
				<img src="${IMG_URL}NoMember_pgeszi.jpg" alt="${sessionScope.userImage}"/>
			</c:when>
			<c:otherwise>
				<img src="${IMG_URL}${sessionScope.userImage}_${sessionScope.userFilename}" alt="${sessionScope.userFilename}"/>
			</c:otherwise>
		</c:choose>
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
				<c:otherwise>
					<a href="/member/login" class="login-text">로그인을 해주세요</a>
				</c:otherwise>
			</c:choose>
		</div>
	</div>
	<ul class="btn-list">
	<c:choose>
		<c:when test="${loginUser ne '' and loginUser ne null}">
			<c:choose>
				<%-- 일반 회원 --%>
				<c:when test="${userType == 'user'}">
					<li><a href="/member/modifyInfo?type=personal">개인정보 수정</a></li>
					<li><a href="/member/mypage?type=reviewList">내 리뷰 확인</a></li>
					<li><a href="/member/mypage?type=likeList">좋아요 목록</a></li>
					<li><a href="/store/storeRegister">점포신청</a></li>
				</c:when>
				<%-- 점포 회원 --%>
				<c:when test="${userType == 'owner'}">
					<li><a href="/member/modifyInfo?type=personal">개인정보 수정</a></li>
					<li><a href="/store/storeModify?store_idx=${storeIdx}">점포관리</a></li>
				</c:when>
				<%-- 기업 회원 --%>
				<c:when test="${userType == 'enter'}">
					<li><a href="/member/modifyInfo?type=group">개인정보 수정</a></li>
					<li><a href="/event/myevent">이벤트 관리</a></li>
				</c:when>
				<c:otherwise>
					<li><a href="/member/modifyInfo?type=personal">개인정보 수정</a></li>
					<li><a href="/admin/adminMain">관리자 페이지</a></li>
				</c:otherwise>
			</c:choose>
			<li><a href="/event/eventList">이벤트</a></li>
			<li><a href="/admin/notice">공지사항</a></li>
			<li><a id="slogoutLink" href="/member/login">로그아웃</a></li>
		</c:when>
		<c:otherwise>
			<li><a href="/member/login">로그인</a></li>
			<li><a href="/member/register?type=personal">일반/점주 회원가입</a></li>
			<li><a href="/member/register?type=group">기관/단체 회원가입</a></li>
			<li><a href="/event/eventList">이벤트</a></li>
			<li><a href="/admin/notice">공지사항</a></li>
		</c:otherwise>
	</c:choose>
	</ul>
	
	<button type="button" class="close-btn">닫기</button>

</div>