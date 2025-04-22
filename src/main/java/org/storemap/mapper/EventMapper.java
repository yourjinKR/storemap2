package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.EventVO;

public interface EventMapper {
	public List<EventVO> getRanList();
	public List<EventVO> getListEndDate(String searchDate);
	public List<EventVO> getEventOneView(int eventIdx);
	
}
