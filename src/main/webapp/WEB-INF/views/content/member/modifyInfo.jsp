<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/modifyInfo.js"></script>

<c:if test="${empty loginUser and loginUser eq ''}">
<script type="text/javascript">
	alert("잘못된 접근입니다.");
	history.back();
</script>
</c:if>

<div class="member-wrap">
	<a href="javascript:history.back();" class="back-btn" >
		<span class="material-symbols-outlined">
			undo
		</span>
	</a>
	<c:choose>
		<c:when test="${type == 'personal'}">
			<div>
				<h3>일반/점주 개인정보 수정</h3>
				<form id="ModifyForm" data-type="${type}" method="post">
					<input type="hidden" name="member_idx" value="${loginUserIdx}"/>
					<table>
						<colgroup>
							<col width="145px">
							<col width="*">
						</colgroup>
						<tbody>
							<tr> 
								<th><label for="member_nickname">닉네임</label></th>
								<td>
									<div class="d_f">
										<div>
											<input type="text" id="member_nickname" name="member_nickname" value="${member_nickname}"/>
											<span id="mnicknameValidState"></span>
										</div>
										<div class="profile">
											<label for="profileImg">
												<c:choose>
													<c:when test="${sessionScope.userFilename eq ''}">
														<img src="${IMG_URL}NoMember_pgeszi.jpg" alt="${sessionScope.userImage}" data-original-src="${IMG_URL}NoMember_pgeszi.jpg"/>
													</c:when>
													<c:otherwise>
														<img src="${IMG_URL}${sessionScope.userImage}_${sessionScope.userFilename}" alt="${sessionScope.userFilename}" data-original-src="${IMG_URL}${sessionScope.userImage}_${sessionScope.userFilename}"/>
													</c:otherwise>
												</c:choose>		
											</label>
											<input type="file" name="member_image" id="profileImg" accept="image/*">
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th><label for="member_id">아이디</label></th>
								<td><input type="text" id="member_id" name="member_id" value="${member_id}" readonly="readonly"/></td>
							</tr>
							<tr>
								<th><label for="member_pw">비밀번호</label></th>
								<td>
									<input type="password" name="member_pw" id="member_pw" placeholder="8~16자리 입력"/>
									<span id="mPwValidState"></span>
								</td>
							</tr>
							<tr>
								<th><label for="member_pw_re">비밀번호 확인</label></th>
								<td>
									<input type="password" name="member_pw_re" id="member_pw_re" placeholder="같은 비밀번호 입력"/>
									<span id="mPwReValidState"></span>
								</td>
							</tr>
							<tr>
								<th><label for="member_name">이름</label></th>
								<td><input type="text" id="member_name" name="member_name" value="${member_name}" readonly="readonly"/></td>
							</tr>
						</tbody>
					</table>
					<div class="btn-box">
						<button type="button" id="modifyBtn">수정하기</button>
						<button type="reset" id="resetBtn">다시작성</button>
						<button onclick="location.href='/member/delete'" class="delete-btn">회원탈퇴</button>
					</div>
				</form>
			</div>
		</c:when>
		<c:when test="${type == 'group'}">
			<div>
				<h3>기관/단체 정보 수정</h3>
				<form id="ModifyForm" data-type="${type}" method="post">
					<input type="hidden" name="enter_idx" value="${loginUserIdx}"/>
					<table>
						<colgroup>
							<col width="145px">
							<col width="*">
						</colgroup>
						<tbody>
							<tr> 
								<th><label for="enter_id">아이디</label></th>
								<td>
									<div class="d-f">
										<input type="text" id="enter_id" name="enter_id" value="${enter_id}" readonly="readonly"/>
										<div class="profile">
											<label for="profileImg">
												<c:choose>
													<c:when test="${vo.attach.filename eq null}">
														<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747123330/NoMember_pgeszi.jpg" alt="${sessionScope.userImage}"/>
													</c:when>
													<c:otherwise>
														<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747123330/${sessionScope.userImage}_${sessionScope.userFilename}" alt="${sessionScope.userFilename}"/>
													</c:otherwise>
												</c:choose>		
											</label>
											<input type="file" name="enter_image" id="profileImg">
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th><label for="enter_pw">비밀번호</label></th>
								<td>
									<input type="password" name="enter_pw" id="enter_pw" placeholder="8~16자리 입력"/>
									<span id="ePwValidState"></span>
								</td>
							</tr>
							<tr>
								<th><label for="enter_pw_re">비밀번호 확인</label></th>
								<td>
									<input type="password" name="enter_pw_re" id="enter_pw_re" placeholder="같은 비밀번호 입력"/>
									<span id="ePwReValidState"></span>
								</td>
							</tr>
							<tr>
								<th><label for="enter_name">상호명</label></th>
								<td>
									<input type="text" id="enter_name" name="enter_name" value="${enter_name}" readonly="readonly"/>
								</td>
							</tr>
							<tr>
								<th><label for="enter_rnum">사업자번호</label></th>
								<td>
									<input type="text" id="enter_rnum" name="enter_rnum" value="${enter_rnum}" readonly="readonly"/>
								</td>
							</tr>
							
							<tr>
								<th><label for="enter_loc">소재지</label></th>
								<td>
									<input type="text" id="enter_loc" name="enter_loc" value="${enter_loc}" readonly="readonly"/>
									<span id="locValidState"></span>
								</td>
							</tr>
							<tr>
								<th><label for="enter_num">대표 연락처 </label></th>
								<td>
									<input type="text" name="enter_num" value="${enter_num}" readonly="readonly"/>
								</td>
							</tr>
							
						</tbody>
					</table>
					<div class="btn-box">
						<button type="button" id="modifyBtn">수정하기</button>
						<button type="reset" id="resetBtn">다시작성</button>
					</div>
				</form>
				<div class="btn-box">
					<button onclick="location.href='/member/delete'" class="delete-btn">회원탈퇴</button>
				</div>
			</div>
		</c:when>
		<c:otherwise>
	    	<h1>타입 값이 잘못되었습니다.</h1>
	  	</c:otherwise>
	</c:choose>
</div>