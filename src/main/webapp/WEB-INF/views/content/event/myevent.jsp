<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/myevent.js"></script>
<c:if test="${loginUser eq '' or userType ne 'enter'}">
<script type="text/javascript">
	alert("잘못 된 접근입니다.");
	location.href="/";
</script>
</c:if>
<div class="event-wrap">
	<h3>이벤트 관리</h3>
	
	<ul class="main-tab">
		<li><a href="request" class="on">이벤트 승인</a></li>
		<li><a href="event">등록된 이벤트</a></li>
	</ul>
	
	<div class="tab-content request-content mt15 on">
		<ul>
			
		</ul>
	</div>
	
	<div class="tab-content event-content ">
		
	</div>
		
</div>