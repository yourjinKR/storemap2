package org.storemap.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDayVO {
	private int eday_idx, event_idx;
	private String store_max;
	private Date event_starttime, event_stoptime;
}
