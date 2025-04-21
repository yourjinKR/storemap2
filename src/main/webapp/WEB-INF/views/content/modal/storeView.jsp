<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="container">
    <img src="/resources/img/durmy.jpg" alt="가게 이미지" class="store-image">

    <div class="store-info">
      <h3>가게정보</h3>
      <div class="info-text">주소: ${svo.store_address}</div>
      <div class="info-text">영업일: ${svo.store_activity_time}</div>
      <div class="info-text">전화: ${svo.store_num}</div>
    </div>

    <div class="menu-section">
      <h3>메뉴</h3>
      <div class="menu-list">
      	<c:forEach var="mvo" items="${menulist}">
      	
      	</c:forEach>
        <div class="menu-item">
          <img src="/resources/img/durmy2.jpg" alt="음식사진">
          <div class="menu-name">${mvo.menu_name}</div>
          <div class="menu-price">₩${mvo.menu_price}</div>
        </div>
        <div class="menu-item">
          <img src="/resources/img/durmy2.jpg" alt="음식사진">
          <div class="menu-name">된장찌개</div>
          <div class="menu-price">₩8,000</div>
        </div>
        <div class="menu-item">
          <img src="/resources/img/durmy2.jpg" alt="음식사진">
          <div class="menu-name">제육볶음</div>
          <div class="menu-price">₩9,000</div>
        </div>
        <div class="menu-item">
          <img src="/resources/img/durmy2.jpg" alt="음식사진">
          <div class="menu-name">비빔밥</div>
          <div class="menu-price">₩9,000</div>
        </div>
      </div>
    </div>

    <div class="review-section">
      <h3>리뷰</h3>
      <ul class="review">
      	<li data-review_idx="10">
	        <img src="/resources/img/profile.jpg" alt="리뷰어">
	        <div class="review-content">
	          <div class="stars">별점아직만드는중</div>
	          <div class="review-meta">
	          	<strong>작성자</strong> · <small class="">0000.00.00</small></div>
	          <div>내용</div>
	        </div>
        </li>
      </ul>
    </div>
    <!-- 리뷰 입력 만들기? -->
  </div>
<script type="text/javascript" src="/resources/js/storeView.js"></script>