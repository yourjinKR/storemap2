package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventRequestVO {
	private int eday_idx, pon, store_idx;
	private Date regdate;
	private StoreVO join_store;
}
