package org.storemap.service;

import java.util.List;

import org.storemap.domain.AttachFileVO;

public interface AttachFileService {
	//파일 업로드
	public void register(AttachFileVO vo);
	//파일 업데이트
	public void modify(AttachFileVO vo);
	//파일 삭제
	public void remove(int attach_idx);
	//파일 목록
	public List<AttachFileVO> findByIdx(int attach_idx);
	//첨부 파일 리스트
	public List<AttachFileVO> getAttachList(int attach_idx);
}
