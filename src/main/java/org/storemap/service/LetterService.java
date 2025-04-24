package org.storemap.service;

import java.util.List;
import java.util.Map;

import org.storemap.domain.LetterVO;

public interface LetterService {
	// 쪽지함 리스트
	public List<LetterVO> getLetterList(Map<String, String> map);
	// 쪽지 view
	public LetterVO getLetterView(Map<String, String> map);
	// 쪽지 보내기
	public int insertLetter(LetterVO vo);
}
