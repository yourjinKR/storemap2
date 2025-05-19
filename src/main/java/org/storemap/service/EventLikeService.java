package org.storemap.service;

import java.util.List;

import org.storemap.domain.EventVO;

public interface EventLikeService {
	// 좋아요 목록
	public List<EventVO> getLikeList(int member_idx);
}
