<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<ul class="sub-tab">
	<li><a href="list" class="on">점포 리스트</a></li>
	<li><a href="request">점포 신청 리스트</a></li>
	<li><a href="report">신고</a></li>
</ul>	
<div class="sub-tab-content store-list on">
	<ul>
		<li>
			<div><input type="checkbox"></div>
			<div>NO</div>
			<div>점포 고유번호</div>
			<div>점포명</div>
			<div>점포연락처</div>
			<div>업태</div>
			<div>가입일</div>
			<div>누적신고 수</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<% for(int i = 1; i<=10; i++){ %>
		<li>
			<div><input type="checkbox" name="chk<%= i %>"></div>
			<div><%= i %></div>
			<div>00000</div>
			<div>점포<%= i %>호</div>
			<div>010-0000-000</div>
			<div>포장마차</div>
			<div>0000-00-00</div>
			<div>신고 수 : 0</div>
			<div></div>
		</li>
		<% } %>
	</ul>
	
</div>
<div class="sub-tab-content store-request">
	<ul>
		<li>
			<div><input type="checkbox"></div>
			<div>NO</div>
			<div>신청자</div>
			<div>신청자 연락처</div>
			<div>점포명</div>
			<div>점포 연락처</div>
			<div>업태</div>
			<div>사업자등록번호</div>
			<div>사업자 등록증</div>
			<div>신청일시</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<% for(int i = 1; i<=10; i++){ %>
		<li>
			<div><input type="checkbox" name="chk<%= i %>"></div>
			<div><%= i %></div>
			<div>홍길동</div>
			<div>010-0000-0000</div>
			<div>점포 <%= i %>호</div>
			<div>02-0000-0000</div>
			<div>포장마차</div>
			<div>000000</div>
			<div>sample.jpg</div>
			<div>0000-00-00</div>
			<div>
				<div class="btn-box">
					<button class="approve-btn" type="button">승인</button>
					<button class="reject-btn" type="button">반려</button>
				</div>
			</div>
		</li>
		<% } %>
	</ul>

</div>
<div class="sub-tab-content store-report">
	<ul>
		<li>
			<div><input type="checkbox"></div>
			<div>NO</div>
			<div>점포 고유번호</div>
			<div>점포명</div>
			<div>점포연락처</div>
			<div>업태</div>
			<div>가입일</div>
			<div>누적신고 수</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<% for(int i = 1; i<=10; i++){ %>
		<li>
			<div><input type="checkbox" name="chk<%= i %>"></div>
			<div><%= i %></div>
			<div>00000</div>
			<div>
				<!-- href -> idx -->
				<a href="<%= i %>" class="detail-btn">점포<%= i %>호</a>
			</div>
			<div>010-0000-000</div>
			<div>포장마차</div>
			<div>0000-00-00</div>
			<div>신고 수 : 0</div>
			<div>
				<div class="btn-box">
					<button class="approve-btn" type="button">숨김</button>
					<button class="reject-btn" type="button">삭제</button>
				</div>
			</div>
		</li>
		<li class="report-detail" id="idx<%= i %>">
			<ul>
				<li>
					<div>NO</div>
					<div>신고자</div>
					<div>신고내용</div>
				</li>
			</ul>
			<ul>
				<% for(int j = 1; j<=5; j++){ %>
				<li>
					<div><%= j %></div>
					<div>user01</div>
					<div>신고내용신고내용신고내용</div>
				</li>
				<% } %>
			</ul>
		</li>
		<% } %>
	</ul>
</div>