<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page import="java.time.LocalDate, java.time.temporal.ChronoUnit"%>
<%@ page import="org.storemap.domain.EventVO"%>
<!-- 스크립트 -->
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
<script src="/resources/js/event.js"></script>

<div class="readonly-form">
	<!-- 제목 + 신고/좋아요 아이콘 -->
	<div class="event-header">
		<h2 class="event-title">글번호 ${evo.event_idx}</h2>
		<h5>${evo.event_title}</h5>


		<!-- 신고 및 좋아요 버튼 -->
		<div class="eventIcon">
			<input type="button" class="report-button" name="eventReport" id="eventReport-icon${evo.event_idx}"> 
			<label class="material-symbols-outlined" for="eventReport-icon${evo.event_idx}">report</label> 
			<input type="checkbox" name="eventLike" id="eventLike-icon${evo.event_idx}" ${eventLiked ? 'checked' : ''} class="eventLike-checkbox"> 
			<label class="material-symbols-outlined" for="eventLike-icon${evo.event_idx}">favorite</label> 
			<span class="eventLike-count eventLike-count-${evo.event_idx}">${evo.event_like_cnt}</span>
		</div>
	</div>

	<!-- 이벤트 정보 테이블 -->
	<table class="event-table">
		<tr>
			<th>카테고리</th>
			<td>${evo.event_category}</td>
		</tr>
		<tr>
			<th>행사 기간</th>
			<td>${evo.event_bstartdate}~ ${evo.event_bstopdate}</td>
		</tr>
		<tr>
			<th>사진</th>
			<td>
				<div class="photo-preview" style="display: flex; gap: 10px; flex-wrap: wrap;">
					<!-- Cloudinary 이미지 출력 -->
					<c:forEach var="file" items="${evo.cloudinaryFiles}">
						<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/${file.uuid}_${file.filename}" alt="Cloudinary 이미지" style="width: 23%; height: auto;" />
					</c:forEach>

					<!-- 외부 URL 이미지 출력 -->
					<c:forEach var="url" items="${evo.externalUrls}">
						<img src="${url}" alt="외부 이미지" style="width: 23%; height: auto;" class="expandable-img" />
					</c:forEach>
				</div>
			</td>
		</tr>
		<tr>
			<th>이벤트 소개</th>
			<td><pre style="white-space: pre-wrap;">${evo.event_content}</pre></td>
		</tr>
		<tr>
			<th>주소</th>
			<td>${evo.event_location}</td>
		</tr>
	</table>

	<div class="swiper-container">
		<div class="swiper-wrapper">
			<c:forEach var="eday" items="${evo.join_eday}" varStatus="status">
			 	<div class="swiper-slide">
			 		 <dl>
			 		 	<dt>${status.index + 1}일차</dt>
			 			<dd>${eday.event_starttime} ~ ${eday.event_stoptime}</dd> 	
		 		 	</dl>
			 		 <c:choose>
			 		 	<c:when test="${fn:length(eday.join_ereq) > 0}">
					 		<c:forEach var="req" items="${eday.join_ereq}">
							    <div class="store-box">
									<h4>${req.join_store.store_name}</h4>
									<p>${req.join_store.store_content}</p>
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
			</c:forEach>
			<%-- <c:forEach var="eday" items="${evo.event_ay}">
		      <div class="swiper-slide">
		        <h3>${eday.event_starttime} ~ ${eday.event_stoptime}</h3>
		        <c:forEach var="req" items="${requestMap.get(eday.eday_idx)}">
		          <div class="store-box">
		            <h4>${req.join_store.store_name}</h4>
		            <p>${req.join_store.store_content}</p>
		          </div>
		        </c:forEach>
		      </div>
		    </c:forEach> --%>
		</div>

		<!-- 네비게이션 버튼 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
		<!-- 페이지네이션 -->
		<div class="swiper-pagination"></div>
	</div>

	<div id="participationSection">
		<input type="button" id="openBtn" value="참여" />
	</div>
</div>

<!-- 모달 -->

<jsp:include page="../../content/modal/eventDayChoice.jsp" />
<jsp:include page="../../content/modal/eventReport.jsp" />

<!-- 목록으로 돌아가기 버튼 -->
<div class="back-button">
	<button onclick="goEventList()" id="goEventList">목록으로 돌아가기</button>
</div>

<style>
.readonly-form {
	max-width: 800px;
	margin: 30px auto;
	background-color: #fff;
	padding: 30px;
	border-radius: 12px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

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

button, input[type="button"] {
	padding: 8px 16px;
	background-color: #666;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
}

#participationSection {
	margin-top: 40px;
	text-align: center;
}

#result {
	margin-bottom: 10px;
}
</style>