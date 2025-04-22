package org.storemap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.EnterVO;
import org.storemap.mapper.EnterMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EnterServiceImple implements EnterService{
	@Autowired
	private EnterMapper enterMapper;
	// 로그인
	@Override
	public EnterVO eLogin(String enter_id, String enter_pw) {
		return enterMapper.eLogin(enter_id, enter_pw);
	}
	// 회원가입 member id 중복확인
	@Override
	public int checkId(String member_id) {
		int result = enterMapper.checkId(member_id);
		return result;
	}
	// 회원가입
	@Override
	public int insertEnter(EnterVO enter) {
		int result = enterMapper.insertEnter(enter);
		return result;
	}
}
