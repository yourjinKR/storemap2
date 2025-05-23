package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.EventDeclarationVO;

public interface EventDeclarationMapper {
	// 이벤트 신고 등록
	public int insertReport(EventDeclarationVO reportVO);
	// 이벤트 신고 삭제
	public int delete(int event_idx, int member_idx);
	// 이벤트 신고 전체 삭제
	public int deleteAll(int event_idx);
	// 조인 신고 목록
	public List<EventDeclarationVO> getEventDeclarationMap();
	// 조인 신고 디테일 목록
	public List<EventDeclarationVO> getEventDeclarationDetailMap();
}
