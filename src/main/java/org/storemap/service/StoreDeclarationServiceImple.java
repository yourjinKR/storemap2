package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.StoreDeclarationVO;
import org.storemap.mapper.StoreDeclarationMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class StoreDeclarationServiceImple implements StoreDeclarationService{
	
	@Autowired
	private StoreDeclarationMapper mapper;
	
	@Override
	public int register(StoreDeclarationVO vo) {
		log.info("register..."+vo);
		int result = mapper.insert(vo);
		return result;
	}
	
	@Override
	public int remove(int store_idx, int member_idx) {
		log.info("remove..."+store_idx+", "+member_idx);
		int result = mapper.delete(store_idx, member_idx);
		return result;
	}
	
	@Override
	public List<StoreDeclarationVO> getList() {
		log.info("getList...");
		return mapper.getStoreDeclarationList();
	}
	
	@Override
	public StoreDeclarationVO get(int store_idx, int member_idx) {
		log.info("get..."+store_idx+", "+member_idx);
		return mapper.read(store_idx, member_idx);
	}
	
}