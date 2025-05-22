package org.storemap.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.storemap.domain.EventRequestVO;

public interface EventRequestMapper {
	public int eventRequest(@Param("eday_idx") int eday_idx, @Param("store_idx") int store_idx);
	
	public int cancelEntry(Map<String, Object> paramMap);
	
	public List<Integer> selectAppliedEdayIdxList(@Param("store_idx") int storeIdx);
	public int cancelEntry(@Param("eday_idx") int eday_idx, @Param("store_idx") int store_idx);
	
	// 입점 신청 리스트
	public List<EventRequestVO> getEdayRequest(int eday_idx);
	// 입점 승인
	public int updateRequest(int eday_idx, int store_idx);
	// 입점 반려
	public int deleteRequest(int eday_idx, int store_idx);
}
