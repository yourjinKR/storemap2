<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/member.js"></script>
<div style="position:absolute; top:50px;left:50px;">
	사용자 :&emsp;&emsp;user01/pw01<br>
	기업/그룹 :&ensp;enter05/pw05<br>	 
	점주 :&emsp;&emsp;&emsp;owner01/pw01<br>	 
	관리자 :&emsp;&emsp;admin/pw01<br>	 
</div>

<c:if test="${not empty loginUser and loginUser ne ''}">
<script type="text/javascript">
	alert("이미 로그인 되었습니다.");
	location.href="/";
</script>
</c:if>
	
<div class="login-wrap d_f">
	<a href="javascript:history.back();" class="back-btn" >
		<span class="material-symbols-outlined">
			undo
		</span>
	</a>
	<div class="left-con ">
		<h3>로그인</h3>
		<form action="/member/login" method="post">
			 <div class="login-form">
				<input type="text" name="id" placeholder="아이디"/>
				<input type="password" name="pw" placeholder="비밀번호"/>
				<button type="submit">로그인</button>
			 </div>
		</form>
		<c:if test="${not empty msg}">
			<p style="color:red;">${msg}</p>
		</c:if>
	</div>
	<div class="right-con">
		<h3>회원이 아니신가요?</h3>
		<p>회원이 아니신가요?</p>
		<div class="btn-box">
			<a href="/member/register?type=personal">일반/점주 회원가입</a>		
			<a href="/member/register?type=group">기관/단체 회원가입</a>		
		</div>
	</div>
</div>
