package org.storemap.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.storemap.domain.EventDTO;
import org.storemap.domain.EventFilterVO;
import org.storemap.domain.EventVO;
import org.storemap.domain.MapDTO;

public interface EventMapper {
	// 메인 슬라이드
	public List<EventVO> getMainSlide();
	// 메인 페이지 진행중인 이벤트
	public List<EventVO> getLiveEvent();
	// 메인 페이지 진행예정 이벤트
	public List<EventVO> getSoonEvent();
	// 메인페이지 선택 날짜 이벤트
	public List<EventVO> getListEndDate(String searchDate);
	
	
	// 이벤트 신청 최대 값
	public int endMaxCount(int event_idx);
	// 이벤트 신청 승인 점포
	public int getSignList(int event_idx);
	// 이벤트 리스트 갯수
	public int getListCount(EventFilterVO filter);
	// 이벤트 리스트
	public List<EventVO> getFilterList(EventDTO edto);
	// 이벤트 리스트 (검색어만)
	public List<EventVO> getEventListByKeyword(MapDTO map); 
	// 이벤트 좋아요
	public int updateFavorite(int event_idx);
	// 이벤트 상세보기
	public EventVO getEventOneView(int eventIdx);
	// 이벤트 등록
	public int insertEvent(EventVO eventVO);
	// 이벤트 정보 호출
	public List<EventVO> getIdx(int enter_idx);
	// 이벤트 정보 호출
	public List<EventVO> getAttendEvent(int store_idx);
	// 좋아요 수 증가
    public void incrementLike(@Param("eventIdx") int eventIdx);
    // 좋아요 수 감소
    public void decrementLike(@Param("eventIdx") int eventIdx);
    // 좋아요 수 조회
    public int getLikeCount(@Param("eventIdx") int eventIdx);
	// 이벤트 리스트
	public List<EventVO> getEventList(int enter_idx);
	// MY EVNET 진행/예정
	public List<EventVO> getMyEvent(int enter_idx);
	// MY EVNET 종료
	public List<EventVO> getMyEventEnd(int enter_idx);
	
}
