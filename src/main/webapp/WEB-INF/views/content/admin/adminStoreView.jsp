<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
	<h1>점포 관리</h1>
    <hr>
    <div>
        <table>
            <thead>
                <tr>
                    <th>멤버idx</th>
                    <th>승인여부</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="vo" items="${reqList}">
                    <tr>
                        <td>${vo.member_idx}</td>
                        <td>${vo.pon}</td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</div>