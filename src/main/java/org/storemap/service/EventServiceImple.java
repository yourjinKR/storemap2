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
	        // eventDay insert
	        if (eventVO.getEventDay() != null) {
	            for (EventDayVO day : eventVO.getEventDay()) {
	            	// event_idx 값이 eventDayVO에 제대로 설정되었는지 확인
	                day.setEvent_idx(eventVO.getEvent_idx());                
	                int result = eventDayMapper.insertEventday(day);    
	                // eventDay 삽입 결과 확인
	                if (result == 0) {
	                    log.error("eventDay 삽입 실패 - event_idx: {}, eventDay: {}" + day.getEvent_idx() + day);  // 실패 시 로그
	                    throw new RuntimeException("트랜잭션 동작");
	                } else {
	                    log.info("eventDay 삽입 성공 - event_idx: {}, eventDay: {}" + day.getEvent_idx() + day);  // 성공 시 로그
	                }
	            }
	        }
	        log.info("이 메세지는 절대 출력되지 않아야 정상입니다.");	        
	    } catch (RuntimeException e) {
	        System.out.println("예외 발생!");
	        e.printStackTrace(); // 여기가 중요!!
	        throw e;  // 예외를 다시 던져서 트랜잭션 롤백을 처리
	    }
	}
}
