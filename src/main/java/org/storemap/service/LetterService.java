package org.storemap.service;

import java.util.List;
import java.util.Map;

import org.storemap.domain.LetterVO;

public interface LetterService {
	// 보낸사람
//	public List<LetterVO> getSendLetter(String letter_writer);
//	// 받은사람
//	public List<LetterVO> getReceivedLetter(String letter_receiver);
	
	public List<LetterVO> getLetterList(Map<String, String> map);
}
