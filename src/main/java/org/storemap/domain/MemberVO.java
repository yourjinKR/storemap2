package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberVO {
	private int member_idx;
	private String member_image, member_id, member_pw, member_name, member_nickname, member_type; 
}
