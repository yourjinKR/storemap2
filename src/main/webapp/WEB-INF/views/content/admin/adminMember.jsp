<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<ul class="sub-tab">
	<li><a href="hide" class="on">숨긴 리뷰</a></li>
	<li><a href="report">신고</a></li>
</ul>
<!-- 숨긴 리뷰 탭 -->
<div class="sub-tab-content member-hide on">
	<ul>
		<li>
			<div>idx</div>
			<div>NO</div>
			<div>리뷰 작성자</div>
			<div>리뷰사진</div>
			<div>리뷰명</div>
			<div>리뷰 평점</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<c:forEach var="rvo" items="${reviewHiddenList}" varStatus="status">
			<li>
				<div class="idx">${rvo.review_idx}</div>
				<div>${status.count}</div>
				<div>${rvo.review_writer}</div>
				<div>
					<c:choose>
						<c:when test="${rvo.review_image eq null}">
							<img src="${IMG_URL}NoImage_pdlhxd.jpg" alt="사진이 없습니다!"/>
						</c:when>
						<c:otherwise>
							<img src="${IMG_URL}${rvo.review_image}_${rvo.attach.filename}" alt="${rvo.attach.filename}"/>
						</c:otherwise>
					</c:choose>
				</div>
				<div>${rvo.review_title}</div>
				<div>${rvo.review_star}</div>
				<div>
					<div class="btn-box">
						<button type="button" id="reviewUnhideBtn" class="approve-btn">숨기기 해제</button>
					</div>
				</div>
			</li>
		</c:forEach>
	</ul>
</div>
<!-- 리뷰 신고 탭 -->
<div class="sub-tab-content member-report">
	<ul>
		<li>
			<div>idx</div>
			<div>NO</div>
			<div>리뷰 작성자</div>
			<div>리뷰사진</div>
			<div>리뷰명</div>
			<div>리뷰 평점</div>
			<div>신고된 날짜</div>
			<div>누적신고 수</div>
			<div></div>
		</li>
	</ul>
	<ul>
		<c:forEach var="rrvo" items="${reviewReportList}" varStatus="status">
			<li>
				<div class="idx">${rrvo.review.review_idx}</div>
				<div>${status.count}</div>
				<div>${rrvo.review.review_writer}</div>
				<div>
					<c:choose>
						<c:when test="${rrvo.review.review_image eq null}">
							<img src="${IMG_URL}NoImage_pdlhxd.jpg" alt="사진이 없습니다!"/>
						</c:when>
						<c:otherwise>
							<img src="${IMG_URL}${rrvo.review.review_image}_${rrvo.attach.filename}" alt="${rrvo.attach.filename}"/>
						</c:otherwise>
					</c:choose>
				</div>
				<div>
					<a href="${rrvo.review.review_idx}" class="detail-btn">${rrvo.review.review_title}(${rrvo.declaration_count})</a>
				</div>
				<div>${rrvo.review.review_star}</div>
				<div>${rrvo.review.review_regdate}</div>
				<div>${rrvo.declaration_count}</div>
				<div>
					<div class="btn-box">
						<button type="button" id="reviewReportHideBtn" class="approve-btn">숨기기</button>
                  		<button type="button" id="reviewReportRemoveAllBtn" class="reject-btn">신고 전체 삭제</button>
					</div>
				</div>
			</li>
			<li class="report-detail" id="idx${rrvo.review.review_idx}">
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
					<c:forEach var="rrdvo" items="${reviewReportDetailList}">
					<li data-review-idx="${rrdvo.review_idx}">
						<div>${rrdvo.member.member_name}</div>
						<div>${rrdvo.declaration_category}</div>
						<div>${rrdvo.declaration_content}</div>
						<div>${rrdvo.regdate}</div>
						<div>
							<div class="btn-box">
								<button type="button" id="reviewReportRemoveBtn" class="reject-btn">신고 삭제${rrdvo.member_idx}</button>
							</div>
						</div>
					</li>
					</c:forEach>
				</ul>
			</li>
		</c:forEach>
	</ul>
</div>