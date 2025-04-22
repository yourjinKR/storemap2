<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="menu">
	<!-- 댓글처럼하기 -->
	<div class="menu_input">
    	<h1>메뉴추가</h1>
    	<label for="mname">메뉴</label>
    	<input type="text" id="mname" name="menu_name">
    	<label for="mprice">가격</label>
    	<input type="text" id="mprice" name="menu_price">
    	<!-- input_list삭제할지 쓸지 결정 -->
        <div class="input_list">
            <input type="text" name="input_array[]" placeholder="입력해주세요." />
        </div>
    </div>
    <button class="add_menu">메뉴 추가</button>
	<!-- 댓글목록처럼하기 -->
	<div class="menu-list">
		<h1>메뉴관리</h1>
		<ul>
			<c:forEach var="vo" items="${list}">
				<li data-store_idx="${vo.menu_idx}" onclick="viewModalPage(this)" name="menu_idx">
					<img src="/resources/img/${vo.menu_image}" alt="${vo.menu_image}" class="menu-image">
					<div class="menu-description">
						<div class="menu-name">${vo.menu_name}</div>
						<div class="menu-price">₩${vo.menu_price}</div>
					</div>
					<br>
				</li>
			</c:forEach>
		</ul>
	</div>
	<!-- 메뉴 수정 모달 -->
    
</div>
<script type="text/javascript" src="/resources/js/menu.js"></script>