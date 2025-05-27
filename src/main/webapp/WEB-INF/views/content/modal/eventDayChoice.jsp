<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!-- 이벤트 날짜 선택 모달 -->
<div id="calendarModal" class="modal" style="display:none;">
    <div class="modal-content">
        <span id="closeBtn" class="close">&times;</span>
        <h3>입점 신청</h3>

        <table border="1" style="width:100%; text-align:center;">
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

                        <td>
                            <c:choose>
                                <c:when test="${entryStatusMap[eday.eday_idx] != null}">
                                    ${entryStatusMap[eday.eday_idx]} 
                                </c:when>
                                	<c:otherwise>
                                    	신청 전
                                	</c:otherwise>
                            </c:choose>
                        </td>

 
                        <td>
                            <c:choose>
                                <c:when test="${entryStatusMap[eday.eday_idx] == null}">
                                    <form action="/event/eventView" method="post" style="margin:0;">
                                        <input type="hidden" name="eday_idx" value="${eday.eday_idx}" />
                                        <input type="hidden" name="store_idx" value="${sessionScope.storeIdx}" />
                                        <button type="submit" class="participationBtn" data-eday-idx="${eday.eday_idx}">신청</button>
                                    </form>
                                </c:when>
                                <c:otherwise>
                                    <span style="color:gray;">이미 신청한 날짜입니다</span>
                                </c:otherwise>
                            </c:choose>
                        </td>

            
						<td>
						    <c:choose>
						        <c:when test="${entryStatusMap[eday.eday_idx] != null}">
						            <button class="withdrawBtn"
						                    data-eday-idx="${eday.eday_idx}"
						                    data-store-idx="${sessionScope.storeIdx}"
						                    onclick="withdrawEntry(this)">
						                	철회
						            </button>
						        </c:when>
						        <c:otherwise>
				
						        </c:otherwise>
						    </c:choose>
						</td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</div>

<style>
.modal {
  display: none; /* 기본은 숨김 */
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6); /* 반투명 검정 배경 */
}

/* 모달 콘텐츠 영역 */
.modal-content {
  background-color: #fff;
  margin: 10% auto; /* 위에서 10%, 가운데 정렬 */
  padding: 30px;
  border-radius: 12px;
  width: 80%;
  max-width: 990px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
}

/* 닫기 버튼 */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
}

/* 테이블 스타일 */
.modal-content table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.modal-content th,
.modal-content td {
  border: 1px solid #ccc;
  padding: 12px;
  text-align: center;
}

.modal-content th {
  background-color: #f5f5f5;
}

/* 버튼 */
.modal-content button {
  padding: 8px 14px;
  font-size: 14px;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #0056b3;
}

/* 애니메이션 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>