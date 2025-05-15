package org.storemap.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.AnnounceVO;
import org.storemap.domain.AttachFileVO;
import org.storemap.domain.FilterVO;

public interface AnnounceService {
	// 공지사항 리스트
	public List<AnnounceVO> getNotice(FilterVO filter);
	// 리스트 카운트
	public int getListCount(FilterVO filter);
	// 게시물 고정
	public int updateFixed(int[] data);
	// 공지등록
	public int insertNotice(MultipartFile[] files, AnnounceVO vo);
	// 공지 View
	public AnnounceVO getNoticeView(int announce_idx);
	// 공지 삭제
	public int noticeDelete(int announce_idx);
	// uuid 정보 
	public List<AttachFileVO> getUuid(int announce_idx);
}
