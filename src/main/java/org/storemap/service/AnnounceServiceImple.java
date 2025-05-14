package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.AnnounceDTO;
import org.storemap.domain.AnnounceVO;
import org.storemap.domain.AttachFileVO;
import org.storemap.domain.FilterVO;
import org.storemap.mapper.AnnounceMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class AnnounceServiceImple implements AnnounceService{
	
	@Autowired
	private AnnounceMapper mapper;
	// 파일 서버
	@Autowired
	private CloudinaryService cloudinaryService;
	
	// 공지사항 리스트
	@Override
	public List<AnnounceVO> getNotice(FilterVO filter){
		return mapper.getNotice(filter);
	}
	// 리스트 카운트
	@Override
	public int getListCount(FilterVO filter) {
		return mapper.getListCount(filter);
	}
	
	// 게시물 고정
	@Transactional
	@Override
	public int updateFixed(int[] data) {
		int result  = 0;
		for (int idx : data) {
			result += mapper.updateFixed(idx);
		}
		return result ;
	}
	
	// 공지등록
	@Transactional
	@Override
	public int insertNotice(MultipartFile[] files, AnnounceVO vo) {
		for (int i = 0; i < files.length; i++) {
			vo.setAnnounce_imgae(cloudinaryService.uploadFile(files[i]));
		}
		return mapper.insertNotice(vo);
	}
	
	// 공지
	@Override
	public AnnounceVO getNoticeView(int announce_idx) {
		return mapper.getNoticeView(announce_idx);
	}
	
	// 공지 삭제
	@Override
	public int noticeDelete(int announce_idx) {
		return mapper.noticeDelete(announce_idx);
	}
}
