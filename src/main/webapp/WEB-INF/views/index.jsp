<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1&text=lists,view_column_2,favorite,mail,drafts,swap_vert,menu" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=01b044026317f8b7f88dc847a9e857b8"></script>
<script type="text/javascript" src="/resources/js/default.js"></script>
</head>
<%
	request.setAttribute("path", request.getAttribute("javax.servlet.forward.request_uri"));
%>
<body>
	사용자 : ${ loginUser }, 권한 : ${ userType }
	<input type="hidden" name="sessionId" value="${ loginUser }">
	<input type="hidden" name="auth" value="${ userType }">
	<c:choose>
		<c:when test="${path eq '/store/map'}"></c:when>
		<c:when test="${path eq '/modal/storeView'}"></c:when>
		<c:when test="${path eq '/modal/postcodeForm'}"></c:when>
		<c:when test="${path eq '/admin/adminMain'}"></c:when>
		<c:otherwise>
			<jsp:include page="./layout/header.jsp" /><br>
		</c:otherwise>
	</c:choose>
	
	<jsp:include page="./layout/content.jsp" /><br>
	
	<c:choose>
		<c:when test="${path eq '/store/map'}"></c:when>
		<c:when test="${path eq '/modal/storeView'}"></c:when>
		<c:when test="${path eq '/modal/postcodeForm'}"></c:when>
		<c:when test="${path eq '/admin/adminMain'}"></c:when>
		<c:otherwise>
			<jsp:include page="./layout/footer.jsp" />
		</c:otherwise>
	</c:choose>
</body>
</html>