<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/javascript" src="/resources/js/main.js"></script>
<!-- 메인 슬라이드 -->
<div class="main-slide">
	<div class="swiper mySwiper">
		<div class="swiper-wrapper">
			<div class="swiper-slide">Slide 1</div>
			<div class="swiper-slide">Slide 2</div>
			<div class="swiper-slide">Slide 3</div>
			<div class="swiper-slide">Slide 4</div>
			<div class="swiper-slide">Slide 5</div>
			<div class="swiper-slide">Slide 6</div>
			<div class="swiper-slide">Slide 7</div>
			<div class="swiper-slide">Slide 8</div>
			<div class="swiper-slide">Slide 9</div>
		</div>
		<div class="swiper-pagination"></div>
	</div>
</div>

<!-- 달력 -->
<div class="event-calendar d_f">
	<div class="left-con">
		<div class="sec_cal">
			<div class="cal_nav">
				<a class="nav-btn go-prev">prev</a>
				<div class="nav-btn go-now year-month"></div>
				<a class="nav-btn go-next">next</a>
			</div>
			<div class="cal_wrap">
				<div class="days">
					<div class="day">SUN</div>
					<div class="day">MON</div>
					<div class="day">TUE</div>
					<div class="day">WED</div>
					<div class="day">THU</div>
					<div class="day">FRI</div>
					<div class="day">SAT</div>
				</div>
				<div class="dates"></div>
			</div>
		</div>
	</div>
	<!-- 선택 날짜 이벤트 리스트 종료 순 -->
	<div class="right-con">
		<h3>진행중인 이벤트</h3>
		<ul class="event-list">

		</ul>
	</div>
</div>

<!-- 진행 /예정 중인 이벤트 -->
<div class="board-card por mt50 list-event">
	<div class="list-top mb30">
		<h3>진행/예정 이벤트</h3>
	</div>
	<ul class="swiper-wrapper">

	</ul>
	<div class="swiper-button-next"></div>
	<div class="swiper-button-prev"></div>
</div>

<!-- 점포 리스트 -->
<div class="board-card por mt50 list-store">
	<div class="list-top">
		<h3>점포 리스트</h3>
		<div class="d_f mt15px">
			<div class="select-box mb15">
				<label for="place-select">지역 : </label> 
				<select id="place-select">
					<option value="전체">전체</option>
					<option value="서울">서울</option>
					<option value="경기">경기</option>
					<option value="인천">인천</option>
					<option value="강원">강원</option>
					<option value="충청남도">충남</option>
					<option value="대전">대전</option>
					<option value="충청북도">충북</option>
					<option value="부산">부산</option>
					<option value="울산">울산</option>
					<option value="대구">대구</option>
					<option value="경상북도">경북</option>
					<option value="경상남도">경남</option>
					<option value="전라남도">전남</option>
					<option value="광주">광주</option>
					<option value="전라북도">전북</option>
					<option value="제주">제주</option>
				</select>
			</div>
			<a href="">+ 더보기</a>
		</div>
	</div>
	<!-- 슬라이드 영역 -->
	<ul class="swiper-wrapper"></ul>
	<div class="swiper-button-next"></div>
	<div class="swiper-button-prev"></div>
</div>

