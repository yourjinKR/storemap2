package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.ReviewVO;
import org.storemap.mapper.ReviewMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class ReviewServiceImple implements ReviewService{
	
	@Autowired
	private ReviewMapper mapper;
	
	@Override
	public int register(ReviewVO vo) {
		log.info("register..."+vo);
		int result = mapper.insert(vo);
		return result;
	}
	
	@Override
	public int modify(ReviewVO vo) {
		log.info("modify..."+vo);
		int result = mapper.update(vo);
		return result;
	}
	
	@Override
	public int remove(int review_idx) {
		log.info("remove..."+review_idx);
		int result = mapper.delete(review_idx);
		return result;
	}
	
	@Override
	public List<ReviewVO> getList(int store_idx) {
		log.info("getList...");
		return mapper.getReviewList(store_idx);
	}
	
	@Override
	public ReviewVO get(int review_idx) {
		log.info("get..."+review_idx);
		return mapper.read(review_idx);
	}
	
	@Override
	public int hide(int review_idx) {
		log.info("hide..."+review_idx);
		int result = mapper.hideReview(review_idx);
		return result;
	}
	@Override
	public int unhide(int review_idx) {
		log.info("unhide..."+review_idx);
		int result = mapper.unhideReview(review_idx);
		return result;
	}
	
}