<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="letter-form">
	<table>
		<caption>쪽지 View</caption>
		<colgroup>
			<col width="90px">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th><label>보낸 사람 : </label></th>
				<td><input type="text" class="letter-writer" readonly="readonly"></td>
			</tr>
			<tr>
				<th class="v-top"><label class="pt5">내 용 : </label></th>
				<td><textarea class="letter-content" readonly="readonly"></textarea></td>
			</tr>
		</tbody>
	</table>
	
	<a href="read">확인</a>
</div>
