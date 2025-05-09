console.log("map load");

// 마커 아이콘 설정 kakao.maps.MarkerImage(src, size[, options])
// ================== 마커 src ==================
let markerSrc = 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-256.png';
// let markerSrc = 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-1b80-61f7-980f-717fb30ba746/raw?se=2025-05-06T09%3A29%3A17Z&sp=r&sv=2024-08-04&sr=b&scid=a705c972-fc76-5385-b439-960e39c3f3b6&skoid=7c382de0-129f-486b-9922-6e4a89c6eb7d&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-06T03%3A17%3A54Z&ske=2025-05-07T03%3A17%3A54Z&sks=b&skv=2024-08-04&sig=MER4ejaYvAKWljU8WLODFQEajejq2FH7xTlqQ29sKw4%3D';

// ================== 마커 크기 ==================
const MARKER_WIDTH = 32, // 기본 마커의 너비
    MARKER_HEIGHT = 35; // 기본 마커의 높이
const CLICKED_WIDTH = 40, // 클릭 마커의 너비
    CLICKED_HEIGHT = 47; // 클릭 마커의 높이
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
// 지도 클릭 이벤트 마커
let clickMarker = null;

// 지도에 표시된 마커 객체를 가지고 있을 배열
let markerList = [];
// vo 리스트
let storeVOList = [];
/** 장소 정보를 담는 리스트 */
let placeList = [];
/** 지하철 정보 */
let subwayInfo = null;

// 출력 위치 확인
let storeUL = document.querySelector(".store-card ul");

// 스토어 리스트 사이드바 컨트롤
let listSideBar = document.querySelector(".side-bar#store-list");
// 스토어 리스트의 검색 결과 div
let searchResult;
/** true : 사이드바가 열린 상태 */  
let viewSideBarCheck = false;
let viewSideBar = document.querySelector(".side-bar#store");
// 토글 버튼
let toggleBtn = document.querySelector(".side-bar#toggle-box");


// 기본 위도 경도 설정 (솔데스크 강남점)
let basicLat = 37.505410898990775;
let basicLng = 127.02676741751233;

// 현재 지도의 중심
let centerLatLng;
// 현재 지도의 행정구역 (중심 기준)
let centerLoc = {}

// 지도 변수 생성
let basicMap;
// 지도 타입
let mapType;

