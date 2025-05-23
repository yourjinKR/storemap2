package org.storemap.service;

import java.util.List;

import org.storemap.domain.EnterRequestVO;

public interface EnterRequestService {
	// 기업 등록 요청 등록
	public int register(int enter_idx);
	// 기업 등록 요청 수락
	public int modify(int enter_idx);
	// 기업 등록 요청 삭제
	public int remove(int enter_idx);
	// 조인 신청 요청 리스트 불러오기
	public List<EnterRequestVO> getDisReqListMap();
}