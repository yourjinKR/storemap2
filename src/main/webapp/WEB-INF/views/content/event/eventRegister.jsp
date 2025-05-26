<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/event.js"></script>
	
<div class="page-header">
  <h1>이벤트 등록</h1>
</div>
<div class="event-register-wrapper">
<div class="panel-body">
  <form method="POST" enctype="multipart/form-data" action="/event/eventRegister">
    <table>
      <tbody>
        <tr>
          <th>행사명</th>
          <td><input type="text" name="event_title" required></td>
        </tr>
        <tr>
          <th>카테고리</th>
          <td>
            <select name="event_category" required>
              <option value="행사">행사</option>
              <option value="축제">축제</option>
              <option value="박람회">박람회</option>
              <option value="기타">직접입력으로 만들거</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>모집 날짜</th>
          <td>
            <input type="date" name="event_rstartdate" id="rstartDate" required> ~ 
            <input type="date" name="event_rstopdate" id="rendDate" required>
          </td>
        </tr>
        <tr>
          <th>행사 날짜</th>
          <td>
            <input type="date" name="event_bstartdate" id="startDate" required> ~ 
            <input type="date" name="event_bstopdate" id="endDate" required>
            <button type="button" onclick="generateDays()">일정 생성</button>
            <br><small style="color: gray;">이벤트 및 행사는 모집일로부터 7일 이후부터 개최할 수 있습니다.</small>
          </td>
        </tr>
        <tr>
          <th>날짜별 예약 설정</th>
          <td>
            <div id="eventDaysContainer"></div>
          </td>
        </tr>
        <tr>
          <th>행사 장소</th>
          <td>
          	<jsp:include page="../../content/modal/postcodeForm.jsp"/>
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
            <textarea name="event_content" rows="10" cols="76" style="resize: none;"></textarea>
          </td>
        </tr>
        <tr>
          <th>대표 이미지</th>
          <td>
		    <input type="file" name="eventImage" accept="image/*" id="imageInput" multiple>
		    <div id="previewContainer" style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;"></div>
    		<small style="color: gray;">이미지는 최대 4장까지 업로드할 수 있으며, 첫번째 이미지는 포스터, 두번째 이미지는 대표 사진으로 설정됩니다.</small>
          </td>
        </tr>        	
      </tbody>
    </table>
		<input type="hidden" name="enter_idx" value="${loginUserIdx }">
    <div class="panel-body-btns">
      <button type="button" class="eventBtn" id="registerBtn">새 게시글 등록</button> 
      <button type="reset" class="eventBtn" id="resetBtn">다시 작성</button>
      <button type="button" class="eventBtn" id="listBtn">목록으로 이동</button>
    </div>
  </form>
</div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .page-header h1 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
  }

  .event-register-wrapper {
    max-width: 900px;
    margin: 0 auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
    font-family: 'Segoe UI', sans-serif;
    color: #333;
  }

  .event-register-wrapper table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  .event-register-wrapper th,
  .event-register-wrapper td {
    padding: 12px;
    border: 1px solid #e0e0e0;
    vertical-align: top;
  }

  .event-register-wrapper th {
    background-color: #f8f8f8;
    width: 180px;
    font-weight: 600;
    color: #555;
  }

  input[type="text"],
  input[type="date"],
  select,
  textarea,
  input[type="file"] {
    width: 100%;
    padding: 10px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  small {
    display: inline-block;
    margin-top: 5px;
    color: #888;
    font-size: 13px;
  }

  #previewContainer {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  #previewContainer img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #ccc;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .panel-body-btns {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .eventBtn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .eventBtn:hover {
    background-color: #0056b3;
  }

  .eventBtn#resetBtn {
    background-color: #6c757d;
  }

  .eventBtn#resetBtn:hover {
    background-color: #495057;
  }

  .eventBtn#listBtn {
    background-color: #28a745;
  }

  .eventBtn#listBtn:hover {
    background-color: #1e7e34;
  }

  button[type="button"] {
    margin-left: 10px;
    padding: 6px 12px;
    font-size: 14px;
    background-color: #e0e0e0;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  button[type="button"]:hover {
    background-color: #d0d0d0;
  }

  @media (max-width: 768px) {
    .event-register-wrapper {
      padding: 20px;
    }

    .event-register-wrapper th,
    .event-register-wrapper td {
      display: block;
      width: 100%;
    }

    .panel-body-btns {
      flex-direction: column;
      gap: 10px;
    }
  }
</style>
