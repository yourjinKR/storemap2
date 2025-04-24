package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.CommentEventVO;
import org.storemap.mapper.CommentEventMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class CommentEventServiceImple implements CommentEventService{
	
	@Autowired
	private CommentEventMapper mapper;
	
    @Override
    public boolean insert(CommentEventVO vo) {
        return mapper.insert(vo) == 1;
    }

    @Override
    public List<CommentEventVO> replyList(int event_idx) {
        return mapper.replyList(event_idx);
    }
}
