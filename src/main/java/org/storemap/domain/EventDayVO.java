package org.storemap.domain;

import java.sql.Time;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDayVO {
	private int eday_idx, event_idx, store_max;
	private Time event_starttime, event_stoptime;
}
