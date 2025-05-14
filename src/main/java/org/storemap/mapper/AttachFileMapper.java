package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.AttachFileVO;

public interface AttachFileMapper {
	//파일 업로드
	public int insertAttach(AttachFileVO vo);
	//파일 업데이트
	public void update(AttachFileVO vo);
	//파일 삭제
	public void delete(int attach_idx);
	//파일 목록
	public List<AttachFileVO> findByIdx(int attach_idx);
	
	public AttachFileVO getAttach(String uuid);
}
