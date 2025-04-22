// const MAIN_CSS_FILE_PATH = '/resources/css/map.css';
// let linkEle = document.createElement('link');
// linkEle.rel = 'stylesheet';
// linkEle.href = MAIN_CSS_FILE_PATH;
// document.head.appendChild(linkEle);

console.log("map.js load");

// 장소 테스트
const store1 = {store_idx: 1, store_name: "상점1"};

// 마커 아이콘 설정 kakao.maps.MarkerImage(src, size[, options])
// ================== 마커 src ==================
let markerSrc = 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-256.png';

// ================== 마커 size ================== 
const MARKER_WIDTH = 32, // 기본 마커의 너비
    MARKER_HEIGHT = 35; // 기본 마커의 높이
const CLICKED_WIDTH = 40, // 클릭 마커의 너비
    CLICKED_HEIGHT = 47; // 클릭 마커의 높이
// 마커 크기
const markerSize = new kakao.maps.Size(MARKER_WIDTH, MARKER_HEIGHT), // 기본, 클릭 마커의 크기
    clickedMarkerSize = new kakao.maps.Size(CLICKED_WIDTH, CLICKED_HEIGHT); // 오버 마커의 크기

// ================== 마커 option ================== 
let markerOption = {offset: new kakao.maps.Point(16, 34), alt: "마커 이미지 예제", shape: "poly", coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"};
let clickedMarkerOption = {offset: new kakao.maps.Point(20, 46), alt: "클릭 마커 이미지 예제", shape: "poly", coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"};

// 마커 아이콘
let testIcon = new kakao.maps.MarkerImage(markerSrc, markerSize, markerOption);
let clickedIcon = new kakao.maps.MarkerImage(markerSrc, clickedMarkerSize, clickedMarkerOption);

// 클릭하여 강조된 마커
let selectedMarker = null;

// 페이지 로드 후 script 실행
document.addEventListener("DOMContentLoaded", (event) => {
    // 위도 경도 설정 (솔데스크 강남점)
    let latBasic = 37.5054070438773;
    let lngBasic = 127.026682479708;
    let optionBasic = {center: new kakao.maps.LatLng(latBasic, lngBasic), level: 3};

    // 지도 출력 테스트 ===============================
	let container1 = document.getElementById('map');
	let option = {center: new kakao.maps.LatLng(37.5054070438773, 127.026682479708), level: 3};
	new kakao.maps.Map(container1, option);
	
	// 지도 이동 테스트 ===============================
	let container2 = document.getElementById('map2');
	var testMap = new kakao.maps.Map(container2, optionBasic);

	
    document.querySelectorAll("#mapLab button").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault;
            let type = btn.getAttribute("id");
            console.log(type + "btn click");
            // 지도 중심좌표 부드럽게 이동하기
            if (type === "panToTest") {
                panToLatLng(testMap, latBasic, lngBasic);
            } 
            // 마커 생성 및 보기
            else if (type === "markerTest") {
                addMarker(testMap, latBasic, lngBasic);
            }
            else if (type === "markersGen") {
                registerMarker(37.504724, 127.02538, '0');
                registerMarker(37.5056370385705, 127.025605528158, '1');
                showMarkers(testMap);
            }
            // 마커 리스트 비울때는 숨김 처리 후 리스트의 요소를 비워야 정상 작동
            else if (type === "markersClear") {
                hideMarkers(testMap);
                clearMarkers();
            }
            // 마커 한번에 등록 및 보기
            else if (type === "markerListView") {
                showMarkers(testMap);
            }
            // 마커 한번에 숨기기
            else if (type === "markerListHide") {
                hideMarkers(testMap);
            }
            else if (type === "markersLog") {
                markerList.forEach(marker => {
                    console.log(marker);
                })
            }
            // 가게 클릭시 마커 강조 테스트 0
            else if (type === "markerViewTest0") {
                viewStoreMarker("0");
            }
            // 가게 클릭시 마커 강조 테스트 1
            else if (type === "markerViewTest1") {
                viewStoreMarker("1");
            }
        });
    });

    // ============================ 지도 관련 함수 ============================
    // 지도에 표시된 마커 객체를 가지고 있을 배열
    let markerList = [];

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
    function registerMarker(lat, lng, idx) {
        // 마커 위치 설정
        let markerPosition  = new kakao.maps.LatLng(lat, lng); 
        // 마커 생성
        let marker = new kakao.maps.Marker({
            position: markerPosition,
            // 추후에 마우스 오버시 idx 노출 안되도록 수정
            title : idx,
            image : testIcon
        });

        // 마커 이벤트 추가 테스트
        addMarkerEvent(marker);

        // 생성된 마커를 배열에 추가
        markerList.push(marker);
    }

    // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수
    function setMarkers(map) {
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].setMap(map);
        }            
    }

    // 배열 비우기
    function clearMarkers() {
        markerList = [];
    }

    // 배열에 추가된 마커를 지도에 표시하는 함수
    function showMarkers(map) {
        setMarkers(map)    
    }

    // 배열에 추가된 마커를 지도에서 삭제하는 함수
    function hideMarkers() {
        setMarkers(null);    
    }

    // 마커에 클릭 이벤트 추가 테스트
    function addMarkerEvent(marker) {
        kakao.maps.event.addListener(marker, 'click', function() {
            console.log("marker idx : " + marker.getTitle());
            console.log(marker);
            // 마커 선택
            selectMarker(marker);
        });
    }

    // 마커 강조 효과
    function selectMarker(marker) {
        // 선택된 마커가 없거나 선택된 마커가 해당 마커가 아닐 시에 실행 
        if (!selectedMarker || selectedMarker !== marker) {
            !!selectedMarker && selectedMarker.setImage(testIcon);
            marker.setImage(clickedIcon);
        }
        selectedMarker = marker;
    }
    
    // 가게 클릭 이벤트 (화면이동 + 강조효과)
    function viewStoreMarker(idx) {
        markerList.forEach(marker => {
            //console.log(marker.getTitle());
            // idx와 일치시 이동 및 강조
            if (idx === marker.getTitle()) {
                // 해당 마커의 좌표 출력
                console.log(marker.getPosition().getLat());
                console.log(marker.getPosition().getLng());
                // 마커 기준으로 지도 이동
                panToLatLng(testMap, marker.getPosition().getLat(), marker.getPosition().getLng());
                // 마커 강조
                selectMarker(marker)
            }
    })
    }

    let clickMarker = new kakao.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        position: new kakao.maps.LatLng(latBasic, lngBasic)
    });
    clickMarker.setMap(testMap);



    // 지도 클릭 이벤트 (경도 출력)
    kakao.maps.event.addListener(testMap, 'click', function(mouseEvent) {        
    
        // 클릭한 위도, 경도 정보
        let latlng = mouseEvent.latLng;
        clickMarker.setPosition(latlng);
        
        let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        
        let resultDiv = document.getElementById('clickLatlng'); 
        resultDiv.innerHTML = message;
        
        // 도로명 주소 함수
        searchAddrFromCoords(latlng, resultDiv);
    });

    // 좌표 => 도로명 주소 함수
    function searchAddrFromCoords(latlng, resultDiv) {
        let geocoder = new kakao.maps.services.Geocoder();
        let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                // console.log(result); // result : 결과 내용, [0] : 역삼동 / [1] : 역삼 1동
                // console.log(status); // status : 응답 코드
                // console.log('지역 명칭 : ' + result[0].address_name);
                // console.log('행정구역 코드 : ' + result[0].code);
                let name = result[0].address_name;
                let code = result[0].code;
                resultDiv.innerHTML +=  `\n지역 명칭 : ${name} \n행정구역 코드 : ${code}`;
            }
        };
        geocoder.coord2RegionCode(latlng.getLng(), latlng.getLat(), callback);
    }
    
    //점포 지역별 리스트 조회 함수
    const storeAreaService = (function(){       
        function getList(store_area, callback){
        	fetch(`/modal/list/${store_area}.json`)
        	.then(response => response.json())
        	.then(data => {
        		callback(data);
        	})
        	.catch(err => console.log(err));
        }
    	return {
            getList : getList
        };
    })();
    const sas = storeAreaService;
    
    /* 아마 이런식으로?
    sas.get(store_area, function(data){
    	openModal();
    });
    */

    // store 클릭 이벤트
    let storeListModal = document.querySelectorAll(".store-card ul li");
    if (storeListModal != null ) {
        storeListModal.forEach(modal => {
            // idx 추출
            let idx = modal.getAttribute("data-store_idx");
            modal.addEventListener('click', e => {
                console.log(idx);
                // 리스트 중에서 idx 찾기
                markerList.forEach(marker => {
                    if (marker.getTitle() === idx) {
                        console.log(marker.getTitle());
                        console.log("idx 일치");
                        // 가게의 idx와 마커의 title이 일치할때 함수 실행
                        viewStoreMarker(idx);
                    }
                });
            });
        });
    }
});

