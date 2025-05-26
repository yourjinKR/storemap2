console.log("map load");

// 마커 아이콘 설정 kakao.maps.MarkerImage(src, size[, options])
// ================== 마커 src ==================
let basicMarkerSrc = 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-256.png';
let storeMarkerSrc = 'https://res.cloudinary.com/dbdkdnohv/image/upload/v1747982083/ChatGPT_Image_2025%EB%85%84_5%EC%9B%94_23%EC%9D%BC_%EC%98%A4%ED%9B%84_03_34_29_wilfln.png';
let eventMarkerSrc = 'https://res.cloudinary.com/dbdkdnohv/image/upload/v1747980394/ChatGPT_Image_2025%EB%85%84_5%EC%9B%94_23%EC%9D%BC_%EC%98%A4%ED%9B%84_02_51_56_fgkomx.png';

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
let testIcon = new kakao.maps.MarkerImage(basicMarkerSrc, markerSize, markerOption);
let clickedIcon = new kakao.maps.MarkerImage(basicMarkerSrc, clickedMarkerSize, clickedMarkerOption);
// 점포 아이콘
let storeIcon = new kakao.maps.MarkerImage(storeMarkerSrc, markerSize, markerOption);
let storeClickedIcon = new kakao.maps.MarkerImage(storeMarkerSrc, clickedMarkerSize, clickedMarkerOption);
// 이벤트 아이콘
let eventIcon = new kakao.maps.MarkerImage(eventMarkerSrc, markerSize, markerOption);
let eventClickedIcon = new kakao.maps.MarkerImage(eventMarkerSrc, clickedMarkerSize, clickedMarkerOption);

// 클릭하여 강조된 마커
let selectedMarker = {marker : null, type : null};
/** 지도 클릭 이벤트 마커 */
let clickMarker = null;

// 지도에 표시된 마커 객체를 가지고 있을 배열
let markerList = [];
/** store vo 리스트 */ 
let storeVOList = [];
/** event vo 리스트 */ 
let eventVOList = [];
/** 장소 정보를 담는 리스트 */
let placeList = [];
/** 장소 정보 (음식점 제외) */
let placeInfo = {};
/** 지하철 정보 */
let subwayInfo = {};

// 출력 위치 확인
let storeUL = null;

// 스토어 리스트 사이드바 컨트롤
let listSideBar = null;
// 스토어 리스트의 검색 결과 div
let searchResult;
/** true : 사이드바가 열린 상태 */  
let viewSideBarCheck = false;
let viewSideBar = null;
// 토글 버튼
let toggleBtn = null;
// 스토어 리스트바 모달
let storeListModal = null;
// 이벤트 리스트바 모달
let eventListModal = null;
/** 점포 검색 실패 모달 */
let storeFailModal = null;
/** 이벤트 검색 실패 모달 */
let eventFailModal = null;
/** 통합 검색 실패 모달 */
let unitedFailModal = null;
// 검색창
let mapSearchForm = null;
let keywordInput;
// 자동완성
let autoCompleteBox = null;
let autoSearchUL = null;
/** 자동완성 재입력 방지 */ 
let suppressAutocomplete = false;
let selectedIndex = -1;
/** 검색어 조건 */  
let searchCondition = {lat:null, lng:null, kilometer:null, level:null, code:null, amount:null, keyword:null, store_idx:null, event_idx:null};

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

/** 통합 검색 */
let unitedMapMode = true;
/** 이벤트 검색 */
let eventMapMode = false;
/** 점포 검색  */
let storeMapMode = false;
/** 현위치 커스텀 설정 모드 */
let customPositionMode = false;
/** 현위치 커스텀 설정 오버레이 */
let positionOverlay = null;

