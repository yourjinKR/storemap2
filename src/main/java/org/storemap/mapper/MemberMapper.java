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
	
	// id 중복확인
	public int checkId(String member_id);
	
	// 회원정보 수정
	public int modifyMember(MemberVO member);
	
	// 점주 요청 승인
	public int approvalOwner(int member_idx);
	
	// 점주 취소
	public int cancelOwner(int member_idx);
	
	// 회원 정보
	public MemberVO read(int member_idx);
		
}
