package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data	
@AllArgsConstructor
@NoArgsConstructor
public class MenuVO {
	private int menu_idx, store_idx, menu_price;
	private String menu_image, menu_name;
}
