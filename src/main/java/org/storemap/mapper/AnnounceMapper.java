package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.AnnounceDTO;
import org.storemap.domain.AnnounceVO;
import org.storemap.domain.FilterVO;

public interface AnnounceMapper {
	public List<AnnounceVO> getNotice(FilterVO filter);
	public int getListCount(FilterVO filter);
}
