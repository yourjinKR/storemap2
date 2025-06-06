package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.MapDTO;
import org.storemap.domain.StoreVO;
import org.storemap.mapper.AttachFileMapper;
import org.storemap.mapper.StoreMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class StoreServiceImple implements StoreService{
	
	@Autowired
	private StoreMapper mapper;
	//이미지 업로드 서버
	@Autowired
	private CloudinaryService cloudinaryService;
	@Autowired
	private AttachFileMapper attachMapper;
	
	@Override
	public int register(MultipartFile file, StoreVO vo) {
		log.info("register..."+vo);
		try {
			// 파일이 있는 경우에만 이미지 업로드 처리
			if(file != null && !file.isEmpty()) {
				String imageUrl = cloudinaryService.uploadFile(file);
				vo.setStore_image(imageUrl);
			} else {
				// 기본 이미지 URL 설정 (Default값 나중에 수정)
				vo.setStore_image("store1.jpg");
			}
			return mapper.insert(vo);
		} catch (Exception e) {
			throw new RuntimeException("Failed to register store", e);
		}
	}
	
	@Override
	public int modify(MultipartFile file, StoreVO vo) {
		log.info("modify..."+vo);
		StoreVO svo = mapper.read(vo.getStore_idx());
		String oldImg = svo.getStore_image();
		try {
			// 파일이 있는 경우에만 이미지 업로드 처리
			if(file != null && !file.isEmpty()) {
				// 이미지가 이미 있는 경우 삭제
				if(!oldImg.equals("store1.jpg")) {
					cloudinaryService.deleteFile(oldImg);
				}
				// 새 이미지 직접 업로드
				String imageUrl = cloudinaryService.uploadFile(file);
				vo.setStore_image(imageUrl);
			} else {
				// 파일 없을 경우 기존 이미지 유지
				vo.setStore_image(oldImg);
			}
			return mapper.update(vo);
		} catch (Exception e) {
			throw new RuntimeException("Failed to modify store", e);
		}
	}
	
	@Override
	public int remove(int store_idx) {
		log.info("remove..."+store_idx);
		StoreVO svo = mapper.read(store_idx);
		String oldImg = svo.getStore_image();
		if(!oldImg.equals("store1.jpg")) {
			// 이미지 삭제
			cloudinaryService.deleteFile(oldImg);
		}
		// 점포 삭제
		int result = mapper.delete(store_idx);
		return result;
	}
	@Override
	public int removeStore(int member_idx) {
		log.info("remove..."+member_idx);
		StoreVO svo = mapper.getStore(member_idx);
		String oldImg = svo.getStore_image();
		if(!oldImg.equals("store1.jpg")) {
			// 이미지 삭제
			cloudinaryService.deleteFile(oldImg);
		}
		// 점포 삭제
		int result = mapper.deleteStore(member_idx);
		return result;
	}
	
	@Override
	public List<StoreVO> getList() {
		log.info("getList...");
		return mapper.getStoreList();
	}
	
	@Override
	public List<StoreVO> getHiddenList() {
		log.info("getHiddenList...");
		return mapper.getStoreHiddenList();
	}
	
	@Override
	public List<StoreVO> getMap() {
		log.info("getMap...");
		return mapper.getStoreMap();
	}
	
	@Override
	public StoreVO get(int store_idx) {
		log.info("get..."+store_idx);
		return mapper.read(store_idx);
	}
	
	@Override
	public StoreVO map(int store_idx) {
		log.info("map..."+store_idx);
		return mapper.map(store_idx);
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
	
	@Override
	public int start(int store_idx) {
		log.info("start..."+store_idx);
		int result = mapper.storeStart(store_idx);
		return result;
	}
	@Override
	public int stop(int store_idx) {
		log.info("stop..."+store_idx);
		int result = mapper.storeStop(store_idx);
		return result;
	}
	
	// 메인페이지 점포 목록 랜덤
	@Override
	public List<StoreVO> getStoreRanList(String store_address) {
		String addr = store_address;
		if(store_address.equals("전체")) {
			addr = "";
		}
		
		List<StoreVO> list = mapper.getStoreRanList(addr);
		for (StoreVO vo : list) {
			vo.setAttach(attachMapper.getAttach(vo.getStore_image()));
		}
		
		return list;
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
	public List<StoreVO> getNearestStores(MapDTO map) {
		return mapper.getNearestStores(map);
	}
	
	@Override
	public List<StoreVO> getStoreKeywordList(MapDTO map) {
		return mapper.getStoreKeywordList(map);
	}
	
	@Override
	public List<StoreVO> getStoreAddrKeywordList(MapDTO map) {
		return mapper.getStoreAddrKeywordList(map);
	}
	
	@Override
	public List<StoreVO> getStoresWithinDistance(MapDTO map) {
		return mapper.getStoresWithinDistance(map);
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