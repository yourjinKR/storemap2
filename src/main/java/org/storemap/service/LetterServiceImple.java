package org.storemap.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.LetterVO;
import org.storemap.mapper.LetterMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class LetterServiceImple implements LetterService{
	
	@Autowired
	private LetterMapper mapper;
	
	// 받은사람
	@Override
	public List<LetterVO> getLetterList(Map<String, String> map) {
		return mapper.getLetterList(map);
	}
}
