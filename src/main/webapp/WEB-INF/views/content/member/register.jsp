<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
	</head>
	<body>
		<div>
			<c:choose>
				<c:when test="${type == 'personal'}">
					<h1>일반/점주 회원가입</h1>
					<br>
					<form id="registerForm" data-type="${type}" action="/member/register/personal" method="post">
						<p>
							아이디
							<input type="text" name="member_id" id="member_id" placeholder="4~12자리 입력"/>
							<button type="button" id="duplicateCkBtn">중복확인</button>
							<span id="mIdValidState"></span>
						</p>
						<p>
							비밀번호
						 	<input type="password" name="member_pw" id="member_pw" placeholder="8~16자리 입력"/>
							<span id="mPwValidState"></span>
					 	</p>
						<p>
							비밀번호 확인 
							<input type="password" name="member_pw_re" id="member_pw_re" placeholder="같은 비밀번호 입력"/>
							<span id="mPwReValidState"></span>
						</p>
						<p>
							이름
							<input type="text" name="member_name" id="member_name" placeholder="2~12자리 입력"/>
							<span id="mnameValidState"></span>
						</p>
						<p>
							별명 
							<input type="text" name="member_nickname" id="member_nickname" placeholder="2~12자리 입력"/>
							<span id="mnicknameValidState"></span>
						</p>
						<button type="button" id="registBtn">가입하기</button>
						<button type="reset" id="resetBtn">다시작성</button>
					</form>
				</c:when>
				<c:when test="${type == 'group'}">
					<h1>기관/단체 회원가입</h1>
					<br>
					<form id="registerForm" data-type="${type}" action="/member/register/group" method="post">
						<p>아이디 
							<input type="text" name="enter_id" id="enter_id" placeholder="4~12자리 입력"/>
							<button type="button" id="duplicateCkBtn">중복확인</button>
							<span id="IdValidState"></span>
						</p>
						<p>비밀번호 
							<input type="password" name="enter_pw" id="enter_pw" placeholder="8~16자리 입력"/>
							<span id="PwValidState"></span>
						</p>
						<p>비밀번호 확인 
							<input type="password" name="enter_pw_re" id="enter_pw_re" placeholder="같은 비밀번호 입력"/>
							<span id="PwReValidState"></span>
						</p>
						<p>상호명 
							<input type="text" name="enter_name" id="enter_name" placeholder="2~12자리 입력"/>
							<span id="nameValidState"></span>
						</p>
						<p>사업자번호 
							<input type="text" name="enter_rnum" id="enter_rnum" placeholder="숫자만 입력"/>
							<span id="rnumValidState"></span><br>
							<!-- <div class="uploadDiv">
								<input type="file" name="enter_image" id="enter_image" multiple="multiple">
							</div>
							<div class="uploadResult">
					        	<ol></ol>
					        </div> -->
						</p>
						<p>소재지 
							<input type="text" name="enter_loc" id="enter_loc" placeholder="주소입력"/>
							<span id="locValidState"></span>
						</p>
						<p>대표 연락처 
							<input type="text" name="enter_num" id="enter_num" placeholder="숫자만 입력"/>
							<span id="numValidState"></span>
						</p>
						<button type="button" id="registBtn">가입하기</button>
						<button type="reset" id="resetBtn">다시작성</button>
					</form>
				</c:when>
				<c:otherwise>
			    	<h1>타입 값이 잘못되었습니다.</h1>
			  	</c:otherwise>
			</c:choose>
		</div>
	<script type="text/javascript" src="/resources/js/register.js"></script>
	<!-- <script type="text/javascript" src="/resources/js/registerUpload.js"></script> -->
	</body>
</html>
