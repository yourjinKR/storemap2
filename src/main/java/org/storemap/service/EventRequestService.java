package org.storemap.service;

import java.util.List;

import org.storemap.domain.EventRequestVO;

public interface EventRequestService {
	// 입점 신청 요청
	public int eventRequest(int eday_idx, int store_idx);
	// 입점 신청 철회
	public int cancelEntry(int eday_idx, int store_idx);
	// event_idx 받아오는 메소드
	public int getEventIdxByEdayIdx(int eday_idx);
	
	public List<Integer> getAppliedEdayIdxList(int storeIdx);
	// 입점 신청 리스트
	public List<EventRequestVO> getEdayRequest(int eday_idx);
	// 입점 승인
	public int updateRequest(String enter_id, int eday_idx, int store_idx);
	// 입점 반려
	public int deleteRequest(String enter_id, int eday_idx, int store_idx);
	// pon 받아와서 승인된 점포 철회 버튼 막기
	public int getPonByEdayIdxAndStoreIdx(int edayIdx, int storeIdx);
}
