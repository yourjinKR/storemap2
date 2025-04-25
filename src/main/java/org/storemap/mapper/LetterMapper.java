package org.storemap.mapper;

import java.util.List;
import java.util.Map;

import org.storemap.domain.EventVO;
import org.storemap.domain.LetterVO;
import org.storemap.domain.MemberVO;

public interface LetterMapper {
	// 쪽지함 리스트
	public List<LetterVO> getLetterList(Map<String, String> map);
	// 쪽지 view
	public LetterVO getLetterView(int letter_idx);
	// 쪽지 읽음
	public int updateRead(int letter_idx);
	// 쪽지 보내기
	public int insertLetter(LetterVO vo);
	// 받는 사람 존재 여부 확인 (Enter)
	public int getEnterSearch(String letter_receiver);
	// 받는 사람 존재 여부 확인 (Member)
	public String getMemberSearch(String letter_receiver);
	// 이벤트 신청 리스트
	public List<MemberVO> getAttendList(int eday_idx);
	// 이벤트 신청 리스트
	public EventVO getEdayList(int event_idx);
}
