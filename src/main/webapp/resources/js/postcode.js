console.log("postcode load");

let postMap; // 우편번호 지도
document.addEventListener("DOMContentLoaded", () => {

    // 지도 위도 경도 설정 (솔데스크 강남점)
    let latBasic = 37.5054070438773;
    let lngBasic = 127.026682479708;
    // 기본값 설정
    let optionBasic = {center: new kakao.maps.LatLng(latBasic, lngBasic), level: 3};

    let container = document.querySelector('.map#postcode');
    // postMap = new kakao.maps.Map(container, optionBasic);
});

/** 우편번호 서비스 api (map을 입력) */
function pcodeService(map) {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let roadAddr = data.roadAddress; // 도로명 주소 변수
            let extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcodeInput').value = data.zonecode;
            document.getElementById("roadAddressInput").value = roadAddr;
            document.getElementById("jibunAddressInput").value = data.jibunAddress;
            
            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("extraAddressInput").value = extraRoadAddr;
            } else {
                document.getElementById("extraAddressInput").value = '';
            }

            let guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
                let expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            } else if(data.autoJibunAddress) {
                let expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                guideTextBox.style.display = 'block';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
            // 지도에 마킹
            markByPcode(map, data.address);
        }
    }).open();
}

/** 우편번호 검색 결과를 입력하면 지도에 마킹하는 함수 */
function markByPcode(map, result) {
    clickMarker.setMap(null);

    let resultAddr = result;

    // console.log(resultAddr); // 예시) 경기 성남시 중원구 박석로25번길 44-8
    let geocoder = new daum.maps.services.Geocoder();

    // 주소로 상세 정보를 검색
    geocoder.addressSearch(resultAddr, function(results, status) {

        // 정상적으로 검색이 완료됐으면
        if (status === daum.maps.services.Status.OK) {

            let result = results[0]; //첫번째 결과의 값을 활용
            console.log(result);
            let lat = result.y;
            let lng = result.x;

            panToLatLng(map, lat, lng);
        
            // 해당 주소에 대한 좌표를 받아서
            let coords = new daum.maps.LatLng(result.y, result.x);
            // // 지도를 보여준다.
            // mapContainer.style.display = "block";
            // map.relayout();
            // // 지도 중심을 변경한다.
            // map.setCenter(coords);
            // // 마커를 결과값으로 받은 위치로 옮긴다.
            let marker = new daum.maps.Marker({
                position: new daum.maps.LatLng(37.537187, 127.005476),
                map: map
            });

            marker.setPosition(coords);
        }
    });
}