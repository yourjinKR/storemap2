<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>행사 입력</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 20px;
    }
    label, select, input, textarea, button {
      display: block;
      margin: 10px 0;
    }
    .photo-container {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
    .photo-box {
      width: 100px;
      height: 100px;
      background-color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .multi-inputs input {
      margin-bottom: 5px;
    }
  </style>
<link rel="stylesheet" href="/resources/css/event.css">
</head>
<body>

  <h2>행사명 입력</h2>

  <label for="category" class="eventRegister">카테고리</label>
  <select id="category">
    <option value="축제">축제</option>
    <option value="박람회">박람회</option>
    <option value="전시회">전시회</option>
    <option value="기타">기타</option>
  </select>

  <label for="startDate" class="eventRegister">입력 시작일</label>
  <input type="date" id="startDate">

  <label for="endDate" class="eventRegister">입력 종료일</label>
  <input type="date" id="endDate">

  <div class="multi-inputs">
    <label>n일차 입력</label>
    1일차 입점수<input type="text" placeholder="일정 내용을 입력">
    1일차 입점수<input type="text" placeholder="일정 내용을 입력">
    1일차 입점수<input type="text" placeholder="일정 내용을 입력">
    <input type="text" placeholder="일정 내용을 입력">
    <input type="text" placeholder="일정 내용을 입력">
  </div>

  <label>사진 업로드</label>
  <div class="photo-container" id="photoContainer">
    <div class="photo-box">사진</div>
    <div class="photo-box">사진</div>
    <button onclick="addPhoto()">+</button>
  </div>

  <label for="location">장소</label>
  <input type="text" id="location" placeholder="주소 입력">
  <input type="text" placeholder="상세 주소 입력">

  <label for="description">이벤트 내용 소개</label>
  <textarea id="description" rows="4" cols="50"></textarea>

  <label for="tel">대표전화(주최자연락처)</label>
  <input type="text" id="tel" placeholder="예: 010-1234-5678">

  <br>
  <button onclick="submitForm()">입력</button>
  <button onclick="resetForm()">다시작성</button>