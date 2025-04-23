<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/letter.js"></script>

<div class="bg" onclick="modalClose()"></div>
<div class="pop-content" id="letter">
	<div class="inner">
		<h4>쪽지함</h4>
		<ul class="letter-tab mb15 mt15">
			<li><a id="received" href="received" class="on">받은 쪽지함</a></li>
			<li><a id="send" href="send">보낸 쪽지함</a></li>
			<li><a id="write" href="write">쪽지 쓰기</a></li>
		</ul>

		<div class="js-tab-content on" id="list">
			<jsp:include page="../content/modal/letterListModal.jsp"/>
		</div>
		<div class="js-tab-content" id="view">
			<jsp:include page="../content/modal/letterView.jsp"/>
		</div>
		
	</div>	
</div>
