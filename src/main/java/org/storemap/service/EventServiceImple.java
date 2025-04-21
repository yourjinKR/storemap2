package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.EventVO;
import org.storemap.mapper.EventMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EventServiceImple implements EventService{
	
	@Autowired
	private EventMapper eMapper;
	
	// 메인 이벤트 리스트 랜덤
	@Override
	public List<EventVO> getRanList() {
		log.info("getRanList... ");
		log.info("getRanList... " + eMapper.getRanList());
		return eMapper.getRanList();
	}
	
	// 메인 이벤트 리스트 종료 순
	@Override
	public List<EventVO> getListEndDate(String searchDate) {
		log.info("getListEndDate... ");
		return eMapper.getListEndDate(searchDate);
	}
	
}
