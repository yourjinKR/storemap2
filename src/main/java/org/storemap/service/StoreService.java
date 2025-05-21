package org.storemap.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.MapDTO;
import org.storemap.domain.StoreVO;

public interface StoreService {
	// 점포 등록
	public int register(MultipartFile file, StoreVO vo);
	// 점포 관리
	public int modify(MultipartFile file, StoreVO vo);
	// 점포 삭제
	public int remove(int store_idx);
	// 점포 삭제
	public int removeStore(int member_idx);
	// 점포 목록
	public List<StoreVO> getList();
	// 점포 조인 목록
	public List<StoreVO> getMap();
	// 점포 정보
	public StoreVO get(int store_idx);
	// 점포 조인 정보
	public StoreVO map(int store_idx);
	// 회원 번호로 점포 정보 가져오기
	public StoreVO getStore(int member_idx);
	// 같은 회원정보를 가진 점포가 있는지 검증
	public StoreVO getMember(int member_idx);
	// 점포 이름 검색
	public List<StoreVO> getNameList(String store_name);
	// 점포 동적 검색
	public List<StoreVO> getDynamicList(Map<String,String> map);
	// 점포 페이지 목록
	//public List<StoreVO> getListWithPageing(Criteria cri);
	// 점포 페이지 카운트
	//public int getTotalRecordCount();
	// 점포 숨기기 등록
	public int hide(int store_idx);
	// 점포 숨기기 해제, 점포 철수
	public int unhide(int store_idx);
	// 점포 시작!
	public int start(int store_idx);
	// 메인페이지 점포 목록 랜덤 출력
	public List<StoreVO> getStoreRanList(String store_address);
	// 점포 지역별 리스트 불러오기
	public List<StoreVO> getAreaList(String store_area);
	// 현위치 기반 점포 리스트 불러오기
	public List<StoreVO> getLocList(MapDTO map);
	// 현위치 기반 점포 리스트 불러오기
	public List<StoreVO> getNearestStores(MapDTO map);
	// 키워드 검색 점포 리스트 불러오기
	public List<StoreVO> getStoreKeywordList(MapDTO map);
	// 키워드와 지역명이 일치하는 점포 리스트 불러오기
	public List<StoreVO> getStoreAddrKeywordList(MapDTO map);
	// 반경 거리 내  점포 리스트 불러오기
	public List<StoreVO> getStoresWithinDistance(MapDTO map);
	// 점포 좋아요
	public int favorite(int store_idx);
	// 점포 좋아요 취소
	public int unfavorite(int store_idx);
	
}