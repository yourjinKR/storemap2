<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="storeListModal">
	<div class="store-card">
		<ul>
			<c:forEach var="vo" items="${list}">
			<c:choose>
				<c:when test="${vo.store_hidden eq 0}"><!-- 1은 숨겨진 점포 -->
					<li data-store_idx="${vo.store_idx}" onclick="viewDetailModalPage(this, 'store')" name="store_idx">
					<c:choose>
						<c:when test="${vo.attach.filename eq null}">
							<img src="${IMG_URL}NoImage_pdlhxd.jpg" alt="${vo.store_image}"/>
						</c:when>
						<c:otherwise>
							<img src="${IMG_URL}${vo.store_image}_${vo.attach.filename}" alt="${vo.attach.filename}"/>
						</c:otherwise>
					</c:choose>
						<input type="hidden" name="store_address" value="${vo.store_address}">
						<input type="hidden" name="store_activity_time" value="${vo.store_activity_time}">
						<input type="hidden" name="store_num" value="${vo.store_num}">
						<div class="store-description">
							<div class="store-name">${vo.store_name}</div>
							<div class="store-content">${vo.store_content}</div>
						</div>
						<br>
					</li>
				</c:when>
				</c:choose>
			</c:forEach>
		</ul>
		<div class="search-fail" id="store">
			<div id="fail-content">검색 결과가 존재하지 않습니다.</div>	
		</div>
	</div>
	<!-- 점포 상세보기 모달 -->
	<div id="modal">
		<div class="modal-header">
			<button class="mapBtn" id="close-store">X</button>
		</div>
		<div class="modal-content" id="store">
		</div>
	</div>
</div>
<script type="text/javascript" src="/resources/js/storeModal.js"></script>