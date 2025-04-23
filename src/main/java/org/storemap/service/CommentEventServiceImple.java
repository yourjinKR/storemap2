package org.storemap.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.storemap.domain.CommentEventVO;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class CommentEventServiceImple implements CommentEventService{
	CommentEventService service;
	
	@Override
	public List<CommentEventVO> replyList(int comment_idx) {
		log.info("service replyList..." + comment_idx);
		return service.replyList(comment_idx);
	}
}
