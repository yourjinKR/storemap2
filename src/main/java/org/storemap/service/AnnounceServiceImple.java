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
		if(uuidArr != null) {
			String[] arr = uuidArr.split(",");
			List<AttachFileVO> fileList = new ArrayList<AttachFileVO>();
			for (String uuid : arr) {
				fileList.add(attachMapper.getAttach(uuid));
			}
			vo.setAttach_list(fileList);
		}
		return vo;
	}
	
	// 공지 삭제
	@Transactional
	@Override
	public int noticeDelete(int announce_idx) {
		AnnounceVO vo = mapper.getNoticeView(announce_idx);
		String uuidArr = vo.getAnnounce_image();
		String[] arr = uuidArr.split(",");
		if(arr != null && arr.length > 0) {
			for (String uuid : arr) {
				cloudinaryService.deleteFile(uuid);
			}
		}
		return mapper.noticeDelete(announce_idx);
	}
	
	// 공지 수정
	@Transactional
	@Override
	public int updateNotice(MultipartFile[] files, AnnounceVO vo) {
		AnnounceVO oldvo = mapper.getNoticeView(vo.getAnnounce_idx());
		String oldImg = oldvo.getAnnounce_image();
		String uuidData = vo.getAnnounce_image();
		String newUuid = "";
			
		if(uuidData != null) {
			
			String[] arr = uuidData.split(",");
			int fileIdx = 0;
			for (int i = 0; i < arr.length; i++) {
				if(arr[i].equals("newFile")) {
					newUuid += cloudinaryService.uploadFile(files[fileIdx]);
					fileIdx++;
				}else {
					if(oldImg != null) {
						String[] oldArr = oldImg.split(",");
						int oldIdx= 0;
						for (String old : oldArr) {
							if(uuidData.indexOf(old) == -1) {
								cloudinaryService.deleteFile(old);
							}else {
								if(newUuid.indexOf(old) == -1) {
									newUuid += old;
									newUuid += ",";
									break;
								}
							}
							oldIdx++;
						}
					}
				}
				if(i < arr.length - 1) {
					newUuid += ",";
				}
			}
			
		}
		if(oldImg != null) {
			newUuid = newUuid.replaceAll(",{2,}", ",").replaceAll("(^,+|,+$)", "");     // 앞뒤 쉼표 제거
			if(uuidData != null) {
				vo.setAnnounce_image(newUuid);
			}else {
				vo.setAnnounce_image(oldvo.getAnnounce_image());
			}
		}else {
			newUuid = newUuid.replaceAll(",{2,}", ",").replaceAll("(^,+|,+$)", "");     // 앞뒤 쉼표 제거
			vo.setAnnounce_image(newUuid);
		}
		return mapper.updateNotice(vo);
	}
}
