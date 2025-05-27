<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:if test="${(empty loginUser) or (userType ne 'user')}">
	<script>
		alert("관리자만 이용 가능합니다. 로그인 해 주세요.");
		location.href="/";
	</script>
</c:if>
<a href="javascript:history.back();" class="back-btn" >
	<span class="material-symbols-outlined">
		undo
	</span>
</a>
<div class="store">
	<h3>점포등록</h3>
		<form method="post" enctype="multipart/form-data">
			<input type="hidden" name="member_idx" value="${loginUserIdx}">
			<table>
		 		<colgroup>
		 			<col width="155px;">
		 			<col width="*">
		 		</colgroup>
		 		<tbody>
		 			<tr>
		 				<th> <label for="sname">점포명</label></th>
		 				<td><input type="text" id="sname" name="store_name" placeholder="점포 이름"></td>
		 			</tr>
		 			<tr>
		 				<th><label for="pnum">연락처</label></th>
		 				<td><input type="text" id="pnum" name="store_num" placeholder="000-000-0000"></td>
		 			</tr>
		 			<tr>
		 				<th><label for="email">이메일</label></th>
		 				<td><input type="text" id="email" name="store_email" placeholder="example@email.com"></td>
		 			</tr>
		 			<tr>
		 				<th class="v-t"><label for="store-loc">위치 설정</label></th>
		 				<td class="t-r">
						    <div class="map" id="store-loc" style="height:400px;"></div>
						    <button class="mapBtn" id="panto-current">현위치</button>
		 				</td>
		 			</tr>
		 			<tr>
		 				<th><label for="address">주소</label></th>
		 				<td><input type="text" id="address" name="store_address" placeholder="서울 강남구 1번지"></td>
		 			</tr>
		 			<tr>
		 				<th><label for="area">활동 지역</label></th>
		 				<td><input type="text" id="area" name="store_area" placeholder="ex) 서울"></td>
		 			</tr>
		 			<tr>
		 				<th><label for="activitytime">운영 시간</label></th>
		 				<td><input type="text" id="activitytime" name="store_activity_time" placeholder="09:00~20:30"></td>
		 			</tr>
		 			<tr>
		 				<th class="v-t"><label for="content">점포 정보</label></th>
		 				<td><textarea id="content" name="store_content" placeholder="점포 설명을 적어주세요."></textarea></td>
					</tr>
		 			<tr>
		 				<th><label for="rnum">사업자번호</label></th>
		 				<td><input type="text" id="rnum" name="store_rnum"></td>
					</tr>
					<tr>
		 				<th>대표 이미지</th>
		 				<td>
							<input type="file" id="simage" name="store_image">
							<div id="preview">
								<label for="simage"><img alt="프로필" src="${IMG_URL}NoImage_pdlhxd.jpg"></label>
							</div>
		 				</td>
		 			</tr>
		 		</tbody>
			</table>
			
		    <div class="panel-body-btns">
		    	<button type="button" class="btn btn-sec" id="registerBtn">점주 신청</button>
		    	<button type="button" class="btn btn-sec" id="resetBtn">다시 작성</button>
		    	<button type="button" class="btn btn-sec" id="indexBtn">메인으로 이동</button>
		    </div>
		</form>
		  
		  <div class="saving-overlay" id="savingUI">
			<div class="saving-box">
				<div class="spinner"></div>
				<div class="saving-text">저장 중...</div>
			</div>
		</div>
<script type="text/javascript" src="/resources/js/store.js"></script>

</div>