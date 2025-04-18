package org.storemap.service;

import java.util.List;

import org.storemap.domain.ReviewVO;

public interface ReviewService {
	// 리뷰 등록
	public int register(ReviewVO vo);
	// 리뷰 수정
	public int modify(ReviewVO vo);
	// 리뷰 삭제
	public int remove(int review_idx);
	// 리뷰 목록
	public List<ReviewVO> getList();
	// 리뷰 정보
	public ReviewVO get(int review_idx);
}