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
				<c:if test="${evo.event_category ne null}">
					<span class="event-category">${evo.event_category}</span>
				</c:if>
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
			<c:when test="${evo.cloudinaryFiles eq null and evo.cloudinaryFiles.size() == 0 and evo.externalUrls eq null and evo.externalUrls.size() == 0}">
				<img src="${IMG_URL}NoImage_pdlhxd.jpg" alt="noimg"/>
			</c:when>
			<c:when test="${evo.cloudinaryFiles ne null and evo.cloudinaryFiles.size() > 0}">
				<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/${evo.cloudinaryFiles[0].uuid}_${evo.cloudinaryFiles[0].filename}" alt="Cloudinary 이미지" style="width: auto%; height: auto;" />
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
		<a id="openBtn" href="">참여</a>
		</c:if>
		<a href="/event/eventList">목록</a>
	</div>
</div>
<c:if test="${not empty alreadyDeclared}">
    <script>alert("이미 이 이벤트를 신고하셨습니다.");</script>
</c:if>
<c:if test="${empty alreadyDeclared and not empty successMessage}">
    <script>alert("${successMessage}");</script>
</c:if>
<!-- 모달 -->

<jsp:include page="../../content/modal/eventDayChoice.jsp" />
<jsp:include page="../../content/modal/eventReport.jsp" />

<style>

.event-register-wrapper {
  font-family: 'Noto Sans KR', sans-serif;
  color: #5D4037; /* 진한 갈색 느낌 */
  background-color: #FFFDE7; /* 아주 연한 개나리 옐로우 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(255, 235, 59, 0.3); /* 부드러운 노란 그림자 */
}

/* 헤더 스타일 */
.event-register-wrapper .page-header {
  margin-bottom: 30px;
  border-bottom: 3px solid #FFEB3B; /* 개나리색 굵은 선 */
  color: #FBC02D; /* 선명한 개나리색 */
  font-weight: 700;
  font-size: 1.8rem;
}

/* 테이블 */
.event-register-wrapper table {
  border-collapse: collapse;
  width: 100%;
  background-color: #FFFDE7;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(255, 235, 59, 0.2);
}

.event-register-wrapper th,
.event-register-wrapper td {
  border: 1px solid #FFEB3B;
  padding: 12px 15px;
}

.event-register-wrapper th {
  background-color: #FFF176; /* 연한 개나리 */
  color: #5D4037;
  width: 160px;
  text-align: left;
  font-weight: 600;
}

.event-register-wrapper td {
  background-color: #FFFDE7;
  color: #5D4037;
  font-size: 0.95rem;
}

/* 입력 폼 요소 */
.event-register-wrapper input[type="text"],
.event-register-wrapper select,
.event-register-wrapper input[type="date"],
.event-register-wrapper textarea,
.event-register-wrapper input[type="file"] {
  width: 100%;
  padding: 8px 12px;
  border: 1.5px solid #FFEB3B;
  border-radius: 6px;
  font-size: 1rem;
  color: #5D4037;
  background-color: #FFFDE7;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.event-register-wrapper input[type="text"]:focus,
.event-register-wrapper select:focus,
.event-register-wrapper input[type="date"]:focus,
.event-register-wrapper textarea:focus,
.event-register-wrapper input[type="file"]:focus {
  outline: none;
  border-color: #FBC02D;
  box-shadow: 0 0 5px #FBC02D;
}

/* textarea 고정 크기 */
.event-register-wrapper textarea {
  resize: none;
}

/* 이미지 미리보기 컨테이너 */
.event-register-wrapper #previewContainer {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  max-width: 100%;
}

/* 버튼 영역 */
.event-register-wrapper .panel-body-btns {
  margin-top: 25px;
  display: flex;
  gap: 15px;
  justify-content: flex-start;
}

/* 버튼 기본 스타일 */
.event-register-wrapper .eventBtn {
  background-color: #FFEB3B; /* 개나리색 */
  border: none;
  color: #5D4037;
  font-weight: 700;
  padding: 12px 22px;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(251, 192, 45, 0.5);
  transition: background-color 0.3s ease, color 0.3s ease;
  user-select: none;
  font-size: 1rem;
}

/* 버튼 호버 시 */
.event-register-wrapper .eventBtn:hover {
  background-color: #FBC02D;
  color: #3E2723;
  box-shadow: 0 4px 10px rgba(251, 192, 45, 0.7);
}

/* 작은 회색 텍스트 */
.event-register-wrapper small {
  color: #A1887F;
  font-size: 0.85rem;
  font-style: italic;
}
</style>