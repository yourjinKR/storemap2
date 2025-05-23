package org.storemap.service;

import java.util.List;

import org.storemap.domain.ReviewDeclarationVO;

public interface ReviewDeclarationService {
	// 리뷰 신고 등록
	public int register(ReviewDeclarationVO vo);
	// 리뷰 신고 삭제
	public int remove(int review_idx, int member_idx);
	// 리뷰 신고 삭제
	public int removeAll(int review_idx);
	// 리뷰 신고 목록
	public List<ReviewDeclarationVO> getList();
	// 리뷰 신고 보기
	public ReviewDeclarationVO get(int review_idx, int member_idx);
	// 조인된 신고 목록 조회
	public List<ReviewDeclarationVO> getDeclarationMap();
	// 조인된 신고 목록 조회
	public List<ReviewDeclarationVO> getDeclarationDetailMap();
}