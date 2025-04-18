<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" type="text/css" href="/resources/css/storeRegister.css">
<div>
	<h1>점포등록</h1>

  <form>
    <label for="company">업체명</label>
    <input type="text" id="company" name="company">

    <label for="contact">연락처</label>
    <input type="text" id="contact" name="contact">

    <label for="email">이메일</label>
    <input type="email" id="email" name="email">

    <label>활동 지역</label>
    <div class="checkbox-group">
      <label><input type="checkbox" name="region" value="서울"> 서울</label>
      <label><input type="checkbox" name="region" value="경기"> 경기</label>
      <label><input type="checkbox" name="region" value="인천"> 인천</label>
      <label><input type="checkbox" name="region" value="강원"> 강원</label>
      <label><input type="checkbox" name="region" value="제주"> 제주</label>
    </div>

    <label for="people">인원?</label>
    <input type="text" id="people" name="people">

    <label for="date">날짜</label>
    <input type="date" id="date" name="date">

    <label for="status">업태</label>
    <div class="row-between">
      <select id="status" name="status">
        <option>업태 선택</option>
        <option value="일반음식점">일반음식점</option>
        <option value="휴게음식점">휴게음식점</option>
      </select>
      <span class="business-link">사업자 번호 추가</span>
    </div>

    <button type="submit">점포 등록</button>
  </form>
</div>