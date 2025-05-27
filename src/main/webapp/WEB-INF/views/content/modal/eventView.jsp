<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/eventModal.js"></script>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<% request.setAttribute("now", new Date());%>
<c:if test="${evo.event_hidden eq 1}">
	<script>
		alert("숨겨진 이벤트 입니다.");
		location.href="/";
	</script>
</c:if>

<div class="eventView">
	
	<div class="event-image">
	</div>
	<input type="hidden" name="event_idx" value="${evo.event_idx}">

    <div class="event-info por">
		<h3 class="event-title">${evo.event_title}</h3>
		<c:choose>
			<c:when test="${evo.event_bstartdate > now}">
			<div class="state-box">
				<span class="event-state">진행 예정</span>
			</div>
			</c:when>
			<c:when test="${evo.event_bstopdate < now}">
				<span class="event-state">종료</span>
			</c:when>
			<c:otherwise>
				<span class="event-state">진행 중</span>
			</c:otherwise>
		</c:choose>
		<div>기간</div>
		<div class="info-text">${evo.event_bstartdate}~ ${evo.event_bstopdate}</div>
		<div>주소</div>
		<div class="info-text">${evo.event_location}</div>
		
		<div class="event-slider">
		  <div class="event-slider-inner">
		    <!-- Cloudinary 이미지 출력 -->
		    <c:forEach var="file" items="${evo.cloudinaryFiles}" varStatus="status">
		    <c:if test="${status.index != 0}">
			      <div class="event-slide">
			        <img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/${file.uuid}_${file.filename}" alt="Cloudinary 이미지">
			      </div>
		    </c:if>
		    </c:forEach>
		
		    <!-- 외부 URL 이미지 출력 -->
		    <c:forEach var="url" items="${evo.externalUrls}" varStatus="status">
		    <c:if test="${status.index != 0}">
			      <div class="event-slide">
			        <img src="${url}" alt="외부 이미지">
			      </div>
		    </c:if>
		    </c:forEach>
		    
		  </div>
		
		  <!-- 슬라이드 버튼 -->
		  <button class="slider-btn prev">‹</button>
		  <button class="slider-btn next">›</button>
		</div>

		
		
		<c:choose>
		  <c:when test="${fn:length(evo.event_content) > 100}">
		    <div class="event-content">
		      ${fn:substring(evo.event_content, 0, 100)}...
		      
		    </div>
		  </c:when>
		  <c:otherwise>
		    <div class="event-content">
		      ${evo.event_content}
		    </div>
		  </c:otherwise>
		</c:choose>     	
		      <span class="event-content" id="more-view"><a href="/event/eventView?event_idx=${evo.event_idx}">더보기</a></span>
	    
    </div>
</div>