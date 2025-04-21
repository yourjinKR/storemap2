package org.storemap.service;

import java.util.List;
import java.util.Map;

import org.storemap.domain.StoreVO;

public interface StoreService {
	// 점포 등록
	public int register(StoreVO vo);
	// 점포 관리
	public int modify(StoreVO vo);
	// 점포 삭제
	public int remove(int store_idx);
	// 점포 목록
	public List<StoreVO> getList();
	// 점포 정보
	public StoreVO get(int store_idx);
	// 점포 이름 검색
	public List<StoreVO> getNameList(String store_name);
	// 점포 동적 검색
	public List<StoreVO> getDynamicList(Map<String,String> map);
	// 점포 페이지 목록
	//public List<StoreVO> getListWithPageing(Criteria cri);
	// 점포 페이지 카운트
	//public int getTotalRecordCount();
	
	// 메인페이지 점포 목록 랜덤 출력
	public List<StoreVO> getStoreRanList(String store_address);
	
}