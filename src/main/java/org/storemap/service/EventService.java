package org.storemap.service;

import java.util.List;

import org.storemap.domain.EventVO;
import org.storemap.domain.StoreVO;

public interface EventService {
	// 메인페이지 점포 목록 랜덤
	public List<EventVO> getRanList();
	
	// 메인페이지 점포 목록 종료 순
	public List<EventVO> getListEndDate(String searchDate);
	
	// 이벤트 상세보기
	public List<EventVO> getEventOneView(int eventIdx);
}
