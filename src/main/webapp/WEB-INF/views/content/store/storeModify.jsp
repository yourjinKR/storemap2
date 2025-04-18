<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" type="text/css" href="/resources/css/storeModify.css">
<div>
	<h1>점포관리</h1>

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

    <label for="date">날짜</label>
    <input type="date" id="date" name="date">

    <label for="status">업태</label>
    <select id="status" name="status">
      <option>업태 선택</option>
      <option value="일반음식점">일반음식점</option>
      <option value="휴게음식점">휴게음식점</option>
    </select>

    <label>메뉴추가</label>
    <table class="menu-table">
      <tr>
        <th>메뉴명</th>
        <th>가격</th>
        <th>대표 메뉴 여부 체크박스</th>
      </tr>
      <tr>
        <td><input type="text" value="핫도그"></td>
        <td><input type="text" value="가격"></td>
        <td><input type="checkbox"></td>
      </tr>
    </table>

    <div class="file-upload">
      <button type="button">이미지 추가</button>
      <span>sample.jpg</span>
    </div>

    <button type="submit">점포 등록</button>
  </form>
</div>