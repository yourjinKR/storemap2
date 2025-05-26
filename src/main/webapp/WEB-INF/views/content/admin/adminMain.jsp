<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/admin.js"></script>

<c:if test="${(empty loginUser) or (userType ne 'admin')}">
	<script>
		alert("관리자만 이용 가능합니다. 로그인 해 주세요.");
		location.href="/";
	</script>
</c:if>

<div class="admin-wrap">

	<c:choose>
    	<c:when test="${(not empty loginUser) and (userType eq 'admin')}">
    		<div>
    			<div class="admin-header">
					<div class="left-con">
						<ul class="main-tab">
							<li><a href="member">유저 관리</a></li>
							<li><a href="store" class="on">점포 관리</a></li>
							<li><a href="enter">그룹/기업 관리</a></li>
							<li><a href="event">이벤트 관리</a></li>
						</ul>	
					</div>
					<div class="right-con">
						<a href="/">메인으로</a>
						<p>계정 : 관리자</p>
					</div>
				</div>
				
				<!-- 유저 관리 -->
				<div class="tab-content member-content mt50">
					<jsp:include page="./adminMember.jsp"/>
				</div>
				<!-- 점포 관리 -->
				<div class="tab-content store-content on mt50">
					<jsp:include page="./adminStore.jsp"/>
				</div>
				<!-- 그룹/기업 관리 -->
				<div class="tab-content enter-content mt50">
					<jsp:include page="./adminEnter.jsp"/>
				</div>
				<!-- 이벤트 관리 -->
				<div class="tab-content event-content mt50">
					<jsp:include page="./adminEvent.jsp"/>
				</div>
		    </div>
    	</c:when>
    	<c:otherwise>
    		<div><label>관리자 계정으로만 접속 가능합니다!</label></div>
    	</c:otherwise>
    </c:choose>
	
</div>