<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/event.js"></script>

<style>
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
    max-width: 600px;
    margin: 30px auto;
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0,0,0,0.05);
  }

  .readonly-form h2 {
    margin-bottom: 20px;
  }

  .readonly-form .field {
    margin-bottom: 15px;
  }

  .readonly-form .label {
    font-weight: bold;
    margin-bottom: 6px;
    display: block;
  }

  .readonly-form .value {
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 6px;
    border: 1px solid #ddd;
    white-space: pre-wrap;
  }

  .photo-preview {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .photo-preview img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    background-color: #eee;
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

.photo-preview img {
  margin-right: 10px;
}

.back-button {
  margin-top: 20px;
  text-align: right;
}

button {
  padding: 8px 16px;
  background-color: #666;
  color: white;
  border: none;
  cursor: pointer;
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
            <img src="${vo.event_file}" alt="사진1">
          </c:if>
        </div>
      </td>
    </tr>
     <tr>
      <th>이벤트 소개</th>
      <td>
        <pre style="white-space: pre-wrap;">${vo.event_content}</pre>
      </td>
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

<!-- 참여 인원 표시 -->
<div id="result">
  <span id="currentCount">0</span> / ${vo.event_list_max}
</div>

<!-- 버튼 -->
<input type="button" onclick="openModal()" value="참여" />
<input type="button" onclick="count('minus')" value="철회" />

<!-- 모달 -->
<div id="calendarModal" class="modal">
  <div class="modal-content">
    <span class="close-btn" onclick="closeModal()">&times;</span>
    <h3>참여 날짜 선택</h3>

    <input 
      type="date" 
      id="selectedDate"
      min="${vo.event_bstartdate}" 
      max="${vo.event_bstopdate}"
    />

    <div class="modal-actions">
      <button onclick="confirmParticipation()">확인</button>
    </div>
  </div>
</div>
	
	<!-- 목록으로 돌아가기 -->
	<div class="back-button">
	  <button onclick="history.back()">← 목록으로 돌아가기</button>
	</div>

