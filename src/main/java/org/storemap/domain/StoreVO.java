package org.storemap.domain;

import lombok.Data;

@Data
public class StoreVO {
	private int store_idx, member_idx, store_like_cnt, store_hidden;
	private String store_name, store_image, store_num, store_email, store_address, store_area, store_activity_time, store_content, store_rnum;
	
}
