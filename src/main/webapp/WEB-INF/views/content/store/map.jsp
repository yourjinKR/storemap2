<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/admin.js"></script>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=10f41a82abb306f90579f24750879367&libraries=services"></script>
<script type="text/javascript" src="/resources/js/map.js"></script>
<div>
	<!-- 지도 -->
    <div id="mapLab">
<!--  		<div id="clickLatlng" style="width: 1200; height: 80px;"></div>
		<button id="panToTest">지도 중심좌표 부드럽게 이동시키기</button>
		<button id="markerTest">마커 생성</button>
		<button id="markersGen">마커 리스트에 마커 생성</button>		
		<button id="markersClear">마커 리스트 비우기</button>
		<button id="markersLog">마커 리스트 요소 확인</button>				
		<button id="markerListView">등록된 마커 보기</button>
		<button id="markerListHide">등록된 마커 숨기기</button>
		<button id="markerViewTest0">idx 0번 가게 보기</button>
		<button id="markerViewTest1">idx 1번 가게 보기</button>
		<button id="showMapSideBar">사이드바 열기</button>	
		<button id="hideMapSideBar">사이드바 닫기</button>	
		<br> -->
		<div id="map2" style="width: 1200; height: 1200px;"></div>
	</div>
	<!-- 점포 리스트 사이드바 -->
	<div class="side-bar" id="store-list">
		<div id="content">
			<div class="header">
				<form>
					<input type="text">
					<button type="submit">검색</button>
				</form>		
			</div>
			<jsp:include page="../modal/storeListModal.jsp"/>
		</div>
		<div class="side-bar" id="store">
			<!-- 점포 상세보기 사이드바 -->
			<div><button class="btn" id="close-store">X</button></div>
			<jsp:include page="../modal/storeView.jsp">
				<jsp:param value="1" name="store_idx"/>
			</jsp:include>
		</div>
	</div>
	<!-- 사이드바 리모컨 -->
	<div class="side-bar" id="toggle-box">
		<button id="toggle">토글</button>			
	</div>
</div>
