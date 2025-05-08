package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.AnnounceDTO;
import org.storemap.domain.AnnounceVO;
import org.storemap.domain.FilterVO;
import org.storemap.mapper.AnnounceMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class AnnounceServiceImple implements AnnounceService{
	
	@Autowired
	private AnnounceMapper mapper;
	
	@Override
	public List<AnnounceVO> getNotice(FilterVO filter){
		return mapper.getNotice(filter);
	}
	
	@Override
	public int getListCount(FilterVO filter) {
		return mapper.getListCount(filter);
	}
}