// 페이지 로드 후 script 실행
document.addEventListener("DOMContentLoaded", () => {
	const CSS_PATH = '/resources/css/map.css';
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = CSS_PATH;
	document.head.appendChild(linkEle);
	
    let basicOption = {center: new kakao.maps.LatLng(basicLat, basicLng), level: 1};
	
	// 지도 이동 테스트 ===============================
	let container = document.querySelector(".map");
	basicMap = new kakao.maps.Map(container, basicOption);
    // 새로고침
    centerLatLng = basicMap.getCenter();
    loadAddrFromCoords(centerLatLng);

    // 맵 id별 분기
    mapType = container.getAttribute("id");
    // map.jsp
    if (mapType === "full") {
        // 가게 상세보기 모달 사이드바 style로 변경
        let storeModal = document.querySelector("#modal");
        storeModal.classList.add("side-bar");
        storeModal.setAttribute("id", "store");
        // 닫기 버튼 표시
        let modalHeader = document.querySelector(".modal-header");        
        modalHeader.style.display = 'block';

        // 기본 상태
        let basicCondition = {
            level : basicMap.getLevel(),
            lat : basicMap.getCenter().getLat(),
            lng : basicMap.getCenter().getLng(),
        };
        as.getListNearest(basicCondition, function(data) {
            apply2map(data);
        })
        searchResult = document.querySelector(".search-result#store-list");
    }
    // storeModify.jsp (영업 위치 설정 지도)
    else if (mapType === "store-loc") {
        let f = document.forms[0];
        // 위치가 설정되지 않았을 경우
        if (f.lat.value != 0 && f.lng.value != 0) {
            let latlng = new kakao.maps.LatLng(f.lat.value, f.lng.value);
            // 지도 중심 화면 설정
            basicMap.setCenter(latlng);
            // 지도 중심 위치 설정
            basicLat = f.lat.value;
            basicLng = f.lng.value;
        }
    }
    // 

    // 지도 관련 버튼 서비스
    document.querySelectorAll("button.mapBtn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            let type = btn.getAttribute("id");
            console.log(type + " click");
            // 지도 중심좌표 부드럽게 이동하기
            if (type === "panToTest") {
                panToLatLng(basicMap, basicLat, basicLng);
            } 
            // 마커 생성 및 보기
            else if (type === "markerTest") {
                addMarker(basicMap, basicLat, basicLng);
            }
            // 마커 여러개 생성
            else if (type === "markersGen") {
                registerMarker(37.5056370385705, 127.025605528158, '302');
                registerMarker(37.504724, 127.02538, '303');
                e.target.disabled = true;
                showMarkers(basicMap);
            }
            // 마커 리스트 비울때는 숨김 처리 후 리스트의 요소를 비워야 정상 작동
            else if (type === "markersClear") {
                hideMarkers(basicMap);
                clearMarkers();
            }
            // 마커 한번에 등록 및 보기
            else if (type === "markerListView") {
                showMarkers(basicMap);
            }
            // 마커 한번에 숨기기
            else if (type === "markerListHide") {
                hideMarkers(basicMap);
            }
            else if (type === "markersLog") {
                markerList.forEach(marker => {
                    console.log(marker);
                })
            }
            // 가게 클릭시 마커 강조 테스트 0
            else if (type === "markerViewTest0") {
                showStoreMarker("0");
            }
            // 가게 클릭시 마커 강조 테스트 1
            else if (type === "markerViewTest1") {
                showStoreMarker("1");
            }
            // 사이드바 열기
            else if (type === "showListSideBar") {
                showListSideBar();
            }
            // 사이드바 열기
            else if (type === "hideListSideBar") {
                hideListSideBar();
            }
            // 토글 버튼
            else if (type === "toggle") {
                toggleListSideBar();
            }
            // 점포 사이드바 닫기 버튼
            else if (type === "close-store") {
                viewSideBarCheck = false;
                setToggle(300);
                hideviewSideBar();
            }
            // 우편번호 찾기 버튼
            else if (type === "search-postcode") {
                pcodeService(postMap);
            }
            // 영업 위치설정
            else if (type === "store-loc") {
                
            }
            // 현위치 이동 (임시 함수, 추후 수정)
            else if (type === "panToCurrent") {
                panToLatLng(basicMap, currentLat, currentLng);
            }
            // 검색
            else if (type === "search") {
                let f = document.querySelector(".form#map");
                let keyword = f.keyword.value;
                hideviewSideBar();
                viewSideBarCheck = false;
                setToggle(300);
                mapSearchService(basicMap, keyword);
            }
        });
    });



    clickMarker = new kakao.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        position: new kakao.maps.LatLng(basicLat, basicLng)
    });
    clickMarker.setMap(basicMap);



    // 지도 클릭 이벤트 (경도 위도 출력)
    kakao.maps.event.addListener(basicMap, 'click', function(mouseEvent) {        
    
        // 클릭한 위도, 경도 정보
        let latlng = mouseEvent.latLng;
        clickMarker.setPosition(latlng);

        // console.log(latlng.getLat());
        // console.log(latlng.getLng());
        // searchAddrFromCoords(latlng);
        // searchDetailAddrFromCoords(latlng); (상세주소)

        let f = document.querySelector("#store-modify");
        if (f) {
            f.lat.value = latlng.getLat();
            f.lng.value = latlng.getLng();
            initAddrFromCoords(latlng, f);
        }
    });

    // 지도 이동이 완료되었을 발생하는 이벤트
    kakao.maps.event.addListener(basicMap, 'dragend', function() {        
        
        // 지도 중심좌표를 저장 
        centerLatLng = basicMap.getCenter(); 
        // 중심 좌표를 기준으로 행정구역 저장
        loadAddrFromCoords(centerLatLng);
        // console.log(centerLoc);
        
    });

    /** 경도위도를 입력하면 도로명 주소가 출력되는 함수 */ 
    function searchAddrFromCoords(latlng) {
        let geocoder = new kakao.maps.services.Geocoder();
        let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                console.log(result); // result : 결과 내용, [0] : 역삼동 / [1] : 역삼 1동
            }
        };
        geocoder.coord2RegionCode(latlng.getLng(), latlng.getLat(), callback);
    }

    /** 경도위도를 입력하면 주소를 form에 입력하는 함수 */
    function initAddrFromCoords(latlng, form) {
        let geocoder = new kakao.maps.services.Geocoder();
        let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                form.address.value = result[0].address_name; // 서울특별시 강남구 논현동
                form.regcode.value = result[0].code; // 행정코드
            }
        };
        geocoder.coord2RegionCode(latlng.getLng(), latlng.getLat(), callback);
    }

    /** 경도위도를 기반으로 현재 지도정보를 최신화 */
    function loadAddrFromCoords(latlng) {
        let geocoder = new kakao.maps.services.Geocoder();
        let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                centerLoc = result[0];
            }
        };
        geocoder.coord2RegionCode(latlng.getLng(), latlng.getLat(), callback);
    }

    /** 경도위도로 법정동 상세 주소 정보를 출력하는 함수 */
    function searchDetailAddrFromCoords(coords) {
        let geocoder = new kakao.maps.services.Geocoder();
        let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                console.log(result); // result : 결과 내용, [0] : 역삼동 / [1] : 역삼 1동
            }
        }
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
    
    // ========================= 사이드바 선언 =========================

    // 스토어 리스트 사이드바 컨트롤
    listSideBar = document.querySelector(".side-bar#store-list");
    //  뷰 사이드바 컨트롤
    viewSideBarCheck = false;
    viewSideBar = document.querySelector(".side-bar#store");
    // 토글 버튼
    toggleBtn = document.querySelector(".side-bar#toggle-box");
});


