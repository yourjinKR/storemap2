package org.storemap.service;

import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.EnterVO;

public interface EnterService {
	// 로그인
	public EnterVO eLogin(String enter_id, String enter_pw);
	
	// 회원가입 member id 중복확인
	public int checkId(String member_id);
	
	// 회원가입
	public int insertEnter(MultipartFile file, EnterVO enter);
	
	// 회원정보 수정
	public int modifyEnter(MultipartFile file, EnterVO enter);
	
	// 회원 정보
	public EnterVO get(int enter_idx);
	
}
