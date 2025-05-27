package org.storemap.service;

import java.util.List;

import org.storemap.domain.EventVO;

public interface EventLikeService {
	// 좋아요 목록
	public List<EventVO> getLikeList(int member_idx);
    // 좋아요 추가
	public void addLike(int eventIdx, int memberIdx);
    // 좋아요 삭제
	public void removeLike(int eventIdx, int memberIdx);
    // 좋아요 여부 확인
	public boolean hasLiked(int eventIdx, int memberIdx);
}
