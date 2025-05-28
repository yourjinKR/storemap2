package org.storemap.service;

import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.EnterVO;

public interface EnterService {
	// 로그인
	public EnterVO eLogin(String enter_id, String enter_pw);
	
	// 회원가입 member id 중복확인
	public int checkId(String member_id);
	
	// 회원가입
	public int insertEnter(EnterVO enter);
	
	// 회원정보 수정
	public int modifyEnter(MultipartFile file, EnterVO enter);
	
	// 회원 정보
	public EnterVO get(int enter_idx);
	
	// 회원 삭제
	public int remove(int enter_idx);
	
	// 권한 수락
	public int acceptPermission(int enter_idx);
	
	// ENTER와 ENTER_REQUEST를 하나의 프로시저로 처리
    public int insertEnterWithRequest(EnterVO enter);
	
}
