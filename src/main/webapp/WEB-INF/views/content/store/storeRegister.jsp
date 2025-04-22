<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="storeRegister">
	<h1>점포등록</h1>

  <form method="post">
  	<input type="hidden" name="member_idx" value="${loginUserIdx}"><!-- $안에 옳바른idx세션값넣기 -->
  
    <label for="sname">점포명</label>
    <input type="text" id="sname" name="store_name">

    <label for="pnum">연락처</label>
    <input type="text" id="pnum" name="store_num" placeholder="000-000-0000">

    <label for="email">이메일</label>
    <input type="text" id="email" name="store_email">
    
    <label for="address">주소</label>
    <input type="text" id="address" name="store_address" placeholder="서울 강남구 1번지">

    <label for="area">활동 지역</label>
    <select id="area" name="store_area">
        <option value="서울">서울</option>
        <option value="경기">경기</option>
        <option value="인천">인천</option>
        <option value="강원">강원</option>
        <option value="제주">제주</option>
      </select>

    <label for="activitytime">점포 운영 시간</label>
    <input type="text" id="activitytime" name="store_activity_time" placeholder="09:00~20:30">

    <label for="content">점포 정보</label>
    <textarea id="content" name="store_content">내용</textarea>
    
    <label for="rnum">사업자번호</label>
    <input type="text" id="rnum" name="store_rnum">
    <!-- 파일업로드 -->
    <div class="file-upload">
      <button type="button">이미지 추가</button>
      <span>sample.jpg</span>
    </div>
    
    <div class="panel-body-btns">
    	<button type="button" class="btn btn-sec" id="registerBtn">점포 등록</button>
    	<button type="button" class="btn btn-sec" id="resetBtn">다시 작성</button>
    	<button type="button" class="btn btn-sec" id="indexBtn">메인으로 이동</button>
    </div>
  </form>
<script type="text/javascript" src="/resources/js/storeRegister.js"></script>
</div>