// ============================ 지도 관련 함수 ============================

// 지도 마커 추가 (구버전)
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

// 마커 등록
function registerMarker(lat, lng, idx) {
    // 마커 위치 설정
    let markerPosition  = new kakao.maps.LatLng(lat, lng); 
    // 마커 생성
    let marker = new kakao.maps.Marker({
        position: markerPosition,
        // 추후에 마우스 오버시 idx 노출 안되도록 수정
        title : idx,
        image : testIcon,
        zIndex : 5
    });

    // 마커 이벤트 추가
    addMarkerEvent(marker);

    // 생성된 마커를 배열에 추가
    markerList.push(marker);

    return marker;
}

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수
function setMarkers(map) {
    for (var i = 0; i < storeVOList.length; i++) {
        storeVOList[i].marker.setMap(map);
    }            
}

/** 배열 비우기 */ 
function clearMarkers() {
    markerList = [];
}

// 배열에 추가된 마커를 지도에 표시하는 함수
function showMarkers(map) {
    setMarkers(map)    
}

/** 배열에 추가된 마커를 지도에서 삭제하는 함수 */
function hideMarkers() {
    setMarkers(null);    
}

// ============================= 오버레이 관련 함수 =============================
let overlayList = [];

/** 커스텀 오버레이를 생성하는 함수 */
function registerOverlay(map, lat, lng, name) {
    let content = `
    <div class="customoverlay">
        <span class="title">${name}</span>
    </div>`;
    // 커스텀 오버레이를 생성합니다
    let customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    position: new kakao.maps.LatLng(lat, lng),
    content: content,
    yAnchor: 1,
    zIndex: 3
    });
    // 리스트에 추가
    overlayList.push(customOverlay);
}

/** 커스텀 오버레이를 삭제하는 함수 */
function deleteOverlay() {
    for (let i = 0; i < overlayList.length; i++) {
        const element = overlayList[i];
        element.setMap(null);
    }
}

// ============================= 이벤트 추가 관련 함수 =============================
/** 점포 클릭 이벤트 추가 및 마커 매핑 함수 */ 
function storeMarkerMapping(stores) {
    if (stores != null ) {
        stores.forEach(store => {
            // idx 추출
            let idx = store.getAttribute("data-store_idx");
            // 가게 클릭 이벤트 추가
            store.addEventListener('click', e => {
                // 리스트 중에서 idx 찾기
                markerList.forEach(marker => {
                    if (marker.getTitle() === idx) {
                        showviewSideBar();
                        showStoreMarker(idx);
                        setToggle(600);
                    }
                });
                viewSideBarCheck = true;
            });
        });
    }
}

function searchEleByTitle(title) {
    let result;
    let storeLIS = document.querySelectorAll(".store-card ul li");
    storeLIS.forEach(storeLI => {
        let idx = storeLI.getAttribute("data-store_idx");
        if (idx === title) {
            result = storeLI;
        }
    });
    return result;
}

