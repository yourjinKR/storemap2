package org.storemap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.storemap.domain.StoreVO;
import org.storemap.service.MenuServiceImple;
import org.storemap.service.ReviewServiceImple;
import org.storemap.service.StoreServiceImple;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/store")
@Controller
public class StoreController {
	
	@Autowired
	private StoreServiceImple storeService;
	@Autowired
	private MenuServiceImple menuService;
	@Autowired
	private ReviewServiceImple reviewService;
	
	// 점포 등록
	@PostMapping("/storeRegister")
	public String storeRgister1(StoreVO vo) {
		log.info("storeRegister1..."+vo);
		storeService.register(vo);
		return "redirect:/store/storeModify";
	}
	@GetMapping("/storeRegister")
	public String storeRegister2() {
		log.info("storeRegister2...");
		return "index";
	}
	
	// 점포 관리
	@PostMapping("/storeModify")
	public String storeModify1(StoreVO vo) {
		log.info("storeModify1..."+vo);
		storeService.modify(vo);
		return "";
	}
	@GetMapping("/storeModify")
	public String storeModify2() {
		log.info("storeModify2...");
		return "index";
	}
		
	// 리뷰 등록
	@GetMapping("/reviewRegister")
	public String reviewRegister() {
		log.info("reviewRegister...");
		//storeService.getList();
		return "index";
	}
	
	// 메뉴 관리
	@GetMapping("/menu")
	public String menu() {
		log.info("menu...");
		return "index";
	}
	
}
