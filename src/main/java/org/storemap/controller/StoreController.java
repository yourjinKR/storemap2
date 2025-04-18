package org.storemap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
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
		return "/store/menu";
	}
	@GetMapping("/storeRegister")
	public String storeRegister2() {
		log.info("storeRegister2...");
		return "index";
	}
	
	// 점포 관리
	@PostMapping("/storeModify")
	public String storeModify1(StoreVO vo, RedirectAttributes rttr) {
		log.info("storeModify1..."+vo);
//		if(storeService.modify(vo)) {
//			rttr.addFlashAttribute("result", "success");
//		}
		storeService.modify(vo);
		return "redirect:/";
//		return "redirect:/store/list";
	}
	@GetMapping("/storeModify")
	public String storeModify2(@RequestParam("store_idx") int store_idx, Model model) {
		log.info("storeModify2..."+store_idx);
		model.addAttribute("vo", storeService.get(store_idx));
		storeService.get(store_idx);
		return "index";
	}
	
	// 메뉴 관리
	@GetMapping("/menu")
	public String menu() {
		log.info("menu...");
		return "index";
	}
	
	// 점포 삭제
	@GetMapping("/storeRemove")
	public String storeRemove() {
		log.info("storeRemove...");
		return "index";
	}
		
	// 리뷰 등록
	@GetMapping("/reviewRegister")
	public String reviewRegister() {
		log.info("reviewRegister...");
		//storeService.getList();
		return "index";
	}
	
}
