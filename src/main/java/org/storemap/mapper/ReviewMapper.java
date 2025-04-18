package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.ReviewVO;

public interface ReviewMapper {
	// 리뷰 등록
	public int insert(ReviewVO vo);
	// 리뷰 수정
	public int update(ReviewVO vo);
	// 리뷰 삭제
	public int delete(int review_idx);
	// 리뷰 목록
	public List<ReviewVO> getReviewList();
	// 리뷰 정보
	public ReviewVO read(int review_idx);
}