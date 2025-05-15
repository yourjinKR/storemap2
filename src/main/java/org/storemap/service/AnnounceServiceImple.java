package org.storemap.service;

import java.util.ArrayList;
import java.util.Arrays;
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
import org.storemap.mapper.AttachFileMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class AnnounceServiceImple implements AnnounceService{
	
	@Autowired
	private AnnounceMapper mapper;
	@Autowired
	private AttachFileMapper attachMapper;
	
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
		String uuidData = "";
		for (int i = 0; i < files.length; i++) {
			uuidData += cloudinaryService.uploadFile(files[i]);
			if(i < files.length - 1) {
				uuidData += ",";
			}
		}
		vo.setAnnounce_image(uuidData);
		return mapper.insertNotice(vo);
	}
	
	// 공지
	@Override
	public AnnounceVO getNoticeView(int announce_idx) {
		AnnounceVO vo = mapper.getNoticeView(announce_idx);
		String uuidArr = vo.getAnnounce_image();
		String[] arr = uuidArr.split(",");
		List<AttachFileVO> fileList = new ArrayList<AttachFileVO>();
		for (String uuid : arr) {
			fileList.add(attachMapper.getAttach(uuid));
		}
		vo.setAttach_list(fileList);
		return vo;
	}
	
	// 공지 삭제
	@Transactional
	@Override
	public int noticeDelete(int announce_idx) {
		AnnounceVO vo = mapper.getNoticeView(announce_idx);
		String uuidArr = vo.getAnnounce_image();
		String[] arr = uuidArr.split(",");
		for (String uuid : arr) {
			cloudinaryService.deleteFile(uuid);
		}
		return mapper.noticeDelete(announce_idx);
	}
	
	// uuid 정보 
	@Override
	public List<AttachFileVO> getUuid(int announce_idx) {
		List<AttachFileVO> list = null;
		
		return list;
	}
}
