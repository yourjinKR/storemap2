package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.CommentDeclarationVO;
import org.storemap.mapper.CommentDeclarationMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class CommentDeclarationServiceImple implements CommentDeclarationService {
	@Autowired
	private CommentDeclarationMapper mapper;
	
	@Override
	public int register(CommentDeclarationVO vo) {
		log.info("register..."+vo);
		int result = mapper.insert(vo);
		return result;
	}
	
	@Override
	public int remove(int comment_idx, int member_idx) {
		log.info("remove..."+comment_idx+", "+member_idx);
		int result = mapper.delete(comment_idx, member_idx);
		return result;
	}
	
	@Override
	public int removeAll(int comment_idx) {
		log.info("removeAll...");
		int result = mapper.deleteAll(comment_idx);
		return result;
	}
	
	@Override
	public List<CommentDeclarationVO> getDeclarationMap() {
		log.info("getDeclarationMap...");
		return mapper.getCommentDeclarationMap();
	}
	
	@Override
	public List<CommentDeclarationVO> getDeclarationDetailMap() {
		log.info("getDeclarationDetailMap...");
		return mapper.getCommentDeclarationDetailMap();
	}
	
}