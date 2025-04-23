package org.storemap.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.storemap.domain.LetterVO;
import org.storemap.mapper.LetterMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class LetterServiceImple implements LetterService{
	
	@Autowired
	private LetterMapper mapper;
	
	// 쪽지함 리스트
	@Override
	public List<LetterVO> getLetterList(Map<String, String> map) {
		return mapper.getLetterList(map);
	}
	
	// 쪽지 view
	@Transactional
	@Override
	public LetterVO getLetterView(int letter_idx) {
		LetterVO reult = null;
		if(mapper.updateRead(letter_idx) > 0 && mapper.getLetterView(letter_idx) != null) {
			reult =  mapper.getLetterView(letter_idx);			
		}
		return reult;
	}
	
}
