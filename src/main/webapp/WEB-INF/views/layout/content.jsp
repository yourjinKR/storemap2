<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:choose>
	<!--  -->
	<c:when test="${path eq '/content/event/eventList'}">
		<jsp:include page="../content/event/eventList.jsp" />
	</c:when>

	<c:otherwise>
		<jsp:include page="../content/main.jsp" />
	</c:otherwise>
</c:choose>