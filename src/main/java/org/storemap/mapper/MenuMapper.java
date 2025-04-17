package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.MenuVO;

public interface MenuMapper {
	// 메뉴 등록
	public int insert(MenuVO vo);
	// 메뉴 변경
	public int update(MenuVO vo);
	// 메뉴 삭제
	public int delete(int menu_idx);
	// 메뉴 목록
	public List<MenuVO> getMenuList();
	// 메뉴 정보?
	public MenuVO read(int menu_idx);
}