// 마커 클릭 이벤트 추가 함수
function addMarkerEvent(marker) {
    kakao.maps.event.addListener(marker, 'click', function() {
        console.log("marker idx : " + marker.getTitle());
        // 마커 선택
        selectMarker(marker);
        
        let title = marker.getTitle();
        //showStoreMarker(title);
        let li = searchEleByTitle(title);

        showListSideBar();
        viewModalPage(li);
        showviewSideBar();
        setToggle(600);
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

/** idx를 받으면 일치하는 마커로 이동 및 강조하는 함수 */
function showStoreMarker(idx) {
    markerList.forEach(marker => {
        // idx와 일치시 이동 및 강조
        if (idx === marker.getTitle()) {
            // 마커 기준으로 지도 이동
            panToLatLng(basicMap, marker.getPosition().getLat(), marker.getPosition().getLng());
            // 마커 강조
            selectMarker(marker)
        }
});
}

// ================================= 사이드바 관련 함수 =================================
/** 리스트 사이드바 여는 함수 */
function showListSideBar() {
    listSideBar.classList.add("show");
}
/** 리스트 사이드바 닫는 함수 */
function hideListSideBar() {
    listSideBar.classList.remove("show");
}

/** 뷰 사이드바 여는 함수 */
function showviewSideBar() {
    viewSideBar.classList.add("show");
    viewSideBarCheck = true;
}
/** 뷰 사이드바 닫는 함수 */
function hideviewSideBar() {
    viewSideBar.classList.remove("show");
}

/** 숫자입력시 해당 pixel만큼 토글버튼의 위치를 설정하는 함수 */
function setToggle(pixel) {
    toggleBtn.style.left = `${pixel}px`;
}
/** 리스트 사이드바 토글 함수 */
function toggleListSideBar() {
    let ListSideBar = document.querySelector(".side-bar#store-list");
    // 토글 OFF
    if (ListSideBar.classList[1] == "show") {
        hideviewSideBar();
        hideListSideBar();
        setToggle(0);
    } 
    // 토글 ON
    else {
        showListSideBar();
        if (viewSideBarCheck) {
            showviewSideBar();
        }
        if (!viewSideBarCheck) {
            setToggle(300);
        } else {
            setToggle(600);
        }
    }
}

/** 토글 위치 계산하는 함수, 이걸 만들까 말까 만들까 말까 */
function calcToggle() {
}

// 비동기 서비스
const asyncService = (function(){
    
    /** 현위치에서 가장 가까운 점포 n개 로드하는 함수 */
    function getListNearest(condition, amount, callback){
        condition.amount = amount;
        fetch(`/modal/list/nearest.json`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(condition)
        })
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.error(err);
        });
    }

    // 반경 내 점포 리스트
    function getListWhithin(searchCondition, kilometer, callback){
        searchCondition.kilometer = kilometer;
        fetch(`/modal/list/within.json`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchCondition)
        })
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.error(err);
        });
    }
    
    // 지역명 기반 검색, 추후에 store_regcode로 진행   
    function getListByReg(store_area, callback){
        fetch(`/modal/list/store_area/${store_area}.json`)
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(err => console.log(err));
    }

    // 현위치 기반 검색
    function getListByLoc(searchCondition, callback) {        
        fetch(`/modal/list/loc.json`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchCondition)
        })
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(err => console.error(err));
    }

    // 카테고리 기반 검색 (store table에 카테고리가 없으니 menu에서 찾아야 하는가)
    function getListByCategory(menu_name, callback) {
        
    }

    // 점포명 기반 검색
    function getListByName(store_name, callback) {
        
    }

    /** 키워드 기반 검색 함수 */
    function getListByKeyword(searchCondition, callback) {
        fetch(`/modal/list/keyword.json`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchCondition)
        })
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.error(err);
        });
    }

    /** 지역명=키워드 기반 검색 함수 */
    function getListByAddrKeyword(searchCondition, callback) {
        fetch(`/modal/list/addrKeyword.json`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchCondition)
        })
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.error(err);
        });
    }

    /** store_idx 입력 시 점포 상세보기 정보 출력 함수 */
    function getStore(store_idx, callback){
        fetch(`/modal/${store_idx}.json`)
            .then(response => response.json())
            .then(data => {
                callback(data);
            })
            .catch(err => console.log(err));
    }
    
    /** 메뉴 목록 함수 */
    function getMenuList(store_idx, callback) {
        fetch(`/store/list/${store_idx}.json`)
            .then(response => response.json())
            .then(data => {
                callback(data);
            })
            .catch(err => console.log(err));
    }

    // 함수 객체 리턴
    return {
        getListNearest : getListNearest,
        getListWhithin : getListWhithin, 
        getListByReg : getListByReg,
        getListByLoc : getListByLoc,
        getStore : getStore,
        getMenuList : getMenuList,
        getListByKeyword : getListByKeyword,
        getListByAddrKeyword : getListByAddrKeyword
    };
})();
const as = asyncService;

