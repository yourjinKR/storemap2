package org.storemap.mapper;

import org.apache.ibatis.annotations.Param;

public interface EventRequestMapper {
	int eventRequest(@Param("eday_idx") int eday_idx, @Param("store_idx") int store_idx);
}
