	<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <script src="/resources/js/event.js"></script>

<form method="POST" action="/event/eventModify" enctype="multipart/form-data">
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
          <!-- 기존 이미지 리스트 (삭제 가능한) -->
          <div id="existingImages" style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:10px;">
            <c:forEach var="file" items="${fileList}">
              <div class="imageBox" data-uuid="${file.uuid}" style="position: relative;">
                <img src="${file.url}" style="width:100px; height:auto; display:block;" />
                <button type="button" class="deleteExistingImageBtn" 
                        style="position: absolute; top:2px; right:2px; background: red; color:white; border:none; border-radius:50%; width:20px; height:20px; cursor:pointer;">
                  ×
                </button>
              </div>
            </c:forEach>
            <c:forEach var="url" items="${externalUrls}">
              <div class="imageBox" style="position: relative;">
                <img src="${url}" style="width:100px; height:auto; display:block;" />
              </div>
            </c:forEach>
          </div>

          <!-- 새로 추가할 이미지 선택 -->
          <input type="file" name="newEventImages" accept="image/*" id="newImageInput" multiple>
          
          <!-- 새로 추가된 이미지 미리보기 -->
          <div id="newImagesPreview" style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;"></div>

          <small style="color: gray;">삭제한 이미지는 수정 완료 시 반영됩니다.</small>
          
          <!-- 삭제된 기존 이미지 UUID 전달용 hidden -->
          <input type="hidden" name="deletedUuids" id="deletedUuidsInput" />
        </td> 
      </tr>
    </tbody>
  </table>

  <div class="panel-body-btns">
    <button type="submit" class="eventBtn" id="modifyBtn">수정 완료</button> 
    <button type="button" class="eventBtn" onclick="history.back();">취소</button>
  </div>
</form>

<script>
  const newImageInput = document.getElementById('newImageInput');
  const newImagesPreview = document.getElementById('newImagesPreview');

  if (newImageInput) {
    newImageInput.addEventListener('change', function (event) {
      newImagesPreview.innerHTML = ""; // 초기화
      const files = Array.from(event.target.files);
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

      files.forEach(file => {
        if (!validTypes.includes(file.type)) {
          alert(`${file.name} 은 지원하지 않는 형식입니다.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
          const wrapper = document.createElement('div');
          wrapper.style.position = 'relative';
          wrapper.style.display = 'inline-block';

          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.width = '100px';
          img.style.height = 'auto';
          img.style.borderRadius = '6px';

          const btn = document.createElement('button');
          btn.textContent = '×';
          btn.type = 'button';
          btn.style.position = 'absolute';
          btn.style.top = '2px';
          btn.style.right = '2px';
          btn.style.background = 'rgba(0,0,0,0.6)';
          btn.style.color = '#fff';
          btn.style.border = 'none';
          btn.style.borderRadius = '50%';
          btn.style.width = '20px';
          btn.style.height = '20px';
          btn.style.cursor = 'pointer';

          btn.addEventListener('click', () => wrapper.remove());

          wrapper.appendChild(img);
          wrapper.appendChild(btn);
          newImagesPreview.appendChild(wrapper);
        };
        reader.readAsDataURL(file);
      });
    });
  }
</script>