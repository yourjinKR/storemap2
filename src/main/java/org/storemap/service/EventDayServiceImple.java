package org.storemap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.EventDayVO;
import org.storemap.mapper.EventDayMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EventDayServiceImple implements EventDayService{
	@Autowired
	private EventDayMapper mapper;
	
	@Override
		public int insertEventDay(EventDayVO eventDayVO) {
			return mapper.insertEventday(eventDayVO);
		}
	
}
