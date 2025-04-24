<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="reviewModify">
	<h1>리뷰수정</h1>

  <form method="post">
  	<input type="hidden" name="store_idx" value="${vo.store_idx}">
  
    <label for="rtitle">제목</label>
    <input type="text" id="rtitle" name="review_title" value="${vo.review_title}">

    <label for="rname">작성자</label>
    <input type="text" id="rname" name="review_writer" value="${vo.review_writer}">
    <!--<input type="text" id="rname" name="review_writer" value="${userNickName}" readonly>
-->
    <label for="star">별점</label>
    <select id="star" name="review_star">
      <option value="${vo.review_star}" selected hidden>${vo.review_star}</option>
      <option value="5">5.0</option>
      <option value="4.5">4.5</option>
      <option value="4">4.0</option>
      <option value="3.5">3.5</option>
      <option value="3">3.0</option>
      <option value="2.5">2.5</option>
      <option value="2">2.0</option>
      <option value="1.5">1.5</option>
      <option value="1">1.0</option>
      <option value="0.5">0.5</option>
    </select>

    <label for="content">리뷰 내용</label>
    <textarea id="content" name="review_content">${vo.review_content}</textarea>

    <label for="rimage">사진첨부</label>
    <input type="text" id="rimage" name="review_image" value="${vo.review_image}" readonly>

    <div class="panel-body-btns">
    	<button type="button" class="btn btn-sec" id="modifyBtn">리뷰 수정</button>
    	<button type="button" class="btn btn-sec" id="removeBtn">리뷰 삭제</button>
    	<button type="button" class="btn btn-sec" id="storeBtn">점포로 이동</button>
    </div>
  </form>
</div>
<script type="text/javascript" src="/resources/js/reviewModify.js"></script>