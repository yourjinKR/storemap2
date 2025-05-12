<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=10f41a82abb306f90579f24750879367&libraries=services"></script>
<script type="text/javascript" src="/resources/js/map.js"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript" src="/resources/js/postcode.js"></script>
<div>
	<!--
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
	<br>
	-->
	<c:choose>
    	<c:when test="${(not empty loginUser) and (userType eq 'admin')}">
    		<div>
		    	<form method="post">
		    		<h3>점포 신고 관리</h3>
		                <c:forEach var="srvo" items="${storeReportList}">
		                <hr>
		                    <div>
		                    	<div>신고된 점포: ${srvo.store.store_name}</div>
		                    	<div>신고자 이름: ${srvo.member.member_name}</div>
		                    	<div>신고 카테고리: ${srvo.declaration_category}</div>
		                    	<div>신고 사유: ${srvo.declaration_content}</div>
		                    	<input type="hidden" name="store_idx" value="${srvo.store_idx}">
		                    	<input type="hidden" name="member_idx" value="${srvo.member_idx}">
		                    	<button type="button" id="storeReportHideBtn">숨기기</button>
		                    	<button type="button" id="storeReportRemoveBtn">신고 삭제</button>
		                    </div>
		                </c:forEach>
		                
		            <br><br><hr><br><br>
		            
		            <h3>리뷰 신고 관리</h3>
		            	<c:forEach var="rrvo" items="${reviewReportList}">
		            	<hr>
		            		<div>
		            			<div>신고된 점포: ${rrvo.review.review_title}</div>
		                    	<div>신고자 이름: ${rrvo.member.member_name}</div>
		                    	<div>신고 카테고리: ${rrvo.declaration_category}</div>
		                    	<div>신고 사유: ${srvo.declaration_content}</div>
		                    	<input type="hidden" name="review_idx" value="${rrvo.review_idx}">
		                    	<input type="hidden" name="member_idx" value="${rrvo.member_idx}">
		                    	<button type="button" id="reviewReportHideBtn">숨기기</button>
		                    	<button type="button" id="reviewReportRemoveBtn">신고 삭제</button>
		            		</div>
		            	</c:forEach>
		        </form>
		    </div>
    	</c:when>
    	<c:otherwise>
    		<div><label>관리자 계정으로만 접속 가능합니다!</label></div>
    	</c:otherwise>
    </c:choose>
<script type="text/javascript" src="/resources/js/admin.js"></script>
</div>
