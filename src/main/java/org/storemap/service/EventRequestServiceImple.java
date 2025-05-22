package org.storemap.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public int cancelEntry(int edayIdx, int storeIdx) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("edayIdx", edayIdx);
        paramMap.put("storeIdx", storeIdx);
        return mapper.cancelEntry(paramMap);
    }
	
	@Override
	public int getEventIdxByEdayIdx(int eday_idx) {
		return eventDayMapper.getEventIdxByEdayIdx(eday_idx);
	}
	
	@Override
	public List<Integer> getAppliedEdayIdxList(int storeIdx) {
		return mapper.selectAppliedEdayIdxList(storeIdx);
	}
}
