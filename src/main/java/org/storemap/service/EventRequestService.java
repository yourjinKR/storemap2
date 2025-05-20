package org.storemap.service;

public interface EventRequestService {
	// 입점 신청 요청
	public int eventRequest(int eday_idx, int store_idx);
	// 입점 신청 철회
	public int cancelEntry(int eday_idx, int store_idx);
	// event_idx 받아오는 메소드
	public int getEventIdxByEdayIdx(int eday_idx);
}
