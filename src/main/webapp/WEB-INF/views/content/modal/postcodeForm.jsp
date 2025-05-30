<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript" src="/resources/js/postcode.js"></script>
<div>
    <div class="map" id="postcode" style="width:500px;height:400px;"></div>
    <div class="form" id="postcode">
        <input type="text" name="event_postcode" id="postcodeInput" placeholder="우편번호" required readonly
            <c:if test="${not empty evo.event_postcode}">
                value="${evo.event_postcode}"
            </c:if>
        >
        <span id="postcodeWarning" style="color: red; font-size: 0.9em; display: none;">우편번호는 필수 입력 항목입니다.</span>
        <button class="mapBtn" id="search-postcode" onclick="">우편번호 찾기</button><br>

        <input type="text" name="event_location" id="roadAddressInput" placeholder="도로명주소" readonly
            <c:if test="${not empty evo.event_location}">
                value="${evo.event_location}"
            </c:if>
        >

        <input type="text" id="jibunAddressInput" placeholder="지번주소" readonly>

        <span id="guide" style="color:#999;display:none"></span>

        <input type="text" name="event_location_detail" id="detailAddressInput" placeholder="상세주소"
            <c:if test="${not empty evo.event_location_detail}">
                value="${evo.event_location_detail}"
            </c:if>
        >

        <input type="text" id="extraAddressInput" placeholder="참고항목" readonly>
    </div>
</div>
