package org.storemap.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.MenuVO;

public interface MenuService {
	// 메뉴 등록
	public int register(MultipartFile file, MenuVO vo);
	// 메뉴 변경
	public int modify(MultipartFile file, MenuVO vo);
	// 메뉴 삭제
	public int remove(int menu_idx);
	// 메뉴 목록
	public List<MenuVO> getList(int store_idx);
	// 메뉴 조인 목록
	public List<MenuVO> getMap(int store_idx);
	// 메뉴 정보?
	public MenuVO get(int menu_idx);
	// 메뉴 조인 정보
	public MenuVO map(int menu_idx);
}