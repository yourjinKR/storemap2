package org.storemap.mapper;

import java.util.List;
import java.util.Map;

import org.storemap.domain.Criteria;
import org.storemap.domain.EventDTO;
import org.storemap.domain.EventFilterVO;
import org.storemap.domain.EventVO;

public interface EventMapper {
	// 메인 페이지 진행중인 이벤트
	public List<EventVO> getLiveEvent();
	// 메인 페이지 진행예정 이벤트
	public List<EventVO> getSoonEvent();
	// 메인페이지 선택 날짜 이벤트
	public List<EventVO> getListEndDate(String searchDate);
	
	
	// 이벤트 신청 최대 값
	public int endMaxCount(int event_idx);
	// 이벤트 리스트 갯수
	public int getListCount();
	// 이벤트 리스트
	public List<EventVO> getFilterList(EventDTO edto);
	// 이벤트 좋아요
	public int updateFavorite(int event_idx);
	// 이벤트 상세보기
	public EventVO getEventOneView(int eventIdx);
	// 이벤트 등록
	public int insertEvent(EventVO eventVO);
	// 이벤트 정보 호출
	public int getIdx(int enter_idx);
}
