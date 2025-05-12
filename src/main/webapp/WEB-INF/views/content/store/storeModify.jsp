<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- url로 접근 못하게 하기? -->
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=10f41a82abb306f90579f24750879367&libraries=services"></script>
<script type="text/javascript" src="/resources/js/map.js"></script>
<div class="store">
	<h1>점포관리</h1>
	<!-- Store hidden이 1이면 접근 못하게 하기 컨트롤러? -->
	<c:choose>
		<c:when test="${(not empty loginUser) and (userType eq 'owner') and (loginUserIdx eq vo.member_idx) or (userType eq 'admin')}">
			
		</c:when>
		<c:otherwise>
			<div><label>점포 주인 계정으로만 접속 가능합니다!</label></div>
		</c:otherwise>
	</c:choose>

  <form method="post" id="store-modify">
  	<input type="hidden" name="member_idx" value="${vo.member_idx}">
  	<input type="hidden" name="store_idx" value="${vo.store_idx}">
  
    <label for="sname">점포명</label>
    <input type="text" id="sname" name="store_name" value="${vo.store_name}">
    
    <label for="simage">이미지</label>
	<input type="file" id="simage" name="store_image">
	<!-- 파일업로드 -->
    <div class="file-upload">
      <button type="button">이미지 업로드 수정 필요</button>
      <span>attach_file.jpg</span>
    </div>

    <label for="pnum">연락처</label>
    <input type="text" id="pnum" name="store_num" value="${vo.store_num}">

    <label for="email">이메일</label>
    <input type="text" id="email" name="store_email" value="${vo.store_email}">
    
    <label for="store-loc">위치 설정</label>
    <button class="mapBtn" id="panToCurrent">내 위치</button>
    <div class="map" id="store-loc" style="width:auto; height:400px;"></div>
    
    <input type="text" id="lat" name="store_lat" value="${vo.store_lat}">
    <input type="text" id="lng" name="store_lng" value="${vo.store_lng}">
    
    <label for="address">주소</label>
    <input type="text" id="address" name="store_address" value="${vo.store_address}">
	
	<label for="address">행정코드</label>
    <input type="text" id="regcode" name="store_regcode" value="${vo.store_regcode}">
	
    <label for="area">주요 활동 지역</label>
    <input type="text" id="area" name="store_area" value="${vo.store_area}">
    <%--     <select id="area" name="store_area">
    	<option value="${vo.store_area}" selected hidden>${vo.store_area}</option>
        <option value="서울">서울</option>
        <option value="경기">경기</option>
        <option value="인천">인천</option>
        <option value="강원">강원</option>
        <option value="제주">제주</option>
      </select> --%>


    <label for="activitytime">점포 운영 시간</label>
    <input type="text" id="activitytime" name="store_activity_time" value="${vo.store_activity_time}">

    <label for="content">점포 정보</label>
    <textarea id="content" name="store_content">${vo.store_content}</textarea>
    
    <label for="rnum">사업자번호</label>
    <input type="text" id="rnum" name="store_rnum" value="${vo.store_rnum}">

    <div class="panel-body-btns">
    	<button type="button" class="btn btn-sec" id="menuBtn">메뉴 관리</button>
    	<button type="button" class="btn btn-sec" id="modifyBtn">수정 완료</button>
    	<button type="button" class="btn btn-sec" id="removeBtn">점포 삭제</button>
    	<button type="button" class="btn btn-sec" id="indexBtn">메인으로 이동</button>
    </div>
  </form>
</div>

<script type="text/javascript" src="/resources/js/store.js"></script>