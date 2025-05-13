<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/letter.js"></script>

<div class="bg" onclick="modalClose()"></div>
<div class="pop-content" id="letter">
	<h4>쪽지함</h4>
	<ul class="letter-tab mb15 mt15">
		<li><a class="received on" href="received">받은 쪽지함</a></li>
		<li><a class="send" href="send">보낸 쪽지함</a></li>
		<c:if test="${userType ne 'user'}">
			<li><a class="write" href="write">쪽지 쓰기</a></li>
		</c:if>
		<li><a class=question href="question">문의 하기</a></li>
	</ul>

	<div class="js-tab-content on" id="list">
		<jsp:include page="../content/modal/letterListModal.jsp"/>
	</div>
	<div class="js-tab-content" id="view">
		<jsp:include page="../content/modal/letterView.jsp"/>
	</div>
	<div class="js-tab-content" id="write">
		<jsp:include page="../content/modal/letterWrite.jsp"/>
	</div>
</div>
