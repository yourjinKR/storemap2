<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/event.js"></script>
	
	
<a href="javascript:history.back();" class="back-btn" >
	<span class="material-symbols-outlined">
		undo
	</span>
</a>
	
<h3>이벤트 등록</h3>

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
								<option value="기타">기타</option>
							</select>
						</td>
					</tr>
					<tr>
						<th>모집 날짜</th>
						<td>
							<div class="rdate">
								<input type="date" name="event_rstartdate" id="rstartDate" required> ~ 
								<input type="date" name="event_rstopdate" id="rendDate" required>
							</div>
						</td>
					</tr>
					<tr>
						<th>행사 날짜</th>
						<td>
							<div class="bdate">
								<input type="date" name="event_bstartdate" id="startDate" required> ~ 
								<input type="date" name="event_bstopdate" id="endDate" required>
								<button type="button" onclick="generateDays()">일정 생성</button>
							</div>
							<small style="color: var(--font-color)">이벤트 및 행사는 모집일로부터 7일 이후부터 개최할 수 있습니다.</small>
						</td>
					</tr>
					<tr class="hide">
						<th>날짜별 설정</th>
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
							<small style="color: var(--font-color);">이미지는 최대 4장까지 업로드할 수 있으며, 첫번째 이미지는 포스터, 두번째 이미지는 대표 사진으로 설정됩니다.</small>
							<div id="previewContainer" style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;"></div>
						</td>
					</tr>        	
				</tbody>
			</table>
			<input type="hidden" name="enter_idx" value="${loginUserIdx }">
			<div class="panel-body-btns">
				<button type="button" class="eventBtn" id="registerBtn">등록</button> 
				<button type="reset" class="eventBtn" id="resetBtn">초기화</button>
				<button type="button" class="eventBtn" id="listBtn">목록</button>
			</div>
		</form>
	</div>
</div>

	<div class="saving-overlay" id="savingUI">
		<div class="saving-box">
			<div class="spinner"></div>
			<div class="saving-text">등록 중...</div>
		</div>
	</div>

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
  
.saving-overlay {position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.4);display: none;justify-content: center;align-items: center;z-index: 9999;}
.saving-overlay.save {display:flex;}
.saving-box {background: white;padding: 30px 50px;border-radius: 10px;box-shadow: 0 4px 10px rgba(0,0,0,0.2);display: flex;flex-direction: column;align-items: center;}
.spinner {border: 6px solid #f3f3f3;border-top: 6px solid #3498db;border-radius: 50%;width: 40px;height: 40px;animation: spin 1s linear infinite;margin-bottom: 15px;}
.saving-text {font-size: 18px;font-weight: bold;color: #333;}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg);}
}
</style>