// 페이지 로드 후 script 실행
document.addEventListener("DOMContentLoaded", () => {
	const CSS_PATH = '/resources/css/map.css';
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = CSS_PATH;
	document.head.appendChild(linkEle);
	
    /** 로컬 스토리지 기반 경도위도 값 */
    let currentPosition = getPositionData();

    // 지도 기본 설정값
    let basicOption = {};
    if(currentPosition) {

        currentLat = currentPosition.lat;
        currentLng = currentPosition.lng;
        basicOption = {center: new kakao.maps.LatLng(currentLat, currentLng), level: 3};

        clickMarker = new kakao.maps.Marker({ 
            position: new kakao.maps.LatLng(currentLat, currentLng)
        });

    } else {
        basicOption = {center: new kakao.maps.LatLng(basicLat, basicLng), level: 1};

        clickMarker = new kakao.maps.Marker({ 
            position: new kakao.maps.LatLng(basicLat, basicLng)
        });
    }

    // 클릭마커 클릭 이벤트 추가
    kakao.maps.event.addListener(clickMarker, 'click', function() {
        if (!customPositionMode) {
            // alert("현위치를 수정하시겠습니까?");
            setMyCurrentPlace();
        }
    })

    // 제한할 범위 설정 (예: 대한민국 전체)
    const boundLimit = new kakao.maps.LatLngBounds(
        new kakao.maps.LatLng(33.0, 124.0),  // 남서쪽
        new kakao.maps.LatLng(39.5, 132.0)   // 북동쪽
    );

	// 기본 설정값으로 지도 생성
	let container = document.querySelector(".map");
    if(container != null) {
        basicMap = new kakao.maps.Map(container, basicOption);
    
        // 새로고침
        centerLatLng = basicMap.getCenter();
        loadAddrFromCoords(centerLatLng);
    
        // 클릭 마커 생성  
        clickMarker.setMap(basicMap);

        // 맵 id별 분기
        mapType = container.getAttribute("id");

        // 최대크기 지정
        basicMap.setMaxLevel(12);
    }

    // 검색창
    mapSearchForm = document.querySelector(".form#map");
    
    if(mapType === "full") {
        keywordInput = mapSearchForm.keyword;
    } else {
        mapSearchForm = document.querySelector(".search-bar");
        keywordInput = document.querySelector(".search-bar input[name='keyword']");
    }
    autoCompleteBox = mapSearchForm.querySelector(".autocomplete");
    autoSearchUL = autoCompleteBox.querySelector(".autocomplete ul");

    // map.jsp
    if (mapType === "full") {
        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        let zoomControl = new kakao.maps.ZoomControl();
        basicMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 가게 상세보기 모달 사이드바 style로 변경
        let storeModal = document.querySelector("#modal");
        storeModal.classList.add("side-bar");
        storeModal.setAttribute("id", "store");
        // 닫기 버튼 표시
        let storeHeader = document.querySelectorAll(".modal-header")[0];        
        storeHeader.style.display = 'block';

        // 이벤트 상세보기 모달 사이드바 style로 변경
        let eventModal = document.querySelector("#modal");
        eventModal.classList.add("side-bar");
        eventModal.setAttribute("id", "event");
        // 닫기 버튼 표시
        let eventHeader = document.querySelectorAll(".modal-header")[1];        
        eventHeader.style.display = 'block';

        // 닫기 버튼 표시
        let unitedHeader = document.querySelectorAll(".modal-header")[2];        
        unitedHeader.style.display = 'block';

        // 기본 상태
        searchCondition = {
            level : basicMap.getLevel(),
            lat : basicMap.getCenter().getLat(),
            lng : basicMap.getCenter().getLng(),
            code : centerLoc.code,
            // keyword : keyword,
            amount : 100,
            kilometer : setRadiusByLevel(basicMap.getLevel())
        }

        // ==================== 요소 선언 ====================
        // 검색바
        searchResult = document.querySelector(".search-result#store-list");
        // 스토어 리스트 사이드바
        listSideBar = document.querySelector(".side-bar#list");
        //  뷰 사이드바
        viewSideBarCheck = false;
        viewSideBar = document.querySelector(".side-bar#united");
        // 토글 버튼
        toggleBtn = document.querySelector(".side-bar#toggle-box");
        // 스토어 리스트 모달
        storeListModal = document.querySelector(".storeListModal");
        // 이벤트 리스트 모달
        eventListModal = document.querySelector(".eventListModal");
        // 점포 검색 실패 모달
        storeFailModal = document.querySelector(".search-fail#store");
        // 이벤트 검색 실패 모달
        eventFailModal = document.querySelector(".search-fail#event");
        // 통합 검색 실패 모달
        unitedFailModal = document.querySelector(".search-fail#united");

        // 검색 리스트 스타일 변경
        storeListModal.style.display = 'block';
        eventListModal.style.display = 'block';

        deleteAllEle();
        // 초기 검색 기능
        // 키워드 기반
        const initialKeyword = sessionStorage.getItem("initialKeyword");
        const initialStoreIDX = sessionStorage.getItem("store_idx");
        const initialEventIDX = sessionStorage.getItem("event_idx");
        const subCondition = JSON.parse(localStorage.getItem("search_data"));

        if (initialKeyword) {
            // input에도 값 넣기 (선택사항)
            keywordInput.value = initialKeyword;

            // 검색 조건 구성 후 실행
            mapSearchService(basicMap, initialKeyword);

            // 재검색 방지: 세션 제거
            sessionStorage.removeItem("initialKeyword");
        }
        else if (initialStoreIDX) {
            // idx 기반 점포 찾기
            sessionStorage.removeItem("store_idx");
            showListSideBar();
            // store idx 기반 검색 비동기 함수 실행
            // let IDX = 302;
            as.getStoreByIdx(initialStoreIDX, function (data) {
                searchCondition.keyword = data.store_name;
                setSubKeyword();
                apply2storeMap([data]);
            });
        }
        else if (initialEventIDX) {
            // idx 기반 이벤트 찾기
            sessionStorage.removeItem("event_idx");
            showListSideBar();
            // event idx 기반 검색 비동기 함수 실행
            // let IDX = 302;
            as.getEventByIdx(initialEventIDX, function (data) {
                searchCondition.keyword = data.event_title;
                setSubKeyword();
                processAllEvents([data], "search");
            });
        }
        else if (subCondition != null) {
            if (subCondition.store_idx != null) {
                as.getStoreByIdx(subCondition.store_idx, function (data) {
                    apply2storeMap([data]);
                })
            } else if (subCondition.event_idx != null) {
                as.getEventByIdx(subCondition.event_idx, function (data) {
                    processAllEvents([data], "search");
                })
            }
            else if (subCondition.keyword != null) {
                searchCondition = subCondition;
                mapSearchService(basicMap, searchCondition.keyword);
            } else {
                as.getListNearest(searchCondition, 5, function (data) {
                    apply2storeMap(data);
                })
            }
        }
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

            clickMarker.setPosition(latlng);
        }
    }
    // 

    // 지도 관련 버튼 서비스
    document.querySelectorAll("button.mapBtn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            let type = btn.getAttribute("id");
            // 지도 중심좌표 부드럽게 이동하기
            if (type === "panToTest") {
                panToLatLng(basicMap, basicLat, basicLng);
            } 
            // 마커 리스트 비울때는 숨김 처리 후 리스트의 요소를 비워야 정상 작동
            else if (type === "markersClear") {
                hideMarkers(basicMap);
                clearMarkers();
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
            // 사이드바 닫기 버튼
            else if (type === "close-store" || type === "close-event" || type === "close-united") {
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
            else if (type === "panto-current") {
                basicMap.setLevel(3);
                panToLatLng(basicMap, currentLat, currentLng);
                if(new kakao.maps.LatLng(currentLat, currentLng) == basicMap.getCenter()) {
                    setMyCurrentPlace();
                }
            }
            // 검색
            else if (type === "search") {
                let f = document.querySelector(".form#map");
                let keyword = f.keyword.value.trim();

                mapSearchService(basicMap, keyword);
            }
            else if (type === "event-mode") {
                ctrlMapMode("event");
            }
            else if (type === "store-mode") {
                ctrlMapMode("store");
            }
            else if (type === "united-mode") {
                ctrlMapMode("united");
            }
            else if (type === "custom-position") {
                setMyCurrentPlace();
            }
        });
    });

    // 현위치 커스텀 설정 오버레이를 생성합니다
    positionOverlay = new kakao.maps.CustomOverlay({
    content: `
                <div class="customoverlay">
                    <span class="title">현위치 설정</span>
                    <button onclick="getMyCurrentPlace()">변경</button>
                    <button onclick="cancelMyCurrentPlace()">취소</button>
                </div>`,
    yAnchor: 1,
    zIndex: 3
    });

    if (basicMap != null) {
        /** 지도 새로고침 */
        basicMap.relayout();

        // 지도 클릭 이벤트 (경도 위도 출력)
        kakao.maps.event.addListener(basicMap, 'click', function(mouseEvent) {        
        
            // 클릭한 위도, 경도 정보
            let latlng = mouseEvent.latLng;
    
            if (mapType === "full" && customPositionMode) {
                clickMarker.setPosition(latlng);
                positionOverlay.setPosition(latlng);
            }
    
            if (mapType === "store-loc") {
                clickMarker.setPosition(latlng);
                let f = document.querySelector("#store-modify");
                if (f) {
                    f.lat.value = latlng.getLat();
                    f.lng.value = latlng.getLng();
                    initAddrFromCoords(latlng, f);
                }
            }
        });

        // 줌 이벤트
        kakao.maps.event.addListener(basicMap, 'zoom_changed', function() {
            const level = basicMap.getLevel();

            if (level > 3) {
                hideOverlay(storeOverlayList);
                hideOverlay(eventOverlayList);
            } else {
                if (storeMapMode || unitedMapMode) {
                    showOverlay(basicMap, storeOverlayList);
                }
                if (eventMapMode || unitedMapMode) {
                    showOverlay(basicMap, eventOverlayList);
                }
            }

            if(clickedOverlay != null) {
                clickedOverlay.setMap(basicMap);
            }
            preventOverlayClickBlock();
        });

        // 지도 이동이 완료되었을 발생하는 이벤트
        kakao.maps.event.addListener(basicMap, 'dragend', function() {        
            const center = basicMap.getCenter();
            
            // 중심 좌표가 제한된 범위를 벗어나면
            if (!boundLimit.contain(center)) {
                // 가장 가까운 지점으로 중심을 재조정
                const lat = Math.min(Math.max(center.getLat(), boundLimit.getSouthWest().getLat()), boundLimit.getNorthEast().getLat());
                const lng = Math.min(Math.max(center.getLng(), boundLimit.getSouthWest().getLng()), boundLimit.getNorthEast().getLng());

                const newCenter = new kakao.maps.LatLng(lat, lng);
                basicMap.setCenter(newCenter);
            }
        });
    }



    // ====================== 검색어 자동완성 ====================== 
    // 방향키로 선택 중인 항목의 인덱스
    selectedIndex = -1;
    /** 자동완성을 취소했을때 돌아갈 키워드 */
    let orgKeyword =null;

    let suggestionList = []; // 현재 렌더링 중인 추천 리스트

    // 검색창이 포커스될때
    keywordInput.addEventListener("focus", e => {
        // <li> 자식 요소가 하나라도 있는 경우에만 display
        if (autoCompleteBox.querySelectorAll("li").length > 0) {
            autoCompleteBox.style.display = "block";
        }
    });

    // 검색창에 값 입력
    keywordInput.addEventListener("input", e => {
        // console.log('값입력');
        
        resetAutocomplete();

        const keyword = keywordInput.value.trim();

        if (keyword.length === 0) {
            return;
        }
        
        let lat;
        let lng;
        // 검색어 미리보기는 전국 단위로 확인
        let kilometer = 999;
        // 검색어 조건 설정
        // map.jsp에서
        if (basicMap != null && mapType === "full") {
            lat = basicMap.getCenter().getLat();
            lng = basicMap.getCenter().getLng();
            // kilometer = setRadiusByLevel(basicMap.getLevel());
        } else {
            // console.log('맵 없음');
            lat = currentLat;
            lng = currentLng;
            // kilometer = setRadiusByLevel(5);
        }

        // 점포 정보 불러오기 (서버에 비동기 요청)
        fetch(`/modal/list/keyword.json`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ keyword: keyword, lat : lat, lng : lng, amount : 0, kilometer : kilometer}) 
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);

            // 최대 5개까지만 표시
            // const suggestionList = data.slice(0, 3);
            updateSuggestionList(data, 'store', keyword);
        })
        .catch(err => {
            console.error("자동완성 fetch 실패", err);
            // resetAutocomplete();
        });

        // 이벤트 정보 불러오기 (서버에 비동기 요청)
        fetch("/event/eventFilter/keyword" , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ keyword: keyword, lat : lat, lng : lng, amount : 0})
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);

            // processAllEvents(data, "autoComplete");

            // 최대 5개까지만 표시
            // const suggestionList = data.slice(0, 3);
            updateSuggestionList(data, 'event', keyword);
        })
        .catch(err => {
            console.error("자동완성 fetch 실패", err);
            // resetAutocomplete();
        });


    });

    // 자동완성 리스트 닫기
    document.addEventListener("click", function (e) {
        if (!mapSearchForm.contains(e.target)) {
            // console.log('다른 곳을 클릭했음으로 닫음');
            hideAutocomplete();
        }
    });

    // 자동완성 검색창 키보드 방향키 지원
    keywordInput.addEventListener("keydown", e => {        
        //const items = autoSearchUL.querySelectorAll("li");
        const items = Array.from(autoSearchUL.querySelectorAll("li")).filter(li => {
            return window.getComputedStyle(li).display === "block";
        });
        // if (items.length === 0) return;

        switch (e.keyCode) {
            case 38: // 위
                e.preventDefault();
                if (selectedIndex > 0) {
                    selectedIndex--;
                    updateActiveItem(items);
                    // input에 값 적용
                    keywordInput.value = items[selectedIndex].dataset.value;
                } 
                // 자동완성 리스트에 벗어나기
                else if (selectedIndex == 0) {
                    if (orgKeyword != null) {
                        keywordInput.value = orgKeyword;
                    }
                    resetAutocomplete();
                }
                break;

            case 40: // 아래
                e.preventDefault();
                if (selectedIndex < items.length - 1) {
                    // 자동완성 첫 진입시 기존의 키워드를 기억
                    if (selectedIndex == -1) {
                        orgKeyword = keywordInput.value;
                    }
                    selectedIndex++;
                    updateActiveItem(items);
                    // input에 값 적용
                    keywordInput.value = items[selectedIndex].dataset.value;
                }
                break;

            case 13: // Enter
                // 검색 키워드 기억
                e.preventDefault();
                deleteAllEle();

                suppressAutocomplete = true;

                // 자동완성 검색어를 선택했을때
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    const selectedItem = items[selectedIndex];
                    const value = selectedItem.dataset.value; // 정확한 값 추출
                    const type = selectedItem.getAttribute("type"); // 강사님께 질문
                    const idx = selectedItem.getAttribute("idx");

                    keywordInput.value = value;
                    // resetAutocomplete();
                    if (mapType === "full") {
                        if (type === 'store') {
                            as.getStoreByIdx(idx, function (data) {
                                apply2storeMap([data]);
                            });
                        } else {
                            as.getEventByIdx(idx, function (data) {
                                processAllEvents([data], "search");
                            });
                        }
                    } else {
                        if (type === 'store') {
                            sessionStorage.setItem("store_idx", idx);
                            location.href = "/store/map";  // 주소에 파라미터 안 붙음
                        } else {
                            sessionStorage.setItem("event_idx", idx);
                            location.href = "/store/map";  // 주소에 파라미터 안 붙음
                        }
                    }
                } 
                // 자동완성 검색어를 선택하지 않을때
                else if (selectedIndex == -1 && items.length >= 0) {
                    if (!keywordInput.value) {
                        alert("검색어를 입력하시오!");
                        break;
                    }
                    // resetAutocomplete();
                    if (mapType === "full") {
                        mapSearchService(basicMap, keywordInput.value.trim());
                    } else {
                        sessionStorage.setItem("initialKeyword", keywordInput.value.trim());
                        location.href = "/store/map";  // 주소에 파라미터 안 붙음
                    }
                }
                keywordInput.value = "";    
                break;

            default :
                // console.log(e.keyCode);
                // resetAutocomplete();
        }
    });

    // 리스트 클릭 이벤트
    autoSearchUL.addEventListener("click", e => {
        deleteAllEle();

        const target = e.target.closest("li");
        
        if (!target) return;

        const type = target.getAttribute("type");
        const idx = target.getAttribute("idx");

        // map.jsp
        if (mapType === "full") {
            if (type === "store") {
                as.getStoreByIdx(idx, function (data) {
                    apply2storeMap([data]);
                })
                return;
            } else if (type === "event") {
                as.getEventByIdx(idx, function (data) {
                    processAllEvents([data], "search");
                })
                return;
            }
        } 
        // header
        else {
            if (type === "store") {
                sessionStorage.setItem("store_idx", idx);
                location.href = "/store/map";  // 주소에 파라미터 안 붙음
                return;
            } else if (type === "event") {
                sessionStorage.setItem("event_idx", idx);
                location.href = "/store/map";  // 주소에 파라미터 안 붙음
                return;
            }
        }

        const value = target.dataset.value;
        keywordInput.value = value;
        resetAutocomplete();
        mapSearchService(basicMap, value);
    });

    /** 경도위도를 입력하면 도로명 주소가 출력되는 함수 */ 
    function searchAddrFromCoords(latlng) {
        let geocoder = new kakao.maps.services.Geocoder();
        let callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
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
            }
        }
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
});


