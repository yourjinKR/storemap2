package org.storemap.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.MenuVO;
import org.storemap.mapper.MenuMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class MenuServiceImple implements MenuService{
	
	@Autowired
	private MenuMapper mapper;
	
	@Override
	public int register(MenuVO vo) {
		log.info("..."+vo);
		int result = mapper.insert(vo);
		return result;
	}
	
	@Override
	public int modify(MenuVO vo) {
		log.info("..."+vo);
		int result = mapper.update(vo);
		return result;
	}
	
	@Override
	public int remove(int menu_idx) {
		log.info("..."+menu_idx);
		int result = mapper.delete(menu_idx);
		return result;
	}
	
	@Override
	public List<MenuVO> getList() {
		log.info("...");
		return mapper.getMenuList();
	}
	
	@Override
	public MenuVO get(int menu_idx) {
		log.info("..."+menu_idx);
		return mapper.read(menu_idx);
	}
	
}