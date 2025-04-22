<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/event.js"></script>

<div class="content-list por mt50">
	<div class="list-top mb30">
		<h3>진행중인 이벤트 리스트</h3>
	</div>
	<div class="board-top d_f">
		<div class="left-con">
			<label for="amount">게시물 개수 : </label>
			<select>
				<option value="10">10</option>
				<option value="20" selected>20</option>
				<option value="30">30</option>
			</select>
			<label for="place-select">지역 : </label> 
			<select id="place-select">
				<option value="전체">전체</option>
				<option value="서울">서울</option>
				<option value="경기">경기</option>
				<option value="인천">인천</option>
				<option value="강원">강원</option>
				<option value="충청남도">충남</option>
				<option value="대전">대전</option>
				<option value="충청북도">충북</option>
				<option value="부산">부산</option>
				<option value="울산">울산</option>
				<option value="대구">대구</option>
				<option value="경상북도">경북</option>
				<option value="경상남도">경남</option>
				<option value="전라남도">전남</option>
				<option value="광주">광주</option>
				<option value="전라북도">전북</option>
				<option value="제주">제주</option>
			</select>
		</div>
		<div class="right-con d_f">
			<div class="board-type d_f">
				<div>
					<input type="radio" name="b-type" id="list-chk" value="list" checked="checked">
					<label for="list-chk">
						<span class="material-symbols-outlined">
							lists
						</span>
					</label>
				</div>
				<div>
					<input type="radio" name="b-type" id="card-chk" value="card">
					<label for="card-chk">
						<span class="material-symbols-outlined">
							view_column_2
						</span>
					</label>
				</div>
			</div>		
			<div class="search">
				<label for="board-search">검색 : </label>
				<input type="text" id="board-search">
				<button>검색</button>
			</div>
	 	</div>
	</div>
	<table class="barod board-list" id="list">
		<colgroup>	
			<col width="*">
			<col width="100px">
			<col width="250px">
			<col width="50px">
		</colgroup>
		<tbody>
			<c:forEach var="vo" items="${ list }">
				<tr data-idx="${vo.event_idx}">
					<td><a href="${vo.event_idx}">${vo.event_title}</a></td>
					<td>
						<span class="finsh-icon">마감 임박</span>
					</td>
					<td class="t-l">
						<span>입점 신청 : ${vo.event_rstartdate} ~ ${vo.event_rstopdate}</span>
						<%-- <span>이벤트 : ${vo.event_bstartdate} ~ ${vo.event_bstopdate}</span> --%>
					</td>
					<td>
						<input type="checkbox" name="like" id="like-icon${vo.event_idx}">
						<label class="material-symbols-outlined" for="like-icon${vo.event_idx}">
							favorite
						</label>
					</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>

	<ul class="barod board-card d_f hide" id="card">
		<% for(int i = 0; i < 40; i++){%>
			<li class="card-box">
				<div class="card-img por">
					사진
					<img alt="" src="">
					<span class="finsh-icon">
						마감
					</span>
					<span class="event-date">0000-00-00 ~ 0000-00-00</span>
				</div>
				<div class="card-text">
					3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지3줄까지
				</div>
			</li>
		<% }%>
	</ul>
	
	<!-- page -->
	<div class="page-wrap">
	   <ul class="page-nation" data-pageNum="${pageMaker.cri.pageNum}" data-amount="${pageMaker.cri.amount}">
	      <c:if test="${pageMaker.prev }">
	         <li class="previous">
	            <a href="${pageMaker.startPage-1 }"> &lt; </a>
	         </li>
	      </c:if>
	      <c:forEach var="num" begin="${pageMaker.startPage }" end="${pageMaker.endPage }" step="1">
	         <li>
	            <a href="" class="${pageMaker.cri.pageNum == num ? 'active' : '' }"> ${num } </a>
	         </li>
	      </c:forEach>
	      <c:if test="${pageMaker.next }">
	         <li><a href="${pageMaker.endPage+1 }"> &gt; </a></li>
	      </c:if>
	   </ul>
	</div>
</div>

