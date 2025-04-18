<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script type="text/javascript" src="/resources/js/event.js"></script>
<div class="content-list por mt50">
	<div class="list-top mb30">
		<h3>진행중인 이벤트 리스트</h3>
	</div>
	<div class="board-top d_f">
		<div class="left-con">
			<label for="amount">게시물 개수 : </label>
			<select>
				<option value="">10</option>
				<option value="">20</option>
				<option value="">30</option>
			</select>
			<label for="place">지역선택 : </label>
			<select>
				<option value="">서울</option>
				<option value="">경기</option>
				<option value="">인천</option>
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
			<col width="125px">
			<col width="225px">
			<col width="50px">
		</colgroup>
		<tbody>
			<% for(int i = 0; i < 20; i++){%>
			<tr>
				<td><a href="">텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트텍스트</a></td>
				<td>
					<span class="finsh-icon">
						마감 임박
					</span>
				</td>
				<td><span>0000-00-00 ~ 0000-00-00</span></td>
				<td>
					<input type="checkbox" name="like" id="like-icon<%=i %>">
					<label class="material-symbols-outlined" for="like-icon<%=i %>">
						favorite
					</label>
				</td>
			</tr>
			<% }%>
		</tbody>
	</table>

	<ul class="barod board-card d_f hide" id="card">
		<% for(int i = 0; i < 20; i++){%>
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
</div>

