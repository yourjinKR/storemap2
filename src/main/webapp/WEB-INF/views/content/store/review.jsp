<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- url로 접근 못하게 하기? -->
<div class="review">
	<h1>리뷰등록</h1>
	<c:choose>
		<c:when test="${not empty loginUser}">
			<form method="post">
			  	<input type="hidden" name="store_idx" value="${vo.store_idx}">
			  	<input type="hidden" name="member_idx" value="${loginUserIdx}">
			  	
			    <label for="rtitle">제목</label>
			    <input type="text" id="rtitle" name="review_title">
			
			    <label for="rname">작성자</label>
			    <input type="text" id="rname" name="review_writer" value="${userNickName}" readonly>
			
			    <label for="star">별점</label>
			    <select id="star" name="review_star">
			      <option value="★★★★★">5.0</option>
			      <option value="★★★★☆" selected>4.5</option>
			      <option value="★★★★">4.0</option>
			      <option value="★★★☆">3.5</option>
			      <option value="★★★">3.0</option>
			      <option value="★★☆">2.5</option>
			      <option value="★★">2.0</option>
			      <option value="★☆">1.5</option>
			      <option value="★">1.0</option>
			      <option value="☆">0.5</option>
			    </select>
			
			    <label for="content">리뷰 내용</label>
			    <textarea id="content" name="review_content" placeholder="정말 최고에요!"></textarea>
			
			    <label for="rimage">사진첨부</label>
			    <input type="file" id="rimage" name="review_image">
			    <div id="preview"></div>
			
			    <div class="panel-body-btns">
			    	<button type="button" class="btn btn-sec" id="registerBtn">리뷰 등록</button>
			    	<button type="button" class="btn btn-sec" id="resetBtn">다시 작성</button>
			    	<button type="button" class="btn btn-sec" id="storeBtn">메인으로 이동</button>
			    </div>
			  </form>
			  
			  <div class="saving-overlay" id="savingUI">
				<div class="saving-box">
					<div class="spinner"></div>
					<div class="saving-text">저장 중...</div>
				</div>
			</div>
		</c:when>
		<c:otherwise>
			<div><label>로그인해야 리뷰작성 가능합니다!</label></div>
		</c:otherwise>
	</c:choose>
</div>
<script type="text/javascript" src="/resources/js/review.js"></script>