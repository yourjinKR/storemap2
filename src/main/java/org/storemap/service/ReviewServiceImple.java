package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.ReviewVO;
import org.storemap.mapper.ReviewMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class ReviewServiceImple implements ReviewService{
	
	@Autowired
	private ReviewMapper mapper;
	//이미지 업로드 서버
	@Autowired
	private CloudinaryService cloudinaryService;
	
	@Override
	public int register(MultipartFile file, ReviewVO vo) {
		log.info("register..."+vo);
		try {
			// 파일이 있는 경우에만 이미지 업로드 처리
			if(file != null && !file.isEmpty()) {
				String imageUrl = cloudinaryService.uploadFile(file);
				vo.setReview_image(imageUrl);
			}
			return mapper.insert(vo);
		} catch (Exception e) {
			throw new RuntimeException("Failed to register review", e);
		}
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
		ReviewVO rvo = mapper.read(review_idx);
		String oldImg = rvo.getReview_image();
		if(!oldImg.equals("")) {
			// 이미지 삭제
			cloudinaryService.deleteFile(oldImg);
		}
		// 리뷰 삭제
		int result = mapper.delete(review_idx);
		return result;
	}
	
	@Override
	public List<ReviewVO> getList(int store_idx) {
		log.info("getList..."+store_idx);
		return mapper.getReviewList(store_idx);
	}
	
	@Override
	public List<ReviewVO> getHiddenList() {
		log.info("getHiddenList...");
		return mapper.getReviewHiddenList();
	}
	
	@Override
	public List<ReviewVO> getMap(int store_idx) {
		log.info("getMap..."+store_idx);
		return mapper.getReviewMap(store_idx);
	}
	
	@Override
	public ReviewVO get(int review_idx) {
		log.info("get..."+review_idx);
		return mapper.read(review_idx);
	}
	
	@Override
	public ReviewVO getSame(int store_idx, int member_idx) {
		log.info("getSame..."+store_idx+", "+member_idx);
		return mapper.getSame(store_idx, member_idx);
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
	
	@Override
	public int favorite(int review_idx) {
		log.info("favorite..."+review_idx);
		return mapper.updateFavorite(review_idx);
	}
	@Override
	public int unfavorite(int review_idx) {
		log.info("unfavorite..."+review_idx);
	    return mapper.deleteFavorite(review_idx);
	}
	
}