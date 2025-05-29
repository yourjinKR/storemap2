<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:if test="${(empty loginUser) or (loginUserIdx ne vo.member_idx) or (userType ne 'owner') or (vo.store_hidden eq 1)}">
	<script>
		alert("점포주인만 이용 가능합니다. 로그인 해 주세요.");
		location.href="/";
	</script>
</c:if>

<a href="javascript:history.back();" class="back-btn" >
	<span class="material-symbols-outlined">
		undo
	</span>
</a>
<div class="store">
	<h3>점포관리</h3>

  <form method="post" id="store-modify">
  	<input type="hidden" name="store_idx" value="${vo.store_idx}">
  	<input type="hidden" name="member_idx" value="${vo.member_idx}">
    <input type="hidden" id="lat" name="store_lat" value="${vo.store_lat}">
    <input type="hidden" id="lng" name="store_lng" value="${vo.store_lng}">
    
    <div class="store-state open">
    	<span>CLOSE</span>
   	</div>
    
 	<table>
 		<colgroup>
 			<col width="175px;">
 			<col width="*">
 		</colgroup>
 		<tbody>
 			<tr>
 				<th><label for="sname">점포명</label></th>
 				<td><input type="text" id="sname" name="store_name" value="${vo.store_name}"></td>
 			</tr>
 			<tr>
 				<th><label for="pnum">연락처</label></th>
 				<td><input type="text" id="pnum" name="store_num" value="${vo.store_num}"></td>
 			</tr>
 			<tr>
 				<th><label for="email">이메일</label></th>
 				<td><input type="text" id="email" name="store_email" value="${vo.store_email}"></td>
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
 				<td><input type="text" id="address" name="store_address" value="${vo.store_address}" readonly></td>
 			</tr>
 			<tr class="hide">
 				<th><label for="regcode">행정코드</label></th>
 				<td><input type="text" id="regcode" name="store_regcode" value="${vo.store_regcode}" readonly></td>
 			</tr>
 			<tr>
 				<th><label for="area">주요 활동 지역</label></th>
 				<td><input type="text" id="area" name="store_area" value="${vo.store_area}"></td>
 			</tr>
 			<tr>
 				<th><label for="activitytime">점포 운영 시간</label></th>
 				<td><input type="text" id="activitytime" name="store_activity_time" value="${vo.store_activity_time}"></td>
 			</tr>
 			<tr>
 				<th class="v-t"><label for="content">점포 정보</label></th>
 				<td><textarea id="content" name="store_content">${vo.store_content}</textarea></td>
			</tr>
 			<tr>
 				<th><label for="rnum">사업자번호</label></th>
 				<td><input type="text" id="rnum" name="store_rnum" value="${vo.store_rnum}"></td>
			</tr>
			<tr>
 				<th>대표 이미지</th>
 				<td>
 					<input type="file" id="simage" name="store_image">
					<div id="preview">
						<label for="simage">
							<c:choose>
								<c:when test="${vo.attach != null && vo.attach.filename != null}">
									<img alt="프로필" src="${vo.attach.url}">
								</c:when>
								<c:otherwise>
									<img alt="프로필" src="${IMG_URL}NoImage_pdlhxd.jpg">
								</c:otherwise>
							</c:choose>
						</label>
					</div>
 				</td>
 			</tr>
 		</tbody>
	</table>
    
    <div class="panel-body-btns">
    	<c:choose>
			<c:when test="${vo.store_open eq 0}">
				<button type="button" class="btn btn-sec" id="startBtn">영업 시작</button>
			</c:when>
			<c:when test="${vo.store_open eq 1}">
				<button type="button" class="btn btn-sec" id="stopBtn">영업 종료</button>
			</c:when>
		</c:choose>
    	<button type="button" class="btn btn-sec" id="menuBtn">메뉴 관리</button>
    	<button type="button" class="btn btn-sec" id="removeBtn">페&emsp;업</button>
    	<button type="button" class="btn btn-sec" id="modifyBtn">수정 완료</button>
    	<button type="button" class="btn btn-sec" id="indexBtn">메인으로 이동</button>
    </div>
  </form>
</div>

<div class="saving-overlay" id="savingUI">
	<div class="saving-box">
		<div class="spinner"></div>
		<div class="saving-text">저장 중...</div>
	</div>
</div>

<script type="text/javascript" src="/resources/js/store.js"></script>