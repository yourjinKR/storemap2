<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<ul class="sub-tab">
	<li><a href="hide" class="on">숨긴 이벤트</a></li>
	<li><a href="report">신고</a></li>
</ul>
<!-- 숨긴 이벤트 탭 -->
<div class="sub-tab-content event-hide on">
	<ul>
		<li>
			<div>idx</div>
			<div>NO</div>
			<div>기업명</div>
			<div>이벤트사진</div>
			<div>이벤트명</div>
			<div>이벤트 카테고리</div>
			<div>이벤트 장소</div>
			<div>이벤트 기간</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<c:forEach var="evo" items="${eventHiddenList}" varStatus="status">
			<li>
				<div class="idx">${evo.event_idx}</div>
				<div>${status.count}</div>
				<div>${evo.enter.enter_name}</div>
				<div>
					<c:choose>
						<c:when test="${(evo.attachFile ne null) and (fn:length(evo.attachFile) > 0)}">
							<c:choose>
								<c:when test="${evo.attachFile[0].filename.indexOf('https://kfescdn.visitkorea.or.kr/kfes/upload/contents/db/') eq 0}">
									<img src="${evo.attachFile[0].filename}">
								</c:when>
								<c:otherwise>
									<img src="${IMG_URL}${evo.attachFile[0].uuid}_${evo.attachFile[0].filename}">
								</c:otherwise>
							</c:choose>
						</c:when>
						<c:otherwise>
							<img src="${IMG_URL}NoImage_pdlhxd.jpg">
						</c:otherwise>
					</c:choose>
				</div>
				<div>${evo.event_title}</div>
				<div>${evo.event_category}</div>
				<div>${evo.event_location_detail}</div>
				<div>${evo.event_bstartdate}~${evo.event_bstopdate}</div>
				<div>
					<div class="btn-box">
						<button type="button" id="eventReportUnhideBtn" class="approve-btn">숨기기 해제</button>
					</div>
				</div>
			</li>
		</c:forEach>
	</ul>
</div>
<!-- 이벤트 신고 탭 -->
<div class="sub-tab-content event-report">
	<ul>
		<li>
			<div>idx</div>
			<div>NO</div>
			<div>기업명</div>
			<div>이벤트사진</div>
			<div>이벤트명</div>
			<div>이벤트 카테고리</div>
			<div>이벤트 장소</div>
			<div>이벤트 기간</div>
			<div>신고된 날짜</div>
			<div>누적신고 수</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<c:forEach var="ervo" items="${eventReportList}" varStatus="status">
			<li>
				<div class="idx">${ervo.event.event_idx}</div>
				<div>${status.count}</div>
				<div>${ervo.enter.enter_name}</div>
				<div>
					<c:choose>
						<c:when test="${(ervo.event.attachFile ne null) and (fn:length(ervo.event.attachFile) > 0)}">
							<c:choose>
								<c:when test="${ervo.event.attachFile[0].filename.indexOf('https://kfescdn.visitkorea.or.kr/kfes/upload/contents/db/') eq 0}">
									<img src="${ervo.event.attachFile[0].filename}">
								</c:when>
								<c:otherwise>
									<img src="${IMG_URL}${ervo.event.attachFile[0].uuid}_${ervo.event.attachFile[0].filename}">
								</c:otherwise>
							</c:choose>
						</c:when>
						<c:otherwise>
							<img src="${IMG_URL}NoImage_pdlhxd.jpg">
						</c:otherwise>
					</c:choose>
				</div>
				<div>
					<a href="${ervo.event.event_idx}" class="detail-btn">${ervo.event.event_title}(${ervo.declaration_count})</a>
				</div>
				<div>${ervo.event.event_category}</div>
				<div>${ervo.event.event_location_detail}</div>
				<div>${ervo.event.event_bstartdate}~${ervo.event.event_bstopdate}</div>
				<div>${ervo.regdate}</div>
				<div>${ervo.declaration_count}</div>
				<div>
					<div class="btn-box">
						<button type="button" id="eventReportHideBtn" class="approve-btn">숨기기</button>
                  		<button type="button" id="eventReportRemoveAllBtn" class="reject-btn">신고 전체 삭제</button>
					</div>
				</div>
			</li>
			<li class="report-detail" id="idx${ervo.event.event_idx}">
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
					<c:forEach var="erdvo" items="${eventReportDetailList}">
					<li data-event-idx="${erdvo.event_idx}">
						<div>${erdvo.member.member_name}</div>
						<div>${erdvo.declaration_category}</div>
						<div>${erdvo.declaration_content}</div>
						<div>${erdvo.regdate}</div>
						<div>
							<div class="btn-box">
								<button type="button" id="eventReportRemoveBtn" class="reject-btn">신고 삭제${erdvo.member_idx}</button>
							</div>
						</div>
					</li>
					</c:forEach>
				</ul>
			</li>
		</c:forEach>
	</ul>
</div>