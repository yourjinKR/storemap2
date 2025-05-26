<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:if test="${(empty loginUser) or (loginUserIdx ne vo.member_idx) or (userType ne 'owner') or (vo.store_hidden eq 1)}">
	<script>
		alert("점포주인만 이용 가능합니다. 로그인 해 주세요.");
		location.href="/";
	</script>
</c:if>

<div class="store">
	<h1>점포관리</h1>

  <form method="post" id="store-modify">
  	<input type="hidden" name="store_idx" value="${vo.store_idx}">
  	<input type="hidden" name="member_idx" value="${vo.member_idx}">
  
    <label for="sname">점포명</label>
    <input type="text" id="sname" name="store_name" value="${vo.store_name}">
    
    <label for="simage">이미지</label>
	<input type="file" id="simage" name="store_image">
	<div id="preview"></div>

    <label for="pnum">연락처</label>
    <input type="text" id="pnum" name="store_num" value="${vo.store_num}">

    <label for="email">이메일</label>
    <input type="text" id="email" name="store_email" value="${vo.store_email}">
    
    <label for="store-loc">위치 설정</label>
    <button class="mapBtn" id="panto-current">현위치</button>
    <div class="map" id="store-loc" style="width:auto; height:400px;"></div>
    
    <input type="text" id="lat" name="store_lat" value="${vo.store_lat}">
    <input type="text" id="lng" name="store_lng" value="${vo.store_lng}">
    
    <label for="address">주소</label>
    <input type="text" id="address" name="store_address" value="${vo.store_address}">
	
	<label for="regcode">행정코드</label>
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
    	<c:choose>
			<c:when test="${vo.store_open eq 0}">
				<button type="button" class="btn btn-sec" id="startBtn">점포 시작</button>
			</c:when>
			<c:when test="${vo.store_open eq 1}">
				<button type="button" class="btn btn-sec" id="stopBtn">점포 철수</button>
			</c:when>
			<c:otherwise>
				<div><label>관리자에게 숨김처리 당함</label></div>
			</c:otherwise>
		</c:choose>
    	<button type="button" class="btn btn-sec" id="menuBtn">메뉴 관리</button>
    	<button type="button" class="btn btn-sec" id="modifyBtn">수정 완료</button>
    	<button type="button" class="btn btn-sec" id="removeBtn">점주 취소</button>
    	<button type="button" class="btn btn-sec" id="indexBtn">메인으로 이동</button>
    </div>
  </form>
</div>

<div class="saving-overlay" id="savingUI">
	<div class="saving-box">
		<div class="spinner"></div>
		<div class="saving-text">저장 중...</div>
	</div>
</div>

<script type="text/javascript" src="/resources/js/store.js"></script>