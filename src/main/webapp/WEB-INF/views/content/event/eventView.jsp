<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.time.LocalDate, java.time.temporal.ChronoUnit" %>
<%@ page import="org.storemap.domain.EventVO" %>

<%
    EventVO vo = (EventVO) request.getAttribute("vo");

    int totalMax = 100;
    String startDate = "2025-05-01";
    String endDate = "2025-05-05";

    if (vo != null) {
        try {
            if (vo.getEvent_list_max() != null && !vo.getEvent_list_max().isEmpty()) {
                totalMax = Integer.parseInt(vo.getEvent_list_max());
            }
            if (vo.getEvent_bstartdate() != null) {
                startDate = vo.getEvent_bstartdate().toLocalDate().toString();
            }
            if (vo.getEvent_bstopdate() != null) {
                endDate = vo.getEvent_bstopdate().toLocalDate().toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    LocalDate start = LocalDate.parse(startDate);
    LocalDate end = LocalDate.parse(endDate);
    long days = ChronoUnit.DAYS.between(start, end) + 1;
    int maxPerDay = (int) Math.floor((double) totalMax / days);
%>

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
      <span id="currentCount">0</span> / 일별 최대 <span id="maxPerDay"><%= maxPerDay %></span>
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

    <input 
      type="date" 
      id="selectedDate"
      min="<%= startDate %>" 
      max="<%= endDate %>"
    />

    <div class="modal-actions">
      <button id="confirmBtn">확인</button>
    </div>
  </div>
</div>

<!-- 목록으로 돌아가기 -->
<div class="back-button">
  <button onclick="history.back()">← 목록으로 돌아가기</button>
</div>

<!-- 전달 데이터 + JS 파일 -->
<script>
  const config = {
    maxPerDay: <%= maxPerDay %>,
    startDate: "<%= startDate %>",
    endDate: "<%= endDate %>"
  };
</script>
<script src="/resources/js/event.js"></script>
