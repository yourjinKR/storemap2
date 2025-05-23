package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.ReviewDeclarationVO;
import org.storemap.domain.StoreDeclarationVO;

public interface ReviewDeclarationMapper {
	// 리뷰 신고 등록
	public int insert(ReviewDeclarationVO vo);
	// 리뷰 신고 삭제
	public int delete(int review_idx, int member_idx);
	// 리뷰 신고 전체 삭제
	public int deleteAll(int review_idx);
	// 리뷰 신고 들어온 목록
	public List<ReviewDeclarationVO> getReviewDeclarationList();
	// 리뷰 신고 보기
	public ReviewDeclarationVO read(int review_idx, int member_idx);
	// 조인 신고 목록
	public List<ReviewDeclarationVO> getReviewDeclarationMap();
	// 조인 신고 디테일 목록
	public List<ReviewDeclarationVO> getReviewDeclarationDetailMap();
}