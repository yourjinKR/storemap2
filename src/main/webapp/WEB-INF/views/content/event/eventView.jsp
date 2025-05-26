<%@page import="java.util.Date"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page import="java.time.LocalDate, java.time.temporal.ChronoUnit"%>
<%@ page import="org.storemap.domain.EventVO"%>
<!-- 스크립트 -->
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
<script src="/resources/js/event.js"></script>
<% request.setAttribute("now", new Date());%>
<div class="readonly-form">
	<!-- 제목 + 신고/좋아요 아이콘 -->
	<div class="event-header">
		<h3>${evo.event_title}</h3>
		<c:choose>
			<c:when test="${evo.event_bstartdate > now}">
			<div class="state-box">
				<span class="event-state">진행 예정</span>
				<span class="event-category">${evo.event_category}</span>
				<span class="event-dday">${dday}</span>
			</div>
			</c:when>
			<c:when test="${evo.event_bstopdate < now}">
				<span class="event-state">종료</span>
			</c:when>
			<c:otherwise>
				<span class="event-state">진행 중</span>
			</c:otherwise>
		</c:choose>
		<h4>${evo.event_bstartdate} ~ ${evo.event_bstopdate}</h4>
		
		<div class="event-img">
			<c:forEach var="file" items="${evo.cloudinaryFiles}" varStatus="status">
				<c:if test="${status.index > 0}">
					<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/${file.uuid}_${file.filename}" alt="Cloudinary 이미지" style="width: 23%; height: auto;" />
				</c:if>
			</c:forEach>

			<!-- 외부 URL 이미지 출력 -->
			<c:forEach var="url" items="${evo.externalUrls}" varStatus="status">
				<c:if test="${status.index > 0}">
					<img src="${url}" alt="외부 이미지" class="expandable-img" />
				</c:if>
			</c:forEach>
		</div>
		<!-- 신고 및 좋아요 버튼 -->
		<div class="eventIcon">
			<input type="button" class="report-button" name="eventReport" id="eventReport-icon${evo.event_idx}"> 
			<label class="material-symbols-outlined" for="eventReport-icon${evo.event_idx}">report</label> 
			<input type="checkbox" name="eventLike" id="eventLike-icon${evo.event_idx}" ${eventLiked ? 'checked' : ''} class="eventLike-checkbox"> 
			<label class="material-symbols-outlined" for="eventLike-icon${evo.event_idx}">favorite</label> 
			<span class="eventLike-count eventLike-count-${evo.event_idx}">${evo.event_like_cnt}</span>
		</div>
	</div>
	
	<div class="event-text">
		${evo.event_content}
		<div class="btn-box t-r mt30 mb30">
			<button type="button" class="more-content">더보기 ▼</button>
		</div>
	</div>
	
	<div class="info-box">
		<div class="event-postor">
		<c:choose>
			<c:when test="${evo.cloudinaryFiles ne null and evo.cloudinaryFiles.size() > 0}">
				<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/${evo.cloudinaryFiles[0].uuid}_${evo.cloudinaryFiles[0].filename}" alt="Cloudinary 이미지" style="width: 23%; height: auto;" />
			</c:when>
			<c:otherwise>
				<img src="${evo.externalUrls[0]}" alt="포스터">
			</c:otherwise>
		</c:choose>
		</div>
		<div class="event-info">
			<table>
				<colgroup>
					<col width="160px">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th>이벤트 명</th>
						<td>: ${evo.event_title}</td>
					</tr>
					<c:if test="${not empty loginUser and loginUser ne null and userType ne 'user'}">
						<tr>
							<th>모집 기간</th>
							<td>: ${evo.event_rstartdate} ~ ${evo.event_rstopdate}</td>
						</tr>
					</c:if>
					<tr>
						<th>이벤트 기간</th>
						<td>: ${evo.event_bstartdate} ~ ${evo.event_bstopdate}</td>
					</tr>
					<tr>
						<th>주소</th>
						<td>: ${evo.event_location}</td>
					</tr>
					<tr>
						<th>주최</th>
						<td>: ${evo.enter.enter_name}</td>
					</tr>
					<tr>
						<th>연락처</th>
						<td>: ${evo.enter.enter_num}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="attent-store">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<c:forEach var="eday" items="${evo.join_eday}" varStatus="status">
				 	<div class="swiper-slide">
				 		 <dl>
				 		 	<dt>${status.index + 1}일차</dt>
				 			<dd>
				 				${eday.event_starttime.substring(0, 16)} ~
				 				${eday.event_stoptime.substring(0, 16)}
							</dd> 	
			 		 	</dl>
				 		 <div class="eday-store">
				 		 <c:choose>
				 		 	<c:when test="${fn:length(eday.join_ereq) > 0}">
						 		<c:forEach var="req" items="${eday.join_ereq}">
								    <div class="store-box">
								    	<a href="${req.join_store.store_idx}">
									   		<div class="img-box">
									   			<c:choose>
									   				<c:when test="${req.join_store.attach ne null and req.join_store.attach ne '' }">
											   			<img alt="" src="${IMG_URL}${req.join_store.attach.uuid}_${req.join_store.attach.filename}">
									   				</c:when>
									   				<c:otherwise>
											   			<img alt="" src="${IMG_URL}NoImage_pdlhxd.jpg">
									   				</c:otherwise>
									   			</c:choose>
									   		</div>
									   		<div class="store-info">
												<h4>${req.join_store.store_name}</h4>
												<p>${req.join_store.store_content}</p>
									   		</div>
								    	</a>
								    </div>
						        </c:forEach>
				 		 	</c:when>
				 		 	<c:otherwise>
				 		 		<div class="empty-data">
				 		 			등록된 점포가 없습니다.
				 		 		</div>
				 		 	</c:otherwise>
				 		 </c:choose>
				 		 </div>
				 	</div>
				</c:forEach>
			</div>
	
			<!-- 네비게이션 버튼 -->
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	</div>

	<div id="participationSection">
		<c:if test="${userType eq 'owner'}">
		<input type="button" id="openBtn" value="참여" />
		</c:if>
		<a href="/event/eventList">목록</a>
	</div>
</div>

<!-- 모달 -->

<jsp:include page="../../content/modal/eventDayChoice.jsp" />
<jsp:include page="../../content/modal/eventReport.jsp" />

<style>

.readonly-form{padding-bottom:150px;}
.readonly-form h2 {
	margin-bottom: 20px;
}

.event-table {
	width: 100%;
	border-collapse: collapse;
	margin-top: 20px;
}

.event-table th, .event-table td {
	padding: 12px;
	border: 1px solid #ddd;
	vertical-align: top;
	text-align: left;
}

.event-table th {
	background-color: #f2f2f2;
	width: 150px;
}

.photo-preview {
	display: flex;
	gap: 10px;
	margin-top: 10px;
}

.photo-preview img {
	width: 100px;
	height: 100px;
	object-fit: cover;
	border-radius: 6px;
	border: 1px solid #ccc;
}

.back-button {
	margin-top: 20px;
	text-align: right;
}

#participationSection {	
	display:flex;
	justify-content:flex-end;
	align-items: center;
	gap:15px;
	margin-top:30px;
}

#result {
	margin-bottom: 10px;
}
</style>