package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.ReviewLikeVO;
import org.storemap.mapper.ReviewLikeMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class ReviewLikeServiceImple implements ReviewLikeService{
	
	@Autowired
	private ReviewLikeMapper mapper;
	
	@Override
	public int register(ReviewLikeVO vo) {
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
	public List<ReviewLikeVO> getList(int member_idx) {
		log.info("getList..."+member_idx);
		return mapper.getReviewLikeList(member_idx);
	}
	
	@Override
	public ReviewLikeVO getIdx(int review_idx, int member_idx) {
		log.info("getIdx..."+review_idx+", "+member_idx);
		return mapper.getReviewIdx(review_idx, member_idx);
	}
	
}