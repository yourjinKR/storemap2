package org.storemap.service;

import java.util.List;

import org.storemap.domain.CommentEventVO;

public interface CommentEventService {
	
	public List<CommentEventVO> replyList(int comment_idx);
}
