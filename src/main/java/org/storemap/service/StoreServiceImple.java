package org.storemap.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.MapDTO;
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
	public StoreVO getStore(int member_idx) {
		log.info("getStore..."+member_idx);
		return mapper.getStore(member_idx);
	}
	
	@Override
	public StoreVO getMember(int member_idx) {
		log.info("getMember..."+member_idx);
		return mapper.getMember(member_idx);
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
	
	@Override
	public int hide(int store_idx) {
		log.info("hide..."+store_idx);
		int result = mapper.hideStore(store_idx);
		return result;
	}
	@Override
	public int unhide(int store_idx) {
		log.info("unhide..."+store_idx);
		int result = mapper.unhideStore(store_idx);
		return result;
	}
	
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
	
	@Override
	public List<StoreVO> getAreaList(String store_area) {
		log.info("getAreaList...");
		return mapper.getStoreAreaList(store_area);
	}
	
	@Override
	public List<StoreVO> getLocList(MapDTO map) {
		int code = map.getCode();
		int gu = code/100000;
		return mapper.getStoreLocList(gu);
	}
	
	@Override
	public int favorite(int store_idx) {
		log.info("favorite..."+store_idx);
		return mapper.updateFavorite(store_idx);
	}
	@Override
	public int unfavorite(int store_idx) {
		log.info("unfavorite..."+store_idx);
	    return mapper.deleteFavorite(store_idx);
	}
	
}