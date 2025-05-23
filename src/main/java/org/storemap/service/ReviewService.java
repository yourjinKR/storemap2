package org.storemap.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.ReviewVO;

public interface ReviewService {
	// 리뷰 등록
	public int register(MultipartFile file, ReviewVO vo);
	// 리뷰 수정
	public int modify(ReviewVO vo);
	// 리뷰 삭제
	public int remove(int review_idx);
	// 리뷰 목록
	public List<ReviewVO> getList(int store_idx);
	// 숨긴 리뷰 목록
	public List<ReviewVO> getHiddenList();
	// 리뷰 조인 목록
	public List<ReviewVO> getMap(int store_idx);
	// 리뷰 정보
	public ReviewVO get(int review_idx);
	// 해당 점포에 동일한 리뷰를 가지고 있는지 검증
	public ReviewVO getSame(int store_idx, int member_idx);
	// 리뷰 숨기기 등록
	public int hide(int review_idx);
	// 리뷰 숨기기 해제
	public int unhide(int review_idx);
	// 점포 좋아요
	public int favorite(int review_idx);
	// 점포 좋아요 취소
	public int unfavorite(int review_idx);
}