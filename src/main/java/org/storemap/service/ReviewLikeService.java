package org.storemap.service;

import java.util.List;

import org.storemap.domain.ReviewLikeVO;

public interface ReviewLikeService {
	// 리뷰 좋아요 등록
	public int register(ReviewLikeVO vo);
	// 리뷰 좋아요 취소
	public int remove(int review_idx, int member_idx);
	// 리뷰 좋아요한 목록 보기
	public List<ReviewLikeVO> getList(int member_idx);
	// 내가 좋아요한 리뷰번호 가져오기
	public ReviewLikeVO getIdx(int review_idx, int member_idx);
}