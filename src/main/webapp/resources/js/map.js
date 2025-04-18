const MAIN_CSS_FILE_PATH = '/resources/css/map.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = MAIN_CSS_FILE_PATH;
document.head.appendChild(linkEle);

console.log("map.js load");


// 페이지 로드 후 script 실행
document.addEventListener("DOMContentLoaded", (event) => {
    // 위도 경도 설정 (솔데스크 강남점)
    let latBasic = 37.5054070438773;
    let lngBasic = 127.026682479708;
    let optionBasic = {center: new kakao.maps.LatLng(latBasic, lngBasic), level: 3};

    // 지도 출력 테스트 ===============================
	let container1 = document.getElementById('map');
	let option = {center: new kakao.maps.LatLng(37.5054070438773, 127.026682479708), level: 3};
	var map = new kakao.maps.Map(container1, option);
	
	// 지도 이동 테스트 ===============================
	let container2 = document.getElementById('map2');
	var testMap = new kakao.maps.Map(container2, optionBasic);

	
    document.querySelectorAll("#mapLab button").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault;
            let type = btn.getAttribute("id");
            console.log(type);
            // 지도 중심좌표 부드럽게 이동하기
            if (type === "panToTest") {
                panToLatLng(testMap, latBasic, lngBasic);
            } 
            // 마커 생성 및 보기
            else if (type === "markerTest") {
                addMarker(testMap, latBasic, lngBasic);
            } 
            // 마커 한번에 등록 및 보기
            else if (type === "markerListView") {
                registerMarker(37.504724, 127.02538);
                registerMarker(37.5056370385705, 127.025605528158);
                showMarkers(testMap);
            }
            // 마커 한번에 숨기기
            else if (type === "markerListHide") {
                hideMarkers(testMap);
            }
        })
    });

    // ============================ 지도 관련 함수 ============================
    // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
    let markers = [];

    // 지도 이동
    function panToLatLng(map, lat, lng) {
        // 좌표설정
        let moveLatLon = new kakao.maps.LatLng(lat, lng);	
        // 이동
        map.panTo(moveLatLon);
    }

    // // 지도 마커 추가 (구버전)
    function addMarker(map, lat, lng) {
        // 마커가 표시될 위치
        let markerPosition  = new kakao.maps.LatLng(lat, lng); 
        // 마커 생성
        let marker = new kakao.maps.Marker({
            position: markerPosition
        });
        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(map);
    }

    // 마커 리스트에 마커 등록
    function registerMarker(lat, lng) {
        // 마커 위치 설정
        let markerPosition  = new kakao.maps.LatLng(lat, lng); 
        // 마커 생성
        let marker = new kakao.maps.Marker({
            position: markerPosition
        });
        // 생성된 마커를 배열에 추가합니다
        markers.push(marker);
    }

    // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
    function setMarkers(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }            
    }

    // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
    function showMarkers(map) {
        setMarkers(map)    
    }

    // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
    function hideMarkers() {
        setMarkers(null);    
    }

});

