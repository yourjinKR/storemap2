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
	
	@Override
	public MemberVO login(String member_id, String member_pw) {
		return memberMapper.login(member_id, member_pw);
	}
}
