<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!-- 이벤트 날짜 선택 모달 -->
<div id="calendarModal" class="modal">
  <div class="modal-content">
    <span id="closeBtn" class="close">&times;</span>
    <h3>입점 신청</h3>

<table>
  <thead>
    <tr>
      <th>날짜</th>
      <th>시작 시간</th>
      <th>종료 시간</th>
      <th>수용 인원</th>
      <th>신청 상태</th>
      <th>입점 신청</th>
      <th>철회</th>
    </tr>
  </thead>
  <tbody>
    <c:forEach var="eday" items="${evo.join_eday}">
      <tr>
        <td><c:out value="${fn:substring(eday.event_starttime, 0, 10)}" /></td>
        <td>${eday.event_starttime.substring(0, 16)}</td>
        <td>${eday.event_stoptime.substring(0, 16)}</td>
        <td>${eday.store_max}</td>

        <!-- 신청 상태 -->
        <td>
          <c:choose>
            <c:when test="${entryStatusMap[eday.eday_idx] != null}">
              <c:choose>
                <c:when test="${entryPonMap[eday.eday_idx] == 1}">
                  <span class="approved">승인 완료!</span>
                </c:when>
                <c:otherwise>
                  신청 승인중
                </c:otherwise>
              </c:choose>
            </c:when>
            <c:otherwise>
              신청 전
            </c:otherwise>
          </c:choose>
        </td>

        <!-- 입점 신청 버튼 -->
        <td>
          <c:choose>
            <c:when test="${entryStatusMap[eday.eday_idx] == null}">
              <form action="/event/eventView" method="post">
                <input type="hidden" name="eday_idx" value="${eday.eday_idx}" />
                <input type="hidden" name="store_idx" value="${sessionScope.storeIdx}" />
                <button type="submit" class="participationBtn" data-eday-idx="${eday.eday_idx}">신청</button>
              </form>
            </c:when>
            <c:otherwise>
              <span class="gray-text">이미 신청한 날짜입니다</span>
            </c:otherwise>
          </c:choose>
        </td>

        <!-- 철회 버튼 -->
        <td>
          <c:choose>
            <c:when test="${entryStatusMap[eday.eday_idx] != null}">
              <c:choose>
                <c:when test="${entryPonMap[eday.eday_idx] == 1}">
                  <!-- pon = 1일 경우 안보이게 -->
                  <button class="withdrawBtn"
                          data-eday-idx="${eday.eday_idx}"
                          data-store-idx="${sessionScope.storeIdx}"
                          data-pon="1"
                          onclick="withdrawEntry(this)"
                          style="display: none;">
                    		철회
                  </button>
                </c:when>
                <c:otherwise>
                  <!-- pon = 0일 경우 기본 숨김, JS로 제어 -->
					<button class="withdrawBtn"
					        data-eday-idx="${eday.eday_idx}"
					        data-store-idx="${sessionScope.storeIdx}"
					        data-pon="${entryPonMap[eday.eday_idx]}"
					        onclick="withdrawEntry(this)"
					        style="${entryPonMap[eday.eday_idx] == 1 ? 'display:none;' : 'display:inline-block;'}">
					  		철회
					</button>
                </c:otherwise>
              </c:choose>
            </c:when>
          </c:choose>
        </td>
      </tr>
    </c:forEach>
  </tbody>
</table>
</div>
</div>



