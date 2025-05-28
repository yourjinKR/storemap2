package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.LetterVO;
import org.storemap.domain.MemberVO;
import org.storemap.domain.StoreRequestVO;
import org.storemap.mapper.LetterMapper;
import org.storemap.mapper.MemberMapper;
import org.storemap.mapper.StoreRequestMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class StoreRequestServiceImple implements StoreRequestService{
	@Autowired
	private StoreRequestMapper mapper;
	@Autowired
	private LetterMapper letterMapper;
	@Autowired
	private MemberMapper memberMapper;
	
	@Override
	public int register(int member_idx) {
		log.info("register..."+member_idx);
		int result = mapper.insert(member_idx);
		MemberVO mvo = memberMapper.read(member_idx);
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
	public int modify(int member_idx) {
		log.info("modify..."+member_idx);
		int result = mapper.update(member_idx);
		return result;
	}
	
	@Override
	public int remove(int member_idx) {
		log.info("remove..."+member_idx);
		int result = mapper.delete(member_idx);
		MemberVO mvo = memberMapper.read(member_idx);
		if(result == 1) {
			LetterVO vo = new LetterVO();
			vo.setLetter_writer(mvo.getMember_id());
			vo.setLetter_content("입점 요청이 반려되었습니다.");
			vo.setLetter_receiver("admin");
			letterMapper.insertLetter(vo);
		}
		return result;
	}
	
	public List<StoreRequestVO> getDisReqList() {
		log.info("getDisReqList...");
		return mapper.getDisReqList();
	}
	
	@Override
	public List<StoreRequestVO> getDisReqListMap() {
		log.info("getDisReqListMap...");
		return mapper.getDisReqListMap();
	}
	
}
