package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.AttachFileVO;
import org.storemap.mapper.AttachFileMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class AttachFileServiceImple implements AttachFileService{
	@Autowired
	AttachFileMapper mapper;
	
	@Override
	public void register(AttachFileVO vo) {
		log.info("register..."+vo);
		mapper.insert(vo);
	}
	
	@Override
	public void modify(AttachFileVO vo) {
		log.info("modify..."+vo);
		mapper.update(vo);
	}
	
	@Override
	public void remove(int attach_idx) {
		log.info("remove..."+attach_idx);
		mapper.delete(attach_idx);
	}
	
	@Override
	public List<AttachFileVO> findByIdx(int attach_idx) {
		log.info("findByBno..."+attach_idx);
		return mapper.findByIdx(attach_idx);
	}
	
	@Override
	public List<AttachFileVO> getAttachList(int attach_idx) {
		log.info("getAttachList..."+attach_idx);
		return mapper.findByIdx(attach_idx);
	}
	
}