// ============================ 마커 관련 함수 ============================

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

/** 마커 등록 */ 
function registerMarker(vo) {
    let lat;
    let lng;
    let idx;
    let icon;
    if (vo.type === 'store') {
        lat = vo.store_lat;
        lng = vo.store_lng;
        idx = vo.store_idx;
        icon = storeIcon;
    } else if (vo.type === 'event') {
        lat = vo.event_lat;
        lng = vo.event_lng;
        idx = vo.event_idx;
        icon = eventIcon;
    }

    // 마커 위치 설정
    let markerPosition  = new kakao.maps.LatLng(lat, lng); 
    // 마커 생성
    let marker = new kakao.maps.Marker({
        position: markerPosition,
        // 추후에 마우스 오버시 idx 노출 안되도록 수정
        title : idx,
        image : icon, // 아이콘 이미지 변경 필요
        zIndex : 3
    });
    return marker;
}

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수
function setMarkers(map, list) {
    for (var i = 0; i < list.length; i++) {
        list[i].marker.setMap(map);
    }
}

/** 배열 비우기 */ 
function clearMarkers() {
    markerList = [];
}

/** 배열에 추가된 마커를 지도에 표시하는 함수 */
function showMarkers(map, list) {
    setMarkers(map, list)    
}

/** 배열에 추가된 마커를 지도에서 삭제하는 함수 */
function hideMarkers(list) {
    setMarkers(null, list);    
}

