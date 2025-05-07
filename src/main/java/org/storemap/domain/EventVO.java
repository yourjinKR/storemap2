package org.storemap.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventVO {
	private int event_idx, store_idx, enter_idx, event_location, event_like_cnt, event_hidden;
	private String event_title, event_category, event_location_detail, event_content, event_file;
	private Date event_rstartdate, event_rstopdate, event_bstartdate, event_bstopdate;
	
	// 게시글 등록 시 필요한 필드
	private List<EventDayVO> eventDay;
	private List<AttachFileVO> attachFile;

	// 
	private List<EventDayVO> join_eday;
	
	private int approved_store, max_store, like_count, comment_count;
}
