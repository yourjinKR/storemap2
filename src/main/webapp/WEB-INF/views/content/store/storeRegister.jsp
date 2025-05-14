<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- url로 접근 못하게 하기? -->
<div class="store">
	<h1>점포등록</h1>
	<c:choose>
		<c:when test="${(not empty loginUser) and (userType eq 'user')}">
		  <form method="post" enctype="multipart/form-data">
		  	<input type="hidden" name="member_idx" value="${loginUserIdx}">
		  
		    <label for="sname">점포명</label>
		    <input type="text" id="sname" name="store_name">
		    
		    <label for="simage">이미지</label>
			<input type="file" id="simage" name="store_image">
		
		    <label for="pnum">연락처</label>
		    <input type="text" id="pnum" name="store_num" placeholder="000-000-0000">
		
		    <label for="email">이메일</label>
		    <input type="text" id="email" name="store_email">
		    
		    <label for="address">주소</label>
		    <input type="text" id="address" name="store_address" placeholder="서울 강남구 1번지">
		
		    <label for="area">활동 지역</label>
		    <input type="text" id="area" name="store_area" value="서울">
		
		    <label for="activitytime">점포 운영 시간</label>
		    <input type="text" id="activitytime" name="store_activity_time" placeholder="09:00~20:30">
		
		    <label for="content">점포 정보</label>
		    <textarea id="content" name="store_content">내용</textarea>
		    
		    <label for="rnum">사업자번호</label>
		    <input type="text" id="rnum" name="store_rnum">
		    
		    <div class="panel-body-btns">
		    	<button type="button" class="btn btn-sec" id="registerBtn">점포 등록</button>
		    	<button type="button" class="btn btn-sec" id="resetBtn">다시 작성</button>
		    	<button type="button" class="btn btn-sec" id="indexBtn">메인으로 이동</button>
		    </div>
		  </form>
		</c:when>
		<c:otherwise>
			<div><label>일반 유저 계정으로만 접속 가능합니다!</label></div>
		</c:otherwise>
	</c:choose>
<script type="text/javascript" src="/resources/js/store.js"></script>

</div>