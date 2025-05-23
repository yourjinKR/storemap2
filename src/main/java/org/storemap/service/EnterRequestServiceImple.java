package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.EnterRequestVO;
import org.storemap.mapper.EnterRequestMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EnterRequestServiceImple implements EnterRequestService{
	@Autowired
	EnterRequestMapper mapper;
	
	@Override
	public List<EnterRequestVO> getDisReqListMap() {
		log.info("getDisReqListMap...");
		return mapper.getDisReqListMap();
	}
}