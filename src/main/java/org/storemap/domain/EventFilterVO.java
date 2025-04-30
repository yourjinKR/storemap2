package org.storemap.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventFilterVO {
	private int page_num, amount_num;
	private String sort_type, list_state, board_search;
	private Date search_date;
}
