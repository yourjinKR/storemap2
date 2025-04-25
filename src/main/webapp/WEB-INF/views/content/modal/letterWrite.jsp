<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<div class="letter-form">
	<table>
		<caption>쪽지 View</caption>
		<colgroup>
			<col width="100px">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th><label>받는 사람 : </label></th>
				<td class="por">
					<input type="text" name="letter_receiver" class="letter-receiver" readonly="readonly">
					<ul class="list-detail">
						
					</ul>				
				</td>
			</tr>
			<tr>
				<th><label>이벤트 선택 : </label></th>
				<td>
					<select class="attend-list">
						
					</select>
				</td>
			</tr>
			
			<tr>
				<th class="v-top"><label class="pt5">내 용 : </label></th>
				<td><textarea name="letter_content" class="letter-content"></textarea></td>
			</tr>
		</tbody>
	</table>
	<a href="post">보내기</a>
</div>