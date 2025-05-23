	<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<form method="POST" action="/event/eventModify">
  <input type="hidden" name="event_idx" value="${evo.event_idx}"/>

  <table>
    <tbody>
      <tr>
        <th>행사명</th>
        <td><input type="text" name="event_title" value="${evo.event_title}" required></td>
      </tr>
      <tr>
        <th>카테고리</th>
        <td>
          <select name="event_category" disabled>
            <option selected>${evo.event_category}</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>모집 날짜</th>
        <td>
          <input type="date" name="event_rstartdate" value="${evo.event_rstartdate}" readonly> ~ 
          <input type="date" name="event_rstopdate" value="${evo.event_rstopdate}" readonly>
        </td>
      </tr>
      <tr>
        <th>행사 날짜</th>
        <td>
          <input type="date" name="event_bstartdate" value="${evo.event_bstartdate}" readonly> ~ 
          <input type="date" name="event_bstopdate" value="${evo.event_bstopdate}" readonly>
          <button type="button" disabled>일정 생성</button>
        </td>
      </tr>
      <tr>
        <th>행사 장소</th>
        <td>
          <input type="text" name="event_location" value="${evo.event_location}" required />
        </td>
      </tr>
      <tr>
        <th>내용</th>
        <td>
          <textarea name="event_content" rows="10" cols="76" style="resize: none;">${evo.event_content}</textarea>
        </td>
      </tr>
      <tr>
        <th>대표 이미지</th>
        <td>
          <input type="file" name="eventImage" accept="image/*" id="imageInput" multiple disabled>
          <div id="previewContainer" style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
            <c:forEach var="file" items="${fileList}">
              <img src="${file.url}" style="width:100px; height:auto;" />
            </c:forEach>
            <c:forEach var="url" items="${externalUrls}">
              <img src="${url}" style="width:100px; height:auto;" />
            </c:forEach>
          </div>
          <small style="color: gray;">이미지는 수정 불가합니다.</small>
        </td>
      </tr>        
    </tbody>
  </table>

  <div class="panel-body-btns">
    <button type="submit" class="eventBtn" id="modifyBtn">수정 완료</button> 
    <button type="button" class="eventBtn" onclick="history.back();">취소</button>
  </div>
</form>