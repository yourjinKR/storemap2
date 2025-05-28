package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.EnterRequestVO;
import org.storemap.domain.EnterVO;
import org.storemap.domain.LetterVO;
import org.storemap.domain.MemberVO;
import org.storemap.mapper.EnterRequestMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EnterRequestServiceImple implements EnterRequestService{
	@Autowired
	EnterRequestMapper mapper;
	
	@Override
	public int register(int enter_idx) {
		log.info("register..."+enter_idx);
		int result = mapper.insert(enter_idx);
		EnterVO evo = memberMapper.read(member_idx);
		if(result == 1) {
			LetterVO vo = new LetterVO();
			vo.setLetter_writer(mvo.getMember_id());
			vo.setLetter_content("입점 요청이 접수되었습니다.");
			vo.setLetter_receiver("admin");
			letterMapper.insertLetter(vo);
		}
		return result;
	}
	
	@Override
	public int modify(int enter_idx) {
		log.info("modify..."+enter_idx);
		int result = mapper.update(enter_idx);
		return result;
	}
	
	@Override
	public int remove(int enter_idx) {
		log.info("remove..."+enter_idx);
		int result = mapper.delete(enter_idx);
		return result;
	}
	
	@Override
	public List<EnterRequestVO> getDisReqListMap() {
		log.info("getDisReqListMap...");
		return mapper.getDisReqListMap();
	}
}