// ============================= 오버레이 관련 함수 =============================
let storeOverlayList = [];
let eventOverlayList = [];

/** 커스텀 오버레이를 등록하는 함수 */
function registerOverlay(vo) {
    let type = vo.type;

    if (type === 'store') {
        // 오버레이 내용 설정
        let content = `
        <div class="customoverlay" id="${type}" idx="${vo.store_idx}" onclick="clickOverlay(this)">
            <span class="title">${vo.store_name}</span>
        </div>`;
        // 커스텀 오버레이를 생성합니다
        let customOverlay = new kakao.maps.CustomOverlay({
        // map: map,
        position: new kakao.maps.LatLng(vo.store_lat, vo.store_lng),
        content: content,
        yAnchor: 1,
        zIndex: 5,
        clickable: false
        });
        // 리스트에 추가
        // storeOverlayList.push(customOverlay);
        // console.log(customOverlay);
        return customOverlay;

    } else if (type === 'event') {
        let content = `
        <div class="customoverlay" id="${type}" idx="${vo.event_idx}" onclick="clickOverlay(this)">
            <span class="title">${vo.event_title}</span>
        </div>`;
        // 커스텀 오버레이를 생성합니다
        let customOverlay = new kakao.maps.CustomOverlay({
        // map: map,
        position: new kakao.maps.LatLng(vo.event_lat, vo.event_lng),
        content: content,
        yAnchor: 1,
        zIndex: 5,
        clickable: false
        });
        // 리스트에 추가
        // storeOverlayList.push(customOverlay);
        // console.log(customOverlay.getContent());

        return customOverlay;
    }
}

/** 커스텀 오버레이를 보여주는 함수 */
function showOverlay(map, overlayList) {
    if (basicMap.getLevel() < 4) {
        for (let i = 0; i < overlayList.length; i++) {
            const element = overlayList[i];
            element.setMap(map);
        }
    }
    preventOverlayClickBlock();
}

/** 커스텀 오버레이를 삭제하는 함수 */
function hideOverlay(overlayList) {
    for (let i = 0; i < overlayList.length; i++) {
        const element = overlayList[i];
        element.setMap(null);
    }
}

/** 오버레이 클릭 이벤트 추가 함수 */
function clickOverlay(ele) {
    let type = ele.getAttribute("id");
    let idx = ele.getAttribute("idx");
    let li = searchEleByTitle(idx, type);

    viewSideBar = document.querySelector(`.side-bar#${type}`);
    
    emphMarker(idx, type);
    viewDetailModalPage(li, type);

    showListSideBar();
    showviewSideBar();
    setToggle(600);
    viewSideBarCheck = true;

    document.querySelector(".side-bar#list").scrollTo({left:0, top:li.offsetTop, behavior:'smooth'});

    findOverlay(idx, type);
}

let clickedOverlay = null;

/** 오버레이를 찾는 함수 */
function findOverlay(idx, type) {
    if (clickedOverlay != null) {
        clickedOverlay.setZIndex(5);
    }

    let overlay;
    if (basicMap.getLevel() > 3) {
        hideOverlay(storeOverlayList);
        hideOverlay(eventOverlayList);
    }
    if (type === 'store') {        
        storeVOList.forEach(vo => {
            if (vo.store_idx == idx) {
                overlay = vo.overlay;
            }
        })
    }
    else if (type === 'event') {     
        eventVOList.forEach(vo => {
            if (vo.event_idx == idx) {
                overlay = vo.overlay;
            }
        })
    }
    overlay.setMap(basicMap);
    overlay.setZIndex(8);
    preventOverlayClickBlock();
    clickedOverlay = overlay;
}

/** 오버레이 DOM 클릭 방지하는 함수 */
function preventOverlayClickBlock() {
    document.querySelectorAll('.customoverlay').forEach(function(overlay) {
        var container = overlay.parentElement;
        if (container && container.style) {
            // z-index는 유지, 클릭만 통과
            container.style.pointerEvents = 'none';
        }

        // 내부 실제 텍스트(.title 등)는 클릭 가능하게 유지
        overlay.style.pointerEvents = 'auto';
    });
}

// ============================= 이벤트 추가 관련 함수 =============================
/** li요소 클릭 이벤트 추가, 마커 매핑 함수 (ele, type) */ 
function markerMapping(eles, type) {
    if (eles != null ) {
        eles.forEach(ele => {

            // idx 추출
            let idx = ele.getAttribute(`data-${type}_idx`);

            // type 분기
            let voList = [];
            if (type === "store") {
                voList = storeVOList;
            } else if (type === "event") {
                voList = eventVOList;
            }

            // (store or event) 클릭 이벤트 추가
            ele.addEventListener('click', e => {
                hideviewSideBar();
                viewSideBar = document.querySelector(`.side-bar#${type}`);
                // 리스트 중에서 idx 찾기
                voList.forEach(vo => {
                    if (vo.marker.getTitle() === idx) {
                        showviewSideBar();
                        emphMarker(idx, type);
                        setToggle(600);
                        // 오버레이 표시
                        findOverlay(idx, type);
                    }
                });
                viewSideBarCheck = true;
            });
        });
    }
}

/** 타이틀로 idx가 일치하는 리스트의 요소 찾는 동적 함수 (list, type) */
function searchEleByTitle(title, type) {
    let result;
    const LIS = document.querySelectorAll(`.${type}-card ul li`);
    LIS.forEach(LI => {
        let idx = LI.getAttribute(`data-${type}_idx`);
        if (idx === title) {
            result = LI;
        }
    });
    return result;
}

/** 마커 클릭 이벤트 추가 함수 */ 
function addMarkerEvent(marker, type) {
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커 선택
        selectMarker(marker, type);
        
        let idx = marker.getTitle();
        emphMarker(idx, type);
        let li = searchEleByTitle(idx, type);
        viewDetailModalPage(li, type);

        showListSideBar();
        hideviewSideBar();
        viewSideBar = document.querySelector(`.side-bar#${type}`);

        if (type === "store") {
            showviewSideBar();
        }
        else if (type === "event") {
            showviewSideBar();
        }
        setToggle(600);

        // 마커 클릭시 리스트 사이드바의 스크롤 상태 조작
        document.querySelector(".side-bar#list").scrollTo({left:0, top:li.offsetTop, behavior:'smooth'});

        // 오버레이 강조
        findOverlay(idx, type);
    });
}

