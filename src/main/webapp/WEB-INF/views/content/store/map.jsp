<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=10f41a82abb306f90579f24750879367&libraries=services"></script>
<script type="text/javascript" src="/resources/js/map.js"></script>
<div>
	<div class="map" id="full" style="width: 100%; height: 900px;"></div>
	<!-- 점포 리스트 사이드바 -->
	<div class="side-bar" id="store-list">
		<div id="content">
			<div class="header" id="store-list">
				<div class="logo">
					로고
				</div>
				<form class="form" id="map">
					<input type="text" id="keyword">
					<button class="mapBtn" id="search">검색</button>
				</form>		
			</div>
			<div id="body">
				<jsp:include page="../modal/storeListModal.jsp"/>		
			</div>
		</div>
	</div>
	<!-- 사이드바 컨트롤러 -->
	<div class="side-bar" id="toggle-box">
		<button class="mapBtn" id="toggle">토글</button>			
	</div>
</div>
