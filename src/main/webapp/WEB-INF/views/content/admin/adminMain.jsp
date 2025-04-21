<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script type="text/javascript" src="/resources/js/admin.js"></script>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=10f41a82abb306f90579f24750879367"></script>
<script type="text/javascript" src="/resources/js/map.js"></script>
<div>
	<h1>관리자단</h1>

	<div id="mapLab">
		<h1>Map 실험실</h1>
		<div id="map" style="width:500px;height:400px;"></div>
		<br>
		
		<h1>지도 이동 테스트</h1>
		<button id="panToTest">지도 중심좌표 부드럽게 이동시키기</button>
		<button id="markerTest">마커 생성</button>
		<button id="markersGen">마커 리스트에 마커 생성</button>		
		<button id="markersClear">마커 리스트 비우기</button>		
		<button id="markerListView">등록된 마커 보기</button>
		<button id="markerListHide">등록된 마커 숨기기</button>
		<button id="addMarkers">addMarkers</button>
		
		<br>
		<div id="map2" style="width: 1200; height: 800px;"></div>
		<br>


	</div>



</div>
