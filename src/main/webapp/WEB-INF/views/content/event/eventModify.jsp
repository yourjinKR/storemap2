<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<a href="javascript:history.back();" class="back-btn" >
	<span class="material-symbols-outlined">
		undo
	</span>
</a>

<div class="event-register-wrapper">
	<div class="panel-body">	
		<form method="POST" action="/event/eventModify" enctype="multipart/form-data">
		  <input type="hidden" name="event_idx" value="${evo.event_idx}" />
		
		  <table>
		    <tbody>
		      <tr>
		        <th>행사명</th>
		        <td>
		          <input type="text" name="event_title" value="${evo.event_title}" required />
		        </td>
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
		          	<div class="rdate">
		          <input type="date" name="event_rstartdate" value="${evo.event_rstartdate}" readonly />
		          ~
		          <input type="date" name="event_rstopdate" value="${evo.event_rstopdate}" readonly />
		        	</div>
		        </td>
		      </tr>
		
		      <tr>
		        <th>행사 날짜</th>
		        <td>
		          <div class="bdate">
		          <input type="date" name="event_bstartdate" value="${evo.event_bstartdate}" readonly />
		          ~
		          <input type="date" name="event_bstopdate" value="${evo.event_bstopdate}" readonly />
		          <button type="button" disabled>일정 생성</button>
		          </div>
		        </td>
		      </tr>
		
		      <tr>
		        <th>행사 장소</th>
		        <td>
		          <jsp:include page="../../content/modal/postcodeForm.jsp" />
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
		
		          <input type="file" name="eventImages" accept="image/*" id="newImageInput" multiple />
		
		          <div id="newImagesPreview" style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;"></div>
		
		          <small style="color: gray;">삭제한 이미지는 수정 완료 시 반영됩니다.</small>
		
		          <input type="hidden" name="deleteUuids" id="deletedUuidsInput" />
		        </td>
		      </tr>
		    </tbody>
		  </table>

		  <div class="panel-body-btns">
		    <button type="button" class="eventBtn" id="modifyBtn">수정 완료</button>
		    <button type="button" class="eventBtn" onclick="history.back();">취소</button>
		  </div>
		</form>
	</div>
</div>

<script>
const deletedUuidsInput = document.getElementById('deletedUuidsInput');
const existingImages = document.getElementById('existingImages');
const newImageInput = document.getElementById('newImageInput');
const newImagesPreview = document.getElementById('newImagesPreview');

let deletedUuids = [];
let currentFiles = [];


// 기존 이미지 삭제
if (existingImages) {
  
  existingImages.addEventListener('click', function (e) {
    
    if (e.target.classList.contains('deleteExistingImageBtn')) {
      const imageBox = e.target.closest('.imageBox');
      if (!imageBox) return;

      const uuid = imageBox.dataset.uuid;
      if (uuid) {
        deletedUuids.push(uuid);
        deletedUuidsInput.value = deletedUuids.join(',');
      }
      imageBox.remove();
    }
  });
}

// 새 이미지 선택 및 미리보기
if (newImageInput) {
  newImageInput.addEventListener('change', function (e) {
    const files = Array.from(e.target.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

    // 총 이미지 개수 제한 4장
    const existCount = existingImages ? existingImages.querySelectorAll('.imageBox').length : 0;
    if (existCount + currentFiles.length + files.length > 4) {
      alert('이미지는 최대 4장까지 업로드 가능합니다.');
      newImageInput.value = '';
      return;
    }

    files.forEach(file => {
      if (validTypes.includes(file.type)) {
        currentFiles.push(file);
      } else {
        alert(file.name + " 은 지원하지 않는 이미지 형식입니다.");
      }
    });

    updateNewImagesPreview();
  });
}

// 새 이미지 미리보기 갱신 함수
function updateNewImagesPreview() {
  newImagesPreview.innerHTML = '';

  currentFiles.forEach((file, idx) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const box = document.createElement('div');
      box.className = 'imageBox';
      box.style.position = 'relative';
      box.style.display = 'inline-block';
      box.style.marginRight = '8px';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.width = '100px';
      img.style.height = 'auto';
      img.style.objectFit = 'cover';
      img.style.border = '1px solid #ccc';
      img.style.borderRadius = '6px';
      img.style.display = 'block';

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.textContent = '×';
      delBtn.style.position = 'absolute';
      delBtn.style.top = '2px';
      delBtn.style.right = '2px';
      delBtn.style.background = 'rgba(0,0,0,0.6)';
      delBtn.style.color = '#fff';
      delBtn.style.border = 'none';
      delBtn.style.borderRadius = '50%';
      delBtn.style.width = '20px';
      delBtn.style.height = '20px';
      delBtn.style.cursor = 'pointer';

      delBtn.addEventListener('click', () => {
        currentFiles.splice(idx, 1);
        updateNewImagesPreview();
        updateInputFiles();
      });

      box.appendChild(img);
      box.appendChild(delBtn);
      newImagesPreview.appendChild(box);
    };
    reader.readAsDataURL(file);
  });

  updateInputFiles();
}

// input[type=file] 파일 목록 갱신 함수
function updateInputFiles() {
  const dataTransfer = new DataTransfer();
  currentFiles.forEach(f => dataTransfer.items.add(f));
  newImageInput.files = dataTransfer.files;
}

// 폼 제출 시 삭제 UUID 값 세팅
const form = document.querySelector('form');
if (form && deletedUuidsInput) {
  form.addEventListener('submit', () => {
    deletedUuidsInput.value = deletedUuids.join(',');
  });
}  
</script>

<script src="/resources/js/event.js"></script>

<style>
  * {
    box-sizing: border-box;
  }
  body{height:100vh}
  h3{font-size: 36px;font-weight:bold;text-align:center;padding:30px 0 50px}
  .right-nav{display:none;}
  .header{display:none;}
  .wrap{width:100%;background: var(--point-color);padding:75px 0 100px;display:flex;justify-content: center;align-items: center;flex-direction: column;}
  .rdate{display:flex;align-items: center;justify-content: space-between;}
  .rdate input[type="date"]{width:48%}
  .bdate{display:flex;align-items: center;justify-content: space-between;}
  .bdate input[type="date"]{width:40%}
  .bdate button{background:var(--point-color3);color:var(--font-color);border:none;height:40px;border-radius:5px;font-weight:bold;padding:0 20px;font-size:18px;box-shadow: 0 2px 5px rgba(0,0,0,0.1);}
  #postcode{width:100% !important;}
  #postcode input{margin-top:10px;}
  #postcodeInput{max-width:250px;}
  #search-postcode{background:var(--point-color3);color:var(--font-color);border:none;height:40px;border-radius:5px;font-weight:bold;padding:0 20px;font-size:18px;box-shadow: 0 2px 5px rgba(0,0,0,0.1);vertical-align: bottom;margin-left:5px;}
  #imageInput{line-height:40px;padding: 0 10px;border-color:var(--font-color)}
  
  fieldset{color:var(--font-color)}
  fieldset strong{font-weight:bold}
  .event-register-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    padding: 30px;
    background-color: var(--inner-color);
    border-radius: 12px;
    color: #333;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.1)
  }

  .event-register-wrapper table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  .event-register-wrapper th,
  .event-register-wrapper td {
    padding: 12px;
    vertical-align: top;
  }

  .event-register-wrapper th {
    width: 150px;
    font-weight: bold;
    font-size:24px;
    color: var(--font-color);
    text-align:left;
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
    height:40px;
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
    background-color: var(--point-color3);
    color: var(--font-color);
    border: none;
    padding: 12px 25px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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