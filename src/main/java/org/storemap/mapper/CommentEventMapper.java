package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.CommentEventVO;

public interface CommentEventMapper {
	
    int insert(CommentEventVO vo);
    List<CommentEventVO> replyList(int event_idx);
}
