package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.StoreLikeVO;

public interface StoreLikeMapper {
	// 점포 좋아요 등록
	public int insert(int store_idx, int member_idx);
	// 점포 좋아요 취소
	public int delete(int store_idx, int member_idx);
	// 점포 좋아요한 목록 보기
	public List<StoreLikeVO> getStoreLikeList(int member_idx);
	// 내가 좋아요한 점포번호 가져오기
	public StoreLikeVO getStoreIdx(int store_idx, int member_idx);
}