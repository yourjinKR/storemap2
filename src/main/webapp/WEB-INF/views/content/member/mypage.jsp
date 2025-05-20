<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/mypage.js"></script>

<c:if test="${ loginUser eq '' or userType ne 'user'}">
<script type="text/javascript">
	alert("잘못 된 접근입니다.");
	location.href="/";
</script>
</c:if>

<h3>내 좋아요/리뷰 확인</h3>

<ul class="main-tab">
	<li><a href="likeList" ${param.type eq 'likeList' or param.type eq null ? 'class="on"' : '' }>좋아요 목록</a></li>
	<li><a href="reviewList" ${param.type eq 'reviewList' ? 'class="on"' : '' }>내 리뷰 목록</a></li>
</ul>

<div class="tab-content likeList-content ${param.type eq 'likeList' or param.type eq null ? 'on' : '' }">
	<jsp:include page="./myLikeList.jsp"></jsp:include>
</div>
<div class="tab-content reviewList-content ${param.type eq 'reviewList' ? 'on' : '' }">
	<jsp:include page="./myreview.jsp"></jsp:include>
</div>
	