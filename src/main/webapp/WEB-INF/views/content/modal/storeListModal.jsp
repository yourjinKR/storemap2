<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="storeListModal">
	<div class="store-card">
		<ul>
			<c:forEach var="vo" items="${list}">
				<li data-store_idx="${vo.store_idx}" onclick="viewModalPage(this)" name="store_idx">
					<img src="/resources/img/${vo.store_image}" alt="${vo.store_image}">
					<input type="hidden" name="store_address" value="${vo.store_address}">
					<input type="hidden" name="store_activity_time" value="${vo.store_activity_time}">
					<input type="hidden" name="store_num" value="${vo.store_num}">
					<div class="store-description">
						<div class="store-name">${vo.store_name}</div>
						<div class="store-content">${vo.store_content}</div>
					</div>
					<br>
				</li>
			</c:forEach>
		</ul>
	</div>
	<!-- 점포 상세보기 모달 -->
	<div id="modal">
		<div class="modal-header">
			<button class="mapBtn" id="close-store">X</button>
		</div>
		<div class="modal-content">
		</div>
	</div>
</div>
<script type="text/javascript" src="/resources/js/storeModal.js"></script>