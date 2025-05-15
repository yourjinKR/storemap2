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
    </div>
</div>