package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.CommentEventVO;

public interface CommentEventMapper {
	
	public List<CommentEventVO> replyList(int comment_idx);
}
