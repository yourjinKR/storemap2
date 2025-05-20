package org.storemap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.mapper.EventDayMapper;
import org.storemap.mapper.EventRequestMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EventRequestServiceImple implements EventRequestService{
    @Autowired
    private EventRequestMapper mapper;
    @Autowired
    private EventDayMapper eventDayMapper;
	
	@Override
		public int eventRequest(int eday_idx, int store_idx) {
			return mapper.eventRequest(eday_idx, store_idx);
		}
	
	@Override
	public int cancelEntry(int eday_idx, int store_idx) {
		return mapper.cancelEntry(eday_idx, store_idx);
	}
	
	@Override
	public int getEventIdxByEdayIdx(int eday_idx) {
		return eventDayMapper.getEventIdxByEdayIdx(eday_idx);
	}
}
