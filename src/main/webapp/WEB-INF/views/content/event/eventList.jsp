<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/board.js"></script>
<script type="text/javascript" src="/resources/js/event.js"></script>


<div class="content-list por mt50 pb50">
	<div class="list-top mb30">
		<c:choose>
			<c:when test="${(not empty loginUser) and (userType ne 'user')}">
				<h3>모집중/모집예정 중인 이벤트</h3>
			</c:when>
			<c:otherwise>
				<h3>진행중인 이벤트 리스트</h3>
			</c:otherwise>
		</c:choose>
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
			<div class="select-box">
				<label for="eLocation">지역 : </label> 
				<select id="eLocation">
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
			<c:if test="${(empty loginUser) or (userType eq 'user')}">
				<div><input type="checkbox" id="lCount" value="lCount"><label for="lCount">좋아요 순</label></div>
			</c:if>
		</div>
		<div class="right-con d_f">
			<c:if test="${(not empty loginUser) and (userType ne 'user')}">
				<div class="board-type d_f">
					<div>
						<input type="checkbox" name="b-type" id="filterChk" value="list">
						<label for="filterChk"> <span
							class="material-symbols-outlined"> filter_alt </span> 필터
						</label>
					</div>
				</div>
			</c:if>
			<div class="search">
				<label for="boardSearch">검색 : </label> 
				<input type="text" id="boardSearch">
				<button onclick="eventFilter();">검색</button>
			</div>
		</div>
	</div>
			
	<ul class="board-tab mb5">
		<c:choose>
			<c:when test="${(not empty loginUser) and (userType ne 'user')}">
				<li><a href="open" class="on">모집중/모집예정 중인 이벤트</a></li>
				<li><a href="end">모집 종료된 이벤트</a></li>
			</c:when>
			<c:otherwise>
				<li><a href="open" class="on">진행중인 이벤트</a></li>
				<li><a href="planned">예정된 이벤트 </a></li>
				<li><a href="end">종료된 이벤트</a></li>
			</c:otherwise>
		</c:choose>
	</ul>

	<c:choose>
		<c:when test="${(not empty loginUser) and (userType ne 'user')}">
			<ul class="filter">
				<li>
					<h4>
						정렬 <span class="material-symbols-outlined"> swap_vert </span>
					</h4>
					<input type="radio" name="sort" id="event_bstopdate" ${loginUser eq null || userType eq 'user' ? 'checked' : ''}> <label for="event_bstopdate">행사 종료일</label>
					<c:if test="${(not empty loginUser) and (userType ne 'user')}">
						<input type="radio" name="sort" id="event_rstopdate" ${userType eq 'enter' || userType eq 'owner' ? 'checked' : ''}> <label for="event_rstopdate">입점 마감일</label>
					</c:if>
				</li>
				<li>
					<h4>일정</h4> 
					<input type="checkbox" id="eventBdate" checked> 
					<label for="eventBdate">행사 진행일</label> 
					<c:if test="${(not empty loginUser) and (userType ne 'user')}">
						<input type="checkbox" id="eventRdate" checked> 
						<label for="eventRdate">입점 신청일</label> 
					</c:if>
				</li>
				<li><button type="button" onclick="eventFilter();" >적용</button></li>
			</ul>
	
			<table class="barod board-list" id="boardList">
				<colgroup>
					<col width="155px">
					<col width="*">
					<col width="100px">
					<col width="250px">
					<col width="250px">
				</colgroup>
				<thead>
					<tr>
						<th>지역</th>
						<th>이벤트명</th>
						<th>모집</th>
						<th class="rdate-head">모집 기간</th>
						<th class="bdate-head">이벤트 기간</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</c:when>
		<c:otherwise>
		</c:otherwise>
	</c:choose>
	

	<ul class="barod board-card d_f" id="boardCard">
	
	</ul>
	<div class="btn-box">
		<c:if test="${not empty loginUserIdx and userType eq 'enter'}">
			  <button type="button" class="eventBtn" id="registerBtn" onclick="location.href='/event/eventRegister'">
			   	 이벤트 등록
			  </button>
		</c:if>
	</div>
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

