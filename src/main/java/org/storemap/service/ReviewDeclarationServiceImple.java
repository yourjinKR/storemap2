package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.ReviewDeclarationVO;
import org.storemap.mapper.ReviewDeclarationMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class ReviewDeclarationServiceImple implements ReviewDeclarationService{
	
	@Autowired
	private ReviewDeclarationMapper mapper;
	
	@Override
	public int register(ReviewDeclarationVO vo) {
		log.info("register..."+vo);
		int result = mapper.insert(vo);
		return result;
	}
	
	@Override
	public int remove(int review_idx, int member_idx) {
		log.info("remove..."+review_idx+", "+member_idx);
		int result = mapper.delete(review_idx, member_idx);
		return result;
	}
	
	@Override
	public List<ReviewDeclarationVO> getList() {
		log.info("getList...");
		return mapper.getReviewDeclarationList();
	}
	
	@Override
	public ReviewDeclarationVO get(int review_idx, int member_idx) {
		log.info("get..."+review_idx+", "+member_idx);
		return mapper.read(review_idx, member_idx);
	}
	
}