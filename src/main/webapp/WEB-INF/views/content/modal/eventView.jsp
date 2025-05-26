<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/eventModal.js"></script>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="eventView">
	
	<div class="event-image">
	</div>
	<input type="hidden" name="event_idx" value="${evo.event_idx}">

    <div class="event-info por">
		<h3 class="event-title">${evo.event_title}</h3>
		<div>${evo.event_bstartdate}~ ${evo.event_bstopdate}</div>
		<div class="info-text">장소: ${evo.event_location}</div>
		
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
		<c:choose>
		  <c:when test="${fn:length(evo.event_content) > 100}">
		    <div class="event-content">
		      ${fn:substring(evo.event_content, 0, 100)}...
		      <span><a href="/event/eventView?event_idx=${evo.event_idx}">자세히 보기</a></span>
		    </div>
		  </c:when>
		  <c:otherwise>
		    <div class="event-content">
		      ${evo.event_content}
		      <span><a href="/event/eventView?event_idx=${evo.event_idx}">자세히 보기</a></span>
		    </div>
		  </c:otherwise>
		</c:choose>     	
	    
    </div>
</div>