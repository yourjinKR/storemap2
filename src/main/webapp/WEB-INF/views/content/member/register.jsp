<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/register.js"></script>
<script type="text/javascript" src="/resources/js/member.js"></script>
<div class="member-wrap">
	<c:choose>
		<c:when test="${type == 'personal'}">
			<div>
				<h3>일반/점주 회원가입</h3>
				<form id="registerForm" data-type="${type}" action="/member/register/personal" method="post">
					<table>
						<colgroup>
							<col width="145px">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><label for="member_id">아이디</label></th>
								<td>
									<div>
										<input type="text" name="member_id" id="member_id" placeholder="4~12자리 입력"/>
										<button type="button" id="duplicateCkBtn">중복확인</button>
									</div>
									<span id="mIdValidState"></span>
								</td>
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
								<td>
									<input type="text" name="member_name" id="member_name" placeholder="2~12자리 입력"/>
									<span id="mnameValidState"></span>
								</td>
							</tr>
							<tr>
								<th><label for="member_nickname">닉네임</label></th>
								<td>
									<input type="text" name="member_nickname" id="member_nickname" placeholder="2~12자리 입력"/>
									<span id="mnicknameValidState"></span>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="btn-box">
						<button type="button" id="registBtn">가입하기</button>
						<button type="reset" id="resetBtn">다시작성</button>
					</div>
				</form>
			</div>
		</c:when>
		<c:when test="${type == 'group'}">
			<div>
				<h3>기관/단체 회원가입</h3>
				<form id="registerForm" data-type="${type}" action="/member/register/group" method="post">
					<table>
						<colgroup>
							<col width="145px">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><label for="enter_id">아이디</label></th>
								<td>
									<div>
										<input type="text" name="enter_id" id="enter_id" placeholder="4~12자리 입력"/>
										<button type="button" id="duplicateCkBtn">중복확인</button>
									</div>
									<span id="IdValidState"></span>
								</td>
							</tr>
							<tr>
								<th><label for="enter_pw">비밀번호</label></th>
								<td>
									<input type="password" name="enter_pw" id="enter_pw" placeholder="8~16자리 입력"/>
									<span id="PwValidState"></span>
								</td>
							</tr>
							<tr>
								<th><label for="enter_pw_re">비밀번호 확인</label></th>
								<td>
									<input type="password" name="enter_pw_re" id="enter_pw_re" placeholder="같은 비밀번호 입력"/>
									<span id="PwReValidState"></span>
								</td>
							</tr>
							<tr>
								<th><label for="enter_name">상호명</label></th>
								<td>
									<input type="text" name="enter_name" id="enter_name" placeholder="2~12자리 입력"/>
									<span id="nameValidState"></span>
								</td>
							</tr>
							<tr>
								<th><label for="enter_rnum">사업자번호</label></th>
								<td>
									<input type="text" name="enter_rnum" id="enter_rnum" placeholder="숫자만 입력"/>
									<span id="rnumValidState"></span><br>
								</td>
							</tr>
							<tr>
								<th><label for="enter_loc">소재지</label></th>
								<td>
									<input type="text" name="enter_loc" id="enter_loc" placeholder="주소입력"/>
									<span id="locValidState"></span>
								</td>
							</tr>
							<tr>
								<th><label for="enter_num">대표 연락처</label></th>
								<td>
									<input type="text" name="enter_num" id="enter_num" placeholder="숫자만 입력"/>
									<span id="numValidState"></span>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="btn-box">
						<button type="button" id="registBtn">가입하기</button>
						<button type="reset" id="resetBtn">다시작성</button>
					</div>
				</form>
			</div>
		</c:when>
		<c:otherwise>
	    	<h1>타입 값이 잘못되었습니다.</h1>
	  	</c:otherwise>
	</c:choose>
</div>

