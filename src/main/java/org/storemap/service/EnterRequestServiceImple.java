package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.storemap.domain.EnterRequestVO;
import org.storemap.domain.EnterVO;
import org.storemap.domain.LetterVO;
import org.storemap.domain.MemberVO;
import org.storemap.mapper.EnterMapper;
import org.storemap.mapper.EnterRequestMapper;
import org.storemap.mapper.LetterMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EnterRequestServiceImple implements EnterRequestService{
	@Autowired
	private EnterRequestMapper mapper;
	@Autowired
	private EnterMapper enterMapper;
	@Autowired
	private LetterMapper letterMapper;
	
	// 기업 등록 요청 등록 - 완전히 새로운 트랜잭션
    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.READ_COMMITTED)
    public int register(int enter_idx) {
    	try {
            EnterVO existingEnter = enterMapper.read(enter_idx);
            if (existingEnter == null) {
                throw new RuntimeException("참조할 ENTER 데이터가 존재하지 않습니다.");
            }
            int result = mapper.insert(enter_idx);
            if (result > 0) {
                log.info("ENTER_REQUEST 등록 완료");
                return result;
            } else {
                throw new RuntimeException("ENTER_REQUEST 등록 실패");
            }
        } catch (Exception e) {
            log.error("ENTER_REQUEST 등록 중 오류: " + e.getMessage(), e);
            throw e;
        }
    }
	
	// 기업 등록 요청 수락
	@Override
	public int modify(int enter_idx) {
		log.info("modify..."+enter_idx);
		int result = mapper.update(enter_idx);
		return result;
	}
	
	// 기업 등록 요청 삭제
	@Override
	public int remove(int enter_idx) {
		log.info("remove..."+enter_idx);
		int result = mapper.delete(enter_idx);
		EnterVO evo = enterMapper.read(enter_idx);
		if(result == 1) {
			LetterVO vo = new LetterVO();
			vo.setLetter_writer(evo.getEnter_id());
			vo.setLetter_content("그룹등록 요청이 반려되었습니다.");
			vo.setLetter_receiver("admin");
			letterMapper.insertLetter(vo);
		}
		return result;
	}
	
	// 조인 신청 요청 리스트 불러오기
	@Override
	public List<EnterRequestVO> getDisReqListMap() {
		log.info("getDisReqListMap...");
		return mapper.getDisReqListMap();
	}
}