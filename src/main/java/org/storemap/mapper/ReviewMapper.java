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
	public List<ReviewVO> getReviewList(int store_idx);
	// 숨긴 리뷰 목록
	public List<ReviewVO> getReviewHiddenList();
	// 리뷰 조인 목록
	public List<ReviewVO> getReviewMap(int store_idx);
	// 리뷰 정보
	public ReviewVO read(int review_idx);
	// 해당 점포에 동일한 리뷰를 가지고 있는지 검증
	public ReviewVO getSame(int store_idx, int member_idx);
	// 리뷰 숨기기 등록
	public int hideReview(int review_idx);
	// 리뷰 숨기기 해제
	public int unhideReview(int review_idx);
	// 점포 좋아요
	public int updateFavorite(int review_idx);
	// 점포 좋아요 취소
	public int deleteFavorite(int review_idx);
}