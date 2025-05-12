<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/admin.js"></script>

<div class="admin-wrap">
	<div class="admin-header">
		<div class="left-con">
			<ul class="main-tab">
				<li><a href="member">유저 관리</a></li>
				<li><a href="store" class="on">점포 관리</a></li>
				<li><a href="enter">그룹/기업 관리</a></li>
				<li><a href="event">이벤트 관리</a></li>
			</ul>	
		</div>
		<div class="right-con">
			<a href="/">메인으로</a>
			<p>계정 : 관리자</p>
		</div>
	</div>
	
	<!-- 유저 관리 -->
	<div class="tab-content member-content mt50">
		<jsp:include page="./adminMember.jsp"/>
	</div>
	<!-- 점포 관리 -->
	<div class="tab-content store-content on mt50">
		<jsp:include page="./adminStore.jsp"/>
	</div>
	<!-- 그룹/기업 관리 -->
	<div class="tab-content enter-content mt50">
		<jsp:include page="./adminEnter.jsp"/>
	</div>
	<!-- 이벤트 관리 -->
	<div class="tab-content event-content mt50">
		<jsp:include page="./adminEvent.jsp"/>
	</div>
	
</div>
<%-- 
	<c:choose>
    	<c:when test="${(not empty loginUser) and (userType eq 'admin')}">
    		<div>
		    	<form method="post">
		    		<h3>점포 신고 관리</h3>
		                <c:forEach var="srvo" items="${storeReportList}">
		                <hr>
		                    <div>
		                    	<div>신고된 점포: ${srvo.store.store_name}</div>
		                    	<div>신고자 이름: ${srvo.member.member_name}</div>
		                    	<div>신고 카테고리: ${srvo.declaration_category}</div>
		                    	<div>신고 사유: ${srvo.declaration_content}</div>
		                    	<input type="hidden" name="store_idx" value="${srvo.store_idx}">
		                    	<input type="hidden" name="member_idx" value="${srvo.member_idx}">
		                    	<button type="button" id="storeReportHideBtn">숨기기</button>
		                    	<button type="button" id="storeReportRemoveBtn">신고 삭제</button>
		                    </div>
		                </c:forEach>
		                
		            <br><br><hr><br><br>
		            
		            <h3>리뷰 신고 관리</h3>
		            	<c:forEach var="rrvo" items="${reviewReportList}">
		            	<hr>
		            		<div>
		            			<div>신고된 점포: ${rrvo.review.review_title}</div>
		                    	<div>신고자 이름: ${rrvo.member.member_name}</div>
		                    	<div>신고 카테고리: ${rrvo.declaration_category}</div>
		                    	<div>신고 사유: ${srvo.declaration_content}</div>
		                    	<input type="hidden" name="review_idx" value="${rrvo.review_idx}">
		                    	<input type="hidden" name="member_idx" value="${rrvo.member_idx}">
		                    	<button type="button" id="reviewReportHideBtn">숨기기</button>
		                    	<button type="button" id="reviewReportRemoveBtn">신고 삭제</button>
		            		</div>
		            	</c:forEach>
		        </form>
		    </div>
    	</c:when>
    	<c:otherwise>
    		<div><label>관리자 계정으로만 접속 가능합니다!</label></div>
    	</c:otherwise>
    </c:choose>
<script type="text/javascript" src="/resources/js/admin.js"></script> 
--%>
