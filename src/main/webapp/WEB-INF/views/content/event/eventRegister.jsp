<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript" src="/resources/js/event.js"></script>

<style>
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #ddd; padding: 8px; }
  th { background-color: #f4f4f4; text-align: left; }
  .panel-body-btns { margin-top: 20px; }
  .btn { padding: 8px 12px; margin-right: 10px; cursor: pointer; }
  .btn-fir { background-color: #007bff; color: white; border: none; }
  .btn-sec { background-color: #6c757d; color: white; border: none; }
  .textarea { resize: none; }
</style>

<div class="page-header">
  <h1>이벤트 등록</h1>
</div>

<div class="panel-body">
  <form method="POST" enctype="multipart/form-data" action="/event/create">
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
              <option value="기타">기타</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>행사 날짜</th>
          <td>
            <input type="date" name="event_bstartdate" id="startDate" required> ~ 
            <input type="date" name="event_bstopdate" id="endDate" required>
            <button type="button" onclick="generateDays()">일정 생성</button>
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
            <input type="text" name="event_location" placeholder="우편번호" style="width: 300px;"><br>
            <input type="text" name="event_location_detail" placeholder="주소 (예: xx시 xx구 xx동)" style="width: 300px; margin-top: 5px;">
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
            <textarea name="event_content" rows="10" cols="76" required></textarea>
          </td>
        </tr>
        <tr>
          <th>대표 이미지</th>
          <td>
            <input type="file" name="eventImage" accept="image/*" id="imageInput">
            <div style="margin-top:10px;">
              <img id="imagePreview" src="#" alt="미리보기" style="display:none; max-width:200px; border:1px solid #ccc;" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="panel-body-btns">
      <button type="submit" class="btn btn-sec">새 게시글 등록</button>
      <button type="reset" class="btn btn-fir">다시 작성</button>
      <button type="button" class="btn btn-fir" onclick="location.href='/event/list'">목록으로 이동</button>
    </div>
  </form>
</div>