// 마커 강조 효과
function selectMarker(marker, type) {
    let icon;
    let oldIcon;

    // 클릭한 마커의 타입에 따른 아이콘 이미지 설정
    if (type === 'store') {
        // console.log('스토어 마커를 클릭함');
        icon = storeClickedIcon;
    } else if (type === 'event') {
        // console.log('이벤트 마커를 클릭함');
        icon = eventClickedIcon;
    } else {
        icon = clickedIcon;
    }

    // 이미 선택된 마커의 타입에 따른 아이콘 이미지 설정
    if (selectedMarker.type === 'store') {
        oldIcon = storeIcon;
    }
    else if (selectedMarker.type === 'event') {
        oldIcon = eventIcon;
    }

    // 선택된 마커가 없거나 선택된 마커가 해당 마커가 아닐 시에 실행 
    if (!selectedMarker || selectedMarker !== marker) {
        // 기존에 클릭된 마커의 이미지를 바꿈
        // 기존의 마커가 어떤 타입이었는지 구분
        !!selectedMarker.marker && selectedMarker.marker.setImage(oldIcon);
        
        marker.setImage(icon);
    }
    selectedMarker = {marker : marker, type : type};
}

/** idx를 받으면 일치하는 마커로 이동 및 강조하는 함수 */
function emphMarker(idx, type) {
    let list = [];
    if(type === "store") {
        list = storeVOList;
    } else if (type === "event") {
        list = eventVOList;
    }

    list.forEach(vo => {
        // idx와 일치시 이동 및 강조
        if (idx === vo.marker.getTitle()) {
            // 마커 기준으로 지도 이동
            panToLatLng(basicMap, vo.marker.getPosition().getLat(), vo.marker.getPosition().getLng());
            // 마커 강조
            selectMarker(vo.marker, vo.type);
        }
    });
}

// ================================= 사이드바 관련 함수 =================================
/** 리스트 사이드바 여는 함수 */
function showListSideBar() {
    listSideBar.classList.add("show");
    setToggle(300);
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
    // let ListSideBar = document.querySelector(".side-bar#store-list");
    // 토글 OFF
    if (listSideBar.classList[1] == "show") {
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
    function getEventByIdx(idx, callback) {
        fetch(`/modal/event/getByIdx.json`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(idx)
        })
        .then(response => response.json())
        .then(data => {
            if(data != null) {
                searchCondition.event_idx = data.event_idx;
                searchCondition.store_idx = null;
            }
            callback(data);
        })
        .catch(err => {
            console.error(err);
        });
    }

    /** idx로 점포 정보 로드하는 함수 */
    function getStoreByIdx(idx, callback){
        fetch(`/modal/store/getByIdx.json`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(idx)
        })
        .then(response => response.json())
        .then(data => {
            if(data != null) {
                searchCondition.event_idx = null;
                searchCondition.store_idx = data.store_idx;
            }
            callback(data);
        })
        .catch(err => {
            console.error(err);
        });
    }

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

    /** 반경 내 점포 리스트 (condition, kilometer, callback) */ 
    function getStoreListWhithin(searchCondition, kilometer, callback){
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

	/** 키워드를 입력하여 이벤트 리스트 불러오는 함수 */
    function eventListByKeyword(searchCondition, callback){
	fetch("/event/eventFilter/keyword", {
		method : 'POST',
		headers:{
			'Content-Type' : 'application/json'
        },
        body: JSON.stringify(searchCondition)
	})
	.then(response => response.json())
    .then(data => callback(data))
	.catch(err => console.log(err))
}

    // 함수 객체 리턴
    return {
        getListNearest : getListNearest,
        getStoreListWhithin : getStoreListWhithin, 
        getListByReg : getListByReg,
        getListByLoc : getListByLoc,
        getStore : getStore,
        getMenuList : getMenuList,
        getListByKeyword : getListByKeyword,
        getListByAddrKeyword : getListByAddrKeyword,
        eventListByKeyword : eventListByKeyword,
        getStoreByIdx : getStoreByIdx,
        getEventByIdx : getEventByIdx
    };
})();
const as = asyncService;

/** 지도, 위도, 경도를 입력하면 지도 이동 */
function panToLatLng(map, lat, lng) {
    // 대한민국 기준 위도 및 경도 범위
    const isValidLat = lat >= 33.0 && lat <= 43.0;
    const isValidLng = lng >= 124.0 && lng <= 132.0;

    if (isValidLat && isValidLng) {
        const moveLatLng = new kakao.maps.LatLng(lat, lng);
        map.panTo(moveLatLng);
    } else {
        console.log("대한민국 범위를 벗어난 위도/경도 값입니다:", lat, lng);
    }
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

/** 검색어 조건 저장 함수 */
function setSubKeyword() {
    localStorage.setItem("search_data", JSON.stringify(searchCondition));
}

/** 지도 검색 기능 서비스 함수 */
function mapSearchService(map, keyword) {
    showListSideBar();
    hideviewSideBar();
    viewSideBarCheck = false;
    setToggle(300);

    // resetAutocomplete();
    // if (!keyword) {
    //     alert("키워드를 입력하시오");
    //     return;
    // }
    
    storeFailModal.style.display = "none";  
    eventFailModal.style.display = "none";

    deleteAllEle();

    searchCondition = {
        level : basicMap.getLevel(),
        lat : basicMap.getCenter().getLat(),
        lng : basicMap.getCenter().getLng(),
        code : centerLoc.code,
        keyword : keyword,
        amount : 100,
        kilometer : setRadiusByLevel(basicMap.getLevel())
    }

    // 점포 및 장소 검색 시작
    as.getListByAddrKeyword(searchCondition, function (data) {
        if(data.length != 0) {
            apply2storeMap(data);
            let level = getMapLevelFromMarkerLists(storeVOList);
            basicMap.setLevel(level);
        } else {
            searchPlaces(keyword);
        }
    });

    // 이벤트 검색 시작
    as.eventListByKeyword(searchCondition, function(data) {
        if (data.length != 0) {
            processAllEvents(data, "search");
        }
    });
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

/** 역 검색 서비스를 요청하는 함수 */
function serviceSubway(keyword) {
    let ps = new kakao.maps.services.Places();  

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청
    let options = {category_group_code : 'SW8'};
    ps.keywordSearch(keyword, subwayServiceCB, options);
}

// ==================== 장소 검색 서비스 관련 함수 ====================

/** true = 검색 기능을 재실행 하는 여부 */
let againSearch;

/** 장소검색이 완료됐을 때 호출되는 콜백함수 */ 
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        placeList = data;
        // console.log(placeList);
        placeInfo = placeList[0];
        if (placeInfo.category_group_name === "지하철역") {
            // console.log('첫번째 검색어가 지하철입니다.');
            // 지하철 서비스 실행
            serviceSubway(searchCondition.keyword);
        } else {
            as.getListByKeyword(searchCondition, function (data) {
                if (data.length != 0) {
                    apply2storeMap(data);
                }
                else if (placeInfo.category_group_name != "음식점") {
                    // console.log('일반 음식점은 검색 지원하지 않음');
                    // panToLatLng(basicMap, placeInfo.y, placeInfo.x);
                    // basicMap.setLevel(3);
                    apply2storeMap(data);
                } else {
                    apply2storeMap(data);
                }
            })
        }

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        as.getListByKeyword(searchCondition, function (data) {
            if (data.length != 0) {
                apply2storeMap(data);
            }
            else if (placeInfo.category_group_name != "음식점") {
                // console.log('일반 음식점은 검색 지원하지 않음');
                // panToLatLng(basicMap, placeInfo.y, placeInfo.x);
                // basicMap.setLevel(3);
                apply2storeMap(data);
            } else {
                apply2storeMap(data);
            }
        });
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {
        apply2storeMap(data);
        // alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

/** 역(subway) 검색이 완료됐을 때 호출되는 콜백함수 */
function subwaySearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        subwayInfo = data[0];
    } 
    else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        apply2storeMap(data);
        // alert('subway 검색 결과가 존재하지 않습니다.');
        return;
    } 
    else if (status === kakao.maps.services.Status.ERROR) {
        apply2storeMap(data);
        // alert('subway 검색 결과 중 오류가 발생했습니다.');
        return;
    }
}

