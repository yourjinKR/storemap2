package org.storemap.service;

import org.storemap.domain.MemberVO;

public interface MemberService {
	// 로그인
	public MemberVO mLogin(String member_id, String member_pw);
	// 회원가입
	public int insertMember(MemberVO member);
	// id 중복확인
	public int checkId(String member_id);
}
