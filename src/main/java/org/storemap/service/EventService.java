package org.storemap.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.ApprovedStoreViewDTO;
import org.storemap.domain.AttachFileVO;
import org.storemap.domain.EventDTO;
import org.storemap.domain.EventFilterVO;
import org.storemap.domain.EventVO;
import org.storemap.domain.MapDTO;

public interface EventService {
	// 메인 슬라이드
	public List<AttachFileVO> getMainSlide();
	// 메인 페이지 진행중인 이벤트
	public List<EventVO> getLiveEvent();
	// 메인 페이지 진행예정 이벤트
	public List<EventVO> getSoonEvent();
	// 메인페이지 선택 날짜 이벤트
	public List<EventVO> getListEndDate(String searchDate);
	
	// 이벤트 리스트 갯수
	public int getListCount(EventFilterVO filter);
	// 이벤트 리스트
	public List<EventVO> getFilterList(EventDTO edto);
	// 이벤트 리스트 (검색어만)
	public List<EventVO> getEventListByKeyword(MapDTO map); 
	// 이벤트 좋아요
	public int updateFavorite(int event_idx);
	// 이벤트 상세보기
	public EventVO getEventOneView(int event_idx);
	// 이벤트 등록
	public int insertEvent(EventVO eventVO);
	// 이벤트 정보 호출
	public List<EventVO> getIdx(int enter_idx);
	// 이벤트 정보 호출
	public List<EventVO> getAttendEvent(int store_idx);
	// 이벤트, 이벤트데이 트랜잭션 처리
	public void registerEventWithDays(EventVO eventVO, MultipartFile[] files);
	// 좋아요 증가
    public void incrementLike(int eventIdx);
    // 좋아요 감소
    public void decrementLike(int eventIdx);
    // 좋아요 수 조회
    public int getLikeCount(int eventIdx);  
	// 이벤트 리스트
	public List<EventVO> getEventList(int enter_idx);
	// MY EVNET 진행/예정
	public List<EventVO> getMyEvent(int enter_idx);
	// MY EVNET 종료
	public List<EventVO> getMyEventEnd(int enter_idx);
	
	// 숨긴 이벤트 목록
	public List<EventVO> getHiddenList();
	// 이벤트 숨기기 등록
	public int hide(int event_idx);
	// 이벤트 숨기기 해제
	public int unhide(int event_idx);
	
}
