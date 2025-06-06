<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="wrap<c:if test='${not empty type}'> ${type}</c:if>">

	<c:choose>
		<%-- 관리자페이지 --%>
		<c:when test="${path eq '/admin/adminMain'}">
			<jsp:include page="../content/admin/adminMain.jsp" />
		</c:when>
		<c:when test="${path eq '/admin/notice'}">
			<jsp:include page="../content/admin/notice.jsp" />
		</c:when>
		<c:when test="${path eq '/admin/noticeView'}">
			<jsp:include page="../content/admin/noticeView.jsp" />
		</c:when>
		<c:when test="${path eq '/admin/noticeWrite'}">
			<jsp:include page="../content/admin/noticeWrite.jsp" />
		</c:when>
		<c:when test="${path eq '/admin/noticeModify'}">
			<jsp:include page="../content/admin/noticeModify.jsp" />
		</c:when>
	
		<%-- 이벤트 리스트 --%>
		<c:when test="${path eq '/event/eventList'}">
			<jsp:include page="../content/event/eventList.jsp" />
		</c:when>
		<%-- 이벤트 수정 --%>
		<c:when test="${path eq '/event/eventModify'}">
			<jsp:include page="../content/event/eventModify.jsp" />
		</c:when>
		<%-- 이벤트 작성 --%>
		<c:when test="${path eq '/event/eventRegister'}">
			<jsp:include page="../content/event/eventRegister.jsp" />
		</c:when>
		<%-- 이벤트 상세보기 --%>
		
		<c:when test="${path eq '/event/eventView'}">
			<jsp:include page="../content/event/eventView.jsp" />
		</c:when>
		<c:when test="${path eq '/event/myevent'}">
			<jsp:include page="../content/event/myevent.jsp" />
		</c:when>
		
		<%-- 로그인 --%>
		<c:when test="${path eq '/member/login'}">
			<jsp:include page="../content/member/login.jsp" />
		</c:when>
		<%-- 회원가입 --%>
		<c:when test="${path eq '/member/register'}">
			<jsp:include page="../content/member/register.jsp" />
		</c:when>
		<%-- 개인정보수정 --%>
		<c:when test="${path eq '/member/modifyInfo'}">
			<jsp:include page="../content/member/modifyInfo.jsp" />
		</c:when>
		<%-- 회원탈퇴 --%>
		<c:when test="${path eq '/member/delete'}">
			<jsp:include page="../content/member/delete.jsp" />
		</c:when>
		<%-- 마이페이지 --%>
		<c:when test="${path eq '/member/mypage'}">
			<jsp:include page="../content/member/mypage.jsp" />
		</c:when>
		<%-- 나의 좋아요 목록 --%>
		<c:when test="${path eq '/member/myLikeList'}">
			<jsp:include page="../content/member/myLikeList.jsp" />
		</c:when>
		<%-- 내 리뷰보기 --%>
		<c:when test="${path eq '/member/myreview'}">
			<jsp:include page="../content/member/myreview.jsp" />
		</c:when>
	
		<%-- 메시지 쓰기 --%>
		<c:when test="${path eq '/modal/eventSubmitModal'}">
			<jsp:include page="../content/modal/eventSubmitModal.jsp" />
		</c:when>
		<%-- 메시지 리스트 --%>
		<c:when test="${path eq '/modal/letterListModal'}">
			<jsp:include page="../content/modal/letterListModal.jsp" />
		</c:when>
		<%-- 메시지 보기 --%>
		<c:when test="${path eq '/modal/letterView'}">
			<jsp:include page="../content/modal/letterView.jsp" />
		</c:when>
		<%-- 메시지 작성 --%>
		<c:when test="${path eq '/modal/letterWrite'}">
			<jsp:include page="../content/modal/letterWrite.jsp" />
		</c:when>
		<%-- 알림 팝업 --%>
		<c:when test="${path eq '/modal/noticeModal'}">
			<jsp:include page="../content/modal/noticeModal.jsp" />
		</c:when>
		<%-- 점포 목록 팝업 --%>
		<c:when test="${path eq '/modal/storeListModal'}">
			<jsp:include page="../content/modal/storeListModal.jsp" />
		</c:when>
		<%-- 점포 상세보기 팝업 --%>
		<c:when test="${path eq '/modal/storeView'}">
			<jsp:include page="../content/modal/storeView.jsp" />
		</c:when>
		<%-- 우편번호 form --%>
		<c:when test="${path eq '/modal/postcodeForm'}">
			<jsp:include page="../content/modal/postcodeForm.jsp" />
		</c:when>
		<%-- 이벤트 리스트 모달 --%>
		<c:when test="${path eq '/modal/eventListModal'}">
			<jsp:include page="../content/modal/eventListModal.jsp" />
		</c:when>
		<%-- 이벤트 상세보기 모달 --%>
		<c:when test="${path eq '/modal/eventView'}">
			<jsp:include page="../content/modal/eventView.jsp" />
		</c:when>

		<%-- 지도 --%>
		<c:when test="${path eq '/store/map'}">
			<jsp:include page="../content/store/map.jsp" />
		</c:when>
		<%-- 리뷰등록 --%>
		<c:when test="${path eq '/store/review'}">
			<jsp:include page="../content/store/review.jsp" />
		</c:when>
		<%-- 점포관리 --%>
		<c:when test="${path eq '/store/storeModify'}">
			<jsp:include page="../content/store/storeModify.jsp" />
		</c:when>
		<%-- 점포등록 --%>
		<c:when test="${path eq '/store/storeRegister'}">
			<jsp:include page="../content/store/storeRegister.jsp" />
		</c:when>
		<%-- 메뉴관리 --%>
		<c:when test="${path eq '/store/menu'}">
			<jsp:include page="../content/store/menu.jsp" />
		</c:when>
		<%-- 점포지도 --%>
		<c:when test="${path eq '/store/map'}">
			<jsp:include page="../content/store/map.jsp" />
		</c:when>
	
		<%-- 메인 --%>
		<c:otherwise>
			<jsp:include page="../content/main.jsp" />
		</c:otherwise>
	</c:choose>
</div>