<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/eventModal.js"></script>

<div class="eventView">
	
	<div class="event-image">
	</div>
	<input type="hidden" name="event_idx" value="${evo.event_idx}">

    <div class="event-info por">
		<h3 class="event-title">${evo.event_title}</h3>
		<div class="photo-preview" style="display: flex; gap: 10px; flex-wrap: wrap;">
			<!-- Cloudinary 이미지 출력 (0번째 제외) -->
			<c:forEach var="file" items="${evo.cloudinaryFiles}" varStatus="status">
			  <c:if test="${status.index != 0}">
			    <img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/${file.uuid}_${file.filename}" 
			         alt="Cloudinary 이미지" 
			         style="width: 23%; height: auto;" />
			  </c:if>
			</c:forEach>
			
			<!-- 외부 URL 이미지 출력 (0번째 제외) -->
			<c:forEach var="url" items="${evo.externalUrls}" varStatus="status">
			  <c:if test="${status.index != 0}">
			    <img src="${url}" 
			         alt="외부 이미지" 
			         style="width: 23%; height: auto;" 
			         class="expandable-img" />
			  </c:if>
			</c:forEach>
		</div>
      	<div class="info-text">장소: ${evo.event_location}</div>
    </div>
    <!-- n일차 정보 -->
    <div>
    	<div>← n일차 →</div>
    	<p>점포명</p>
    	<ul>
    		<li>메뉴</li>
    		<li>메뉴</li>
    		<li>메뉴</li>
    	</ul>
    	<p>점포명</p>
    	<ul>
    		<li>메뉴</li>
    		<li>메뉴</li>
    		<li>메뉴</li>
    	</ul>
    </div>
</div>