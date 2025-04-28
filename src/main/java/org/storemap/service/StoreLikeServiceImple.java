package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.StoreLikeVO;
import org.storemap.mapper.StoreLikeMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class StoreLikeServiceImple implements StoreLikeService{
	
	@Autowired
	private StoreLikeMapper mapper;
	
	@Override
	public int register(StoreLikeVO vo) {
		log.info("register..."+vo);
		int result = mapper.insert(vo);
		return result;
	}
	
	@Override
	public int remove(int store_idx, int member_idx) {
		log.info("remove..."+store_idx+", "+member_idx);
		int result = mapper.delete(store_idx, member_idx);
		return result;
	}
	
	@Override
	public List<StoreLikeVO> getList(int member_idx) {
		log.info("getList..."+member_idx);
		return mapper.getStoreLikeList(member_idx);
	}
	
	@Override
	public StoreLikeVO getIdx(int store_idx, int member_idx) {
		log.info("getIdx..."+store_idx+", "+member_idx);
		return mapper.getStoreIdx(store_idx, member_idx);
	}
	
}