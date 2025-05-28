<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="delete-modal">
	<div class="modal-inner">
		<h3>회원탈퇴</h3>
		<form id="delete-form" method="post">
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
				<button type="button" class="delete-btn" onclick="deleteAction();">탈퇴하기</button>
			</div>
		</form>
	</div>
</div>
