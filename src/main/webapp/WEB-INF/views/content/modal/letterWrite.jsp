<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="letter-form">
	<table>
		<caption>쪽지 Write</caption>
		<colgroup>
			<col width="100px">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th><label>받는 사람 : </label></th>
				<td class="por">
					<input type="text" name="receiver_text" class="letter-receiver" ${userType eq 'admin' ? '' : 'readonly="readonly"'}>
					<input type="hidden" name="letter_receiver" class="hidden-receiver" readonly="readonly">
					<c:if test="${not empty userType and userType eq 'enter'}">
					<ul class="list-detail">
						
					</ul>				
					</c:if>
				</td>
			</tr>
			<c:if test="${not empty userType and userType eq 'enter' or userType eq 'owner'}">
				<tr class="event-select">
					<th><label>이벤트 선택 : </label></th>
					<td>
						<select class="attend-list">
							
						</select>
					</td>
				</tr>
			</c:if>
			
			<tr>
				<th class="v-top"><label class="pt5">내 용 : </label></th>
				<td><textarea name="letter_content" class="letter-content"></textarea></td>
			</tr>
		</tbody>
	</table>
	<a href="post">보내기</a>
</div>