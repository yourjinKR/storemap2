package org.storemap.service;

import java.util.List;
import java.util.Map;

import org.storemap.domain.EventVO;
import org.storemap.domain.LetterVO;
import org.storemap.domain.MemberVO;

public interface LetterService {
	// 쪽지함 리스트
	public List<LetterVO> getLetterList(Map<String, String> map);
	// 쪽지 view
	public LetterVO getLetterView(Map<String, String> map);
	// 쪽지 보내기
	public int insertLetter(LetterVO vo);
	
	// 이벤트 신청 리스트
	public List<MemberVO> getAttendList(int eday_idx);
	
	// 이벤트 일차 리스트
	public EventVO getEdayList(int event_idx);
}
