<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.time.LocalDate, java.time.temporal.ChronoUnit" %>
<%@ page import="org.storemap.domain.EventVO" %>

<div class="readonly-form">
  <!-- 제목 + 신고/좋아요 아이콘 -->
  <div class="event-header">
    <h2 class="event-title">글번호 ${evo.event_idx}</h2>
    <h5>${evo.event_title}</h5>
	
	
    <!-- 신고 및 좋아요 버튼 -->
    <div class="eventIcon">
      <input type="button" name="eventReport" id="eventReport-icon${evo.event_idx}">
      <label class="material-symbols-outlined" for="eventReport-icon${evo.event_idx}">report</label>
      <input type="checkbox" name="eventLike" id="eventLike-icon${evo.event_idx}" ${eventLiked ? 'checked' : ''}>
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
      <td>${evo.event_bstartdate} ~ ${evo.event_bstopdate}</td>
    </tr>
    <tr>
      <th>사진</th>
      <td>
        <div class="photo-preview">
          <c:forEach var="file" items="${fileList}">
            <img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/${file.uuid}_${file.filename}" alt="이벤트 이미지" style="max-width: 100%; height: auto;" />
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
    <tr>
      <th>상세 주소</th>
      <td>${evo.event_location_detail}</td>
    </tr>
  </table>

  <!-- 참여 버튼 -->
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

<!-- 스크립트 -->
<script src="/resources/js/event.js"></script>

<style>
  .readonly-form {
    max-width: 800px;
    margin: 30px auto;
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0,0,0,0.05);
  }

  .readonly-form h2 {
    margin-bottom: 20px;
  }

  .event-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
	
  .event-table th,
  .event-table td {
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