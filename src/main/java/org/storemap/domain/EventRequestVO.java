package org.storemap.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventRequestVO {
	private int eday_idx, pon, store_idx;
	
	private List<StoreVO> join_store;
}
