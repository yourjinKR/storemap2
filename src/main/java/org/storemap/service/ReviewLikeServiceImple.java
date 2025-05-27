package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.ReviewLikeVO;
import org.storemap.domain.ReviewVO;
import org.storemap.mapper.AttachFileMapper;
import org.storemap.mapper.ReviewLikeMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class ReviewLikeServiceImple implements ReviewLikeService{
	
	@Autowired
	private ReviewLikeMapper mapper;
	@Autowired
	private AttachFileMapper attachMapper;
	
	@Override
	public int register(int review_idx, int member_idx) {
		log.info("register..."+review_idx+", "+member_idx);
		int result = mapper.insert(review_idx, member_idx);
		return result;
	}
	
	@Override
	public int remove(int review_idx, int member_idx) {
		log.info("remove..."+review_idx+", "+member_idx);
		int result = mapper.delete(review_idx, member_idx);
		return result;
	}
	
	// 내 좋아요 목록
	@Override
	public List<ReviewVO> getLikeList(int member_idx) {
		List<ReviewVO> list = mapper.getLikeList(member_idx);
		for (ReviewVO vo : list) {
			if(vo.getReview_image() != null) {
				vo.setAttach(attachMapper.getAttach(vo.getReview_image()));
			}
		}
		return list;
	}
	// 내가 쓴 리뷰 목록
	@Override
	public List<ReviewVO> getMyReview(int member_idx) {
		List<ReviewVO> list = mapper.getMyReview(member_idx);
		for (ReviewVO vo : list) {
			if(vo.getReview_image() != null) {
				vo.setAttach(attachMapper.getAttach(vo.getReview_image()));
			}
		}
		return list;
	}
	
	@Override
	public List<ReviewLikeVO> getMyLikeReview(int member_idx) {
		List<ReviewLikeVO> list = mapper.getMyLikeReview(member_idx);
		return list;
	}
	
	@Override
	public ReviewLikeVO getIdx(int review_idx, int member_idx) {
		log.info("getIdx..."+review_idx+", "+member_idx);
		return mapper.getReviewIdx(review_idx, member_idx);
	}
	
}