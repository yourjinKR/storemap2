package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventVO {
	private int event_idx, store_idx, enter_idx, event_location, event_like_cnt, event_hidden;
	private String event_title, event_category, event_location_detail, event_content, event_file, event_list_max;
	private Date event_rstartdate, event_rstopdate, event_bstartdate, event_bstopdate;
}
