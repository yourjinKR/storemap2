package org.storemap.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.storemap.domain.MemberVO;

@Mapper
public interface MemberMapper {
	MemberVO login(@Param("member_id") String member_id, @Param("member_pw") String member_pw);
}
