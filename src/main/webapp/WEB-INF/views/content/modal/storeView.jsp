<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${svo.store_hidden eq 1}">
	<script>
		alert("숨겨진 점포 입니다.");
		location.href="/store/map";
	</script>
</c:if>

<div class="storeView">
	<div class="store-status ${svo.store_open eq 0 ? 'closed' : 'open'}">
  		${svo.store_open eq 0 ? 'CLOSE' : 'OPEN'}
	</div>
	<div class="store-image">
		<c:choose>
			<c:when test="${svo.attach.filename eq null}">
				<img src="${IMG_URL}NoImage_pdlhxd.jpg" alt="사진이 없습니다!"/>
			</c:when>
			<c:otherwise>
				<img src="${IMG_URL}${svo.store_image}_${svo.attach.filename}" alt="${svo.attach.filename}"/>
			</c:otherwise>
		</c:choose>
	</div>
	<input type="hidden" name="member_idx" value="${loginUserIdx}">
	<input type="hidden" name="store_idx" value="${svo.store_idx}">
	<input type="hidden" name="userType" value="${userType}">

    <div class="store-info por">
      <h3>${svo.store_name}</h3>
      <div class="storeIcon">
      	<input type="button" name="storeReport" id="storeReport-icon${svo.store_idx}">
      	<label class="material-symbols-outlined" for="storeReport-icon${svo.store_idx}">
      		report
      	</label>
      	<input type="checkbox" name="storeLike" id="storeLike-icon${svo.store_idx}" ${storeLiked ? 'checked' : ''}>
      	<label class="material-symbols-outlined" for="storeLike-icon${svo.store_idx}">
      		favorite
      	</label>
      	<span class="storeLike-count storeLike-count-${svo.store_idx}">${svo.store_like_cnt}</span>
      </div>
      <div class="info-text">주소: ${svo.store_address}</div>
      <div class="info-text">영업일: ${svo.store_activity_time}</div>
      <div class="info-text">전화: ${svo.store_num}</div>
    </div>

    <div class="menu-section">
      <h3>메뉴</h3>
      <div class="menu-list">
      	<c:forEach var="mvo" items="${mlist}">
      		<div class="menu-item">
      		 <c:choose>
      		 	<c:when test="${mvo.attach.filename eq null}">
      		 		<img src="${IMG_URL}NoImage_pdlhxd.jpg" alt="사진이 없습니다!"/>
      		 	</c:when>
      		 	<c:otherwise>
      		 		<img src="${IMG_URL}${mvo.menu_image}_${mvo.attach.filename}" alt="${mvo.attach.filename}"/>
      		 	</c:otherwise>
      		 </c:choose>
	          <div class="menu-name">${mvo.menu_name}</div>
	          <div class="menu-price">₩${mvo.menu_price}</div>
	        </div>
      	</c:forEach>
      </div>
    </div>

    <div class="review-section">
      <h3>리뷰</h3>
      <button type="button" class="rbtn" id="reviewBtn">리뷰 쓰기</button>
      <div class="review-section-list">
	      <c:forEach var="rvo" items="${rlist}">
	      <c:choose>
	      	<c:when test="${rvo.review_hidden eq 0}"><!-- 1은 숨겨진 리뷰 -->
		      <ul class="review por">
		      	<li>
		      	<div class="reviewIcon">
			    	<input type="button" name="reviewReport" id="reviewReport-icon${rvo.review_idx}">
			      	<label class="material-symbols-outlined" for="reviewReport-icon${rvo.review_idx}">
			      		report
			      	</label>
			      	<input type="checkbox" name="reviewLike" id="reviewLike-icon${rvo.review_idx}" ${reviewLikedMap[rvo.review_idx] ? 'checked' : ''}>
			      	<label class="material-symbols-outlined" for="reviewLike-icon${rvo.review_idx}">
			      		favorite
			      	</label>
			      	<span class="reviewLike-count reviewLike-count-${rvo.review_idx}">${rvo.review_like_cnt}</span>
			    </div>
			    <div class="writer-img">
			     <c:choose>
			     	<c:when test="${rvo.writer_filename eq null}">
			     		<img src="${IMG_URL}NoMember_pgeszi.jpg" alt="사진이 없습니다!"/>
			     	</c:when>
			     	<c:otherwise>
			     		<img src="${IMG_URL}${rvo.member_image}_${rvo.writer_filename}" alt="${rvo.writer_filename}"/>
			     	</c:otherwise>
			     </c:choose>
			    </div>
			        <div class="review-content">
			          <div class="stars">${rvo.review_star}</div>
			          <div class="review-meta">
			          	<strong>${rvo.review_writer}</strong> · <small>${rvo.review_regdate}</small>
			          </div>
			          <div class="review-title">
			          	${rvo.review_title}
			          </div>
			          <div class="review-img">
			           <c:choose>
			           	<c:when test="${rvo.review_filename eq null}">
			           	</c:when>
			           	<c:otherwise>
			           		<img src="${IMG_URL}${rvo.review_image}_${rvo.review_filename}" alt="${rvo.review_filename}"/>
			           	</c:otherwise>
			           </c:choose>
			          	${rvo.review_content}
			          </div>
			        </div>
		        </li>
		      </ul>
	      	</c:when>
	      </c:choose>
	      </c:forEach>
      </div>
    </div>
    <!-- 점포 신고 모달 -->
    <div id="store-report-selection">
    	<div class="store-report-content">
    		<h3>점포 신고하기</h3>
			<div>
			  <label><input type="radio" name="declaration_category" value="위생 문제" checked> 위생 문제</label><br>
			  <label><input type="radio" name="declaration_category" value="메뉴 변경"> 메뉴 변경</label><br>
			  <label><input type="radio" name="declaration_category" value="가격 문제"> 가격 문제</label><br>
			  <label><input type="radio" name="declaration_category" value="음식 품질"> 음식 품질</label><br>
			  <label><input type="radio" name="declaration_category" value="음식 냄새"> 음식 냄새</label><br>
			  <label><input type="radio" name="declaration_category" value="조리 과정 문제"> 조리 과정 문제</label><br>
			  <label><input type="radio" name="declaration_category" value="불친절한 서비스"> 불친절한 서비스</label><br>
			  <label><input type="radio" name="declaration_category" value="운영시간 문제"> 운영시간 무제</label><br>
			  <label><input type="radio" name="declaration_category" value="불완전한 메뉴"> 불완전한 메뉴</label><br>
			  <label><input type="radio" name="declaration_category" value="기타"> 기타</label>
			</div>
			<div>
			  <textarea name="declaration_content" placeholder="신고 내용을 입력하세요" style="resize: none;"></textarea>
			</div>
			<button type="button" class="add_report" id="storeReportBtn">신고 제출</button>
		</div>
    </div>
    <!-- 리뷰 신고 모달 -->
    <div id="review-report-selection">
    	<div class="review-report-content">
    		<h3>리뷰 신고하기</h3>
			<div>
			  <label><input type="radio" name="declaration_category" value="욕설" checked> 욕설</label><br>
			  <label><input type="radio" name="declaration_category" value="허위 정보"> 허위 정보</label><br>
			  <label><input type="radio" name="declaration_category" value="비방"> 비방</label><br>
			  <label><input type="radio" name="declaration_category" value="광고"> 광고</label><br>
			  <label><input type="radio" name="declaration_category" value="개인정보 노출"> 개인정보 노출</label><br>
			  <label><input type="radio" name="declaration_category" value="중복 리뷰"> 중복 리뷰</label><br>
			  <label><input type="radio" name="declaration_category" value="음란성"> 음란성</label><br>
			  <label><input type="radio" name="declaration_category" value="비속어"> 비속어</label><br>
			  <label><input type="radio" name="declaration_category" value="도배"> 도배</label><br>
			  <label><input type="radio" name="declaration_category" value="기타"> 기타</label>
			</div>
			<div>
			  <textarea name="declaration_content" placeholder="신고 내용을 입력하세요" style="resize: none;"></textarea>
			</div>
			<button type="button" class="add_report" id="reviewReportBtn">신고 제출</button>
		</div>
    </div>
</div>
<script type="text/javascript" src="/resources/js/storeModal.js"></script>