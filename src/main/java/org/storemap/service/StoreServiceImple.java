package org.storemap.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.StoreVO;
import org.storemap.mapper.StoreMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class StoreServiceImple implements StoreService{
	
	@Autowired
	private StoreMapper mapper;
	
	@Override
	public int register(StoreVO vo) {
		log.info("register..."+vo);
		int result = mapper.insert(vo);
		return result;
	}
	
	@Override
	public int modify(StoreVO vo) {
		log.info("modify..."+vo);
		int result = mapper.update(vo);
		return result;
	}
	
	@Override
	public int remove(int store_idx) {
		log.info("remove..."+store_idx);
		int result = mapper.delete(store_idx);
		return result;
	}
	
	@Override
	public List<StoreVO> getList() {
		log.info("getList...");
		return mapper.getStoreList();
	}
	
	@Override
	public StoreVO get(int store_idx) {
		log.info("get..."+store_idx);
		return mapper.read(store_idx);
	}
	
	@Override
	public List<StoreVO> getNameList(String store_name) {
		log.info("getNameList..."+store_name);
		return mapper.getStoreNameList(store_name);
	}
	
	@Override
	public List<StoreVO> getDynamicList(Map<String, String> map) {
		log.info("getDynamicList..."+map);
		return mapper.getStoreDynamicList(map);
	}
	/*
	@Override
	public List<StoreVO> getListWithPaging(Criteria cri) {
		log.info("getListWithPaging...");
		return mapper.getListWithPage(cri);
	}
	
	@Override
	public int getTotalRecordCount() {
		log.info("getTotalRecordCount...");
		return mapper.getTotalRecordCountPage();
	}
	*/
	
	// 메인페이지 점포 목록 랜덤
	@Override
	public List<StoreVO> getStoreRanList(String store_address) {
		log.info("getStoreRanList..." );
		String addr = store_address;
		if(store_address.equals("전체")) {
			addr = "";
		}
		return mapper.getStoreRanList(addr);
	}	
}