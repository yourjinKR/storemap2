<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:if test="${(empty loginUser) or (userType eq 'enter')}">
	<script>
		alert("일반/점주 계정으로 로그인해야 이용 가능합니다. 로그인 해 주세요.");
		location.href="/member/login";
	</script>
</c:if>
<a href="javascript:history.back();" class="back-btn" >
	<span class="material-symbols-outlined">
		undo
	</span>
</a>
<div class="review">
	<h3>리뷰등록</h3>
		<form method="post">
			 <input type="hidden" name="store_idx" value="${vo.store_idx}">
			 <input type="hidden" name="member_idx" value="${loginUserIdx}">
			 <table>
		 		<colgroup>
		 			<col width="175px;">
		 			<col width="*">
		 		</colgroup>
		 		<tbody>
		 			<tr>
		 				<th><label for="rtitle">제목</label></th>
		 				<td><input type="text" id="rtitle" name="review_title"></td>
		 			</tr>
		 			<tr>
		 				<th><label for="rname">작성자</label></th>
		 				<td><input type="text" id="rname" name="review_writer" value="${userNickName}" readonly></td>
		 			</tr>
		 			<tr>
		 				<th><label for="star">별점</label></th>
		 				<td>
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
		 				</td>
		 			</tr>
		 			<tr>
		 				<th class="v-t"><label for="content">리뷰 내용</label></th>
		 				<td><textarea id="content" name="review_content" placeholder="정말 최고에요!"></textarea></td>
		 			</tr>
		 			<tr>
		 				<th><label for="simage">사진첨부</label></th>
		 				<td>
		 					<input type="file" id="simage" name="review_image">
			 				
		 				</td>
		 			</tr>
		 			<tr>
		 				<th></th>
		 				<td><div id="preview"></div></td>
		 			</tr>
		 		</tbody>
			</table> 	
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
</div>
<script type="text/javascript" src="/resources/js/review.js"></script>