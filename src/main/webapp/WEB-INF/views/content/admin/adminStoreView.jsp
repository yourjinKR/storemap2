<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
	<h1>점포 관리</h1>
    <hr>
    <c:choose>
    	<c:when test="${(not empty loginUser) and (userType eq 'admin')}">
    		<div>
		    	<form method="post">
		            <c:forEach var="rvo" items="${storeRequestList}">
		                <div>
		                	<div>${rvo.member.member_name}님의 ${rvo.store.store_name}</div>
		                    <input type="hidden" name="member_idx" value="${rvo.member.member_idx}">
		                    <button type="button" id="storeApprovalBtn">점포 승인</button>
		                    <button type="button" id="storeDisallowBtn">점포 불허</button>
		                </div>
		                <br>
		            </c:forEach>
		        </form>
		    </div>
    	</c:when>
    	<c:otherwise>
    		<div><label>관리자 계정으로만 접속 가능합니다!</label></div>
    	</c:otherwise>
    </c:choose>
<script type="text/javascript" src="/resources/js/admin.js"></script>
</div>