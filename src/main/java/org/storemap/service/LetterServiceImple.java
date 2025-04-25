package org.storemap.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.storemap.domain.EventVO;
import org.storemap.domain.LetterVO;
import org.storemap.domain.MemberVO;
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
	public LetterVO getLetterView(Map<String, String> map) {
		LetterVO vo = mapper.getLetterView(Integer.parseInt(map.get("letter_idx")));
		if(vo.getLetter_receiver().equals(map.get("loginUser"))) {
			mapper.updateRead(Integer.parseInt(map.get("letter_idx")));
		}
		return vo;
	}
	
	// 쪽지 전송
	@Transactional
	@Override
	public int insertLetter(LetterVO vo) {
		int result = 0;
	
		String member = null;
		int enter = 0;
		
		// 권한 반환
		member = mapper.getMemberSearch(vo.getLetter_receiver());
		
		if(vo.getAuth().equals("amdin") || vo.getAuth().equals("store")) {
			enter = mapper.getEnterSearch(vo.getLetter_receiver());
		}
		
		if(vo.getAuth().equals("admin")) {
			if(member == null && enter == 0) {
				result = -1;
			}
		}else if(vo.getAuth().equals("admin")) {
		
		}
		
		if(result != -1 && mapper.insertLetter(vo) > 0){
			result = 1;
		}
		return result;
	}
	
	// 이벤트 신청리스트 가져오기
	@Override
	public MemberVO getAttendList(int eday_idx) {
		return mapper.getAttendList(eday_idx);
	}

	// 이벤트 일차 리스트
	@Override
	public EventVO getEdayList(int event_idx) {
		return mapper.getEdayList(event_idx);
	}
	
}
