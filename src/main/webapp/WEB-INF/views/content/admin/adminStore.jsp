<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<ul class="sub-tab">
	<li><a href="hide" class="on">숨긴 점포</a></li>
	<li><a href="request">점주 요청</a></li>
	<li><a href="report">신고</a></li>
</ul>
<!-- 숨긴 점포 탭 -->
<div class="sub-tab-content store-hide on">
	<ul>
		<li>
			<div>idx</div>
			<div>NO</div>
			<div>점포사진</div>
			<div>점포명</div>
			<div>점포 연락처</div>
			<div>점포 주소</div>
			<div>사업자등록번호</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<c:forEach var="svo" items="${storeHiddenList}" varStatus="status">
		<li>
			<div class="idx">${svo.store_idx}</div>
			<div>${status.count}</div>
			<div>
				<c:choose>
					<c:when test="${svo.store_image eq 'store1.jpg'}">
						<img src="${IMG_URL}NoImage_pdlhxd.jpg" alt="사진이 없습니다!"/>
					</c:when>
					<c:otherwise>
						<img src="${IMG_URL}${svo.store_image}_${svo.attach.filename}" alt="${svo.attach.filename}"/>
					</c:otherwise>
				</c:choose>
			</div>
			<div>${svo.store_name}</div>
			<div>${svo.store_num}</div>
			<div>${svo.store_address}</div>
			<div>${svo.store_rnum}</div>
			<div>
				<div class="btn-box">
					<button type="button" id="storeReportunHideBtn" class="approve-btn">숨기기 해제</button>
				</div>
			</div>
		</li>
		</c:forEach>
	</ul>
	
</div>
<!-- 점주 요청 탭 -->
<div class="sub-tab-content store-request">
	<ul>
		<li>
			<div>idx</div>
			<div>NO</div>
			<div>신청자</div>
			<div>점포사진</div>
			<div>점포명</div>
			<div>점포 연락처</div>
			<div>점포 주소</div>
			<div>사업자등록번호</div>
			<div>신청일시</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<c:forEach var="slvo" items="${storeRequestList}" varStatus="status">
		<li>
			<div class="idx">${slvo.member_idx}</div>
			<div>${status.count}</div>
			<div>${slvo.member.member_name}</div>
			<div>
				<c:choose>
					<c:when test="${slvo.store.store_image eq 'store1.jpg'}">
						<img src="${IMG_URL}NoImage_pdlhxd.jpg" alt="사진이 없습니다!"/>
					</c:when>
					<c:otherwise>
						<img src="${IMG_URL}${slvo.store.store_image}_${slvo.attach.filename}" alt="${slvo.attach.filename}"/>
					</c:otherwise>
				</c:choose>
			</div>
			<div>${slvo.store.store_name}</div>
			<div>${slvo.store.store_num}</div>
			<div>${slvo.store.store_address}</div>
			<div>${slvo.store.store_rnum}</div>
			<div>${slvo.regdate}</div>
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
<!-- 점포 신고 탭 -->
<div class="sub-tab-content store-report">
	<ul>
		<li>
			<div>idx</div>
			<div>NO</div>
			<div>점포사진</div>
			<div>점포명</div>
			<div>점포 연락처</div>
			<div>점포 주소</div>
			<div>신고된 날짜</div>
			<div>누적신고 수</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<c:forEach var="srvo" items="${storeReportList}" varStatus="status">
		<li>
			<div class="idx">${srvo.store.store_idx}</div>
			<div>${status.count}</div>
			<div>
				<c:choose>
					<c:when test="${srvo.store.store_image eq 'store1.jpg'}">
						<img src="${IMG_URL}NoImage_pdlhxd.jpg" alt="사진이 없습니다!"/>
					</c:when>
					<c:otherwise>
						<img src="${IMG_URL}${srvo.store.store_image}_${srvo.attach.filename}" alt="${srvo.attach.filename}"/>
					</c:otherwise>
				</c:choose>
			</div>
			<div>
				<a href="${srvo.store.store_idx}" class="detail-btn">${srvo.store.store_name}(${srvo.declaration_count})</a>
			</div>
			<div>${srvo.store.store_num}</div>
			<div>${srvo.store.store_address}</div>
			<div>${srvo.regdate}</div>
			<div>${srvo.declaration_count}</div>
			<div>
				<div class="btn-box">
					<button type="button" id="storeReportHideBtn" class="approve-btn">숨기기</button>
					<button type="button" id="storeReportRemoveAllBtn" class="reject-btn">전체 신고 삭제</button>
				</div>
			</div>
		</li>
		<li class="report-detail" id="idx${srvo.store.store_idx}">
			<ul>
				<li>
					<div>신고자</div>
					<div>카테고리</div>
					<div>신고내용</div>
					<div>신고날짜</div>
					<div></div>
				</li>
			</ul>
			<ul>
				<c:forEach var="srdvo" items="${storeReportDetailList}">
				<li data-store-idx="${srdvo.store_idx}">
					<div>${srdvo.member.member_name}</div>
					<div>${srdvo.declaration_category}</div>
					<div>${srdvo.declaration_content}</div>
					<div>${srdvo.regdate}</div>
					<div>
						<div class="btn-box">
							<button type="button" id="storeReportRemoveBtn" class="reject-btn">신고 삭제${srdvo.member_idx}</button>
						</div>
					</div>
				</li>
				</c:forEach>
			</ul>
		</li>
		</c:forEach>
	</ul>
</div>