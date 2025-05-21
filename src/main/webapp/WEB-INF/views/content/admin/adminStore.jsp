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
			<div>점포사진</div>
			<div>점포명</div>
			<div>점포 연락처</div>
			<div>점포 주소</div>
			<div>사업자등록번호</div>
			<div>사업자 등록증</div>
			<div>신청일시</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<c:forEach var="rvo" items="${storeRequestList}" varStatus="status">
		<li>
			<!--<div><input type="checkbox" name="member_idx" value="${rvo.member_idx}"></div>-->
			<div class="idx">${rvo.member_idx}</div>
			<div>${status.count}</div>
			<div>${rvo.member.member_name}</div>
			<div>
				<c:choose>
					<c:when test="${rvo.store.store_image eq 'store1.jpg'}">
						<img src="${IMG_URL}NoImage_pdlhxd.jpg" alt="사진이 없습니다!"/>
					</c:when>
					<c:otherwise>
						<img src="${IMG_URL}${rvo.store.store_image}_${rvo.attach.filename}" alt="${rvo.attach.filename}"/>
					</c:otherwise>
				</c:choose>
			</div>
			<div>${rvo.store.store_name}</div>
			<div>${rvo.store.store_num}</div>
			<div>${rvo.store.store_address}</div>
			<div>${rvo.store.store_rnum}</div>
			<div>sample.jpg</div>
			<div>${rvo.regdate}</div>
			<div>
				<div class="btn-box">
					<button type="button" id="storeApprovalBtn" class="approve-btn">점포 승인</button>
					<button type="button" id="storeDisallowBtn" class="reject-btn">점포 불허</button>
				</div>
			</div>
		</li>
		</c:forEach>
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