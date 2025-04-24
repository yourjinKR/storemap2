<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.time.LocalDate, java.time.temporal.ChronoUnit" %>
<%@ page import="org.storemap.domain.EventVO" %>


<style>
  /* 기본 스타일 */
  .modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.5);
  }

  .modal-content {
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    width: 300px;
    border-radius: 10px;
    text-align: center;
  }

  .close-btn {
    float: right;
    font-size: 20px;
    cursor: pointer;
  }

  .modal-actions button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #444;
    color: white;
    border: none;
    cursor: pointer;
  }

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
    .comment-list {
    margin-top: 10px;
  }

  .comment {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }

  .comment-header {
    font-size: 0.9em;
    color: #555;
    margin-bottom: 5px;
  }

  .comment-writer {
    font-weight: bold;
  }

  .comment-date {
    margin-left: 10px;
    color: #999;
  }

  .comment-content {
    white-space: pre-wrap;
  }

  .comment-form {
    margin-top: 15px;
  }

  .comment-form textarea {
    width: 100%;
    resize: none;
  }

  .comment-form button {
    margin-top: 5px;
    float: right;
  }
  /* 댓글 전체 영역 */
.comment-section {
  margin-top: 40px;
  padding: 20px;
  border-top: 2px solid #eee;
}

/* 댓글 1개 박스 */
.comment-box {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

/* 댓글 작성자 정보 */
.comment-box p strong {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
}

/* 댓글 내용 */
.comment-box p {
  margin: 4px 0;
  color: #555;
}

/* 댓글 날짜 */
.comment-box small {
  display: block;
  color: #999;
  font-size: 12px;
  margin-top: 8px;
}

/* 댓글 등록 폼 */
.comment-form {
  margin-top: 20px;
}

.comment-form textarea {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 14px;
}

.comment-form button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #45a049;
}
</style>
<div class="readonly-form">
  <h2>글번호 ${vo.event_idx}</h2>
  <h2>🎪 ${vo.event_title}</h2>

  <table class="event-table">
    <tr>
      <th>카테고리</th>
      <td>${vo.event_category}</td>
    </tr>
    <tr>
      <th>행사 기간</th>
      <td>${vo.event_bstartdate} ~ ${vo.event_bstopdate}</td>
    </tr>
    <tr>
      <th>사진</th>
      <td>
        <div class="photo-preview">
          <c:if test="${not empty vo.event_file}">
            <img src="${vo.event_file}" alt="사진">
          </c:if>
        </div>
      </td>
    </tr>
    <tr>
      <th>이벤트 소개</th>
      <td><pre style="white-space: pre-wrap;">${vo.event_content}</pre></td>
    </tr>
    <tr>
      <th>주소</th>
      <td>${vo.event_location}</td>
    </tr>
    <tr>
      <th>상세 주소</th>
      <td>${vo.event_location_detail}</td>
    </tr>
  </table>

  <!-- 참여 UI 영역 -->
  <div id="participationSection">
	<div id="result">
		<span id="currentCount">0</span>명 / 일별 최대 
		  <strong><span id="maxPerDay">${maxPerDay}</span>명</strong> 참여 가능
	</div>
    <input type="button" id="openBtn" value="참여" />
    <input type="button" id="withdrawBtn" value="철회" />
  </div>
</div>

<!-- 모달 구조 -->
<div id="calendarModal" class="modal">
  <div class="modal-content">
    <span class="close-btn" id="closeBtn">&times;</span>
    <h3>참여 날짜 선택</h3>
    <input type="date" id="selectedDate" min="${startDate}" max="${endDate}"/>
    <div class="modal-actions">
      <button id="confirmBtn">확인</button>
    </div>
  </div>
</div>

<!-- 목록으로 돌아가기 -->
<div class="back-button">
  <button onclick="location.href='/event/eventList'">← 목록으로 돌아가기</button>
</div>

<!-- 댓글 작성 폼 -->
<form action="/eventComment/insert" method="post">
  <input type="hidden" name="event_idx" value="${vo.event_idx}" />
  <textarea name="comment_content" required></textarea>
  <button type="submit">댓글 등록</button>
</form>

<!-- 댓글 리스트 출력 -->
<c:forEach var="comment" items="${commentList}">
  <div class="comment-box">
    <p><strong>작성자:</strong> ${comment.member_idx}</p>
    <p>${comment.comment_content}</p>
    <p class="date">${comment.comment_regdate}</p>
  </div>
</c:forEach>


<!-- JSON 데이터로 JS에 전달 -->
<script id="event-data" type="application/json">
  {
    "totalMax": ${totalMax},
    "startDate": "${startDate}",
    "endDate": "${endDate}"
  }
</script>

<script src="/resources/js/event.js"></script>
