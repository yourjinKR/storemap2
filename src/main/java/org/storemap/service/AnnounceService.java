package org.storemap.service;

import java.util.List;

import org.storemap.domain.AnnounceDTO;
import org.storemap.domain.AnnounceVO;
import org.storemap.domain.FilterVO;

public interface AnnounceService {
	public List<AnnounceVO> getNotice(FilterVO filter);
	public int getListCount(FilterVO filter);
}