/** 역(subway) 검색이 완료됐을 때 호출되는 콜백함수 (지하철 주변 점포 찾기 서비스를 바로 실행) */
function subwayServiceCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        subwayInfo = data[0];
        // 역으로 화면 이동
        basicMap.setLevel(3);
        panToLatLng(basicMap, subwayInfo.y, subwayInfo.x);
        // 좌표 설정
        searchCondition.lat = subwayInfo.y;
        searchCondition.lng = subwayInfo.x;
        // 역 근처 점포 출력
        as.getStoreListWhithin(searchCondition, 0.5, function (data) {
            apply2storeMap(data);
        });
    } 
    else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        apply2storeMap(data);
        // alert('subway 검색 결과가 존재하지 않습니다.');
        return;
    } 
    else if (status === kakao.maps.services.Status.ERROR) {
        apply2storeMap(data);
        // alert('subway 검색 결과 중 오류가 발생했습니다.');
        return;
    }
}

/** 검색결과를 지도에 적용하는 콜백함수 (점포) */
function apply2storeMap(data) {
    resetAutocomplete();

    storeUL = document.querySelector(".store-card ul"); // 추후 수정 (시점 문제로 인해 잠시 임시로 재선언)

    if (data.length == 0) {
        failSearch();
        return;
    } else if (data.length == 1) {
        basicMap.setLevel(1);
    }

    
    // 데이터 등록
    data.forEach(vo => {
        vo.type = "store";

        let marker = registerMarker(vo);
        addMarkerEvent(marker, "store");
        vo.marker = marker;
        
        let overlay = registerOverlay(vo);
        storeOverlayList.push(overlay);
        vo.overlay = overlay;

        storeVOList.push(vo);
    });

    let msg = "";
    // 점포 리스트 출력
    storeVOList.forEach(vo => {
        let imgURL = ``;
        if (vo.attach != null) {
            imgURL = `<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747123330/${vo.store_image}_${vo.attach.filename}" alt="${vo.attach.filename}"/>`;
        } else {
            imgURL = `<img src="https://res.cloudinary.com/dbdkdnohv/image/upload/v1747123330/NoImage_pdlhxd.jpg" alt="${vo.store_image}"/>`;
        }
        // console.log(vo);
        msg += 
        // `<li data-store_idx="${vo.store_idx}" name="store_idx">
        `<li data-store_idx="${vo.store_idx}" onclick="viewDetailModalPage(this, 'store')" name ="store_idx">
            ${imgURL}
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

    let storeLIS = document.querySelectorAll(".store-card ul li");
    // 가게와 마커를 메핑
    markerMapping(storeLIS, "store");
    // overlayMapping(eventLIS, "store");

    // 오버레이 클릭 이벤트 추가
    let overlayEles = document.querySelector(".customoverlay#store");
    // console.log(overlayEles);
    
    // overlayEles.forEach(ele => {
    //     console.log(ele);
    //     ele.addEventListener('click', e => {
    //         console.log('테스트');
    //     })
    // })

    // 마커와 오버레이 표시
    if ((storeMapMode || unitedMapMode) && storeVOList.length != 0 ) {

        storeListModal.style.display = 'block';
        showMarkers(basicMap, storeVOList);
        showOverlay(basicMap, storeOverlayList);

        // 스토어 맵일 경우 지도 크기 조절
        // let level = getMapLevelFromMarkerLists(storeVOList);
        // basicMap.setLevel(level);
        panToLatLng(basicMap, storeVOList[0].store_lat, storeVOList[0].store_lng);
        completeSearch();
    }

    setSubKeyword();
}

/** 검색결과를 지도에 적용하는 콜백함수 (이벤트)  */
function apply2eventMap(data) {
    resetAutocomplete();

    let eventUL = document.querySelector(".event-card ul"); // 추후 수정 (시점 문제로 인해 잠시 임시로 재선언)
    // eventUL.innerHTML = "";

    if(data.length == 0) {

        failSearch();
        return;
    }

    let msg = "";
    // 점포 리스트 출력

    data.forEach(vo => {
        let fileList = [];

        // 파일 지정 방식
        // attachFile에서 파일 찾기
        if (vo.attachFile != null) {
            vo.attachFile.forEach(file => {
                if(file.uuid != null) {
                    let imgSrc = `https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/${file.uuid}_${file.filename}`;
                    fileList.push(imgSrc);
                } else {
                    let imgSrc = file.filename;
                    fileList.push(imgSrc);
                }
            });
        }
        // cloudinaryFile & externalURL
        else if (vo.cloudinaryFiles != null && vo.externalUrls != null) {
            if (vo.cloudinaryFiles.length != 0) {
                vo.cloudinaryFiles.forEach(file => {
                    let imgSrc = `https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/${file.uuid}_${file.filename}`;
                    fileList.push(imgSrc);
                });
            } else if (vo.externalUrls.length != 0) {
                fileList = vo.externalUrls;
            }
        }

        // 이미지  없을 경우
        if (fileList.length == 0) {
            fileList.push("https://res.cloudinary.com/dbdkdnohv/image/upload/v1747123330/NoImage_pdlhxd.jpg");
        }

        msg += 
        // `<li data-store_idx="${vo.store_idx}" name="store_idx">
        `<li data-event_idx="${vo.event_idx}" onclick="viewDetailModalPage(this, 'event')" name="event_idx">
            <img src="${fileList[0]}" alt="event_${vo.event_idx}">
                <div class="store-description">
                    <div class="event-title">${vo.event_title}</div>
                    <div class="event-location">${vo.event_location}</div>
                </div>
            <br>
        </li>`;

        // vo.type = "event";
        
        let overlay = registerOverlay(vo);
        eventOverlayList.push(overlay);
        vo.overlay = overlay;
    })

    eventUL.innerHTML += msg;

    let eventLIS = document.querySelectorAll(".event-card ul li");
    // 이벤트와 마커를 매핑
    markerMapping(eventLIS, "event");

    // 마커와 오버레이 요소들 표시
    if (eventMapMode || unitedMapMode) {
        eventListModal.style.display = 'block';
        showMarkers(basicMap, eventVOList);
        showOverlay(basicMap, eventOverlayList);
        
        // 이벤트 맵일때 크기 조절
        if (eventMapMode) {
            let level = getMapLevelFromMarkerLists(eventVOList);
            basicMap.setLevel(level);
            panToLatLng(basicMap, eventVOList[0].event_lat, eventVOList[0].event_lng);
        }
        completeSearch();
    }

    setSubKeyword();
}

/** 모든 요소를 삭제하는 함수 */
function deleteAllEle() {
    if (mapType != "full") {
        return;
    }

    clickedOverlay = null;

    hideMarkers(storeVOList);
    hideMarkers(eventVOList);
    hideOverlay(storeOverlayList);
    hideOverlay(eventOverlayList);

    storeVOList = [];
    eventVOList = [];

    storeOverlayList = [];
    eventOverlayList = [];

    placeList = [];
    placeInfo = {};
    subwayInfo = {};

    document.querySelector(".store-card ul").innerHTML = "";
    document.querySelector(".event-card ul").innerHTML = "";
}

