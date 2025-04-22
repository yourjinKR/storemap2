<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>게시글 상세 보기</title>
  <link rel="stylesheet" href="css/event.css">
  <style>
    .readonly-form {
      max-width: 600px;
      margin: 30px auto;
      background-color: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }

    .readonly-form h2 {
      margin-bottom: 20px;
    }

    .readonly-form .field {
      margin-bottom: 15px;
    }

    .readonly-form .label {
      font-weight: bold;
      margin-bottom: 6px;
      display: block;
    }

    .readonly-form .value {
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 6px;
      border: 1px solid #ddd;
      white-space: pre-wrap;
    }

    .photo-preview {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .photo-preview img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid #ccc;
    }

    button {
      margin-top: 20px;
      padding: 10px 20px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      background-color: #eee;
    }
  </style>
</head>
<body>

  <div class="readonly-form">
    <h2>🎪 2025 봄꽃 축제</h2>

    <div class="field">
      <span class="label">카테고리</span>
      <div class="value">축제</div>
    </div>

    <div class="field">
      <span class="label">행사 기간</span>
      <div class="value">2025-04-07 ~ 2025-04-10</div>
    </div>

    <div class="field">
      <span class="label">일정</span>
      <div class="value">
1일차: 오프닝 퍼레이드  
2일차: 지역 특산품 전시  
3일차: 메인 콘서트  
4일차: 폐막 불꽃놀이
      </div>
    </div>

    <div class="field">
      <span class="label">사진</span>
      <div class="photo-preview">
        <img src="https://via.placeholder.com/100" alt="사진1">
        <img src="https://via.placeholder.com/100" alt="사진2">
      </div>
    </div>

    <div class="field">
      <span class="label">장소</span>
      <div class="value">서울 여의도 한강공원</div>
    </div>

    <div class="field">
      <span class="label">상세 주소</span>
      <div class="value">서울특별시 영등포구 여의동로 330</div>
    </div>

    <div class="field">
      <span class="label">이벤트 소개</span>
      <div class="value">
서울 한복판에서 열리는 전국 최대 규모 봄꽃 축제입니다!  
가족 단위, 연인, 친구 모두 함께 즐길 수 있는 체험과 먹거리가 가득합니다.
      </div>
    </div>

    <div class="field">
      <span class="label">대표전화</span>
      <div class="value">010-1234-5678</div>
    </div>

    <button onclick="history.back()">← 목록으로 돌아가기</button>
  </div>

</body>
</html>