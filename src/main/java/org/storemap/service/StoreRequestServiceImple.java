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
	
	@Override
	public int register(int member_idx) {
		log.info("register..."+member_idx);
		int result = mapper.insert(member_idx);
		return result;
	}
	
	@Override
	public int modify(int member_idx) {
		log.info("modify..."+member_idx);
		int result = mapper.update(member_idx);
		return result;
	}
	
	@Override
	public int remove(int member_idx) {
		log.info("remove..."+member_idx);
		int result = mapper.delete(member_idx);
		return result;
	}
	
	public List<StoreRequestVO> getDisReqList() {
		log.info("getDisReqList...");
		return mapper.getDisReqList();
	}
	
	@Override
	public List<StoreRequestVO> getDisReqListMap() {
		log.info("getDisReqListMap...");
		return mapper.getDisReqListMap();
	}
	
}
