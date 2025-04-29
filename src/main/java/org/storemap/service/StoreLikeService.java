package org.storemap.service;

import java.util.List;

import org.storemap.domain.StoreLikeVO;

public interface StoreLikeService {
	// 점포 좋아요 등록
	public int register(int store_idx, int member_idx);
	// 점포 좋아요 취소
	public int remove(int store_idx, int member_idx);
	// 점포 좋아요한 목록 보기
	public List<StoreLikeVO> getList(int member_idx);
	// 내가 좋아요한 점포번호 가져오기
	public StoreLikeVO getIdx(int store_idx, int member_idx);
}