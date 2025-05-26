<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="eventListModal">
	<div class="event-card">
		<ul>
		<!-- 숨겨진 리스트(hide1)는 불러오지 않게 하기 AND 시작된 리스트(open1)만 불러오기 -->
			<li data-event_idx="" onclick="" name="event_idx">
				<img src="/resources/img/store1.jpg" alt="">
				<div class="event-description">
					<div class="event-name">이벤트명</div>
					<div class="event-location">이벤트장소</div>
				</div>
				<br>
			</li>
		</ul>
		<div class="search-fail" id="event">
			<div id="fail-content">검색 결과가 존재하지 않습니다.</div>	
		</div>
	</div>
	<!-- 이벤트 상세보기 모달 -->
	<div id="modal">
		<div class="modal-header">
			<button class="mapBtn" id="close-event">X</button>
		</div>
		<div class="modal-content" id="event">
		</div>
	</div>
</div>
<script type="text/javascript" src="/resources/js/eventModal.js"></script>