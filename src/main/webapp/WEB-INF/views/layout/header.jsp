<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="header d_f">
	<h1><a href="/">Eventore</a></h1>
	<div class="form" id="map">
		<div class="search-bar">
			<input type="text" name="keyword" placeholder="검색어를 입력해주세요.">
			<div class="autocomplete">
				<ul>
				</ul>		
			</div>
		</div>	
	</div>
	
	<div class="right-div d_f">
		<c:choose>
			<c:when test="">
			</c:when>
			<c:otherwise>
			</c:otherwise>
		</c:choose>
		<c:if test="${loginUser ne null}">
			<div class="icon" onclick="modalShow('letter')">
				<span>0</span>
				<i class="material-symbols-outlined">
					mail
				</i>
			</div>
		</c:if>
		
		<c:choose>
			<c:when test="${loginUser ne null}">
				<a class="btn" id="hlogoutLink" href="/member/login">로그아웃</a>
				<div class="profile">
					<c:choose>
						<c:when test="${sessionScope.userFilename eq 'member1.jpg'}">
							<img src="${IMG_URL}NoMember_pgeszi.jpg" alt="${sessionScope.userImage}"/>
						</c:when>
						<c:otherwise>
							<img src="${IMG_URL}${sessionScope.userImage}_${sessionScope.userFilename}" alt="${sessionScope.userFilename}"/>
						</c:otherwise>
					</c:choose>			
				</div>
			</c:when>
			<c:otherwise>
				<a class="btn" href="/member/login">로그인</a>
			</c:otherwise>
		</c:choose>
		<c:if test="${loginUser eq null}">
		<button type="button" class="side-btn">
			<span class="material-symbols-outlined">
				menu
			</span>
		</button> 
		</c:if>
	</div>	
</div>

<div class="right-nav">
	<ul>
		<li><a href="/event/eventList">이벤트</a></li>
		<li><a href="/admin/notice">공지사항</a></li>
		<li><a class="topScroll">TOP ▲</a></li>
	</ul>
</div>

<jsp:include page="./sideBar.jsp"/>
<jsp:include page="./letter.jsp"/>


