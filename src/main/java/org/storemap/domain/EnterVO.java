package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnterVO {
	private int enter_idx, enter_auth;
	private String enter_image, enter_id, enter_pw, enter_name, enter_loc, enter_num, enter_rnum;
	
}
