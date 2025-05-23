package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.EnterRequestVO;

public interface EnterRequestMapper {
	// 조인 신청 요청 리스트 불러오기
	public List<EnterRequestVO> getDisReqListMap();
}