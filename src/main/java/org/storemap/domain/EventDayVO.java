package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDayVO {
	private int eday_idx, event_idx, store_max, eventRequestCount;
	private String event_starttime, event_stoptime;
}
