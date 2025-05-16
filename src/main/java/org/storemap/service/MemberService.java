package org.storemap.service;

import org.storemap.domain.MemberVO;

public interface MemberService {
	// 로그인
	public MemberVO mLogin(String member_id, String member_pw);
	
	// 회원가입
	public int insertMember(MemberVO member);
	
	// id 중복확인
	public int checkId(String member_id);
	
	// 개인정보 수정
	public int modifyMember(MemberVO member);
	
	// 점주 요청 승인
	public int approvalOwner(int member_idx);
	
	// 점주 취소
	public int cancelOwner(int member_idx);
}
