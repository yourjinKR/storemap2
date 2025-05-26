<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Eventore</title>
<link rel="icon" href="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/favicon.png" type="image/png">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1&text=lists,view_column_2,favorite,mail,drafts,swap_vert,menu,mode_comment,undo" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=10f41a82abb306f90579f24750879367&libraries=services"></script>
<script type="text/javascript" src="/resources/js/default.js"></script>
<script type="text/javascript" src="/resources/js/map.js"></script>
</head>
<%
	request.setAttribute("path", request.getAttribute("javax.servlet.forward.request_uri"));
	request.setAttribute("IMG_URL", "https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/");
%>
<body>
	<input type="hidden" name="sessionId" value="${ loginUser }">
	<input type="hidden" name="auth" value="${ userType }">
	<c:choose>
		<c:when test="${path eq '/store/map'}"></c:when>
		<c:when test="${path eq '/modal/storeView'}"></c:when>
		<c:when test="${path eq '/modal/eventView'}"></c:when>
		<c:when test="${path eq '/modal/postcodeForm'}"></c:when>
		<c:when test="${path eq '/admin/adminMain'}"></c:when>
		<c:otherwise>
			<jsp:include page="./layout/header.jsp" />
		</c:otherwise>
	</c:choose>
	
	<jsp:include page="./layout/content.jsp" />
	
	<c:choose>
		<c:when test="${path eq '/store/map'}"></c:when>
		<c:when test="${path eq '/modal/storeView'}"></c:when>
		<c:when test="${path eq '/modal/eventView'}"></c:when>
		<c:when test="${path eq '/modal/postcodeForm'}"></c:when>
		<c:when test="${path eq '/admin/adminMain'}"></c:when>
		<c:otherwise>
			<jsp:include page="./layout/footer.jsp" />
		</c:otherwise>
	</c:choose>
</body>
</html>