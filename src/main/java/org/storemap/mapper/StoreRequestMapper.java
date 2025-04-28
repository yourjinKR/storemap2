package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.StoreRequestVO;

public interface StoreRequestMapper {
	// 점주 신청 요청 등록
	public int insert(StoreRequestVO vo);
	// 점주 신청 요청 수락
	public int update(int member_idx);
	// 점주 신청 요청 삭제
	public int delete(int member_idx);
	// 점주 신청 요청 리스트 불러오기
	public List<StoreRequestVO> getDisReqList();
}
