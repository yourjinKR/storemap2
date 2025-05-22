package org.storemap.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface EventRequestMapper {
	public int eventRequest(@Param("eday_idx") int eday_idx, @Param("store_idx") int store_idx);
	
	public int cancelEntry(Map<String, Object> paramMap);
	
	public List<Integer> selectAppliedEdayIdxList(@Param("store_idx") int storeIdx);
}
