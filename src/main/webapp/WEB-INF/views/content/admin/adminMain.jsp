<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/admin.js"></script>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=10f41a82abb306f90579f24750879367&libraries=services"></script>
<script type="text/javascript" src="/resources/js/map.js"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript" src="/resources/js/postcode.js"></script>
<div>
	<h1>관리자단</h1>

	<div class="map" id="postcode" style="width:500px;height:400px;"></div>
	<div class="form" id="postcode">
		<input type="text" id="postcodeInput" placeholder="우편번호">
		<button id="search-postcode">우편번호 찾기</button><br>
		<input type="text" id="roadAddressInput" placeholder="도로명주소">
		<input type="text" id="jibunAddressInput" placeholder="지번주소">
		<span id="guide" style="color:#999;display:none"></span>
		<input type="text" id="detailAddressInput" placeholder="상세주소">
		<input type="text" id="extraAddressInput" placeholder="참고항목">
	</div>



</div>
