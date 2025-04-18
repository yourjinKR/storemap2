package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.StoreRequestVO;
import org.storemap.mapper.StoreRequestMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class StoreRequestServiceImple implements StoreRequestService{
	@Autowired
	StoreRequestMapper mapper;
	
	public List<StoreRequestVO> getDisReqList() {
		log.info("getDisReqList...");
		return mapper.getDisReqList();
	}
}
