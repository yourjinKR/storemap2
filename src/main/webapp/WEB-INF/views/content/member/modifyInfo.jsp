<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
	<c:choose>
		<c:when test="${type == 'personal'}">
			<h1>일반/점주 개인정보 수정</h1>
			<br>
			<form id="ModifyForm" data-type="${type}" method="post">
				<div class="profile">
					<c:choose>
						<c:when test="${vo.attach.filename eq null}">
							<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747123330/NoMember_pgeszi.jpg" alt="${sessionScope.userImage}"/>
						</c:when>
						<c:otherwise>
							<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747123330/${sessionScope.userImage}_${sessionScope.userFilename}" alt="${sessionScope.userFilename}"/>
						</c:otherwise>
					</c:choose>		
				</div>
				<p>
					사진 변경: 
					<input type="file" name="member_image">
				</p>
				<input type="hidden" name="member_idx" value="${loginUserIdx}"/>
				<p>
					아이디: 
					<input type="text" name="member_id" value="${member_id}" readonly="readonly"/>
				</p>
				<p>
					비밀번호: 
				 	<input type="password" name="member_pw" id="member_pw" placeholder="8~16자리 입력"/>
					<span id="mPwValidState"></span>
			 	</p>
				<p>
					비밀번호 확인 : 
					<input type="password" name="member_pw_re" id="member_pw_re" placeholder="같은 비밀번호 입력"/>
					<span id="mPwReValidState"></span>
				</p>
				<p>
					이름: 
					<input type="text" name="member_name" value="${member_name}" readonly="readonly"/>
				</p>
				<p>
					별명: 
					<input type="text" name="member_nickname" value="${member_nickname}"/>
					<span id="mnicknameValidState"></span>
				</p>
				<button type="button" id="modifyBtn">수정하기</button>
				<button type="reset" id="resetBtn">다시작성</button>
			</form>
			<button onclick="location.href='/member/delete'">회원탈퇴</button>
		</c:when>
		<c:when test="${type == 'group'}">
			<h1>기관/단체 정보 수정</h1>
			<br>
			<form id="ModifyForm" data-type="${type}" method="post">
				<div class="profile">
					<c:choose>
						<c:when test="${vo.attach.filename eq null}">
							<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747123330/NoMember_pgeszi.jpg" alt="${sessionScope.userImage}"/>
						</c:when>
						<c:otherwise>
							<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747123330/${sessionScope.userImage}_${sessionScope.userFilename}" alt="${sessionScope.userFilename}"/>
						</c:otherwise>
					</c:choose>				
				</div>
				<p>
					사진 변경: 
					<input type="file" name="enter_image">
				</p>
				<input type="hidden" name="enter_idx" value="${loginUserIdx}"/>
				<p>아이디 
					<input type="text" name="enter_id" value="${enter_id}" readonly="readonly"/>
				</p>
				<p>비밀번호 
					<input type="password" name="enter_pw" id="enter_pw" placeholder="8~16자리 입력"/>
					<span id="ePwValidState"></span>
				</p>
				<p>비밀번호 확인 
					<input type="password" name="enter_pw_re" id="enter_pw_re" placeholder="같은 비밀번호 입력"/>
					<span id="ePwReValidState"></span>
				</p>
				<p>상호명 
					<input type="text" name="enter_name" value="${enter_name}" readonly="readonly"/>
				</p>
				<p>사업자번호 
					<input type="text" name="enter_rnum" value="${enter_rnum}" readonly="readonly"/>
				</p>
				<p>소재지 
					<input type="text" name="enter_loc" value="${enter_loc}" readonly="readonly"/>
					<span id="locValidState"></span>
				</p>
				<p>대표 연락처 
					<input type="text" name="enter_num" value="${enter_num}" readonly="readonly"/>
				</p>
				<button type="button" id="modifyBtn">수정하기</button>
				<button type="reset" id="resetBtn">다시작성</button>
			</form>
			<button onclick="location.href='/member/delete'">회원탈퇴</button>
		</c:when>
		<c:otherwise>
	    	<h1>타입 값이 잘못되었습니다.</h1>
	  	</c:otherwise>
	</c:choose>
</div>
<script type="text/javascript" src="/resources/js/modifyInfo.js"></script>