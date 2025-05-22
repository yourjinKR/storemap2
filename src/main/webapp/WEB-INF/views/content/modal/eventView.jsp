<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/eventModal.js"></script>

<div class="eventView">
	
	<div class="event-image">
	</div>
	<input type="hidden" name="event_idx" value="${evo.event_idx}">

    <div class="event-info por">
      <h3>${evo.event_title}</h3>
      <div class="info-text">장소: ${evo.event_location}</div>
      <div class="info-text">장소: ${evo.event_content}</div>
    </div>
    <!-- n일차 정보 -->
    <div>
    	<div>← n일차 →</div>
    	<ul>
    		<li>점포명</li>
    		<div class="photo-preview" style="display: flex; gap: 10px; flex-wrap: wrap;">
			      <!-- Cloudinary 이미지 출력 -->
			      <c:forEach var="file" items="${evo.cloudinaryFiles}">
			        <img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/${file.uuid}_${file.filename}" 
			             alt="Cloudinary 이미지" 
			             style="width: 23%; height: auto;" />
			      </c:forEach>
			
			      <!-- 외부 URL 이미지 출력 -->
			      <c:forEach var="url" items="${evo.externalUrls}">
			        <img src="${url}" 
			             alt="외부 이미지" 
			             style="width: 23%; height: auto;" 
			             class="expandable-img" />
			      </c:forEach>
			</div>
    		<li>간단한 소개</li>
    		<li>메뉴명</li>
    	</ul>
    </div>
</div>