/** 지도, 위도, 경도를 입력하면 지도 이동 */ 
function panToLatLng(map, lat, lng) {
    // 좌표설정
    let moveLatLon = new kakao.maps.LatLng(lat, lng);	
    // 이동
    map.panTo(moveLatLon);
}

/** 업로드할 요소 위치를 입력하여 지도를 업로드 함수 (반환값 : 해당 지도 요소) */
function uploadMap(path, lat, lng) {
    let basicOption = {center: new kakao.maps.LatLng(lat, lng), level: 3};
    let result = new kakao.maps.Map(path, basicOption);
    return result;
}

/** 경도위도를 리턴하는 함수 */
function getLatLng(latlng) {
    console.log(latlng);
}

/** 두 지점 간 간격 구하는 공식 */
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    return distance;
}

/** 마커 사이의 거리를 구하는 공식 */
function getDistanceMarkers(marker1, marker2) {
    let latlng1 = marker1.getPosition();
    let latlng2 = marker2.getPosition();
    return getDistanceFromLatLonInKm(latlng1.getLat(), latlng1.getLng(), latlng2.getLat(), latlng2.getLng());
}

// 검색어 정규식
/** "역"으로 끝나는 문자 */
const subwayRegex = /역$/;

/** 검색어 조건 */
let searchCondition = {};

/** 지도 검색 기능 서비스 함수 */
function mapSearchService(map, keyword) {
    searchCondition = {
        level : map.getLevel(),
        lat : map.getCenter().getLat(),
        lng : map.getCenter().getLng(),
        code : centerLoc.code,
        keyword : keyword
    }
    
    // 구 를 기준으로 점포 출력
    // as.getListByLoc(searchCondition, function(data) {
    //     console.log(data);
    // });

    if (!keyword) {
        // 현재 가장 가까운 점포 10개 출력
        as.getListNearest(searchCondition, 10, function (data) {
            apply2map(data);
        });
    }
    else {
        // 검색어가 '역'으로 끝날 경우 지하철 주변 점포 찾기 서비스를 우선적으로 실행
        if (subwayRegex.test(keyword)) {
            searchSubway(keyword);
        }
        else {
            as.getListByAddrKeyword(searchCondition, function (data) {
                if (data.length != 0) {
                    console.log('지역명 존재');
                    apply2map(data);
                    panToLatLng(basicMap, data[0].store_lat, data[0].store_lng);
                }
                else {
                    // 검색어와 일치하는 지역명이 없을 경우 검색어에 '역'을 붙이고, 일치하는 지하철역을 검색 
                    keyword += '역';
                    console.log(`지역명을 발견하지 못함... ${keyword}로 검색...`);
                    againSearch = true;
                    // 역 이름 재검색 후, 결과값이 없다면  점포명, 메뉴명으로 실행
                    searchSubway(keyword);
                }
            });
        }
    }

    // 검색 결과 문구 출력
    searchResult.innerHTML = `"${keyword}"의 검색결과`;
}

/** 키워드 분류 함수 */
function classifyKeyword(params) {
}

