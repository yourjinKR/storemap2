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
	<!-- 모달 -->
	<div id="modal">
		<div class="modal-content">
			<img src="/resources/img/${svo.store_image}" alt="가게 이미지" class="store-image">
		    <div class="store-info">
		      <h3>가게정보</h3>
		      <div class="info-text">주소: </div>
		      <div class="info-text">영업일: </div>
		      <div class="info-text">전화: </div>
		    </div>
	    </div>
	</div>
</div>
<script type="text/javascript" src="/resources/js/storeList.js"></script>