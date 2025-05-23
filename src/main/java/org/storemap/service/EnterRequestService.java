package org.storemap.service;

import java.util.List;

import org.storemap.domain.EnterRequestVO;

public interface EnterRequestService {
	// 조인 신청 요청 리스트 불러오기
	public List<EnterRequestVO> getDisReqListMap();
}