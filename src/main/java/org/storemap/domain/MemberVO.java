package org.storemap.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberVO {
	private int member_idx;
	private String member_image, member_id, member_pw, member_name, member_nickname, member_type;
	
	private List<EventRequestVO> join_request;
}
