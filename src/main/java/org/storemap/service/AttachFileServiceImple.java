package org.storemap.service;

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
	public int insertAttachfile(AttachFileVO attachVO) {
		return mapper.insertAttachfile(attachVO);
	}
}
