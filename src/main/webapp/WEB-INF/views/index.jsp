<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=01b044026317f8b7f88dc847a9e857b8"></script>
<script type="text/javascript" src="/resources/js/default.js"></script>
</head>
<%
	request.setAttribute("path", request.getAttribute("javax.servlet.forward.request_uri"));

	String path = (String) request.getAttribute("path");
    if ("/store/map".equals(path)) {
        request.setAttribute("type", "full");
    }
%>
<body>
	<c:choose>
		<c:when test="${path eq '/store/map'}"></c:when>
		<c:otherwise>
			<jsp:include page="./layout/header.jsp" /><br>
		</c:otherwise>
	</c:choose>
	
	<jsp:include page="./layout/content.jsp" /><br>
	
	<c:choose>
		<c:when test="${path eq '/store/map'}"></c:when>
		<c:otherwise>
			<jsp:include page="./layout/footer.jsp" />
		</c:otherwise>
	</c:choose>
</body>
</html>