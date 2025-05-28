package org.storemap.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.storemap.domain.EnterVO;
import org.storemap.domain.MemberVO;

@Mapper
public interface EnterMapper {
	// 로그인
	public EnterVO eLogin(@Param("enter_id") String enter_id, @Param("enter_pw") String enter_pw);
	
	// 회원가입 member id 중복확인
	public int checkId(String member_id);
	
	// 회원가입
	public int insertEnter(EnterVO enter);
	
	// 회원정보 수정
	public int modifyEnter(EnterVO enter);
	
	// 기업 정보
	public EnterVO read(int enter_idx);
	
	// 회원 삭제
	public int delete(int enter_idx);
	
	// 권한 수락
	public int acceptPermission(int enter_idx);
	
	// ENTER와 ENTER_REQUEST를 하나의 프로시저로 처리
    public int insertEnterWithRequest(EnterVO enter);
	
}
