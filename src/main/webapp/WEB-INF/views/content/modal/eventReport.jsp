<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<form id="eventReportForm" action="/event/report/submit" method="post">
  <div id="event-report-selection" style="display: none;">
    <div class="event-report-content">
      <span class="close" style="cursor:pointer; float:right;">×</span>
      <h3>이벤트 신고하기</h3>

      <div class="report-reasons">
        <label><input type="radio" name="declaration_category" value="음란물 또는 선정적인 내용" checked> 음란물 또는 선정적인 내용</label><br>
        <label><input type="radio" name="declaration_category" value="도배/홍보/스팸"> 도배/홍보/스팸</label><br>
        <label><input type="radio" name="declaration_category" value="허위 또는 과장된 정보"> 허위 또는 과장된 정보</label><br>
        <label><input type="radio" name="declaration_category" value="불법 행위 유도"> 불법 행위 유도</label><br>
        <label><input type="radio" name="declaration_category" value="타인의 권리 침해"> 타인의 권리 침해</label><br>
        <label><input type="radio" name="declaration_category" value="혐오 또는 차별적 표현"> 혐오 또는 차별적 표현</label><br>
        <label><input type="radio" name="declaration_category" value="폭력적/위협적인 내용"> 폭력적/위협적인 내용</label><br>
        <label><input type="radio" name="declaration_category" value="기타"> 기타</label>
      </div>

      <div class="report-detail">
        <textarea name="declaration_content" placeholder="신고 내용을 입력하세요" rows="5" style="width: 100%;"></textarea>
      </div>

      <!-- 로그인 여부는 서버에서 처리 -->
      <input type="hidden" id="isLoggedIn" value="${not empty sessionScope.loginUserIdx}" />
      <input type="hidden" name="event_idx" value="${evo.event_idx}" />
      <input type="hidden" name="member_idx" value="${sessionScope.loginUserIdx}" />

      <button type="button" class="add_report" id="eventReportBtn">신고 제출</button>
    </div>
  </div>
</form>

