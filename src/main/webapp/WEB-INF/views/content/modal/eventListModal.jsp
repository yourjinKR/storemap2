<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="eventListModal">
	<div class="event-card">
		<ul>
		<!-- 숨겨진 리스트는 불러오지 않게 하기 AND 시작된 리스트hide2만 불러오기 -->
			<li data-event_idx="" onclick="" name="event_idx">
				<img src="/resources/img/store1.jpg" alt="">
				<div class="store-description">
					<div class="event-name">이벤트명</div>
					<div class="event-location">이벤트장소</div>
				</div>
				<br>
			</li>
		</ul>
	</div>
	<!-- 점포 상세보기 모달 -->
	<div id="modal">
		<div class="modal-header">
			<button class="mapBtn" id="close-event">X</button>
		</div>
		<div class="modal-content">
		</div>
	</div>
</div>