const f = document.forms[0];

const CSS_PATH = '/resources/css/menu.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_PATH;
document.head.appendChild(linkEle);

const wrapper = $('.input_wrap'); // 입력 필드를 포함하는 컨테이너 선택
const addButton = $('.add_field'); // 추가 버튼 선택
const maxFields = 10; // 최대 입력 필드 수 설정
let fieldCount = 1; // 현재 입력 필드 수

// '추가하기' 버튼 클릭 시 이벤트
addButton.click(function(e) {
    e.preventDefault(); // 페이지 리로드 방지
    if (fieldCount < maxFields) { // 최대 필드 수 체크
        fieldCount++; // 필드 수 증가
        // 새 입력 필드 추가
        wrapper.append(`
            <div class="input_list">
                <input type="text" name="input_array[]" placeholder="입력해주세요." />
                <a href="javascript:void(0);" class="remove_field">삭제</a>
            </div>
        `);
    }
});

// '삭제' 링크 클릭 시 이벤트
wrapper.on('click', '.remove_field', function(e) {
    e.preventDefault(); // 페이지 리로드 방지
    $(this).parent('.input_list').remove(); // 필드 제거
    fieldCount--; // 필드 수 감소
});