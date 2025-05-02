<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="storeView">
	<div class="store-image">
    	<img src="/resources/img/${svo.store_image}" alt="가게 이미지" class="store-image">	
	</div>
	<input type="hidden" name="member_idx" value="${loginUserIdx}">
	<input type="hidden" name="store_idx" value="${svo.store_idx}">

    <div class="store-info">
      <h3>${svo.store_name}</h3>
      <div class="info-text">주소: ${svo.store_address}</div>
      <div class="info-text">영업일: ${svo.store_activity_time}</div>
      <div class="info-text">전화: ${svo.store_num}</div>
      <div class="favorite">
      	<input type="checkbox" name="like" id="like-icon${svo.store_idx}" ${isLiked ? 'checked' : ''}>
      	<label class="material-symbols-outlined" for="like-icon${svo.store_idx}">
      		favorite
      	</label>
      </div>
      <div class="report">
      	<input type="button" name="declaration" id="reportBtn">
      	<label class="material-symbols-outlined" for="reportBtn">
      		notifications
      	</label>
      </div>
    </div>

    <div class="menu-section">
      <h3>메뉴</h3>
      <div class="menu-list">
      	<c:forEach var="mvo" items="${mlist}">
      		<div class="menu-item">
	          <img src="/resources/img/${mvo.menu_image}" alt="${mvo.menu_image}">
	          <div class="menu-name">${mvo.menu_name}</div>
	          <div class="menu-price">₩${mvo.menu_price}</div>
	        </div>
      	</c:forEach>
      </div>
    </div>

    <div class="review-section">
      <h3>리뷰</h3>
      <button type="button" class="rbtn" id="reviewBtn">리뷰 쓰기</button><!-- 버튼css필요 -->
      <div class="review-section-list">
	      <c:forEach var="rvo" items="${rlist}">
	      <ul class="review">
	      	<li>
		  	  <img src="/resources/img/${rvo.writer_image}" alt="${rvo.writer_image}">
		        <div class="review-content">
		          <div class="stars">${rvo.review_star}</div>
		          <div class="review-meta">
		          	<strong>${rvo.review_writer}</strong> · <small class="">${rvo.review_regdate}</small>
		          </div>
		          <div class=""><!-- 제목 css필요 -->
		          	${rvo.review_title}
		          </div>
		          <div class=""><!-- 이미지/내용 css필요 -->
		          	<img src="/resources/img/${rvo.review_image}" alt="${rvo.review_image}">
		          	${rvo.review_content}
		          </div>
		        </div>
	        </li>
	      </ul>
	      </c:forEach>
      </div>
    </div>
</div>
<script type="text/javascript" src="/resources/js/storeModal.js"></script>