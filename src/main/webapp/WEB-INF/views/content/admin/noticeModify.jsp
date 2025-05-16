<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- Quill 라이브러리 -->
<script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.min.js"></script>
<!-- ImageResize 모듈 -->
<script src="https://cdn.jsdelivr.net/gh/scrapooo/quill-resize-module@1.0.2/dist/quill-resize-module.js"></script>
<script type="text/javascript" src="/resources/js/notice.js"></script>
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet">

<c:if test="${ loginUser eq '' or userType ne 'admin'}">
<script type="text/javascript">
	alert("잘못 된 접근입니다.");
	location.href="/admin/notice";
</script>
</c:if>
<div class="notice-wrap">
	<h3>공지사항</h3>
	
	<form method="post" enctype="multipart/form-data">
		<input type="hidden" name="announce_content" id="quill_html">
		<input type="hidden" name="fixed" value="0">
		<input type="hidden" name="announce_image">
		<input type="hidden" name="announce_idx">

		<table>	
			<tbody>
				<tr>
					<th class="t-l">제목</th>
				</tr>
				<tr>
					<td><input type="text" name="announce_title"></td>
				</tr>
				<tr>
					<th class="t-l">내용</th>
				</tr>
				<tr>
					<td>
						<div class="mt15">
							<div id="editor">
							  
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="btn-box">
			<a href="noticeUpdate" class="btn write-btn">저장</a>
		</div>
	</form>
	
	<div class="saving-overlay" id="savingUI">
		<div class="saving-box">
			<div class="spinner"></div>
			<div class="saving-text">저장 중...</div>
		</div>
	</div>
</div>