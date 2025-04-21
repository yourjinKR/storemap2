package org.storemap.service;

import java.util.List;

import org.storemap.domain.MenuVO;

public interface MenuService {
	// 메뉴 등록
	public int register(MenuVO vo);
	// 메뉴 변경
	public int modify(MenuVO vo);
	// 메뉴 삭제
	public int remove(int menu_idx);
	// 메뉴 목록
	public List<MenuVO> getList(int store_idx);
	// 메뉴 정보?
	public MenuVO get(int menu_idx);
}