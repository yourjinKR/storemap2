package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.MenuVO;
import org.storemap.mapper.MenuMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class MenuServiceImple implements MenuService{
	
	@Autowired
	private MenuMapper mapper;
	//이미지 업로드 서버
	@Autowired
	private CloudinaryService cloudinaryService;
	
	@Override
	public int register(MultipartFile file, MenuVO vo) {
		log.info("register..."+vo);
		try {
			// 파일이 있는 경우에만 이미지 업로드 처리
			if(file != null && !file.isEmpty()) {
				String imageUrl = cloudinaryService.uploadFile(file);
				vo.setMenu_image(imageUrl);
			}else {
				// 기본 이미지 URL 설정 (Default값 나중에 수정)
				vo.setMenu_image("menu1.jpg");
			}
			return mapper.insert(vo);
		} catch (Exception e) {
			throw new RuntimeException("Failed to register menu", e);
		}
	}
	
	@Override
	public int modify(MultipartFile file, MenuVO vo) {
		log.info("modify..."+vo);
		MenuVO mvo = mapper.read(vo.getMenu_idx());
		String oldImg = mvo.getMenu_image();
		try {
			// 파일이 있는 경우에만 이미지 업로드 처리
			if(file != null && !file.isEmpty()) {
				// 이미지가 이미 있는 경우 삭제
				if(!oldImg.equals("menu1.jpg")) {
					cloudinaryService.deleteFile(oldImg);
				}
				// 새 이미지 직접 업로드
				String imageUrl = cloudinaryService.uploadFile(file);
				vo.setMenu_image(imageUrl);
			}else {
				// 파일 없을 경우 기존 이미지 유지
				vo.setMenu_image(oldImg);
			}
			return mapper.update(vo);
		} catch (Exception e) {
			throw new RuntimeException("Failed to modify menu", e);
		}
	}
	
	@Override
	public int remove(int menu_idx) {
		log.info("remove..."+menu_idx);
		MenuVO mvo = mapper.read(menu_idx);
		String oldImg = mvo.getMenu_image();
		if(!oldImg.equals("menu1.jpg")) {
			// 이미지 삭제
			cloudinaryService.deleteFile(oldImg);
		}
		// 메뉴삭제
		int result = mapper.delete(menu_idx);
		return result;
	}
	
	@Override
	public List<MenuVO> getList(int store_idx) {
		log.info("getList..."+store_idx);
		return mapper.getMenuList(store_idx);
	}
	
	@Override
	public List<MenuVO> getMap(int store_idx) {
		log.info("getMap..."+store_idx);
		return mapper.getMenuMap(store_idx);
	}
	
	@Override
	public MenuVO get(int menu_idx) {
		log.info("get..."+menu_idx);
		return mapper.read(menu_idx);
	}
	
	@Override
	public MenuVO map(int menu_idx) {
		log.info("map..."+menu_idx);
		return mapper.map(menu_idx);
	}
	
}