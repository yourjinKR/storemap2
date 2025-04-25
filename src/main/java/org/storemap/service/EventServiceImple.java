package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.Criteria;
import org.storemap.domain.EventVO;
import org.storemap.mapper.EventMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EventServiceImple implements EventService{
	
	@Autowired
	private EventMapper mapper;
	
	// 메인 페이지 랜덤 이벤트
	@Override
	public List<EventVO> getRanList() {
		log.info("getRanList... ");
		return mapper.getRanList();
	}
	
	// 메인페이지 선택 날짜 이벤트
	@Override
	public List<EventVO> getListEndDate(String searchDate) {
		log.info("getListEndDate... ");
		return mapper.getListEndDate(searchDate);
	}
	
	// 이벤트 상세보기 페이지
	@Override
	public EventVO getEventOneView(int event_idx) {
		log.info("getEventOneView" + event_idx);
		return mapper.getEventOneView(event_idx);
	}
	
	// 이벤트 리스트 갯수
	@Override
	public int getListCount() {
		log.info("getListCount... " + mapper.getListCount());
		return mapper.getListCount();
	}
	
	// 이벤트 리스트
	@Override
	public List<EventVO> getList(Criteria cri) {
		return mapper.getList(cri);
	}
	
	// 이벤트 좋아요
	@Override
	public int updateFavorite(int event_idx) {
		return mapper.updateFavorite(event_idx);
	}
	
	// 이벤트 IDX
	@Override
	public int getIdx(int enter_idx) {
		return mapper.getIdx(enter_idx);
	}
}
