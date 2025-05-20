package org.storemap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.MemberVO;
import org.storemap.mapper.MemberMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class MemberServiceImple implements MemberService{
	
	@Autowired
	private MemberMapper memberMapper;
	//이미지 업로드 서버
	@Autowired
	private CloudinaryService cloudinaryService;
	
	// 로그인
	@Override
	public MemberVO mLogin(String member_id, String member_pw) {
		MemberVO member = memberMapper.mLogin(member_id, member_pw);
		// NULL 체크를 추가하여 member_image가 NULL인 경우 처리
		if(member != null && member.getMember_image() == null) {
			// member_image가 NULL인 경우 기본 이미지 설정
			member.setMember_image("member1.jpg");
		}
		return member;
	}
	
	// 개인/점주 회원가입
	@Override
	public int insertMember(MemberVO member) {
		return memberMapper.insertMember(member);
	}
	// id 중복확인
	@Override
	public int checkId(String member_id) {
		int result = memberMapper.checkId(member_id); 
		return result; 
	}
	
	// 개인정보 수정
	@Override
	public int modifyMember(MultipartFile file, MemberVO member) {
		MemberVO mvo = memberMapper.read(member.getMember_idx());
		String oldImg = mvo.getMember_image();
		try {
			// 파일이 있는 경우에만 이미지 업로드 처리
			if(file != null && !file.isEmpty()){
				// 이미지가 이미 있는 경우 삭제
				if(!oldImg.equals("member1.jpg")) {
					cloudinaryService.deleteFile(oldImg);
				}
				// 새 이미지 직접 업로드
				String imageUrl = cloudinaryService.uploadFile(file);
				member.setMember_image(imageUrl);
			}else {
				// 파일 없을 경우 기존 이미지 유지
				member.setMember_image(oldImg);
			}
			return memberMapper.modifyMember(member);
		} catch (Exception e) {
			throw new RuntimeException("Failed to modify member", e);
		}
	}
	
	@Override
	public int approvalOwner(int member_idx) {
		int result = memberMapper.approvalOwner(member_idx);
		return result;
	}
	@Override
	public int cancelOwner(int member_idx) {
		int result = memberMapper.cancelOwner(member_idx);
		return result;
	}
	@Override
	public MemberVO get(int member_idx) {
		return memberMapper.read(member_idx);
	}
	
}
