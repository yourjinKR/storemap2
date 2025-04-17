package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EventDayVO {
	private int eday_idx, event_idx;
	private String store_list;
	private Date event_starttime, event_stoptime;

}
