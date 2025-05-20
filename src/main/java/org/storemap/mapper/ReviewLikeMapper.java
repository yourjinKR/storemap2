package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.ReviewLikeVO;
import org.storemap.domain.ReviewVO;

public interface ReviewLikeMapper {
	// 리뷰 좋아요 등록
	public int insert(int review_idx, int member_idx);
	// 리뷰 좋아요 취소
	public int delete(int review_idx, int member_idx);
	// 리뷰 좋아요한 목록 보기
	public List<ReviewVO> getLikeList(int member_idx);
	// 내가 좋아요한 리뷰번호 가져오기
	public ReviewLikeVO getReviewIdx(int review_idx, int member_idx);
}