<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:if test="${empty loginUser and loginUser eq ''}">
<script type="text/javascript">
	alert("잘못된 접근입니다.");
	history.back();
</script>
</c:if>

<div class="member-wrap">
	<a href="javascript:history.back();" class="back-btn">
		<span class="material-symbols-outlined">
			undo
		</span>
	</a>
	<div>
		<h3>회원탈퇴</h3>
		<form action="/member/delete" method="post">
			<table>
				<colgroup>
					<col width="145px">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><label for="pw">비밀번호 확인</label></th>
						<td>
							<input type="password" id="pw" name="pw" placeholder="비밀번호를 입력해주세요" required/>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="btn-box">
				<button type="submit">탈퇴하기</button>
				<button type="button" onclick="location.href='/'">돌아가기</button>
			</div>
		</form>
	</div>
</div>