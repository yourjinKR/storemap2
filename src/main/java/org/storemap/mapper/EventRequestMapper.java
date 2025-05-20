package org.storemap.mapper;

import org.apache.ibatis.annotations.Param;

public interface EventRequestMapper {
	public int eventRequest(@Param("eday_idx") int eday_idx, @Param("store_idx") int store_idx);
	
	public int cancelEntry(@Param("eday_idx") int eday_idx, @Param("store_idx") int store_idx);
}
