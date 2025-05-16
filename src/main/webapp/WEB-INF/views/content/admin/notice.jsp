<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/board.js"></script>

<div class="content-list por mt50">
	<div class="list-top mb30">
		<h3>공지사항</h3>
	</div>
	
	<div class="board-top d_f mb15">
		<div class="left-con d_f">
			<div>
				<label for="amount">게시물 개수 : </label> 
				<select id="amount">
					<option value="20" selected>20</option>
					<option value="30">30</option>
					<option value="40">40</option>
					<option value="50">50</option>
				</select>
			</div>
		</div>
		<div class="right-con d_f">
			<div class="search">
				<label for="boardSearch">검색 : </label> 
				<input type="text" id="boardSearch">
				<button onclick="getNotice();">검색</button>
			</div>
		</div>
	</div>
	
	<table class="barod board-list" id="boardList">
		
		<thead>
			<tr>
				<c:if test="${userType eq 'admin'}">
					<th>고정</th>
				</c:if>
				<th>번호</th>
				<th>제목</th>
				<th>내용</th>
			</tr>
		</thead>
		<tbody>
			
		</tbody>
	</table>
	
	<c:if test="${userType eq 'admin'}">
		<div class="btn-box">
			<a href="#" onclick="noticeFixed()">저장</a>
			<a href="/admin/noticeWrite">글쓰기</a>
		</div>
	</c:if>

	<!-- page -->
	<div class="page-wrap">
		
	</div>
</div>

