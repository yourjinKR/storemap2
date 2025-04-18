package org.storemap.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.storemap.domain.EnterVO;

@Mapper
public interface EnterMapper {
	// 로그인
		public EnterVO eLogin(@Param("enter_id") String enter_id, @Param("enter_pw") String enter_pw);
	// 기업/단체 회원가입
	public int insertEnter(EnterVO enter);
}
