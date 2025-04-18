package org.storemap.service;

import org.storemap.domain.MemberVO;

public interface MemberService {
	MemberVO login(String member_id, String member_pw);
}
