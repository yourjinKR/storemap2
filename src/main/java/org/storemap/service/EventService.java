package org.storemap.service;

import java.util.List;

import org.storemap.domain.Criteria;
import org.storemap.domain.EventVO;

public interface EventService {
	// 메인 페이지 랜덤 이벤트
	public List<EventVO> getRanList();
	// 메인페이지 선택 날짜 이벤트
	public List<EventVO> getListEndDate(String searchDate);
	
	// 이벤트 상세보기
	public EventVO getEventOneView(int event_idx);
	// 이벤트 리스트 갯수
	public int getListCount();
	// 이벤트 리스트
	public List<EventVO> getList(Criteria cri);
	// 이벤트 좋아요
	public int updateFavorite(int event_idx);
	
}
