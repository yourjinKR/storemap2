<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/mypage.js"></script>
<h3>내 좋아요/리뷰 확인</h3>

<ul class="main-tab">
	<li><a href="likeList" class="on">좋아요 목록</a></li>
	<li><a href="reviewList">내 리뷰 목록</a></li>
</ul>

<div class="tab-content likeList-content on">
	<jsp:include page="./myLikeList.jsp"></jsp:include>
</div>
<div class="tab-content reviewList-content">
	<jsp:include page="./myreview.jsp"></jsp:include>
</div>
	