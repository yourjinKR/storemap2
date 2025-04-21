<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="side-bar">
	<div class="info d_f">
		<div class="left-con profile">
			<img alt="" src="/resources/img/profile.jpg">
		</div>
		<div class="right-con">
			<div class="user-nickname">길동이</div>
			<div class="user-name">홍길동</div>
		</div>
	</div>
	<ul class="btn-list">
		<li>계정관리</li>

		<!-- 일반 회원 -->
		<li>내 리뷰 확인</li>
		<li>좋아요 목록</li>

		<!-- 점포 회원 -->
		<li>점포관리</li>
		
		<!-- 기업 회원 -->
		<li>이벤트 관리</li>

		<li>로그아웃</li>
	</ul>
	
	<button type="button" class="close-btn">닫기</button>

</div>