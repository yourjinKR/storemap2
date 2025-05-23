package org.storemap.mapper;

import java.util.List;
import java.util.Map;

import org.storemap.domain.MapDTO;
import org.storemap.domain.StoreVO;

public interface StoreMapper {
	// 점포 등록
	public int insert(StoreVO vo);
	// 점포 관리
	public int update(StoreVO vo);
	// 점포 삭제
	public int delete(int store_idx);
	// 점포 삭제
	public int deleteStore(int member_idx);
	// 점포 목록
	public List<StoreVO> getStoreList();
	// 숨긴 점포 목록
	public List<StoreVO> getStoreHiddenList();
	// 점포 조인 목록
	public List<StoreVO> getStoreMap();
	// 점포 정보
	public StoreVO read(int store_idx);
	// 점포 조인 정보
	public StoreVO map(int store_idx);
	// 회원 번호로 점포 정보 가져오기
	public StoreVO getStore(int member_idx);
	// 같은 회원정보를 가진 점포가 있는지 검증
	public StoreVO getMember(int member_idx);
	// 점포 이름 검색
	public List<StoreVO> getStoreNameList(String store_name);
	// 점포 동적 검색
	public List<StoreVO> getStoreDynamicList(Map<String,String> map);
	// 점포 페이지 목록
	//public List<StoreVO> getListWithPage(Criteria cri);
	// 점포 페이지 카운트
	//public int getTotalRecordCountPage();
	// 점포 숨기기 등록
	public int hideStore(int store_idx);
	// 점포 숨기기 해제, 점포 철수
	public int unhideStore(int store_idx);
	// 점포 시작!
	public int storeStart(int store_idx);
	// 메인페이지 점포 목록 랜덤 출력
	public List<StoreVO> getStoreRanList(String store_address);
	// 점포 지역별 리스트 불러오기
	public List<StoreVO> getStoreAreaList(String store_area);
	// 현위치 기반 점포 리스트 불러오기
	public List<StoreVO> getStoreLocList(int gu);
	// 가장 가까운 점포 리스트 불러오기
	public List<StoreVO> getNearestStores(MapDTO map);
	// 키워드 검색 점포 리스트 불러오기
	public List<StoreVO> getStoreKeywordList(MapDTO map);
	// 키워드와 지역명이 일치하는 점포 리스트 불러오기
	public List<StoreVO> getStoreAddrKeywordList(MapDTO map);
	// 반경 거리 내  점포 리스트 불러오기
	public List<StoreVO> getStoresWithinDistance(MapDTO map);
	// 점포 좋아요
	public int updateFavorite(int store_idx);
	// 점포 좋아요 취소
	public int deleteFavorite(int store_idx);
	
}