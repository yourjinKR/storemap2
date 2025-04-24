<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="menu">
    <button type="button" class="add_menu" id="addMenuPageBtn">메뉴 추가</button>
	<button type="button" class="add_menu" id="storeBtn">점포 관리</button>
	<!-- 메뉴 목록 -->
	<div class="menu-list">
		<h1>메뉴관리</h1>
		<ul class="menu-page">
				<li data-store_idx="10" class="menu-li">
					<img class="menu-image">
					<div class="menu-description">
						<div class="menu-name">메뉴이름</div>
						<div class="menu-price">가격</div>
						<a class="remove_menu">삭제</a>
					</div>
					<br>
				</li>
		</ul>
	</div>
	<!-- 메뉴 추가 모달 -->
	<div id="add-modal">
		<div class="add-modal-content">
			<div class="menu-add">
				<h3>메뉴추가</h3>
				<input type="hidden" name="store_idx" value="${store_idx}">
		    	<label for="mimage">이미지</label>
		    	<input type="file" id="mimage" name="menu_image">
		    	<label for="mname">메뉴</label>
		    	<input type="text" id="mname" name="menu_name">
		    	<label for="mprice">가격</label>
		    	<input type="text" id="mprice" name="menu_price">
			</div>
			<button type="button" class="add_menu" id="addMenuBtn">메뉴 등록</button>
		</div>
	</div>
	<!-- 메뉴 수정 모달 -->
	<div id="modify-modal">
		<div class="modify-modal-content">
		    <div class="menu-update">
		    	<h3>메뉴수정</h3>
		    	<input type="hidden" name="store_idx" value="${store_idx}">
		    	<label for="modifyImage">이미지</label>
		    	<input type="text" id="modifyImage" name="modify_image" readonly>
		    	<label for="modifyName">메뉴</label>
		    	<input type="text" id="modifyName" name="modify_name">
		    	<label for="modifyPrice">가격</label>
		    	<input type="text" id="modifyPrice" name="modify_price">
			    <button type="button" class="btn-modify" id="modifyMenuBtn">수정</button>
			    <button type="button" class="btn-remove" id="removeMenuBtn">삭제</button>
		    </div>
	    </div>
	</div>
</div>
<script type="text/javascript" src="/resources/js/menu.js"></script>