/** 검색결과를 지도에 적용하는 콜백함수 */
function apply2map(data) {
    storeUL = document.querySelector(".store-card ul"); // 추후 수정 (시점 문제로 인해 잠시 임시로 재선언)
    console.log(data);

    // 마커 및 오버레이 삭제
    delAllEle();
    storeUL.innerHTML = "";
    if (data.length == 0) {
        console.log("data 없음");
        failSearch();
    } else {
        completeSearch();
    }

    data.forEach(vo => {
        let marker = registerMarker(vo.store_lat, vo.store_lng, vo.store_idx);
        vo.marker = marker;
        storeVOList.push(vo);
        registerOverlay(basicMap, vo.store_lat, vo.store_lng, vo.store_name);
    });

    let msg = "";
    // 점포 리스트 출력
    storeVOList.forEach(vo => {
        // console.log(vo);
        msg += 
        // `<li data-store_idx="${vo.store_idx}" name="store_idx">
        `<li data-store_idx="${vo.store_idx}" onclick="viewModalPage(this)" name ="store_idx">
            <img src="/resources/img/${vo.store_image}" alt="${vo.store_image}">
            <input type="hidden" name="store_address" value="${vo.store_address}">
            <input type="hidden" name="store_activity_time" value="${vo.store_activity_time}">
            <input type="hidden" name="store_num" value="${vo.store_num}">
            <div class="store-description">
                <div class="store-name">${vo.store_name}</div>
                <div class="store-content">${vo.store_content}</div>
            </div>
            <br>
        </li>`;
        storeUL.innerHTML = msg;
    });

    let storeLI = document.querySelectorAll(".store-card ul li");
    // 가게와 마커를 메핑
    storeMarkerMapping(storeLI);

    // console.log(storeVOList);
    showMarkers(basicMap);

    // 지도 이동
    // panToLatLng(basicMap, data[0].store_lat, data[0].store_lng);
}

// ======= 키워드 검색 관련 =======
/** 장소 검색을 요청하는 함수 */
function searchPlaces(keyword) {
    let ps = new kakao.maps.services.Places();  

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청
    ps.keywordSearch(keyword, placesSearchCB); 
}

/** 역 검색을 요청하는 함수 */
function searchSubway(keyword) {
    let ps = new kakao.maps.services.Places();  

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청
    let options = {category_group_code : 'SW8'};
    ps.keywordSearch(keyword, subwaySearchCB, options);
}

/** 역 검색을 요청하는 함수 */
function reSearchSubway(keyword) {
    let ps = new kakao.maps.services.Places();  

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청
    let options = {category_group_code : 'SW8'};
    ps.keywordSearch(keyword, subwaySearchCB, options);
}

// ==================== 장소 검색 서비스 관련 함수 ====================

/** true = 검색 기능을 재실행 하는 여부 */
let againSearch;

/** 장소검색이 완료됐을 때 호출되는 콜백함수 */ 
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        placeList = data;
        console.log(placeList);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        // alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        // alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

/** 역(subway) 검색이 완료됐을 때 호출되는 콜백함수 */
function subwaySearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        subwayInfo = data[0];
        // 역으로 화면 이동
        panToLatLng(basicMap, subwayInfo.y, subwayInfo.x);
        // 좌표 설정
        searchCondition.lat = subwayInfo.y;
        searchCondition.lng = subwayInfo.x;
        // 역 근처 점포 출력
        as.getListWhithin(searchCondition, 0.5, function (data) {
            apply2map(data);
        });
    } 
    else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        if(againSearch) {
            console.log("재검색입니다.");
            as.getListByKeyword(searchCondition, function (data) {
                apply2map(data);
            })
            againSearch = false;
        }
        // alert('subway 검색 결과가 존재하지 않습니다.');
        return;
    } 
    else if (status === kakao.maps.services.Status.ERROR) {
        failSearch();
        // alert('subway 검색 결과 중 오류가 발생했습니다.');
        return;
    }
}

/** 모든 요소 삭제 */
function delAllEle() {
    hideMarkers(basicMap);
    clearMarkers();
    storeVOList = [];
    deleteOverlay();
    overlayList = [];
}

/** 검색결과가 있을 경우 호출하는 함수 */
function completeSearch() {
    document.querySelector(".storeListModal").style.display = "block"; // 스토어 리스트 view
    document.querySelector("#searchFail").style.display = "none"; // 경고 문구 hide
}

/** 검색결과가 없거나 실패할때 호출하는 함수 */
function failSearch() {
    // 찾는 결과가 없을때 경고 문구를 보여주고 스토어 리스트를 숨김 처리
    document.querySelector(".storeListModal").style.display = "none"; // 스토어 리스트 hide
    document.querySelector("#searchFail").style.display = "block"; // 경고 문구 view
    viewSideBarCheck = false;
    hideviewSideBar();
    setToggle(300);
}

var places = new kakao.maps.services.Places();

var callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        console.log(result);
    }
};

// 공공기관 코드 검색
places.categorySearch('SW8', callback, {
    // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
    location: new kakao.maps.LatLng(37.564968, 126.939909)
});