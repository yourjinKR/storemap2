package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.ReviewDeclarationVO;

public interface ReviewDeclarationMapper {
	// 리뷰 신고 등록
	public int insert(ReviewDeclarationVO vo);
	// 리뷰 신고 삭제
	public int delete(int review_idx, int member_idx);
	// 리뷰 신고 목록
	public List<ReviewDeclarationVO> getReviewDeclarationList();
	// 리뷰 신고 보기
	public ReviewDeclarationVO read(int review_idx, int member_idx);
}