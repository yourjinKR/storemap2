package org.storemap.service;

import java.util.List;

import org.storemap.domain.EventDayVO;

public interface EventDayService {
	public int insertEventDay(EventDayVO eventDayVO);
	
	public List<EventDayVO> getEventDaysByEventId(int event_idx); 
}
