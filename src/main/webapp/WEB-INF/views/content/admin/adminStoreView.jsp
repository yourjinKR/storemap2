<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
	<h1>점포 관리</h1>
    <hr>
    <div>
    	<form method="post">
                <c:forEach var="vo" items="${reqList}">
                	<label>승인DB에 멤버 이름 추가해서 여기에 멤버idx 대신 member_name 넣으면 어떻나요.</label>
                    <div>member_idx: ${vo.member_idx}&nbsp;&nbsp;
                    	<input type="hidden" name="member_idx" value="${vo.member_idx}">
                    	<button type="button" id="registerBtn">점포 승인</button>
                    	<button type="button" id="removeBtn">점포 불허</button>
                    </div>
                    <br>
                </c:forEach>
        </form>
    </div>
<script type="text/javascript" src="/resources/js/admin.js"></script>
</div>