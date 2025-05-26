<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="main-map">
	<div class="map" id="full" style="width: 100%; height: 900px;"></div>
	<!-- 리스트 사이드바 -->
	<div class="side-bar show" id="list">
		<div id="content">
			<div class="header" id="list">
			  <div class="logo">
			    <a href="/">로고</a>
			  </div>
			
			  <div class="inner">
			    <form class="form" id="map">
			      <input type="text" id="keyword" autocomplete="off" placeholder="장소 및 이벤트 검색">
			      <div class="autocomplete"><ul></ul></div>
			    </form>
			
			    <div id="filter">
			      <button class="mapBtn" id="united-mode">모두</button>
			      <button class="mapBtn" id="event-mode">이벤트만</button>
			      <button class="mapBtn" id="store-mode">점포만</button>
			    </div>
			  </div>
			</div>
			<div id="body">
				<jsp:include page="../modal/storeListModal.jsp"/>
				<jsp:include page="../modal/eventListModal.jsp"/>
				<div class="search-fail" id="united">
					<div id="fail-content">검색 결과가 존재하지 않습니다.</div>
				</div>
				<!-- <button class="mapBtn" id="search-more">결과값 더보기</button> -->				
			</div>
		</div>
	</div>

	<!-- 맵 관련 편의기능 내비게이션 -->
	<div id="map-navigation">
		<button class="mapBtn" id="custom-position">현위치 재설정</button>
		<button class="mapBtn" id="panto-current">현위치 이동</button>
	</div>
	
	<!-- 사이드바 컨트롤러 -->
	<div class="side-bar" id="toggle-box">
		<button class="mapBtn" id="toggle">토글</button>			
	</div>
	
	<!-- 통합 모달 -->
	<div class="side-bar" id="united">
		<div class="modal-header">
			<button class="mapBtn" id="close-united">X</button>
		</div>
		<div class="modal-content" id="united">
			
		</div> 
	</div>
</div>
