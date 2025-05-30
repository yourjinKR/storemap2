package org.storemap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.EnterVO;
import org.storemap.mapper.EnterMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EnterServiceImple implements EnterService{
	
	@Autowired
	private EnterMapper enterMapper;
	//이미지 업로드 서버
	@Autowired
	private CloudinaryService cloudinaryService;
	@Autowired
	private EnterRequestService enterRequestService;
	
	// 로그인
	@Override
	public EnterVO eLogin(String enter_id, String enter_pw) {
		EnterVO enter = enterMapper.eLogin(enter_id, enter_pw);
		// NULL 체크를 추가하여 member_image가 NULL인 경우 처리
		if(enter != null && enter.getEnter_image() == null) {
			// enter_image가 NULL인 경우 기본 이미지 설정
			enter.setEnter_image("");
		}
		return enter;
	}
	// 회원가입 member id 중복확인
	@Override
	public int checkId(String member_id) {
		int result = enterMapper.checkId(member_id);
		return result;
	}
	
	// 회원가입
	@Override
	public int insertEnter(EnterVO enter) {
		return enterMapper.insertEnter(enter);
	}
	@Override
	@Transactional
	public int insertEnterWithRequest(EnterVO enter) {
	    try {
	        int result = enterMapper.insertEnterWithRequest(enter);
	        if (result > 0) {
	            log.info("회원가입 완료");
	            return result;
	        } else {
	            throw new RuntimeException("회원가입 실패");
	        }
	        
	    } catch (Exception e) {
	        log.error("회원가입 처리 중 오류: " + e.getMessage(), e);
	        throw new RuntimeException("회원가입 실패: " + e.getMessage(), e);
	    }
	}
	
	// 회원정보 수정
	@Override
	public int modifyEnter(MultipartFile file, EnterVO enter) {
		EnterVO evo = enterMapper.read(enter.getEnter_idx());
		String oldImg = evo.getEnter_image();
		try {
			// 파일이 있는 경우에만 이미지 업로드 처리
			if(file != null && !file.isEmpty()){
				// 이미지가 이미 있는 경우 삭제
				if(!oldImg.equals("")) {
					cloudinaryService.deleteFile(oldImg);
				}
				// 새 이미지 직접 업로드
				String imageUrl = cloudinaryService.uploadFile(file);
				enter.setEnter_image(imageUrl);
			}else {
				// 파일 없을 경우 기존 이미지 유지
				enter.setEnter_image(oldImg);
			}
			return enterMapper.modifyEnter(enter);
		} catch (Exception e) {
			throw new RuntimeException("Failed to modify enter", e);
		}
	}
	@Override
	public EnterVO get(int enter_idx) {
		return enterMapper.read(enter_idx);
	}
	
	// 회원 삭제
	@Override
	public int remove(int enter_idx) {
		return enterMapper.delete(enter_idx);
	}
	
	// 권한 수락
	@Override
	public int acceptPermission(int enter_idx) {
		return enterMapper.acceptPermission(enter_idx);
	}
}
