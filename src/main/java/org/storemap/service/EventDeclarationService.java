package org.storemap.service;

import java.util.List;

import org.storemap.domain.EventDeclarationVO;

public interface EventDeclarationService {
	// 이벤트 신고 등록
	public int submitReport(EventDeclarationVO reportVO);
	// 이벤트 신고 삭제
	public int remove(int event_idx, int member_idx);
	// 이벤트 신고 삭제
	public int removeAll(int event_idx);
	// 조인된 신고 목록 조회
	public List<EventDeclarationVO> getDeclarationMap();
	// 조인된 신고 목록 조회
	public List<EventDeclarationVO> getDeclarationDetailMap();
}
