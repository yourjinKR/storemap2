package org.storemap.service;

import java.util.List;

import org.storemap.domain.CommentEventVO;

public interface CommentEventService {
	
   public boolean insert(CommentEventVO vo);
   public List<CommentEventVO> replyList(int event_idx);
	
}
