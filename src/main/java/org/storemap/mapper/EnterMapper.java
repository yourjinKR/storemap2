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
	
}
