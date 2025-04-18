package org.storemap.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.storemap.domain.MemberVO;

@Mapper
public interface MemberMapper {
	// 로그인
	public MemberVO mLogin(@Param("member_id") String member_id, @Param("member_pw") String member_pw);
	// 개인/점주 회원가입
	public int insertMember(MemberVO member);
	
}
