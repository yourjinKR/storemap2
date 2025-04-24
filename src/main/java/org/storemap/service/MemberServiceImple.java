package org.storemap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.MemberVO;
import org.storemap.mapper.MemberMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class MemberServiceImple implements MemberService{
	@Autowired
	private MemberMapper memberMapper;
	// 로그인
	@Override
	public MemberVO mLogin(String member_id, String member_pw) {
		return memberMapper.mLogin(member_id, member_pw);
	}
	
	// 개인/점주 회원가입
	@Override
	public int insertMember(MemberVO member) {
		int result = memberMapper.insertMember(member);
		return result;
	}
	// id 중복확인
	@Override
	public int checkId(String member_id) {
		int result = memberMapper.checkId(member_id); 
		return result; 
	}
	
	// 개인정보 수정
	@Override
	public int modifyMember(MemberVO member) {
		int result = memberMapper.modifyMember(member);
		return result;
	}
}
