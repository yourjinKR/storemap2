package org.storemap.mapper;

import java.util.List;
import java.util.Map;

import org.storemap.domain.StoreVO;

public interface StoreMapper {
	// 점포 등록
	public int insert(StoreVO vo);
	// 점포 관리
	public int update(StoreVO vo);
	// 점포 삭제
	public int delete(int store_idx);
	// 점포 목록
	public List<StoreVO> getStoreList();
	// 점포 정보
	public StoreVO read(int store_idx);
	// 점포 이름 검색
	public List<StoreVO> getStoreNameList(String store_name);
	// 점포 동적 검색
	public List<StoreVO> getStoreDynamicList(Map<String,String> map);
	// 점포 페이지 목록
	//public List<StoreVO> getListWithPage(Criteria cri);
	// 점포 페이지 카운트
	//public int getTotalRecordCountPage();
	
	// 메인페이지 점포 목록 랜덤 출력
	public List<StoreVO> getStoreRanList();
	
	
}