/** 검색결과가 있을 경우 모달을 호출하는 함수 */
function completeSearch() {
    if(storeMapMode && storeVOList.length != 0) {
        storeListModal.style.display = "block"; // 스토어 리스트 view
    }
    else if (eventMapMode && eventVOList.length != 0) {
        eventListModal.style.display = "block";
    }
    // resetAutocomplete();
}

/** 검색결과가 없거나 실패할때 모달을 호출하는 함수 */
function failSearch() {
    // 통합 맵
    if (unitedMapMode) {
        if (storeVOList.length != 0 || eventVOList.length != 0) {
            unitedFailModal.style.display = "none";
        } else {
            unitedFailModal.style.display = "block";
        }
    } 
    // 점포 맵
    else if (storeMapMode) {
        if (storeVOList.length == 0) {
            unitedFailModal.style.display = "block";
        } else {
            unitedFailModal.style.display = "none";
        }
    }
    // 이벤트 맵
    else if (eventMapMode) {
        if (eventVOList.length == 0) {
            unitedFailModal.style.display = "block";
        } else {
            unitedFailModal.style.display = "none";
        }
    }
    viewSideBarCheck = false;
    hideviewSideBar();
    setToggle(300);
}

/** 이벤트 좌표 등록 프로미스 */
function address2coordPromise(vo, funcType) {
    return new Promise((resolve, reject) => {
        let geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(vo.event_location, function(result, status) {

            if (status === kakao.maps.services.Status.OK) {
                let lat = result[0].y;
                let lng = result[0].x;
                vo.event_lat = lat;
                vo.event_lng = lng;
                vo.type = "event";
                
                let marker = registerMarker(vo);
                
                if (funcType === "search") {
                    //console.log("search 테스트");
                    // 마커 등록
                    vo.marker = marker;
    
                    // 마커에 이벤트 추가
                    addMarkerEvent(marker, "event");
                } else {
                    vo.marker = null;
                }

                resolve(vo); // 변환된 vo를 반환
            } 
            else {
                resolve(null); // 실패한 경우에도 resolve하여 전체 처리를 막지 않음
            }
        });
    });
}

/** 전체 좌표 변환 후 후처리 함수
 * @param type "search" or "autoComplete"
 */
function processAllEvents(data, type) {
    // console.log(`함수를 ${type} 방식으로 실행`);
    
    const promises = data.map(vo => address2coordPromise(vo, type));

    Promise.all(promises).then(results => {
        // null 제거 및 (eventVOList에 추가)
        eventVOList = results.filter(vo => vo !== null);
        
        // 위치 정렬
        if(mapType === "full") {
            sortEventVOListByDistance(basicMap.getCenter().getLat(), basicMap.getCenter().getLng(), eventVOList);
        } else {
            sortEventVOListByDistance(currentLat, currentLng, eventVOList);
        }

        if (type === "search") {
            // 키워드 검색
            // console.log('event vo list : ', eventVOList);
            apply2eventMap(eventVOList);
            failSearch();

            if (unitedMapMode) {
                if (eventVOList.length > storeVOList.length) {
                    let level = getMapLevelFromMarkerLists(eventVOList);
                    basicMap.setLevel(level);
                    panToLatLng(basicMap, eventVOList[0].event_lat, eventVOList[0].event_lng);
                } else {
                    let level = getMapLevelFromMarkerLists(storeVOList);
                    basicMap.setLevel(level);
                    panToLatLng(basicMap, storeVOList[0].event_lat, storeVOList[0].event_lng);
                }
            } 
        } else if (type === "autoComplete") {
            // 자동완성
            const suggestionList = eventVOList.slice(0, 3);
            eventVOList = [];
            // console.log('auto', eventVOList);
            // updateSuggestionList(suggestionList, 'event', keyword);
        }
    });
}

/** 맵의 모드를 변경하는 함수 (문자열로 입력) */
function ctrlMapMode(mode) {
    if (mode==="store") {
        swap2storeMap();
    }
    else if (mode==="event") {
        swap2eventMap();
    }
    else if (mode==="united") {
        swap2unitedMap();
    }
    failSearch();
}

/** 통합 맵으로 변경 */
function swap2unitedMap() {
    if (!unitedMapMode) {
        unitedMapMode = true;
        storeMapMode = false;
        eventMapMode = false;

        // 리스트 제어
        storeListModal.style.display = "block";
        eventListModal.style.display = "block";

        // 스토어 마커를 맵에 표시
        showMarkers(basicMap, storeVOList);
        // 이벤트 마커를 맵에 표시
        showMarkers(basicMap, eventVOList);

        // 스토어 마커의 오버레이 표시
        showOverlay(basicMap, storeOverlayList);
        // 이벤트 마커의 오버레이 표시
        showOverlay(basicMap, eventOverlayList);

        // 상세보기 사이드바 닫기
        hideviewSideBar();
        viewSideBarCheck = false;
        setToggle(300);

        // 사이드바를 event로 변경
        // viewSideBar = document.querySelector(".side-bar#united");

        if (storeVOList.length !=0 || eventVOList.length != 0) {
            let level = getMapLevelFromMarkerLists(eventVOList, storeVOList);
            basicMap.setLevel(level);

            if (storeVOList.length > eventVOList.length) {
                panToLatLng(basicMap, storeVOList[0].store_lat, storeVOList[0].store_lng);
            } else {
                panToLatLng(basicMap, eventVOList[0].event_lat, eventVOList[0].event_lng);
            }
        }

        // 검색어 자동완성 설정
        ctrlAutoComplete();
    }
}

/** 이벤트 맵으로 변경 */
function swap2eventMap() {
    if (!eventMapMode) {
        eventMapMode = true;
        unitedMapMode = false;
        storeMapMode = false;
    
        // 화면 삭제
        storeListModal.style.display = "none";
        eventListModal.style.display = "block";
    
        // 스토어 마커를 맵에 숨기기
        hideMarkers(storeVOList);
        // 이벤트 마커를 맵에 표시
        showMarkers(basicMap, eventVOList);
    
        // 스토어 마커의 오버레이 숨기기
        hideOverlay(storeOverlayList);
        // 이벤트 마커의 오버레이 표시
        showOverlay(basicMap, eventOverlayList);
    
        // 상세보기 사이드바 닫기
        hideviewSideBar();
        viewSideBarCheck = false;
        setToggle(300);

        if (eventVOList.length != 0) {
            let level = getMapLevelFromMarkerLists(eventVOList);
            basicMap.setLevel(level);
            panToLatLng(basicMap, eventVOList[0].event_lat, eventVOList[0].event_lng);
        }

        // 사이드바를 event로 변경
        viewSideBar = document.querySelector(".side-bar#event");

        // 검색어 자동완성 설정
        ctrlAutoComplete();
    }

}

