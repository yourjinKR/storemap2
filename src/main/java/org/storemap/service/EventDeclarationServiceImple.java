package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.EventDeclarationVO;
import org.storemap.mapper.EventDeclarationMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EventDeclarationServiceImple implements EventDeclarationService{
	@Autowired
	private EventDeclarationMapper mapper;
	
	@Override
	public int submitReport(EventDeclarationVO reportVO) {
			return mapper.insertReport(reportVO);
			
	}
	
	@Override
	public int remove(int event_idx, int member_idx) {
		log.info("remove..."+event_idx+", "+member_idx);
		int result = mapper.delete(event_idx, member_idx);
		return result;
	}
	
	@Override
	public int removeAll(int event_idx) {
		log.info("removeAll...");
		int result = mapper.deleteAll(event_idx);
		return result;
	}
	
	@Override
	public List<EventDeclarationVO> getDeclarationMap() {
		log.info("getDeclarationMap...");
		return mapper.getEventDeclarationMap();
	}
	
	@Override
	public List<EventDeclarationVO> getDeclarationDetailMap() {
		log.info("getDeclarationDetailMap...");
		return mapper.getEventDeclarationDetailMap();
	}
	
}
