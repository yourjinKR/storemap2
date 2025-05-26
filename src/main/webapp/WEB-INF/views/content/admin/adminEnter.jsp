<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<ul class="sub-tab">
	<li><a href="request" class="on">기업 등록</a></li>
</ul>
<!-- 기업 등록 탭 -->
<div class="sub-tab-content enter-request">
	<ul>
		<li>
			<div>idx</div>
			<div>NO</div>
			<div>신청기업</div>
			<div>기업 연락처</div>
			<div>기업 주소</div>
			<div>사업자등록번호</div>
			<div>신청일시</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<c:forEach var="elvo" items="${enterRequestList}" varStatus="status">
			<li>
				<div class="idx">${elvo.enter_idx}</div>
				<div>${status.count}</div>
				<div>${elvo.enter.enter_name}</div>
				<div>${elvo.enter.enter_num}</div>
				<div>${elvo.enter.enter_loc}</div>
				<div>${elvo.enter.enter_rnum}</div>
				<div>${elvo.regdate}</div>
				<div>
					<div class="btn-box">
						<button type="button" id="enterApprovalBtn" class="approve-btn">기업 등록</button>
						<button type="button" id="enterDisallowBtn" class="reject-btn">기업 불허</button>
					</div>
				</div>
			</li>
		</c:forEach>
	</ul>
</div>