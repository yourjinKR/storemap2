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
				<td><input type="text" name="letter_writer" class="letter-writer" value="${ loginUser }" readonly="readonly"></td>
			</tr>
			<tr>
				<th><label>받는 사람 : </label></th>
				<td><input type="text" name="letter_receiver" class="letter-receiver"></td>
			</tr>
			<tr>
				<th class="v-top"><label class="pt5">내 용 : </label></th>
				<td><textarea name="letter_content" class="letter-content"></textarea></td>
			</tr>
		</tbody>
	</table>
	<a href="post">보내기</a>
</div>