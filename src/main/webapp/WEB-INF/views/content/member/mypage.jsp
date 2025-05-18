<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/mypage.js"></script>
<div>
	<h3>내 좋아요/리뷰 확인</h3>

	<ul class="main-tab">
		<li><a href="likeList" class="on">좋아요 목록</a></li>
		<li><a href="reviewList">내 리뷰 목록</a></li>
	</ul>
	
	<div class="tab-content likeList-content on">
		123
		<ul class="sub-tab">
			<li><a href="event" class="on">이벤트</a></li>
			<li><a href="store">점포</a></li>
			<li><a href="review">리뷰</a></li>
			<li><a href="reply">댓글</a></li>
		</ul>
		
		<!-- 이벤트 좋아요 -->
		<div class="sub-tab-content event-content mt50 on">
			<ul>
				<li><a></a></li>
			</ul>
		</div>
		<!-- 점포 좋아요 -->
		<div class="sub-tab-content store-content mt50">
		</div>
		<!-- 리뷰 좋아요 -->
		<div class="sub-tab-content review-content mt50">
		</div>
		<!-- 댓글 좋아요 -->
		<div class="sub-tab-content reply-content mt50">
		</div>
	</div>
	<div class="tab-content reviewList-content">
		12345
	
	</div>
</div>
