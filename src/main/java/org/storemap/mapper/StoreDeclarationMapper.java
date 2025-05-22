package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.StoreDeclarationVO;

public interface StoreDeclarationMapper {
	// 점포 신고 등록
	public int insert(StoreDeclarationVO vo);
	// 점포 신고 삭제
	public int delete(int store_idx, int member_idx);
	// 점포 신고 전체 삭제
	public int deleteAll(int store_idx);
	// 점포 신고 들어온 목록
	public List<StoreDeclarationVO> getStoreDeclarationList();
	// 점포 신고 보기
	public StoreDeclarationVO read(int store_idx, int member_idx);
	// 조인 신고 목록
	public List<StoreDeclarationVO> getStoreDeclarationMap();
	// 조인 신고 디테일 목록
	public List<StoreDeclarationVO> getStoreDeclarationDetailMap();
	// 신고 수
	public int getCount(int store_idx);
}