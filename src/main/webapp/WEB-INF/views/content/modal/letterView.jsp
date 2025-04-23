<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="letter-view">
	<table>
		<caption>쪽지 View</caption>
		<colgroup>
			<col width="90px">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th><label for="letterWriter">보낸 사람 : </label></th>
				<td><input type="text" id="letterWriter" readonly="readonly"></td>
			</tr>
			<tr>
				<th><label for="letterReceiver">받는 사람 : </label></th>
				<td><input type="text" id="letterReceiver" readonly="readonly"></td>
			</tr>
			<tr>
				<th class="v-top"><label for="letterContent" class="pt5">내 용 : </label></th>
				<td><textarea id="letterContent" readonly="readonly"></textarea></td>
			</tr>
		</tbody>
	</table>
	
	<a href="read">확인</a>
</div>
