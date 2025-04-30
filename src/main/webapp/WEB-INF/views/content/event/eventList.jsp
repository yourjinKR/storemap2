<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/event.js"></script>

<div class="content-list por mt50">
	<div class="list-top mb30">
		<h3>진행중인 이벤트 리스트</h3>
	</div>
	<div class="board-top d_f mb15">
		<div class="left-con">
			<label for="amount">게시물 개수 : </label> 
			<select id="amount">
				<option value="20" selected>20</option>
				<option value="30">30</option>
				<option value="40">40</option>
				<option value="50">50</option>
			</select> 
		</div>
		<div class="right-con d_f">
			<div class="board-type d_f">
				<div>
					<input type="checkbox" name="b-type" id="filterChk" value="list">
					<label for="filterChk"> <span
						class="material-symbols-outlined"> filter_alt </span> 필터
					</label>
				</div>
				<div>
					<input type="radio" name="b-type" id="list-chk" value="list"
						checked="checked"> <label for="list-chk"> <span
						class="material-symbols-outlined"> view_list </span>
					</label>
				</div>
				<div>
					<input type="radio" name="b-type" id="card-chk" value="card">
					<label for="card-chk"> <span
						class="material-symbols-outlined"> view_column_2 </span>
					</label>
				</div>
			</div>
			<div class="search">
				<label for="board-search">검색 : </label> <input type="text"
					id="board-search">
				<button>검색</button>
			</div>
		</div>
	</div>

	<ul class="filter">
		<li>
			<h4>
				정렬 <span class="material-symbols-outlined"> swap_vert </span>
			</h4>
			<input type="radio" name="sort" id="event_bstopdate" checked> <label for="event_bstopdate">행사 종료일</label>
			<input type="radio" name="sort" id="event_rstopdate" > <label for="event_rstopdate">입점 마감일</label>
		</li>
		<li>
			<h4>일정</h4> 
			<input type="checkbox" id="eventBdate" checked> 
			<label for="eventBdate">행사 진행일</label> 
			<input type="checkbox" id="eventRdate"> 
			<label for="eventRdate">입점 신청일</label> 
		</li>
		<li>
			<h4>지역</h4> 
		</li>
		<li><button type="button" onclick="eventFilter();" >적용</button></li>
	</ul>
	<table class="barod board-list" id="eventList">
		<colgroup>
			<col width="*">
			<col width="100px">
			<col width="250px">
			<col width="250px">
		</colgroup>
		<tbody>
			
		</tbody>
	</table>

	<ul class="barod board-card d_f hide" id="card">
		<%
			for (int i = 0; i < 40; i++) {
		%>
		<li class="card-box">
			<div class="card-img por">
				사진 <img alt="" src=""> <span class="finsh-icon"> 마감 </span> <span
					class="event-date">0000-00-00 ~ 0000-00-00</span>
			</div>
			<div class="card-text">
				3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지
			</div>
		</li>
		<%
			}
		%>
	</ul>

	<!-- page -->
	<div class="page-wrap">
		<ul class="page-nation" data-pageNum="${pageMaker.cri.pageNum}"
			data-amount="${pageMaker.cri.amount}">
			<c:if test="${pageMaker.prev }">
				<li class="previous"><a href="${pageMaker.startPage-1 }">
						&lt; </a></li>
			</c:if>
			<c:forEach var="num" begin="${pageMaker.startPage }"
				end="${pageMaker.endPage }" step="1">
				<li><a href="${num}"
					class="${pageMaker.cri.pageNum == num ? 'active' : '' }"> ${num }
				</a></li>
			</c:forEach>
			<c:if test="${pageMaker.next }">
				<li><a href="${pageMaker.endPage+1 }"> &gt; </a></li>
			</c:if>
		</ul>
	</div>
</div>

