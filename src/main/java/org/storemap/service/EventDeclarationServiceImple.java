package org.storemap.service;

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
}
