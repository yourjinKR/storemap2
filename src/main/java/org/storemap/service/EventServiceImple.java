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
	
	@Override
	public List<EventVO> getRanList() {
		log.info("getRanList... ");
		log.info("getRanList... " + eMapper.getRanList());
		return eMapper.getRanList();
	}
}
