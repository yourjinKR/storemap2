package org.storemap.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.storemap.domain.AttachFileVO;

public interface AttachFileMapper {
	//파일 업로드
	public int insertAttach(AttachFileVO vo);
	//파일 업데이트
	public void updateAttach(AttachFileVO vo);
	//파일 삭제
	public void deleteAttach(String uuid);
	//파일 목록
	public List<AttachFileVO> findByIdx(int attach_idx);
	//uuid로 vo 가져오기
	public AttachFileVO getAttach(String uuid);
	//uuid 가져오기
	public List<AttachFileVO> getFilesByUuidList(@Param("uuidList") List<String> uuidList);

	
}
