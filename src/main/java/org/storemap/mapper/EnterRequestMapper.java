package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.EnterRequestVO;

public interface EnterRequestMapper {
	// 기업 등록 요청 등록
	public int insert(int enter_idx);
	// 기업 등록 요청 수락
	public int update(int enter_idx);
	// 기업 등록 요청 삭제
	public int delete(int enter_idx);
	// 조인 신청 요청 리스트 불러오기
	public List<EnterRequestVO> getDisReqListMap();
}