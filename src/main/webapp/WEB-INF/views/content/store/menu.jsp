<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="menu">
	<h1>메뉴관리</h1>
	
	<label>메뉴추가</label>
    <table class="menu-table">
      <tr>
        <th>메뉴</th>
        <th>가격</th>
        <th>사진</th>
        <th>대표 메뉴 여부 체크박스</th>
      </tr>
      <tr>
        <td><input type="text" name="menu_name" placeholder="메뉴"></td>
        <td><input type="text" name="menu_price" placeholder="가격"></td>
        <td>
        	<input type="text" name="menu_image" value="menu11.jpg">
        </td>
        <td><input type="checkbox"></td>
      </tr>
    </table>
    <div class="input_wrap">
        <div class="input_list">
            <input type="text" name="input_array[]" placeholder="입력해주세요." />
        </div>
    </div>
    <button class="add_field">메뉴 추가</button>
    
</div>
<script type="text/javascript" src="/resources/js/menu.js"></script>