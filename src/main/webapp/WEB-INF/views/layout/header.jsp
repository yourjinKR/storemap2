<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

	아이디 : ${ loginUser.member_id }<br>
	권&emsp;&emsp;한 : ${ userType }
<div class="header d_f">
	<h1>로고</h1>
	<div class="search-bar">
		<input type="text" name="search" placeholder="검색어를 입력해주세요.">
	</div>
	
	<div class="right-div d_f">
		<div class="icon">
			<span>1</span>
			<i class="material-symbols-outlined">
				mail
			</i>
		</div>
		
		<button>로그인</button>
		<button>로그아웃</button>
		<div class="profile">
			<img alt="" src="/resources/img/profile.jpg">			
		</div>
	</div>	
</div>

<jsp:include page="./sideBar.jsp"/>


