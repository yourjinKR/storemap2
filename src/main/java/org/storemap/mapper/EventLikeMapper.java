package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.EventVO;

public interface EventLikeMapper {
	// 좋아요 목록
	public List<EventVO> getLikeList(int member_idx);
}
