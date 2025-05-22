package org.storemap.service;

import java.util.List;

import org.storemap.domain.StoreDeclarationVO;

public interface StoreDeclarationService {
	// 점포 신고 등록
	public int register(StoreDeclarationVO vo);
	// 점포 신고 삭제
	public int remove(int store_idx, int member_idx);
	// 점포 신고 삭제
	public int removeAll(int store_idx);
	// 점포 신고 목록
	public List<StoreDeclarationVO> getList();
	// 점포 신고 보기
	public StoreDeclarationVO get(int store_idx, int member_idx);
	// 조인된 신고 목록 조회
	public List<StoreDeclarationVO> getDeclarationMap();
	// 조인된 신고 목록 조회
	public List<StoreDeclarationVO> getDeclarationDetailMap();
}