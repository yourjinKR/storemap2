package org.storemap.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.storemap.domain.EventRequestVO;

public interface EventRequestMapper {
	public int eventRequest(@Param("eday_idx") int eday_idx, @Param("store_idx") int store_idx);
	
	public int cancelEntry(Map<String, Object> paramMap);
	
	public List<Integer> selectAppliedEdayIdxList(@Param("store_idx") int storeIdx);
	
	// 신청 완료
	public List<EventRequestVO> getEdayRequestAttend(int eday_idx);
	// 입점 신청 리스트
	public List<EventRequestVO> getEdayRequest(int eday_idx);
	// 입점 승인
	public int updateRequest(Map<String, Integer> map);
	
	public int selectPonByEdayIdxAndStoreIdx(@Param("edayIdx") int edayIdx, @Param("storeIdx") int storeIdx);
}
