<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet">

<script type="text/javascript" src="/resources/js/notice.js"></script>

<div class="notice-wrap">
	<h3>공지사항</h3>
	
	<form method="post">
		<input type="hidden" name="member_idx" value="${loginUserIdx}">
		<input type="hidden" name="announce_content">
		<input type="hidden" name="fixed" value="0">

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
			<a href="noticeInsert" class="btn write-btn">등록</a>
		</div>
	</form>
</div>