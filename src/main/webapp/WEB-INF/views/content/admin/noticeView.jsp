<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="/resources/js/notice.js"></script>
<div class="notice-wrap">
	<h3>공지사항</h3>

	<table>	
		<tbody>
			<tr>
				<th class="t-l">제목</th>
			</tr>
			<tr>
				<td>
					<div class="notice-title" data-idx="${vo.announce_idx}">${vo.announce_title}</div>
				</td>
			</tr>
			<tr>
				<th class="t-l">내용</th>
			</tr>
			<tr>
				<td>
					<div class="content-box">
						${vo.announce_content}
					</div>
				</td>
			</tr>
		</tbody>
	</table>
	
	<div class="btn-box">
		<a href="noticeDelete">삭제</a>
		<a href="noticeList">목록</a>
	</div>
</div>
