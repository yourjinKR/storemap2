<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://kit.fontawesome.com/030a3d9abb.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script type="text/javascript" src="/resources/js/default.js"></script>
</head>
<%
	request.setAttribute("path", request.getAttribute("javax.servlet.forward.request_uri"));
%>
<body>
	<jsp:include page="./layout/header.jsp" /><br>
	<jsp:include page="./layout/content.jsp" /><br>
	<jsp:include page="./layout/footer.jsp" />
</body>
</html>