package org.storemap.domain;

import lombok.Data;

@Data	
public class MenuVO {
	private int menu_idx, store_idx, menu_price;
	private String menu_image, menu_name;
}