/** 스토어 맵으로 변경 */
function swap2storeMap() {
    if (!storeMapMode) {
        storeMapMode = true;
        eventMapMode = false;
        unitedMapMode = false;
    
        // 화면 삭제
        eventListModal.style.display = "none";
        storeListModal.style.display = "block";
    
        // 이벤트 마커를 맵에 숨기기
        hideMarkers(eventVOList);
        // 스토어 마커를 맵에 표시
        showMarkers(basicMap, storeVOList);
    
        // 이벤트 마커의 오버레이 숨기기
        hideOverlay(eventOverlayList);
        // 스토어 마커의 오버레이 표시
        showOverlay(basicMap, storeOverlayList);
    
        // 상세보기 사이드바 닫기
        hideviewSideBar();
        viewSideBarCheck = false;
        setToggle(300);

        if(storeVOList.length != 0) {
            let level = getMapLevelFromMarkerLists(storeVOList);
            basicMap.setLevel(level);
            panToLatLng(basicMap, storeVOList[0].store_lat, storeVOList[0].store_lng);
        }

        // 사이드바를 store로 재설정
        viewSideBar = document.querySelector(".side-bar#store");

        // 검색어 자동완성 설정
        ctrlAutoComplete();
    }
}

/** 위치정보 커스텀 변경 시작 함수 (map.js와 연동) */
function setMyCurrentPlace() {
    positionOverlay.setMap(basicMap);
    positionOverlay.setPosition(clickMarker.getPosition());
    alert("클릭하여 정확한 위치를 설정하시오");
	customPositionMode = true;
}
/** 위치정보 커스텀 변경 적용 함수 */
function getMyCurrentPlace() {
    customPositionMode = false;
    let latLng = clickMarker.getPosition();
    currentLat = latLng.getLat();
    currentLng = latLng.getLng();
    setPositionData(currentLat, currentLng);
    positionOverlay.setMap(null);
    // console.log('현위치 커스텀 변경 완료' + latLng);
}
/** 위치정보 커스텀 변경 취소 함수 */
function cancelMyCurrentPlace() {
    customPositionMode = false;
    positionOverlay.setMap(null);
    clickMarker.setPosition(new kakao.maps.LatLng(currentLat, currentLng));
}

/** 두 지점 간 거리 계산 함수 (단위: 미터) */
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000; // 지구 반지름 (단위: m)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.pow(Math.sin(dLat / 2), 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.pow(Math.sin(dLng / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// 현위치를 기준으로 List 정렬
function sortEventVOListByDistance(lat, lng, list) {
    if(list.length == 0) {return;}
    list.sort((a, b) => {
        const distA = getDistance(lat, lng, parseFloat(a.event_lat), parseFloat(a.event_lng));
        const distB = getDistance(lat, lng, parseFloat(b.event_lat), parseFloat(b.event_lng));
        return distA - distB;
    });
}

/** 하나 이상의 리스트를 받아 전체 마커 간 최대 거리 확대 레벨 계산 */
function getMapLevelFromMarkerLists(...lists) {
    const allMarkers = [];

    // 모든 리스트에서 .marker가 있는 항목만 수집
    lists.forEach(list => {
        list.forEach(vo => {
            if (vo.marker) {
                allMarkers.push(vo.marker);
            }
        });
    });

    if (allMarkers.length <= 1) return 1;

    let maxDistance = 0;
    for (let i = 0; i < allMarkers.length - 1; i++) {
        const m1 = allMarkers[i].getPosition();
        for (let j = i + 1; j < allMarkers.length; j++) {
            const m2 = allMarkers[j].getPosition();
            const distance = getDistance(m1.getLat(), m1.getLng(), m2.getLat(), m2.getLng());
            if (distance > maxDistance) maxDistance = distance;
        }
    }

    // 거리별 확대 레벨 결정
    if (maxDistance <= 200) return 1;
    if (maxDistance <= 400) return 2;
    if (maxDistance <= 800) return 3;
    if (maxDistance <= 1600) return 4;
    if (maxDistance <= 3200) return 5;
    if (maxDistance <= 6400) return 6;
    if (maxDistance <= 12800) return 7;
    if (maxDistance <= 25600) return 8;
    if (maxDistance <= 51200) return 9;
    if (maxDistance <= 102400) return 10;
    if (maxDistance <= 204800) return 11;
    return 12;
}

/** 맵 줌 상태에 따라 반경을 구하는 함수 */
function setRadiusByLevel(level) {
    let kilometer;
    if (level <= 2) {
        kilometer = 0.5
    } 
    else if (level == 3) {
        kilometer = 0.8
    }
    else if (level == 4) {
        kilometer = 1.6
    }
    else if (level == 5) {
        kilometer = 3.2
    }
    else if (level == 6) {
        kilometer = 6.4
    }
    else if (level == 7) {
        kilometer = 12.8
    }
    else if (level == 8) {
        kilometer = 25.6
    }
    else if (level == 9) {
        kilometer = 51.2
    }
    else if (level == 10) {
        kilometer = 102.4
    }
    else if (level == 11) {
        kilometer = 204.8
    }
    else {
        kilometer = 400
    }

    return kilometer;
}

// 자동완성 관련 함수
/** 추천 리스트 UI 갱신 */ 
function updateSuggestionList(list, type, keyword) {
    // 기존에 있었던 리스트 삭제
    let oldList = document.querySelectorAll(`.${type}-ele`);
    if(oldList != null) {
        oldList.forEach(el => el.remove());
    }

    // autoSearchUL.innerHTML = ""; // 초기화

    list.forEach(item => {
        let text = type === 'event' ? item.event_title : item.store_name;

        // keyword 강조
        const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape
        const regex = new RegExp(`(${safeKeyword})`, "gi");
        const highlighted = text.replace(regex, "<strong>$1</strong>").replace(/\n/g, "").trim();

        const li = document.createElement("li");

        li.classList.add(`${type}-ele`);

        li.setAttribute("type", type);
        if(type === "store") {
            li.setAttribute("idx", item.store_idx);
        } else if (type === "event") {
            li.setAttribute("idx", item.event_idx);
        }
        
        li.dataset.value = text;
        li.innerHTML = `<span class="highlighted-text">${highlighted}</span>
                        <span class="ele-type">${type === 'event' ? "이벤트" : "점포"}</span>`;
        autoSearchUL.appendChild(li);
    });

    ctrlAutoComplete();

    if (list.length != 0) {
        autoCompleteBox.style.display = "block";
    }

    selectedIndex = -1;
}


/** 강조 항목 업데이트 */ 
function updateActiveItem(items) {
    items.forEach((item, i) => {
        item.classList.toggle("active", i === selectedIndex);
        if(i === selectedIndex) {
            // 수정 필요
            item.scrollIntoView({behavior: "auto", block: "nearest"});
        }
    });
}

/** 자동완성 초기화 */ 
function resetAutocomplete() {
    hideAutocomplete();
    autoSearchUL.innerHTML = "";
}

/** 자동완성 닫기 */
function hideAutocomplete() {
    autoCompleteBox.style.display = "none";
    selectedIndex = -1;
}

/** 맵 모드에 따라 자동완성 리스트 조절 함수 */
function ctrlAutoComplete() {
    const storeList = document.querySelectorAll(".store-ele");
    const eventList = document.querySelectorAll(".event-ele");
    
    if (storeMapMode) {
        storeList.forEach(store => {
            store.style.display = 'block';
        });
        eventList.forEach(event => {
            event.style.display = 'none';
        })
    } else if (eventMapMode) {
        eventList.forEach(event => {
            event.style.display = 'block';
        })
        storeList.forEach(store => {
            store.style.display = 'none';
        });
    } else if (unitedMapMode) {
        eventList.forEach(event => {
            event.style.display = 'block';
        })
        storeList.forEach(store => {
            store.style.display = 'block';
        });
    }
}