package org.storemap.service;

import org.storemap.domain.EnterVO;

public interface EnterService {
	// 로그인
	public EnterVO eLogin(String enter_id, String enter_pw);
	// 회원가입
	public int insertEnter(EnterVO enter);
}
