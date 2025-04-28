package org.storemap.service;

import java.util.List;

import org.storemap.domain.StoreRequestVO;

public interface StoreRequestService {
	// 점주 신청 요청 등록
	public int register(int member_idx);
	// 점주 신청 요청 수락
	public int modify(int member_idx);
	// 점주 신청 요청 삭제
	public int remove(int member_idx);
	// 점주 신청 요청 리스트 불러오기
	public List<StoreRequestVO> getDisReqList();
}
