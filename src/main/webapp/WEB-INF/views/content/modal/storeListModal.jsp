<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="storeListModal">
	<div class="store-card">
		<c:forEach var="vo" items="${list}">
			<img src="/resources/img/${vo.store_image}" alt="${vo.store_image}">
			<div class="store-info">
				<div class="store-name">${vo.store_name}</div>
				<div class="store-description">${vo.store_content}</div>
			</div>
			<br>
		</c:forEach>
	</div>
</div>
<script type="text/javascript" src="/resources/js/storeList.js"></script>