<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="reviewRegister">
	<h1>리뷰등록</h1>

  <form>
    <label for="title">제목</label>
    <input type="text" id="title" name="title">

    <label for="author">작성자</label>
    <input type="text" id="author" name="author">

    <label for="rating">평점</label>
    <select id="rating" name="rating">
      <option value="5">5.0</option>
      <option value="4.5" selected>4.5</option>
      <option value="4">4.0</option>
      <option value="3.5">3.5</option>
      <option value="3">3.0</option>
      <option value="2.5">2.5</option>
      <option value="2">2.0</option>
      <option value="1.5">1.5</option>
      <option value="1">1.0</option>
      <option value="0.5">0.5</option>
    </select>

    <label for="review">리뷰 내용</label>
    <textarea id="review" name="review"></textarea>

    <label for="photo">사진첨부</label>
    <input type="file" id="photo" name="photo">

    <button type="submit">리뷰 수정</button>
    <button type="submit">리뷰 삭제</button>
  </form>
</div>
<script type="text/javascript" src="/resources/js/reviewModify.js"></script>