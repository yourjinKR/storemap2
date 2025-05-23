package org.storemap.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.storemap.domain.EventDayVO;

public interface EventDayMapper {
	public int insertEventday(EventDayVO eventDayVO);
	
	public List<EventDayVO> getEventDaysByEventId(@Param("event_idx") int event_idx);
	
	public int getEventIdxByEdayIdx(int eday_idx);
	
}
