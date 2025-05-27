package org.storemap.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.storemap.domain.EventVO;

public interface EventLikeMapper {
	// 좋아요 목록
	public List<EventVO> getLikeList(int member_idx);
	// 좋아요 추가
    public void insertLike(@Param("eventIdx") int eventIdx, @Param("memberIdx") int memberIdx);
    // 좋아요 삭제
    public void deleteLike(@Param("eventIdx") int eventIdx, @Param("memberIdx") int memberIdx);
    // 좋아요 여부 확인
    public boolean existsLike(@Param("eventIdx") int eventIdx, @Param("memberIdx") int memberIdx);

}
