package org.storemap.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.storemap.domain.Criteria;
import org.storemap.domain.EventDTO;
import org.storemap.domain.EventDayVO;
import org.storemap.domain.EventFilterVO;
import org.storemap.domain.EventVO;
import org.storemap.domain.MapDTO;
import org.storemap.mapper.EventDayMapper;
import org.storemap.mapper.EventMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
@ControllerAdvice
public class EventServiceImple implements EventService{
	
	@Autowired
	private EventMapper mapper;
	@Autowired
	private EventDayMapper  eventDayMapper;
	@Autowired
	private EventDayService eventDayService;
	
	// 메인 페이지 진행중인 이벤트
	@Override
	public List<EventVO> getLiveEvent() {
		return mapper.getLiveEvent();
	}
	// 메인 페이지 진행예정 이벤트
	@Override
	public List<EventVO> getSoonEvent() {
		return mapper.getSoonEvent();
	}
	
	// 메인페이지 선택 날짜 이벤트
	@Override
	public List<EventVO> getListEndDate(String searchDate) {
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
	public int getListCount(EventFilterVO filter) {
		return mapper.getListCount(filter);
	}
	
	// 이벤트 리스트
	@Transactional
	@Override
	public List<EventVO> getFilterList(EventDTO edto){
		List<EventVO> list = null;
		list = mapper.getFilterList(edto);
		return list;
	}
	
	// 이벤트 리스트 (검색어만)
	@Override
	public List<EventVO> getEventListByKeyword(MapDTO map) {
		return mapper.getEventListByKeyword(map);
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
	
	// 이벤트 등록
	@Override
	public int insertEvent(EventVO eventVO) {
		return mapper.insertEvent(eventVO);
	}
	
	@Transactional
	@Override
	public void registerEventWithDays(EventVO eventVO) {
	    try {
	        // event insert
	        mapper.insertEvent(eventVO);
	        log.info("이벤트 등록 완료: {}"+ eventVO.getEvent_idx());

	        // eventDay insert
	        if (eventVO.getEventDay() != null) {
	            for (EventDayVO day : eventVO.getEventDay()) {
	                day.setEvent_idx(eventVO.getEvent_idx());
	                log.info("이벤트 날짜 등록 시도: {}"+ day);
	                int result = eventDayMapper.insertEventday(day);
	                if (result == 0) {
	                	throw new RuntimeException("트랜잭션 동작");
	                }
	            }
	        }

	        // 강제로 예외 발생시켜 트랜잭션 롤백 테스트
//	        if (true) {
//	            throw new RuntimeException("트랜잭션 롤백 테스트용 강제 예외 발생");
//	        }

	        log.info("이 메세지는 절대 출력되지 않아야 정상입니다.");
	        
	    } catch (RuntimeException e) {
	        // 트랜잭션 롤백을 강제하는 예외 처리
	        log.error("예외 발생: ", e);
	        throw e;  // 예외를 다시 던져서 트랜잭션 롤백을 처리
	    }
	}
}
