console.log("map load");

// 장소 테스트
const store1 = {store_idx: 1, store_name: "상점1"};

// 마커 아이콘 설정 kakao.maps.MarkerImage(src, size[, options])
// ================== 마커 src ==================
let markerSrc = 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-256.png';
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
// 지도 클릭 이벤트 마커
let clickMarker = null;

// 기본 위도 경도 설정 (솔데스크 강남점)
let latBasic = 37.511521092235625;
let lngBasic = 127.02856630406664;

// 지도 변수 생성
let basicMap;
// 지도 타입
let mapType;

// 페이지 로드 후 script 실행
document.addEventListener("DOMContentLoaded", () => {
    let optionBasic = {center: new kakao.maps.LatLng(latBasic, lngBasic), level: 3};
	
	// 지도 이동 테스트 ===============================
	let container = document.querySelector(".map");
	basicMap = new kakao.maps.Map(container, optionBasic);

    // 맵 id별 분기
    mapType = container.getAttribute("id");
    // 영업 위치 설정 지도
    if (mapType === "store-loc") {
        let f = document.forms[0];
        // 위치가 설정되지 않았을 경우
        if (f.lat.value != 0 && f.lng.value != 0) {
            let latlng = new kakao.maps.LatLng(f.lat.value, f.lng.value);
            // 지도 중심 화면 설정
            basicMap.setCenter(latlng);
            // 지도 중심 위치 설정
            latBasic = f.lat.value;
            lngBasic = f.lng.value;
        }
    }

    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            let type = btn.getAttribute("id");
            console.log(type + "click");
            // 지도 중심좌표 부드럽게 이동하기
            if (type === "panToTest") {
                panToLatLng(basicMap, latBasic, lngBasic);
            } 
            // 마커 생성 및 보기
            else if (type === "markerTest") {
                addMarker(basicMap, latBasic, lngBasic);
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
            else if (type === "showStoreListSideBar") {
                showStoreListSideBar();
            }
            // 사이드바 열기
            else if (type === "hideStoreListSideBar") {
                hideStoreListSideBar();
            }
            // 토글 버튼
            else if (type === "toggle") {
                toggleStoreListSideBar();
            }
            // 점포 사이드바 닫기 버튼
            else if (type === "close-store") {
                storeSideBarCheck = false;
                semiToggleBtn();
                closeStoreSideBar();
            }
            // 우편번호 찾기 버튼
            else if (type === "search-postcode") {
                
            }
            // 영업 위치설정
            else if (type === "store-loc") {
                
            }
            // 현위치 이동 (임시 함수, 추후 수정)
            else if (type === "panToCurrent") {
                panToLatLng(basicMap, currentLat, currentLng);
            }
        });
    });

    // ============================ 지도 관련 함수 ============================
    // 지도에 표시된 마커 객체를 가지고 있을 배열
    let markerList = [];



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

    // 마커 등록
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

        return marker;
    }

    // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수
    function setMarkers(map) {
        for (var i = 0; i < storeVOList.length; i++) {
            storeVOList[i].marker.setMap(map);
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

    // 마커 클릭 이벤트 추가 함수
    function addMarkerEvent(marker) {
        kakao.maps.event.addListener(marker, 'click', function() {
            console.log("marker idx : " + marker.getTitle());
            // 마커 선택
            selectMarker(marker);
            
            let title = marker.getTitle();
            let li = searchEleByTitle(title);

            showStoreListSideBar();
            initStoreSideBar(title);
            showStoreSideBar();
            onToggleBtn();
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
            //console.log(marker.getTitle());
            // idx와 일치시 이동 및 강조
            if (idx === marker.getTitle()) {
                // 해당 마커의 좌표 출력
                // console.log(marker.getPosition().getLat());
                // console.log(marker.getPosition().getLng());
                // 마커 기준으로 지도 이동
                panToLatLng(basicMap, marker.getPosition().getLat(), marker.getPosition().getLng());
                // 마커 강조
                selectMarker(marker)
            }
    })
    }

    clickMarker = new kakao.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        position: new kakao.maps.LatLng(latBasic, lngBasic)
    });
    clickMarker.setMap(basicMap);



    // 지도 클릭 이벤트 (경도 위도 출력)
    kakao.maps.event.addListener(basicMap, 'click', function(mouseEvent) {        
    
        // 클릭한 위도, 경도 정보
        let latlng = mouseEvent.latLng;
        clickMarker.setPosition(latlng);

        searchAddrFromCoords(latlng);

        let f = document.querySelector("#store-modify");
        if (f) {
            f.lat.value = latlng.getLat();
            f.lng.value = latlng.getLng();
            initAddrFromCoords(latlng, f);
        }
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
                form.area.value = result[0].region_1depth_name; // 서울특별시
                form.regcode.value = result[0].code; // 행정코드
            }
        };
        geocoder.coord2RegionCode(latlng.getLng(), latlng.getLat(), callback);
    }
    
    // 비동기 서비스
    const asyncService = (function(){  
        
        // 지역명 기반 검색, 추후에 store_regcode로 진행   
        function getListByReg(store_area, callback){
            fetch(`/modal/list/${store_area}.json`)
            .then(response => response.json())
            .then(data => {
                callback(data);
            })
            .catch(err => console.log(err));
        }
        // 현위치 기반 검색
        function getListByLocNow(locNow, callback) {
            
        }

        // 카테고리 기반 검색 (store table에 카테고리가 없으니 menu에서 찾아야 하는가)
        function getListByCategory(menu_name, callback) {
            
        }

        // 점포명 기반 검색
        function getListByName(store_name, callback) {
            
        }

        // 통합 검색?
        function getList(keyword, callback) {
            
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
            getListByReg : getListByReg,
            getStore : getStore,
            getMenuList : getMenuList
        };
    })();
    const as = asyncService;
    
    // vo 리스트
    let storeVOList = [];
    // 지역명 기반 검색 서비스 함수 실행
    as.getListByReg("서울특별시", function(data) {

        data.forEach(vo => {
            let marker = registerMarker(vo.store_lat, vo.store_lng, vo.store_idx); // 마커 추가예정
            vo.marker = marker;
            storeVOList.push(vo);
        });

        // 점포 리스트 출력
        storeVOList.forEach(vo => {
            // console.log(vo);
            msg += 
            // `<li data-store_idx="${vo.store_idx}" onclick="viewModalPage(this)" name ="store_idx">
            `<li data-store_idx="${vo.store_idx}" name="store_idx">
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
    });

    // 출력 위치 확인
    let storeUL = document.querySelector(".store-card ul");
    let msg = "";


    /** 점포 클릭 이벤트 추가 및 마커 매핑 함수 */ 
    function storeMarkerMapping(ele) {
        if (ele != null ) {
            ele.forEach(store => {
                // idx 추출
                let idx = store.getAttribute("data-store_idx");
                store.addEventListener('click', e => {
                    // 리스트 중에서 idx 찾기
                    markerList.forEach(marker => {
                        if (marker.getTitle() === idx) {
                            // console.log(marker.getTitle());
                            // console.log("idx 일치");
                            // 가게의 idx와 마커의 title이 일치할때 함수 실행
                            // showStoreModal(idx);
                            initStoreSideBar(idx);
                            showStoreSideBar();
                            showStoreMarker(idx);
                        }
                    });
                    storeSideBarCheck = true;
                    onToggleBtn();
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

    
    // ========================= 사이드바 관련 =========================
    // 스토어 리스트 사이드바 컨트롤
    
    let storeListSideBar = document.querySelector(".side-bar#store-list");
    /** 스토어 리스트 사이드바 여는 함수 */
    function showStoreListSideBar() {
        storeListSideBar.classList.add("show");
    }
    /** 스토어 리스트 사이드바 닫는 함수 */
    function hideStoreListSideBar() {
        storeListSideBar.classList.remove("show");
    }

    // 스토어 사이드바 컨트롤
    let storeSideBarCheck = false;
    /** 스토어 사이드바 여는 함수 */
    function showStoreSideBar() {
        let storeSideBar = document.querySelector(".side-bar#store");
        storeSideBar.classList.add("show");
        storeSideBarCheck = true;
        semiToggleBtn();
    }
    /** 스토어 사이드바 닫는 함수 */
    function hideStoreSideBar() {
        let storeSideBar = document.querySelector(".side-bar#store");
        storeSideBar.classList.remove("show");
    }
    
    /** 스토어 사이드바 내용 담기 */
    function initStoreSideBar(idx) {
        // 가게 이미지 및 정보
        as.getListByReg("서울특별시", function(data) {
            
            data.forEach(vo => {
                if (vo.store_idx == idx) {
                    console.log("테스트");
                    console.log(vo);
                    // 이미지
                    let storeImage = document.querySelector(".store-image");
                    storeImage.innerHTML = `<img src="/resources/img/${vo.store_image}" alt="이미지" class="store-image">`;
                    // 정보
                    let storeInfo = document.querySelector(".store-info");
                    console.log(storeInfo);
                    
                    let context =
                        `<div class="store-info">
                            <h3>${vo.store_name}</h3>
                            <div class="info-text">주소: ${vo.store_address}</div>
                            <div class="info-text">영업일: ${vo.store_activity_time}</div>
                            <div class="info-text">전화: ${vo.store_num}</div>
                        </div>`;
                    storeInfo.innerHTML = context;
                }
            });
            
        });
        // 메뉴 리스트
        as.getMenuList(idx, function(list) {
            let menuList = document.querySelector(".storeView .menu-section");
            console.log(list);
            
            let context = '<h3>메뉴</h3>';
            list.forEach(mvo => {
                context += 
                    `<div class="menu-list">
                        <c:forEach var="mvo" items="${mvo}">
                            <div class="menu-item">
                            <img src="/resources/img/${mvo.menu_image}" alt="${mvo.menu_image}">
                            <div class="menu-name">${mvo.menu_name}</div>
                            <div class="menu-price">₩${mvo.menu_price}</div>
                            </div>
                        </c:forEach>
                    </div>`;
            });
            menuList.innerHTML = context;
        });
        // 리뷰
    }
    
    // 토글 버튼
    let toggleBtn = document.querySelector(".side-bar#toggle-box");
    /** 토글 버튼 위치 변경 함수 600px */
    function onToggleBtn() {
        toggleBtn.style.left = '600px';
    }
    /** 토글 버튼 위치 변경 함수 300px */
    function semiToggleBtn() {
        toggleBtn.style.left = '300px';
    }
    /** 토글 버튼 위치 변경 함수 0px */
    function offToggleBtn() {
        toggleBtn.style.left = '0px';
    }
    /** 토글 위치 변경 함수 수정버전 (요소, 숫자 입력시 해당 px 위치로 이동) */
    function setToggle(ele, pixel) {
        ele.style.left = `${pixel}px`;
    }

    /** 스토어 리스트 사이드바 토글 함수 */
    function toggleStoreListSideBar() {
        let storeListSideBar = document.querySelector(".side-bar#store-list");
        // 토글 OFF
        if (storeListSideBar.classList[1] == "show") {
            hideStoreSideBar();
            hideStoreListSideBar();
            offToggleBtn();
        } 
        // 토글 ON
        else {
            showStoreListSideBar();
            if (storeSideBarCheck) {
                showStoreSideBar();
            }
            if (!storeSideBarCheck) {
                semiToggleBtn();
            } else {
                onToggleBtn();
            }
        }
    }

    /** 점포 사이드바 닫는 함수 */
    function closeStoreSideBar() {
        hideStoreSideBar();
    }
});

/** 지도, 위도, 경도를 입력하면 지도 이동 */ 
function panToLatLng(map, lat, lng) {
    // 좌표설정
    let moveLatLon = new kakao.maps.LatLng(lat, lng);	
    // 이동
    map.panTo(moveLatLon);
}

/** 업로드할 요소 위치를 입력하여 지도를 업로드 함수 (반환값 : 해당 지도 요소) */
function uploadMap(path, lat, lng) {
    let optionBasic = {center: new kakao.maps.LatLng(lat, lng), level: 3};
    let result = new kakao.maps.Map(path, optionBasic);
    return result;
}

/** 경도위도를 리턴하는 함수 */
function getLatLng(latlng) {
    console.log(latlng);
}